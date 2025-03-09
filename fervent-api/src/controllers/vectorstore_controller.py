from fastapi import UploadFile
from fastapi.responses import JSONResponse
from langchain_core.documents import Document
from langchain_core.document_loaders import Blob

from definitions import UPLOADS_DIR
from src.services.vectorstores.chroma import init_chroma, query_chroma
from src.services.vectorstores.collections import create_collection
from src.services.document_loaders.loaders import load_pdf_directory
from src.services.storage.local_store import mkdirtree

import traceback
import shutil


def initialize_chroma_database():
    """Initialize Chroma (a vector database) and loads the files saved in the local storage."""
    try:
        init_chroma()

        return JSONResponse(
            status_code=200,
            content={"message": "Chroma DB initialized."}
        )
    
    except Exception as error:
        traceback.print_exception(error)

        return JSONResponse(status_code=500, content={"error": str(error)})


def similarity_search_on_chroma(search_input: str):
    """Query Chroma using a similarity search."""
    try:
        results = query_chroma(search_input)
        total = len(results)

        res = []

        for (doc, score) in results:
            obj = {
                "score": score,
                "document": {
                    "page_content": doc.page_content,
                    "metadata": doc.metadata
                }
            }
            res.append(obj)

        return JSONResponse(
            status_code=200,
            content={"total": total, "result": res}
        )
    
    except Exception as error:
        traceback.print_exception(error)

        return JSONResponse(status_code=500, content={"error": str(error)})
    

def add_files_to_vectorstore(collection_name: str, files: list[UploadFile]):
    """Add files to a vector store collection."""
    try:
        # Parse files from request.
        bin_files = list(map(lambda fl: (fl.filename, fl.file), files))

        # Create Write directory for files.
        write_dir = UPLOADS_DIR + "/" + collection_name + "/my_files"
        mkdirtree(write_dir)
        
        # Write files.
        for (filename, file) in bin_files:
            fpath = write_dir + "/" + filename
            saved_file = open(fpath, mode="ab")
            saved_file.write(file.read())
            saved_file.close()
            print(f">>> Saved File: {fpath}")

        # Load and add documents to collection.
        docs = load_pdf_directory(write_dir, mode="single")
        if len(docs) > 0:
            create_collection(collection_name, docs)

        # Delete files.
        shutil.rmtree(write_dir)
        print(f">>> Deleted Directory: {write_dir}")

        return JSONResponse(
            status_code=200, 
            content={
                "success": True, 
                "uploaded_documents": len(files),
                "persisted_documents": len(docs)
            }
        )
    
    except Exception as error:
        traceback.print_exception(error)

        return JSONResponse(status_code=500, content={"error": str(error)})