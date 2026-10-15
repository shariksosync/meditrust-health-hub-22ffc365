import { useState } from "react";
import { company } from "../data/demo";

export function CancerCare() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [contactForm, setContactForm] = useState({ name: "", phone: "", cancerType: "Breast Cancer", message: "" });

  const navLinks = [
    { label: "Home", href: "#hero" },
    { label: "Cancer Specialists", href: "#specialists" },
    { label: "Financial Assistance", href: "#financial" },
    { label: "Patient Support Program", href: "#psp" },
    { label: "NGOs", href: "#ngos" },
    { label: "Cancer Types", href: "#cancer-types" },
    { label: "Causes & Prevention", href: "#causes" },
  ];

  const accessCards = [
    {
      id: "specialists",
      title: "CANCER SPECIALISTS",
      desc: "Connect with accredited oncologists, onco-surgeons & cancer care experts across top hospitals in India.",
      tag: "500+ Verified Doctors",
      icon: "🩺",
      cta: "Find Specialists",
      bgGradient: "from-[#29323c] to-[#485563]",
      border: "border-slate-700",
      accent: "text-amber-400",
    },
    {
      id: "financial",
      title: "FINANCIAL ASSISTANCE",
      desc: "Navigate subsidies, government health schemes (Ayushman Bharat, PMNRF, RAN), and crowd-funding options.",
      tag: "Save up to 70% on Treatment",
      icon: "💳",
      cta: "Explore Aid Schemes",
      bgGradient: "from-[#1e3c72] to-[#2a5298]",
      border: "border-blue-900",
      accent: "text-cyan-300",
    },
    {
      id: "psp",
      title: "PATIENT SUPPORT PROGRAMS",
      desc: "Comprehensive pharmaceutical and clinic-backed care programs providing subsidized medications & counseling.",
      tag: "Doorstep Support",
      icon: "🤝",
      cta: "Access Care Programs",
      bgGradient: "from-[#093637] to-[#44a08d]",
      border: "border-emerald-800",
      accent: "text-emerald-300",
    },
    {
      id: "ngos",
      title: "CANCER NGOs",
      desc: "Empowering partner non-profit organizations offering accommodation, emotional support, and nutrition aid.",
      tag: "100+ Partner Non-Profits",
      icon: "🎗️",
      cta: "Locate Partner NGOs",
      bgGradient: "from-[#4a1236] to-[#721b47]",
      border: "border-rose-900",
      accent: "text-rose-300",
    },
  ];

  const cancerTypes = [
    {
      name: "Breast Cancer",
      incidence: "Most prevalent in Indian women",
      symptoms: "Lump in breast or underarm, thickening, nipple discharge or skin dimpling",
      diagnostic: "Mammography, Ultrasound, Biopsy, BRCA Gene Testing",
      guidanceUrl: "https://www.meditrusts.life/health-articles/breast-cancer-guide",
      color: "border-pink-500/30 hover:border-pink-500",
      badgeColor: "bg-pink-950/60 text-pink-300 border-pink-700/50",
    },
    {
      name: "Lung Cancer",
      incidence: "Leading cause of cancer mortality",
      symptoms: "Persistent cough, coughing blood, chest pain, wheezing & hoarseness",
      diagnostic: "Low-Dose CT (LDCT), Sputum Cytology, Chest X-Ray",
      guidanceUrl: "https://www.meditrusts.life/health-articles/lung-cancer-guide",
      color: "border-sky-500/30 hover:border-sky-500",
      badgeColor: "bg-sky-950/60 text-sky-300 border-sky-700/50",
    },
    {
      name: "Oral & Head Neck",
      incidence: "Highly prevalent due to tobacco use",
      symptoms: "Non-healing mouth ulcers, red/white patches, persistent throat pain, swallowing difficulty",
      diagnostic: "Clinical Oral Exam, Endoscopy, Tissue Biopsy",
      guidanceUrl: "https://www.meditrusts.life/health-articles/oral-cancer-guide",
      color: "border-amber-500/30 hover:border-amber-500",
      badgeColor: "bg-amber-950/60 text-amber-300 border-amber-700/50",
    },
    {
      name: "Cervical Cancer",
      incidence: "2nd most common cancer in women",
      symptoms: "Unusual pelvic bleeding, pain during intercourse, persistent discharge",
      diagnostic: "PAP Smear Test, Liquid-based Cytology (LBC), HPV-DNA Screening",
      guidanceUrl: "https://www.meditrusts.life/health-articles/cervical-cancer-guide",
      color: "border-purple-500/30 hover:border-purple-500",
      badgeColor: "bg-purple-950/60 text-purple-300 border-purple-700/50",
    },
    {
      name: "Colorectal Cancer",
      incidence: "Increasing rapidly with modern lifestyles",
      symptoms: "Change in bowel habits, rectal bleeding, persistent abdominal cramps, unexplained fatigue",
      diagnostic: "Colonoscopy, Fecal Immunochemical Test (FIT), CEA Marker",
      guidanceUrl: "https://www.meditrusts.life/health-articles/colorectal-cancer-guide",
      color: "border-teal-500/30 hover:border-teal-500",
      badgeColor: "bg-teal-950/60 text-teal-300 border-teal-700/50",
    },
    {
      name: "Blood & Lymphoma",
      incidence: "Affects children and adults alike",
      symptoms: "Swollen painless lymph nodes, fever, night sweats, rapid weight loss, recurrent infections",
      diagnostic: "Complete Blood Count (CBC) with Peripheral Smear, Bone Marrow Aspiration, Flow Cytometry",
      guidanceUrl: "https://www.meditrusts.life/health-articles/blood-cancer-guide",
      color: "border-red-500/30 hover:border-red-500",
      badgeColor: "bg-red-950/60 text-red-300 border-red-700/50",
    },
  ];

  const causes = [
    {
      title: "Tobacco & Carcinogens",
      stat: "Responsible for ~40% of cancers in India",
      desc: "Smoking cigarettes, bidis, chewing gutkha, and passive smoke expose DNA to over 70 proven mutagens.",
      icon: "🚭",
    },
    {
      title: "Diet, Obesity & Sedentary Habits",
      stat: "Linked to 20-25% of adult cancer cases",
      desc: "Processed meats, high glycemic refined foods, and persistent systemic inflammation foster tumor microenvironments.",
      icon: "🥗",
    },
    {
      title: "Genetic Predispositions",
      stat: "5-10% inherited gene mutations",
      desc: "Alterations in BRCA1, BRCA2, TP53, and Lynch syndrome genes elevate susceptibility across generations.",
      icon: "🧬",
    },
    {
      title: "Viral & Bacterial Infections",
      stat: "Preventable through timely vaccines & hygiene",
      desc: "HPV (Human Papillomavirus), Hepatitis B & C viruses, and H. Pylori trigger cellular dysplasia if unaddressed.",
      icon: "🔬",
    },
  ];

  const statistics = [
    { number: "1.4M+", label: "New cancer cases detected annually in India", sub: "ICMR & National Cancer Registry data" },
    { number: "70%", label: "Cases diagnosed at advanced stages 3 & 4", sub: "Highlighting the urgency for early screening" },
    { number: "85%+", label: "5-year survival rate when detected at Stage 1", sub: "Early diagnosis saves lives" },
    { number: "100%", label: "Authentic, cold-chain chemotherapy medicines", sub: "Fulfilled by MEDITRUST LIFE SCIENCE" },
  ];

  const articles = [
    {
      title: "Understanding Cancer Staging: From Stage 0 to Stage IV",
      readTime: "5 min read",
      author: "Oncology Review Team",
      tag: "Basics & Staging",
      summary: "What TNM staging means, why biopsy precision dictates targeted therapies, and how prognosis improves with modern immunotherapy.",
    },
    {
      title: "Financial Planning & Government Schemes for Oncology",
      readTime: "7 min read",
      author: "Healthcare Economist",
      tag: "Aid & Schemes",
      summary: "Step-by-step roadmap to apply for the Health Minister's Discretionary Grant, PMNRF, and accessing low-cost generic oncology drugs.",
    },
    {
      title: "Managing Chemotherapy Side Effects: Nutrition & Mental Well-being",
      readTime: "6 min read",
      author: "Clinical Nutritionist",
      tag: "Patient Care",
      summary: "Practical dietary strategies to counter nausea, prevent neutropenia, and access compassionate patient counselor helplines.",
    },
  ];

  const handleContactSubmit = (e) => {
    e.preventDefault();
    if (!contactForm.name || !contactForm.phone) return;
    setContactSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#0d1117] text-gray-100 font-sans selection:bg-[#ff6f61] selection:text-white">
      {/* ---------------- CANCER CARE DEDICATED HEADER ---------------- */}
      <header className="sticky top-0 z-50 bg-[#161b22]/95 backdrop-blur-md border-b border-gray-800 shadow-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Left: Cancer Care Branding */}
            <div className="flex items-center gap-3">
              <a href="/cancer-care" className="flex items-center gap-2 group">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#724378] to-[#ff6f61] flex items-center justify-center text-white text-xl font-black shadow-lg shadow-purple-900/30 group-hover:scale-105 transition-transform">
                  🎗️
                </div>
                <div className="flex flex-col">
                  <span className="text-lg sm:text-xl font-extrabold tracking-tight text-white flex items-center gap-1.5">
                    MEDITRUST <span className="text-[#ff6f61]">CANCER CARE</span>
                  </span>
                  <span className="text-[10px] text-gray-400 font-medium tracking-wide">
                    Comprehensive Oncology & Patient Support Network
                  </span>
                </div>
              </a>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-1 xl:space-x-4">
              {navLinks.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="px-3 py-1.5 text-xs font-semibold text-gray-300 hover:text-amber-400 transition-colors rounded-md hover:bg-white/5"
                >
                  {item.label}
                </a>
              ))}
            </nav>

            {/* Right: Emergency Helpline Button & Phone */}
            <div className="hidden sm:flex items-center gap-3">
              <a
                href={`tel:${company.phone}`}
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-800/80 border border-gray-700 hover:border-gray-600 transition"
              >
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <div className="flex flex-col text-left">
                  <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Helpline 24x7</span>
                  <span className="text-xs font-bold text-white">{company.phone}</span>
                </div>
              </a>
              <a
                href="#consult-form"
                className="px-4 py-2 text-xs font-bold rounded-lg bg-gradient-to-r from-[#ff6f61] to-[#e64a19] text-white shadow-lg shadow-red-900/40 hover:brightness-110 active:scale-95 transition"
              >
                Request Callback
              </a>
            </div>

            {/* Mobile menu hamburger */}
            <div className="flex lg:hidden items-center gap-2">
              <a
                href={`tel:${company.phone}`}
                className="p-2 rounded-lg bg-gray-800 text-white text-xs font-bold"
                aria-label="Call helpline"
              >
                📞
              </a>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg bg-gray-800 text-gray-300 hover:text-white"
                aria-label="Toggle navigation menu"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {mobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile dropdown menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#1c2128] border-b border-gray-800 px-4 pt-2 pb-4 space-y-2">
            {navLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-md text-sm font-semibold text-gray-200 hover:bg-gray-800"
              >
                {item.label}
              </a>
            ))}
            <div className="pt-2 border-t border-gray-800">
              <a
                href="#consult-form"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-center w-full py-2.5 rounded-lg bg-[#ff6f61] text-white font-bold text-sm"
              >
                Request Free Callback
              </a>
            </div>
          </div>
        )}
      </header>

      {/* ---------------- HERO BANNER SECTION ---------------- */}
      <section id="hero" className="relative overflow-hidden bg-gradient-to-b from-[#1a1226] via-[#121620] to-[#0d1117] py-16 sm:py-24">
        {/* Subtle decorative background glow */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Heading & Key Value Proposition */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-900/50 border border-purple-700/50 text-purple-200 text-xs font-semibold">
                <span>🎗️</span>
                <span>Dedicated Oncology Care Network · India</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
                Accessible <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-300 to-amber-300">Cancer Care</span> for Everyone
              </h1>

              <p className="text-base sm:text-lg text-gray-300 leading-relaxed max-w-2xl">
                Tata 1mg & MEDITRUST LIFE SCIENCE are here to support cancer fighters and caregivers at every step.
                Explore verified <span className="text-amber-300 font-semibold">Cancer Specialists</span>,
                access <span className="text-cyan-300 font-semibold">Financial Assistance</span>, enroll in
                <span className="text-emerald-300 font-semibold"> Patient Support Programs</span>, and seek non-profit NGOs for patient advocacy.
              </p>

              {/* Trust highlights checklist */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                {[
                  { text: "Doorstep Medicine Delivery", icon: "✓" },
                  { text: "Accredited Lab Tests", icon: "✓" },
                  { text: "Patient Care Navigator", icon: "✓" },
                  { text: "Expert-Vetted Guidance", icon: "✓" },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs font-medium text-gray-300 bg-white/5 rounded-lg px-2.5 py-2 border border-white/5">
                    <span className="text-emerald-400 font-bold">{item.icon}</span>
                    <span>{item.text}</span>
                  </div>
                ))}
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-4 pt-4">
                <a
                  href="#specialists"
                  className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#724378] to-[#ff6f61] hover:opacity-95 text-white font-bold text-sm shadow-xl shadow-purple-950/50 transition-all hover:scale-[1.02] active:scale-95"
                >
                  Explore Cancer Care Resources
                </a>
                <a
                  href={`tel:${company.phone}`}
                  className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 text-white border border-white/20 font-bold text-sm transition-all"
                >
                  Call Helpline: {company.phone}
                </a>
              </div>
            </div>

            {/* Right Column: Hero Visual Graphic / Card */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md rounded-3xl bg-gradient-to-tr from-purple-950/80 via-slate-900 to-slate-900/90 border border-purple-500/30 p-6 sm:p-8 shadow-2xl backdrop-blur-sm">
                <div className="flex items-center justify-between pb-4 border-b border-gray-800">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-amber-400/20 text-amber-300 border border-amber-400/30 flex items-center justify-center text-2xl">
                      🛡️
                    </div>
                    <div>
                      <h3 className="font-bold text-white text-base">Cancer Care Navigator</h3>
                      <p className="text-xs text-gray-400">MEDITRUST Life Science Support</p>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    Live Support
                  </span>
                </div>

                <div className="py-6 space-y-4">
                  <div className="p-3.5 rounded-xl bg-black/40 border border-white/5 space-y-1">
                    <p className="text-xs font-semibold text-amber-300">Need Chemotherapy Medicines?</p>
                    <p className="text-xs text-gray-300">100% genuine cold-chain oncology drugs with patient assistance program benefits.</p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-black/40 border border-white/5 space-y-1">
                    <p className="text-xs font-semibold text-cyan-300">Second Opinions from Top Oncologists</p>
                    <p className="text-xs text-gray-300">Review pathology, biopsy, and PET-CT reports with medical, surgical, and radiation oncologists.</p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-black/40 border border-white/5 space-y-1">
                    <p className="text-xs font-semibold text-emerald-300">Financial Schemes & Aid</p>
                    <p className="text-xs text-gray-300">Assistance with Ranbaxy/Cipla/Roche PSP forms, PMNRF, and CSR funding.</p>
                  </div>
                </div>

                <a
                  href="#consult-form"
                  className="block text-center w-full py-3 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-gray-950 font-bold text-sm hover:brightness-105 active:scale-95 transition"
                >
                  Speak to an Oncology Care Expert
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- 4 MAJOR ACCESS CARDS GRID ---------------- */}
      <section id="access-grid" className="py-16 bg-[#11161d] border-y border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Four Pillars of Comprehensive Cancer Support
            </h2>
            <p className="mt-3 text-sm sm:text-base text-gray-400">
              We connect cancer fighters and their families to verified medical experts, subsidies, pharmaceutical assistance, and supportive NGOs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {accessCards.map((card) => (
              <div
                key={card.id}
                id={card.id}
                className={`relative rounded-2xl bg-gradient-to-b ${card.bgGradient} border ${card.border} p-6 flex flex-col justify-between shadow-xl transition-all duration-300 hover:-translate-y-1.5`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-3xl">{card.icon}</span>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-black/30 border border-white/10 text-white">
                      {card.tag}
                    </span>
                  </div>
                  <h3 className={`mt-5 text-lg font-black tracking-wide ${card.accent}`}>
                    {card.title}
                  </h3>
                  <p className="mt-2.5 text-xs text-gray-200 leading-relaxed">
                    {card.desc}
                  </p>
                </div>

                <div className="pt-6 mt-4 border-t border-white/10">
                  <a
                    href="#consult-form"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-white hover:underline group"
                  >
                    <span>{card.cta}</span>
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- CANCER TYPES OVERVIEW ---------------- */}
      <section id="cancer-types" className="py-16 sm:py-24 bg-[#0d1117]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-widest text-purple-400">Understanding Diseases</span>
              <h2 className="mt-1 text-2xl sm:text-4xl font-black text-white">
                Major Cancer Types & Clinical Guidance
              </h2>
              <p className="mt-2 text-sm text-gray-400 max-w-2xl">
                Recognizing symptoms early and undergoing precise histopathology tests significantly improves treatment efficacy and remissions.
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <a
                href="#consult-form"
                className="inline-flex items-center gap-2 text-xs font-bold text-amber-400 hover:text-amber-300"
              >
                <span>Get diagnostic guidance</span>
                <span>→</span>
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cancerTypes.map((cancer, idx) => (
              <div
                key={idx}
                className={`rounded-2xl bg-[#161b22] border ${cancer.color} p-6 flex flex-col justify-between transition-all duration-200 hover:shadow-2xl`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl font-bold text-white tracking-tight">{cancer.name}</h3>
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${cancer.badgeColor}`}>
                      {cancer.incidence}
                    </span>
                  </div>

                  <div className="space-y-3 pt-2 text-xs">
                    <div>
                      <span className="font-semibold text-gray-400 block mb-0.5">Common Symptoms:</span>
                      <p className="text-gray-200 leading-normal">{cancer.symptoms}</p>
                    </div>

                    <div>
                      <span className="font-semibold text-gray-400 block mb-0.5">Recommended Screening:</span>
                      <p className="text-cyan-300 font-mono text-[11px]">{cancer.diagnostic}</p>
                    </div>
                  </div>
                </div>

                <div className="pt-4 mt-6 border-t border-gray-800 flex items-center justify-between">
                  <a
                    href="#consult-form"
                    className="text-xs font-bold text-[#ff6f61] hover:text-amber-400 transition"
                  >
                    Consult Onco-Specialist →
                  </a>
                  <span className="text-[10px] text-gray-500">Stage I-IV Support</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- CANCER CAUSES SECTION ---------------- */}
      <section id="causes" className="py-16 bg-[#11161d] border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-400">Etiology & Risk Factors</span>
            <h2 className="mt-1 text-2xl sm:text-4xl font-extrabold text-white">
              Primary Causes of Cancer
            </h2>
            <p className="mt-3 text-sm text-gray-400">
              Up to 40% of cancers are preventable through risk avoidance, lifestyle interventions, and regular screenings.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {causes.map((c, i) => (
              <div key={i} className="rounded-2xl bg-[#161b22] border border-gray-800 p-6 space-y-3">
                <div className="text-4xl">{c.icon}</div>
                <h3 className="text-base font-bold text-white">{c.title}</h3>
                <span className="inline-block text-[11px] font-semibold text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 rounded px-2 py-0.5">
                  {c.stat}
                </span>
                <p className="text-xs text-gray-300 leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- STATISTICS & IMPACT SECTION ---------------- */}
      <section className="py-16 bg-gradient-to-r from-[#1c182a] via-[#161b22] to-[#1c182a] border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {statistics.map((s, idx) => (
              <div key={idx} className="space-y-1">
                <div className="text-3xl sm:text-5xl font-black text-amber-400 tracking-tight">
                  {s.number}
                </div>
                <div className="text-xs sm:text-sm font-bold text-white pt-1">
                  {s.label}
                </div>
                <div className="text-[11px] text-gray-400">
                  {s.sub}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- ARTICLES & PATIENT EDUCATION ---------------- */}
      <section className="py-16 bg-[#0d1117]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-widest text-[#ff6f61]">Clinical Knowledge</span>
              <h2 className="mt-1 text-2xl sm:text-4xl font-extrabold text-white">
                Vetted Oncology Insights & Caregiver Guides
              </h2>
            </div>
            <span className="text-xs text-gray-400 mt-2 md:mt-0">Reviewed by Oncology Specialists</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {articles.map((art, idx) => (
              <div key={idx} className="rounded-2xl bg-[#161b22] border border-gray-800 p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-[11px] text-gray-400 mb-3">
                    <span className="px-2 py-0.5 rounded bg-gray-800 text-purple-300 font-semibold">{art.tag}</span>
                    <span>{art.readTime}</span>
                  </div>
                  <h3 className="text-base font-bold text-white leading-snug hover:text-amber-300 transition">
                    {art.title}
                  </h3>
                  <p className="mt-2.5 text-xs text-gray-300 leading-relaxed">
                    {art.summary}
                  </p>
                </div>
                <div className="pt-4 mt-4 border-t border-gray-800 text-[11px] text-gray-400 flex items-center justify-between">
                  <span>By {art.author}</span>
                  <a href="#consult-form" className="text-amber-400 font-semibold hover:underline">Read Article →</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- CONTACT & CALLBACK FORM ---------------- */}
      <section id="consult-form" className="py-16 bg-[#11161d] border-t border-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-gradient-to-b from-[#1c2128] to-[#161b22] border border-gray-700/80 p-8 sm:p-12 shadow-2xl">
            <div className="text-center max-w-xl mx-auto space-y-2 mb-8">
              <span className="inline-block text-2xl">🤝</span>
              <h2 className="text-2xl sm:text-3xl font-black text-white">
                Connect with an Oncology Care Coordinator
              </h2>
              <p className="text-xs sm:text-sm text-gray-400">
                Share patient details confidentially. Our certified healthcare team will guide you on doctor consultations, genuine medicine access, and financial support.
              </p>
            </div>

            {contactSubmitted ? (
              <div className="p-8 rounded-2xl bg-emerald-950/60 border border-emerald-600/60 text-center space-y-3">
                <div className="w-12 h-12 mx-auto rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-2xl font-bold">
                  ✓
                </div>
                <h3 className="text-lg font-bold text-white">Care Request Submitted Successfully</h3>
                <p className="text-xs text-gray-300 max-w-md mx-auto">
                  Thank you, <span className="font-semibold text-white">{contactForm.name}</span>. An oncology coordinator from MEDITRUST LIFE SCIENCE will reach out to you at <span className="font-semibold text-white">{contactForm.phone}</span> shortly.
                </p>
                <div className="pt-2">
                  <a
                    href={`tel:${company.phone}`}
                    className="inline-block px-5 py-2.5 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-500 transition"
                  >
                    Or Call Immediately: {company.phone}
                  </a>
                </div>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1">Patient or Caregiver Name *</label>
                    <input
                      type="text"
                      required
                      value={contactForm.name}
                      onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                      placeholder="e.g. Ramesh Verma"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#0d1117] border border-gray-700 text-white text-xs focus:outline-none focus:border-amber-400 transition"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1">Mobile Contact Number *</label>
                    <input
                      type="tel"
                      required
                      value={contactForm.phone}
                      onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                      placeholder="e.g. +91 9876543210"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#0d1117] border border-gray-700 text-white text-xs focus:outline-none focus:border-amber-400 transition"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1">Cancer Type / Diagnosis</label>
                    <select
                      value={contactForm.cancerType}
                      onChange={(e) => setContactForm({ ...contactForm, cancerType: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#0d1117] border border-gray-700 text-white text-xs focus:outline-none focus:border-amber-400 transition"
                    >
                      <option>Breast Cancer</option>
                      <option>Lung Cancer</option>
                      <option>Oral / Head & Neck Cancer</option>
                      <option>Cervical Cancer</option>
                      <option>Colorectal / GI Cancer</option>
                      <option>Blood / Leukemia / Lymphoma</option>
                      <option>Prostate Cancer</option>
                      <option>Other / Unsure</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1">Required Support</label>
                    <select className="w-full px-3.5 py-2.5 rounded-xl bg-[#0d1117] border border-gray-700 text-white text-xs focus:outline-none focus:border-amber-400 transition">
                      <option>Oncologist Consultation / 2nd Opinion</option>
                      <option>Chemotherapy Medicine Supply</option>
                      <option>Financial Schemes / NGO Subsidy</option>
                      <option>Diagnostic PET-CT / Biopsy Booking</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">Additional Medical Context (Optional)</label>
                  <textarea
                    rows={3}
                    value={contactForm.message}
                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                    placeholder="Provide details such as disease stage, prescribed therapy, or city of residence..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#0d1117] border border-gray-700 text-white text-xs focus:outline-none focus:border-amber-400 transition"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#ff6f61] to-[#e64a19] text-white font-extrabold text-sm shadow-xl shadow-red-950/50 hover:brightness-110 active:scale-98 transition"
                  >
                    Request Confidential Oncology Callback
                  </button>
                  <p className="mt-2 text-center text-[11px] text-gray-500">
                    Your medical information is kept strictly confidential as per healthcare data protection laws.
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ---------------- DEDICATED CANCER CARE FOOTER ---------------- */}
      <footer className="bg-[#090d13] border-t border-gray-800 py-12 text-gray-400 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-gray-800">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#724378] flex items-center justify-center text-white text-base font-bold">
                🎗️
              </div>
              <span className="font-extrabold text-white text-base">
                MEDITRUST CANCER CARE
              </span>
            </div>
            <div className="flex flex-wrap gap-4 text-xs">
              <a href="#hero" className="hover:text-white transition">Back to Top</a>
              <a href="#specialists" className="hover:text-white transition">Specialists</a>
              <a href="#financial" className="hover:text-white transition">Financial Aid</a>
              <a href="#psp" className="hover:text-white transition">Patient Support</a>
              <a href="#cancer-types" className="hover:text-white transition">Cancer Types</a>
              <a href="/" className="hover:text-white text-amber-400 transition font-semibold">Return to Main Pharmacy ↗</a>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-[11px] leading-relaxed text-gray-500">
            <div>
              <p className="font-semibold text-gray-400 mb-1">{company.name}</p>
              <p>Directors: {company.directors.join(" & ")}</p>
              <p>Registered Office: {company.address}</p>
              <p>National Cancer Support Helpline: {company.phone}</p>
            </div>
            <div>
              <p className="font-semibold text-gray-400 mb-1">Medical Disclaimer</p>
              <p>
                The information provided on this platform is for educational and informational purposes only. It is not intended to replace professional medical advice, diagnosis, or treatment. Always seek the advice of your qualified oncologist or healthcare provider.
              </p>
            </div>
          </div>

          <div className="pt-4 text-center text-[10px] text-gray-600 border-t border-gray-900">
            © {new Date().getFullYear()} {company.name}. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
