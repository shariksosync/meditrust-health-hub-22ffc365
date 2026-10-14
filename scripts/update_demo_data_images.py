import re

path = "src/data/demo.js"
with open(path, "r", encoding="utf-8") as f:
    content = f.read()

# 1. Update heroSlides with image
content = content.replace(
    'id: 1,\n    bg: "from-amber-50 to-orange-100",',
    'id: 1,\n    image: "/images/banners/hero-slide-1.png",\n    bg: "from-amber-50 to-orange-100",'
)
content = content.replace(
    'id: 2,\n    bg: "from-red-50 to-rose-100",',
    'id: 2,\n    image: "/images/banners/hero-slide-2.png",\n    bg: "from-red-50 to-rose-100",'
)
content = content.replace(
    'id: 3,\n    bg: "from-pink-50 to-amber-100",',
    'id: 3,\n    image: "/images/banners/hero-slide-3.png",\n    bg: "from-pink-50 to-amber-100",'
)

# 2. Update carePlanBanner
content = content.replace(
    'btnHref: "/offers",\n};',
    'btnHref: "/offers",\n  avatar: "/images/banners/care-plan-man.png",\n  bannerImg: "/images/banners/care-plan-banner.png",\n};'
)

# 3. Update healthConcerns
concerns_imgs = {
    "diabetes": "/images/concerns/diabetes.png",
    "heart": "/images/concerns/heart.png",
    "stomach": "/images/concerns/stomach.png",
    "liver": "/images/concerns/liver.png",
    "bone": "/images/concerns/bone.png",
    "kidney": "/images/concerns/kidney.png",
    "derma": "/images/concerns/derma.png",
    "respiratory": "/images/concerns/respiratory.png",
}
for cid, cimg in concerns_imgs.items():
    content = re.sub(
        rf'(\{{ id: "{cid}".*?)(href:)',
        rf'\1image: "{cimg}", \2',
        content
    )

# 4. Update featuredBrands
brands_imgs = {
    "b-1": "/images/brands/pentasure.png",
    "b-2": "/images/brands/dabur.png",
    "b-3": "/images/brands/pilgrim.png",
    "b-4": "/images/brands/prohance.png",
    "b-5": "/images/brands/miduty.png",
    "b-6": "/images/brands/vaseline.png",
    "b-7": "/images/brands/minimalist.png",
    "b-8": "/images/brands/tata1mg.png",
}
for bid, bimg in brands_imgs.items():
    content = re.sub(
        rf'(\{{ id: "{bid}".*?)(category: "[^"]*")',
        rf'\1\2, image: "{bimg}"',
        content
    )

# 5. Update personalCareCategories
personal_imgs = {
    "skin": "/images/categories/skincare.png",
    "hair": "/images/categories/haircare.png",
    "sex": "/images/categories/sexualwellness.png",
    "oral": "/images/categories/oralcare.png",
    "elder": "/images/categories/elderlycare.png",
    "baby": "/images/categories/babycare.png",
    "women": "/images/categories/womencare.png",
    "men": "/images/categories/mengrooming.png",
}
for pid, pimg in personal_imgs.items():
    content = re.sub(
        rf'(\{{ id: "{pid}".*?)(href:)',
        rf'\1image: "{pimg}", \2',
        content
    )

# 6. Update popularCategories
popular_imgs = {
    "best-offers": "/images/categories/bestoffers.png",
    "vitamins-supplements": "/images/categories/vitamins.png",
    "nutritional-drinks": "/images/categories/nutritionaldrinks.png",
    "skin-care": "/images/categories/skincare_cat.png",
    "hair-care": "/images/categories/haircare_cat.png",
    "sexual-wellness": "/images/categories/sexualwellness_cat.png",
    "ayurveda-products": "/images/categories/ayurveda_cat.png",
    "pain-relief": "/images/categories/painrelief_cat.png",
    "homeopathy": "/images/categories/homeopathy_cat.png",
}
for poid, poimg in popular_imgs.items():
    content = re.sub(
        rf'(\{{ id: "{poid}".*?)(href:)',
        rf'\1image: "{poimg}", \2',
        content
    )

# 7. Update superSavingDeals
super_imgs = [
    ("deal-1", "/images/products/super_unienzyme.png"),
    ("deal-2", "/images/products/super_clocip.png"),
    ("deal-3", "/images/products/super_cofsils.png"),
    ("deal-4", "/images/products/super_eloway.png"),
    ("deal-5", "/images/products/super_easylax.png"),
    ("deal-6", "/images/products/super_omnigel.png"),
    ("deal-7", "/images/products/super_hotwaterbag.png"),
]
for did, dimg in super_imgs:
    content = re.sub(
        rf'(\{{ id: "{did}".*?)(category: "[^"]*")',
        rf'\1\2, image: "{dimg}"',
        content,
        flags=re.S
    )

# 8. Update trendingNow
for i in range(1, 8):
    tid = f"trend-{i}"
    timg = f"/images/products/trend_{i}.png"
    content = re.sub(
        rf'(\{{ id: "{tid}".*?)(saleEnds:)',
        rf'\1image: "{timg}", \2',
        content,
        flags=re.S
    )

# 9. Update other product arrays with images
array_patterns = [
    ("exploreSkincare", "skin", 6),
    ("comboDeals", "combo", 7),
    ("painReliefAndCough", "pain", 7),
    ("collagenSupplements", "collagen", 7),
    ("flashSaleEssentials", "flash", 7),
    ("exploreSomethingNew", "explore", 7),
    ("inTheSpotlight", "spotlight", 7),
    ("dealsOfTheDay", "deal", 7),
    ("skincarePicks", "pick", 7),
    ("painReliefEssentials", "pre", 7),
    ("healthyHairStartsHere", "hair", 7),
    ("tucoKidsTopSellers", "tuco", 7),
    ("homeopathyWomensHealth", "hom", 7),
]

for arr_name, prefix, count in array_patterns:
    for idx in range(1, count + 1):
        content = re.sub(
            rf'(\{{ id: "{prefix}-[a-zA-Z0-9]+"[^}}]*?)(price:)',
            rf'\1image: "/images/products/{prefix}_{idx}.png", \2',
            content,
            count=1,
            flags=re.S
        )

# 10. Ayurveda Knowledge Cards
ayur_imgs = {
    "ayur-k1": "/images/ayurveda/celery.png",
    "ayur-k2": "/images/ayurveda/plum.png",
    "ayur-k3": "/images/ayurveda/lemon.png",
    "ayur-k4": "/images/ayurveda/mahasudarshan.png",
    "ayur-k5": "/images/ayurveda/kachnar.png",
    "ayur-k6": "/images/ayurveda/greentea.png",
}
for akid, akimg in ayur_imgs.items():
    content = re.sub(
        rf'(\{{ id: "{akid}".*?)(desc:)',
        rf'\1image: "{akimg}", \2',
        content,
        flags=re.S
    )

with open(path, "w", encoding="utf-8") as f:
    f.write(content)

print("[OK] Successfully updated demo.js with actual image links!")
