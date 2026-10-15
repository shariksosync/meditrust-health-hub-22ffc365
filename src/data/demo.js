// MEDITRUST LIFE SCIENCE PVT LTD - Demonstration data
export const company = {
  name: "MEDITRUST LIFE SCIENCE PVT LTD",
  logoText: "MEDITRUST",
  phone: "+91 7276048377",
  tollFreeNotice: "+91 7276048377",
  email: "contact@meditrusts.life",
  address: "Morya Colony, Matoshree Nagar, Sector No. 32, Chinchwad, Pimpri-Chinchwad, Maharashtra 411033",
  directors: ["Ajay Kumar Pathri", "Omkar Sanjay Telangi"],
};

export const slugify = (t) =>
  String(t || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

export const popularCities = [
  "Delhi",
  "Gurgaon",
  "Pune",
  "Bangalore",
  "Mumbai",
  "Hyderabad",
  "Kolkata",
];

export const allCities = [
  "Abohar",
  "Adilabad",
  "Adoni",
  "Agartala",
  "Agra",
  "Ahmedabad",
  "Ahmednagar",
  "Aizawl",
  "Ajmer",
  "Akola",
  "Aligarh",
  "Allahabad",
  "Alwar",
  "Ambala",
  "Amravati",
  "Amritsar",
  "Anand",
  "Anantapur",
  "Bareilly",
  "Bhopal",
  "Bhubaneswar",
  "Chandigarh",
  "Chennai",
  "Coimbatore",
  "Dehradun",
  "Faridabad",
  "Ghaziabad",
  "Guwahati",
  "Gwalior",
  "Indore",
  "Jabalpur",
  "Jaipur",
  "Jalandhar",
  "Jammu",
  "Jamshedpur",
  "Jodhpur",
  "Kanpur",
  "Kochi",
  "Kozhikode",
  "Lucknow",
  "Ludhiana",
  "Madurai",
  "Mangalore",
  "Meerut",
  "Moradabad",
  "Mysore",
  "Nagpur",
  "Nashik",
  "Noida",
  "Patna",
  "Puducherry",
  "Raipur",
  "Rajkot",
  "Ranchi",
  "Rohtak",
  "Salem",
  "Shimla",
  "Surat",
  "Thane",
  "Thiruvananthapuram",
  "Tiruchirappalli",
  "Udaipur",
  "Vadodara",
  "Varanasi",
  "Vijayawada",
  "Visakhapatnam",
  "Warangal",
];

export const topTabs = [
  { id: "medicines", label: "MEDICINES", href: "/medicines", active: true },
  { id: "lab-tests", label: "LAB TESTS", href: "/lab-tests" },
  { id: "consult-doctors", label: "CONSULT DOCTORS", href: "/consult-doctor" },
  { id: "cancer-care", label: "CANCER CARE", href: "/cancer-care", target: "_blank" },
  { id: "ayurveda", label: "AYURVEDA", href: "/ayurveda" },
  { id: "partnerships", label: "PARTNERSHIPS", href: "/partnerships", target: "_blank" },
  { id: "corporates", label: "CORPORATES", href: "/about" },
  { id: "care-plan", label: "CARE PLAN", href: "/care-plan", badge: "SAVE MORE" },
];

export const navDropdowns = [
  {
    label: "Health Resource Center",
    items: [
      { name: "All Diseases", href: "/healthcare" },
      { name: "All Medicines", href: "/medicines" },
      { name: "Medicines by Therapeutic Class", href: "/medicines" },
    ],
  },
  {
    label: "Hair Care",
    items: [
      { name: "Hair Oils", href: "/healthcare/hair-care" },
      { name: "Shampoos & Conditioners", href: "/healthcare/hair-care" },
      { name: "Hair Serums", href: "/healthcare/hair-care" },
      { name: "Hair Creams & Masks", href: "/healthcare/hair-care" },
      { name: "Hair Colour", href: "/healthcare/hair-care" },
      { name: "Hair Growth Products", href: "/healthcare/hair-care" },
      { name: "Essential Oils", href: "/healthcare/hair-care" },
    ],
  },
  {
    label: "Fitness & Health",
    items: [
      { name: "Plant Protein", href: "/healthcare/fitness-health" },
      { name: "Mass Gainers", href: "/healthcare/fitness-health" },
      { name: "Pre/Post Workout", href: "/healthcare/fitness-health" },
      { name: "Smart Watches & Rings", href: "/healthcare/fitness-health" },
      { name: "Fat Burners", href: "/healthcare/fitness-health" },
    ],
  },
  {
    label: "Sexual Wellness",
    items: [
      { name: "Lubricants & Massage Gels", href: "/healthcare/sexual-wellness" },
      { name: "Sexual Wellness Devices", href: "/healthcare/sexual-wellness" },
      { name: "Performance Enhancers", href: "/healthcare/sexual-wellness" },
      { name: "Oral Contraceptives", href: "/healthcare/sexual-wellness" },
    ],
  },
  {
    label: "Vitamins & Nutrition",
    items: [
      { name: "Omega & Fish Oil & DHA", href: "/healthcare/vitamins-supplements" },
      { name: "Fish Oil", href: "/healthcare/vitamins-supplements" },
      { name: "Cod Liver Oil", href: "/healthcare/vitamins-supplements" },
      { name: "Flax Seed Oil", href: "/healthcare/vitamins-supplements" },
      { name: "Hair & Skin Supplements", href: "/healthcare/vitamins-supplements" },
      { name: "Calcium", href: "/healthcare/vitamins-supplements" },
      { name: "Vitamin B", href: "/healthcare/vitamins-supplements" },
      { name: "Vitamin D", href: "/healthcare/vitamins-supplements" },
      { name: "Vitamin C", href: "/healthcare/vitamins-supplements" },
    ],
  },
  {
    label: "Supports & Braces",
    items: [
      { name: "Ankle, Foot & Leg Support", href: "/healthcare/supports-braces" },
    ],
  },
  {
    label: "Immunity Boosters",
    items: [
      { name: "Chyawanprash", href: "/healthcare/immunity-boosters" },
      { name: "Antioxidant Supplements", href: "/healthcare/immunity-boosters" },
      { name: "Ayurvedic Supplements", href: "/healthcare/immunity-boosters" },
      { name: "Herbal Tea", href: "/healthcare/immunity-boosters" },
    ],
  },
  {
    label: "Homeopathy",
    items: [
      { name: "Homeopathy Diabetes Medicines", href: "/healthcare/homeopathy" },
      { name: "Sexual Health", href: "/healthcare/homeopathy" },
      { name: "Hair Care Products", href: "/healthcare/homeopathy" },
      { name: "Piles and Fissures", href: "/healthcare/homeopathy" },
      { name: "Fungal Infection", href: "/healthcare/homeopathy" },
      { name: "Obesity", href: "/healthcare/homeopathy" },
      { name: "Warts", href: "/healthcare/homeopathy" },
    ],
  },
  {
    label: "Pet Care",
    items: [
      { name: "Pet Supplements", href: "/healthcare/pet-care" },
      { name: "Pet Food", href: "/healthcare/pet-care" },
    ],
  },
];

export const heroSlides = [
  {
    id: 1,
    image: "/images/banners/hero-slide-1.png",
    bg: "from-amber-50 to-orange-100",
    headline: "Seamless diagnostic services, now at your fingertips",
    features: [
      "Trusted & Accredited labs",
      "Doctor-curated packages",
      "Accurate reports with a 3-step review",
    ],
    brandTag: "TATA 1mg | Labs",
    actionText: "Book now",
    actionHref: "/lab-tests",
    rightNotice: {
      title: "If you experience/suspect",
      desc: "any adverse event after taking a medicine, please report it using the QR code or toll-free number below.",
      phone: "1800 180 3024",
      org: "Issued in Public Interest by National Coordination Centre-Pharmacovigilance Programme of India",
    },
  },
  {
    id: 2,
    image: "/images/banners/hero-slide-2.png",
    bg: "from-red-50 to-rose-100",
    headline: "TRUSTED MOTHER TINCTURES & LIQUID DILUTIONS",
    features: ["Support health in most natural way", "B.Jain Pharmaceuticals Quality Assured", "100% Genuine Pure Extract"],
    brandTag: "B.JAIN",
    actionText: "Shop Dilutions",
    actionHref: "/medicines",
    rightNotice: {
      title: "If you experience/suspect",
      desc: "any adverse event after taking a medicine, please report it using the QR code or toll-free number below.",
      phone: "1800 180 3024",
      org: "Issued in Public Interest by National Coordination Centre-Pharmacovigilance Programme of India",
    },
  },
  {
    id: 3,
    image: "/images/banners/hero-slide-3.png",
    bg: "from-pink-50 to-amber-100",
    headline: "Not sure what your gut is telling you?",
    features: ["Take a quick self-assessment to understand your gut health better", "Expert Doctor Recommended Advice", "Instant Result Analysis"],
    brandTag: "TATA 1mg | Health",
    actionText: "Know more",
    actionHref: "/healthcare",
    rightNotice: {
      title: "If you experience/suspect",
      desc: "any adverse event after taking a medicine, please report it using the QR code or toll-free number below.",
      phone: "1800 180 3024",
      org: "Issued in Public Interest by National Coordination Centre-Pharmacovigilance Programme of India",
    },
  },
];

export const carePlanBanner = {
  tag: "Care Plan",
  subtag: "now starting at ₹165 for 3 months",
  title: "Get extra 5% savings on your orders. Free shipping, same-day delivery and more.",
  action: "Become a member today!",
  btnText: "Know More",
  btnHref: "/offers",
  avatar: "/images/banners/care-plan-man.png",
  bannerImg: "/images/banners/care-plan-banner.png",
};

export const healthConcerns = [
  { id: "diabetes", name: "Diabetes", color: "#fef3c7", icon: "drop", image: "/images/concerns/diabetes.png", image: "/images/concerns/diabetes.png", href: "/healthcare/diabetes-care" },
  { id: "heart", name: "Heart Care", color: "#ede9fe", icon: "heart", image: "/images/concerns/heart.png", image: "/images/concerns/heart.png", href: "/healthcare/heart-care" },
  { id: "stomach", name: "Stomach Care", color: "#d1fae5", icon: "shield", image: "/images/concerns/stomach.png", image: "/images/concerns/stomach.png", href: "/healthcare/stomach-care" },
  { id: "liver", name: "Liver Care", color: "#fee2e2", icon: "plus", image: "/images/concerns/liver.png", image: "/images/concerns/liver.png", href: "/healthcare/liver-care" },
  { id: "bone", name: "Bone, Joint & Muscle Care", color: "#fce7f3", icon: "leaf", image: "/images/concerns/bone.png", image: "/images/concerns/bone.png", href: "/healthcare/bone-joint-muscle" },
  { id: "kidney", name: "Kidney Care", color: "#cffafe", icon: "drop", image: "/images/concerns/kidney.png", image: "/images/concerns/kidney.png", href: "/healthcare/kidney-care" },
  { id: "derma", name: "Derma Care", color: "#fbcfe8", icon: "sun", image: "/images/concerns/derma.png", image: "/images/concerns/derma.png", href: "/healthcare/skin-care" },
  { id: "respiratory", name: "Respiratory Care", color: "#dcfce7", icon: "flower", image: "/images/concerns/respiratory.png", image: "/images/concerns/respiratory.png", href: "/healthcare/respiratory-care" },
];

export const fullBodyCheckups = [
  {
    id: "fbc-1",
    name: "Comprehensive Gold Full Body Checkup",
    provider: "Tata 1mg Labs",
    safe: true,
    price: 2499,
    mrp: 4998,
    discount: "50% off",
    testsCount: "Contains 78 tests",
    href: "/lab-tests/fbc-1",
  },
  {
    id: "fbc-2",
    name: "Good Health Silver Package",
    provider: "Tata 1mg Labs",
    safe: true,
    price: 749,
    mrp: 1498,
    discount: "50% off",
    testsCount: "Contains 59 tests",
    href: "/lab-tests/fbc-2",
  },
  {
    id: "fbc-3",
    name: "Comprehensive Silver Full Body Checkup",
    provider: "Tata 1mg Labs",
    safe: true,
    price: 1999,
    mrp: 3998,
    discount: "50% off",
    testsCount: "Contains 68 tests",
    href: "/lab-tests/fbc-3",
  },
  {
    id: "fbc-4",
    name: "Comprehensive Platinum Full Body Checkup",
    provider: "Tata 1mg Labs",
    safe: true,
    price: 3999,
    mrp: 7998,
    discount: "50% off",
    testsCount: "Contains 90 tests",
    href: "/lab-tests/fbc-4",
  },
  {
    id: "fbc-5",
    name: "Good Health Platinum Package",
    provider: "Tata 1mg Labs",
    safe: true,
    price: 1499,
    mrp: 2998,
    discount: "50% off",
    testsCount: "Contains 65 tests",
    href: "/lab-tests/fbc-5",
  },
];

export const featuredBrands = [
  { id: "b-1", name: "PentaSure", category: "Nutrition", image: "/images/brands/pentasure.png", image: "/images/brands/pentasure.png" },
  { id: "b-2", name: "Dabur", category: "Ayurveda", image: "/images/brands/dabur.png", image: "/images/brands/dabur.png" },
  { id: "b-3", name: "pilgrim", category: "Skin & Hair", image: "/images/brands/pilgrim.png", image: "/images/brands/pilgrim.png" },
  { id: "b-4", name: "Prohance", category: "Protein & Health", image: "/images/brands/prohance.png", image: "/images/brands/prohance.png" },
  { id: "b-5", name: "Miduty", category: "Supplements", image: "/images/brands/miduty.png", image: "/images/brands/miduty.png" },
  { id: "b-6", name: "Vaseline", category: "Skin Care", image: "/images/brands/vaseline.png", image: "/images/brands/vaseline.png" },
  { id: "b-7", name: "Minimalist", category: "Active Skin", image: "/images/brands/minimalist.png", image: "/images/brands/minimalist.png" },
  { id: "b-8", name: "TATA 1mg", category: "Healthcare", image: "/images/brands/tata1mg.png", image: "/images/brands/tata1mg.png" },
];

export const personalCareCategories = [
  { id: "skin", name: "Skin care", color: "#d9e2b8", image: "/images/categories/skincare.png", image: "/images/categories/skincare.png", href: "/healthcare/skin-care" },
  { id: "hair", name: "Hair Care", color: "#86d6af", image: "/images/categories/haircare.png", image: "/images/categories/haircare.png", href: "/healthcare/hair-care" },
  { id: "sex", name: "Sexual Wellness", color: "#f7a56a", image: "/images/categories/sexualwellness.png", image: "/images/categories/sexualwellness.png", href: "/healthcare/sexual-wellness" },
  { id: "oral", name: "Oral Care", color: "#e89ea0", image: "/images/categories/oralcare.png", image: "/images/categories/oralcare.png", href: "/healthcare/oral-care" },
  { id: "elder", name: "Elderly Care", color: "#4ecdc4", image: "/images/categories/elderlycare.png", image: "/images/categories/elderlycare.png", href: "/healthcare/elderly-care" },
  { id: "baby", name: "Baby Care", color: "#9ca5e0", image: "/images/categories/babycare.png", image: "/images/categories/babycare.png", href: "/healthcare/baby-care" },
  { id: "women", name: "Women Care", color: "#f78ebc", image: "/images/categories/womencare.png", image: "/images/categories/womencare.png", href: "/healthcare/women-care" },
  { id: "men", name: "Men Grooming", color: "#8ab4cd", image: "/images/categories/mengrooming.png", image: "/images/categories/mengrooming.png", href: "/healthcare/men-grooming" },
];

export const pathologyTests = [
  { id: "path-1", name: "Lipid Profile", desc: "Contains 8 tests", provider: "Tata 1mg Labs", safe: true, price: 439, mrp: 439, discount: null },
  { id: "path-2", name: "CBC (Complete Blood Count)", desc: "Contains 21 tests", provider: "Tata 1mg Labs", safe: true, price: 349, mrp: 389, discount: "10% off" },
  { id: "path-3", name: "Thyroid Profile Total (T3, T4 & TSH)", desc: "Contains 3 tests", provider: "Tata 1mg Labs", safe: true, price: 539, mrp: 609, discount: "11% off" },
  { id: "path-4", name: "Lipid Profile, Non Fasting", desc: "Contains 8 tests", provider: "Tata 1mg Labs", safe: true, price: 399, mrp: 699, discount: "43% off" },
  { id: "path-5", name: "Coronavirus Covid-19 Test", desc: "Contains 1 test", provider: "Tata 1mg Labs", safe: false, price: 500, mrp: 500, discount: null },
];

export const superSavingDeals = [
  {
    id: "deal-1",
    name: "Unienzyme Digestive Enzymes for Indigestion, Gas",
    pack: "bottle of 200 ml Liquid",
    rating: 4.3,
    reviews: 108,
    delivery: "Get by Tomorrow",
    price: 159,
    mrp: 159,
    discount: null,
    category: "Digestive Health", image: "/images/products/super_unienzyme.png",
  },
  {
    id: "deal-2",
    name: "Clocip Anti-Fungal Dusting Powder | For Skin",
    pack: "bottle of 100 gm Dusting Powder",
    rating: 4.3,
    reviews: 108,
    delivery: "Get by 12am, Tomorrow",
    price: 118,
    mrp: 131,
    discount: "10% off",
    category: "Skin Care", image: "/images/products/super_clocip.png",
  },
  {
    id: "deal-3",
    name: "Cofsils Gargle Antiseptic Solution",
    pack: "bottle of 100 ml Gargle",
    rating: 4.3,
    reviews: 226,
    delivery: "Get by 12am, Tomorrow",
    price: 77.3,
    mrp: 159.37,
    discount: "52% off",
    category: "Cough & Cold", image: "/images/products/super_cofsils.png",
  },
  {
    id: "deal-4",
    name: "Eloway Aloe Vera Moisturizing Gel",
    pack: "box of 100 gm Gel",
    rating: 4.5,
    reviews: 6,
    delivery: "Get by Fri, 16 Oct",
    price: 101,
    mrp: 150,
    discount: "33% off",
    category: "Skin Care", image: "/images/products/super_eloway.png",
  },
  {
    id: "deal-5",
    name: "Easylax L Oral Solution Lemon Sugar Free",
    pack: "bottle of 200 ml Oral Solution",
    rating: 4.4,
    reviews: 82,
    delivery: "Get by 12am, Tomorrow",
    price: 240,
    mrp: 258.3,
    discount: "7% off",
    category: "Stomach Care", image: "/images/products/super_easylax.png",
  },
  {
    id: "deal-6",
    name: "Omnigel Pain Relief from Sprain, Injury, Back Pain",
    pack: "tube of 100 gm Gel",
    rating: 4.5,
    reviews: 3665,
    delivery: "Get by Today",
    price: 262,
    mrp: 314.6,
    discount: "17% off",
    category: "Pain Relief", image: "/images/products/super_omnigel.png",
  },
  {
    id: "deal-7",
    name: "Combo Pack of Tata 1mg Hot Water Bag & Tata 1mg Pain Relief Gel",
    pack: "combo pack of 2 Packs",
    rating: 4.3,
    reviews: 1173,
    delivery: "Get by Tomorrow",
    price: 538,
    mrp: 675,
    discount: "20% off",
    category: "Pain Relief", image: "/images/products/super_hotwaterbag.png",
  },
];

export const popularCategories = [
  { id: "best-offers", name: "Best offers", color: "#d9e8c4", image: "/images/categories/bestoffers.png", image: "/images/categories/bestoffers.png", href: "/offers" },
  { id: "vitamins-supplements", name: "Vitamins & Supplements", color: "#fce7f3", image: "/images/categories/vitamins.png", image: "/images/categories/vitamins.png", href: "/healthcare/vitamins-supplements" },
  { id: "nutritional-drinks", name: "Nutritional Drinks", color: "#fef3c7", image: "/images/categories/nutritionaldrinks.png", image: "/images/categories/nutritionaldrinks.png", href: "/healthcare/nutritional-drinks" },
  { id: "skin-care", name: "Skin Care", color: "#dcfce7", image: "/images/categories/skincare_cat.png", image: "/images/categories/skincare_cat.png", href: "/healthcare/skin-care" },
  { id: "hair-care", name: "Hair Care", color: "#dbeafe", image: "/images/categories/haircare_cat.png", image: "/images/categories/haircare_cat.png", href: "/healthcare/hair-care" },
  { id: "sexual-wellness", name: "Sexual Wellness", color: "#fae8ff", image: "/images/categories/sexualwellness_cat.png", image: "/images/categories/sexualwellness_cat.png", href: "/healthcare/sexual-wellness" },
  { id: "ayurveda-products", name: "Ayurveda Products", color: "#ffedd5", image: "/images/categories/ayurveda_cat.png", image: "/images/categories/ayurveda_cat.png", href: "/healthcare/ayurveda-products" },
  { id: "pain-relief", name: "Pain Relief", color: "#e0e7ff", image: "/images/categories/painrelief_cat.png", image: "/images/categories/painrelief_cat.png", href: "/healthcare/pain-relief" },
  { id: "homeopathy", name: "Homeopathy", color: "#ecfccb", image: "/images/categories/homeopathy_cat.png", image: "/images/categories/homeopathy_cat.png", href: "/healthcare/homeopathy" },
];

export const trendingNow = [
  {
    id: "trend-1",
    name: "Zandu Kesari Jeevan Fit for Diabetics", image: "/images/products/trend_1.png",
    pack: "jar of 900 gm Paste",
    rating: 4.5,
    reviews: 792,
    delivery: "Get by 12am, Tomorrow",
    price: 823,
    mrp: 895,
    discount: "8% off",
    saleEnds: "Sale ends in 1 day 3 hrs",
  },
  {
    id: "trend-2",
    name: "Himalaya Gokshura Ayurvedic Tablets For Men", image: "/images/products/trend_2.png",
    pack: "bottle of 60 tablets",
    rating: 4.2,
    reviews: 1994,
    delivery: "Get by 12am, Tomorrow",
    price: 226,
    mrp: 275,
    discount: "18% off",
    saleEnds: "Sale ends in 1 day 3 hrs",
  },
  {
    id: "trend-3",
    name: "Sloan's Spray (55gm Each) Fast Pain Relief", image: "/images/products/trend_3.png",
    pack: "box of 1 Bottle",
    rating: 4.3,
    reviews: 15,
    delivery: "Get by Tomorrow",
    price: 140,
    mrp: 186.5,
    discount: "25% off",
    saleEnds: null,
  },
  {
    id: "trend-4",
    name: "Himalaya Wellness Tentex Royal Capsule", image: "/images/products/trend_4.png",
    pack: "bottle of 30 capsules",
    rating: 4.3,
    reviews: 25,
    delivery: "Get by 6pm, Tomorrow",
    price: 656,
    mrp: 800,
    discount: "18% off",
    saleEnds: "Sale ends in 1 day 3 hrs",
  },
  {
    id: "trend-5",
    name: "Skore Skin-Friendly Water-Based Lubricant", image: "/images/products/trend_5.png",
    pack: "bottle of 50 ml Liquid",
    rating: 4.0,
    reviews: 153,
    delivery: "Get by 12am, Tomorrow",
    price: 246,
    mrp: 300,
    discount: "18% off",
    saleEnds: "Sale ends in 1 day 3 hrs",
  },
  {
    id: "trend-6",
    name: "Himalaya Diabecon DS Tablet | Manages Blood Sugar", image: "/images/products/trend_6.png",
    pack: "bottle of 60 tablets",
    rating: 4.3,
    reviews: 1123,
    delivery: "Get by 12am, Tomorrow",
    price: 257,
    mrp: 285,
    discount: "10% off",
    saleEnds: "Sale ends in 1 day 3 hrs",
  },
  {
    id: "trend-7",
    name: "Nivea Luminous 630 Even Glow Night Cream", image: "/images/products/trend_7.png",
    pack: "tube of 40 ml Cream",
    rating: 4.4,
    reviews: 86,
    delivery: "Get by 12am, Tomorrow",
    price: 299,
    mrp: 499,
    discount: "40% off",
    saleEnds: null,
  },
];

export const skinCareProducts = [
  { id: "skin-1", name: "Palmolive Luminous Oils Shower Gel Rejuvenating", image: "/images/products/skin_1.png", pack: "bottle of 250 ml Body Wash", rating: 4.4, reviews: 10, delivery: "Get by 12am, Tomorrow", price: 220, mrp: 250, discount: "12% off" },
  { id: "skin-2", name: "The Derma Co 1% Hyaluronic Sunscreen Aqua Gel", image: "/images/products/skin_2.png", pack: "pump bottle of 50 gm Gel", rating: 4.2, reviews: 218, delivery: "Get by 12am, Tomorrow", price: 449, mrp: 499, discount: "10% off" },
  { id: "skin-3", name: "Photostable Gold Matte Finish Sunscreen Gel SPF 55", image: "/images/products/skin_3.png", pack: "tube of 50 gm Gel", rating: 4.5, reviews: 891, delivery: "Get by 12am, Tomorrow", price: 725, mrp: 799, discount: "9% off" },
  { id: "skin-4", name: "Sesderma Azelac RU Liposomal All Skin Types Serum", image: "/images/products/skin_4.png", pack: "bottle of 30 ml Serum", rating: 4.2, reviews: 207, delivery: "Get by 12am, Tomorrow", price: 2100, mrp: 2350, discount: "11% off" },
  { id: "skin-5", name: "C-Vit Facial Liposomal Serum with AntiOx Booster", image: "/images/products/skin_5.png", pack: "bottle of 30 ml Serum", rating: 4.3, reviews: 203, delivery: "Get by 12am, Tomorrow", price: 2350, mrp: 2600, discount: "10% off" },
  { id: "skin-6", name: "UV Doux Silicone Sunscreen Gel SPF 50 PA+++", image: "/images/products/skin_6.png", pack: "tube of 50 gm Gel", rating: 4.4, reviews: 744, delivery: "Get by 12am, Tomorrow", price: 620, mrp: 699, discount: "11% off" },
];

export const popularComboDeals = [
  { id: "combo-1", name: "Combo Pack of Volini Spray (100gm) & Tata 1mg Knee Support", image: "/images/products/combo_1.png", pack: "combo pack of 2 Packs", rating: 4.4, reviews: 6292, price: 556, mrp: 675, discount: "18% off" },
  { id: "combo-2", name: "Combo Pack of Tata 1mg Hot Water Bag & Tata 1mg Pain Relief Gel", image: "/images/products/combo_2.png", pack: "combo pack of 2 Packs", rating: 4.3, reviews: 1173, price: 538, mrp: 675, discount: "20% off" },
  { id: "combo-3", name: "Immunity Care Combo of 1mg Panch Tulsi 30ml & Patanjali Giloy Ghanvati", image: "/images/products/combo_3.png", pack: "combo pack of 2 Packs", rating: 4.5, reviews: 2877, price: 187, mrp: 257, discount: "27% off" },
  { id: "combo-4", name: "Dr Batra's Combo Pack of Hair Fall Control Serum & Shampoo", image: "/images/products/combo_4.png", pack: "combo pack of 3 bottles", delivery: "Get by Mon, 19 Oct", price: 1227, mrp: 1534, discount: "20% off", saleEnds: "Sale ends in 1 day 3 hrs" },
  { id: "combo-5", name: "Nature Sure Jatyadi Oil (30ml Each)", image: "/images/products/combo_5.png", pack: "box of 1 Bottle", delivery: "Get by Fri, 16 Oct", price: 211, mrp: 277, discount: "24% off" },
  { id: "combo-6", name: "Dr Batra's Combo Pack of Age Defying Skin Firming Cream", image: "/images/products/combo_6.png", pack: "combo pack of 2 Packs", delivery: "Get by Mon, 19 Oct", price: 959, mrp: 1199, discount: "20% off", saleEnds: "Sale ends in 1 day 3 hrs" },
  { id: "combo-7", name: "Dr Batra's Combo Pack of Normal Hair Shampoo & Serum", image: "/images/products/combo_7.png", pack: "combo pack of 2 bottles", delivery: "Get by Mon, 19 Oct", price: 958, mrp: 1198, discount: "20% off", saleEnds: "Sale ends in 1 day 3 hrs" },
];

export const topDealsPainCough = [
  { id: "pain-1", name: "Volini Spray for Sprain, Muscle and Joint Pain", image: "/images/products/pain_1.png", pack: "bottle of 100 gm Spray", delivery: "Get by 12am, Tomorrow", price: 341, mrp: 375, discount: "9% off" },
  { id: "pain-2", name: "Hoop Mess Less Pain Roll On (50ml Each) Bottle", image: "/images/products/pain_2.png", pack: "box of 1 Bottle", rating: 4.0, reviews: 8, delivery: "Get by Sat, 17 Oct", price: 459.3, mrp: 459.3, discount: null },
  { id: "pain-3", name: "Saridon Advance Tablet for 5 in 1 Pain Relief", image: "/images/products/pain_3.png", pack: "strip of 10 tablets", rating: 4.4, reviews: 1365, delivery: "Get by 12am, Tomorrow", price: 56.1, mrp: 59, discount: "5% off" },
  { id: "pain-4", name: "Cofsils Lozenges for Quick Relief from Sore Throat Orange", image: "/images/products/pain_4.png", pack: "strip of 10 lozenges", rating: 4.5, reviews: 2366, delivery: "Get by 12am, Tomorrow", price: 34.5, mrp: 39, discount: "12% off" },
  { id: "pain-5", name: "Moov Pain Relief Ointment for Back Pain & Muscle Strain", image: "/images/products/pain_5.png", pack: "tube of 50 gm Cream", rating: 4.5, reviews: 3655, delivery: "Get by 12am, Tomorrow", price: 204, mrp: 255, discount: "20% off" },
  { id: "pain-6", name: "Volini Joint Xpert Long-Lasting Pain Relief Gel", image: "/images/products/pain_6.png", pack: "tube of 20 gm Gel", delivery: "Get by 6pm, Tomorrow", price: 97.5, mrp: 97.5, discount: null },
  { id: "pain-7", name: "Moov 100% Ayurvedic Pain Relief Spray | Fast Action", image: "/images/products/pain_7.png", pack: "pump bottle of 80 gm Spray", rating: 4.4, reviews: 1404, delivery: "Get by 12am, Tomorrow", price: 288, mrp: 339, discount: "15% off" },
];

export const collagenSupplement = [
  { id: "col-1", name: "Hair, Skin & Nails Supreme Capsule with Biotin", image: "/images/products/collagen_1.png", pack: "bottle of 60 capsules", rating: 4.1, reviews: 1531, delivery: "Get by 12am, Tomorrow", price: 363, mrp: 529, discount: "31% off" },
  { id: "col-2", name: "MyFitFuel Premium Series Hydrolyzed Bovine Collagen+", image: "/images/products/collagen_2.png", pack: "jar of 500 gm Powder", delivery: "Get by Sat, 17 Oct", price: 1539, mrp: 2199, discount: "30% off" },
  { id: "col-3", name: "Skinfay Capsule Ceramide Skin Restorative", image: "/images/products/collagen_3.png", pack: "strip of 10 capsules", rating: 4.4, reviews: 57, delivery: "Get by Today", price: 213.5, mrp: 213.5, discount: null },
  { id: "col-4", name: "Inja Veg Collagen Powder Black Currant Flavour", image: "/images/products/collagen_4.png", pack: "jar of 150 gm Powder", delivery: "Get by Tue, 20 Oct", price: 2224.58, mrp: 2224.58, discount: null },
  { id: "col-5", name: "Lupivestin Plus Tablet for Joint Mobility", image: "/images/products/collagen_5.png", pack: "strip of 10 tablets", rating: 4.2, reviews: 94, delivery: "Get by 12am, Tomorrow", price: 914, mrp: 973.03, discount: "6% off" },
  { id: "col-6", name: "Marine Collagen | With Collagen Peptide & Vit C", image: "/images/products/collagen_6.png", pack: "jar of 210 gm Powder", rating: 3.7, reviews: 60, delivery: "Get by 6pm, Tomorrow", price: 642, mrp: 929, discount: "31% off" },
  { id: "col-7", name: "Megabone Granules with Collagen for Strong Bones", image: "/images/products/collagen_7.png", pack: "sachet of 10.7 gm Granules", rating: 4.3, reviews: 11, delivery: "Get by 12am, Tomorrow", price: 79.8, mrp: 79.8, discount: null },
];

export const flashSaleDeals = [
  { id: "flash-1", name: "Simple Kind to Skin Facial Wash Refreshing", image: "/images/products/flash_1.png", pack: "tube of 150 ml Face Wash", rating: 4.2, reviews: 31, delivery: "Get by 12am, Tomorrow", price: 362, mrp: 450, discount: "20% off" },
  { id: "flash-2", name: "Cetaphil Gentle Skin Cleanser | For Dry to Normal Sensitive Skin", image: "/images/products/flash_2.png", pack: "bottle of 118 ml Cleanser", rating: 4.4, reviews: 1878, delivery: "Get by 12am, Tomorrow", price: 335, mrp: 335, discount: null },
  { id: "flash-3", name: "Vaseline Daily Brightening Body Lotion Triple Sunscreen", image: "/images/products/flash_3.png", pack: "pump bottle of 400 ml Lotion", rating: 4.5, reviews: 16, delivery: "Get by Sat, 17 Oct", price: 365, mrp: 449, discount: "19% off" },
  { id: "flash-4", name: "Pilgrim Korean Rice Water Hydra Glow Gel Face Wash", image: "/images/products/flash_4.png", pack: "tube of 150 ml Face Wash", delivery: "Get by 12am, Tomorrow", price: 204, mrp: 365, discount: "44% off" },
  { id: "flash-5", name: "Daffy Baby Lotion Gentle & Hydrating", image: "/images/products/flash_5.png", pack: "pump bottle of 200 ml Lotion", rating: 4.3, reviews: 37, delivery: "Get by 12am, Tomorrow", price: 587, mrp: 600, discount: "2% off" },
  { id: "flash-6", name: "Dhootapapeshwar Brahmi Vati Suvarna Yukta", image: "/images/products/flash_6.png", pack: "packet of 30 tablets", rating: 4.4, reviews: 131, delivery: "Get by 12am, Tomorrow", price: 3013, mrp: 3013, discount: null },
  { id: "flash-7", name: "MuscleBlaze Biozyme Performance Whey Protein Rich Chocolate", image: "/images/products/flash_7.png", pack: "jar of 2 kg Powder", rating: 3.2, reviews: 10, delivery: "Get by Tomorrow", price: 7199, mrp: 9699, discount: "26% off" },
];

export const radiologyTests = [
  { id: "rad-1", name: "Ultrasound Whole Abdomen (USG)", desc: "Contains 1 test", provider: "Tata 1mg Labs", safe: true, price: 900 },
  { id: "rad-2", name: "Electrocardiography (ECG)", desc: "Contains 1 test", provider: "Tata 1mg Labs", safe: true, price: 230 },
  { id: "rad-3", name: "X - Ray Chest PA View (CXR)", desc: "Contains 1 test", provider: "Tata 1mg Labs", safe: true, price: 253 },
  { id: "rad-4", name: "MRI Brain (MRI)", desc: "Contains 1 test", provider: "Tata 1mg Labs", safe: true, price: 2813 },
  { id: "rad-5", name: "Treadmill Test (TMT)", desc: "Contains 1 test", provider: "Tata 1mg Labs", safe: false, price: 1400 },
];

export const exploreSomethingNew = [
  { id: "exp-1", name: "Neuherbs Deep Sea Omega 3 Cod liver Oil Capsules", image: "/images/products/explore_1.png", pack: "bottle of 100 soft gelatin capsules", delivery: "Get by 12am, Tomorrow", price: 368, mrp: 449, discount: "18% off" },
  { id: "exp-2", name: "Puraroma Allergy Protection Nasal Spray", image: "/images/products/explore_2.png", pack: "bottle of 15 ml Nasal Spray", delivery: "Get by 12am, Tomorrow", price: 887, mrp: 1249, discount: "29% off", saleEnds: "Sale ends in 1 day 3 hrs" },
  { id: "exp-3", name: "Briyo H2Lyte Electrolytes with Vitamins & Amino", image: "/images/products/explore_3.png", pack: "box of 10 Sachets", rating: 5.0, reviews: 13, delivery: "Get by 6pm, Tomorrow", price: 487, mrp: 605, discount: "20% off" },
  { id: "exp-4", name: "Nivea Lip Balm with Natural Oils Strawberry Shine", image: "/images/products/explore_4.png", pack: "packet of 4.8 gm Balm", rating: 4.5, reviews: 445, delivery: "Get by 12am, Tomorrow", price: 204, mrp: 240, discount: "15% off" },
  { id: "exp-5", name: "Combo Pack of Tata 1mg Hot Water Bag & Tata 1mg Pain Relief Gel", image: "/images/products/explore_5.png", pack: "combo pack of 2 Packs", rating: 4.3, reviews: 1173, price: 538, mrp: 675, discount: "20% off" },
  { id: "exp-6", name: "Zandu Fast Pain Relief Ultra Strong Gel", image: "/images/products/explore_6.png", pack: "tube of 45 ml Gel", rating: 4.3, reviews: 103, delivery: "Get by Sat, 17 Oct", price: 119, mrp: 170, discount: "30% off", saleEnds: "Sale ends in 1 day 3 hrs" },
  { id: "exp-7", name: "Popular Fit Eats Zahidi Dates Soft & Sweet", image: "/images/products/explore_7.png", pack: "packet of 500 gm Dry Fruits", rating: 4.0, reviews: 87, delivery: "Get by Mon, 19 Oct", price: 188, mrp: 250, discount: "25% off" },
];

export const inTheSpotlight = [
  { id: "spot-1", name: "Organic India Neem Veg Capsule | Acts as Blood Purifier", image: "/images/products/spotlight_1.png", pack: "bottle of 60 vegicaps", rating: 4.6, reviews: 203, delivery: "Get by 12am, Tomorrow", price: 270, mrp: 290, discount: "7% off", saleEnds: "Sale ends in 1 day 3 hrs" },
  { id: "spot-2", name: "Durex Air Ultra Thin Condom", image: "/images/products/spotlight_2.png", pack: "packet of 10 condoms", rating: 4.3, reviews: 1900, delivery: "Get by 12am, Tomorrow", price: 292, mrp: 356, discount: "18% off", saleEnds: "Sale ends in 1 day 3 hrs" },
  { id: "spot-3", name: "Miduty Zinc Picolinate Capsule", image: "/images/products/spotlight_3.png", pack: "bottle of 60 capsules", rating: 4.3, reviews: 9, delivery: "Get by 12am, Tomorrow", price: 699, mrp: 699, discount: null },
  { id: "spot-4", name: "Patanjali Divya Lipidom Tablet", image: "/images/products/spotlight_4.png", pack: "bottle of 60 tablets", rating: 4.4, reviews: 327, delivery: "Get by 12am, Tomorrow", price: 310, mrp: 310, discount: null },
  { id: "spot-5", name: "i-Know Pregnancy Test kit | Fast Result in 5 min", image: "/images/products/spotlight_5.png", pack: "box of 1 Test Kit", rating: 4.3, reviews: 844, delivery: "Get by 12am, Tomorrow", price: 55, mrp: 56.25, discount: "2% off" },
  { id: "spot-6", name: "Baidyanath (Nagpur) Chyawan-Fit Sugarfree", image: "/images/products/spotlight_6.png", pack: "jar of 1 kg Paste", rating: 4.4, reviews: 543, delivery: "Get by 12am, Tomorrow", price: 371, mrp: 431, discount: "14% off" },
  { id: "spot-7", name: "Moov 100% Ayurvedic Pain Relief Spray | For Back Pain", image: "/images/products/spotlight_7.png", pack: "pump bottle of 80 gm Spray", rating: 4.4, reviews: 1404, delivery: "Get by 12am, Tomorrow", price: 288, mrp: 339, discount: "15% off", saleEnds: "Sale ends in 1 day 3 hrs" },
  { id: "spot-8", name: "Himalaya Wellness Ashwagandha Stress Relief", image: "/images/products/spotlight_7.png", pack: "bottle of 60 tablets", rating: 4.4, reviews: 3944, delivery: "Get by 12am, Tomorrow", price: 229, mrp: 260, discount: "12% off", saleEnds: "Sale ends in 1 day 3 hrs" },
];

export const ayurvedaTopBrands = [
  { id: "ayur-b1", name: "Dabur", color: "#ecfccb", image: "/images/brands/dabur.png" },
  { id: "ayur-b2", name: "Baidyanath", color: "#fee2e2", image: "/images/brands/ayur_baidyanath.png" },
  { id: "ayur-b3", name: "Dhootapapeshwar", color: "#fef9c3", image: "/images/brands/ayur_dhootapapeshwar.png" },
  { id: "ayur-b4", name: "TATA 1mg", color: "#fef3c7", image: "/images/brands/tata1mg.png" },
  { id: "ayur-b5", name: "Himalaya", color: "#ccfbf1", image: "/images/brands/ayur_patanjali.png" },
  { id: "ayur-b6", name: "JIVA", color: "#ffedd5", image: "/images/brands/ayur_jiva.png" },
  { id: "ayur-b7", name: "Kerala Ayurveda", color: "#fef08a", image: "/images/brands/ayur_kottakkal.png" },
  { id: "ayur-b8", name: "SriSri", color: "#ede9fe", image: "/images/brands/ayur_srisri.png" },
];

export const dealsOfTheDay = [
  { id: "dod-1", name: "Patanjali Nutrela Green Plant Protein Powder Iris Flavour", image: "/images/products/deal_1.png", pack: "jar of 500 gm Powder", rating: 3.6, reviews: 8, delivery: "Get by Sun, 18 Oct", price: 714, mrp: 978, discount: "27% off", saleEnds: "Sale ends in 1 day 3 hrs" },
  { id: "dod-2", name: "Zandu Nityam Tablet | For Stomach Care & Constipation", image: "/images/products/deal_2.png", pack: "bottle of 30 tablets", rating: 4.5, reviews: 2309, delivery: "Get by 12am, Tomorrow", price: 96.8, mrp: 122, discount: "21% off", saleEnds: "Sale ends in 1 day 3 hrs" },
  { id: "dod-3", name: "Avvatar Whey Protein Powder Sugar Free Chocolate", image: "/images/products/deal_3.png", pack: "jar of 1 kg Powder", delivery: "Get by 12am, Tomorrow", price: 6299, mrp: 6299, discount: null },
  { id: "dod-4", name: "Puraroma Sore Throat Spray Fast Relief", image: "/images/products/deal_4.png", pack: "bottle of 15 ml Spray", delivery: "Get by Today", price: 824, mrp: 1249, discount: "34% off", saleEnds: "Sale ends in 1 day 3 hrs" },
  { id: "dod-5", name: "Puraroma Joint & Muscle Pain Relief Blend", image: "/images/products/deal_5.png", pack: "bottle of 30 ml Oil", delivery: "Get by Tomorrow", price: 870, mrp: 1749, discount: "50% off", saleEnds: "Sale ends in 1 day 3 hrs" },
  { id: "dod-6", name: "Supradyn Naturals Ginseng Tablet with Zinc & Vitamins", image: "/images/products/deal_6.png", pack: "bottle of 30 tablets", rating: 4.1, reviews: 21, delivery: "Get by Tomorrow", price: 232, mrp: 293.6, discount: "21% off" },
  { id: "dod-7", name: "Stayfree Dry-Max All Night Ultra-Dry Sanitary Pads", image: "/images/products/deal_7.png", pack: "packet of 42 pads", rating: 4.5, reviews: 461, delivery: "Get by 12am, Tomorrow", price: 563, mrp: 625, discount: "10% off", saleEnds: "Sale ends in 1 day 3 hrs" },
];

export const skincarePicks = [
  { id: "pick-1", name: "Bioderma Atoderm Ultra-Nourishing Cream for Dry Skin", image: "/images/products/pick_1.png", pack: "tube of 200 ml Cream", rating: 4.4, reviews: 129, delivery: "Get by 12am, Tomorrow", price: 650, mrp: 699, discount: "7% off" },
  { id: "pick-2", name: "Ahaglow Advanced Skin Rejuvenating Face Wash Gel", image: "/images/products/pick_2.png", pack: "tube of 100 gm Face Wash", rating: 4.3, reviews: 2387, price: 480, mrp: 525, discount: "9% off" },
  { id: "pick-3", name: "Minimalist 08% Glycolic Acid Exfoliating Liquid", image: "/images/products/pick_3.png", pack: "bottle of 150 ml Liquid", rating: 4.0, reviews: 13, delivery: "Get by Today", price: 499, mrp: 499, discount: null },
  { id: "pick-4", name: "Rivela Lite Weightless Mousse Broad Spectrum SPF 50", image: "/images/products/pick_4.png", pack: "tube of 60 gm Cream", rating: 4.2, reviews: 150, delivery: "Get by 12am, Tomorrow", price: 620, mrp: 690, discount: "10% off" },
  { id: "pick-5", name: "UV Doux Silicone Sunscreen Gel SPF 50 PA+++", image: "/images/products/pick_5.png", pack: "tube of 50 gm Gel", rating: 4.4, reviews: 744, delivery: "Get by 12am, Tomorrow", price: 620, mrp: 699, discount: "11% off" },
  { id: "pick-6", name: "Tetmosol Medicated Soap with 5% Monosulfiram", image: "/images/products/pick_6.png", pack: "packet of 100 gm Soap", rating: 4.3, reviews: 2003, price: 85, mrp: 95, discount: "11% off" },
  { id: "pick-7", name: "Minimalist B12 + Oat Extract 6.5% Gentle Cleanser", image: "/images/products/pick_7.png", pack: "pump bottle of 120 ml Cleanser", rating: 4.4, reviews: 33, delivery: "Get by Tomorrow", price: 349, mrp: 349, discount: null },
];

export const painReliefEssentials = [
  { id: "pre-1", name: "Moov 100% Ayurvedic Pain Relief Spray | For Muscle Pain", image: "/images/products/pre_1.png", pack: "pump bottle of 80 gm Spray", rating: 4.4, reviews: 1404, delivery: "Get by 12am, Tomorrow", price: 288, mrp: 339, discount: "15% off", saleEnds: "Sale ends in 1 day 3 hrs" },
  { id: "pre-2", name: "Dynapar QPS Plus Pain Relief Spray for Back & Knee", image: "/images/products/pre_2.png", pack: "bottle of 30 ml Solution", rating: 4.4, reviews: 589, delivery: "Get by Today", price: 304, mrp: 356.25, discount: "15% off" },
  { id: "pre-3", name: "TurmaBoost Curcumin 95% (400mg) + Black Pepper", image: "/images/products/pre_3.png", pack: "box of 10 capsules", rating: 4.2, reviews: 86, delivery: "Get by Today", price: 186, mrp: 186, discount: null },
  { id: "pre-4", name: "Jiva Pain Calm Oil | Pain Reliever for Joint Pain & Stiffness", image: "/images/products/pre_4.png", pack: "pump bottle of 200 ml Oil", rating: 4.4, reviews: 77, delivery: "Get by 6pm, Tomorrow", price: 415, mrp: 415, discount: null },
  { id: "pre-5", name: "Baidyanath (Jhansi) Ayurvedant Ekangvir Ras", image: "/images/products/pre_5.png", pack: "bottle of 60 tablets", rating: 3.5, reviews: 11, delivery: "Get by 6pm, Tomorrow", price: 171, mrp: 190, discount: "10% off" },
  { id: "pre-6", name: "Himalaya Rumalaya Pain Relief Gel | Quick relief in joint pain", image: "/images/products/pre_6.png", pack: "tube of 30 gm Gel", rating: 4.5, reviews: 185, delivery: "Get by Tomorrow", price: 123, mrp: 140, discount: "12% off", saleEnds: "ends in 1 day 3 hrs" },
  { id: "pre-7", name: "R3SET Pain Relief Tablet Instant Ease", image: "/images/products/pre_7.png", pack: "bottle of 30 tablets", delivery: "Get by Sun, 18 Oct", price: 332, mrp: 349, discount: "5% off" },
];

export const healthyHairStartsHere = [
  { id: "hair-s1", name: "Pilgrim 3% Redensyl, 4% Anagain & 5% Capilia Serum", image: "/images/products/hair_1.png", pack: "bottle of 30 ml Serum", rating: 4.0, reviews: 60, delivery: "Get by 12am, Tomorrow", price: 720, mrp: 799, discount: "10% off" },
  { id: "hair-s2", name: "Sebamed Anti-Dandruff | Hair Care Shampoo For Oily Hair", image: "/images/products/hair_2.png", pack: "bottle of 200 ml Shampoo", rating: 4.3, reviews: 496, delivery: "Get by 12am, Tomorrow", price: 630, mrp: 675, discount: "7% off" },
  { id: "hair-s3", name: "Minimalist Anti-Dandruff Shampoo 3.5%", image: "/images/products/hair_3.png", pack: "pump bottle of 200 ml Shampoo", rating: 3.9, reviews: 7, price: 399, mrp: 399, discount: null },
  { id: "hair-s4", name: "Soulflower Hair Growth Rosemary Water Spray", image: "/images/products/hair_4.png", pack: "pump bottle of 100 ml Spray", delivery: "Get by Tomorrow", price: 200, mrp: 200, discount: null },
  { id: "hair-s5", name: "Pilgrim Spanish Rosemary Biotin Anti-Hairfall Shampoo", image: "/images/products/hair_5.png", pack: "pump bottle of 200 ml Shampoo", rating: 4.4, reviews: 54, price: 400, mrp: 450, discount: "11% off" },
  { id: "hair-s6", name: "Sebamed Anti-Hairloss Shampoo with Caffeine & Ginkgo", image: "/images/products/hair_6.png", pack: "bottle of 200 ml Shampoo", rating: 4.3, reviews: 228, delivery: "Get by Today", price: 720, mrp: 799, discount: "10% off" },
  { id: "hair-s7", name: "Minimalist 18% Hair Growth Actives Hair Serum", image: "/images/products/hair_7.png", pack: "bottle of 30 ml Serum", rating: 4.0, reviews: 82, delivery: "Get by Today", price: 799, mrp: 799, discount: null },
];

export const tucoKidsTopSellers = [
  { id: "tuco-1", name: "Tuco Kids Kumkumadi Face Cream Sulphate Free", image: "/images/products/tuco_1.png", pack: "tube of 50 gm Cream", delivery: "Get by Sun, 18 Oct", price: 162, mrp: 250, discount: "35% off", saleEnds: "Sale ends in 1 day 3 hrs" },
  { id: "tuco-2", name: "Tuco Kids Soap (75gm Each) Buy 3 Get 1 Free", image: "/images/products/tuco_2.png", pack: "box of 3 soaps", delivery: "Get by 12am, Tomorrow", price: 247, mrp: 350, discount: "29% off", saleEnds: "Sale ends in 1 day 3 hrs" },
  { id: "tuco-3", name: "Tuco Kids Oat Lotion Sulphate Free Paraben Free", image: "/images/products/tuco_3.png", pack: "bottle of 300 ml Lotion", delivery: "Get by 12am, Tomorrow", price: 264, mrp: 375, discount: "30% off", saleEnds: "Sale ends in 1 day 3 hrs" },
  { id: "tuco-4", name: "Tuco Kids Oat Lotion Sulphate Free Paraben Free (50ml)", image: "/images/products/tuco_4.png", pack: "tube of 50 ml Lotion", delivery: "Get by 12am, Tomorrow", price: 114, mrp: 150, discount: "24% off", saleEnds: "Sale ends in 1 day 3 hrs" },
  { id: "tuco-5", name: "Tuco Kids Bye,Dull Skin Soap (75gm Each) SLS Free", image: "/images/products/tuco_5.png", pack: "box of 3 soaps", delivery: "Get by 12am, Tomorrow", price: 245, mrp: 360, discount: "32% off", saleEnds: "Sale ends in 1 day 3 hrs" },
  { id: "tuco-6", name: "Tuco Kids Bye,Dull Skin Face Wash Sulphate Free", image: "/images/products/tuco_6.png", pack: "tube of 100 ml Face Wash", delivery: "Get by 12am, Tomorrow", price: 162, mrp: 250, discount: "35% off", saleEnds: "Sale ends in 1 day 3 hrs" },
  { id: "tuco-7", name: "Tuco Kids Reetha Shampoo Tear Free Natural Formula", image: "/images/products/tuco_7.png", pack: "tube of 50 ml Shampoo", delivery: "Get by 12am, Tomorrow", price: 114, mrp: 150, discount: "24% off", saleEnds: "Sale ends in 1 day 3 hrs" },
];

export const homeopathyWomensHealth = [
  { id: "hom-1", name: "ADEL Platinum Met. Dilution 200", image: "/images/products/hom_1.png", pack: "bottle of 10 ml Dilution", rating: 3.8, reviews: 6, delivery: "Get by Fri, 16 Oct", price: 175, mrp: 175, discount: null },
  { id: "hom-2", name: "Wheezal Chaparoo Amargosa Dilution 200", image: "/images/products/hom_2.png", pack: "bottle of 30 ml Dilution", delivery: "Get by Sun, 18 Oct", price: 115, mrp: 115, discount: null },
  { id: "hom-3", name: "Wheezal WL26 Menopause Drop", image: "/images/products/hom_3.png", pack: "bottle of 30 ml Drop", rating: 4.2, reviews: 12, delivery: "Get by Fri, 16 Oct", price: 155, mrp: 155, discount: null },
  { id: "hom-4", name: "SBL Pinus Lambertiana Dilution 12 CH", image: "/images/products/hom_4.png", pack: "bottle of 30 ml Dilution", delivery: "Get by Sat, 17 Oct", price: 110, mrp: 110, discount: null },
  { id: "hom-5", name: "REPL Dr. Advice No.3 Anemia Drop", image: "/images/products/hom_5.png", pack: "bottle of 30 ml Drop", rating: 4.2, reviews: 44, delivery: "Get by Fri, 16 Oct", price: 160, mrp: 160, discount: null },
  { id: "hom-6", name: "Dr. Reckeweg Sepia Dilution 200 CH", image: "/images/products/hom_6.png", pack: "bottle of 11 ml Dilution", rating: 4.6, reviews: 312, delivery: "Get by 12am, Tomorrow", price: 190, mrp: 190, discount: null },
  { id: "hom-7", name: "Dr. Reckeweg Hydrocotyle Asiatica Dilution", image: "/images/products/hom_7.png", pack: "bottle of 11 ml Dilution", rating: 4.6, reviews: 18, delivery: "Get by Fri, 16 Oct", price: 190, mrp: 190, discount: null },
];

export const ayurvedaKnowledge = [
  {
    id: "ayur-k1",
    name: "Celery", image: "/images/ayurveda/celery.png",
    desc: "Celery or Ajmoda is a plant whose leaves and stalk are commonly used as a part of a healthy diet, known for supporting digestion and cardiovascular wellness.",
  },
  {
    id: "ayur-k2",
    name: "Plum", image: "/images/ayurveda/plum.png",
    desc: "Plum is a sweet and juicy summer fruit which is also known as Aalu Bukhara. Adding plums to your diet supports digestion, antioxidant defense, and vital cellular health.",
  },
  {
    id: "ayur-k3",
    name: "Lemon", image: "/images/ayurveda/lemon.png",
    desc: "Lemon (Citrus limon) is a flowering plant rich in vitamin C, citric acid and essential flavonoids that enhance immunity, skin glow, and natural detoxification.",
  },
  {
    id: "ayur-k4",
    name: "Mahasudarshan churna", image: "/images/ayurveda/mahasudarshan.png",
    desc: "Mahasudarshan Churna is a polyherbal Ayurvedic formulation containing 49 ingredients traditionally used for supporting immunity and seasonal recovery.",
  },
  {
    id: "ayur-k5",
    name: "Kachnar", image: "/images/ayurveda/kachnar.png",
    desc: "Kachnar is also known as Mountain Ebony or Rakta Kanchan, an ornamental plant revered in Ayurveda for supporting thyroid balance and healthy lymphatic function.",
  },
  {
    id: "ayur-k6",
    name: "Green Tea", image: "/images/ayurveda/greentea.png",
    desc: "The plant Camellia sinensis yields three types of tea based on the level of fermentation. Rich in EGCG catechins that stimulate metabolism and vitality.",
  },
];

// ---------------------- LAB TESTS LANDING PAGE DATA ----------------------
export const labTrustCards = [
  {
    id: "nabl",
    title: "Trusted NABL certified labs",
    desc: "Hygienic & safety assured testing",
    image: "/images/lab_tests/trust_nabl.png",
  },
  {
    id: "coverage",
    title: "Wide coverage across india",
    desc: "Most trusted service in 55+ cities",
    image: "/images/lab_tests/wide_coverage.png",
  },
  {
    id: "collection",
    title: "Home sample collection",
    desc: "Safe pickup at your doorstep",
    image: "/images/lab_tests/home_collection.png",
  },
  {
    id: "reports",
    title: "Fast, accurate reports",
    desc: "Doctor-verified, delivered on time",
    image: "/images/lab_tests/fast_reports.png",
  },
];

export const labHealthNeeds = [
  { id: "men", name: "Men", image: "/images/lab_tests/need_men.png", href: "/lab-tests?q=Men" },
  { id: "women", name: "Women", image: "/images/lab_tests/need_women.png", href: "/lab-tests?q=Women" },
  { id: "liver-kidney", name: "Liver & Kidney", image: "/images/lab_tests/need_liver_kidney.png", href: "/lab-tests?q=Liver" },
  { id: "thyroid", name: "Thyroid", image: "/images/lab_tests/need_thyroid.png", href: "/lab-tests?q=Thyroid" },
  { id: "hormones", name: "Hormones", image: "/images/lab_tests/need_hormones.png", href: "/lab-tests?q=Hormone" },
  { id: "allergy", name: "Allergy", image: "/images/lab_tests/need_allergy.png", href: "/lab-tests?q=Allergy" },
];

export const labPromoBanners = [
  {
    id: "phlebotomist",
    title: "BHAROSE KA BADGE:",
    subtitle: "Earned by our phlebotomists",
    desc: "See what sets them apart",
    btnText: "Watch now",
    image: "/images/lab_tests/banner_phlebotomist.png",
    bg: "from-[#4c1d32] to-[#732943]",
  },
  {
    id: "trust-see",
    title: "Trust what you see!",
    subtitle: "Take a sneak peek into our National Reference Lab, Delhi",
    desc: "Accredited state-of-the-art diagnostic facilities",
    btnText: "Watch now",
    image: "/images/lab_tests/banner_trust_see.png",
    bg: "from-[#391e4a] to-[#592c73]",
  },
  {
    id: "ref-lab",
    title: "National Reference Lab",
    subtitle: "Making lab test safer, faster & accurate for you",
    desc: "Equipped with automated world-class high-throughput analyzers",
    btnText: "Know more",
    image: "/images/lab_tests/banner_national_ref_lab.png",
    bg: "from-[#0c4a2c] to-[#156f43]",
  },
];

export const labRadiologyCards = [
  { id: "ct-scan", name: "CT Scan", image: "/images/lab_tests/rad_ct_scan.png", href: "/lab-tests?q=CT+Scan" },
  { id: "ecg", name: "ECG", image: "/images/lab_tests/rad_ecg.png", href: "/lab-tests?q=ECG" },
  { id: "x-ray", name: "X-Ray", image: "/images/lab_tests/rad_xray.png", href: "/lab-tests?q=X-Ray" },
  { id: "ultrasound", name: "Ultrasound", image: "/images/lab_tests/rad_ultrasound.png", href: "/lab-tests?q=Ultrasound" },
  { id: "mri", name: "MRI", image: "/images/lab_tests/rad_mri.png", href: "/lab-tests?q=MRI" },
  { id: "echo-test", name: "Echo Test", image: "/images/lab_tests/rad_echo.png", href: "/lab-tests?q=Echo" },
];

export const labCollectionSteps = [
  {
    step: 1,
    title: "Easy online booking",
    desc: "Search for tests and packages, book your preferred time slot and enter your address for seamless at-home lab tests.",
    image: "/images/lab_tests/step_1_booking.png",
  },
  {
    step: 2,
    title: "Live tracking of phlebotomist",
    desc: "Track our trained phlebotomist's real time location for seamless sample collection.",
    image: "/images/lab_tests/step_2_tracking.png",
  },
  {
    step: 3,
    title: "Safe Sample Collection",
    desc: "Our phlebotomists follow strict safety protocols to collect samples safely at home and on time.",
    image: "/images/lab_tests/step_3_collection.png",
  },
  {
    step: 4,
    title: "Sample received at lab",
    desc: "Samples are transported securely to our accredited labs with world-class machines for testing by qualified experts.",
    image: "/images/lab_tests/step_4_lab.png",
  },
  {
    step: 5,
    title: "Quick, Doctor-Verified Reports",
    desc: "Get doctor-approved reports via email and WhatsApp, with options for doctor follow-ups and AI insights.",
    image: "/images/lab_tests/step_5_report.png",
  },
];

export const labPopularTestSuggestions = [
  {
    id: "urine-rm",
    name: "Urine R/M (Urine Routine & Microscopy)",
    testsCount: "Contains 19 tests",
    price: 199,
    testId: "path-1",
  },
  {
    id: "hba1c",
    name: "HbA1c (Glycosylated Hemoglobin)",
    testsCount: "Contains 1 test",
    price: 320,
    testId: "path-2",
  },
  {
    id: "thyroid-profile",
    name: "Thyroid Profile Total (T3, T4 & TSH)",
    testsCount: "Contains 3 tests",
    price: 539,
    testId: "path-3",
  },
];

export const platformStats = [
  { value: "260m+", label: "Visitors", icon: "visitors" },
  { value: "31m+", label: "Orders Delivered", icon: "orders" },
  { value: "1800+", label: "Cities", icon: "cities" },
];

export const trustPillars = [
  {
    id: "reliable",
    title: "Reliable",
    desc: "All products displayed on Tata 1mg are procured from verified and licensed pharmacies. All labs listed on the platform are accredited.",
    icon: "reliable",
  },
  {
    id: "secure",
    title: "Secure",
    desc: "Tata 1mg uses Secure Sockets Layer (SSL) 128-bit encryption and is Payment Card Industry Data Security Standard (PCI DSS) compliant.",
    icon: "secure",
  },
  {
    id: "affordable",
    title: "Affordable",
    desc: "Find affordable medicine substitutes, save up to 50% on health products, up to 80% off on lab tests and free doctor consultations.",
    icon: "affordable",
  },
];

export const offersData = {
  medicines: [
    {
      id: "med-off-1",
      partner: "Amazon Pay",
      logo: "amazon",
      headline: "Get up to ₹75 cashback on a minimum order value (MOV) of ₹499 and above, valid once per customer.",
      expiry: "Expiry: 31 Oct 26",
      code: "AMZ75",
    },
    {
      id: "med-off-2",
      partner: "Mobikwik",
      logo: "mobikwik",
      headline: "Get upto Rs.150 Cashback on minimum transaction of Rs.599/- with Mobikwik UPI (@ikwik).",
      expiry: "Expiry: 31 Oct 26",
      code: "MBK150",
    },
    {
      id: "med-off-3",
      partner: "Paytm",
      logo: "paytm",
      headline: "Assured cashback up to ₹300*. T&C Apply* on your wallet and UPI payments.",
      expiry: "Expiry: 31 Oct 26",
      code: "PAYTM300",
    },
    {
      id: "med-off-4",
      partner: "Simpl",
      logo: "simpl",
      headline: "Get 10% instant cashback up to ₹100 on your first Simpl checkout on Tata 1mg.",
      expiry: "Expiry: 31 Oct 26",
      code: "SIMPL100",
    },
  ],
  labTests: [
    {
      id: "lab-off-1",
      partner: "Tata 1mg Labs",
      logo: "tata1mg",
      headline: "Flat 50% discount on comprehensive full body checkup packages.",
      expiry: "Expiry: 31 Oct 26",
      code: "HEALTH50",
    },
    {
      id: "lab-off-2",
      partner: "HDFC Bank",
      logo: "hdfc",
      headline: "Flat ₹200 off on diagnostic tests and pathology above ₹999 with HDFC credit/debit cards.",
      expiry: "Expiry: 31 Oct 26",
      code: "HDFC200",
    },
  ],
};

export const paymentPartners = [
  "VISA",
  "Mastercard",
  "American Express",
  "RuPay",
  "Paytm",
  "Amazon Pay",
  "Google Pay",
  "Mobikwik",
  "Freecharge",
  "PhonePe",
  "Simpl",
  "Airtel Money",
];

// Standard Categories & Products
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
  ["Ayurveda Products", "leaf", "Traditional Ayurvedic herbs and supplements."],
  ["Homeopathy", "drop", "Gentle homeopathic dilutions and remedies."],
].map(([name, icon, description], i) => ({
  id: slugify(name),
  slug: slugify(name),
  name,
  icon,
  description,
  image: "",
  visible: true,
  order: i + 1,
}));

