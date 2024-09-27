from beanie import Document, init_beanie
from datetime import datetime
from motor.motor_asyncio import AsyncIOMotorClient
import uuid

MONGODB_URL = "mongodb://localhost:27017"
DB_NAME = "my_database"

class MetaData(Document):
    id: uuid.UUID = uuid.uuid4()
    volunteer_email: str
    text: str
    path: str
    inserted_time: datetime = datetime.now()
    class Settings:
        collection = "MetaData"

async def init():
    # Create a Motor client
    client = AsyncIOMotorClient(MONGODB_URL)
    await init_beanie(database=client[DB_NAME], document_models=[MetaData])