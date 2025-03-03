from langchain_chroma import Chroma
from langchain_core.documents import Document
from langchain_openai import OpenAIEmbeddings

from definitions import CHROMA_DIR, DOCUMENT_DIR
from src.services.document_loaders.loaders import load_directory 
from src.services.text_splitters.splitters import split_documents
from src.services.storage.local_store import mkdir

import os
from dotenv import load_dotenv

load_dotenv()

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")


def create_vector_store_from_documents(documents: list[Document]):
    """Creates a Chroma vectorstore from a list of documents (Uses default langchain collection)."""

    # Uses default langchain collection.
    db = Chroma.from_documents(
        documents=documents, embedding=OpenAIEmbeddings(), persist_directory=CHROMA_DIR
    )

    return db


def chroma_client():
    """Get Chroma client (Uses default langchain collection)."""

    # Uses default langchain collection.
    db = Chroma(persist_directory=CHROMA_DIR, embedding_function=OpenAIEmbeddings())

    return db


def chroma_retriever():
    """Get Chroma vector store (database) as a retriever interface."""

    db = chroma_client()
    retriever = db.as_retriever(search_type="similarity", search_kwargs={"k": 3})

    return retriever


def query_chroma(query: str):
    """Queries Chroma vector store (database)."""

    db = chroma_client()
    docs = db.similarity_search_with_relevance_scores(query, k=3)

    if len(docs) == 0 or docs[0][1] < 0.7:
        return None

    return docs


async def aquery_vector_store(query: str, db: Chroma):
    """Queries Chroma vector store asynchronously."""

    docs = await db.asimilarity_search_with_relevance_scores(query, k=4)

    if len(docs) == 0 or docs[0][1] < 0.7:
        return None
    
    return docs


def init_chroma():
    """
    Initializes a default Chroma vector store (database),
    and loads all documents, which are reserved for use by the system,
    from the local storage into the vector store.
    """

    mkdir(DOCUMENT_DIR)

    documents = load_directory(DOCUMENT_DIR)
    print(f">>> Loaded {len(documents)} documents from directory: {DOCUMENT_DIR}.")

    chunks = split_documents(documents)
    print(f">>> Split {len(documents)} documents into {len(chunks)} chunks.")

    mkdir(CHROMA_DIR)
    Chroma.delete_collection(chroma_client())

    create_vector_store_from_documents(chunks)
    print(f">>> Persisted {len(chunks)} documents to Chroma DB.")
