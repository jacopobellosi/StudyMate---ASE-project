import connexion
from typing import Dict
from typing import Tuple
from typing import Union

from openapi_server.models.assessment_test import AssessmentTest  # noqa: E501
from openapi_server.models.generate_test_post_request import GenerateTestPostRequest  # noqa: E501
from openapi_server.models.paraphrase_post_request import ParaphrasePostRequest  # noqa: E501
from openapi_server import util


def generate_test_post(generate_test_post_request):  # noqa: E501
    """Generate test

     # noqa: E501

    :param generate_test_post_request: 
    :type generate_test_post_request: dict | bytes

    :rtype: Union[AssessmentTest, Tuple[AssessmentTest, int], Tuple[AssessmentTest, int, Dict[str, str]]
    """
    if connexion.request.is_json:
        generate_test_post_request = GenerateTestPostRequest.from_dict(connexion.request.get_json())  # noqa: E501
    return 'do some magic!'


def paraphrase_post(paraphrase_post_request):  # noqa: E501
    """Paraphrase text

     # noqa: E501

    :param paraphrase_post_request: 
    :type paraphrase_post_request: dict | bytes

    :rtype: Union[str, Tuple[str, int], Tuple[str, int, Dict[str, str]]
    """
    if connexion.request.is_json:
        paraphrase_post_request = ParaphrasePostRequest.from_dict(connexion.request.get_json())  # noqa: E501
    return 'do some magic!'
