def db_get_user_by_username(user_collection, name):
    return user_collection.find_one({"username": name})


def db_get_user_by_nickname(user_collection, nickname):
    return user_collection.find_one({"nickname": nickname})


def db_update_user(user_collection, src_document, update_command):
    user_collection.update_one(src_document, update_command)


def db_charge_money(user_collection, src_document, update_query):
    user_collection.update_many(src_document, update_query)


def db_create_new_user(user_collection, username, initial_money):
    return user_collection.insert_one({"username": username, "money": initial_money}).inserted_id


def db_get_user(user_collection, username):
    return user_collection.find_one({"username": username})


def db_payroll_user(user_collection, username):
    user = user_collection.find_one({"username": username})

    if user is None:
        raise ValueError("유저를 찾을 수 없습니다.")

    current_money = user.get("money", 0)
    if current_money < 1000:
        raise ValueError("잔고가 부족합니다. 최소 1000원이 필요합니다.")

    update_command = {"$set": {"money": current_money - 1000}}
    user_collection.update_one({"username": username}, update_command)
