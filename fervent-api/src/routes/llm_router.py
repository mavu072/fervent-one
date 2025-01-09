from fastapi import APIRouter

from src.utils.api_tags_utils import API_TAGS
from src.models.message import UserMessage
from src.controllers.llm_chat_controller import send_message_to_assistant_with_retrieval_chain, send_message_to_assistant_with_conversational_chain
from src.controllers.llm_analysis_controller import analyze_phrase_compliance_with_scores


router = APIRouter()


@router.post("/v1/llm/completion", tags=[API_TAGS["llm"]])
def send_message_to_assistant(query: str):
    """Send a message or query to the LLM, with no conversational history."""
    return send_message_to_assistant_with_retrieval_chain(query=query)


@router.post("/v1/llm/chat", tags=[API_TAGS["llm"]])
def add_message_to_conversation(user_message: UserMessage):
    """Send a new message to the LLM with conversational history."""
    return send_message_to_assistant_with_conversational_chain(message=UserMessage.message, prev_messages=UserMessage.prev_messages)


@router.post("/v1/llm/analysis", tags=[API_TAGS["llm"]])
def analyze_phrase_compliance(input: str):
    """Analyse a sentence or phrase for compliance with corresponding sentence or phrase. e.g. Input A is complaint with B."""
    return analyze_phrase_compliance_with_scores(input=input)
