from  src.utils.ner_entity_category_utils import ner_entity_categories

import spacy

nlp = spacy.load("en_core_web_sm")
ner_categories = ner_entity_categories

def find_named_entities(text: str):
    entity_list = []
    doc = nlp(text)

    for entity in doc.ents:
        if entity.label_ in ner_categories:
            entity_list.append((entity.text, entity.label_))

    return entity_list
