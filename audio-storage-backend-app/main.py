# audio_storage_backend.py
import os
import base64
from google.cloud import storage
from fastapi import FastAPI, HTTPException
from fastapi.responses import Response
from utils import get_settings
from urllib.parse import unquote

app = FastAPI()

settings = get_settings()
env = os.getenv("ENVIRONMENT", "dev")

bucket_name = settings.BUCKET_NAME

os.environ["GOOGLE_APPLICATION_CREDENTIALS"]="./graduation-work-434713-2fc06a1d16e0.json"
storage_client = storage.Client()
bucket = storage_client.bucket(bucket_name)

@app.get("/audio-storage/get_music/{music_url}")
async def get_music(music_url: str):
    try:
        blob = bucket.blob(f"music/{music_url}")

        if not blob.exists():
            raise HTTPException(status_code=404, detail="File not found")

        # 파일 내용을 바이트로 다운로드
        content = blob.download_as_bytes()
        
        # 파일 MIME 타입 설정 (여기서는 예시로 'audio/mpeg'를 사용)
        media_type = "audio/mpeg"
        
        return Response(
            content=content,
            media_type=media_type,
            headers={"Content-Disposition": f"attachment; filename={music_url}"}
        )
            
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")

"""
@app.get("/audio-storage/get_thumbnail/{thumbnail_url}")
async def get_music(thumbnail_url: str):
    try:
        decoded_image_name = unquote(thumbnail_url)
        print(decoded_image_name)
        blob = bucket.blob(f"thumbnail/{thumbnail_url}")

        if not blob.exists():
            raise HTTPException(status_code=404, detail="File not found")

        # 파일 내용을 바이트로 다운로드
        content = blob.download_as_bytes()
        
        # 파일 MIME 타입 설정 (여기서는 예시로 'audio/mpeg'를 사용)
        media_type = "image/jpg"
        
        return Response(
            content=content,
            media_type=media_type,
            headers={"Content-Disposition": f"attachment; filename={decoded_image_name}"}
        )
            
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")
"""