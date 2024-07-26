import os
from datetime import datetime, timedelta, timezone
from typing import Union

from const import ALGORITHM, SECRET_KEY
from jose import jwt
from settings import DevSettings, ProdSettings


def get_settings():
    env = os.getenv('ENVIRONMENT', 'dev')
    if env == 'prod':
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