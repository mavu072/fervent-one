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
    message: Message
    """New message."""
    prev_messages: list[Message]
    """Previous messages."""