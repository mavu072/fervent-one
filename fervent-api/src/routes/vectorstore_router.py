from fastapi import APIRouter

from definitions import API_TAGS
from src.controllers.vectorstore_controller import initialize_chroma_database, similarity_search_on_chroma


router = APIRouter()


@router.get("/v1/vector/database/init", tags=[API_TAGS["vector-db"]])
def initialize_vector_database():
    """Initialize the vector database with the files currently saved in the local storage."""
    return initialize_chroma_database()


@router.post("/v1/vector/database/search", tags=[API_TAGS["vector-db"]])
def similarity_search_on_vector_database(input: str):
    """Query vector database using a similarity search."""
    return similarity_search_on_chroma(search_input=input)
