import os
import sys

import pandas as pd
import streamlit as st
from dotenv import load_dotenv
from pymongo import MongoClient

# MongoDB 연결 설정

if "dev" in sys.argv:
    load_dotenv("./config/.env.dev")
    client = MongoClient(directConnection=True, host=os.getenv("MONGO_DB_HOST"), port=27017)
elif "prod" in sys.argv:
    load_dotenv("./config/.env.prod")
    client = MongoClient(host=os.getenv("MONGO_DB_HOST"), port=int(os.getenv("MONGO_DB_PORT")), username=os.getenv("MONGO_DB_USERNAME"), password=os.getenv("MONGO_DB_PASSWORD"))
else:
    raise ValueError("Please specify the environment as 'dev' or 'prod'.")


db = client.test_database
collection = db.music


def fetch_data():
    """MongoDB에서 데이터 가져오기"""
    data = list(collection.find())
    return pd.DataFrame(data)


def delete_entry(entry_id):
    """MongoDB에서 특정 문서 삭제"""
    collection.delete_one({"_id": entry_id})


# Streamlit 애플리케이션 시작
st.title("All musics")

# 데이터 가져오기 및 테이블 생성
df = fetch_data()

if not df.empty:
    # 삭제 버튼 추가
    for index, row in df.iterrows():
        col1, col2, col3, col4 = st.columns(4)
        with col1:
            st.text(row["_id"])
        with col2:
            st.text(row["title"])  # 첫 번째 열 데이터
        with col3:
            st.text(row["artist"])  # 두 번째 열 데이터
        with col4:
            if st.button(f'Delete {row["_id"]}'):
                delete_entry(row["_id"])
                st.success("삭제 완료!")
                st.rerun()
else:
    st.write("No data found")
