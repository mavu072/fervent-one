from typing import BinaryIO, TextIO


def validate_uploaded_file(filename: str, file: BinaryIO | TextIO, size: int, mime_type: str):
    """Validates an uploaded file."""

    valid = False
    max_file_size = 20 * 1024 * 1024 # 20 MB
    supported_file_types = ["application/pdf", "text/plain", "image/png", "image/jpg", "image/jpeg"]

    if not filename:
        raise Exception("File name is invalid.")
    
    if not file:
        raise Exception("File is invalid.")
    
    if not size:
        raise Exception("File Size is invalid.")
    
    if not mime_type:
        raise Exception("File Type is invalid.")

    if not mime_type in supported_file_types:
        raise TypeError("File Type is not supported.")

    if size > max_file_size:
        raise ValueError("File too large. Exceeded maximum of 20 MB.")
    
    valid = True # Passed all validation tests.

    return valid

