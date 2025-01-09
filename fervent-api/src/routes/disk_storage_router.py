from fastapi import APIRouter, UploadFile

from src.utils.api_tags_utils import API_TAGS
from src.controllers.disk_storage_controller import upload_file_to_disk, read_file_from_disk, delete_file_from_disk, list_files_on_disk


router = APIRouter()


@router.post("/v1/storage/disk/files/", tags=[API_TAGS["disk-storage"]])
def upload_file_to_disk_storage(file: UploadFile):
    """Upload a file and save it as a text file."""
    fname = file.filename
    fsize = file.size
    ftype = file.content_type
    file_like = file.file
    return upload_file_to_disk(filename=fname, file=file_like, size=fsize, mime_type=ftype)


@router.get("/v1/storage/disk/files/", tags=[API_TAGS["disk-storage"]])
def find_and_read_file(filename: str):
    """Find and read a file with the filename."""
    return read_file_from_disk(filename=filename)


@router.delete("/v1/storage/disk/files/", tags=[API_TAGS["disk-storage"]])
def find_and_delete_file(filename: str):
    """Find and delete a file with the filename."""
    return delete_file_from_disk(filename=filename)


@router.get("/v1/storage/disk/files/all/", tags=[API_TAGS["disk-storage"]])
def list_files():
    """Get all files."""
    return list_files_on_disk()
