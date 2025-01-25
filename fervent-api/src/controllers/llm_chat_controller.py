from fastapi.responses import JSONResponse

from src.models.chat_message import ChatMessage
from src.services.ner import find_named_entities
from src.services.llm_chains import run_retrieval_chain, run_conversational_chain
from src.utils.message_utils import format_chat_history, censor_name_entities_in_message_list
from src.utils.ner_validator_utils import censor_named_entities
from src.utils.ner_entity_category_utils import PERSON


entity_categories = [PERSON] # Censored entities for this LLM module.


def send_message_to_assistant_with_retrieval_chain(query: str):
    """Send a message or query to the LLM and get a response."""
    try:
        entity_list = find_named_entities(query, entity_categories)
        censored_query = censor_named_entities(entity_list, query)
        response = run_retrieval_chain(censored_query)

        return JSONResponse(
            status_code=200,
            content={
                "censored_query": censored_query,
                "censored_data": entity_list,
                "response": response
                }
        )

    except Exception as error:
        return JSONResponse(
            status_code=500,
            content={"error": str(error)}
        )
    

def send_message_to_assistant_with_conversational_chain(message: str, prev_messages: list[ChatMessage]):
    """Send a message to the LLM with conversational history to get a history aware response."""
    try:
        entity_list = find_named_entities(message, entity_categories)
        censored_message = censor_named_entities(entity_list, message)

        chat_history = format_chat_history(prev_messages)
        censored_chat_history = censor_name_entities_in_message_list(chat_history)

        response = run_conversational_chain(censored_message, censored_chat_history)

        return JSONResponse(
            status_code=200,
            content={
                "censored_message": censored_message,
                "censored_prev_messages": censored_chat_history,
                "censored_data": entity_list,
                "response": response
                }
        )

    except Exception as error:
        return JSONResponse(
            status_code=500,
            content={"error": str(error)}
        )
