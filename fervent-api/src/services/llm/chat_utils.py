from src.models.chat import Message


def list_to_pairs(msg_list: list[Message]) -> list[tuple[str, str]]:
    """Converts a message list into a list of question-answer pairs and return as a list of tuples."""

    pairs = []

    for i in range(0, len(msg_list) -1, 2):
        human_msg = msg_list[i].content
        system_msg = msg_list[i + 1].content if i + 1 < len(msg_list) else None

        pairs.append((human_msg, system_msg))

    return pairs


def format_chat_history(msg_list: list[Message]) -> list[tuple[str, str]]:
    """Formats a message list and return as a list of tuples."""

    chat_history = []

    for msg in msg_list:
        chat_history.append((msg.role, msg.content))

    return chat_history
