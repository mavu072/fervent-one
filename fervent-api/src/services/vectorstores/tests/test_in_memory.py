from src.services.vectorstores.in_memory import (
    create_in_memory_vector_store,
    query_in_memory_vector_store,
    aquery_in_memory_vector_store,
)
from langchain_core.documents import Document
from langchain_core.vectorstores import InMemoryVectorStore

import pytest

# Mock documents
doc_1 = Document(id="1", page_content="foo", metadata={"baz": "bar"})  
doc_2 = Document(id="2", page_content="thud", metadata={"bar": "baz"})  
doc_3 = Document(id="3", page_content="i will be deleted :(")
doc_4 = Document(id="4", page_content="Hello world!")


def test_create_in_memory_vector_store():

    db = create_in_memory_vector_store(docs=[doc_1, doc_2, doc_3])

    assert db is not None
    assert type(db) is InMemoryVectorStore

    for index, (id, doc) in enumerate(db.store.items()):
        print(f"{id}: {doc['text']}")
        assert doc is not None
        assert doc["id"] is not None
        assert doc["text"] is not None
        assert doc["vector"] is not None
        assert doc["metadata"] is not None


def test_query_in_memory_vector_store():

    db = create_in_memory_vector_store(docs=[doc_1, doc_2, doc_3])
    db.add_documents([doc_4]) # Add irrelevent doc, which should not be returned.

    query = "foo"
    k = 2 # Number of returned documents.
    result = query_in_memory_vector_store(vector_store=db, query=query, k=k)

    assert len(result) == k
    assert type(result[0]) is tuple


@pytest.mark.asyncio
async def test_aquery_in_memory_vector_store():

    db = create_in_memory_vector_store(docs=[doc_1, doc_2, doc_3])
    query = "thud"
    k = 1 # Number of returned documents.
    result = await aquery_in_memory_vector_store(vector_store=db, query=query, k=k)

    assert len(result) == k
    assert type(result[0]) is tuple
