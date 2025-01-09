from fastapi.responses import JSONResponse
from typing import BinaryIO

from src.services.ocr import convert_pdf_to_image, read_images_to_text
from src.services.file_validation import validate_uploaded_file


def ocr_text_from_file(filename: str, file: BinaryIO, size: int, mime_type: str):
    """OCR text from a file."""
    try:
        validate_uploaded_file(filename=filename, file=file, size=size, mime_type=mime_type)

        img_pages = convert_pdf_to_image(file=file, mime_type=mime_type)
        text_content_pages = read_images_to_text(images=img_pages)
        page_no = len(img_pages)

        return JSONResponse(
            status_code=200,
            content={
                "filename": filename, 
                "size": size, 
                "pages": page_no,
                "extracted_text_per_page": text_content_pages
            }
        )
    
    except (TypeError, ValueError) as error:
        return JSONResponse(
            status_code=400,
            content={"error": str(error)}
        )
    
    except Exception as error:
        return JSONResponse(
            status_code=500,
            content={"error": str(error)}
        )

