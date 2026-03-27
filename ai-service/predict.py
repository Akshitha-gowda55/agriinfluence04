import json
import numpy as np
from PIL import Image
from tensorflow.keras.models import load_model
from tensorflow.keras.utils import img_to_array
from tensorflow.keras.applications.mobilenet_v2 import preprocess_input

IMG_SIZE = (224, 224)

MODEL_PATH = "model/best_rose_disease_model.h5"
CLASS_NAMES_PATH = "model/class_names.json"

model = load_model(MODEL_PATH)

with open(CLASS_NAMES_PATH, "r") as f:
    class_names = json.load(f)

index_to_class = {i: name for i, name in enumerate(class_names)}

treatments = {
    "black_spot": "Remove infected leaves and apply fungicide.",
    "healthy": "No disease detected. Maintain normal care.",
    "not_rose": "Invalid image. Please upload a rose leaf image.",
    "powdery_mildew": "Apply sulfur-based fungicide or neem oil spray.",
    "uncertain": "Upload a clearer image. Manual inspection recommended."
}

product_map = {
    "black_spot": {
        "name": "Rose Fungicide Spray",
        "slug": "rose-fungicide-spray"
    },
    "powdery_mildew": {
        "name": "Mildew Control Spray",
        "slug": "mildew-control-spray"
    },
    "healthy": {
        "name": "Rose Growth Booster",
        "slug": "rose-growth-booster"
    }
}

def predict_disease(file_path):
    img = Image.open(file_path).convert("RGB")
    img = img.resize(IMG_SIZE, Image.Resampling.BILINEAR)

    img_array = img_to_array(img)
    img_array = np.expand_dims(img_array, axis=0)
    img_array = preprocess_input(img_array)

    predictions = model.predict(img_array, verbose=0)[0]

    predicted_index = int(np.argmax(predictions))
    predicted_class = index_to_class[predicted_index]
    confidence = float(predictions[predicted_index]) * 100

    if confidence < 60:
        predicted_class = "uncertain"

    return {
        "prediction": predicted_class,
        "disease": predicted_class,
        "confidence": round(confidence, 2),
        "treatment": treatments.get(predicted_class, "Manual inspection recommended."),
        "suggestion": treatments.get(predicted_class, "Manual inspection recommended."),
        "suggestedProduct": product_map.get(predicted_class)
    }