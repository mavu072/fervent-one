from fastapi import APIRouter

from src.utils.api_tags_utils import API_TAGS
from src.models.chat_message import Chat
from src.models.message import Message
from src.controllers.llm_chat_controller import send_message_to_assistant_with_retrieval_chain, send_message_to_assistant_with_conversational_chain


router = APIRouter()


@router.post("/v1/llm/completion", tags=[API_TAGS["llm"]])
def send_message_to_assistant(message: Message):
    """Send a one-shot message or query to the LLM."""
    return send_message_to_assistant_with_retrieval_chain(query=message.content)


@router.post("/v1/llm/chat", tags=[API_TAGS["llm"]])
def add_message_to_conversation(chat: Chat):
    """Send a new message to the LLM with conversational history."""
    return send_message_to_assistant_with_conversational_chain(message=chat.new_message, prev_messages=chat.prev_messages)
