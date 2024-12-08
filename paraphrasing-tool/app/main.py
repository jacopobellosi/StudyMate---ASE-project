import os
from flask import Blueprint, request, jsonify
from openai import OpenAI

main = Blueprint('main', __name__)

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

def paraphrase_with_openai(text, style="standard"):
    style_prompt = {
        "formal": "Paraphrase the following text in a formal tone: ",
        "standard": "Paraphrase the following text in a casual tone: ",
        "fluency": "Paraphrase the following text with clarity and readability of text: ",
        "detailed": "Paraphrase the following text with more details: ",
        "academic": "Paraphrase the following text in more technical and scholarly way:"
    }
    
    prompt = f"{style_prompt.get(style, style_prompt['standard'])}\"{text}\""
    
    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "You are a helpful assistant."},
            {"role": "user", "content": prompt}
        ]
    )
    
    paraphrased_text = response.choices[0].message.content.strip()
    return paraphrased_text

@main.route('/paraphrase', methods=['POST'])
def paraphrase():
    data = request.json
    text = data.get('text')
    style = data.get('style', 'standard')
    
    if not text:
        return jsonify({"error": "Text is required"}), 400
    
    try:
        paraphrased_text = paraphrase_with_openai(text, style)
        return jsonify({"paraphrased_text": paraphrased_text})
    except Exception as e:
        return jsonify({"error": str(e)}), 500
