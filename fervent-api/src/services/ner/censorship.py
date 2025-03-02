from src.services.ner.categories import entity_categories


def censor_entities(entities: tuple[str, str], text: str):
    """Censors named entities within a string."""

    if len(entities) == 0 or len(text) == 0:
        return text

    censored = text

    for entity, category in entities:
        if category in entity_categories:
            censored = censored.replace(entity, f"[{category}]")

    return censored


def censor_entities_in_messages(entities: tuple[str, str], message_list: list[tuple[str, str]]):
    """Censors named entities within a list of messages."""

    if len(entities) == 0 or len(message_list) == 0:
        return message_list
    
    censored_list = []

    for (msg_role, msg_content) in message_list:
        if msg_role == "human":
            censored_msg_content = censor_entities(entities=entities, text=msg_content)
            censored_list.append((msg_role, censored_msg_content))

    return censored_list
