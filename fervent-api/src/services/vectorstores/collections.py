from langchain_chroma import Chroma
from langchain_core.documents import Document
from langchain_openai import OpenAIEmbeddings
from chromadb.config import Settings
from chromadb.errors import InvalidCollectionException

from definitions import CHROMA_DIR
from src.services.text_splitters.splitters import split_documents

import os
import chromadb
from dotenv import load_dotenv

load_dotenv()

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

persist_dir = CHROMA_DIR
chroma_client = chromadb.Client(settings=Settings(is_persistent=True, persist_directory=persist_dir))


def create_collection(collection_name: str, documents: list[Document]) -> Chroma:
    """Creates a new collection in the vector store and loads it with a list of documents."""

    vector_store = Chroma.from_documents(
        collection_name=collection_name,
        documents=documents,
        embedding=OpenAIEmbeddings(),
        persist_directory=persist_dir,
    )

    return vector_store


def get_collection(collection_name: str) -> Chroma:
    """Gets a collection."""

    try:
        vector_store = Chroma(
            collection_name=collection_name,
            embedding_function=OpenAIEmbeddings(),
            persist_directory=persist_dir,
            create_collection_if_not_exists=False
        )
    except InvalidCollectionException:
        vector_store = None

    return vector_store


def delete_collection(collection_name: str):
    """Deletes a collection."""

    is_deleted = False
    chroma_client.delete_collection(collection_name)

    try:
        chroma_client.get_collection(
            collection_name
        )  # Raises ValueError is collection no longer exists.

    except (ValueError, InvalidCollectionException):
        is_deleted = True

    return is_deleted


def list_all_collections():
    """Lists all collections in the vector store."""

    collections = chroma_client.list_collections()

    return collections
