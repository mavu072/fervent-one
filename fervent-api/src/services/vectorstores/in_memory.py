from langchain_core.vectorstores import InMemoryVectorStore
from langchain_core.documents import Document
from langchain_openai import OpenAIEmbeddings

import os
from dotenv import load_dotenv

load_dotenv()

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")


def create_in_memory_vector_store(docs: list[Document]) -> InMemoryVectorStore:
    """Creates an in memory vector store from a list of documents.

        :param list[Document] docs: List of Documents to add to the vectorstore.
    """

    vector_store = InMemoryVectorStore.from_documents(documents=docs, embedding=OpenAIEmbeddings())

    return vector_store


def query_in_memory_vector_store(vector_store: InMemoryVectorStore, query: str, k: int = 4) -> (list[tuple[Document, float]] | None):
    """Queries in memory vector store.

        :param InMemoryVectorStore vector_store: In-memory vector store.
        :param str query: Search query.
        :param int k: Number of documents to return from the search.
    """

    docs = vector_store.similarity_search_with_score(query, k)

    if len(docs) == 0 or docs[0][1] < 0.7:
        return None

    return docs


async def aquery_in_memory_vector_store(vector_store: InMemoryVectorStore, query: str, k: int = 4) -> (list[tuple[Document, float]] | None):
    """Queries in memory vector store asynchronously.

        :param InMemoryVectorStore vector_store: In-memory vector store.
        :param str query: Search query.
        :param int k: Number of documents to return from the search.
    """

    docs = await vector_store.asimilarity_search_with_score(query, k)

    if len(docs) == 0 or docs[0][1] < 0.7:
        return None

    return docs