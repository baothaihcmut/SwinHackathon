from fastapi import FastAPI,HTTPException,APIRouter
from pydantic import BaseModel
from .model import MetaData
volunteer = APIRouter()


@volunteer.get('/')
async def home():
    return {"msg":"sucess"}

@volunteer.post("/process-array/")
async def process_array():
    # number=array_Input.number
    # def result():
    #      if not number:
    #         raise HTTPException(status_code=400, detail="Array cannot be empty.")
    # result = {
    #     "length": len(number),
    # }
    # print(result)
    await MetaData.insert(MetaData(volunteer_email='hello',text='hello',path='hello'))
    return {"msg":"Sucess"}