const seed = [
  ["Unienzyme Digestive Enzymes for Indigestion", "OTC Medicines", "Unichem", "200 ml", 159],
  ["Clocip Anti-Fungal Dusting Powder", "Personal Care", "Cipla", "100 gm", 118],
  ["Cofsils Gargle Antiseptic Solution", "OTC Medicines", "Cipla", "100 ml", 77],
  ["Eloway Aloe Vera Moisturizing Gel", "Personal Care", "Eloway", "100 gm", 101],
  ["Easylax L Oral Solution Lemon Sugar Free", "OTC Medicines", "Lupin", "200 ml", 240],
  ["Omnigel Pain Relief from Sprain, Injury", "Personal Care", "Cipla", "100 gm", 262],
  ["Zandu Kesari Jeevan Fit for Diabetics", "Diabetes Care", "Zandu", "900 gm", 823],
  ["Himalaya Gokshura Ayurvedic Tablets", "Ayurveda Products", "Himalaya", "60 tablets", 226],
  ["Sloan's Spray Fast Pain Relief", "Personal Care", "Sloan's", "55 gm", 140],
  ["Himalaya Wellness Tentex Royal Capsule", "Ayurveda Products", "Himalaya", "30 capsules", 656],
  ["Skore Skin-Friendly Water-Based Lubricant", "Personal Care", "Skore", "50 ml", 246],
  ["Himalaya Diabecon DS Tablet", "Diabetes Care", "Himalaya", "60 tablets", 257],
  ["Nivea Luminous 630 Even Glow Night Cream", "Personal Care", "Nivea", "40 ml", 299],
  ["The Derma Co 1% Hyaluronic Sunscreen Aqua Gel", "Personal Care", "The Derma Co", "50 gm", 449],
  ["Photostable Gold Matte Finish Sunscreen Gel", "Personal Care", "Sun Pharma", "50 gm", 725],
  ["Simple Kind to Skin Facial Wash Refreshing", "Personal Care", "Simple", "150 ml", 362],
  ["Cetaphil Gentle Skin Cleanser", "Personal Care", "Galderma", "118 ml", 335],
  ["Vaseline Daily Brightening Body Lotion", "Personal Care", "Vaseline", "400 ml", 365],
  ["Pilgrim Korean Rice Water Hydra Glow Gel", "Personal Care", "Pilgrim", "150 ml", 204],
  ["Organic India Neem Veg Capsule", "Ayurveda Products", "Organic India", "60 capsules", 270],
  ["Durex Air Ultra Thin Condom", "Personal Care", "Durex", "10 pack", 292],
  ["Baidyanath Chyawan-Fit Sugarfree", "Ayurveda Products", "Baidyanath", "1 kg", 371],
  ["Moov 100% Ayurvedic Pain Relief Spray", "Personal Care", "Moov", "80 gm", 288],
  ["Himalaya Wellness Ashwagandha", "Ayurveda Products", "Himalaya", "60 tablets", 229],
  ["Patanjali Nutrela Green Plant Protein", "Nutrition & Wellness", "Patanjali", "500 gm", 714],
  ["Zandu Nityam Tablet for Stomach Care", "Ayurveda Products", "Zandu", "30 tablets", 96],
  ["Stayfree Dry-Max All Night Ultra-Dry", "Women's Health", "Stayfree", "42 pads", 563],
  ["Bioderma Atoderm Ultra-Nourishing Cream", "Personal Care", "Bioderma", "200 ml", 650],
  ["Daily Multivitamin Tablets", "Vitamins & Supplements", "Tata 1mg", "30 tablets", 249],
  ["Vitamin C Chewable Tablets", "Vitamins & Supplements", "Tata 1mg", "20 tablets", 179],
  ["Vitamin D3 Softgel Capsules", "Vitamins & Supplements", "Tata 1mg", "15 capsules", 199],
  ["Digital Thermometer", "Medical Devices", "CareSense", "1 unit", 199],
  ["Prescription Medicine Amoxicillin 500mg", "Prescription Medicines", "Cipla", "10 tablets", 120],
  ["Prescription Medicine Metformin 500mg", "Prescription Medicines", "Sun Pharma", "15 tablets", 85],
  ["Prescription Medicine Atorvastatin 10mg", "Prescription Medicines", "Zydus", "10 tablets", 140],
];

