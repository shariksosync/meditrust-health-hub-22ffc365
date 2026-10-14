import os
from PIL import Image

def extract_all():
    folder = r"D:\Software Setup\SOsync_Company_work\Projects\DEMO_IMG\images\Lab Tests"
    out = "public/images/lab_tests"
    os.makedirs(out, exist_ok=True)

    im1 = Image.open(os.path.join(folder, "Screenshot 2026-10-14 234636.png"))
    im2 = Image.open(os.path.join(folder, "Screenshot 2026-10-14 234711.png"))
    im3 = Image.open(os.path.join(folder, "Screenshot 2026-10-14 234724.png"))
    im4 = Image.open(os.path.join(folder, "Screenshot 2026-10-14 234731.png"))
    im5 = Image.open(os.path.join(folder, "Screenshot 2026-10-14 234738.png"))
    im6 = Image.open(os.path.join(folder, "Screenshot 2026-10-14 234747.png"))

    # 1. Trust cards
    im1.crop((1090, 105, 1412, 472)).save(f"{out}/trust_nabl.png")
    im1.crop((1435, 105, 1755, 472)).save(f"{out}/wide_coverage.png")
    im1.crop((1090, 498, 1412, 865)).save(f"{out}/home_collection.png")
    im1.crop((1435, 498, 1755, 865)).save(f"{out}/fast_reports.png")

    # 2. Health Needs cards
    needs = [
        ("need_men.png", 142, 400),
        ("need_women.png", 412, 670),
        ("need_liver_kidney.png", 682, 940),
        ("need_thyroid.png", 952, 1210),
        ("need_hormones.png", 1222, 1480),
        ("need_allergy.png", 1492, 1750),
    ]
    for name, x1, x2 in needs:
        im2.crop((x1, 212, x2, 470)).save(f"{out}/{name}")

    # 3. Promo banners
    im3.crop((635, 110, 1280, 440)).save(f"{out}/banner_phlebotomist.png")
    im2.crop((445, 660, 1090, 935)).save(f"{out}/banner_trust_see.png")
    im2.crop((1110, 660, 1760, 935)).save(f"{out}/banner_national_ref_lab.png")

    # 4. Radiology cards
    rads = [
        ("rad_ct_scan.png", 142, 400),
        ("rad_ecg.png", 412, 670),
        ("rad_xray.png", 682, 940),
        ("rad_ultrasound.png", 952, 1210),
        ("rad_mri.png", 1222, 1480),
        ("rad_echo.png", 1492, 1750),
    ]
    for name, x1, x2 in rads:
        im4.crop((x1, 190, x2, 448)).save(f"{out}/{name}")

    # 5. How home collection works steps
    steps = [
        ("step_1_booking.png", 148, 430),
        ("step_2_tracking.png", 475, 755),
        ("step_3_collection.png", 800, 1080),
        ("step_4_lab.png", 1125, 1405),
        ("step_5_report.png", 1450, 1730),
    ]
    for name, x1, x2 in steps:
        im5.crop((x1 + 20, 212, x2 - 20, 425)).save(f"{out}/{name}")

    # 6. App mockup
    im6.crop((1060, 105, 1710, 595)).save(f"{out}/lab_app_mockup.png")

    print("[OK] Successfully extracted all Lab Tests images!")

if __name__ == "__main__":
    extract_all()
