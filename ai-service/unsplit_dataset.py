import os
import shutil

SOURCE = "dataset"
DEST = "dataset_all"

splits = ["train", "val", "test"]

for split in splits:
    split_path = os.path.join(SOURCE, split)

    if not os.path.exists(split_path):
        continue

    for cls in os.listdir(split_path):

        class_folder = os.path.join(split_path, cls)
        dest_folder = os.path.join(DEST, cls)

        os.makedirs(dest_folder, exist_ok=True)

        for img in os.listdir(class_folder):
            src = os.path.join(class_folder, img)
            dst = os.path.join(dest_folder, img)

            shutil.move(src, dst)

print("All images moved back to dataset_all")