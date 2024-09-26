from fastapi import FastAPI,HTTPException,APIRouter
from pydantic import BaseModel

volunteer = APIRouter()

class img(BaseModel):
    number:list[float]

@volunteer.get('/')
async def home():
    return {"msg":"sucess"}

@volunteer.post("/process-array/")
async def process_array(array_Input:img):
    number=array_Input.number
    def result():
         if not number:
            raise HTTPException(status_code=400, detail="Array cannot be empty.")
    result = {
        "length": len(number),
    }
    print(result)
    return {"msg":"Sucess"}
