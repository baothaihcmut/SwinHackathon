from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .users.controller import user_router
from .users.sockets import sio_app
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(user_router, prefix= '/users')
app.mount('/',app=sio_app)

@app.get('/')
async def home():
    return {'msg': 'home'}