export const products = seed.map(([name, category, brand, pack, price], i) => ({
  id: `1MG-${101 + i}`,
  name,
  category,
  brand,
  pack,
  price,
  mrp: Math.round(price * (i % 3 === 0 ? 1.25 : i % 3 === 1 ? 1.15 : 1.1)),
  image: "",
  packs: [pack, i % 2 ? "Pack of 2" : "Pack of 3"],
  prescription: category === "Prescription Medicines",
  featured: i % 3 === 0 || i < 8,
  visible: true,
  stock: 12 + ((i * 7) % 46),
  popularity: 100 - ((i * 11) % 90),
  description:
    "Product information is for demonstration purposes. Genuine product sourced from licensed pharmacies.",
}));

export const labTests = [
  { id: "cbc", name: "Complete Blood Count (CBC)", category: "Wellness", price: 349, mrp: 389, sample: "Blood", prep: "No special fasting required.", visible: true, description: "Complete Blood Count with 21 automated diagnostic parameters." },
  { id: "thyroid-profile", name: "Thyroid Profile Total (T3, T4, TSH)", category: "Hormones", price: 539, mrp: 609, sample: "Blood", prep: "Morning sample preferred.", visible: true, description: "Total Triiodothyronine (T3), Total Thyroxine (T4), and TSH." },
  { id: "lipid-profile", name: "Lipid Profile (Heart Care)", category: "Heart", price: 439, mrp: 499, sample: "Blood", prep: "10-12 hours fasting required.", visible: true, description: "Cholesterol, Triglycerides, HDL, LDL, and VLDL." },
  { id: "diabetes-screening", name: "HbA1c & Fasting Blood Sugar", category: "Metabolic", price: 499, mrp: 699, sample: "Blood", prep: "8 hours fasting required.", visible: true, description: "Average blood sugar levels over the past 3 months." },
  { id: "gold-full-body", name: "Comprehensive Gold Full Body Checkup", category: "Packages", price: 2499, mrp: 4998, sample: "Blood & Urine", prep: "10-12 hours fasting required.", visible: true, description: "78 critical diagnostic tests including Liver, Kidney, Lipid and Thyroid." },
  { id: "silver-package", name: "Good Health Silver Package", category: "Packages", price: 749, mrp: 1498, sample: "Blood & Urine", prep: "10 hours fasting required.", visible: true, description: "59 tests covering basic health parameters and wellness screening." },
  { id: "vitamin-profile", name: "Vitamin D & Vitamin B12 Profile", category: "Nutrition", price: 999, mrp: 1599, sample: "Blood", prep: "No special preparation required.", visible: true, description: "Evaluates Vitamin D 25-OH and Vitamin B12 levels." },
  { id: "liver-panel", name: "Liver Function Test (LFT)", category: "Wellness", price: 549, mrp: 799, sample: "Blood", prep: "Fasting not mandatory.", visible: true, description: "Bilirubin, SGOT, SGPT, Alkaline Phosphatase, Total Protein." },
];

