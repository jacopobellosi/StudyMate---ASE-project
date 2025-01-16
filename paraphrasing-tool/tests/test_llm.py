import os

os.environ["OPENAI_API_KEY"] = "test"
import unittest
from unittest.mock import patch
from app.llm import generate_test_with_openai
from app.models import GenerateTestRequest, AssessmentTest

class TestGenerateTestWithOpenAI(unittest.TestCase):
    def setUp(self):
        """Set up test fixtures."""
        self.generate_test_request = GenerateTestRequest(text="Sample text for generating test")
        self.mock_assessment_test = AssessmentTest(
            identifier="test1",
            title="Sample Test",
            tool_name="OpenAI",
            tool_version="1.0",
            sections=[],
        )

    @patch("app.llm.attempt_generate_test")
    def test_generate_test_with_openai_success(self, mock_attempt_generate_test):
        mock_attempt_generate_test.return_value = self.mock_assessment_test

        result = generate_test_with_openai(self.generate_test_request)

        # Assertions
        self.assertEqual(result, self.mock_assessment_test)
        mock_attempt_generate_test.assert_called_once()


if __name__ == "__main__":
    unittest.main()
