from fastapi import FastAPI
from .volunteer.volunteer import volunteer

app = FastAPI()
app.include_router(volunteer)

@app.get('/')
async def home():
    return {'msg': 'home'}