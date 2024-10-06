import os
from datetime import datetime, timedelta, timezone
from typing import List, Union

from const import ACCESS_TOKEN_EXPIRE_MINUTES, ALGORITHM, SECRET_KEY
from crud import (  # add_chat,; db_add_friend,; db_get_friend_info,; db_update_user,; get_chat,
    db_create_new_user,
    db_get_user_by_nickname,
    db_get_user_by_username,
    db_update_user,
)
from fastapi import Depends, FastAPI, HTTPException, Response, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from jose import JWTError, jwt
from models import LoginRequest, SignUpRequest, Token, TokenRequest
from passlib.context import CryptContext
from pymongo import MongoClient
from settings import DevSettings, ProdSettings
from typing_extensions import Annotated
from utils import create_access_token, get_password_hash, get_settings, verify_password

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
user_collection = db.users

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/user/signup")
def register_user(request: SignUpRequest):
    username = request.username
    password = get_password_hash(pwd_context, request.password)
    nickname = request.nickname

    already_exists_user = db_get_user_by_username(user_collection, username)

    if not already_exists_user is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="There is already same name user.",
            headers={"WWW-Authenticate": "Bearer"},
        )

    already_exists_user = db_get_user_by_nickname(user_collection, nickname)
    if not already_exists_user is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="There is already same name user.",
            headers={"WWW-Authenticate": "Bearer"},
        )

    new_user = {
        "username": username,
        "password": password,
        "nickname": nickname,
    }
    user_id = db_create_new_user(user_collection, new_user)
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(data={"sub": new_user["username"]}, expires_delta=access_token_expires)
    return Token(access_token=access_token, token_type="bearer")


@app.post("/user/login")
async def login_for_access_token(
    response: Response,
    form_data: LoginRequest,
) -> Token:
    hashed_password = get_password_hash(pwd_context, form_data.password)
    user = db_get_user_by_username(user_collection, form_data.username)

    if user is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="There is no user.",
            headers={"WWW-Authenticate": "Bearer"},
        )

    if not verify_password(pwd_context, form_data.password, user["password"]):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )

    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(data={"sub": user["username"]}, expires_delta=access_token_expires)
    return Token(access_token=access_token, token_type="bearer")


@app.post("/user/validate_token")
async def validate_token(request: TokenRequest):
    try:
        payload = jwt.decode(request.access_token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            return {"valid": False, "username": ""}
        user = db_get_user_by_username(user_collection, username)
        if user is None:
            return {"valid": False, "username": ""}
        return {"valid": True, "username": username}
    except JWTError:
        return {"valid": False, "username": ""}


@app.post("/user/profile")
async def get_user_profile(request: TokenRequest):
    try:
        payload = jwt.decode(request.access_token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        user = db_get_user_by_username(user_collection, username)
        if user is None:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid Token",
                headers={"WWW-Authenticate": "Bearer"},
            )
        return {"username": user["username"], "password": user["password"], "nickname": user["nickname"]}
    except JWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid Token",
            headers={"WWW-Authenticate": "Bearer"},
        )


@app.post("/user/update_profile")
async def update_profile(request: SignUpRequest):
    username = request.username
    password = get_password_hash(pwd_context, request.password)
    nickname = request.nickname

    current_user = db_get_user_by_username(user_collection, username)
    update_cmd = {"$set": {"username": username, "password": password, "nickname": nickname}}

    try:
        db_update_user(user_collection, current_user, update_cmd)
        return {"status": 202, "msg": "txn was executed well."}
    except:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Something Wrong.",
            headers={"WWW-Authenticate": "Bearer"},
        )
