from fastapi.responses import JSONResponse


def analyze_phrase_compliance_with_scores(input: str):
    """Analyses a sentence or phrase for compliance (with scores) with corresponding sentence or phrase."""
    try:
        # TODO Implement

        return JSONResponse(
            status_code=200,
            content={}
        )

    except Exception as error:
        return JSONResponse(
            status_code=500,
            content={"error": str(error)}
        )