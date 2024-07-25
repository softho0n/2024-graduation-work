from pydantic import BaseModel


class ChargeRequest(BaseModel):
    access_token: str
    money_amount: str
    
class Token(BaseModel):
    access_token: str
    token_type: str

class TokenRequest(BaseModel):
    access_token: str

class LoginRequest(BaseModel):
    username: str
    password: str
    
class SignUpRequest(BaseModel):
    username: str
    password: str
    nickname: str
    