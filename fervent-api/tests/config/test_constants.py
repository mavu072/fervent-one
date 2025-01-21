from src.config.constants import CHROMA_DIR, DOCUMENT_DIR


def test_chroma_dir():
    assert CHROMA_DIR is not None and type(CHROMA_DIR) is str


def test_document_dir():
    assert DOCUMENT_DIR is not None and type(DOCUMENT_DIR) is str