from fastapi import APIRouter, UploadFile

from src.utils.api_tags_utils import API_TAGS
from src.models.chat_message import Chat
from src.models.message import Message
from src.controllers.llm_chat_controller import (
    send_message_to_assistant_with_retrieval_chain, 
    send_message_to_assistant_with_conversational_chain,
    send_file_to_assistant_with_analysis_chain
)


router = APIRouter()


@router.post("/v1/llm/completion", tags=[API_TAGS["llm"]])
def create_chat_completion(message: Message):
    """
    Creates a completion for a message or query.
    
        :param Message message: Instance of Message class. Contains the message content.
    """
    return send_message_to_assistant_with_retrieval_chain(query=message.content)


@router.post("/v1/llm/chat", tags=[API_TAGS["llm"]])
def add_message_to_conversation(chat: Chat):
    """
    Send a new message to the LLM with conversational history.

        :param Chat chat: Instance of Chat class. Contains the new message and previous messages.
    """
    return send_message_to_assistant_with_conversational_chain(message=chat.new_message, prev_messages=chat.prev_messages)


@router.post("/v1/llm/compliance-analysis", tags=[API_TAGS["llm"]])
async def do_compliance_analysis(uuid: str, file: UploadFile):
    """
    Do a compliance analysis on a file.

        :param str uuid: A unique identifier. Used to identify the directory to store the uploaded file.
        :param UploadFile file: A file uploaded in a request.
    """
    fname = file.filename
    file_like = file.file
    fsize = file.size
    ftype = file.content_type
    return await send_file_to_assistant_with_analysis_chain(uuid=uuid, filename=fname, file=file_like, size=fsize, mime_type=ftype)