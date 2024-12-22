from typing import List

from models.message import Message

def convert_message_list_to_pairs(msg_list: List[Message]):
    pairs = []

    for i in range(0, len(msg_list) -1, 2):
        human_msg = msg_list[i].content
        system_msg = msg_list[i + 1].content if i + 1 < len(msg_list) else None

        pairs.append((human_msg, system_msg))

    return pairs

def format_chat_history(msg_list: List[Message]):
    chat_history = []

    for msg in msg_list:
        chat_history.append((msg.role, msg.content))

    return chat_history