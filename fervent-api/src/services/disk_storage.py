from dotenv import load_dotenv

from src.utils.file_utils import create_directory_if_not_exists

import os

load_dotenv()

DOCUMENT_DIR = os.getenv("DOCUMENT_DIR")
docs_dir = DOCUMENT_DIR

def mkdir_if_not_exists():
    """Creates the local document directory for storing files, if it does not exist."""

    create_directory_if_not_exists(docs_dir)


def get_path_to_file(filename: str):
    """Returns a relative path to a file stored in the document directory."""

    if not filename.endswith(".txt"):
       fpath = f"{docs_dir}/{filename}.txt"
    else:
        fpath = f"{docs_dir}/{filename}"

    return fpath


def is_file_exists(filepath: str):
    """Determines if file exists."""

    return os.path.exists(filepath)


def write_to_file(filepath: str, content: str):
    """Writes content to a file and creates the file if it does not exist."""

    file = open(filepath, "a")
    file.write(content)
    file.close()


def read_from_file(filepath: str):
    """Reads content from a file, if it exists."""

    if is_file_exists(filepath):
        file = open(filepath)
        content = file.read()
        file.close()

    return content


def find_all_files():
    """Lists all files in the document directory."""

    mkdir_if_not_exists()

    return os.listdir(docs_dir)


def rm_file_if_exists(filepath: str):
    """Deletes a file from local document directory, if it exists."""

    deleted = False

    if is_file_exists(filepath):
        os.remove(filepath)
        deleted = True
        
        print(f">>> Deleted file: {filepath}")

    return deleted
