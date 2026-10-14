import os
from PIL import Image

BASE_DIR = r"D:\Software Setup\SOsync_Company_work\Projects\DEMO_IMG\images"
HOME_DIR = os.path.join(BASE_DIR, "homepage")
NAV_DIR = os.path.join(BASE_DIR, "navbar_and_some_pages")
OUT_DIR = "public/images"

os.makedirs(f"{OUT_DIR}/banners", exist_ok=True)
os.makedirs(f"{OUT_DIR}/concerns", exist_ok=True)
os.makedirs(f"{OUT_DIR}/brands", exist_ok=True)
os.makedirs(f"{OUT_DIR}/categories", exist_ok=True)
os.makedirs(f"{OUT_DIR}/products", exist_ok=True)
os.makedirs(f"{OUT_DIR}/ayurveda", exist_ok=True)

print("Starting image extraction pipeline...")

# 1. Banners
img_201806 = Image.open(os.path.join(HOME_DIR, "Screenshot 2026-10-14 201806.png"))
# Hero slide 1
hero1 = img_201806.crop((0, 180, 1900, 440))
hero1.save(f"{OUT_DIR}/banners/hero-slide-1.png")

# Care plan smiling man & banner
care_man = img_201806.crop((85, 638, 260, 780))
care_man.save(f"{OUT_DIR}/banners/care-plan-man.png")

care_banner = img_201806.crop((90, 640, 1810, 780))
care_banner.save(f"{OUT_DIR}/banners/care-plan-banner.png")

# Additional hero slides from navbar folder
if os.path.exists(os.path.join(NAV_DIR, "Screenshot 2026-10-14 200756.png")):
    img_200756 = Image.open(os.path.join(NAV_DIR, "Screenshot 2026-10-14 200756.png"))
    hero2 = img_200756.crop((0, 175, 1900, 425))
    hero2.save(f"{OUT_DIR}/banners/hero-slide-2.png")

if os.path.exists(os.path.join(NAV_DIR, "Screenshot 2026-10-14 200854.png")):
    img_200854 = Image.open(os.path.join(NAV_DIR, "Screenshot 2026-10-14 200854.png"))
    hero3 = img_200854.crop((0, 175, 1900, 425))
    hero3.save(f"{OUT_DIR}/banners/hero-slide-3.png")

print("[OK]")

# 2. 8 Health Concerns from Screenshot 2026-10-14 201943.png
img_201943 = Image.open(os.path.join(HOME_DIR, "Screenshot 2026-10-14 201943.png"))
concerns_keys = [
    ("diabetes", 106, 256),
    ("heart", 313, 463),
    ("stomach", 520, 670),
    ("liver", 727, 877),
    ("bone", 934, 1084),
    ("kidney", 1141, 1291),
    ("derma", 1348, 1498),
    ("respiratory", 1555, 1705),
]
for name, x1, x2 in concerns_keys:
    crop = img_201943.crop((x1, 105, x2, 255))
    crop.save(f"{OUT_DIR}/concerns/{name}.png")

print("[OK] Extracted 8 health concerns")

# 3. 8 Featured Brands from Screenshot 2026-10-14 201943.png
brands_keys = [
    ("pentasure", 106, 256),
    ("dabur", 313, 463),
    ("pilgrim", 520, 670),
    ("prohance", 727, 877),
    ("miduty", 934, 1084),
    ("vaseline", 1141, 1291),
    ("minimalist", 1348, 1498),
    ("tata1mg", 1555, 1705),
]
for name, x1, x2 in brands_keys:
    crop = img_201943.crop((x1, 745, x2, 895))
    crop.save(f"{OUT_DIR}/brands/{name}.png")

print("[OK] Extracted 8 featured brands")

# 4. 8 Personal Care Categories from Screenshot 2026-10-14 201952.png
img_201952 = Image.open(os.path.join(HOME_DIR, "Screenshot 2026-10-14 201952.png"))
personal_keys = [
    ("skincare", 106, 256),
    ("haircare", 313, 463),
    ("sexualwellness", 520, 670),
    ("oralcare", 727, 877),
    ("elderlycare", 934, 1084),
    ("babycare", 1141, 1291),
    ("womencare", 1348, 1498),
    ("mengrooming", 1555, 1705),
]
for name, x1, x2 in personal_keys:
    crop = img_201952.crop((x1, 110, x2, 260))
    crop.save(f"{OUT_DIR}/categories/{name}.png")

