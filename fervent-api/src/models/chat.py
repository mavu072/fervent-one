from pydantic import BaseModel
from enum import Enum


class Role(str, Enum):
    human = "human"
    ai = "ai"


class Message(BaseModel):
    """Message class."""
    role: Role
    """Message sender role."""
    content: str
    """Message string."""


class Chat(BaseModel):
    """Chat class."""
    uuid: str | None
    """(Optional) A unique identifier used to identify the directory/vector store storing this conversation's files."""
    message: Message
    """New message."""
    prev_messages: list[Message]
    """Previous messages."""