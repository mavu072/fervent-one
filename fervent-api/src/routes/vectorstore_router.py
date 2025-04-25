from fastapi import APIRouter, UploadFile, Form, File
from typing import Annotated

from definitions import API_TAGS
from src.controllers.vectorstore_controller import (
    initialize_chroma_database, 
    similarity_search_on_chroma, 
    add_files_to_vectorstore
)


router = APIRouter()


@router.get("/v1/vector/database/init", tags=[API_TAGS["vector-db"]])
def initialize_vector_database():
    """Initialize the vector database with the files currently saved in the local storage."""
    return initialize_chroma_database()


@router.post("/v1/vector/database/search", tags=[API_TAGS["vector-db"]])
def similarity_search_on_vector_database(input: str):
    """Query vector database using a similarity search."""
    return similarity_search_on_chroma(search_input=input)


@router.post("/v1/vector/collections/upload", tags=[API_TAGS["vector-store"]])
def upload_files_to_vectorstore(
    collection_name: Annotated[str, Form()], 
    files: Annotated[list[UploadFile], File()]
):
    """
    Upload a file to a users vector store collection, creates the collection if it does not exist.
    
        :param str collection_name: A unique identifier. Used to identify the vector store collection to save the files.
        :param list[UploadFile] files: A list of files uploaded in the request.
    """
    return add_files_to_vectorstore(collection_name=collection_name, files=files)