from fastapi import UploadFile
from fastapi.responses import JSONResponse

from src.services.storage.local_store import (
    path_to_file,
    read_from_file,
    write_to_file,
    rm_file,
    find_all_files,
    is_path_exists,
)
from src.services.ocr.ocr_tess import run_ocr_thread
from src.services.file_converters.converters import pdf_to_image
from src.services.validators.file_validator import validate_uploaded_file


def upload_file(file: UploadFile):
    """Upload a PDF or image file to be processed by the OCR engine and save it in the local storage as a text file.
    Note: If the file already exists, it will be overwritten with the new file."""
    try:
        filename = file.filename
        size = file.size
        mime_type = file.content_type
        file_binary = file.file

        validate_uploaded_file(
            filename=filename, file=file_binary, size=size, mime_type=mime_type
        )

        if mime_type == "text/plain":
            content_bytes = file_binary.read()
            contents = str(content_bytes, "UTF-8")  # Convert bytes to text.

            filepath = path_to_file(filename)  # Target file.
            write_to_file(filepath=filepath, content=contents)  # Read and save text file.
            page_no = 1  # Default to 1 page for text files.
        else:
            images = pdf_to_image(file=file_binary, mime_type=mime_type)  # Convert PDF and images to Image objects.
            page_no = len(images)  # Each image is a page from the file.
            run_ocr_thread(images, filename)  # Start OCR thread.

        return JSONResponse(
            status_code=200,
            content={
                "uploaded": True,
                "filename": filename,
                "size": size,
                "pages": page_no,
            },
        )

    except (TypeError, ValueError) as error:
        return JSONResponse(status_code=400, content={"error": str(error)})

    except Exception as error:
        return JSONResponse(status_code=500, content={"error": str(error)})


def read_file(filename: str):
    """Reads a file on the local storage."""
    try:
        filepath = path_to_file(filename)

        if not is_path_exists(filepath):
            raise ValueError("File does not exist.")

        file_content = read_from_file(filepath)

        return JSONResponse(
            status_code=200, content={"filename": filename, "content": file_content}
        )

    except ValueError as error:
        return JSONResponse(status_code=400, content={"error": str(error)})

    except Exception as error:
        return JSONResponse(status_code=500, content={"error": str(error)})


def delete_file(filename: str):
    """Deletes a file from the local storage."""
    try:
        if not filename:
            raise ValueError("File Name is invalid.")

        filepath = path_to_file(filename)

        if not is_path_exists(filepath):
            raise ValueError("File does not exist.")

        deleted = rm_file(filepath)

        return JSONResponse(
            status_code=200, content={"deleted": deleted}
        )

    except ValueError as error:
        return JSONResponse(status_code=400, content={"error": str(error)})

    except Exception as error:
        return JSONResponse(status_code=500, content={"error": str(error)})


def list_files():
    """Retrieve a list of all files."""
    try:
        files = find_all_files()

        return JSONResponse(
            status_code=200, content={"total": len(files), "files": files}
        )

    except Exception as error:
        return JSONResponse(status_code=500, content={"error": str(error)})
