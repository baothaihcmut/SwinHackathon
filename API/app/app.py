from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .users.controller import user_router
from .users.sockets import sio_app
from contextlib import asynccontextmanager
from typing import AsyncGenerator
from .volunteer.model import MetaData
from motor.motor_asyncio import AsyncIOMotorClient
from beanie import  init_beanie
from .volunteer.volunteer import volunteer
MONGODB_URL = "mongodb+srv://baothai:22042004bao@mycluster.zt1ifni.mongodb.net/?retryWrites=true&w=majority&appName=mycluster"
DB_NAME = "my_database"

async def init():
    # Create a Motor client
    client = AsyncIOMotorClient(MONGODB_URL)
    await init_beanie(database=client[DB_NAME], document_models=[MetaData])

@asynccontextmanager
async def lifespan(app: FastAPI) -> AsyncGenerator:
    # Initialize database on startup
    await init()
    yield

app = FastAPI(lifespan= lifespan)
app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(user_router, prefix= '/users')
app.include_router(volunteer, prefix='/volunteer')
app.mount('/sockets',app=sio_app)

@app.get('/')
async def home():
    return {'msg': 'home'}

