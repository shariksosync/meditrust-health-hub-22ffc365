import re

path = "src/data/demo.js"
with open(path, "r", encoding="utf-8") as f:
    content = f.read()

# 1. Clean up any multiple repeated image properties in single lines
content = re.sub(r'(?:image:\s*"/images/products/[^"]*"\s*,\s*)+', '', content)

# 2. Super saving deals
super_map = {
    "deal-1": "/images/products/super_unienzyme.png",
    "deal-2": "/images/products/super_clocip.png",
    "deal-3": "/images/products/super_cofsils.png",
    "deal-4": "/images/products/super_eloway.png",
    "deal-5": "/images/products/super_easylax.png",
    "deal-6": "/images/products/super_omnigel.png",
    "deal-7": "/images/products/super_hotwaterbag.png",
}
for did, img in super_map.items():
    content = re.sub(
        rf'(\{{\s*id:\s*"{did}".*?category:\s*"[^"]*")',
        rf'\1, image: "{img}"',
        content,
        flags=re.S
    )

# 3. Trending Now
for i in range(1, 8):
    tid = f"trend-{i}"
    img = f"/images/products/trend_{i}.png"
    content = re.sub(
        rf'(\{{\s*id:\s*"{tid}".*?name:\s*"[^"]*")',
        rf'\1, image: "{img}"',
        content,
        flags=re.S
    )

# 4. Skin Care Products (skin-1 to skin-6)
for i in range(1, 7):
    sid = f"skin-{i}"
    img = f"/images/products/skin_{i}.png"
    content = re.sub(
        rf'(\{{\s*id:\s*"{sid}".*?name:\s*"[^"]*")',
        rf'\1, image: "{img}"',
        content,
        flags=re.S
    )

# 5. Popular Combo Deals (combo-1 to combo-7)
for i in range(1, 8):
    cid = f"combo-{i}"
    img = f"/images/products/combo_{i}.png"
    content = re.sub(
        rf'(\{{\s*id:\s*"{cid}".*?name:\s*"[^"]*")',
        rf'\1, image: "{img}"',
        content,
        flags=re.S
    )

# 6. Top Deals Pain & Cough (pain-1 to pain-7)
for i in range(1, 8):
    pid = f"pain-{i}"
    img = f"/images/products/pain_{i}.png"
    content = re.sub(
        rf'(\{{\s*id:\s*"{pid}".*?name:\s*"[^"]*")',
        rf'\1, image: "{img}"',
        content,
        flags=re.S
    )

# 7. Collagen Supplement (col-1 to col-7)
for i in range(1, 8):
    cid = f"col-{i}"
    img = f"/images/products/collagen_{i}.png"
    content = re.sub(
        rf'(\{{\s*id:\s*"{cid}".*?name:\s*"[^"]*")',
        rf'\1, image: "{img}"',
        content,
        flags=re.S
    )

# 8. Flash Sale Deals (flash-1 to flash-7)
for i in range(1, 8):
    fid = f"flash-{i}"
    img = f"/images/products/flash_{i}.png"
    content = re.sub(
        rf'(\{{\s*id:\s*"{fid}".*?name:\s*"[^"]*")',
        rf'\1, image: "{img}"',
        content,
        flags=re.S
    )

# 9. Explore Something New (exp-1 to exp-7)
for i in range(1, 8):
    eid = f"exp-{i}"
    img = f"/images/products/explore_{i}.png"
    content = re.sub(
        rf'(\{{\s*id:\s*"{eid}".*?name:\s*"[^"]*")',
        rf'\1, image: "{img}"',
        content,
        flags=re.S
    )

# 10. In the Spotlight (spot-1 to spot-8)
for i in range(1, 9):
    sid = f"spot-{i}"
    img = f"/images/products/spotlight_{min(i, 7)}.png"
    content = re.sub(
        rf'(\{{\s*id:\s*"{sid}".*?name:\s*"[^"]*")',
        rf'\1, image: "{img}"',
        content,
        flags=re.S
    )

