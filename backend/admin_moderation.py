from flask import Blueprint, jsonify
from bson import ObjectId
from db import community_col

router = Blueprint("moderation", __name__)


# get pending posts
@router.route("/admin/posts/pending", methods=["GET"])
def get_pending_posts():

    posts = list(community_col.find({"status": "pending"}))

    for post in posts:
        post["_id"] = str(post["_id"])

    return jsonify(posts)


# approve post
@router.route("/admin/posts/approve/<post_id>", methods=["PUT"])
def approve_post(post_id):

    community_col.update_one(
        {"_id": ObjectId(post_id)},
        {"$set": {"status": "approved"}}
    )

    return jsonify({"message": "Post approved"})


# reject post
@router.route("/admin/posts/reject/<post_id>", methods=["PUT"])
def reject_post(post_id):

    community_col.update_one(
        {"_id": ObjectId(post_id)},
        {"$set": {"status": "rejected"}}
    )

    return jsonify({"message": "Post rejected"})