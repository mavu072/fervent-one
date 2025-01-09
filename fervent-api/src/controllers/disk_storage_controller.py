from fastapi.responses import JSONResponse
from typing import BinaryIO, TextIO

from src.services.disk_storage import get_path_to_file, read_from_file, write_to_file, rm_file_if_exists, find_all_files, is_file_exists
from src.services.ocr import convert_pdf_to_image, ocr_image_to_text
from src.services.file_validation import validate_uploaded_file


def upload_file_to_disk(filename: str, file: BinaryIO | TextIO, size: int, mime_type: str):
    """Upload a PDF or image file to be processed by the OCR engine and save it in the local disk storage as a text file.
        Note: If the file already exists, it will be overwritten with the new file."""
    try:
        validate_uploaded_file(filename=filename, file=file, size=size, mime_type=mime_type)

        if mime_type == "text/plain":
            content_bytes = file.read()
            contents = str(content_bytes, "UTF-8") # Convert bytes to text.

            filepath = get_path_to_file(filename) # Target file.
            write_to_file(filepath=filepath, content=contents) # Read and save text file.
            page_no = 1 # Default to 1 page for text files.
        else:
            images = convert_pdf_to_image(file=file, mime_type=mime_type) # Convert PDF and images to Image objects.
            page_no = len(images) # Each image is a page from the file.
            ocr_image_to_text(images, filename)  # Start OCR thread.

        return JSONResponse(
            status_code=200, 
            content={"uploaded": True, "filename": filename, "size": size, "pages": page_no}
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


def read_file_from_disk(filename: str):
    """Reads a file on the local disk storage."""
    try:
        filepath = get_path_to_file(filename)

        if not is_file_exists(filepath):
            raise ValueError("File does not exist.")
        
        file_content = read_from_file(filepath)

        return JSONResponse(
            status_code=200, 
            content={"filename": filename, "content": file_content}
        )
    
    except ValueError as error:
        return JSONResponse(
            status_code=400,
            content={"error": str(error)}
        )

    except Exception as error:
        return JSONResponse(
            status_code=500, 
            content={"error": str(error)}
        )


def delete_file_from_disk(filename: str):
    """Deletes a file from the local disk storage."""
    try:
        if not filename:
            raise ValueError("File Name is invalid.")
        
        filepath = get_path_to_file(filename)
        
        if not is_file_exists(filepath):
            raise ValueError("File does not exist.")

        deleted = rm_file_if_exists(filepath)

        return JSONResponse(
            status_code=200, 
            content={
                "deleted": deleted,
                }
        )
    
    except ValueError as error:
        return JSONResponse(
            status_code=400,
            content={"error": str(error)}
        )

    except Exception as error:
        return JSONResponse(
            status_code=500,
            content={"error": str(error)}
        )


def list_files_on_disk():
    """Retrieve a list of all files."""
    try:
        files = find_all_files()

        return JSONResponse(
            status_code=200, 
            content={"total": len(files), "files": files}
        )

    except Exception as error:
        return JSONResponse(
            status_code=500,
            content={"error": str(error)}
        )
