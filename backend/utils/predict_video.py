import cv2
import numpy as np

def preprocess_frame(frame):
    # match image pipeline
    frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
    frame = cv2.resize(frame, (224, 224))
    frame = frame.astype("float32") / 255.0
    frame = np.expand_dims(frame, axis=0)
    return frame

def predict_video_mtcnn(model, video_path):
    cap = cv2.VideoCapture(video_path)

    if not cap.isOpened():
        return {"error": "Could not open video file"}

    predictions = []
    frame_count = 0
    processed_frames = 0

    # sample more frames, but still keep it practical
    sample_every = 10
    max_processed = 12

    while True:
        ret, frame = cap.read()
        if not ret:
            break

        if frame_count % sample_every == 0:
            processed = preprocess_frame(frame)
            pred = float(model.predict(processed, verbose=0)[0][0])
            pred = max(0.0, min(1.0, pred))
            predictions.append(pred)
            processed_frames += 1

            print(f"frame {frame_count}: pred={pred:.6f}")

            if processed_frames >= max_processed:
                break

        frame_count += 1

    cap.release()

    if len(predictions) == 0:
        return {"error": "No valid frames processed"}

    print("ALL PREDS:", predictions)

    avg_pred = sum(predictions) / len(predictions)
    min_pred = min(predictions)

    # keep same label direction as image pipeline:
    # lower score = more fake
    if min_pred < 0.60:
        confidence = round((1 - min_pred) * 100, 2)
        return {
            "result": "FAKE",
            "confidence": confidence,
            "frames_used": len(predictions)
        }
    else:
        confidence = round(avg_pred * 100, 2)
        return {
            "result": "REAL",
            "confidence": confidence,
            "frames_used": len(predictions)
        }
        
# IMPORTANT:
# If your fake videos still come out REAL after testing this,
# change FAKE_IF_LOW = False at the bottom logic.
# FAKE_IF_LOW = False
# def predict_video_mtcnn(model, video_path):
#     cap = cv2.VideoCapture(video_path)

#     if not cap.isOpened():
#         return {"error": "Could not open video file"}

#     predictions = []
#     frame_count = 0
#     processed_frames = 0
#     max_processed = 12

#     while True:
#         ret, frame = cap.read()
#         if not ret:
#             break

#         if frame_count % 15 == 0:
#             rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
#             faces = detector.detect_faces(rgb)

#             if len(faces) > 0:
#                 x, y, w, h = faces[0]["box"]
#                 x, y = max(0, x), max(0, y)

#                 face = frame[y:y+h, x:x+w]

#                 if face is not None and face.size != 0:
#                     face = cv2.cvtColor(face, cv2.COLOR_BGR2RGB)
#                     face = cv2.resize(face, (224, 224))
#                     face = face.astype("float32") / 255.0
#                     face = np.expand_dims(face, axis=0)

#                     pred = float(model.predict(face, verbose=0)[0][0])
#                     predictions.append(pred)
#                     processed_frames += 1

#                     if processed_frames >= max_processed:
#                         break

#         frame_count += 1

#     cap.release()

#     if len(predictions) == 0:
#         return {"error": "No faces detected"}

#     avg_pred = sum(predictions) / len(predictions)
#     min_pred = min(predictions)

#     if min_pred < 0.6:
#         return {
#             "result": "FAKE",
#             "confidence": round((1 - min_pred) * 100, 2),
#             "frames_used": len(predictions)
#         }
#     else:
#         return {
#             "result": "REAL",
#             "confidence": round(avg_pred * 100, 2),
#             "frames_used": len(predictions)
#         }