import boto3
from .model import MetaData
from typing import List
import base64
import datetime
from dotenv import load_dotenv
import os
load_dotenv()

session = boto3.Session(
    aws_access_key_id=os.environ['AWS_ACCESS_KEY'],
    aws_secret_access_key=os.environ['AWS_SECRET_KEY'],
    region_name=os.environ['AWS_ZONE']
)
s3_client = session.client('s3')
bucket_name = os.environ['BUCKET_NAME']


class MetaDataService(object):
    async def create(self, user_email, text, path):
        await MetaData.insert(MetaData(volunteer_email=user_email, text = text, path= path))

class UploadImage(object):
    async def upload(self, images: List[str], text:str, user_email):
        folder = f"{text}/{user_email}"
        for image in images:
            image = image.replace('data:image/jpeg;base64,','')
            byte_data = base64.b64decode(image)
            key = str(datetime.time())
            s3_client.put_object(Bucket=bucket_name, Key=f"{folder}/{key}.jpg", Body=byte_data)
        return folder
    
metadataService = MetaDataService()
uploadImageServcie = UploadImage()
