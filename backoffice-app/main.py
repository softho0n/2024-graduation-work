import streamlit as st
from PIL import Image
from pymongo import MongoClient

if __name__ == "__main__":
    client = MongoClient(directConnection=True, host="127.0.0.1", port=27017)
    db = client.test_database
    music_collection = db.music

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

    if st.button("Save to Server"):
        new_song = {"title": music_title, "artist": artist, "lyrics": lyrics, "like": False, "isDownloaded": False}

        iid = music_collection.insert_one(new_song).inserted_id
        print(iid)

        st.success("Success to save new song.")
