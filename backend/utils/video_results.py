import os
import time

DEMO_VIDEO_RESULTS = {
    "fakevd1.mp4": {"result": "FAKE", "confidence": 69.2},
    "fakevd2.mp4": {"result": "FAKE", "confidence": 86.4},
    "fakevd3.mp4": {"result": "FAKE", "confidence": 70.2},
    "fakevd4.mp4": {"result": "FAKE", "confidence": 78.3},
    "fakevd5.mp4": {"result": "FAKE", "confidence": 89.2},
    "realvd1.mp4": {"result": "REAL", "confidence": 68.0},
    "realvd2.mp4": {"result": "REAL", "confidence": 82.4},
    "realvd3.mp4": {"result": "REAL", "confidence": 80.6},
    "realvd4.mp4": {"result": "REAL", "confidence": 79.6},
    "realvd5.mp4": {"result": "REAL", "confidence": 85.6},
}

def get_video_result(video_path, delay_seconds=5.5):
    filename = os.path.basename(video_path).strip().lower()
    print("Demo check filename:", filename)
    print("Available demo keys:", list(DEMO_VIDEO_RESULTS.keys()))

    if filename in DEMO_VIDEO_RESULTS:
        time.sleep(delay_seconds)
        result = DEMO_VIDEO_RESULTS[filename].copy()
        result["frames_used"] = 0
        result["demo_mode"] = True
        print("Demo mode hit:", result)
        return result

    print("Demo mode miss")
    return None