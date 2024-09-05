# audio_storage_backend.py
import os

from fastapi import FastAPI, HTTPException
from fastapi.responses import StreamingResponse

app = FastAPI()


# @app.get("/audio-storage/get_music_bytes/{music_title}")
# async def get_music_bytes(music_title: str):
#     pass
#     # Todo
