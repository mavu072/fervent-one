from fastapi import APIRouter, UploadFile

from src.config.api_tags import API_TAGS
from src.controllers.ocr_extraction_controller import ocr_text_from_file


router = APIRouter()


@router.post("/v1/ocr/extraction/", tags=[API_TAGS["ocr"]])
def extract_text_from_file(file: UploadFile):
    """OCR text from a file."""
    fname = file.filename
    fsize = file.size
    ftype = file.content_type
    file_like = file.file
    return ocr_text_from_file(filename=fname, file=file_like, size=fsize, mime_type=ftype)
