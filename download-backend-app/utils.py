import json
import os
from datetime import datetime, timedelta, timezone
from typing import Union

import requests
from const import ALGORITHM, SECRET_KEY
from fastapi import HTTPException, status
from jose import jwt
from settings import DevSettings, ProdSettings


def get_settings():
    env = os.getenv("ENVIRONMENT", "dev")
    if env == "prod":
        return ProdSettings()
    else:
        return DevSettings()


def verify_password(pwd_context, plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)


def get_password_hash(pwd_context, password):
    return pwd_context.hash(password)


def create_access_token(data: dict, expires_delta: Union[timedelta, None] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


def validate_token(url, token: str):
    response = requests.post(url, data=json.dumps({"access_token": token}))
    user_validation_response = json.loads(response.text)

    if user_validation_response["valid"]:
        return user_validation_response["username"]
    return None


def payroll_music(url, token):
    try:
        response = requests.post(url, data=json.dumps({"access_token": token}))
    except:
        raise HTTPException(status_code=status.HTTP_502_BAD_GATEWAY, detail="payroll 서비스에서 에러가 발생했습니다.")
