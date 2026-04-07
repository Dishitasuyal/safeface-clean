import os
import json
import shutil
import h5py

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
SRC = os.path.join(BASE_DIR, "model", "deepfake_model.h5")
DST = os.path.join(BASE_DIR, "model", "deepfake_model_patched.h5")

print("SRC:", SRC)
print("DST:", DST)
print("SRC exists:", os.path.exists(SRC))

shutil.copyfile(SRC, DST)

def patch_obj(obj):
    if isinstance(obj, dict):
        # Fix InputLayer fields
        if obj.get("class_name") == "InputLayer":
            cfg = obj.get("config", {})
            if "batch_shape" in cfg and "batch_input_shape" not in cfg:
                cfg["batch_input_shape"] = cfg.pop("batch_shape")
            cfg.pop("optional", None)

        # Replace Keras 3 dtype policy objects with plain dtype strings
        dtype_val = obj.get("dtype")
        if isinstance(dtype_val, dict) and dtype_val.get("class_name") == "DTypePolicy":
            cfg = dtype_val.get("config", {})
            obj["dtype"] = cfg.get("name", "float32")

        # Remove unsupported Keras 3 fields
        obj.pop("quantization_config", None)

        for v in obj.values():
            patch_obj(v)

    elif isinstance(obj, list):
        for item in obj:
            patch_obj(item)

with h5py.File(DST, "r+") as f:
    raw = f.attrs["model_config"]

    if isinstance(raw, bytes):
        config = json.loads(raw.decode("utf-8"))
    else:
        config = json.loads(raw)

    patch_obj(config)

    new_raw = json.dumps(config).encode("utf-8")
    f.attrs.modify("model_config", new_raw)

print("Patched model written to:")
print(DST)