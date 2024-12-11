import io

import pytesseract
import regex
from PIL import Image


def extract_text_from_image(file: bytes) -> str:
    image = Image.open(io.BytesIO(file))

    text = pytesseract.image_to_string(image)
    text = postprocess_text(text)

    return text


def postprocess_text(text: str) -> str:
    text = text.strip(" \n")
    text = replace_single_newline(text)
    return text


def replace_single_newline(text: str) -> str:
    # Replace single newlines not followed or preceded by another newline
    return regex.sub(r"(?<!\n)\n(?!\n)", " ", text)
