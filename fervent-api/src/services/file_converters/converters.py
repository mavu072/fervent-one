from typing import BinaryIO, TextIO
from PIL import Image
from pdf2image import convert_from_bytes

import io


def pdf_to_image(file: BinaryIO | TextIO, mime_type: str):
    """Converts PDF and Text files to images.
    \n
    - *If the file is a PDF file, each page is returned as a single image in the list.*
    \n
    - *If the file is TXT file, the entire file is returned as a single image in a list.*
    \n 
    - *If the file is an image, it is returned in a list.*
    """

    if not file:
        raise Exception(f"{str(file)} is not a valid file.")

    contents = file.read()

    if mime_type == "application/pdf" or mime_type == "text/plain":
        images = convert_from_bytes(contents)
    else:
        images = [Image.open(io.BytesIO(contents))]

    return images