import os
import keras
import tensorflow as tf

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.join(BASE_DIR, "model", "deepfake_model_patched.h5")

_model = None

def get_model():
    global _model
    if _model is None:
        if not os.path.exists(MODEL_PATH):
            raise FileNotFoundError(f"Model file not found: {MODEL_PATH}")
        print("Loading model from:", MODEL_PATH)
        _model = keras.models.load_model(MODEL_PATH, compile=False)
        print("Model loaded successfully")
    return _model


# ================= VIDEO MODEL =================
# VIDEO_MODEL_PATH = os.path.join(BASE_DIR, "model", "video_model_patched.h5")

# _video_model = None

# def get_video_model():
#     global _video_model
#     if _video_model is None:
#         if not os.path.exists(VIDEO_MODEL_PATH):
#             raise FileNotFoundError(f"Video model not found: {VIDEO_MODEL_PATH}")

#         print("Loading VIDEO model from:", VIDEO_MODEL_PATH)
#         _video_model = tf.keras.models.load_model(VIDEO_MODEL_PATH, compile=False)
#         print("Video model loaded successfully")

#     return _video_model

from utils.video_model_builder import build_video_model

VIDEO_MODEL_PATH = os.path.join(BASE_DIR, "model", "video_ckpt", "video_weights-1")
_video_model = None

def get_video_model():
    global _video_model
    if _video_model is None:
        if not os.path.exists(VIDEO_MODEL_PATH + ".index"):
            raise FileNotFoundError(f"Video weights not found: {VIDEO_MODEL_PATH}")

        print("Building VIDEO model architecture...")
        _video_model = build_video_model()

        print("Loading VIDEO weights from:", VIDEO_MODEL_PATH)
        ckpt = tf.train.Checkpoint(model=_video_model)
        ckpt.restore(VIDEO_MODEL_PATH).expect_partial()

        print("Video model loaded successfully")
    return _video_model
