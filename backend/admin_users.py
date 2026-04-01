from db import users_col
from flask import jsonify, request

# get all users
def get_users():

    users = list(users_col.find({}, {"password": 0}))

    for user in users:
        user["_id"] = str(user["_id"])

    return jsonify(users)


# suspend user
def suspend_user(user_id):

    users_col.update_one(
        {"userId": user_id},
        {"$set": {"status": "suspended"}}
    )

    return jsonify({"message": "User suspended"})


# unsuspend user
def unsuspend_user(user_id):

    users_col.update_one(
        {"userId": user_id},
        {"$set": {"status": "active"}}
    )

    return jsonify({"message": "User unsuspended"})