export const specialties = [
  "General Physician",
  "Dermatology",
  "Pediatrics",
  "Gynecology",
  "Orthopedics",
  "Mental Wellness",
];

export const doctors = specialties.flatMap((specialty, i) =>
  [0, 1].map((j) => ({
    id: `doc-${i * 2 + j + 1}`,
    name: `Dr. ${["Sharma", "Verma", "Kapoor", "Iyer", "Patel", "Gupta", "Deshmukh", "Chopra", "Bose", "Mehta", "Reddy", "Nair"][i * 2 + j]}`,
    specialty,
    image: "",
    experience: `${8 + i * 2 + j} years experience`,
    languages: j ? "English, Hindi" : "English, Hindi, Marathi",
    fee: 299 + i * 50 + j * 100,
    slots: ["10:00 AM", "11:30 AM", "2:00 PM", "4:30 PM", "6:00 PM"].filter((_, k) => (k + j) % 4 !== 0),
    visible: true,
    description: "Verified MBBS, MD specialist practicing online consultation.",
  }))
);

export const articles = [
  {
    id: "balanced-wellness-routine",
    slug: "balanced-wellness-routine",
    title: "Building a balanced everyday wellness routine",
    category: "Everyday Health",
    readingTime: 5,
    author: "Tata 1mg Editorial Team",
    date: "2026-10-10",
    featured: true,
    published: true,
    image: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=900&q=70",
    excerpt: "Practical tips to maintain everyday energy, immunity and restful sleep.",
    body: "Small consistent daily habits make a big difference in long-term wellness. Prioritize 7-8 hours of sleep, stay hydrated, and balance macro-nutrients.",
  },
  {
    id: "preventive-health-checks",
    slug: "preventive-health-checks",
    title: "Understanding the basics of preventive health checks",
    category: "Prevention",
    readingTime: 6,
    author: "Tata 1mg Editorial Team",
    date: "2026-10-05",
    featured: true,
    published: true,
    image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=900&q=70",
    excerpt: "Why regular pathology and screening tests help catch risks early.",
    body: "Preventive screening helps detect silent issues like elevated lipid levels, fatty liver or pre-diabetes before symptoms occur.",
  },
  {
    id: "reading-product-labels",
    slug: "reading-product-labels",
    title: "A practical guide to reading product labels & dosage",
    category: "Wellness",
    readingTime: 4,
    author: "Tata 1mg Editorial Team",
    date: "2026-09-28",
    featured: true,
    published: true,
    image: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=900&q=70",
    excerpt: "How to interpret active ingredients, expiry dates, and warning labels.",
    body: "Check the active pharmaceutical ingredient (API) and verify storage instructions to ensure efficacy throughout shelf life.",
  },
];