# 11. Deals of the Day (dod-1 to dod-7)
for i in range(1, 8):
    did = f"dod-{i}"
    img = f"/images/products/deal_{i}.png"
    content = re.sub(
        rf'(\{{\s*id:\s*"{did}".*?name:\s*"[^"]*")',
        rf'\1, image: "{img}"',
        content,
        flags=re.S
    )

# 12. Skincare Picks (sp-1 to sp-7 / pick-1 to pick-7)
for i in range(1, 8):
    pid = f"pick-{i}"
    img = f"/images/products/pick_{i}.png"
    content = re.sub(
        rf'(\{{\s*id:\s*"{pid}".*?name:\s*"[^"]*")',
        rf'\1, image: "{img}"',
        content,
        flags=re.S
    )

# 13. Pain Relief Essentials (pre-1 to pre-7)
for i in range(1, 8):
    pid = f"pre-{i}"
    img = f"/images/products/pre_{i}.png"
    content = re.sub(
        rf'(\{{\s*id:\s*"{pid}".*?name:\s*"[^"]*")',
        rf'\1, image: "{img}"',
        content,
        flags=re.S
    )

# 14. Healthy Hair Starts Here (hair-s1 to hair-s7)
for i in range(1, 8):
    hid = f"hair-s{i}"
    img = f"/images/products/hair_{i}.png"
    content = re.sub(
        rf'(\{{\s*id:\s*"{hid}".*?name:\s*"[^"]*")',
        rf'\1, image: "{img}"',
        content,
        flags=re.S
    )

# 15. Tuco Kids (tuco-1 to tuco-7)
for i in range(1, 8):
    tid = f"tuco-{i}"
    img = f"/images/products/tuco_{i}.png"
    content = re.sub(
        rf'(\{{\s*id:\s*"{tid}".*?name:\s*"[^"]*")',
        rf'\1, image: "{img}"',
        content,
        flags=re.S
    )

# 16. Homeopathy Women's Health (hom-1 to hom-7)
for i in range(1, 8):
    hid = f"hom-{i}"
    img = f"/images/products/hom_{i}.png"
    content = re.sub(
        rf'(\{{\s*id:\s*"{hid}".*?name:\s*"[^"]*")',
        rf'\1, image: "{img}"',
        content,
        flags=re.S
    )

# 17. Ayurveda Top Brands (ayur-b1 to ayur-b8)
ayur_brand_map = {
    "ayur-b1": "/images/brands/dabur.png",
    "ayur-b2": "/images/brands/ayur_baidyanath.png",
    "ayur-b3": "/images/brands/ayur_dhootapapeshwar.png",
    "ayur-b4": "/images/brands/tata1mg.png",
    "ayur-b5": "/images/brands/ayur_patanjali.png",
    "ayur-b6": "/images/brands/ayur_jiva.png",
    "ayur-b7": "/images/brands/ayur_kottakkal.png",
    "ayur-b8": "/images/brands/ayur_srisri.png",
}
for abid, img in ayur_brand_map.items():
    content = re.sub(
        rf'(\{{\s*id:\s*"{abid}".*?color:\s*"[^"]*")',
        rf'\1, image: "{img}"',
        content,
        flags=re.S
    )

# 18. Ayurveda Knowledge Cards (ayur-k1 to ayur-k6)
ayur_k_map = {
    "ayur-k1": "/images/ayurveda/celery.png",
    "ayur-k2": "/images/ayurveda/plum.png",
    "ayur-k3": "/images/ayurveda/lemon.png",
    "ayur-k4": "/images/ayurveda/mahasudarshan.png",
    "ayur-k5": "/images/ayurveda/kachnar.png",
    "ayur-k6": "/images/ayurveda/greentea.png",
}
for akid, img in ayur_k_map.items():
    content = re.sub(
        rf'(\{{\s*id:\s*"{akid}".*?name:\s*"[^"]*")',
        rf'\1, image: "{img}"',
        content,
        flags=re.S
    )

with open(path, "w", encoding="utf-8") as f:
    f.write(content)

print("[OK] Finished setting clean, accurate image paths across all product & brand items!")
