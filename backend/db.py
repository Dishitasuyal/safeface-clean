import os
from pymongo import MongoClient

MONGO_URI = os.getenv("MONGO_URI")

client = MongoClient(MONGO_URI)

db = client.get_database()   # auto picks DB from URI

users_col = db["users"]
logins_col = db["logins"]
community_col = db["community_posts"]
media_col = db["Media"]                 
