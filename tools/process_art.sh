#!/bin/bash
# Resizes raw AI-generated art to 480x270 for use as scene backgrounds.
# Usage: ./tools/process_art.sh <raw_input.png> <output_name>
# Produces: assets/art/bg/<output_name>.png at 480x270, full color.
#
# Requires ImageMagick 7+: brew install imagemagick
#
# NOTE: palette-locking (-remap) is intentionally omitted for backgrounds.
# Remapping to the 16 Plains Dusk UI colors destroys blues, reds, and warm
# oranges in scene art. The palette lock only applies to UI sprites.

RAW="$1"
NAME="$2"
OUT="assets/art/bg/${NAME}.png"

if [ -z "$RAW" ] || [ -z "$NAME" ]; then
    echo "Usage: $0 <raw_input.png> <output_name>"
    exit 1
fi

if [ ! -f "$RAW" ]; then
    echo "Error: input file '$RAW' not found"
    exit 1
fi

magick "$RAW" \
    -resize 480x270^ \
    -gravity center -extent 480x270 \
    "$OUT"

echo "→ $OUT"
