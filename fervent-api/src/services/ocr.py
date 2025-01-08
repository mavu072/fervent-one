from typing import BinaryIO, TextIO

from PIL import Image, ImageFile
from pdf2image import convert_from_bytes

from src.services.disk_storage import mkdir_if_not_exists, rm_file_if_exists, write_to_file

import pytesseract
import threading
import io


def ocr_image_to_text(images: list, filename: str):
    """Start a thread to run images through OCR and write the text content to a file."""

    thread = threading.Thread(target=extract_file_and_write_to_disk, args=(images, filename), name=f"Reading {filename}")
    thread.start()

    print(f">>> Starting thread: {thread.name}")


def extract_file_and_write_to_disk(file_pages: list, filename: str):
    """Extracts file text contents and writes them to disk in a text file."""

    print(f">>> Starting to read file: {filename}")

    mkdir_if_not_exists()
    rm_file_if_exists(filename)

    file_content_pages = read_images_to_text(images=file_pages)

    for page in file_content_pages:
        write_to_file(filename=filename, content=page)

    print(f">>> Completed reading file: {filename}, pages: {len(file_pages)}")


def convert_pdf_to_image(file: BinaryIO | TextIO, mime_type: str):
    """Converts PDF pages to images. If file is an image, it wraps it in a list."""

    if not file:
        raise Exception(f"{str(file)} is not a valid file.")

    contents = file.read()

    if mime_type == "application/pdf" or mime_type == "text/plain":
        images = convert_from_bytes(contents)
    else:
        images = [Image.open(io.BytesIO(contents))]

    return images


def read_images_to_text(images: list):
    """Uses OCR engine to read text from image files."""

    if not images:
        raise Exception(f"{str(images)} is not a valid input.")

    pages = []

    for image in images:
        page = pytesseract.image_to_string(image)
        pages.append(page)

    return pages


