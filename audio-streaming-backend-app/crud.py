def db_get_musics(music_collection):
    music_cursor = music_collection.find({})
    music_list = [
        {
            "title": doc["title"],
            "artist": doc["artist"],
            "lyrics": doc["lyrics"],
        }
        for doc in music_cursor
    ]

    return music_list
