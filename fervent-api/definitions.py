import os


ROOT_DIR = os.path.dirname(os.path.abspath(__file__))
"""Root Directory."""

CHROMA_DIR = "tmp/chroma"
"""Directory containing Chroma."""

DOCUMENT_DIR = "tmp/sys_files"
"""Directory containing system files."""

UPLOADS_DIR = "tmp/uploads"
"""Directory containing child directories for user uploaded files. 
Each child directory name must be a unique identifier that must be include with a user's subsequent requests to the files.
"""

API_TAGS = {
    "local-storage": "Local Storage",
    "vector-db": "Vector Database (Chroma)",
    "vector-store": "Vector Store",
    "ocr": "Optical Character Recognition (OCR)",
    "ner": "Named Entity Recognition (NER)",
    "llm": "Large Language Model (LLM)"
}
"""Tags for OpenAPI documentation."""