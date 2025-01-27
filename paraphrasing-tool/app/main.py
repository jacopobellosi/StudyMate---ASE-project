from flask import Blueprint, request, jsonify
from app.models import ParaphraseRequest, GenerateTestRequest
from app.llm import paraphrase_with_openai, generate_test_with_openai

main = Blueprint("main", __name__)

@main.route('/paraphrase', methods=['POST'])
def paraphrase():
    if request.is_json:
        data = request.get_json()
        paraphrase_request = ParaphraseRequest(**data)
        response = paraphrase_with_openai(paraphrase_request)
        return response
    
@main.route('/generate_test', methods=['POST'])
def generate_test():
    if request.is_json:
        data = request.get_json()
        generate_test_post_request = GenerateTestRequest(**data)
        response = generate_test_with_openai(generate_test_post_request)
        return jsonify(response.model_dump())
