def db_create_new_user(user_collection, user_dict):
    return user_collection.insert_one(user_dict).inserted_id

def db_get_user_by_username(user_collection, name):
    return user_collection.find_one({"username": name})

def db_get_user_by_nickname(user_collection, nickname):
    return user_collection.find_one({"nickname": nickname})

def db_get_user(user_collection, name, password):
    return  user_collection.find_one({"usename": name, "password": password})