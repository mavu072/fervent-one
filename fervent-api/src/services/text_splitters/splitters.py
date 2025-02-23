from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.schema import Document


def split_documents(documents: list[Document]):
    """Splits documents into chunks."""

    text_splitter = RecursiveCharacterTextSplitter(
        chunk_size=1000,
        chunk_overlap=500,
        length_function=len,
        add_start_index=True,
    )
    chunks = text_splitter.split_documents(documents)

    return chunks
