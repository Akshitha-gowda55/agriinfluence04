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
        "disease": predicted_class,
        "confidence": round(confidence, 2)
    }