print("[OK] Extracted 8 personal care categories")

# 5. 9 Popular Categories from Screenshot 2026-10-14 201959.png
img_201959 = Image.open(os.path.join(HOME_DIR, "Screenshot 2026-10-14 201959.png"))
# Each category card is ~150px wide with ~30-40px spacing
pop_x_starts = [106, 290, 474, 658, 842, 1026, 1210, 1394, 1578]
pop_names = [
    "bestoffers", "vitamins", "nutritionaldrinks", "skincare_cat",
    "haircare_cat", "sexualwellness_cat", "ayurveda_cat", "painrelief_cat", "homeopathy_cat"
]
for name, x1 in zip(pop_names, pop_x_starts):
    crop = img_201959.crop((x1, 592, x1 + 150, 742))
    crop.save(f"{OUT_DIR}/categories/{name}.png")

print("[OK] Extracted 9 popular categories")

# 6. Super Saving Deals from Screenshot 2026-10-14 201959.png
# Cards are at top of 201959: y1: 85, y2: 260
super_x_starts = [106, 335, 565, 795, 1025, 1255, 1485]
super_names = [
    "unienzyme", "clocip", "cofsils", "eloway", "easylax", "omnigel", "hotwaterbag"
]
for name, x1 in zip(super_names, super_x_starts):
    crop = img_201959.crop((x1 + 35, 90, x1 + 195, 255))
    crop.save(f"{OUT_DIR}/products/super_{name}.png")

print("[OK] Extracted super saving deals product packs")

# 7. Trending Now from Screenshot 2026-10-14 202005.png
img_202005 = Image.open(os.path.join(HOME_DIR, "Screenshot 2026-10-14 202005.png"))
trend_x_starts = [106, 335, 565, 795, 1025, 1255, 1485]
trend_names = ["trend_1", "trend_2", "trend_3", "trend_4", "trend_5", "trend_6", "trend_7"]
for name, x1 in zip(trend_names, trend_x_starts):
    crop = img_202005.crop((x1 + 35, 90, x1 + 195, 255))
    crop.save(f"{OUT_DIR}/products/{name}.png")

# Also Explore Skincare from bottom of 202005 (y: 690-850)
skin_names = ["skin_1", "skin_2", "skin_3", "skin_4", "skin_5", "skin_6"]
for name, x1 in zip(skin_names, trend_x_starts[:6]):
    crop = img_202005.crop((x1 + 35, 690, x1 + 195, 850))
    crop.save(f"{OUT_DIR}/products/{name}.png")

print("[OK] Extracted trending and skincare products")

# 8. Combo deals & Pain relief from Screenshot 2026-10-14 202029.png
img_202029 = Image.open(os.path.join(HOME_DIR, "Screenshot 2026-10-14 202029.png"))
for i, x1 in enumerate(trend_x_starts):
    crop_combo = img_202029.crop((x1 + 35, 90, x1 + 195, 255))
    crop_combo.save(f"{OUT_DIR}/products/combo_{i+1}.png")
    crop_pain = img_202029.crop((x1 + 35, 690, x1 + 195, 850))
    crop_pain.save(f"{OUT_DIR}/products/pain_{i+1}.png")

print("[OK] Extracted combo and pain relief deals")

# 9. Collagen & Flash sale from Screenshot 2026-10-14 202042.png
img_202042 = Image.open(os.path.join(HOME_DIR, "Screenshot 2026-10-14 202042.png"))
for i, x1 in enumerate(trend_x_starts):
    crop_col = img_202042.crop((x1 + 35, 90, x1 + 195, 255))
    crop_col.save(f"{OUT_DIR}/products/collagen_{i+1}.png")
    crop_flash = img_202042.crop((x1 + 35, 690, x1 + 195, 850))
    crop_flash.save(f"{OUT_DIR}/products/flash_{i+1}.png")

