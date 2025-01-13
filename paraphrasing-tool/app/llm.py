import os
from openai import OpenAI
from app.models import AssessmentTest, ParaphraseRequest, GenerateTestRequest

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

def paraphrase_with_openai(data: ParaphraseRequest) -> str:
    style_prompt = {
        "formal": "Paraphrase the following text in a formal tone: ",
        "standard": "Paraphrase the following text in a casual tone: ",
        "fluency": "Paraphrase the following text with clarity and readability of text: ",
        "detailed": "Paraphrase the following text with more details: ",
        "academic": "Paraphrase the following text in more technical and scholarly way:",
    }

    prompt = f"{style_prompt.get(data.style, style_prompt['standard'])}\"{data.text}\""

    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "You are a helpful assistant."},
            {"role": "user", "content": prompt},
        ],
    )

    paraphrased_text = response.choices[0].message.content.strip()
    return paraphrased_text

def generate_test_with_openai(data: GenerateTestRequest) -> AssessmentTest:
    prompt = (
        "Generate a quiz in JSON format with single/multiple/true or false questions based on SOURCE_TEXT."
        " The fields nane in JSON should be similar to QTI format."
        " Also the identifiers of the choices must be numerical."
        " Don't write any explanation, just provide the needed json."
        "\n\nExample answer:\n"
        """{"identifier":"test1","title":"Sample Test","tool_name":"OpenAI","tool_version":"1.0","sections":[{"identifier":"section1","title":"Section 1","items":[{"identifier":"item1","title":"Item 1","response_declaration":{"identifier":"RESPONSE","cardinality":"single","base_type":"identifier","correct_response":["1"]},"item_body":{"response_identifier":"RESPONSE","shuffle":true,"max_choices":1,"prompt":"Choose the correct answer","choices":[{"identifier":"1","text":"Choice 1"},{"identifier":"2","text":"Choice 2"}]}}]}]}"""
        f'\n\nSOURCE_TEXT: "{data.text}"'
    )

    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "You are a helpful assistant."},
            {"role": "user", "content": prompt},
        ],
    )

    quiz_json = response.choices[0].message.content.strip()
    return AssessmentTest.model_validate_json(quiz_json)
