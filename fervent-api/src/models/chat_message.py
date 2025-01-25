from pydantic import BaseModel
from typing import List

class ChatMessage(BaseModel):
    role: str
    content: str

class Chat(BaseModel):
    new_message: str
    prev_messages: List[ChatMessage]