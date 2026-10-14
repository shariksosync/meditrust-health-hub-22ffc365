import os
import shutil
from PIL import Image

def extract_all():
    ayurveda_dir = 'public/images/ayurveda'
    consult_dir = 'public/images/consult_doctor'
    partner_dir = 'public/images/partnerships'
    os.makedirs(ayurveda_dir, exist_ok=True)
    os.makedirs(consult_dir, exist_ok=True)
    os.makedirs(partner_dir, exist_ok=True)

    ayur_base = r'D:\Software Setup\SOsync_Company_work\Projects\DEMO_IMG\images\Ayurveda page'
    cd_base = r'D:\Software Setup\SOsync_Company_work\Projects\DEMO_IMG\images\Consult doctor page'
    p_base = r'D:\Software Setup\SOsync_Company_work\Projects\DEMO_IMG\images\partnerships page'

    # ==========================
    # 1. AYURVEDA PAGE ASSETS
    # ==========================
    s1 = Image.open(os.path.join(ayur_base, 'Screenshot 2026-10-15 000654.png'))
    # Hindi "अर्थ" Banner
    arth_banner = s1.crop((140, 312, 1754, 396))
    arth_banner.save(os.path.join(ayurveda_dir, 'arth_banner.png'))

    # Featured herbs (7 cards): Ashwagandha, Shilajit, Giloy, Amla, Isabgol, Turmeric, Shatavari
    feat_herbs = ['ashwagandha', 'shilajit', 'giloy', 'amla', 'isabgol', 'turmeric', 'shatavari']
    for i, name in enumerate(feat_herbs):
        x1 = 145 + i * 230
        herb_img = s1.crop((x1 + 10, 565, x1 + 205, 715))
        herb_img.save(os.path.join(ayurveda_dir, f'herb_{name}.png'))

    # Screenshot 2: Skin Care & Digestive Care
    s2 = Image.open(os.path.join(ayur_base, 'Screenshot 2026-10-15 000700.png'))
    # Skin care row (7 items: Aloe Vera, Honey, Turmeric, Coconut, Grapes, Tulsi, Papaya)
    skin_herbs = ['aloe_vera', 'honey', 'turmeric_skin', 'coconut', 'grapes', 'tulsi', 'papaya']
    for i, name in enumerate(skin_herbs):
        x1 = 145 + i * 230
        herb_img = s2.crop((x1 + 10, 160, x1 + 205, 310))
        herb_img.save(os.path.join(ayurveda_dir, f'skin_{name}.png'))

    # Digestive care row (7 items: Alsi, Ginger, Dhania, Fennel, Bael, Hing, Pudina)
    digest_herbs = ['alsi', 'ginger', 'dhania', 'fennel', 'bael', 'hing', 'pudina']
    for i, name in enumerate(digest_herbs):
        x1 = 145 + i * 230
        herb_img = s2.crop((x1 + 10, 580, x1 + 205, 730))
        herb_img.save(os.path.join(ayurveda_dir, f'digest_{name}.png'))

    # Screenshot 3: Hair Care
    s3 = Image.open(os.path.join(ayur_base, 'Screenshot 2026-10-15 000705.png'))
    hair_herbs = ['onion', 'bhringraj', 'shikakai', 'mehendi', 'tea_tree', 'brahmi', 'reetha']
    for i, name in enumerate(hair_herbs):
        x1 = 145 + i * 230
        herb_img = s3.crop((x1 + 10, 160, x1 + 205, 310))
        herb_img.save(os.path.join(ayurveda_dir, f'hair_{name}.png'))

    # A-Z Packshot thumbnails from Screenshot 3
    # In s3, below Hair Care, the A-Z directory begins.
    # 3 columns of directory cards:
    # Col 1: ~145, Col 2: ~680, Col 3: ~1215
    for col_idx, col_x in enumerate([150, 685, 1220]):
        az_pack = s3.crop((col_x + 10, 720, col_x + 80, 790))
        az_pack.save(os.path.join(ayurveda_dir, f'az_thumb_{col_idx}.png'))

    print('Ayurveda extraction complete')

    # ==========================
    # 2. CONSULT DOCTOR ASSETS
    # ==========================
    cd1 = Image.open(os.path.join(cd_base, 'Screenshot 2026-10-15 000539.png'))
    # Care Plan doctor banner
    care_doc_banner = cd1.crop((140, 315, 1754, 385))
    care_doc_banner.save(os.path.join(consult_dir, 'care_plan_banner.png'))

    # Hero illustration on right (Female doctor / stethoscope consultation)
    cd_hero_art = cd1.crop((1260, 480, 1750, 755))
    cd_hero_art.save(os.path.join(consult_dir, 'consult_hero_art.png'))

    cd2 = Image.open(os.path.join(cd_base, 'Screenshot 2026-10-15 000544.png'))
    # 4 Trust pillar icons:
    # 1. 100% Confidential (Shield with lock)
    # 2. Certified Doctors (Rosette badge)
    # 3. Convenience (Smartphone with hand)
    # 4. Cost Effective (Wallet with coin)
    # cd2 trust cards coordinates:
    card_w = (1750 - 145) / 4
    pillars = ['confidential', 'certified', 'convenience', 'cost_effective']
    for i, name in enumerate(pillars):
        cx = int(145 + i * card_w)
        icon = cd2.crop((cx + 10, 470, cx + 90, 550))
        icon.save(os.path.join(consult_dir, f'pillar_{name}.png'))

    # Screenshot 4: Doctor Join Banner ("Are you a doctor? Join us")
    cd4 = Image.open(os.path.join(cd_base, 'Screenshot 2026-10-15 000555.png'))
    doc_join_art = cd4.crop((140, 160, 1750, 430))
    doc_join_art.save(os.path.join(consult_dir, 'doctor_join_banner.png'))

    print('Consult Doctor extraction complete')

    # ==========================
    # 3. PARTNERSHIPS ASSETS
    # ==========================
    p1 = Image.open(os.path.join(p_base, 'Screenshot 2026-10-15 000809.png'))
    # Hero Floral artwork on right
    floral_art = p1.crop((1080, 260, 1740, 680))
    floral_art.save(os.path.join(partner_dir, 'partner_floral_hero.png'))

    # Full Hero banner graphic
    p1_hero = p1.crop((140, 200, 1754, 730))
    p1_hero.save(os.path.join(partner_dir, 'partner_hero_full.png'))

    p2 = Image.open(os.path.join(p_base, 'Screenshot 2026-10-15 000818.png'))
    # ePharmacy, eDiagnostics, eConsultations cards
    sol_names = ['epharmacy', 'ediagnostics', 'econsultations']
    col3_w = (1750 - 145) / 3
    for i, name in enumerate(sol_names):
        cx = int(145 + i * col3_w)
        sol_card = p2.crop((cx + 5, 230, cx + int(col3_w) - 15, 620))
        sol_card.save(os.path.join(partner_dir, f'sol_card_{name}.png'))

    # Tailored Solution preview graphics from p3, p4, p5, p6, p7
    p3 = Image.open(os.path.join(p_base, 'Screenshot 2026-10-15 000823.png'))
    sol_hospital = p3.crop((140, 280, 1750, 700))
    sol_hospital.save(os.path.join(partner_dir, 'sol_hospital_service.png'))

    p8 = Image.open(os.path.join(p_base, 'Screenshot 2026-10-15 000851.png'))
    partner_contact_banner = p8.crop((140, 160, 1750, 400))
    partner_contact_banner.save(os.path.join(partner_dir, 'partner_contact_banner.png'))

    # Clean up scratch test crops
    if os.path.exists('public/images/test_crop'):
        shutil.rmtree('public/images/test_crop')
    if os.path.exists('scratch_inspect_pages'):
        shutil.rmtree('scratch_inspect_pages')

    print('All images extracted and saved into public/images/{ayurveda,consult_doctor,partnerships}/')

if __name__ == '__main__':
    extract_all()
