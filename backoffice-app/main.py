import streamlit as st
from PIL import Image
from pymongo import MongoClient
import os
from google.cloud import storage


def upload_file(bucket, file, file_name):
    file.seek(0)
    blob = bucket.blob(file_name)
    blob.upload_from_file(file)
    print(blob.public_url)
    return blob.public_url
    
    

if __name__ == "__main__":
    bucket_name = '2024-graduation-music'
    # Bucket Env, Connect
    os.environ["GOOGLE_APPLICATION_CREDENTIALS"]="./graduation-work-434713-2fc06a1d16e0.json"
    storage_client = storage.Client()
    bucket = storage_client.bucket(bucket_name)

    # MongoDB Client 127.0.0.1 (LocalHost : 27071) 연결
    # 이 과정에서는 DB가 생성되지는 않고 객체만 반환
    client = MongoClient(directConnection=True, host="127.0.0.1", port=27017)
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

    # BackOffice -> GCP Bucket -> Url -> MongoDB
    # audioUrl: 'https://storage.googleapis.com/<bucket_name>/<file_name>'
    if st.button("Save to Server"):
        thumbnail_img_url = ""
        audio_url = ""
        if thumbnail_img is not None:
            thumbnail_img_url = upload_file(bucket, thumbnail_img, f"thumbnail/{thumbnail_img.name}")
        if audio is not None:
            audio_url = upload_file(bucket, audio, f"music/{audio.name}")

        new_song = {"title": music_title, "artist": artist, "lyrics": lyrics, "like": False, "isDownloaded": False, "imgUrl" : thumbnail_img_url, "audioUrl" : audio_url}
        iid = music_collection.insert_one(new_song).inserted_id
        print(iid)

        st.success("Success to save new song.")
