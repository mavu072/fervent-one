from fastapi import APIRouter, UploadFile

from definitions import API_TAGS
from src.controllers.local_storage_controller import upload_file, read_file, delete_file, list_files


router = APIRouter()


@router.post("/v1/storage/local/files/", tags=[API_TAGS["local-storage"]])
def upload_file_to_local_storage(file: UploadFile):
    """Upload a file and save it as a text file."""
    return upload_file(file=file)


@router.get("/v1/storage/local/files/", tags=[API_TAGS["local-storage"]])
def find_and_read_file(filename: str):
    """Find and read a file with the filename."""
    return read_file(filename=filename)


@router.delete("/v1/storage/local/files/", tags=[API_TAGS["local-storage"]])
def find_and_delete_file(filename: str):
    """Find and delete a file with the filename."""
    return delete_file(filename=filename)


@router.get("/v1/storage/local/files/all/", tags=[API_TAGS["local-storage"]])
def list_files():
    """Get all files."""
    return list_files()
