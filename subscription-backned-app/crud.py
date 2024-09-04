def db_add_like_music(subscription_collection, username, music_title):
    subscription_collection.update_one(
        {"username": username},
        {"$addToSet": {"likes": music_title}},
        upsert=True
    )

def db_delete_like_music(subscription_collection, username, music_title):
    subscription_collection.update_one(
        {"username": username},
        {"$pull": {"likes": music_title}}
    )
    
def db_get_all_like_musics(subscription_collection, username):
    query = {"username": username}
    projection = {"_id": 0, "likes": 1}
    document = subscription_collection.find_one(query, projection)
    items = document['likes'] if document else None
    
    return items