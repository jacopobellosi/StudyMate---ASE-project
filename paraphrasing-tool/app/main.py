import os
from flask import Blueprint, request, jsonify
from openai import OpenAI

from openapi_client import AssessmentTest

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


def generate_quiz_with_openai(text):
    prompt = ("Generate a quiz in JSON format with single/multiple/true or false questions based on SOURCE_TEXT."
              " The fields nane in JSON should be similar to QTI format."
              " Also the identifiers of the choices must be numerical."
              " Don't write any explanation, just provide the needed json."
              "\n\nExample answer:\n"
              """{"identifier":"test1","title":"Sample Test","tool_name":"OpenAI","tool_version":"1.0","sections":[{"identifier":"section1","title":"Section 1","items":[{"identifier":"item1","title":"Item 1","response_declaration":{"identifier":"RESPONSE","cardinality":"single","base_type":"identifier","correct_response":["1"]},"item_body":{"response_identifier":"RESPONSE","shuffle":true,"max_choices":1,"prompt":"Choose the correct answer","choices":[{"identifier":"1","text":"Choice 1"},{"identifier":"2","text":"Choice 2"}]}}]}]}"""
              f"\n\nSOURCE_TEXT: \"{text}\"")

    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "You are a helpful assistant."},
            {"role": "user", "content": prompt}
        ]
    )

    quiz_xml = response.choices[0].message.content.strip()
    return quiz_xml


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


@main.route('/generate_quiz', methods=['POST'])
def generate_quiz():
    data = request.data.decode('utf-8')

    if not data:
        return jsonify({"error": "Text is required"}), 400

    try:
        generated_json = generate_quiz_with_openai(data)
        assessment_test = AssessmentTest.from_json(generated_json)
        return jsonify(assessment_test.to_dict())
    except Exception as e:
        return jsonify({"error": str(e)}), 500
