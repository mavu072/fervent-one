from fastapi import FastAPI, UploadFile
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware

from src.models.message import UserMessage
from src.services.disk_storage import read_from_file, find_all_files, write_to_file
from src.services.vector_db import init_chromadb, query_chromadb
from src.services.ocr import convert_pdf_to_image, ocr_image_to_text, read_images_to_text
from src.services.ner import find_named_entities
from src.services.llm_chains import run_retrieval_chain, run_conversational_chain
from src.utils.message_utils import format_chat_history
from src.utils.ner_validator_utils import censor_named_entities

import traceback
import os
from dotenv import load_dotenv


load_dotenv()


app = FastAPI(
    title="fervent-rest-api-backend",
    version="0.0.0"
)


# Origin specified in env file.
ALLOWED_ORIGIN = os.getenv("ALLOWED_ORIGIN")


# Allowed origins.
origins = [
    "http://localhost",
    "http://localhost:3000",
    "http://127.0.0.0",
    "http://127.0.0.0:3000",
    ALLOWED_ORIGIN,
]


# CORS middleware to allow cross-origin connections.
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# OpenAPI Tags
apiTags = {
    "disk-storage": "Disk Storage",
    "vector-db": "Vector Database (Chroma)",
    "ocr": "Optical Character Recognition (OCR)",
    "ner": "Named Entity Recognition (NER)",
    "llm": "Large Language Model (LLM)"
}


@app.get("/")
def root():
    return {"message": "Lets roll out!"}


# Vector Database

@app.get("/vector/database/init", tags=[apiTags["vector-db"]])
def initialize_vector_database():
    """Initialize the vector database with the files currently saved in the local storage."""
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


@app.post("/vector/database/query", tags=[apiTags["vector-db"]])
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


# Disk Storage

@app.post("/storage/disk/files/upload/", tags=[apiTags["disk-storage"]])
def upload_file(file: UploadFile):
    """Upload a PDF or image file to be processed by the OCR engine and save it in the local storage as a text file.
        If the file already exists, it will be overwritten with the new file."""
    try:
        fname, fsize, ftype = file.filename, file.size, file.content_type

        max_file_size = 20 * 1024 * 1024 # 20 MB
        supported_file_types = ["application/pdf", "text/plain", "image/png", "image/jpg", "image/jpeg"]

        if not ftype in supported_file_types:
            raise TypeError("File Type is not supported.")

        if fsize > max_file_size:
            raise ValueError("File too large. Exceeded maximum of 20 MB.")

        if ftype == "text/plain":
            content_bytes = file.file.read()
            contents = str(content_bytes, "UTF-8") # Convert bytes to text.
            write_to_file(filename=fname, content=contents) # Read and save text file.
            fpages = 1 # Default to 1 page for text files.
        else:
            images = convert_pdf_to_image(file=file.file, mime_type=ftype)
            fpages = len(images)
            ocr_image_to_text(images, fname)  # Start OCR thread.

        return JSONResponse(
            status_code=200, 
            content={"uploaded": True, "filename": fname, "size": fsize, "pages": fpages}
        )

    except (TypeError, ValueError) as error:
        return JSONResponse(
            status_code=400,
            content={"error": str(error)}
        )

    except Exception as error:
        return JSONResponse(
            status_code=500,
            content={"error": str(error)}
        )


@app.get("/storage/disk/files/retrieve/", tags=[apiTags["disk-storage"]])
def retrieve_file(filename: str):
    """Retrieve an uploaded file from the local storage."""
    try:
        file_content = read_from_file(filename)

        return JSONResponse(
            status_code=200, 
            content={"filename": filename, "content": file_content}
        )

    except Exception as error:
        return JSONResponse(
            status_code=500, 
            content={"error": str(error)}
        )


@app.get("/storage/disk/files/list/", tags=[apiTags["disk-storage"]])
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


# OCR

@app.post("/ocr/files/extraction/", tags=[apiTags["ocr"]])
def extract_text_from_file(file: UploadFile):
    """Extract text from file."""
    try:
        fname, fsize, ftype = file.filename, file.size, file.content_type

        img_pages = convert_pdf_to_image(file=file.file, mime_type=ftype)
        content_pages = read_images_to_text(images=img_pages)
        fpages = len(img_pages)

        return JSONResponse(
            status_code=200,
            content={
                "filename": fname, "size": fsize, "pages": fpages,
                "extracted_text_per_page": content_pages
            }
        )
    
    except Exception as error:
        return JSONResponse(
            status_code=500,
            content={"error": str(error)}
        )


# NER

@app.post("/ner/entity/recognition/", tags=[apiTags["ner"]])
def identify_named_entities(text: str):
    """Find named entities (People and Organizations) within text."""
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


@app.post("/ner/entity/censorship/", tags=[apiTags["ner"]])
def identify_and_censor_named_entities(text: str):
    """Find and censor named entities (People and Organizations) within text."""
    try:
        entity_list = find_named_entities(text)
        censored_text = censor_named_entities(entity_list, text)
        total = len(entity_list)

        return JSONResponse(
            status_code=200,
            content={"total": total, "entities": entity_list, "censored_text": censored_text}
        )
    
    except Exception as error:
        return JSONResponse(
            status_code=500,
            content={"error": str(error)}
        )


# LLM

@app.post("/llm/prompt", tags=[apiTags["llm"]])
def send_message_to_assistant(query: str):
    """Sends a message or query with a one-shot prompt the LLM."""
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


@app.post("/llm/chat", tags=[apiTags["llm"]])
def add_message_to_conversation_with_assistant(user_message: UserMessage):
    """Adds a message to the LLM with conversational history awareness."""
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