export const offers = [
  { id: "CAREPLAN5", code: "CAREPLAN5", label: "Care Plan Extra 5%", type: "percent", value: 5, minimum: 199, validFrom: "2026-01-01", validTo: "2026-12-31", active: true, description: "5% extra discount for Care Plan members." },
  { id: "TATA25", code: "TATA25", label: "Tata 1mg Quick Buy", type: "percent", value: 25, minimum: 499, validFrom: "2026-01-01", validTo: "2026-12-31", active: true, description: "Get up to 25% off on first medicine order." },
  { id: "LAB50", code: "LAB50", label: "Diagnostic Health 50%", type: "percent", value: 50, minimum: 749, validFrom: "2026-01-01", validTo: "2026-12-31", active: true, description: "50% off full body health checkups." },
  { id: "CASHBACK75", code: "CASHBACK75", label: "Amazon Pay Cashback", type: "fixed", value: 75, minimum: 499, validFrom: "2026-01-01", validTo: "2026-12-31", active: true, description: "Flat ₹75 cashback with Amazon Pay." },
];

export const faqs = [
  { id: "faq-1", question: "How do I upload a prescription on Tata 1mg?", answer: "Click 'Quick order' or 'Upload prescription' in the navbar, select or drag your prescription image or PDF, and our pharmacists will review and prepare your order.", visible: true },
  { id: "faq-2", question: "Are diagnostic reports collected at home?", answer: "Yes, trained phlebotomists collect samples from your doorstep with 100% sterile precautions and send reports to your email within 24 hours.", visible: true },
  { id: "faq-3", question: "What benefits does Care Plan provide?", answer: "Care Plan members get an extra 5% discount on all orders, free delivery, zero processing fees, free lab test coupons, and priority doctor consultations.", visible: true },
  { id: "faq-4", question: "How can I order medicines on call?", answer: "You can dial our toll-free order number 1800-212-2323 or enter your mobile number in the bottom bar to receive an instant call back from our pharmacy team.", visible: true },
];

