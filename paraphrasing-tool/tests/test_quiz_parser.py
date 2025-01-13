import json

from app.models import AssessmentTest

# Now modify the test
def test_parse_quiz_xml_to_models():
    # result = QuizParser.parse_quiz_xml_to_models(quiz_xml)
    expected_json = {
        "identifier": "test1",
        "title": "Sample Test",
        "tool_name": "OpenAI",
        "tool_version": "1.0",
        "sections": [
            {
                "identifier": "section1",
                "title": "Section 1",
                "items": [
                    {
                        "identifier": "item1",
                        "title": "Item 1",
                        "response_declaration": {
                            "identifier": "RESPONSE",
                            "cardinality": "single",
                            "base_type": "identifier",
                            "correct_response": [
                                "1"
                            ]
                        },
                        "item_body": {
                            "response_identifier": "RESPONSE",
                            "shuffle": True,
                            "max_choices": 1,
                            "prompt": "Choose the correct answer",
                            "choices": [
                                {
                                    "identifier": "1",
                                    "text": "Choice 1"
                                },
                                {
                                    "identifier": "2",
                                    "text": "Choice 2"
                                }
                            ]
                        }
                    }
                ]
            }
        ]
    }
    with open('example.json', 'r') as f:
        json_data = json.load(f)
        expected = AssessmentTest.from_dict(json_data)

    print(expected.model_dump_json())
    # assert result == expected


test_parse_quiz_xml_to_models()