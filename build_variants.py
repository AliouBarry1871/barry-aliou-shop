import os
import numpy as np
from PIL import Image, ImageFilter, ImageOps

assets_dir = r"c:\Users\hp\Desktop\Mon site web\assets"
orange_path = os.path.join(assets_dir, "vest-orange-front.jpg")

img_orange = Image.open(orange_path).convert("RGB")
w, h = img_orange.size
arr = np.array(img_orange, dtype=np.float32)

r = arr[:, :, 0]
g = arr[:, :, 1]
b = arr[:, :, 2]

# Detect pure white background
bg_mask = (r > 242) & (g > 242) & (b > 242)

# Precise chest dove mask (dove is white: high r, g, b, low color difference)
y_coords, x_coords = np.ogrid[:h, :w]
chest_region = (y_coords > 0.38 * h) & (y_coords < 0.58 * h) & (x_coords > 0.40 * w) & (x_coords < 0.60 * w)
dove_core = chest_region & (r > 215) & (g > 215) & (b > 215)

# Slightly dilated dove for back inpainting
dove_mask_pil = Image.fromarray((dove_core * 255).astype(np.uint8))
dove_dilated_12 = np.array(dove_mask_pil.filter(ImageFilter.MaxFilter(15))) > 50

# --- 1. REFINED VEST ORANGE BACK ---
# Sample the clean baffle horizontal stripe right below the dove (y around 0.60 to 0.70)
arr_orange_back = arr.copy()
# Map dove region pixels to a clean patch from the baffle below
for y in range(int(0.38 * h), int(0.58 * h)):
    offset = int(0.18 * h)
    arr_orange_back[y, :] = arr[min(h - 1, y + offset), :]

# Restore everything outside the dove box
box_mask = np.zeros((h, w), dtype=bool)
box_mask[int(0.39 * h):int(0.56 * h), int(0.41 * w):int(0.58 * w)] = True
box_mask_pil = Image.fromarray((box_mask * 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(12))
mask_weight = np.array(box_mask_pil, dtype=np.float32) / 255.0

arr_final_orange_back = arr * (1.0 - mask_weight[:, :, None]) + arr_orange_back * mask_weight[:, :, None]
img_orange_back = Image.fromarray(np.clip(arr_final_orange_back, 0, 255).astype(np.uint8))
img_orange_back = ImageOps.mirror(img_orange_back)
img_orange_back.save(os.path.join(assets_dir, "vest-orange-back.jpg"), quality=94)
print("Updated vest-orange-back.jpg")

# --- 2. REFINED VEST BLACK FRONT ---
# Convert orange vest fabric to sleek matte black without orange fringe
arr_black_front = arr.copy()
# Dove feather mask: anything inside chest where saturation is low
diff_rg = np.abs(r - g)
diff_rb = np.abs(r - b)
is_dove = chest_region & (diff_rg < 25) & (diff_rb < 35) & (r > 190)

# Expand dove feather slightly to keep its pure white wings and body
dove_pure = Image.fromarray((is_dove * 255).astype(np.uint8)).filter(ImageFilter.MaxFilter(3))
dove_pure_arr = np.array(dove_pure) > 100

# Fabric mask: all non-bg and non-dove
fabric = (~bg_mask) & (~dove_pure_arr)

# Convert all orange pixels to deep rich charcoal black
lum = (0.299 * r + 0.587 * g + 0.114 * b)
# Shading curve
black_val = 18.0 + (lum / 255.0) * 48.0

# Apply with soft edge
arr_black_front[fabric, 0] = black_val[fabric]
arr_black_front[fabric, 1] = black_val[fabric] * 1.01
arr_black_front[fabric, 2] = black_val[fabric] * 1.03

# Fix any fringing in chest region: if pixel is between dove and fabric, de-saturate
halo = chest_region & (~bg_mask) & (~dove_pure_arr) & (r > b + 15)
halo_lum = 0.299 * r[halo] + 0.587 * g[halo] + 0.114 * b[halo]
arr_black_front[halo, 0] = 20.0 + (halo_lum / 255.0) * 45.0
arr_black_front[halo, 1] = 20.0 + (halo_lum / 255.0) * 45.0
arr_black_front[halo, 2] = 22.0 + (halo_lum / 255.0) * 46.0

img_black_front = Image.fromarray(np.clip(arr_black_front, 0, 255).astype(np.uint8))
img_black_front.save(os.path.join(assets_dir, "vest-black-front.jpg"), quality=94)
print("Updated vest-black-front.jpg")

# --- 3. REFINED VEST BLACK BACK ---
arr_bb = np.array(img_orange_back, dtype=np.float32)
r_b = arr_bb[:, :, 0]
g_b = arr_bb[:, :, 1]
b_b = arr_bb[:, :, 2]
bg_b = (r_b > 242) & (g_b > 242) & (b_b > 242)
fab_b = ~bg_b
lum_b = (0.299 * r_b + 0.587 * g_b + 0.114 * b_b)
dark_b = 18.0 + (lum_b / 255.0) * 48.0
arr_bb[fab_b, 0] = dark_b[fab_b]
arr_bb[fab_b, 1] = dark_b[fab_b] * 1.01
arr_bb[fab_b, 2] = dark_b[fab_b] * 1.03
img_black_back = Image.fromarray(np.clip(arr_bb, 0, 255).astype(np.uint8))
img_black_back.save(os.path.join(assets_dir, "vest-black-back.jpg"), quality=94)
print("Updated vest-black-back.jpg")

# --- 4. CREATE A 3RD LUXURY COLORWAY: VEST CREAM / OFF-WHITE ---
arr_cream_front = arr.copy()
cream_r = 230.0 - (1.0 - lum / 255.0) * 55.0
cream_g = 226.0 - (1.0 - lum / 255.0) * 60.0
cream_b = 215.0 - (1.0 - lum / 255.0) * 65.0
arr_cream_front[fabric, 0] = cream_r[fabric]
arr_cream_front[fabric, 1] = cream_g[fabric]
arr_cream_front[fabric, 2] = cream_b[fabric]
# In cream vest, dove is charcoal
arr_cream_front[dove_pure_arr, 0] = 30.0
arr_cream_front[dove_pure_arr, 1] = 30.0
arr_cream_front[dove_pure_arr, 2] = 32.0
img_cream_front = Image.fromarray(np.clip(arr_cream_front, 0, 255).astype(np.uint8))
img_cream_front.save(os.path.join(assets_dir, "vest-cream-front.jpg"), quality=94)

arr_cream_back = np.array(img_orange_back, dtype=np.float32)
r_cb = arr_cream_back[:, :, 0]
g_cb = arr_cream_back[:, :, 1]
b_cb = arr_cream_back[:, :, 2]
fab_cb = ~((r_cb > 242) & (g_cb > 242) & (b_cb > 242))
lum_cb = (0.299 * r_cb + 0.587 * g_cb + 0.114 * b_cb)
arr_cream_back[fab_cb, 0] = (230.0 - (1.0 - lum_cb / 255.0) * 55.0)[fab_cb]
arr_cream_back[fab_cb, 1] = (226.0 - (1.0 - lum_cb / 255.0) * 60.0)[fab_cb]
arr_cream_back[fab_cb, 2] = (215.0 - (1.0 - lum_cb / 255.0) * 65.0)[fab_cb]
img_cream_back = Image.fromarray(np.clip(arr_cream_back, 0, 255).astype(np.uint8))
img_cream_back.save(os.path.join(assets_dir, "vest-cream-back.jpg"), quality=94)
print("Created vest-cream-front.jpg and vest-cream-back.jpg")
