#!/usr/bin/env python3
# Generates tools/plains_dusk_palette.png — a 16x1 PNG with the Plains Dusk palette colors.
# Requires Pillow: pip install Pillow
from PIL import Image

PALETTE = [
    "#0e0a08",  # --bg-void
    "#1a1410",  # --shadow-deep
    "#2e211a",  # --earth-dark
    "#4a3424",  # --bark
    "#6b4a32",  # --hide
    "#8a6843",  # --ochre
    "#a98554",  # --grass-dry
    "#c4a571",  # --dust
    "#ddc798",  # --bone
    "#f0e3bc",  # --sun-bleach
    "#4a1f1a",  # --blood-dried
    "#7a2e22",  # --banner-red
    "#2a3024",  # --pine-deep
    "#4a5a40",  # --sage
    "#5d6e7e",  # --snow-shadow
    "#8d9aa8",  # --winter-sky
]

def hex_to_rgb(h):
    h = h.lstrip("#")
    return tuple(int(h[i:i+2], 16) for i in (0, 2, 4))

img = Image.new("RGB", (16, 1))
for i, color in enumerate(PALETTE):
    img.putpixel((i, 0), hex_to_rgb(color))

img.save("tools/plains_dusk_palette.png")
print("Generated tools/plains_dusk_palette.png (16x1 pixels, 16 colors)")
