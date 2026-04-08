import cv2
import numpy as np
from tensorflow.keras.applications.mobilenet_v2 import preprocess_input


def predict_video_with_video_model(model, video_path):
    cap = cv2.VideoCapture(video_path)

    # ❗ Check if video opened
    if not cap.isOpened():
        return {"error": "Video could not be opened"}

    predictions = []
    frame_count = 0

    while True:
        ret, frame = cap.read()
        if not ret:
            break

        # ✅ Sample every 5th frame (same as training)
        if frame_count % 5 == 0:
            try:
                # ✅ Preprocessing (FIXED)
                img = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
                img = cv2.resize(img, (224, 224))
                img = img.astype("float32")

                # 🔥 CRITICAL FIX (MobileNetV2 normalization)
                img = preprocess_input(img)

                img = np.expand_dims(img, axis=0)

                pred = float(model.predict(img, verbose=0)[0][0])
                predictions.append(pred)

            except Exception as e:
                print("Frame processing error:", e)

        frame_count += 1

    cap.release()

    # ❗ No frames processed
    if len(predictions) == 0:
        return {"error": "No frames processed from video"}

    # ✅ Average prediction
    avg_pred = sum(predictions) / len(predictions)

    # 🔍 DEBUG (keep for now)
    print("Frames used:", len(predictions))
    print("First 5 predictions:", predictions[:5])
    print("Average prediction:", avg_pred)

    # ✅ FINAL DECISION (correct threshold)
    # if avg_pred > 0.65:
    #     result = "REAL"
    #     confidence = round(avg_pred * 100, 2)
    # elif avg_pred < 0.35:
    #     result = "FAKE"
    #     confidence = round((1 - avg_pred) * 100, 2)
    # else:
    #     result = "UNCERTAIN"
    confidence = abs(avg_pred - 0.5)
    if confidence < 0.15:
        result = "UNCERTAIN"
    elif avg_pred > 0.5:
        result = "REAL"
    else:
        result = "FAKE"
        
    return {
        "result": result,
        "confidence": confidence,
        "score": avg_pred,
        "frames_used": len(predictions)
    }