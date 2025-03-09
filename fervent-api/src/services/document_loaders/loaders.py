from langchain_community.document_loaders import DirectoryLoader, PyPDFLoader, PyPDFDirectoryLoader
from typing import Literal

import os
import time


def load_directory(dir_path: str, glob: list[str] | tuple[str] | str = ["*.txt"]):
    """Loads all documents from a directory.
    \n
    *By default, it only loads text files.*
    """

    loader = DirectoryLoader(path=dir_path, glob=glob, show_progress=True)
    documents = loader.load()

    return documents


async def load_pdf(pdf_path: str, mode: Literal['single', 'page'] = "page"):
    """Loads a PDF document into single document or several documents, each representing a single page.
    \n
    *By default, it only loads using the 'page' mode.*
    """

    loader = PyPDFLoader(file_path=pdf_path, mode=mode, extraction_mode="layout")
    pages = []

    async for page in loader.alazy_load():
        pages.append(page)

    return pages


def load_pdf_directory(dir_path: str, mode: Literal['single', 'page'] = "page"):
    """Loads all PDF documents from a directory."""

    files = os.listdir(dir_path)
    print(f"Loading PDF Directory: {dir_path}, Total Files: {len(files)}")

    # Load PDFs
    timer_start = time.perf_counter()

    loader = PyPDFDirectoryLoader(path=dir_path, mode=mode, extraction_mode="layout")
    pdf_docs = list(loader.lazy_load())

    timer_stop = time.perf_counter()

    print(f"Loaded PDF Directory: {dir_path}, Total Files: {len(pdf_docs)}")
    print(f"* Finished Loading Directory in... {timer_stop - timer_start:0.4f} seconds")

    return pdf_docs