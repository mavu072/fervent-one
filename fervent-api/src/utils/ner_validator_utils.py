from  src.utils.ner_entity_category_utils import ner_entity_categories

censored_categories = ner_entity_categories

def censor_named_entities(entities: (str, str), text: str):
    """Censors named entities within a string."""

    censored = text

    for entity, category in entities:
        if category in censored_categories:
            censored = censored.replace(entity, f"[{category}]")

    return censored
