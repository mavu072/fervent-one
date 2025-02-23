from src.services.vectorstores.vectorstore_collections import list_all_collections, create_new_collection, delete_collection
from langchain_chroma import Chroma
from langchain.schema import Document
from chromadb.errors import InvalidCollectionException


def mock_collection():
    mock_collection_name = "TEST"
    mock_docs = [
        Document(page_content="Hello world!"),
        Document(page_content="Foo bar!"),
    ]

    return (mock_collection_name, mock_docs)


def test_create_new_collection():
    (mock_collection_name, mock_docs) = mock_collection()

    collection = create_new_collection(collection_name=mock_collection_name, documents=mock_docs)
    delete_collection(mock_collection_name) # Teardown mocks.

    assert collection is not None
    assert type(collection) is Chroma


def test_delete_collection():
    (mock_collection_name, mock_docs) = mock_collection()

    collection = create_new_collection(collection_name=mock_collection_name, documents=mock_docs) # Setup mocks.
    is_deleted = delete_collection(collection_name=mock_collection_name)

    get_error = None
    try:
        Chroma.get(collection) # Test retrieval should throw error.

    except InvalidCollectionException as error:
        get_error = error

    assert collection is not None
    assert is_deleted is True
    assert get_error is not None and type(get_error) is InvalidCollectionException


def test_list_all_collections():
    (mock_collection_name, mock_docs) = mock_collection()

    create_new_collection(collection_name=mock_collection_name, documents=mock_docs) # Setup mocks.
    collections = list_all_collections()
    delete_collection(collection_name=mock_collection_name) # Teardown mocks.

    print(f"Collections: {collections}")

    assert len(collections) is 2 # Check for two collections because langchain collection may have already been created.