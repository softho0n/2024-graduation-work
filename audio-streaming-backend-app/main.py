import json
import os
from typing import List

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
app = FastAPI()

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


@app.post("/audio-streaming/get_musics")
def get_musics(request: TokenRequest):
    username = validate_token(settings.VALIDATE_TOKEN_URL, request.access_token)

    if username:
        all_music = db_get_musics(music_collection)
        return all_music
    else:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid Access Token.")


@app.get("/audio-streaming/play_music")
def play_music(request: MusicRequest):
    username = validate_token(settings.VALIDATE_TOKEN_URL, request.access_token)

    # if username:
    #     # TODO : db_get_music_file_uri를 통해 DB에 저장되어있는 음원 파일의 uri를 얻어온다.
    #     music_file_uri = db_get_music_file_uri(music_collection, request.music_title)
    #     music_byte_stream = requests.post(url, data=json.dumps({"access_token": token, "music_file_uri": music_file_uri}))
    #     return StreamingResponse(iter([music_byte_stream]), media_type="audio/mpeg")
    # else:
    #     raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid Access Token.")
