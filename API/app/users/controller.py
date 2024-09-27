from fastapi import APIRouter
from .sockets import sio_app
user_router = APIRouter()

user_router.mount('/', app=sio_app)

@user_router.get('/')
async def user_home():
    return {'msg': 'user home'}