def db_get_musics(music_collection):
    music_cursor = music_collection.find({})
    music_list = [
        {
            "title": doc["title"],
            "artist": doc["artist"],
            "lyrics": doc["lyrics"],
            "like": doc["like"],
            "img_uri": doc["imgUri"],
            "isDownloaded": doc["isDownloaded"],
        }
        for doc in music_cursor
    ]

    return music_list


def db_get_music_file_uri(music_collection, music_title):
    music_cursor = music_collection.find({"title": music_title})
    music_file_uri = music_cursor[0]["audioUri"]

    return music_file_uri


def db_get_musics_by_query(music_collection, query):
    # query가 비어있는 경우 모든 음악을 반환
    if not query:
        return db_get_musics(music_collection)

    # title 또는 artist에 query를 포함하는 음악을 찾기 위한 조건 설정
    filter_condition = {
        "$or": [
            {"title": {"$regex": query, "$options": "i"}},  # 대소문자 구분 없이 검색
            {"artist": {"$regex": query, "$options": "i"}},
        ]
    }

    music_cursor = music_collection.find(filter_condition)
    music_list = [
        {
            "title": doc["title"],
            "artist": doc["artist"],
            "lyrics": doc["lyrics"],
            "like": doc["like"],
            "img_uri": doc["imgUri"],
            "isDownloaded": doc["isDownloaded"],
        }
        for doc in music_cursor
    ]

    return music_list
