import os
import random
import shutil

SOURCE_DIR = "dataset_3000"
DEST_DIR = "dataset"

TRAIN_COUNT = 2100
VAL_COUNT = 450
TEST_COUNT = 450

random.seed(42)

classes = ["black_spot", "healthy", "powdery_mildew", "not_rose"]

for cls in classes:
    src_class = os.path.join(SOURCE_DIR, cls)

    if not os.path.exists(src_class):
        print(f"Missing class folder: {src_class}")
        continue

    images = [
        f for f in os.listdir(src_class)
        if os.path.isfile(os.path.join(src_class, f))
    ]

    if len(images) != 3000:
        print(f"{cls}: expected 3000 images, found {len(images)}")
        continue

    random.shuffle(images)

    train_imgs = images[:TRAIN_COUNT]
    val_imgs = images[TRAIN_COUNT:TRAIN_COUNT + VAL_COUNT]
    test_imgs = images[TRAIN_COUNT + VAL_COUNT:TRAIN_COUNT + VAL_COUNT + TEST_COUNT]

    split_map = {
        "train": train_imgs,
        "val": val_imgs,
        "test": test_imgs,
    }

    for split_name, split_imgs in split_map.items():
        split_dir = os.path.join(DEST_DIR, split_name, cls)
        os.makedirs(split_dir, exist_ok=True)

        for img in split_imgs:
            shutil.copy2(
                os.path.join(src_class, img),
                os.path.join(split_dir, img)
            )

    print(f"{cls}: split complete")

print("All classes split successfully.")