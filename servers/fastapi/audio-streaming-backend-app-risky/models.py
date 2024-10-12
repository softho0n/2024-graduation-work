from pydantic import BaseModel


class TokenRequest(BaseModel):
    access_token: str


class MusicRequest(BaseModel):
    access_token: str
    music_title: str
