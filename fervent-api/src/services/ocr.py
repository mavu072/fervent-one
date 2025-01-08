from fastapi import UploadFile
from PIL import Image
from pdf2image import convert_from_bytes

import os
import io
import pytesseract
import threading

from dotenv import load_dotenv

load_dotenv()

DOCUMENT_DIR = os.getenv("DOCUMENT_DIR")
docs_dir = DOCUMENT_DIR

def ocr_image_to_text(images, filename: str):
    """Start a thread to run images through OCR engine."""

    thread = threading.Thread(target=read_images_to_text, args=(images, filename,), name=f"Reading {filename}")
    thread.start()

    print(f">>> Starting thread: {thread.getName()}")


async def convert_pdf_to_image(file: UploadFile):
    """Converts pages of a PDF file into images."""

    if not file:
        raise Exception(f"{str(file)} is not a valid file.")

    contents = await file.read()

    if file.content_type == "application/pdf":
        images = convert_from_bytes(contents)
    else:
        images = [Image.open(io.BytesIO(contents))]

    return images


def read_images_to_text(images, filename: str):
    """Uses OCR engine to read text from image files."""

    if not images:
        raise Exception(f"{str(images)} is not a valid input.")

    mkdir_if_not_exists()
    rm_file_if_exists(filename)

    pages = []

    for image in images:
        page = pytesseract.image_to_string(image)
        pages.append(page)
        write_to_file(filename, page)

    print(f">>> Completed reading file: {filename}, pages: {len(pages)} ")
    return pages


def write_to_file(filename: str, content: str):
    """Writes content to a file and creates the file if it does not exist."""

    fpath = f"{docs_dir}/{filename}.txt"

    file = open(fpath, "a")
    file.write(content)
    file.close()


def read_from_file(filename):
    """Reads content from a file, if it exists."""

    fpath = f"{docs_dir}/{filename}.txt"

    if os.path.exists(fpath):
        file = open(fpath)
        content = file.read()
    else:
        raise Exception(f"{filename} file does not exist")
        
    return content


def find_all_files():
    """Lists all files in the document directory."""

    mkdir_if_not_exists()
    
    return os.listdir(docs_dir)


def rm_file_if_exists(filename):
    """Deletes a file from document directory, if it exists."""

    fpath = f"{docs_dir}/{filename}.txt"

    if os.path.exists(fpath):
        os.remove(fpath)
        print(f">>> Deleted file: {fpath}")


def mkdir_if_not_exists():
    """Creates a document directory, if it does not exist."""

    if not os.path.exists(docs_dir):
        os.mkdir(docs_dir)
        print(f">>> Created directory: {docs_dir}")
