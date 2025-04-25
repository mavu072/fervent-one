from fastapi import APIRouter, UploadFile, Form, File
from typing import Annotated

from definitions import API_TAGS
from src.models.chat import Chat
from src.controllers.llm_chat_controller import (
    send_message_to_assistant_with_retrieval_chain,
    send_message_to_assistant_with_conversational_chain,
    send_file_to_assistant_with_analysis_chain,
)


router = APIRouter()


@router.post("/v1/llm/completion", tags=[API_TAGS["llm"]])
def create_chat_completion(message: Annotated[str, Form()]):
    """
    Creates a completion for a message.

        :param str message: String text.
    """
    return send_message_to_assistant_with_retrieval_chain(query=message)


@router.post("/v1/llm/chat", tags=[API_TAGS["llm"]])
async def add_message_to_conversation(chat: Chat):
    """
    Sends a new message to the LLM with conversational history.

        :param Chat chat: Chat class. Contains the uuid, new message and previous messages.
    """
    return await send_message_to_assistant_with_conversational_chain(
        uuid=chat.uuid, message=chat.message.content, prev_messages=chat.prev_messages
    )


@router.post("/v1/llm/compliance-analysis", tags=[API_TAGS["llm"]])
async def do_compliance_analysis(
    uuid: Annotated[str, Form()], 
    file: Annotated[UploadFile, File()]
):
    """
    Performs a compliance analysis on a file.

        :param str uuid: A unique identifier. Used to identify the directory/vector store to store the uploaded file.
        :param UploadFile file: A file uploaded in the request.
    """
    return await send_file_to_assistant_with_analysis_chain(
        uuid=uuid, filename=file.filename, file=file.file, size= file.size, mime_type=file.content_type
    )
