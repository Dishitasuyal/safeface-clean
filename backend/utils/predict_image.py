import cv2
import numpy as np
import math

def predict_image(model, image_path):
    img = cv2.imread(image_path)
    if img is None:
        return {"error": "Invalid image file"}

    img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
    img = cv2.resize(img, (224, 224))
    img = img.astype("float32") / 255.0
    img = np.expand_dims(img, axis=0)

    raw_pred = model.predict(img, verbose=0)
    pred = float(raw_pred[0][0])

    if math.isnan(pred) or math.isinf(pred):
        return {"error": f"Invalid prediction value: {pred}"}

    pred = max(0.0, min(1.0, pred))

    if pred < 0.6:
        return {"result": "FAKE", "confidence": round((1.0 - pred) * 100, 2)}
    else:
        return {"result": "REAL", "confidence": round(pred * 100, 2)}