from langchain_community.document_loaders import DirectoryLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.schema import Document


def load_document_dir(document_dir: str):
    """Loads all text documents from the on-disk document directory."""

    loader = DirectoryLoader(path=document_dir, glob="*.txt")
    documents = loader.load()

    return documents


def split_documents_to_chunks(documents:list[Document]):
    """Splits documents into chunks."""
    
    text_splitter = RecursiveCharacterTextSplitter(
        chunk_size=1000,
        chunk_overlap=500,
        length_function=len,
        add_start_index=True,
    )
    chunks = text_splitter.split_documents(documents)

    return chunks
