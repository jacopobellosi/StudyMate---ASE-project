import json
import logging
import os
from openai import OpenAI
from pydantic import ValidationError
from app.models import AssessmentSection, AssessmentTest, Item, ParaphraseRequest, GenerateTestRequest

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

def create_test_prompt(text: str, hints: str = "") -> str:
    base_prompt = (
        "Generate a quiz in JSON format with single/multiple/true or false questions based on SOURCE_TEXT."
        " Generate from 3 to 7 questions with 2 to 5 choices each."
        " The fields name in JSON should be similar to QTI format (see Example answer)."
        " The identifiers of the choices must be numerical," 
        " first choice in each question should be 1, second 2, etc."
        " The question text should be in the field 'prompt'."
        " Don't write any explanation, just provide the needed json."
        "\n\nExample answer: "
        """{"title": "Sample Test", "items": [{"identifier": "item1", "title": "Item 1", "response_declaration": {"identifier": "RESPONSE", "cardinality": "single", "base_type": "identifier", "correct_response": ["1"]}, "item_body": {"response_identifier": "RESPONSE", "shuffle": true, "max_choices": 1, "prompt": "When is the New Year?", "choices": [{"identifier": "1", "text": "1 Januar"}, {"identifier": "2", "text": "1 March"}]}}]}"""
        f"\n\nSOURCE_TEXT: {text}"
    )
    return f"{hints}\n\n{base_prompt}" if hints else base_prompt

def generate_test_with_openai(data: GenerateTestRequest) -> AssessmentTest:
    logging.info(f"Generating test for: {data.text}")
    prompt = create_test_prompt(data.text)
    return attempt_generate_test(prompt, data.text)

def attempt_generate_test(prompt: str, source_text: str, attempts: int = 3) -> AssessmentTest:
    for attempt in range(attempts):
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are a helpful assistant."},
                {"role": "user", "content": prompt},
            ],
        )
        quiz_json = response.choices[0].message.content.strip().strip("```").strip("json")
        logging.info(f"Generated quiz: {quiz_json}")
        try:
            quiz_dict = json.loads(quiz_json)
            quiz_title = quiz_dict.get("title", None)
            if not quiz_title:
                raise ValidationError([{"loc": "title", "msg": "Title is required"}])
            
            items = [Item(**item) for item in quiz_dict.get("items", [])]

            section = AssessmentSection(
                identifier="section1",
                title="Section 1",
                items=items,
            )

            quiz = AssessmentTest(
                identifier=quiz_title.lower().replace(" ", "_"),
                title=quiz_title,
                tool_name="OpenAI",
                tool_version="1.0",
                sections=[section],
            )

            return quiz
        
        except ValidationError as e:
            logging.error(f"Validation errors: {e.errors()}")
            if attempt < attempts - 1:
                prompt = create_test_prompt(source_text, hints=f"Regenerate the quiz JSON with the following corrections:\n{e.errors()[0]['msg']}: {e.errors()[0]['loc']}")
    raise ValidationError("Failed to generate a valid quiz after multiple attempts")
