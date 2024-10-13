import os
import sys

import streamlit as st
from dotenv import load_dotenv
from google.cloud import storage
from PIL import Image
from pymongo import MongoClient


def upload_file(bucket, file, file_name):
    file.seek(0)
    blob = bucket.blob(file_name)
    blob.upload_from_file(file)
    print(blob.public_url)
    return blob.public_url


if __name__ == "__main__":
    if "dev" in sys.argv:
        load_dotenv("./config/.env.dev")
        client = MongoClient(directConnection=True, host=os.getenv("MONGO_DB_HOST"), port=27017)
    elif "prod" in sys.argv:
        load_dotenv("./config/.env.prod")
        print("This is prod")
        client = MongoClient(host=os.getenv("MONGO_DB_HOST"), port=int(os.getenv("MONGO_DB_PORT")), username=os.getenv("MONGO_DB_USERNAME"), password=os.getenv("MONGO_DB_PASSWORD"))
    else:
        raise ValueError("Please specify the environment as 'dev' or 'prod'.")

    bucket_name = os.getenv("BUCKET_NAME")

    storage_client = storage.Client()
    bucket = storage_client.bucket(bucket_name)

    # MongoDB Client 127.0.0.1 (LocalHost : 27071) 연결
    # 이 과정에서는 DB가 생성되지는 않고 객체만 반환
    # client = MongoClient(directConnection=True, host=db_host, port=db_port, )
    # DB 중 test_database 사용
    db = client.test_database
    # music collection 사용
    music_collection = db.music

    ## UI
    st.title("SKKU music backoffice")
    st.subheader("음원 등록하기")

    music_title = st.text_input("music title")
    artist = st.text_input("artist")
    lyrics = st.text_area("Lyrics")

    thumbnail_img = st.file_uploader("Upload Album Cover", accept_multiple_files=False)

    if thumbnail_img is not None:
        image = Image.open(thumbnail_img)
        st.image(image, caption="Uploaded Image.", width=200)

    audio = st.file_uploader("Upload Audio", accept_multiple_files=False)

    # BackOffice -> GCP Bucket -> Uri -> MongoDB
    # audioUrl: 'https://storage.googleapis.com/<bucket_name>/<file_name>'
    if st.button("Save to Server"):
        img_uri = ""
        audio_uri = ""
        if thumbnail_img is not None:
            img_uri = upload_file(bucket, thumbnail_img, f"thumbnail/{thumbnail_img.name}")
        if audio is not None:
            audio_uri = upload_file(bucket, audio, f"music/{audio.name}")

        new_song = {"title": music_title, "artist": artist, "lyrics": lyrics, "like": False, "isDownloaded": False, "imgUri": img_uri, "audioUri": audio_uri}
        iid = music_collection.insert_one(new_song).inserted_id
        print(new_song)
        print(iid)

        st.success("Success to save new song.")
