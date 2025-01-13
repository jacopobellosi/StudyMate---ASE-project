import connexion
from openapi_server.models.assessment_test import AssessmentTest  # noqa: E501
from openapi_server.models.generate_test_post_request import GenerateTestPostRequest  # noqa: E501
from llm_api import generate_quiz_with_openai, paraphrase_with_openai

def generate_test_post(generate_test_post_request):  # noqa: E501
    """Generate test

     # noqa: E501

    :param generate_test_post_request: 
    :type generate_test_post_request: dict | bytes

    :rtype: Union[AssessmentTest, Tuple[AssessmentTest, int], Tuple[AssessmentTest, int, Dict[str, str]]
    """
    if connexion.request.is_json:
        generate_test_post_request = GenerateTestPostRequest.from_dict(connexion.request.get_json())  # noqa: E501
        resource_text = generate_test_post_request.resource_text
        generated_json = generate_quiz_with_openai(resource_text)
        assessment_test = AssessmentTest.from_json(generated_json)
        return assessment_test

def paraphrase_post(body):  # noqa: E501
    """Paraphrase text

     # noqa: E501

    :param body: 
    :type body: str

    :rtype: Union[str, Tuple[str, int], Tuple[str, int, Dict[str, str]]
    """
    if connexion.request.is_json:
        body = connexion.request.get_json().get("text")
        style = connexion.request.get_json().get("style", "standard")
        paraphrased_text = paraphrase_with_openai(body, style)
        return paraphrased_text
