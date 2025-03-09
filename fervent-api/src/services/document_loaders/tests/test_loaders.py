from langchain_core.documents import Document

from definitions import ROOT_DIR
from src.services.document_loaders.loaders import load_pdf_directory


dir_path = ROOT_DIR + "\\sample-files\\tests"

def test_load_pdf_directory():
    docs = load_pdf_directory(dir_path, "single")
    print(f"Docs: {docs}")

    assert len(docs) == 1
    assert type(docs[0]) is Document