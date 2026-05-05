
def userEntity(item) -> dict:
    return {
        "name": item["name"],
        "realname": item["realname"],
        "year": item["year"], 
        "house": item["house"],
        "bio": item["bio"],
        "equipment": item["equipment"],
        "images": item["images"]
    }

def usersEntity(entity) -> list:
    [userEntity(item) for item in entity]


