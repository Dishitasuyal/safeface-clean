import os
import cv2
import numpy as np
import keras
import tensorflow as tf
from datetime import datetime


def preprocess_for_model(image_path):
    original = cv2.imread(image_path)
    if original is None:
        raise FileNotFoundError(f"Image not found: {image_path}")

    original = cv2.resize(original, (224, 224))
    rgb = cv2.cvtColor(original, cv2.COLOR_BGR2RGB)
    img = rgb.astype("float32") / 255.0
    img = np.expand_dims(img, axis=0)
    return original, img


def find_last_conv_layer(model):
    for layer in reversed(model.layers):
        if "conv" in layer.__class__.__name__.lower():
            return layer.name
    raise ValueError("No convolutional layer found in model")


def make_gradcam_heatmap(img_array, model, last_conv_layer_name=None):
    if last_conv_layer_name is None:
        last_conv_layer_name = find_last_conv_layer(model)

    grad_model = keras.models.Model(
        inputs=model.inputs,
        outputs=[model.get_layer(last_conv_layer_name).output, model.output]
    )

    with tf.GradientTape() as tape:
        conv_outputs, predictions = grad_model(img_array)
        loss = predictions[:, 0]

    grads = tape.gradient(loss, conv_outputs)
    pooled_grads = tf.reduce_mean(grads, axis=(0, 1, 2))

    conv_outputs = conv_outputs[0]
    heatmap = tf.reduce_sum(conv_outputs * pooled_grads, axis=-1)

    heatmap = tf.maximum(heatmap, 0)
    max_val = tf.reduce_max(heatmap)
    if max_val == 0:
        return np.zeros((heatmap.shape[0], heatmap.shape[1]), dtype=np.float32)

    heatmap = heatmap / max_val
    return heatmap.numpy()


def overlay_heatmap(heatmap, original_bgr, alpha=0.45):
    heatmap = cv2.resize(heatmap, (original_bgr.shape[1], original_bgr.shape[0]))
    heatmap_uint8 = np.uint8(255 * heatmap)
    heatmap_color = cv2.applyColorMap(heatmap_uint8, cv2.COLORMAP_JET)
    overlay = cv2.addWeighted(original_bgr, 1 - alpha, heatmap_color, alpha, 0)
    return overlay


def region_from_point(x, y, w=224, h=224):
    # rough facial zones
    if y < h * 0.28:
        return "forehead"
    elif y < h * 0.48:
        return "eye region"
    elif y < h * 0.68:
        return "nose and cheek region"
    else:
        return "mouth and jaw region"


def detect_suspicious_regions(heatmap):
    heatmap_resized = cv2.resize(heatmap, (224, 224))
    threshold = np.percentile(heatmap_resized, 85)
    mask = (heatmap_resized >= threshold).astype("uint8") * 255

    contours, _ = cv2.findContours(mask, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    regions = []

    for cnt in sorted(contours, key=cv2.contourArea, reverse=True)[:3]:
        x, y, w, h = cv2.boundingRect(cnt)
        cx = x + w // 2
        cy = y + h // 2
        region = region_from_point(cx, cy)
        if region not in regions:
            regions.append(region)

    if not regions:
        regions = ["facial region"]

    return regions


def build_text_explanation(confidence, regions):
    region_text = ", ".join(regions)
    return (
        f"The model flagged this image as likely fake because it focused strongly on suspicious "
        f"patterns around the {region_text}. These highlighted areas may contain blending artifacts, "
        f"texture inconsistencies, or unnatural facial transitions. Model confidence for the fake "
        f"prediction is {confidence:.2f}%."
    )

def debug_model_layers(model):
    print("=== MODEL LAYERS ===")
    for layer in model.layers:
        print(layer.name, "-", layer.__class__.__name__)

def generate_explanation(model, image_path, upload_folder):
    original_bgr, img_array = preprocess_for_model(image_path)
    #debug_model_layers(model)
    heatmap = make_gradcam_heatmap(img_array, model, last_conv_layer_name="conv2d_5")
    overlay = overlay_heatmap(heatmap, original_bgr)
    regions = detect_suspicious_regions(heatmap)

    timestamp = datetime.now().strftime("%Y%m%d%H%M%S%f")
    out_name = f"heatmap_{timestamp}.jpg"
    out_path = os.path.join(upload_folder, out_name)

    cv2.imwrite(out_path, overlay)

    return {
        "heatmap_filename": out_name,
        "regions": regions
    }