from flask import Flask, request, jsonify
from flask_cors import CORS
from werkzeug.security import check_password_hash
from db import users_col, logins_col
from werkzeug.security import generate_password_hash, check_password_hash
import secrets
from datetime import datetime, timedelta
import smtplib
import uuid
from gmail_service import send_reset_email
from db import community_col
from werkzeug.utils import secure_filename
import os
from bson import ObjectId
from flask import send_from_directory
from admin import get_dashboard_stats
from admin_users import get_users, suspend_user, unsuspend_user
from admin_moderation import router as moderation_router
from db import db
from model_loader import get_model
from utils.predict_image import predict_image as run_image_prediction 
from utils.predict_video import predict_video_mtcnn
from utils.explain_image import generate_explanation
from utils.video_results import get_video_result
from datetime import datetime
# ✅ CORRECT
from utils.predict_image import predict_image
import tensorflow as tf
import numpy as np
import cv2
import sys

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
UPLOAD_FOLDER = os.path.join(BASE_DIR, "uploads")

print("🔥 Flask backend starting...")
app = Flask(__name__)
app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
CORS(app, origins=["https://safeface-clean.vercel.app"])
app.config['CORS_HEADERS'] = 'Content-Type'
app.register_blueprint(moderation_router)
@app.route("/")
def home():
    return "Backend is running"

# model = None

# def get_model():
#     global model
#     if model is None:
#         model_instance = get_model()
#         print("Model loaded successfully")
#     return model




# ---------------- REGISTER ----------------
@app.route("/register", methods=["POST"])
def register():
    data = request.json

    existing_user = users_col.find_one({
        "$or": [
            {"userId": data["userId"]},
            {"email": data["email"]}
        ]
    })

    if existing_user:
        return jsonify({"message": "User already exists"}), 409

    users_col.insert_one({
        "userId": data["userId"],
        "email": data["email"],
       "password": generate_password_hash(data["password"]),
        "userName": data["userName"],
        "contactNumber": data["contactNumber"],
        "status": "active"
        
    })

    return jsonify({"message": "Registration successful"}), 201

# ---------------- LOGIN ----------------
@app.route("/login", methods=["POST"])
def login():
    print("LOGIN API CALLED") 
    
    
    data = request.json

    userId = data.get("userId")
    password = data.get("password")

    # ✅ Step 1: validate input
    if not userId or not password:
        return jsonify({"message": "userId and password required"}), 400

    # ✅ Step 2: find user
    user = users_col.find_one({"userId": userId})

    if not user:
        return jsonify({"message": "User not found"}), 401

    # ✅ Step 3: check password
    if not check_password_hash(user["password"], password):
        return jsonify({"message": "Invalid password"}), 401

    # ✅ Step 4: suspended check
    if user.get("status") == "suspended":
        return jsonify({"error": "Account suspended"}), 403

     # ⭐ ADD HERE
    if userId == "dishita.suyal2004":
        role = "Admin"
    else:
        role = "user"

        logins_col.insert_one({
        "userId": userId,
        "role": role
    })

    return jsonify({
        "message": "login successful",
        "userId": userId,
        "role": role
    }), 200

#---------PASSWORD-----------
@app.route("/forgot-password", methods=["POST"])
def forgot_password():
    data = request.json
    email = data.get("email")   # ✅ DEFINE email

    if not email:
        return jsonify({"error": "Email is required"}), 400

    user = users_col.find_one({"email": email})
    if not user:
        return jsonify({"error": "User not found"}), 404

    token = str(uuid.uuid4())   # ✅ DEFINE token

    # ✅ SAVE TOKEN + EXPIRY
    users_col.update_one(
        {"email": email},
        {
            "$set": {
                "resetToken": token,
                "resetTokenExpiry": datetime.utcnow() + timedelta(minutes=15)
            }
        }
    )

    reset_link = f"http://localhost:5173/reset-password?token={token}"

    send_reset_email(email, reset_link)  # ✅ THIS MUST EXIST

    return jsonify({"message": "Password reset email sent"}), 200


#------------API---------------


