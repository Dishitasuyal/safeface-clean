from pymongo import MongoClient
import os

MONGO_URI = os.getenv("MONGO_URI")

client = MongoClient(MONGO_URI)

db = client.get_database()   # VERY IMPORTANT

users_col = db["users"]
logins_col = db["logins"]
community_col = db["community_posts"]
media_col = db["Media"]