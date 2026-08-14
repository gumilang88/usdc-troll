#!/usr/bin/env python3
"""Cutout troll face. Background = bright saturated light-blue (sat~190-220, bright).
Foreground = dark blue/black face + white teeth + black outline.
Strategy: classify each pixel by sampling; remove the light-blue bg family
(high brightness AND blue-dominant AND mid-high saturation)."""
from PIL import Image, ImageFilter
import numpy as np
import os
from scipy import ndimage

SRC = os.path.join(os.path.dirname(__file__), "..", "troll_logo.jpg")
OUT_DIR = os.path.join(os.path.dirname(__file__), "..", "public", "images")
os.makedirs(OUT_DIR, exist_ok=True)

img = Image.open(SRC).convert("RGB")
a = np.array(img).astype(np.int16)
H, W, _ = a.shape
r, g, b = a[..., 0], a[..., 1], a[..., 2]
sat = a.max(axis=2) - a.min(axis=2)
br = a.mean(axis=2)
blue_dom = (b - r)  # positive => blue-ish

# background pixel signature: blue dominant, bright (br>110), sat>100
is_bg = (br > 110) & (sat > 100) & (blue_dom > 30)
# foreground = everything else (dark face, black outline, white teeth, coins)
fg = (~is_bg).astype(np.uint8) * 255

m = Image.fromarray(fg, "L")
m = m.filter(ImageFilter.MedianFilter(5))

mask_arr = np.array(m) > 128
# fill holes inside foreground blobs
mask_arr = ndimage.binary_fill_holes(mask_arr)
lbl, n = ndimage.label(mask_arr)
if n == 0:
    raise SystemExit("empty")
sizes = ndimage.sum(mask_arr, lbl, range(1, n + 1))
# keep the single largest blob (the face)
biggest = int(np.argmax(sizes)) + 1
mask_arr = lbl == biggest
m = Image.fromarray((mask_arr * 255).astype(np.uint8), "L")

bbox = m.getbbox()
if bbox:
    pad = 25
    x0, y0, x1, y1 = bbox
    x0 = max(0, x0 - pad); y0 = max(0, y0 - pad)
    x1 = min(W, x1 + pad); y1 = min(H, y1 + pad)
    img = img.crop((x0, y0, x1, y1))
    m = m.crop((x0, y0, x1, y1))

rgba = img.convert("RGBA")
rgba.putalpha(m)
out = os.path.join(OUT_DIR, "troll-face.png")
rgba.save(out)

a2 = np.array(rgba); al = a2[..., 3]
print("saved", out, rgba.size)
print(f"transparent: {(al<10).sum()} ({(al<10).mean()*100:.1f}%)")
print(f"opaque: {(al>240).sum()} ({(al>240).mean()*100:.1f}%)")
print("corner alpha:", al[0,0], al[0,-1], al[-1,0], al[-1,-1])

icon = rgba.copy(); icon.thumbnail((512,512), Image.LANCZOS)
icon.save(os.path.join(OUT_DIR, "troll-token.png"))
print("saved troll-token.png")
