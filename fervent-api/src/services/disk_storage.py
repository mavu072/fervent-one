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


def write_to_file(filename: str, content: str):
    """Writes content to a file and creates the file if it does not exist."""

    fpath = get_path_to_file(filename)

    file = open(fpath, "a")
    file.write(content)
    file.close()


def read_from_file(filename: str):
    """Reads content from a file, if it exists."""

    fpath = get_path_to_file(filename)

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


def rm_file_if_exists(filename: str):
    """Deletes a file from local document directory, if it exists."""

    fpath = get_path_to_file(filename)

    if os.path.exists(fpath):
        os.remove(fpath)
        print(f">>> Deleted file: {fpath}")
