import json
import os
from datetime import datetime, timedelta, timezone
from typing import List, Union

import requests
from const import ACCESS_TOKEN_EXPIRE_MINUTES, ALGORITHM, SECRET_KEY
from crud import (  # add_chat,; db_add_friend,; db_get_friend_info,; db_update_user,; get_chat,
    db_add_like_music,
    db_delete_like_music,
    db_get_all_like_musics,
)
from fastapi import Depends, FastAPI, HTTPException, Response, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from jose import JWTError, jwt
from models import ChargeRequest, LoginRequest, SignUpRequest, SubscriptionRequest, Token, TokenRequest
from passlib.context import CryptContext
from pymongo import MongoClient
from typing_extensions import Annotated
from utils import create_access_token, get_password_hash, get_settings, validate_token, verify_password

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
user_collection = db.users
music_collection = db.music
subscription_collection = db.subscription

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/subscription/get_like_musics/")
def get_like_musics(request: TokenRequest):
    username = validate_token(settings.VALIDATE_TOKEN_URL, request.access_token)

    if username:
        return db_get_all_like_musics(subscription_collection, username)
    else:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid Access Token.")


@app.post("/subscription/like/")
def like_music(request: SubscriptionRequest):
    username = validate_token(settings.VALIDATE_TOKEN_URL, request.access_token)

    if username:
        db_add_like_music(subscription_collection, username, request.music_title)
    else:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid Access Token.")


@app.post("/subscription/unlike/")
def unlike_music(request: SubscriptionRequest):
    username = validate_token(settings.VALIDATE_TOKEN_URL, request.access_token)
    if username:
        db_delete_like_music(subscription_collection, username, request.music_title)
    else:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid Access Token.")