print("[OK] Extracted collagen and flash sale deals")

# 10. Explore new & In the spotlight from Screenshot 2026-10-14 202050.png
img_202050 = Image.open(os.path.join(HOME_DIR, "Screenshot 2026-10-14 202050.png"))
for i, x1 in enumerate(trend_x_starts):
    crop_exp = img_202050.crop((x1 + 35, 90, x1 + 195, 255))
    crop_exp.save(f"{OUT_DIR}/products/explore_{i+1}.png")
    crop_spot = img_202050.crop((x1 + 35, 690, x1 + 195, 850))
    crop_spot.save(f"{OUT_DIR}/products/spotlight_{i+1}.png")

print("[OK] Extracted explore and spotlight deals")

# 11. Ayurveda brands & Deals of day from Screenshot 2026-10-14 202057.png
img_202057 = Image.open(os.path.join(HOME_DIR, "Screenshot 2026-10-14 202057.png"))
ayur_brands = ["patanjali", "baidyanath", "zandu", "srisri", "dhootapapeshwar", "kottakkal", "charak", "jiva"]
for name, x1 in zip(ayur_brands, [106, 313, 520, 727, 934, 1141, 1348, 1555]):
    crop_ayur = img_202057.crop((x1, 105, x1 + 150, 255))
    crop_ayur.save(f"{OUT_DIR}/brands/ayur_{name}.png")

for i, x1 in enumerate(trend_x_starts):
    crop_deal = img_202057.crop((x1 + 35, 690, x1 + 195, 850))
    crop_deal.save(f"{OUT_DIR}/products/deal_{i+1}.png")

print("[OK] Extracted ayurveda brands and deals of day")

# 12. Skincare picks & Pain relief from Screenshot 2026-10-14 202103.png
img_202103 = Image.open(os.path.join(HOME_DIR, "Screenshot 2026-10-14 202103.png"))
for i, x1 in enumerate(trend_x_starts):
    crop_pick = img_202103.crop((x1 + 35, 90, x1 + 195, 255))
    crop_pick.save(f"{OUT_DIR}/products/pick_{i+1}.png")
    crop_pre = img_202103.crop((x1 + 35, 690, x1 + 195, 850))
    crop_pre.save(f"{OUT_DIR}/products/pre_{i+1}.png")

# 13. Healthy hair & Tuco kids from Screenshot 2026-10-14 202110.png
img_202110 = Image.open(os.path.join(HOME_DIR, "Screenshot 2026-10-14 202110.png"))
for i, x1 in enumerate(trend_x_starts):
    crop_hair = img_202110.crop((x1 + 35, 90, x1 + 195, 255))
    crop_hair.save(f"{OUT_DIR}/products/hair_{i+1}.png")
    crop_tuco = img_202110.crop((x1 + 35, 690, x1 + 195, 850))
    crop_tuco.save(f"{OUT_DIR}/products/tuco_{i+1}.png")

# 14. Homeopathy & Ayurveda knowledge cards from Screenshot 2026-10-14 202117.png / 202127.png
img_202117 = Image.open(os.path.join(HOME_DIR, "Screenshot 2026-10-14 202117.png"))
for i, x1 in enumerate(trend_x_starts):
    crop_hom = img_202117.crop((x1 + 35, 90, x1 + 195, 255))
    crop_hom.save(f"{OUT_DIR}/products/hom_{i+1}.png")

img_202127 = Image.open(os.path.join(HOME_DIR, "Screenshot 2026-10-14 202127.png"))
ayur_cards = ["celery", "plum", "lemon", "mahasudarshan", "kachnar", "greentea"]
ayur_x_starts = [106, 385, 665, 945, 1225, 1505]
for name, x1 in zip(ayur_cards, ayur_x_starts):
    crop_herb = img_202127.crop((x1 + 15, 140, x1 + 245, 330))
    crop_herb.save(f"{OUT_DIR}/ayurveda/{name}.png")

print("[OK] All homepage screenshots successfully extracted into public/images/!")

