import io

import pytesseract
from PIL import Image


def extract_text_from_image(file: bytes):
    image = Image.open(io.BytesIO(file))

    text = pytesseract.image_to_string(image)
    return text
