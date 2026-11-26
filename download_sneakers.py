import urllib.request
import os
from PIL import Image, ImageOps

assets_dir = r"c:\Users\hp\Desktop\Mon site web\assets"

headers = {'User-Agent': 'Mozilla/5.0'}

# Download Jordan / sneaker images
url_front = "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=900&q=85"
url_back = "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=900&q=85"

try:
    req_f = urllib.request.Request(url_front, headers=headers)
    with urllib.request.urlopen(req_f, timeout=10) as resp:
        with open(os.path.join(assets_dir, "sneakers-front.jpg"), "wb") as f:
            f.write(resp.read())
    print("Downloaded sneakers-front.jpg")
except Exception as e:
    print("Error front:", e)

try:
    req_b = urllib.request.Request(url_back, headers=headers)
    with urllib.request.urlopen(req_b, timeout=10) as resp:
        with open(os.path.join(assets_dir, "sneakers-back.jpg"), "wb") as f:
            f.write(resp.read())
    print("Downloaded sneakers-back.jpg")
except Exception as e:
    # Fallback to mirror front as rear profile
    front_path = os.path.join(assets_dir, "sneakers-front.jpg")
    if os.path.exists(front_path):
        img_f = Image.open(front_path)
        img_b = ImageOps.mirror(img_f)
        img_b.save(os.path.join(assets_dir, "sneakers-back.jpg"), quality=90)
        print("Created mirrored sneakers-back.jpg as fallback")
