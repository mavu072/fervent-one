from fastapi.responses import JSONResponse

from src.services.ner import find_named_entities
from src.utils.ner_validator_utils import censor_named_entities
from src.utils.ner_entity_category_utils import entity_categories


def detect_named_entities(text: str):
    """Detect and return named entities within text."""
    try:
        entity_list = find_named_entities(text, entity_categories)
        total = len(entity_list)

        return JSONResponse(
            status_code=200,
            content={
                "entity_total": total, 
                "entity_list": entity_list
                }
        )
    
    except Exception as error:
        return JSONResponse(
            status_code=500,
            content={"error": str(error)}
        )


def detect_and_censor_named_entities(text: str):
    """Detect and censor named entities within text."""
    try:
        entity_list = find_named_entities(text, entity_categories)
        censored_text = censor_named_entities(entity_list, text)
        total = len(entity_list)

        return JSONResponse(
            status_code=200,
            content={
                "entity_total": total, 
                "entity_list": entity_list, 
                "censored_text": censored_text
                }
        )
    
    except Exception as error:
        return JSONResponse(
            status_code=500,
            content={"error": str(error)}
        )