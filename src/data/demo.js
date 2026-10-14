// Centralised demonstration data. Everything here is illustrative sample content.
export const company = {
  name: "MEDITRUST LIFE SCIENCE PVT LTD",
  phone: "+91 7276048377",
  email: "office@meditrusts.life",
  address: "Morya Colony, Matoshree Nagar, Sector No. 32, Chinchwad, Pimpri-Chinchwad, Maharashtra 411033, India",
  directors: ["Ajay Kumar Pathri", "Omkar Sanjay Telangi"],
};

export const slugify = (t) => String(t || "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

export const categories = [
  ["Prescription Medicines", "rx", "Prescription-only demonstration listings."],
  ["OTC Medicines", "bottle", "Everyday over-the-counter essentials."],
  ["Vitamins & Supplements", "sun", "Everyday nutrition support."],
  ["Diabetes Care", "drop", "Monitoring and daily care essentials."],
  ["Women's Health", "flower", "Thoughtful everyday wellness."],
  ["Baby Care", "heart", "Gentle essentials for little ones."],
  ["Personal Care", "sparkle", "Care for skin, hair and more."],
  ["Medical Devices", "monitor", "At-home monitoring devices."],
  ["Nutrition & Wellness", "leaf", "Wellness for everyday routines."],
  ["First Aid", "plus", "Useful first-response supplies."],
].map(([name, icon, description], i) => ({ id: slugify(name), slug: slugify(name), name, icon, description, image: "", visible: true, order: i + 1 }));

const seed = [
  ["Daily Multivitamin Tablets", "Vitamins & Supplements", "WellSpring", "30 tablets", 249],
  ["Vitamin C Chewable Tablets", "Vitamins & Supplements", "NutriDay", "20 tablets", 179],
  ["Vitamin D3 Softgel Capsules", "Vitamins & Supplements", "VitaLeaf", "15 capsules", 199],
  ["Omega 3 Fish Oil Capsules", "Vitamins & Supplements", "WellSpring", "30 capsules", 399],
  ["Electrolyte Drink Powder", "OTC Medicines", "HydraCare", "5 sachets", 99],
  ["Digital Thermometer", "Medical Devices", "CareSense", "1 unit", 199],
  ["Automatic Blood Pressure Monitor", "Medical Devices", "CareSense", "1 unit", 1499],
  ["Finger Pulse Oximeter", "Medical Devices", "CareSense", "1 unit", 899],
  ["Reusable Hot Water Bag", "First Aid", "ComfortPlus", "1 unit", 299],
  ["Sterile Gauze Dressing Pads", "First Aid", "MediBasics", "10 pads", 119],
  ["Adhesive Bandage Strips", "First Aid", "MediBasics", "20 strips", 89],
  ["Antiseptic Solution", "First Aid", "CleanCare", "100 ml", 110],
  ["Gentle Moisturising Lotion", "Personal Care", "DermaDaily", "200 ml", 285],
  ["Daily Sunscreen SPF 30", "Personal Care", "SunKind", "50 g", 349],
  ["Mild Cleansing Face Wash", "Personal Care", "PureSkin", "100 ml", 225],
  ["Nourishing Shampoo", "Personal Care", "RootKind", "180 ml", 240],
  ["Baby Gentle Wash", "Baby Care", "LittleLeaf", "200 ml", 259],
  ["Baby Moisturising Cream", "Baby Care", "LittleLeaf", "100 g", 199],
  ["Cotton Baby Diapers", "Baby Care", "SoftNest", "Pack of 20", 499],
  ["Menstrual Heat Patch", "Women's Health", "ComfortPlus", "2 patches", 149],
  ["Intimate Hygiene Wash", "Women's Health", "PureSkin", "100 ml", 199],
  ["Digital Weighing Scale", "Medical Devices", "CareSense", "1 unit", 799],
  ["Glucometer Starter Kit", "Diabetes Care", "CareSense", "1 kit", 999],
  ["Glucose Test Strips", "Diabetes Care", "CareSense", "25 strips", 449],
  ["Sugar-Free Sweetener", "Diabetes Care", "EveryDay", "100 pellets", 129],
  ["Protein Nutrition Powder", "Nutrition & Wellness", "NutriDay", "500 g", 699],
  ["Herbal Green Tea", "Nutrition & Wellness", "Leaf & Cup", "25 bags", 225],
  ["Saline Nasal Spray", "OTC Medicines", "BreatheWell", "20 ml", 125],
  ["Soothing Throat Lozenges", "OTC Medicines", "BreatheWell", "10 lozenges", 65],
  ["Prescription Medicine Sample A", "Prescription Medicines", "Demo Pharma", "10 tablets", 120],
  ["Prescription Medicine Sample B", "Prescription Medicines", "Demo Pharma", "15 capsules", 185],
  ["Prescription Medicine Sample C", "Prescription Medicines", "Demo Pharma", "10 tablets", 240],
];

export const products = seed.map(([name, category, brand, pack, price], i) => ({
  id: `MT-${101 + i}`, name, category, brand, pack, price,
  mrp: Math.round(price * (i % 3 === 0 ? 1.25 : i % 3 === 1 ? 1.12 : 1)),
  image: "",
  packs: [pack, i % 2 ? "Pack of 2" : "Pack of 3"],
  prescription: category === "Prescription Medicines",
  featured: i % 4 === 0 || i < 4,
  visible: true,
  stock: 8 + ((i * 7) % 46),
  popularity: 100 - ((i * 13) % 90),
  description: "A demonstration product listing. Product information is illustrative only and is not medical advice. Always read the label and consult a qualified professional.",
}));

export const labTests = [
  ["cbc", "Complete Blood Count", "Wellness", 399, "Blood", "No special preparation is listed for this demo."],
  ["thyroid-profile", "Thyroid Profile", "Hormones", 599, "Blood", "Preparation varies; confirm with a real provider."],
  ["diabetes-screening", "Diabetes Screening", "Metabolic", 499, "Blood", "Fasting may be required by some providers."],
  ["vitamin-profile", "Vitamin Profile", "Nutrition", 1099, "Blood", "Preparation varies; confirm with a real provider."],
  ["wellness-checkup", "General Wellness Checkup", "Packages", 1499, "Blood & urine", "Preparation varies; confirm with a real provider."],
  ["lipid-profile", "Lipid Profile", "Heart", 549, "Blood", "Fasting may be required by some providers."],
  ["liver-panel", "Liver Function Panel", "Wellness", 699, "Blood", "Preparation varies; confirm with a real provider."],
  ["kidney-panel", "Kidney Function Panel", "Wellness", 649, "Blood", "Preparation varies; confirm with a real provider."],
].map(([id, name, category, price, sample, prep]) => ({ id, name, category, price, mrp: Math.round(price * 1.4), sample, prep, visible: true, description: `${name} — a demonstration diagnostic listing. No laboratory is connected and no sample will be collected.` }));

export const specialties = ["General Physician", "Dermatology", "Pediatrics", "Gynecology", "Orthopedics", "Mental Wellness"];
export const doctors = specialties.flatMap((specialty, i) => [0, 1].map((j) => ({
  id: `doc-${i * 2 + j + 1}`,
  name: `Demo Doctor ${String(i * 2 + j + 1).padStart(2, "0")}`,
  specialty, image: "",
  experience: "Demo profile",
  languages: j ? "English, Marathi" : "English, Hindi",
  fee: 299 + i * 50 + j * 100,
  slots: ["10:00 AM", "11:30 AM", "2:00 PM", "4:30 PM", "6:00 PM"].filter((_, k) => (k + j) % 4 !== 0),
  visible: true,
  description: "Example profile for demonstration only. This is not a verified healthcare professional and no consultation is available.",
})));

const articleSeed = [
  ["Building a balanced everyday wellness routine", "Everyday Health", 5, "photo-1505751172876-fa1923c5c528"],
  ["Understanding the basics of preventive health checks", "Prevention", 6, "photo-1579684385127-1ef15d508118"],
  ["A practical guide to reading product labels", "Wellness", 4, "photo-1587854692152-cbe660dbde88"],
  ["Simple habits that support good sleep hygiene", "Lifestyle", 5, "photo-1541781774459-bb2af2f05b55"],
  ["Everyday hydration: small habits that help", "Lifestyle", 3, "photo-1548839140-29a749e1cf4d"],
  ["Getting ready for a routine health appointment", "Prevention", 4, "photo-1576091160550-2173dba999ef"],
  ["Creating a calm personal-care routine", "Personal Care", 4, "photo-1556228578-8c89e6adf883"],
  ["Preparing questions for a healthcare professional", "Everyday Health", 5, "photo-1519494026892-80bbd2d6fd0d"],
  ["Keeping a useful home first-aid kit", "Wellness", 3, "photo-1603398938378-e54eab446dde"],
  ["How to organise your family's health documents", "Everyday Health", 4, "photo-1450101499163-c8848c66ca85"],
];
export const articles = articleSeed.map(([title, category, readingTime, image], i) => ({
  id: slugify(title), slug: slugify(title), title, category, readingTime,
  author: "MEDITRUST Editorial Team (demo)",
  date: `2026-0${(i % 9) + 1}-1${i % 9}`,
  featured: i < 3, published: true,
  image: `https://images.unsplash.com/${image}?auto=format&fit=crop&w=900&q=70`,
  excerpt: "General educational information to help you have more informed conversations about your health.",
  body: `${title} is a broad topic, and every person's situation is different.\n\nSmall, consistent habits are often easier to keep than big changes. Keep notes about what you observe, and bring them to a qualified healthcare professional when you have questions.\n\nThis article is general educational information only. It is not medical advice, diagnosis or treatment, and it should not replace a conversation with a qualified professional.`,
}));

export const offers = [
  ["WELCOME10", "A little welcome", "percent", 10, 499],
  ["CARE50", "Everyday care", "fixed", 50, 799],
  ["WELLNESS15", "Wellness essentials", "percent", 15, 999],
  ["MINT5", "A fresh start", "percent", 5, 299],
  ["DEMO100", "Demo savings", "fixed", 100, 1499],
].map(([code, label, type, value, minimum]) => ({ id: code, code, label, type, value, minimum, validFrom: "2026-01-01", validTo: "2026-12-31", active: true, description: `${type === "percent" ? value + "%" : "₹" + value} off demonstration carts over ₹${minimum}.` }));

export const faqs = [
  ["Is MEDITRUST accepting real medicine orders?", "No. This website is a frontend demonstration. It does not dispense or deliver medicines."],
  ["Are the lab tests bookable?", "No. Lab listings and booking steps are examples only. No laboratory is connected."],
  ["Can I speak with a doctor here?", "No. Doctor profiles and slots are clearly labelled demonstrations. No consultation takes place."],
  ["Are payments processed?", "No. Checkout is simulated and no payment is ever collected."],
  ["Is my account secure?", "Sign-in is a local prototype only and is not secure. Never use a real password."],
  ["Are prescriptions verified?", "No. Uploads are previewed in your browser only, never sent or stored, and never reviewed by a pharmacist."],
].map(([question, answer], i) => ({ id: `faq-${i + 1}`, question, answer, visible: true }));

export const banners = [
  { id: "b1", title: "Everyday Healthcare Essentials", text: "Stock up on first-aid and daily care basics.", href: "/healthcare/first-aid", coupon: "CARE50", validTo: "2026-12-31", tone: "mint", visible: true },
  { id: "b2", title: "Wellness and Nutrition", text: "Small rituals, a little more care.", href: "/healthcare/nutrition-wellness", coupon: "WELLNESS15", validTo: "2026-12-31", tone: "teal", visible: true },
  { id: "b3", title: "Convenient Diagnostic Services", text: "Explore sample lab test listings.", href: "/lab-tests", coupon: "", validTo: "2026-12-31", tone: "navy", visible: true },
];

const items = (ids) => ids.map(([id, q]) => { const p = products.find((x) => x.id === id); return { id, name: p.name, price: p.price, quantity: q }; });
export const orders = [
  { id: "ORD-24001", date: "2026-09-02", customer: "Demo Customer A", status: "Delivered", items: items([["MT-101", 2], ["MT-106", 1]]), address: "Demo address, Pune", total: 697 },
  { id: "ORD-24002", date: "2026-09-18", customer: "Demo Customer B", status: "Shipped", items: items([["MT-107", 1]]), address: "Demo address, Mumbai", total: 1499 },
  { id: "ORD-24003", date: "2026-10-05", customer: "Demo Customer C", status: "Processing", items: items([["MT-113", 1], ["MT-114", 1]]), address: "Demo address, Nashik", total: 634 },
];
export const bookings = [
  { id: "LAB-5001", date: "2026-10-20", time: "8:00 AM", patient: "Demo Patient A", tests: ["Complete Blood Count"], total: 399, status: "Scheduled" },
  { id: "LAB-5002", date: "2026-10-09", time: "9:30 AM", patient: "Demo Patient B", tests: ["Thyroid Profile", "Lipid Profile"], total: 1148, status: "Completed" },
];
export const appointments = [
  { id: "APT-7001", date: "2026-10-21", time: "11:30 AM", patient: "Demo Patient C", doctor: "Demo Doctor 01", specialty: "General Physician", type: "Video", status: "Scheduled" },
  { id: "APT-7002", date: "2026-10-03", time: "4:30 PM", patient: "Demo Patient D", doctor: "Demo Doctor 05", specialty: "Pediatrics", type: "Phone", status: "Completed" },
];
export const customers = ["Aarav", "Diya", "Kabir", "Meera", "Rohan", "Sana", "Vikram", "Isha"].map((n, i) => ({ id: `CUS-${300 + i}`, name: `${n} (demo)`, email: `${n.toLowerCase()}@example.com`, city: ["Pune", "Mumbai", "Nashik", "Nagpur"][i % 4], orders: (i * 3) % 7, status: i % 3 === 2 ? "Inactive" : "Active" }));

export const navigation = [
  ["Medicines", "/medicines"], ["Healthcare Products", "/healthcare"], ["Lab Tests", "/lab-tests"], ["Doctor Consultation", "/consult-doctor"], ["Health Articles", "/health-articles"], ["Offers", "/offers"], ["About Us", "/about"],
].map(([label, href], i) => ({ id: `nav-${i}`, label, href, visible: true }));

export const shortcuts = [
  ["Order Medicines", "Browse a sample pharmacy catalogue", "bottle", "/medicines"],
  ["Healthcare Products", "Everyday wellness essentials", "leaf", "/healthcare"],
  ["Book Lab Tests", "Explore sample diagnostic listings", "lab", "/lab-tests"],
  ["Consult a Doctor", "See example specialties", "steth", "/consult-doctor"],
  ["Personal Care", "Care for your everyday routine", "sparkle", "/healthcare/personal-care"],
  ["Health Records", "Your private demo profile", "book", "/profile"],
].map(([title, text, icon, href], i) => ({ id: `sc-${i}`, title, text, icon, href, visible: true }));

export const trust = [
  ["Authenticity-focused sourcing", "A catalogue experience built around clear product information.", "shield"],
  ["Convenient ordering", "Browse, compare and explore a simple shopping flow.", "package"],
  ["Customer assistance", "Reach our team by phone or email with questions.", "phone"],
  ["Transparent pricing", "MRP and selling price shown side by side.", "tag"],
].map(([title, text, icon], i) => ({ id: `tr-${i}`, title, text, icon }));

const policy = (name) => `This ${name} is a placeholder for the MEDITRUST demonstration website and must be reviewed by qualified legal counsel before any launch.\n\nThis website is a frontend prototype. No medicines are dispensed, no payments are processed, and no prescriptions, medical records or personal data are transmitted to any server. Data you enter stays in your own browser.`;
export const pages = [
  { id: "about", title: "About MEDITRUST", body: "MEDITRUST LIFE SCIENCE PVT LTD is building an integrated digital healthcare platform focused on accessible, authentic and affordable healthcare — connecting people with medicines, wellness products, diagnostic services, virtual consultations and digital health records through a convenient, transparent experience.\n\nThis website is a demonstration of that vision. Listings, prices, doctors and services shown here are sample content." },
  { id: "privacy-policy", title: "Privacy Policy", body: policy("privacy policy") },
  { id: "terms", title: "Terms and Conditions", body: policy("terms and conditions page") },
  { id: "shipping-policy", title: "Shipping Policy", body: policy("shipping policy") },
  { id: "returns-policy", title: "Returns and Refunds", body: policy("returns and refunds policy") },
  { id: "careers", title: "Careers", body: "We're not hiring through this demonstration website. For enquiries, write to office@meditrusts.life." },
  { id: "healthcare-disclaimer", title: "Healthcare Disclaimer", body: "All content on this website is general information for demonstration purposes only. It is not medical advice, diagnosis or treatment. Doctor profiles, lab tests, products and prices are samples. Always consult a qualified healthcare professional about your health." },
];

export const defaultSettings = {
  announcement: "Your Health, Our Priority — Explore Convenient Healthcare Services",
  announcementVisible: true,
  heroTitle: "Healthcare Made Simple, Safe & Accessible",
  heroSubtitle: "Medicines, diagnostics, wellness essentials and healthcare services — designed around your needs.",
  heroImage: "",
  heroPrimaryText: "Explore Medicines", heroPrimaryHref: "/medicines",
  heroSecondaryText: "Book Lab Tests", heroSecondaryHref: "/lab-tests",
  companyName: company.name, logoText: "MEDITRUST",
  phone: company.phone, email: company.email, address: company.address,
  footerText: "Thoughtful access to everyday healthcare essentials and services.",
  disclaimer: "Prototype only. No medicines, tests, appointments or payments are fulfilled. Content is not a substitute for professional medical advice.",
  primaryColor: "#087F8C",
  location: "Pimpri-Chinchwad 411033",
  social: { instagram: "https://instagram.com", linkedin: "https://linkedin.com", x: "https://x.com" },
  sections: { shortcuts: true, categories: true, featured: true, promos: true, labs: true, doctors: true, trust: true, articles: true, newsletter: true },
};
