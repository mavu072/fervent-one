import spacy

# Load spacy English model.
nlp = spacy.load("en_core_web_sm")


def find_named_entities(text: str, ner_categories: list[str]):
    entity_list = []
    doc = nlp(text)

    for entity in doc.ents:
        if entity.label_ in ner_categories:
            entity_list.append((entity.text, entity.label_))

    return entity_list
