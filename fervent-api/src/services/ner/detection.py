from src.services.ner.categories import entity_categories

import spacy

# Load spacy English model.
nlp = spacy.load("en_core_web_sm")


def find_named_entities(text: str, ner_categories: list[str]):
    """Detects named entities in text."""

    entity_list = []
    doc = nlp(text)

    for entity in doc.ents:
        if entity.label_ in ner_categories:
            entity_list.append((entity.text, entity.label_))

    return entity_list


def censor_named_entities(entities: tuple[str, str], text: str):
    """Censors named entities within a string."""

    if len(entities) == 0 or len(text) == 0:
        return text

    censored = text

    for entity, category in entities:
        if category in entity_categories:
            censored = censored.replace(entity, f"[{category}]")

    return censored
