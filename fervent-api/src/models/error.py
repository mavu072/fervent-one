from pydantic import BaseModel


class Error(BaseModel):
    """Generic error class."""
    message: str
    """Error message."""