export const banners = [
  { id: "b1", title: "Comprehensive Health Checkups", text: "Up to 50% off full body packages with home sample collection.", href: "/lab-tests", coupon: "LAB50", validTo: "2026-12-31", tone: "navy", visible: true },
  { id: "b2", title: "Quick Buy Medicines", text: "Save up to 25% on authentic prescribed medicines.", href: "/medicines", coupon: "TATA25", validTo: "2026-12-31", tone: "teal", visible: true },
  { id: "b3", title: "Tata 1mg Care Plan", text: "Extra 5% savings on medicines + free rapid delivery.", href: "/offers", coupon: "CAREPLAN5", validTo: "2026-12-31", tone: "mint", visible: true },
];

const items = (ids) =>
  ids.map(([id, q]) => {
    const p = products.find((x) => x.id === id) || { name: "Medicine Item", price: 199 };
    return { id, name: p.name, price: p.price, quantity: q };
  });

export const orders = [
  { id: "ORD-26001", date: "2026-10-12", customer: "Demo User", status: "Delivered", items: items([["1MG-101", 2], ["1MG-102", 1]]), address: "Sector 29, Gurgaon 122001", total: 436 },
  { id: "ORD-26002", date: "2026-10-10", customer: "Demo User", status: "Shipped", items: items([["1MG-106", 1]]), address: "Sector 29, Gurgaon 122001", total: 823 },
];

