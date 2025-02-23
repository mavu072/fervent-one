from src.services.storage.local_store import mk_doc_dir, rm_file, write_to_file, path_to_file
from src.services.file_converters.converters import pdf_to_image

import pytesseract
import threading


def run_ocr_thread(images: list, filename: str):
    """Starts a thread to run images through Tesseract OCR and write the text contents to a text file."""

    # Ensure the document directory exists.
    mk_doc_dir()

    # Delete existing file.
    rm_file(filename)

    # Start OCR thread.
    thread = threading.Thread(target=extract_and_write_to_disk, args=(images, filename), name=f"Reading {filename}")
    thread.start()

    print(f">>> Starting Tesseract OCR thread: {thread.name}")


def extract_and_write_to_disk(file_pages: list, filename: str):
    """Uses Tesseract OCR to extract text from a file and writes it to a text file."""

    print(f">>> Starting OCR'ing file: {filename}")

    file_content_pages = images_to_text(images=file_pages)

    for page in file_content_pages:
        filepath = path_to_file(filename)
        write_to_file(filepath=filepath, content=page)

    print(f">>> Completed OCR'ing file: {filename}, pages: {len(file_pages)}")


def images_to_text(images: list):
    """Uses Tesseract OCR to read text from image files."""

    if not images:
        raise Exception(f"{str(images)} is not a valid input.")

    pages = []

    for image in images:
        page = pytesseract.image_to_string(image)
        pages.append(page)

    return pages


