#!/bin/bash
TARGET_DIR="src/assets/Compressed"
SRC_DIR="src/assets/FotoIkamma"

mkdir -p "$TARGET_DIR"

# Supported formats: JPG, JPEG, PNG, HEIC, ARW
find "$SRC_DIR" -type f \( -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.png" -o -iname "*.heic" -o -iname "*.arw" \) | while read -r FILE; do
  # Calculate relative path
  REL_PATH="${FILE#$SRC_DIR/}"
  
  # Sanitize the relative path:
  # 1. Replace spaces with underscores
  # 2. Remove characters that cause issues in URLs/Vite (#, ?, &, [, ], (, ))
  # 3. Keep directory structure
  DIR_PART=$(dirname "$REL_PATH")
  FILE_PART=$(basename "$REL_PATH")
  
  SAFE_FILE_PART=$(echo "$FILE_PART" | tr ' ' '_' | sed 's/[#?&\[\]()]/_/g')
  SAFE_REL_PATH="$DIR_PART/$SAFE_FILE_PART"
  
  # Output is always .jpg
  DEST_FILE="$TARGET_DIR/${SAFE_REL_PATH%.*}.jpg"
  
  # Create dest directory if needed
  mkdir -p "$(dirname "$DEST_FILE")"
  
  # Check if destination already exists to avoid redundant work
  if [ ! -f "$DEST_FILE" ]; then
    echo "Compressing: $REL_PATH -> $SAFE_REL_PATH"
    # -Z 1200 scales longest edge to 1200px. -s formatOptions normal applies good compression.
    sips -Z 1200 -s format jpeg -s formatOptions normal "$FILE" --out "$DEST_FILE" >/dev/null 2>&1
  fi
done
echo "Compression complete."
