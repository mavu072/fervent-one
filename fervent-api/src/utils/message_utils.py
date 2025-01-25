from typing import List

from src.models.chat_message import ChatMessage
from src.utils.ner_validator_utils import censor_named_entities


def convert_message_list_to_pairs(msg_list: List[ChatMessage]):
    """Converts a message list into a list of question-answer pairs and return as a list of tuples."""

    pairs = []

    for i in range(0, len(msg_list) -1, 2):
        human_msg = msg_list[i].content
        system_msg = msg_list[i + 1].content if i + 1 < len(msg_list) else None

        pairs.append((human_msg, system_msg))

    return pairs


def format_chat_history(msg_list: List[ChatMessage]):
    """Formats a message list and return as a list of tuples."""

    chat_history = []

    for msg in msg_list:
        chat_history.append((msg.role, msg.content))

    return chat_history


def censor_name_entities_in_message_list(entities: tuple[str, str], message_list: list[tuple[str, str]]):
    """Censors named entities within a list of messages."""

    censored_list = []

    for (msg_role, msg_content) in message_list:
        censored_msg_content = censor_named_entities(entities=entities, text=msg_content)
        censored_list.append((msg_role, censored_msg_content))

    return censored_list