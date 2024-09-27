from pydantic import BaseModel
from typing import List

class UploadImageDTO(BaseModel):
    text: str
    images: List[str]
