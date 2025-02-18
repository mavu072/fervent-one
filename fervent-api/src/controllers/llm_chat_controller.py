from fastapi.responses import JSONResponse
from typing import BinaryIO

from src.config.constants import UPLOADS_DIR
from src.models.chat import Message
from src.services.ner import find_named_entities
from src.services.llm_chains import run_retrieval_chain, run_conversational_chain, run_analysis_chain
from src.services.disk_storage import mkdirtree, rm_file
from src.utils.message_utils import format_chat_history, find_named_entities_in_message_list, censor_name_entities_in_message_list
from src.utils.ner_validator_utils import censor_named_entities
from src.utils.ner_entity_category_utils import PERSON

import traceback

entity_categories = [PERSON] # Censored entities for LLM.


def send_message_to_assistant_with_retrieval_chain(query: str):
    """Send a message or query to the LLM and get a response."""
    try:
        entity_list = find_named_entities(query, entity_categories)
        censored_query = censor_named_entities(entity_list, query)
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
    

def send_message_to_assistant_with_conversational_chain(uuid: str | None, message: str, prev_messages: list[Message]):
    """Send a message to the LLM with conversational history to get a history aware response."""
    try:
        entity_list = find_named_entities(message, entity_categories)
        censored_message = censor_named_entities(entity_list, message)

        chat_history = format_chat_history(prev_messages)
        entity_list_in_history = find_named_entities_in_message_list(chat_history, entity_categories)
        censored_chat_history = censor_name_entities_in_message_list(entity_list_in_history, chat_history)

        response = run_conversational_chain(censored_message, censored_chat_history)

        censored_data = entity_list + entity_list_in_history

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
    """"""
    try:
        # Get uploader's unique path.
        uploads_dir = UPLOADS_DIR + "/" + uuid
        mkdirtree(uploads_dir)

        # Get file path
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