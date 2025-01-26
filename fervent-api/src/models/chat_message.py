from pydantic import BaseModel
from typing import List
from enum import Enum


class Role(str, Enum):
    human = "human"
    ai = "ai"


class ChatMessage(BaseModel):
    role: Role
    content: str


class Chat(BaseModel):
    new_message: str
    prev_messages: List[ChatMessage]