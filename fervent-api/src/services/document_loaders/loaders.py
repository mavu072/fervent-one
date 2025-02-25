from langchain_community.document_loaders import DirectoryLoader, PyPDFLoader


def load_directory(dir_path: str, glob: list[str] = ["*.txt"]):
    """Loads all documents from an on-disk directory.
    \n
    *By default, it only loads text files.*
    """

    loader = DirectoryLoader(path=dir_path, glob=glob)
    documents = loader.load()

    return documents


async def load_pdf(pdf_path: str):
    """Loads a PDF document."""

    loader = PyPDFLoader(file_path=pdf_path)
    pages = []

    async for page in loader.alazy_load():
        pages.append(page)

    return pages
