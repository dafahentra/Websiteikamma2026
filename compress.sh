#!/bin/bash
TARGET_DIR="src/assets/CompressedPhotos"
SRC_DIR="src/assets/FotoIkamma"

mkdir -p "$TARGET_DIR"

find "$SRC_DIR" -type f \( -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.png" \) | while read -r FILE; do
  # Calculate relative path
  REL_PATH="${FILE#$SRC_DIR/}"
  DEST_FILE="$TARGET_DIR/${REL_PATH%.*}.jpg"
  
  # Create dest directory if needed
  mkdir -p "$(dirname "$DEST_FILE")"
  
  # Check if destination already exists to avoid redundant work
  if [ ! -f "$DEST_FILE" ]; then
    echo "Compressing: $REL_PATH"
    # -Z 800 scales longest edge to 800px. -s formatOptions low applies low jpeg quality.
    sips -Z 800 -s format jpeg -s formatOptions low "$FILE" --out "$DEST_FILE" >/dev/null 2>&1
  fi
done
echo "Compression complete."
