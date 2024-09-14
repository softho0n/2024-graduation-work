def db_get_musics(music_collection):
    music_cursor = music_collection.find({})
    music_list = [
        {
            "title": doc["title"],
            "artist": doc["artist"],
            "lyrics": doc["lyrics"],
            "like": doc["like"],
            "isDownloaded": doc["isDownloaded"],
        }
        for doc in music_cursor
    ]

    return music_list


def db_get_music_file_uri(music_collection, music_title):
    music_cursor = music_collection.find({"title":music_title})
    music_file_uri = music_cursor[0]["audioUri"]
    
    return music_file_uri