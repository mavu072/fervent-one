from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from src.routes.vector_db_router import router as vector_db_router
from src.routes.disk_storage_router import router as disk_storage_router
from src.routes.ocr_extraction_router import router as ocr_extraction_router
from src.routes.ner_entity_router import router as ner_entity_router
from src.routes.llm_router import router as llm_router

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

# Include routes.
app.include_router(vector_db_router)
app.include_router(disk_storage_router)
app.include_router(ocr_extraction_router)
app.include_router(ner_entity_router)
app.include_router(llm_router)


@app.get("/")
def root():
    return {"message": "Lets roll out!"}
