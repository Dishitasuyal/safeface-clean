import h5py
import json

MODEL_PATH = "model/video_model.h5"
PATCHED_PATH = "model/video_model_patched.h5"

print("SRC:", MODEL_PATH)
print("DST:", PATCHED_PATH)

with h5py.File(MODEL_PATH, "r") as f:
    model_config = f.attrs.get("model_config")

    if model_config is None:
        raise ValueError("No model_config found")

    if isinstance(model_config, bytes):
        model_config = model_config.decode("utf-8")

    model_config = json.loads(model_config)


def clean_config(obj):
    if isinstance(obj, dict):
        # remove unsupported fields
        obj.pop("batch_shape", None)
        obj.pop("dtype", None)
        obj.pop("dtype_policy", None)
        obj.pop("quantization_config", None)
        obj.pop("build_config", None)
        obj.pop("optional", None)

        for k in list(obj.keys()):
            clean_config(obj[k])

    elif isinstance(obj, list):
        for item in obj:
            clean_config(item)


clean_config(model_config)

with h5py.File(MODEL_PATH, "r") as src, h5py.File(PATCHED_PATH, "w") as dst:
    for key in src.keys():
        src.copy(key, dst)

    dst.attrs["model_config"] = json.dumps(model_config).encode("utf-8")

    for key in src.attrs:
        if key != "model_config":
            dst.attrs[key] = src.attrs[key]

print("✅ Video model patched successfully!")