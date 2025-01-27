from langchain_community.document_loaders import DirectoryLoader, PyPDFLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.schema import Document


def load_directory(dir_path: str):
    """Loads all text documents from an on-disk directory."""

    loader = DirectoryLoader(path=dir_path, glob="*.txt")
    documents = loader.load()

    return documents


async def load_pdf(pdf_path: str):
    """Loads a PDF document."""

    loader = PyPDFLoader(file_path=pdf_path)
    pages = []

    async for page in loader.alazy_load():
        pages.append(page)

    return pages


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
