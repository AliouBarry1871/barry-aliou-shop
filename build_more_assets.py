import os
import numpy as np
from PIL import Image, ImageDraw, ImageFilter, ImageOps

assets_dir = r"c:\Users\hp\Desktop\Mon site web\assets"

# Create a Striped Knit Zip Polo from jacket silhouette or custom high-res template
# Let's create a beautiful Boxy Tee and Striped Knit using the clean templates
jacket_front = Image.open(os.path.join(assets_dir, "jacket-front.jpg")).convert("RGB")
w, h = jacket_front.size
arr_j = np.array(jacket_front, dtype=np.float32)

r_j = arr_j[:, :, 0]
g_j = arr_j[:, :, 1]
b_j = arr_j[:, :, 2]
bg_j = (r_j > 240) & (g_j > 240) & (b_j > 240)
fab_j = ~bg_j

# 1. Knit Sweater (Navy & White / Cream stripes)
arr_knit = arr_j.copy()
lum_j = (0.299 * r_j + 0.587 * g_j + 0.114 * b_j) / 255.0

# Vertical stripes pattern across width x
x_idx = np.arange(w)[None, :]
# Stripe period of 40px
stripe = (np.sin(x_idx * 2 * np.pi / 42.0) > 0.0).astype(np.float32)
stripe_smooth = np.tile(stripe, (h, 1))

# Deep Cobalt Navy when stripe==0, Warm Ecru/Cream when stripe==1
navy_r = 18.0 + lum_j * 25.0
navy_g = 28.0 + lum_j * 40.0
navy_b = 58.0 + lum_j * 85.0

cream_r = 215.0 + lum_j * 35.0
cream_g = 210.0 + lum_j * 38.0
cream_b = 198.0 + lum_j * 42.0

final_knit_r = stripe_smooth * cream_r + (1.0 - stripe_smooth) * navy_r
final_knit_g = stripe_smooth * cream_g + (1.0 - stripe_smooth) * navy_g
final_knit_b = stripe_smooth * cream_b + (1.0 - stripe_smooth) * navy_b

# Collar area stay solid navy
y_idx = np.arange(h)[:, None]
collar = (y_idx < 0.28 * h) & fab_j

arr_knit[fab_j, 0] = final_knit_r[fab_j]
arr_knit[fab_j, 1] = final_knit_g[fab_j]
arr_knit[fab_j, 2] = final_knit_b[fab_j]

arr_knit[collar, 0] = navy_r[collar]
arr_knit[collar, 1] = navy_g[collar]
arr_knit[collar, 2] = navy_b[collar]

img_knit_front = Image.fromarray(np.clip(arr_knit, 0, 255).astype(np.uint8))
img_knit_front.save(os.path.join(assets_dir, "knit-front.jpg"), quality=93)
img_knit_back = ImageOps.mirror(img_knit_front)
img_knit_back.save(os.path.join(assets_dir, "knit-back.jpg"), quality=93)
print("Created knit-front.jpg and knit-back.jpg")

# 2. Oversized Boxy Tee (from hoodie body, without hood, clean vintage tee silhouette)
hoodie_front = Image.open(os.path.join(assets_dir, "hoodie-front.jpg")).convert("RGB")
arr_h = np.array(hoodie_front, dtype=np.float32)
r_h = arr_h[:, :, 0]
g_h = arr_h[:, :, 1]
b_h = arr_h[:, :, 2]
bg_h = (r_h > 240) & (g_h > 240) & (b_h > 240)
fab_h = ~bg_h
lum_h = (0.299 * r_h + 0.587 * g_h + 0.114 * b_h) / 255.0

# Create Vintage Off-White Boxy Tee
arr_tee = arr_h.copy()
tee_r = 232.0 - (1.0 - lum_h) * 55.0
tee_g = 228.0 - (1.0 - lum_h) * 58.0
tee_b = 220.0 - (1.0 - lum_h) * 62.0
arr_tee[fab_h, 0] = tee_r[fab_h]
arr_tee[fab_h, 1] = tee_g[fab_h]
arr_tee[fab_h, 2] = tee_b[fab_h]

img_tee_front = Image.fromarray(np.clip(arr_tee, 0, 255).astype(np.uint8))
draw = ImageDraw.Draw(img_tee_front)
# Add clean minimalist streetwear typography print in center
# Minimalist graphic
img_tee_front.save(os.path.join(assets_dir, "tee-front.jpg"), quality=93)
img_tee_back = ImageOps.mirror(img_tee_front)
img_tee_back.save(os.path.join(assets_dir, "tee-back.jpg"), quality=93)
print("Created tee-front.jpg and tee-back.jpg")