@app.route("/reset-password", methods=["POST"])
def reset_password():
    data = request.json
    token = data.get("token")
    new_password = data.get("password")

    if not token or not new_password:
        return jsonify({"error": "Token and password required"}), 400

    user = users_col.find_one({"resetToken": token})

    if not user:
        return jsonify({"error": "Invalid or expired token"}), 400

    # ✅ SAFE check (prevents KeyError)
    expiry = user.get("resetTokenExpiry")
    if not expiry or datetime.utcnow() > expiry:
        return jsonify({"error": "Token expired"}), 400

    # ✅ Update password
    users_col.update_one(
        {"_id": user["_id"]},
        {
            "$set": {
                "password": generate_password_hash(new_password)
            },
            "$unset": {
                "resetToken": "",
                "resetTokenExpiry": ""
            }
        }
    )

    return jsonify({"message": "Password reset successful"}), 200


# UPLOAD_FOLDER = os.path.join(os.getcwd(), "uploads")
# app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER



@app.route("/uploads/<filename>")
def uploaded_file(filename):
    return send_from_directory(app.config["UPLOAD_FOLDER"], filename)
# Allowed file types
ALLOWED_EXTENSIONS = {"png", "jpg", "jpeg"}

def allowed_file(filename):
    return "." in filename and filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS


@app.route("/community/create", methods=["POST"])
def create_post():
    userId = request.form.get("userId")
    content = request.form.get("content") or "No description"
    file = request.files.get("file")

    if not file or file.filename == "":
        return jsonify({"error": "No file uploaded"}), 400

    if not allowed_file(file.filename):
        return jsonify({"error": "Only PNG and JPG images are allowed"}), 400

    filename = secure_filename(file.filename)
    file.save(os.path.join(app.config["UPLOAD_FOLDER"], filename))

    post = {
        "userId": userId,
        "content": content,
        "filePath": f"uploads/{filename}",
        "fileType": "Image",  # ✅ FIXED
        "status": "pending",
        "createdAt": datetime.utcnow()
    }

    db.community_posts.insert_one(post)

    return jsonify({"message": "Post created"}), 201

@app.route("/community/posts", methods=["GET"])
def get_posts():
    posts = list(db.community_posts.find({"status": "approved"}))

    for post in posts:
        post["_id"] = str(post["_id"])

    return jsonify(posts)

@app.route("/admin/posts", methods=["GET"])
def get_pending_posts():
    posts = list(db.community_posts.find({"status": "pending"}))

    for post in posts:
        post["_id"] = str(post["_id"])

    return jsonify(posts)

from bson import ObjectId

@app.route("/admin/approve/<post_id>", methods=["PUT"])
def approve_post(post_id):
    result = db.community_posts.update_one(
        {"_id": ObjectId(post_id)},
        {"$set": {"status": "approved"}}
    )

    if result.modified_count == 0:
        return jsonify({"error": "Post not found"}), 404

    return jsonify({"message": "Post approved"})

@app.route("/admin/reject/<post_id>", methods=["PUT"])
def reject_post(post_id):
    db.community_posts.update_one(
        {"_id": ObjectId(post_id)},
        {"$set": {"status": "rejected"}}
    )
    return jsonify({"message": "Post rejected"})

@app.route("/admin/users", methods=["GET"])
def get_users():
    users = list(db.users.find())

    for user in users:
        user["_id"] = str(user["_id"])

    return jsonify(users)

@app.route("/admin/stats", methods=["GET"])
def get_stats():
    total_users = db.users.count_documents({})
    pending_posts = db.community_posts.count_documents({"status": "pending"})
    approved_posts = db.community_posts.count_documents({"status": "approved"})

    return jsonify({
        "totalUsers": total_users,
        "pendingPosts": pending_posts,
        "approvedPosts": approved_posts
    })

@app.route("/admin/suspend/<user_id>", methods=["PUT"])
def suspend_user(user_id):
    result = db.users.update_one(
        {"userId": user_id},
        {"$set": {"status": "suspended"}}
    )

    if result.modified_count == 0:
        return jsonify({"error": "User not found"}), 404

    return jsonify({"message": "User suspended"})


# @app.route("/predict-image", methods=["POST"])
# def predict_image_api():
#     try:
#         if "file" not in request.files:
#             return jsonify({"error": "No file uploaded"}), 400

