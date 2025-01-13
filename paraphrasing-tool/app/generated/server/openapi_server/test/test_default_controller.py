import unittest

from flask import json

from openapi_server.models.assessment_test import AssessmentTest  # noqa: E501
from openapi_server.test import BaseTestCase


class TestDefaultController(BaseTestCase):
    """DefaultController integration test stubs"""

    @unittest.skip("text/plain not supported by Connexion")
    def test_generate_test_post(self):
        """Test case for generate_test_post

        Generate test
        """
        body = 'body_example'
        headers = { 
            'Accept': 'application/json',
            'Content-Type': 'text/plain',
        }
        response = self.client.open(
            '/generate_test',
            method='POST',
            headers=headers,
            data=json.dumps(body),
            content_type='text/plain')
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))

    @unittest.skip("text/plain not supported by Connexion")
    def test_paraphrase_post(self):
        """Test case for paraphrase_post

        Paraphrase text
        """
        body = 'body_example'
        headers = { 
            'Accept': 'text/plain',
            'Content-Type': 'text/plain',
        }
        response = self.client.open(
            '/paraphrase',
            method='POST',
            headers=headers,
            data=json.dumps(body),
            content_type='text/plain')
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))


if __name__ == '__main__':
    unittest.main()
