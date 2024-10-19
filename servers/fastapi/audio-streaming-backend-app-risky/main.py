import json
import os
import random
from typing import List

import httpx
import requests
from const import ACCESS_TOKEN_EXPIRE_MINUTES, ALGORITHM, SECRET_KEY
from crud import (  # add_chat,; db_add_friend,; db_get_friend_info,; db_update_user,; get_chat,
    db_get_music_file_uri,
    db_get_musics,
)
from fastapi import FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from fastapi.security import OAuth2PasswordBearer
from models import MusicRequest, TokenRequest
from passlib.context import CryptContext
from pymongo import MongoClient
from utils import get_settings, validate_token

settings = get_settings()
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")
app = FastAPI(redirect_slashes=False)

env = os.getenv("ENVIRONMENT", "dev")
if env == "dev":
    client = MongoClient(directConnection=True, host=settings.MONGO_DB_HOST, port=27017)
else:
    client = MongoClient(
        host=settings.MONGO_DB_HOST,
        port=settings.MONGO_DB_PORT,
        username=settings.MONGO_DB_USERNAME,
        password=settings.MONGO_DB_PASSWORD,
    )

db = client.test_database
music_collection = db.music

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

AUDIO_STORAGE_URL = settings.AUDIO_STORAGE_URL


@app.get("/audio-streaming/play_music/{music_title}/")
async def play_music(music_title: str):
    if random.random() < 0.9:
        # POC -> Only 5xx error occur
        # 90% 확률로 에러를 발생시킨다.
        raise HTTPException(status_code=503, detail="This is a deliberate 500 error. (Risky Audio streaming service)")
    else:
        music_file_uri = db_get_music_file_uri(music_collection, music_title)
        print(music_file_uri)
        response = requests.get(AUDIO_STORAGE_URL + f"{music_file_uri}/")

        if response.status_code != 200:
            raise HTTPException(status_code=response.status_code, detail="Failed to fetch audio from storage")

        def iter():
            for chunk in response.iter_content(chunk_size=8192):
                if chunk:
                    yield chunk

        headers = {"Content-Type": response.headers.get("Content-Type", "audio/mp3"), "Content-Length": response.headers.get("Content-Length", ""), "Accept-Ranges": "bytes"}

        return StreamingResponse(iter(), headers=headers, media_type="audio/mp3")


@app.get("/audio-streaming/load_test/")
async def load_test():
    if random.random() < 0.3:
        raise HTTPException(status_code=503, detail="Hello! This is Risky Version. (Error Occur)")
    else:
        return {"Hello! This is Risky Version. (200 status)"}


@app.post("/audio-streaming/get_musics/")
def get_musics(request: TokenRequest):
    username = validate_token(settings.VALIDATE_TOKEN_URL, request.access_token)

    if username:
        all_music = db_get_musics(music_collection)
        return all_music
    else:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid Access Token.")