export const bookings = [
  { id: "LAB-9001", date: "2026-10-15", time: "8:00 AM", patient: "Demo Patient", tests: ["Complete Blood Count (CBC)"], total: 349, status: "Scheduled" },
  { id: "LAB-9002", date: "2026-10-08", time: "9:30 AM", patient: "Demo Patient", tests: ["Lipid Profile"], total: 439, status: "Completed" },
];

export const appointments = [
  { id: "APT-8001", date: "2026-10-16", time: "11:30 AM", patient: "Demo Patient", doctor: "Dr. Sharma", specialty: "General Physician", type: "Video", status: "Scheduled" },
];

export const customers = [
  { id: "CUS-1", name: "Rohan Verma", email: "rohan@example.com", city: "Gurgaon", orders: 4, status: "Active" },
  { id: "CUS-2", name: "Ananya Patel", email: "ananya@example.com", city: "Delhi", orders: 2, status: "Active" },
];

export const navigation = [
  ["Medicines", "/medicines"],
  ["Lab Tests", "/lab-tests"],
  ["Consult Doctors", "/consult-doctor"],
  ["Cancer Care", "/healthcare/cancer-care"],
  ["Ayurveda", "/healthcare/ayurveda-products"],
  ["Care Plan", "/care-plan"],
  ["Offers", "/offers"],
  ["About", "/about"],
].map(([label, href], i) => ({ id: `nav-${i}`, label, href, visible: true }));

export const shortcuts = [
  ["Order Medicines", "Authentic medicines at best prices", "bottle", "/medicines"],
  ["Book Lab Tests", "Safe home sample collection", "lab", "/lab-tests"],
  ["Consult Doctors", "Connect with verified specialists", "steth", "/consult-doctor"],
  ["Cancer Care", "Specialized guidance & support", "heart", "/healthcare"],
  ["Ayurveda Products", "Pure herbal & Ayurvedic remedies", "leaf", "/healthcare/ayurveda-products"],
  ["Care Plan", "Extra savings & zero delivery fee", "sparkle", "/offers"],
].map(([title, text, icon, href], i) => ({ id: `sc-${i}`, title, text, icon, href, visible: true }));

export const trust = [
  ["Reliable & Verified", "Procured directly from licensed manufacturers and pharmacies.", "shield"],
  ["Secure Encrypted Platform", "128-bit SSL and PCI DSS compliant checkout security.", "package"],
  ["Affordable Healthcare", "Up to 50% discount on medicines and up to 80% on lab tests.", "tag"],
  ["1800+ Cities Nationwide", "Reliable doorstep delivery and certified phlebotomy.", "phone"],
].map(([title, text, icon], i) => ({ id: `tr-${i}`, title, text, icon }));

export const pages = [
  {
    id: "about",
    title: "About MEDITRUST LIFE SCIENCE PVT LTD",
    body: "MEDITRUST LIFE SCIENCE PVT LTD is a premier healthcare and pharmaceutical wellness company incorporated in Maharashtra, India. We are dedicated to providing accessible, high-quality, and authentic medicines, health supplements, diagnostic services, and wellness consultations.\n\nUnder the leadership of our registered directors, Ajay Kumar Pathri and Omkar Sanjay Telangi, we operate with uncompromised integrity, strict quality assurance, and customer-first care.",
  },
  { id: "privacy-policy", title: "Privacy Policy", body: "MEDITRUST LIFE SCIENCE PVT LTD takes data privacy seriously. All patient health records and prescriptions are strictly confidential, 128-bit encrypted, and shared only with licensed pharmacists and accredited testing labs." },
  { id: "terms", title: "Terms and Conditions", body: "By using MEDITRUST LIFE SCIENCE PVT LTD, you agree to comply with applicable healthcare regulations. All prescription medicines require a valid doctor's prescription." },
  { id: "shipping-policy", title: "Shipping Policy", body: "MEDITRUST provides standard and express delivery across Maharashtra and nationwide across 1800+ cities in India. Delivery fees are waived for orders above ₹499." },
  { id: "returns-policy", title: "Returns and Refunds", body: "Medicines and unopened health products can be returned within 7 days of delivery. Refunds are credited promptly to your original payment method." },
  { id: "careers", title: "Careers at MEDITRUST", body: "Join MEDITRUST LIFE SCIENCE PVT LTD in transforming healthcare delivery. Explore openings in pharmaceutical operations, technology, and customer care." },
  { id: "healthcare-disclaimer", title: "Healthcare Disclaimer", body: "The information on this platform is for educational purposes and should not be used as a substitute for professional medical advice, diagnosis, or treatment." },
];

export const defaultSettings = {
  announcement: "QUICK BUY! Get up to 25% off on medicines* | Order on call: +91 7276048377",
  announcementVisible: true,
  heroTitle: "MEDITRUST: India's Trusted Healthcare & Pharmacy Platform",
  heroSubtitle: "Your trusted health partner for medicines, diagnostics, consultations, and wellness products.",
  heroImage: "",
  heroPrimaryText: "Order Medicines",
  heroPrimaryHref: "/medicines",
  heroSecondaryText: "Book Lab Tests",
  heroSecondaryHref: "/lab-tests",
  companyName: company.name,
  logoText: company.logoText,
  phone: company.phone,
  email: company.email,
  address: company.address,
  footerText: "MEDITRUST LIFE SCIENCE PVT LTD is dedicated to providing authentic medicines, certified lab testing, and verified healthcare services.",
  disclaimer: "All medicines are dispensed in compliance with the Drugs and Cosmetics Act, 1940 and Drugs and Cosmetics Rules, 1945. We do not process requests for Schedule X and habit forming drugs.",
  primaryColor: "#ff6f61",
  location: "Gurgaon",
  social: {
    facebook: "https://facebook.com/1mgOfficial",
    instagram: "https://instagram.com/1mgofficial",
    x: "https://twitter.com/1mgofficial",
    youtube: "https://youtube.com/1mgofficial",
    linkedin: "https://linkedin.com/company/1mg",
  },
  sections: {
    shortcuts: true,
    categories: true,
    featured: true,
    promos: true,
    labs: true,
    doctors: true,
    trust: true,
    articles: true,
    newsletter: true,
  },
};

/* ---------------- AYURVEDA PAGE DATA ---------------- */
export const ayurvedaFeaturedHerbs = [
  { id: "ashwagandha", name: "Ashwagandha", subtitle: "Immunity & Stress Relief", img: "/images/ayurveda/herb_ashwagandha.png", desc: "Adaptogenic herb that boosts stamina, cognitive focus and vitality." },
  { id: "shilajit", name: "Shilajit", subtitle: "Stamina & Energy", img: "/images/ayurveda/herb_shilajit.png", desc: "Rich in fulvic acid and 84+ minerals for vigor and endurance." },
  { id: "giloy", name: "Giloy", subtitle: "Fever & Immunity", img: "/images/ayurveda/herb_giloy.png", desc: "Known as Amrita; purifies blood and fights recurring fevers." },
  { id: "amla", name: "Amla", subtitle: "Vitamin C & Digestion", img: "/images/ayurveda/herb_amla.png", desc: "Richest natural source of Vitamin C for radiant skin and hair." },
  { id: "isabgol", name: "Isabgol", subtitle: "Digestion & Regularity", img: "/images/ayurveda/herb_isabgol.png", desc: "Natural dietary fiber that promotes healthy bowel movements." },
  { id: "turmeric", name: "Turmeric", subtitle: "Joints & Antioxidant", img: "/images/ayurveda/herb_turmeric.png", desc: "Potent curcumin for inflammation support and immunity." },
  { id: "shatavari", name: "Shatavari", subtitle: "Women's Health", img: "/images/ayurveda/herb_shatavari.png", desc: "Nourishes the female reproductive system and balances hormones." },
];