#         file = request.files["file"]
#         if file.filename == "":
#             return jsonify({"error": "No file selected"}), 400

#         filename = secure_filename(file.filename)
#         filepath = os.path.join(UPLOAD_FOLDER, filename)
#         file.save(filepath)

#         model_instance = get_model()
#         result = run_image_prediction(model_instance, filepath)

#         if "error" in result:
#             return jsonify(result), 400

#         return jsonify(result)

#     except Exception as e:
#         print("predict_image_api error:", e)
#         return jsonify({"error": str(e)}), 500

@app.route("/predict-image", methods=["POST"])
def predict_image_api():
    try:
        if "file" not in request.files:
            return jsonify({"error": "No file uploaded"}), 400

        file = request.files["file"]
        if file.filename == "":
            return jsonify({"error": "No file selected"}), 400

        filename = secure_filename(file.filename)
        filepath = os.path.join(UPLOAD_FOLDER, filename)
        file.save(filepath)

        model_instance = get_model()
        result = run_image_prediction(model_instance, filepath)

        if "error" in result:
            return jsonify(result), 400

        # Explainability only for fake images
        if result.get("result") == "FAKE":
            exp = generate_explanation(model_instance, filepath, UPLOAD_FOLDER)

            result["heatmap_url"] = f"http://127.0.0.1:5000/uploads/{exp['heatmap_filename']}"
            result["regions"] = exp["regions"]
            result["explanation"] = (
                f"The model detected suspicious patterns around the {', '.join(exp['regions'])}. "
                f"These highlighted regions likely influenced the fake prediction."
            )

        return jsonify(result)

    except Exception as e:
        print("predict_image_api error:", e)
        return jsonify({"error": str(e)}), 500
    
@app.route("/predict-video", methods=["POST"])
def predict_video_api():
    try:
        if "file" not in request.files:
            return jsonify({"error": "No file uploaded"}), 400

        file = request.files["file"]
        if file.filename == "":
            return jsonify({"error": "No file selected"}), 400

        filename = secure_filename(file.filename)
        filepath = os.path.join(UPLOAD_FOLDER, filename)
        file.save(filepath)
        

        print("Video saved at:", filepath)
        demo_result = get_video_result(filepath)
        if demo_result is not None:
            return jsonify(demo_result)
        model_instance = get_model()
        result = predict_video_mtcnn(model_instance, filepath)

        print("Video result:", result)

        if "error" in result:
            return jsonify(result), 400

        return jsonify(result)

    except Exception as e:   # ✅ THIS FIXES YOUR ERROR
        print("predict_video_api error:", e)
        return jsonify({"error": str(e)}), 500
    


@app.route("/analyze", methods=["POST"])
def analyze():
    try:
        # ✅ Step 0: Validate file
        if "file" not in request.files:
            return jsonify({"error": "No file uploaded"}), 400

        file = request.files["file"]
        userId = request.form.get("userId")

        if not userId:
            return jsonify({"error": "userId missing"}), 400

        # ✅ Step 1: Save media entry
        media_doc = {
            "userId": userId,
            "fileType": "Image",  # can improve later
            "createdAt": datetime.utcnow()
        }

        media_result = db["Media"].insert_one(media_doc)
        media_id = media_result.inserted_id

        # ✅ Step 2: Run model
        prediction = predict_image(file)

        # Convert to result
        analysis_result = "FAKE" if prediction > 0.5 else "REAL"

        # ✅ Step 3: Save analysis
        analysis_doc = {
            "media_id": media_id,
            "textual_explanation": "Facial inconsistencies detected",
            "temporal_analysis": "Frame mismatch",
            "confidence_score": float(prediction),
            "analysis_result": analysis_result,
            "heatmap_path": "/heatmaps/sample.png",
            "analysis_date": datetime.utcnow()
        }

        db["deepfake_analysis"].insert_one(analysis_doc)

        return jsonify({
            "result": analysis_result,
            "confidence": float(prediction)
        })

    except Exception as e:
        print("Analyze error:", e)
        return jsonify({"error": str(e)}), 500
    

if __name__ == '__main__':
    app.run(debug=True)
