from fastapi import FastAPI,HTTPException,APIRouter, Request
from pydantic import BaseModel
from .model import MetaData
from .dto import UploadImageDTO
import requests
from .service import uploadImageServcie, metadataService


volunteer = APIRouter()



@volunteer.get('/')
async def home():
    return {"msg": "success"}

@volunteer.post("/upload")
async def upload(request: Request, dto: UploadImageDTO):
    gid = request.headers.get('gid')
    headers = {'Authorization': f'Bearer {gid}'}
    user_info = requests.get('https://www.googleapis.com/oauth2/v3/userinfo',headers=headers).json()
    path = uploadImageServcie.upload(dto.images, dto.text, user_info['email'])
    metadataService.create(user_info['email'], dto.text, path)


