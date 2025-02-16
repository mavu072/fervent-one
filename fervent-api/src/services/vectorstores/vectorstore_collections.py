from langchain_chroma import Chroma
from langchain.schema import Document
from langchain_openai import OpenAIEmbeddings
from chromadb.config import Settings
from chromadb.errors import InvalidCollectionException

from src.services.document_loader import load_directory, split_documents_to_chunks
from src.services.disk_storage import mkdir
from src.config.constants import CHROMA_DIR

import os
import chromadb

from dotenv import load_dotenv

load_dotenv()

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

chroma_client = chromadb.Client(settings=Settings(is_persistent=True,  persist_directory=CHROMA_DIR))


def create_new_collection(collection_name: str, documents: list[Document]):
    """Creates a new collection in the vector store and loads a list of documents."""

    docs_chunks = split_documents_to_chunks(documents)

    vector_store = Chroma.from_documents(collection_name=collection_name, documents=docs_chunks, embedding=OpenAIEmbeddings(), persist_directory=CHROMA_DIR)

    return vector_store


def delete_collection(collection_name: str):
    """Deletes a collection."""

    is_deleted = False
    chroma_client.delete_collection(collection_name)

    try:
        chroma_client.get_collection(collection_name) # Raises ValueError is collection no longer exists.

    except (ValueError, InvalidCollectionException):
        is_deleted = True

    return is_deleted


def list_all_collections():
    """Lists all collections in the vector store."""

    collections = chroma_client.list_collections()

    return collections