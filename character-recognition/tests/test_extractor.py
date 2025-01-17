import pytest
from app import extract_text_from_image


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
