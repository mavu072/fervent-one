from src.config.constants import DOCUMENT_DIR

import os


docs_dir = DOCUMENT_DIR


def mk_doc_dir():
    """Creates the local document directory for storing files, if it does not exist."""

    mkdir(docs_dir)


def find_all_files():
    """Lists all files in the document directory."""

    mk_doc_dir()

    return os.listdir(docs_dir)


def path_to_file(filename: str):
    """Returns a relative path to a file stored in the document directory."""

    if not filename.endswith(".txt"):
       fpath = f"{docs_dir}/{filename}.txt"
    else:
        fpath = f"{docs_dir}/{filename}"

    return fpath


def is_path_exists(path: str):
    """Determines if file or directory path exists."""

    return os.path.exists(path)


def write_to_file(filepath: str, content: str):
    """Writes content to a file and creates the file if it does not exist."""

    file = open(filepath, "a")
    file.write(content)
    file.close()


def read_from_file(filepath: str):
    """Reads content from a file, if it exists."""

    if is_path_exists(filepath):
        file = open(filepath)
        content = file.read()
        file.close()

    return content


def rm_file(filepath: str):
    """Deletes a file, if it exists."""

    deleted = False

    if is_path_exists(filepath):
        os.remove(filepath)
        deleted = True

    return deleted


def mkdir(directory: str):
    """Creates a directory, if it does not exist."""

    if not os.path.exists(directory):
        os.mkdir(directory)



def mkdirtree(dirpath: str):
    """Creates directories recursively, if they do not exist."""

    if not os.path.exists(dirpath):
        os.makedirs(dirpath)

