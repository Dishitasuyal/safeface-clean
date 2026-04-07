import os
import keras

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