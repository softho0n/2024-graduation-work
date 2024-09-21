import os

from const import ACCESS_TOKEN_EXPIRE_MINUTES, ALGORITHM, SECRET_KEY
from crud import (  # add_chat,; db_add_friend,; db_get_friend_info,; db_update_user,; get_chat,
    db_charge_money,
    db_create_new_user,
    db_get_user,
    db_payroll_user,
)
from fastapi import Depends, FastAPI, HTTPException, Response, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordBearer
from models import ChargeRequest, TokenRequest
from passlib.context import CryptContext
from pymongo import MongoClient
from typing_extensions import Annotated
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
user_collection = db.charge

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/payments/charge")
def charge_money(request: ChargeRequest):
    username = validate_token(settings.VALIDATE_TOKEN_URL, request.access_token)

    if username:
        if db_get_user(user_collection, username) is None:
            db_create_new_user(user_collection, username, int(request.money_amount))
        else:
            src_document = {"username": username}
            update_query = {"$inc": {"money": int(request.money_amount)}}
            db_charge_money(user_collection, src_document, update_query)
    else:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid Access Token.")


@app.post("/payments/get_money")
def get_money(request: TokenRequest):
    username = validate_token(settings.VALIDATE_TOKEN_URL, request.access_token)

    if username:
        current_user = db_get_user(user_collection, username)
        # print(current_user)
        if current_user is None:
            return {"username": username, "money": 0}
        else:
            return {"username": username, "money": current_user["money"]}
    else:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid Access Token.")


@app.post("/payments/payroll")
def payroll(request: TokenRequest):
    username = validate_token(settings.VALIDATE_TOKEN_URL, request.access_token)

    if username:
        current_user = db_get_user(user_collection, username)
        if current_user is None:
            raise HTTPException(status_code=status.HTTP_501_NOT_IMPLEMENTED, detail="No Money")
        else:
            try:
                db_payroll_user(user_collection, username)
            except:
                raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="잔고가 부족합니다.")
    else:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid Access Token")
