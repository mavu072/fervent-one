from langchain_core.vectorstores import InMemoryVectorStore
from langchain.schema import Document
from langchain_openai import OpenAIEmbeddings

import os
from dotenv import load_dotenv

load_dotenv()

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

def create_in_memory_vector_store_from_documents(documents: list[Document]):
    """Creates an in memory vector store."""

    vector_store = InMemoryVectorStore.from_documents(documents)

    return vector_store


def query_in_memory_vector_store(vector_store: InMemoryVectorStore, query: str):
    """Queries in memory vector store."""

    docs = vector_store.similarity_search_with_relevance_scores(query, k=3)

    if len(docs) == 0 or docs[0][1] < 0.7:
        return None

    return docs
