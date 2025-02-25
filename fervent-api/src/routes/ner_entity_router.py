from fastapi import APIRouter

from src.config.api_tags import API_TAGS
from src.controllers.ner_entity_controller import detect_named_entities, detect_and_censor_named_entities


router = APIRouter()


@router.post("/v1/ner/entity/detection/", tags=[API_TAGS["ner"]])
def find_named_entities(text: str):
    """Find named entities within text. (People and Organizations)"""
    return detect_named_entities(text=text)


@router.post("/v1/ner/entity/censorship/", tags=[API_TAGS["ner"]])
def find_and_censor_named_entities(text: str):
    """Find and censor named entities within text. (People and Organizations)"""
    return detect_and_censor_named_entities(text=text)