from langchain_chroma import Chroma
from langchain.schema import Document
from langchain_openai import OpenAIEmbeddings

from services.document_loader import load_document_dir, split_documents_to_chunks

import os
from dotenv import load_dotenv

load_dotenv()

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
CHROMA_DIR = os.getenv("CHROMA_DIR")

import os
import shutil

def init_chromadb():
    """Initializes Chroma Db."""
    
    documents = load_document_dir()
    chunks = split_documents_to_chunks(documents)

    persist_to_chromadb(chunks)


def persist_to_chromadb(chunks: list[Document]):
    """Persists documents to Chroma DB."""

    if os.path.exists(CHROMA_DIR):
        print(f">>> Deleted existing directory: {CHROMA_DIR}.")
        shutil.rmtree(CHROMA_DIR)

    db = Chroma.from_documents(chunks, OpenAIEmbeddings(), persist_directory=CHROMA_DIR)

    print(f">>> Persisted {len(chunks)} chunks to {CHROMA_DIR} directory.")


def query_chromadb(query: str):
    """Queries ChromaDB."""

    db = Chroma(persist_directory=CHROMA_DIR, embedding_function=OpenAIEmbeddings())
    docs = db.similarity_search_with_relevance_scores(query, k=3)

    if len(docs) == 0 or docs[0][1] < 0.7:
        return None

    return docs


def get_chromadb_retriever():
    """Exposes the database as a retriever interface."""

    db = Chroma(persist_directory=CHROMA_DIR, embedding_function=OpenAIEmbeddings())   
    retriever = db.as_retriever(search_type="similarity", search_kwargs={"k":3})

    return retriever