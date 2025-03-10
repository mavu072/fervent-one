from fastapi.responses import JSONResponse

from src.services.vectorstores.chroma import init_chroma, query_chroma

import traceback


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

        return JSONResponse(
            status_code=500,
            content={"error": str(error)}
        )


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

        return JSONResponse(
            status_code=500,
            content={"error": str(error)}
        )