export const ayurvedaSkinHerbs = [
  { id: "aloe-vera", name: "Aloe Vera", subtitle: "Skin Hydration", img: "/images/ayurveda/skin_aloe_vera.png", desc: "Soothes irritated skin and hydrates deeply." },
  { id: "honey", name: "Honey", subtitle: "Natural Glow", img: "/images/ayurveda/skin_honey.png", desc: "Natural humectant packed with antimicrobial properties." },
  { id: "turmeric-skin", name: "Turmeric", subtitle: "Blemish Control", img: "/images/ayurveda/skin_turmeric_skin.png", desc: "Combats acne, clears scars and brightens skin complexion." },
  { id: "coconut", name: "Coconut", subtitle: "Deep Nourishment", img: "/images/ayurveda/skin_coconut.png", desc: "Healthy fatty acids that restore moisture and barrier health." },
  { id: "grapes", name: "Grapes", subtitle: "Anti-Aging Support", img: "/images/ayurveda/skin_grapes.png", desc: "High in resveratrol to defend against free radicals." },
  { id: "tulsi", name: "Tulsi", subtitle: "Purifying & Clear Skin", img: "/images/ayurveda/skin_tulsi.png", desc: "Detoxifies skin pores and soothes environmental redness." },
  { id: "papaya", name: "Papaya", subtitle: "Gentle Exfoliation", img: "/images/ayurveda/skin_papaya.png", desc: "Contains papain enzyme to remove dead skin cells naturally." },
];

export const ayurvedaDigestiveHerbs = [
  { id: "alsi", name: "Alsi (Flaxseeds)", subtitle: "Fiber & Omega-3", img: "/images/ayurveda/digest_alsi.png", desc: "Rich in soluble fiber that supports gut microbiome balance." },
  { id: "ginger", name: "Ginger (Adrak)", subtitle: "Nausea & Bloating", img: "/images/ayurveda/digest_ginger.png", desc: "Stimulates digestive fire (Agni) and eases gut cramps." },
  { id: "dhania", name: "Dhania (Coriander)", subtitle: "Cooling & Acidity", img: "/images/ayurveda/digest_dhania.png", desc: "Soothes acid reflux and cools gastrointestinal heat." },
  { id: "fennel", name: "Fennel (Saunf)", subtitle: "Post-Meal Freshness", img: "/images/ayurveda/digest_fennel.png", desc: "Relieves gas and helps in natural digestive enzyme secretion." },
  { id: "bael", name: "Bael Fruit", subtitle: "Bowel Regularity", img: "/images/ayurveda/digest_bael.png", desc: "Traditional remedy for chronic constipation and IBS." },
  { id: "hing", name: "Hing (Asafoetida)", subtitle: "Gas Relief", img: "/images/ayurveda/digest_hing.png", desc: "Fast-acting anti-flatulent spice for stomach bloating." },
  { id: "pudina", name: "Pudina (Mint)", subtitle: "Soothing Stomach", img: "/images/ayurveda/digest_pudina.png", desc: "Cools internal warmth and relieves indigestion." },
];

export const ayurvedaHairHerbs = [
  { id: "onion", name: "Onion Seed Oil", subtitle: "Hair Fall Defense", img: "/images/ayurveda/hair_onion.png", desc: "Sulfur-rich formula that boosts blood circulation to scalp roots." },
  { id: "bhringraj", name: "Bhringraj", subtitle: "Keshraj (King of Hair)", img: "/images/ayurveda/hair_bhringraj.png", desc: "Traditional Ayurvedic herb that strengthens follicular roots." },
  { id: "shikakai", name: "Shikakai", subtitle: "Gentle Cleanser", img: "/images/ayurveda/hair_shikakai.png", desc: "Natural shampoo alternative that balances scalp sebum." },
  { id: "mehendi", name: "Mehendi (Henna)", subtitle: "Conditioner & Shine", img: "/images/ayurveda/hair_mehendi.png", desc: "Conditions hair cuticles and prevents premature greying." },
  { id: "tea-tree", name: "Tea Tree", subtitle: "Anti-Dandruff", img: "/images/ayurveda/hair_tea_tree.png", desc: "Clears fungal buildup and soothes itchy, flaking scalp." },
  { id: "brahmi", name: "Brahmi", subtitle: "Calming Scalp Care", img: "/images/ayurveda/hair_brahmi.png", desc: "Strengthens hair shafts and calms nervous tension." },
  { id: "reetha", name: "Reetha", subtitle: "Natural Foaming Wash", img: "/images/ayurveda/hair_reetha.png", desc: "Herbal saponin cleanser that adds voluminous bounce." },
];

export const ayurvedaAZDirectory = [
  { letter: "A", name: "Ashwagandha", botName: "Withania somnifera", benefits: "Stress, Immunity, Stamina", thumb: "/images/ayurveda/herb_ashwagandha.png" },
  { letter: "A", name: "Amla", botName: "Phyllanthus emblica", benefits: "Vitamin C, Digestion, Eyesight", thumb: "/images/ayurveda/herb_amla.png" },
  { letter: "A", name: "Arjuna", botName: "Terminalia arjuna", benefits: "Heart Health, Blood Pressure", thumb: "/images/ayurveda/az_thumb_0.png" },
  { letter: "B", name: "Brahmi", botName: "Bacopa monnieri", benefits: "Memory, Cognitive Health, Calmness", thumb: "/images/ayurveda/hair_brahmi.png" },
  { letter: "B", name: "Bhringraj", botName: "Eclipta alba", benefits: "Hair Regrowth, Scalp Health", thumb: "/images/ayurveda/hair_bhringraj.png" },
  { letter: "B", name: "Bael", botName: "Aegle marmelos", benefits: "Gut Health, Ulcers, Bowel Ease", thumb: "/images/ayurveda/digest_bael.png" },
  { letter: "C", name: "Celery", botName: "Apium graveolens", benefits: "Digestion, Water Balance", thumb: "/images/ayurveda/celery.png" },
  { letter: "C", name: "Chitrak", botName: "Plumbago zeylanica", benefits: "Digestive Fire, Metabolism", thumb: "/images/ayurveda/az_thumb_1.png" },
  { letter: "G", name: "Giloy", botName: "Tinospora cordifolia", benefits: "Fever, Platelets, Immunity", thumb: "/images/ayurveda/herb_giloy.png" },
  { letter: "G", name: "Green Tea", botName: "Camellia sinensis", benefits: "Antioxidants, Metabolism", thumb: "/images/ayurveda/greentea.png" },
  { letter: "K", name: "Kachnar", botName: "Bauhinia variegata", benefits: "Lymphatic Health, Thyroid Balance", thumb: "/images/ayurveda/kachnar.png" },
  { letter: "L", name: "Lemon", botName: "Citrus limon", benefits: "Detoxification, Vitamin C", thumb: "/images/ayurveda/lemon.png" },
  { letter: "M", name: "Mahasudarshan", botName: "Polyherbal Compound", benefits: "Acute & Chronic Fevers, Malaise", thumb: "/images/ayurveda/mahasudarshan.png" },
  { letter: "P", name: "Plum", botName: "Prunus domestica", benefits: "Antioxidants, Bone Health", thumb: "/images/ayurveda/plum.png" },
  { letter: "S", name: "Shilajit", botName: "Asphaltum punjabianum", benefits: "Stamina, Vitality, Minerals", thumb: "/images/ayurveda/herb_shilajit.png" },
  { letter: "S", name: "Shatavari", botName: "Asparagus racemosus", benefits: "Hormonal Balance, Lactation", thumb: "/images/ayurveda/herb_shatavari.png" },
  { letter: "T", name: "Turmeric", botName: "Curcuma longa", benefits: "Curcumin, Joints, Inflammation", thumb: "/images/ayurveda/herb_turmeric.png" },
  { letter: "T", name: "Tulsi", botName: "Ocimum sanctum", benefits: "Respiratory Relief, Immunity", thumb: "/images/ayurveda/skin_tulsi.png" },
];

/* ---------------- CONSULT DOCTOR DATA ---------------- */
export const consultTrustPillars = [
  {
    title: "100% Confidential",
    desc: "All advice & consultations are completely confidential. You can also delete chats whenever you want.",
    iconImg: "/images/consult_doctor/pillar_confidential.png",
  },
  {
    title: "Certified Doctors",
    desc: "We offer quality healthcare through our network of certified and experienced doctors.",
    iconImg: "/images/consult_doctor/pillar_certified.png",
  },
  {
    title: "Convenience",
    desc: "Forget the hassle of long queues and rush hour. Seek expert opinion anytime, anywhere.",
    iconImg: "/images/consult_doctor/pillar_convenience.png",
  },
  {
    title: "Cost Effective",
    desc: "We provide medical assistance on non urgent queries for free. Fee starting at ₹50 for faster response to queries.",
    iconImg: "/images/consult_doctor/pillar_cost_effective.png",
  },
];

export const consultFaqs = [
  {
    q: "When will I get an answer to my query? What happens if I don't get a response?",
    a: "Usually you get connected to a verified doctor within 15-30 minutes of booking. In rare cases of high demand or doctor unavailability, we automatically assign your query to the next available specialist or offer a 100% instant refund or reschedule.",
  },
  {
    q: "Who are the consulting doctors?",
    a: "All consulting doctors on our panel are verified medical specialists (MBBS, MD, MS, DNB) registered with the Medical Council of India (MCI) or State Medical Councils with extensive clinical practice.",
  },
  {
    q: "Will the doctor be able to resolve my issue?",
    a: "Our doctors can evaluate symptoms, guide treatments, suggest diagnostic lab tests, and issue digital prescriptions for non-emergency healthcare needs. For critical emergencies, we advise visiting the nearest emergency department.",
  },
  {
    q: "Is my consultation private with my doctor?",
    a: "Yes, 100%. All chats, calls, medical history, and prescriptions are end-to-end encrypted and strictly compliant with Indian Telemedicine Practice Guidelines. You also have full control to delete chat records.",
  },
  {
    q: "For how long is the consultation valid?",
    a: "Each consultation includes a free follow-up window for 3 days where you can ask further questions and share test reports with the same doctor at zero extra charge.",
  },
  {
    q: "Do you have a refund policy?",
    a: "Yes. If a doctor fails to connect within the promised time frame or if you are unsatisfied with the session, you can request an instant full refund.",
  },
];

export const consultTestimonials = [
  {
    name: "Aarohi",
    role: "Patient",
    text: "I installed the app and went for a free consultation with a dietician. The advice given by Dr. Mirza was simply great. He shared a detailed diet chart and exercises with me which was easy to incorporate into my hectic schedule.",
  },
  {
    name: "Dr. Neha Kulkarni",
    role: "Verified Consultant",
    text: "MEDITRUST has simplified tele-consultations for patients across tier 1 and tier 2 cities. Patients get prompt, accurate medical advice without the stress of traveling.",
  },
];

/* ---------------- PARTNERSHIPS PAGE DATA ---------------- */
export const partnerSolutions = [
  {
    id: "epharmacy",
    title: "ePharmacy Solutions",
    subtitle: "Pan-India Genuine Medicine Fulfillment",
    desc: "Comprehensive supply chain covering 24,000+ pincodes with temperature-controlled logistics, barcoded tracking, and 100% genuine inventory.",
    img: "/images/partnerships/sol_card_epharmacy.png",
    points: ["Automated electronic batch verification", "Same-day and next-day express fulfillment", "API integration for hospital OPD desks"],
  },
  {
    id: "ediagnostics",
    title: "eDiagnostics Network",
    subtitle: "NABL & CAP Certified Diagnostic Labs",
    desc: "Complete pathology and radiology network offering home sample collections, AI-assisted reporting, and seamless enterprise health screening drives.",
    img: "/images/partnerships/sol_card_ediagnostics.png",
    points: ["Smart temperature cold-box logistics", "Standardized phlebotomy protocols", "Direct digital report integration to patient EHR"],
  },
  {
    id: "econsultations",
    title: "eConsultations Suite",
    subtitle: "24x7 Multi-Specialty Telehealth Infrastructure",
    desc: "Scalable tele-consultation platform connecting your members and employees to 3,000+ top doctors across 25+ medical disciplines.",
    img: "/images/partnerships/sol_card_econsultations.png",
    points: ["Video, Voice, and WhatsApp chat support", "Custom enterprise branded portals", "Integrated e-Prescription with medicine auto-order"],
  },
];

export const partnerStats = [
  { label: "Pincodes Covered", value: "24,000+" },
  { label: "Certified Test Centres", value: "800+" },
  { label: "Orders Fulfilled", value: "65 Million+" },
  { label: "Monthly Healthcare Visitors", value: "260 Million+" },
];
