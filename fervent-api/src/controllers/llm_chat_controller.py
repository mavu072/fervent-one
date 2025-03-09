from fastapi.responses import JSONResponse
from typing import BinaryIO

from definitions import UPLOADS_DIR
from src.models.chat import Message
from src.services.ner.detection import detect_entities, detect_entities_in_messages
from src.services.ner.censorship import censor_entities, censor_entities_in_messages
from src.services.ner.categories import PERSON
from src.services.llm.chains import run_retrieval_chain, run_conversational_chain, run_analysis_chain
from src.services.llm.chat_utils import format_chat_history
from src.services.vectorstores.collections import get_collection
from src.services.storage.local_store import mkdirtree, rm_file, is_path_exists

import traceback

entity_categories = [PERSON] # Censored entities for LLM.


def send_message_to_assistant_with_retrieval_chain(query: str):
    """Send a message or query to the LLM and get a response."""
    try:
        entity_list = detect_entities(query, entity_categories)
        censored_query = censor_entities(entity_list, query)
        response = run_retrieval_chain(censored_query)

        return JSONResponse(
            status_code=200,
            content={
                "response": response,
                "censored_query": censored_query,
                "censored_data": entity_list,
                }
        )

    except Exception as error:
        print(f"Stacktrace: {traceback.format_exc()} \nError: {error}")
        return JSONResponse(
            status_code=500,
            content={"error": str(error)}
        )
    

async def send_message_to_assistant_with_conversational_chain(uuid: str | None, message: str, prev_messages: list[Message]):
    """Send a message to the LLM with conversational history to get a history aware response."""
    try:
        # Censor sensitive data in messages.
        entity_list = detect_entities(message, entity_categories)
        censored_message = censor_entities(entity_list, message)

        # Censor sensitive data in history.
        chat_history = format_chat_history(prev_messages)
        entity_list_in_history = detect_entities_in_messages(chat_history, entity_categories)
        censored_chat_history = censor_entities_in_messages(entity_list_in_history, chat_history)

        # All censored data.
        censored_data = entity_list + entity_list_in_history

        # Check if user has files loaded in a special vector store collection.
        vectorstore = get_collection(collection_name=uuid)

        if vectorstore is not None:
            response = await run_conversational_chain(censored_message, censored_chat_history, vectorstore)
        else:
            response = await run_conversational_chain(censored_message, censored_chat_history)

        return JSONResponse(
            status_code=200,
            content={
                "response": response,
                "censored_message": censored_message,
                "censored_prev_messages": censored_chat_history,
                "censored_data": censored_data
                }
        )

    except Exception as error:
        print(f"Stacktrace: {traceback.format_exc()} \nError: {error}")
        return JSONResponse(
            status_code=500,
            content={"error": str(error)}
        )


async def send_file_to_assistant_with_analysis_chain(uuid: str, filename: str, file: BinaryIO, size: int, mime_type: str):
    """Send a file to the LLM to get a compliance analysis."""
    try:
        # Create user's unique file directory for temporary stored files.
        uploads_dir = UPLOADS_DIR + "/" + uuid + "/tmp"
        mkdirtree(uploads_dir)

        # Create file path
        filepath = uploads_dir + "/" + filename

        # Write file.
        open(file=filepath, mode="wb").write(file.read())
        print(f">>> Uploaded File: {filepath}")

        # Analysis.
        analysis_error = None
        try:
            response = await run_analysis_chain(filepath)
        except Exception as error:
            analysis_error = error
            print(f">>> Analysis Error: {analysis_error}")

        # Remove file.
        if rm_file(filepath) is True:
            print(f">>> Deleted file: {filepath}")

        if analysis_error is not None:
            raise analysis_error

        return response

    except Exception as error:
        print(f"Stacktrace: {traceback.format_exc()} \nError: {error}")
        return JSONResponse(
            status_code=500,
            content={"error": str(error)}
        )