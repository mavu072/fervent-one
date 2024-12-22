from fastapi import FastAPI, UploadFile
from fastapi.responses import JSONResponse

from models.message import UserMessage
from services.vector_db import init_chromadb, query_chromadb
from services.ocr import convert_pdf_to_image, ocr_image_to_text, read_from_file, find_all_files
from services.ner import find_named_entities
from services.llm_chains import run_retrieval_chain, run_conversational_chain
from utils.message_utils import format_chat_history

from utils.ner_validator_utils import censor_named_entities
import traceback

app = FastAPI()


@app.get("/")
def root():
    return {"message": "Lets roll out!"}


@app.get("/vectordb/init")
def initialize_vector_database():
    """Initialize the vector database from the files in the local storage."""
    try:
        init_chromadb()

        return JSONResponse(
            status_code=200,
            content={"message": "Vector DB initialized"}
        )
    except Exception as error:
        traceback.print_exception(error)
        return JSONResponse(
            status_code=500,
            content={"error": str(error)}
        )


@app.post("/vectordb/query")
def query_vector_database(query: str):
    """Query the vector database using a similarity search."""
    try:
        results = query_chromadb(query)
        total = len(results)

        return JSONResponse(
            status_code=200,
            content={"total": total, "result": results}
        )
    except Exception as error:
        return JSONResponse(
            status_code=500,
            content={"error": str(error)}
        )


@app.post("/ocr/files/upload/")
async def upload_file(file: UploadFile):
    """Upload a PDF or image file to be processed by the OCR engine and save it in the local storage."""
    try:
        fname, fsize = file.filename, file.size

        images = await convert_pdf_to_image(file)
        fpages = len(images)

        ocr_image_to_text(images, fname)

        return JSONResponse(
            status_code=200, 
            content={"uploaded": True, "filename": fname, "size": fsize, "pages": fpages}
            )

    except Exception as error:
        return JSONResponse(
            status_code=500,
            content={"error": str(error)}
            )
    


@app.get("/ocr/files/retrieve/")
def retrieve_file(filename: str):
    """Retrieve an uploaded file from the local storage."""
    try:
        filecontent = read_from_file(filename)

        return JSONResponse(
            status_code=200, 
            content={"filename": filename, "filecontent": filecontent}
            )

    except Exception as error:
        return JSONResponse(
            status_code=500, 
            content={"error": str(error)}
            )


@app.get("/ocr/files/list/")
def list_files():
    """Retrieve a list of all uploaded files."""
    try:
        files = find_all_files()

        return JSONResponse(
            status_code=200, 
            content={"total": len(files), "files": files}
            )

    except Exception as error:
        return JSONResponse(
            status_code=500,
            content={"error": str(error)}
            )


@app.post("/ner/entity/recognition/")
def identify_named_entities(text: str):
    """Find named entities within a text."""
    try:
        entity_list = find_named_entities(text)
        total = len(entity_list)

        return JSONResponse(
            status_code=200,
            content={"total": total, "entities": entity_list}
        )
    except Exception as error:
        return JSONResponse(
            status_code=500,
            content={"error": str(error)}
        )


@app.post("/llm/prompt")
async def prompt_llm_assistant(query: str):
    """Prompt the LLM."""
    try:
        entity_list = find_named_entities(query)
        censored_query = censor_named_entities(entity_list, query)
        result = run_retrieval_chain(censored_query)

        return JSONResponse(
            status_code=200,
            content={"censored_input": censored_query, "response": result}
        )

    except Exception as error:
        return JSONResponse(
            status_code=500,
            content={"error": str(error)}
        )

@app.post("/llm/chat")
async def send_message_to_llm_assistant(user_message: UserMessage):
    """Send a message to the LLM."""
    try:
        message = user_message.message
        chat_history = format_chat_history(user_message.prev_messages)

        entity_list = find_named_entities(message)
        censored_message = censor_named_entities(entity_list, message)
        result = run_conversational_chain(censored_message, chat_history)

        return JSONResponse(
            status_code=200,
            content={"censored_input": censored_message, "response": result}
        )

    except Exception as error:
        return JSONResponse(
            status_code=500,
            content={"error": str(error)}
        )