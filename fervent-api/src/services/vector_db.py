from langchain_chroma import Chroma
from langchain.schema import Document
from langchain_openai import OpenAIEmbeddings

from src.services.document_loader import load_document_dir, split_documents_to_chunks
from src.utils.file_utils import create_directory_if_not_exists

import os
import shutil
from dotenv import load_dotenv

load_dotenv()

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
CHROMA_DIR = os.getenv("CHROMA_DIR")
DOCUMENT_DIR = os.getenv("DOCUMENT_DIR")


def create_vector_store_from_documents(documents: list[Document]):
    """Creates a Chroma vectorstore from a list of documents (Uses default langchain collection)."""

    # Uses default langchain collection.
    db = Chroma.from_documents(documents=documents, embedding=OpenAIEmbeddings(), persist_directory=CHROMA_DIR)

    return db


def get_chroma_client():
    """Get Chroma client (Uses default langchain collection)."""

    # Uses default langchain collection.
    db = Chroma(persist_directory=CHROMA_DIR, embedding_function=OpenAIEmbeddings())

    return db


def get_chromadb_retriever():
    """Get Chroma database as a retriever interface."""

    db = get_chroma_client()
    retriever = db.as_retriever(search_type="similarity", search_kwargs={"k":3})

    return retriever


def query_chromadb(query: str):
    """Queries Chroma database."""

    db = get_chroma_client()
    docs = db.similarity_search_with_relevance_scores(query, k=3)

    if len(docs) == 0 or docs[0][1] < 0.7:
        return None

    return docs


def init_chromadb():
    """Initializes Chroma database and loads documents in the local disk storage into the vector database."""

    create_directory_if_not_exists(DOCUMENT_DIR)
    
    documents = load_document_dir(DOCUMENT_DIR)
    print(f">>> Loaded {len(documents)} documents from directory: {DOCUMENT_DIR}.")

    chunks = split_documents_to_chunks(documents)
    print(f">>> Split {len(documents)} documents into {len(chunks)} chunks.")

    create_directory_if_not_exists(CHROMA_DIR)
    Chroma.delete_collection(get_chroma_client())

    create_vector_store_from_documents(chunks)
    print(f">>> Persisted {len(chunks)} documents to Chroma DB.")
