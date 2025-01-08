from pydantic import BaseModel
from typing import List

class Message(BaseModel):
    role: str
    content: str

class UserMessage(BaseModel):
    message: str
    prev_messages: List[Message]