from pydantic import BaseModel


class TokenRequest(BaseModel):
    access_token: str


class SearchRequest(BaseModel):
    access_token: str
    query: str
