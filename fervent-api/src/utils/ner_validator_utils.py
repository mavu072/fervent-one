from src.utils.ner_entity_category_utils import entity_categories


def censor_named_entities(entities: tuple[str, str], text: str):
    """Censors named entities within a string."""

    if len(entities) == 0 or len(text) == 0:
        return text

    censored = text

    for entity, category in entities:
        if category in entity_categories:
            censored = censored.replace(entity, f"[{category}]")

    return censored
