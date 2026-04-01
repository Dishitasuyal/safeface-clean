from pymongo import MongoClient
import os

MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017")

client = MongoClient(MONGO_URI)

db = client["safefaceDB"]

# collections
users_col = db["users"]
logins_col = db["logins"]
community_col = db["community_posts"]

