import pytest
from app import extract_text_from_image
from app.extractor import postprocess_text, replace_single_newline


@pytest.mark.parametrize(
    "image_path, is_text_expected",
    [
        ("tests/data/eng_image.jpg", True),
        ("tests/data/no_text_image.jpg", False),
    ],
)
def test_extract_text_from_image(image_path, is_text_expected):
    with open(image_path, "rb") as file:
        image = file.read()

    result = extract_text_from_image(image)

    # Assert that result is a string
    assert isinstance(result, str)

    # Assert expected text
    text_detected = len(result) != 0
    assert text_detected == is_text_expected


@pytest.mark.parametrize(
    "input_text, expected_output",
    [
        (
            " Line1\nLine2 ",
            "Line1 Line2",
        ),  # Leading/trailing spaces and single newline replaced
        (
            "\nLine1\nLine2\n",
            "Line1 Line2",
        ),  # Leading/trailing newlines and single newline replaced
        (
            "\nLine1\n\nLine2\n",
            "Line1\n\nLine2",
        ),  # Leading/trailing newlines removed, consecutive newlines preserved
        ("Line1 Line2", "Line1 Line2"),  # No changes if no newlines or extra spaces
        ("", ""),  # Empty string remains unchanged
        (
            " \n \nLine1\n \n",
            "Line1",
        ),  # All extra leading/trailing spaces and single newlines removed
    ],
)
def test_postprocess_text(input_text, expected_output):
    assert postprocess_text(input_text) == expected_output


@pytest.mark.parametrize(
    "input_text, expected_output",
    [
        ("Line1\nLine2", "Line1 Line2"),  # Single newline replaced
        ("Line1\n\nLine2", "Line1\n\nLine2"),  # Consecutive newlines preserved
        ("Line1 Line2", "Line1 Line2"),  # No newlines remain unchanged
        ("", ""),  # Empty string remains unchanged
    ],
)
def test_replace_single_newline(input_text, expected_output):
    assert replace_single_newline(input_text) == expected_output
