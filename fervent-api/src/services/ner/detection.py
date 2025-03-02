import spacy

# Load spacy English model.
nlp = spacy.load("en_core_web_sm")


def detect_entities(text: str, ner_categories: list[str]):
    """Detects named entities in text."""

    entity_list = []
    doc = nlp(text)

    for entity in doc.ents:
        if entity.label_ in ner_categories:
            entity_list.append((entity.text, entity.label_))

    return entity_list


def detect_entities_in_messages(messages: list[tuple[str, str]], ner_categories: list[str]):
    """Detects named entities within a list of messages."""

    entity_list = []

    for (msg_role, msg_content) in messages:
        if msg_role == "human":
            found_entity_list = detect_entities(text=msg_content, ner_categories=ner_categories)
            entity_list = entity_list + found_entity_list

    return entity_list
