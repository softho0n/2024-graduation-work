# audio_storage_backend.py
import base64
import os
from urllib.parse import unquote

from fastapi import FastAPI, HTTPException
from fastapi.responses import Response, StreamingResponse
from google.cloud import storage
from utils import get_settings

app = FastAPI(redirect_slashes=False)

settings = get_settings()
env = os.getenv("ENVIRONMENT", "dev")

storage_client = storage.Client()


def parse_image(img_uri: str):
    content = img_uri.split("googleapis.com/")[-1]
    image_name = content.split("/")[-1]

    return image_name


def parse_bucket(music_uri: str):
    content = music_uri.split("googleapis.com/")[-1]
    bucket_name = content.split("/")[0]

    return bucket_name


def parse_music(music_uri: str):
    content = music_uri.split("googleapis.com/")[-1]
    music_name = content.split("/")[-1]

    return music_name


@app.get("/audio-storage/get_music/{music_uri:path}/")
async def get_music(music_uri: str):
    try:
        print(music_uri)
        bucket_name = parse_bucket(music_uri)
        music_name = parse_music(music_uri)
        bucket = storage_client.bucket(bucket_name)
        blob = bucket.blob(f"music/{music_name}")

        if not blob.exists():
            raise HTTPException(status_code=404, detail="File not found")

        # 파일 내용을 바이트로 다운로드
        content = blob.download_as_bytes()

        # 파일 MIME 타입 설정 (여기서는 예시로 'audio/mpeg'를 사용)
        media_type = "audio/mpeg"

        return Response(content=content, media_type=media_type, headers={"Content-Disposition": f"attachment; filename={music_name}"})

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")


@app.get("/audio-storage/get_thumbnail/{thumbnail_uri:path}/")
async def get_image(thumbnail_uri: str):
    try:
        print(thumbnail_uri)
        bucket_name = parse_bucket(thumbnail_uri)
        image_name = parse_image(thumbnail_uri)
        bucket = storage_client.bucket(bucket_name)
        blob = bucket.blob(f"thumbnail/{image_name}")

        if not blob.exists():
            raise HTTPException(status_code=404, detail="File not found")

        # 파일 내용을 바이트로 다운로드
        content = blob.download_as_bytes()
        # 파일 MIME 타입 설정 (여기서는 예시로 'image/jpg'를 사용)

        media_type = "image/jpeg"

        return StreamingResponse(content=iter([content]), media_type=media_type, headers={"Content-Disposition": f"attachment; filename={image_name}"})

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")
