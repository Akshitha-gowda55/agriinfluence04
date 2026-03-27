import os
import random
import shutil

SOURCE_DIR = "dataset_all"
OUTPUT_DIR = "dataset_3000"
TARGET_COUNT = 3000

random.seed(42)

classes = ["black_spot", "healthy", "powdery_mildew", "not_rose"]

for cls in classes:
    src_class = os.path.join(SOURCE_DIR, cls)
    dst_class = os.path.join(OUTPUT_DIR, cls)

    if not os.path.exists(src_class):
        print(f"Class folder not found: {src_class}")
        continue

    os.makedirs(dst_class, exist_ok=True)

    images = [
        f for f in os.listdir(src_class)
        if os.path.isfile(os.path.join(src_class, f))
    ]

    total = len(images)
    print(f"{cls}: found {total} images")

    if total < TARGET_COUNT:
        print(f"{cls}: only {total} images available, cannot reach 3000\n")
        selected = images
    else:
        selected = random.sample(images, TARGET_COUNT)
        print(f"{cls}: selected {TARGET_COUNT} images\n")

    for img in selected:
        shutil.copy2(
            os.path.join(src_class, img),
            os.path.join(dst_class, img)
        )

print("Finished creating dataset_3000.")