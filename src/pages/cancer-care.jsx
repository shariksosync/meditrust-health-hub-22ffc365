import { useState } from "react";
import { company } from "../data/demo";

export function CancerCare() {
  const [financialDropdownOpen, setFinancialDropdownOpen] = useState(false);

  const topNavLinks = [
    { label: "Get Second Opinion", badge: "New", href: "/consult-doctor" },
    { label: "Find Cancer Specialists", href: "/consult-doctor" },
    { label: "Buy Cancer Medicines", href: "/medicines" },
    { label: "Book Tests for Cancer", href: "/lab-tests" },
    { label: "Get Financial Support", hasDropdown: true, href: "#financial" },
    { label: "Access NGOs", href: "#ngos" },
  ];

  const accessCards = [
    {
      title: "Get Second Opinion:",
      subtitle: "Tata Memorial Centre",
      badge: "NEW",
      img: "/images/cancer_care/access_navya.png",
      href: "/consult-doctor",
    },
    {
      title: "Find cancer specialists",
      img: "/images/cancer_care/access_specialists.png",
      href: "/consult-doctor",
    },
    {
      title: "Buy Cancer Medicines",
      img: "/images/cancer_care/access_medicines.png",
      href: "/medicines",
    },
    {
      title: "Get Financial Support",
      img: "/images/cancer_care/access_financial.png",
      href: "#financial",
    },
    {
      title: "Book Tests for Cancer",
      img: "/images/cancer_care/access_labtests.png",
      href: "/lab-tests",
    },
    {
      title: "Explore Patient Support Programs",
      img: "/images/cancer_care/access_psp.png",
      href: "#support-programs",
    },
    {
      title: "Access Cancer Care NGOs",
      img: "/images/cancer_care/access_ngos.png",
      href: "#ngos",
    },
  ];

  const cancerTypes = [
    {
      name: "Breast",
      type: "Cancer",
      iconSvg: (
        <svg className="w-12 h-12 text-[#1a6a67]" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="24" cy="14" r="6" />
          <path d="M16 28c0-4.4 3.6-8 8-8s8 3.6 8 8v12H16V28z" />
          <path d="M21 34c1.5 2 4.5 2 6 0" />
        </svg>
      ),
    },
    {
      name: "Blood",
      type: "Cancer",
      iconSvg: (
        <svg className="w-12 h-12 text-[#1a6a67]" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M24 6c-8 10-12 16-12 22a12 12 0 1 0 24 0c0-6-4-12-12-22z" />
          <path d="M20 28a4 4 0 0 0 4 4" />
        </svg>
      ),
    },
    {
      name: "Colon",
      type: "Cancer",
      iconSvg: (
        <svg className="w-12 h-12 text-[#1a6a67]" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="10" y="10" width="28" height="28" rx="8" />
          <path d="M16 18c4 0 4 4 8 4s4-4 8-4" />
          <path d="M16 30c4 0 4-4 8-4s4 4 8 4" />
        </svg>
      ),
    },
    {
      name: "Prostate",
      type: "Cancer",
      iconSvg: (
        <svg className="w-12 h-12 text-[#1a6a67]" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 10h12v12c0 6-6 10-6 10s-6-4-6-10V10z" />
          <path d="M14 22c-3 0-5 2-5 5s2 5 5 5" />
          <path d="M34 22c3 0 5 2 5 5s-2 5-5 5" />
        </svg>
      ),
    },
    {
      name: "Lung",
      type: "Cancer",
      iconSvg: (
        <svg className="w-12 h-12 text-[#1a6a67]" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M24 10v16" />
          <path d="M24 20c-4-4-10-4-13 1s-2 13 4 15 9-4 9-10" />
          <path d="M24 20c4-4 10-4 13 1s2 13-4 15-9-4-9-10" />
        </svg>
      ),
    },
    {
      name: "Multiple",
      type: "Myeloma",
      iconSvg: (
        <svg className="w-12 h-12 text-[#1a6a67]" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="24" cy="24" r="10" />
          <circle cx="24" cy="10" r="3" />
          <circle cx="24" cy="38" r="3" />
          <circle cx="10" cy="24" r="3" />
          <circle cx="38" cy="24" r="3" />
          <circle cx="14" cy="14" r="2" />
          <circle cx="34" cy="34" r="2" />
        </svg>
      ),
    },
    {
      name: "Kidney",
      type: "Cancer",
      iconSvg: (
        <svg className="w-12 h-12 text-[#1a6a67]" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M15 14c4-6 11-4 13 2s-1 14-6 16-10-4-10-10c0-3 1-6 3-8z" />
          <path d="M28 20c3 1 5 4 5 7" />
        </svg>
      ),
    },
    {
      name: "Cervical",
      type: "Cancer",
      iconSvg: (
        <svg className="w-12 h-12 text-[#1a6a67]" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 14c6-4 18-4 24 0" />
          <path d="M16 18c0 8 4 12 8 18 4-6 8-10 8-18" />
          <circle cx="24" cy="26" r="3" />
        </svg>
      ),
    },
  ];

  const expertArticles = [
    {
      img: "/images/cancer_care/article_myths.png",
      title: "Cancer symptoms & tests, common myths debunked",
      isVideo: true,
    },
    {
      img: "/images/cancer_care/article_covid.png",
      title: "COVID and cancer: Is the risk higher?",
      isVideo: true,
    },
    {
      img: "/images/cancer_care/article_breast.png",
      title: "What does breast cancer feel like?",
      isVideo: true,
    },
    {
      img: "/images/cancer_care/article_treated.png",
      title: "How can cancer be treated?",
      isVideo: true,
    },
    {
      img: "/images/cancer_care/article_walking.png",
      title: "Walking can help people with advanced cancer",
      isVideo: false,
    },
    {
      img: "/images/cancer_care/article_screening.png",
      title: "Breast cancer screening tests",
      isVideo: false,
    },
    {
      img: "/images/cancer_care/article_prostate.png",
      title: "5 causes and risk factors Of prostate cancer",
      isVideo: false,
    },
    {
      img: "/images/cancer_care/article_ovarian.png",
      title: "Ovarian cancer: Know everything",
      isVideo: false,
    },
  ];

  const whyChooseItems = [
    {
      title: "Quality care at reduced cost",
      desc: "We help reduce medicine, diagnostic, and consultation expenses through inexhaustible discounts and coupon codes. You can save up to 20% on medicines. Get access to exclusive membership of pharma-run campaigns.",
      img: "/images/cancer_care/why_reduced_cost.png",
    },
    {
      title: "Doorstep Services",
      desc: "Supporting caregivers through doorstep delivery of medicines, collection of test samples, online reports, online consultations and more.",
      img: "/images/cancer_care/why_doorstep.png",
    },
    {
      title: "Expert-vetted, evidence-driven information",
      desc: "Our team consists of medical experts, qualified doctors, pharmacists, and editors who have extensive experience and expertise in scientific research and medical writing. The medicine and health content that we publish is curated through a well-structured editorial and review process which includes an in-depth review by our Clinical Specialist Review Board.",
      img: "/images/cancer_care/why_expert_vetted.png",
    },
    {
      title: "In-app pill reminder",
      desc: "Given how crucial on-time medicine administration is, Tata 1mg pill reminder keeps track of when and what medicines need to be taken, so you never miss a dose.",
      img: "/images/cancer_care/why_pill_reminder.png",
    },
    {
      title: "Health Records",
      desc: "This in-app feature helps everyone — cancer patients as well as their caregivers — keep a log of their liver and kidney health, sugar levels, BP, and other parameters.",
      img: "/images/cancer_care/why_health_records.png",
    },
  ];

  return (
    <div className="min-h-screen bg-white text-[#212121] font-sans antialiased selection:bg-[#ff6f61] selection:text-white">
      {/* ---------------- 1. TOP STANDALONE NAVBAR (MATCHING SCREENSHOT 1) ---------------- */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Left: MEDITRUST Brand Logo */}
            <div className="flex items-center gap-3">
              <a href="/" className="flex items-center gap-2">
                <span className="text-2xl sm:text-3xl font-black tracking-tighter text-black flex items-center">
                  MEDITRUST <span className="text-[#ff6f61] ml-1.5 text-lg sm:text-xl font-bold tracking-normal uppercase">Cancer Care</span>
                </span>
              </a>
            </div>

            {/* Middle: Navigation Links matching screenshot */}
            <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8">
              {topNavLinks.map((item, idx) => (
                <div key={idx} className="relative">
                  {item.hasDropdown ? (
                    <button
                      onClick={() => setFinancialDropdownOpen(!financialDropdownOpen)}
                      className="flex items-center gap-1 text-[13px] font-medium text-gray-800 hover:text-[#ff6f61] transition-colors"
                    >
                      <span>{item.label}</span>
                      <svg className="w-3.5 h-3.5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                  ) : (
                    <a
                      href={item.href}
                      className="flex items-center gap-1.5 text-[13px] font-medium text-gray-800 hover:text-[#ff6f61] transition-colors"
                    >
                      <span>{item.label}</span>
                      {item.badge && (
                        <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-[#ff6f61] text-white leading-none">
                          {item.badge}
                        </span>
                      )}
                    </a>
                  )}

                  {item.hasDropdown && financialDropdownOpen && (
                    <div className="absolute left-0 mt-2 w-56 rounded-lg bg-white border border-gray-100 shadow-xl py-2 z-50">
                      <a href="#financial" onClick={() => setFinancialDropdownOpen(false)} className="block px-4 py-2 text-xs font-medium text-gray-700 hover:bg-[#fff3f2] hover:text-[#ff6f61]">
                        Government Schemes (PMNRF, RAN)
                      </a>
                      <a href="#financial" onClick={() => setFinancialDropdownOpen(false)} className="block px-4 py-2 text-xs font-medium text-gray-700 hover:bg-[#fff3f2] hover:text-[#ff6f61]">
                        Pharma Patient Assistance (PSP)
                      </a>
                      <a href="#financial" onClick={() => setFinancialDropdownOpen(false)} className="block px-4 py-2 text-xs font-medium text-gray-700 hover:bg-[#fff3f2] hover:text-[#ff6f61]">
                        Crowdfunding & NGO Grants
                      </a>
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* Right: Tata Trust Badge Logo */}
            <div className="flex items-center gap-2">
              <div className="flex flex-col items-center justify-center font-black text-black leading-tight text-right">
                <span className="text-[11px] tracking-widest uppercase">TATA</span>
                <span className="w-6 h-0.5 bg-black mt-0.5"></span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ---------------- 2. PINK HERO BANNER (MATCHING SCREENSHOT 1) ---------------- */}
      <section className="w-full bg-[#fce4ec] overflow-hidden">
        <div className="max-w-[1920px] mx-auto">
          <img
            src="/images/cancer_care/hero_banner_pink.png"
            alt="Conquer Cancer with Hope & Care - TATA 1mg Cancer Care"
            className="w-full h-auto object-cover max-h-[580px] shadow-sm"
          />
        </div>
      </section>

      {/* ---------------- 3. ACCESS TO QUALITY CANCER CARE DOES NOT OCCUR BY CHANCE (SCREENSHOT 1 & 2) ---------------- */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6">
          <div className="mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1f2937] tracking-tight">
              Access to quality cancer care does not occur by chance
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              {company.name} is here to support you and provide access to quality cancer care.
            </p>
          </div>

          {/* 7 Square Access Cards matching screenshot 2 */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4">
            {accessCards.map((card, idx) => (
              <a
                key={idx}
                href={card.href}
                className="group relative flex flex-col items-center text-center p-3 sm:p-4 rounded-xl bg-[#fbf5eb] hover:bg-[#f6edd9] border border-transparent hover:border-amber-200 transition-all duration-200"
              >
                {card.badge && (
                  <span className="absolute top-2 left-2 px-1.5 py-0.5 rounded text-[9px] font-black tracking-wider bg-[#ff6f61] text-white">
                    {card.badge}
                  </span>
                )}
                <div className="w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center mb-2 overflow-hidden">
                  <img
                    src={card.img}
                    alt={card.title}
                    className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform"
                  />
                </div>
                <h3 className="text-xs font-semibold text-gray-800 leading-snug group-hover:text-[#ff6f61] transition-colors">
                  {card.title}
                  {card.subtitle && (
                    <span className="block font-bold text-gray-900 mt-0.5">{card.subtitle}</span>
                  )}
                </h3>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- 4. MAJOR TYPES OF CANCER (SCREENSHOT 2 & 3) ---------------- */}
      <section id="cancer-types" className="py-12 sm:py-16 bg-[#eef7f6] border-t border-gray-100">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6">
          <div className="mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1f2937] tracking-tight">
              Major Types of Cancer
            </h2>
          </div>

          {/* 8 Cards in 2 rows of 4 matching screenshot 2 & 3 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {cancerTypes.map((c, idx) => (
              <div
                key={idx}
                className="rounded-xl bg-[#b5dfd9] p-5 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-lg bg-transparent flex items-center justify-center shrink-0">
                    {c.iconSvg}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#1a6a67] leading-none">
                      {c.name}
                    </h3>
                    <p className="text-sm font-semibold text-[#1a6a67] mt-0.5">
                      {c.type}
                    </p>
                  </div>
                </div>

                <div className="pt-5 mt-4 border-t border-[#9ecdc6] flex items-center justify-between text-xs font-semibold text-[#1a6a67]">
                  <a href={`/consult-doctor`} className="hover:underline">About</a>
                  <a href="#support-programs" className="hover:underline">Support Programs</a>
                  <a href="#ngos" className="hover:underline">NGOs</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- 5. WHAT CAUSES CANCER (SCREENSHOT 3 & 4) ---------------- */}
      <section className="py-16 sm:py-20 bg-[#b5dfd9] border-t border-[#a1d4cd]">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto text-left mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1f2937] tracking-tight">
              What Causes Cancer
            </h2>
            <p className="mt-3 text-sm sm:text-base text-gray-800 leading-relaxed">
              Cancer comprises a complex group of diseases with many possible causes. While genetics play a major role in cancer, other causes of cancer can differ between children and adults.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl mx-auto">
            {/* Childhood Cancers */}
            <div className="flex flex-col items-center text-center">
              <div className="w-36 h-36 rounded-full overflow-hidden mb-5 shadow-sm">
                <img
                  src="/images/cancer_care/cause_childhood.png"
                  alt="Childhood Cancers"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Childhood Cancers</h3>
              <p className="text-xs sm:text-sm text-gray-700 leading-relaxed max-w-sm">
                A mutation or cell change that just happened by chance is a common cause for cancer in children.
              </p>
            </div>

            {/* Adult Cancers */}
            <div className="flex flex-col items-center text-center">
              <div className="w-36 h-36 rounded-full overflow-hidden mb-5 shadow-sm">
                <img
                  src="/images/cancer_care/cause_adult.png"
                  alt="Adult Cancers"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Adult Cancers</h3>
              <p className="text-xs sm:text-sm text-gray-700 leading-relaxed max-w-sm">
                In addition to mutations, lifestyle factors like smoking, tobacco, an unhealthy diet, lack of physical activity, working with toxic chemicals, or exposure to certain viruses may put adults at risk for cancers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- 6. DID YOU KNOW? (SCREENSHOT 4 & 5) ---------------- */}
      <section className="py-16 sm:py-20 bg-[#f6e18f]">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-5xl mx-auto">
            {/* Left Card: Did you KNOW? with Lightbulb Illustration */}
            <div className="lg:col-span-7 bg-white rounded-2xl p-8 sm:p-10 shadow-sm relative min-h-[340px] flex flex-col justify-between">
              <div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#292929] mb-4">
                  Did you KNOW?
                </h2>
                <p className="text-sm text-gray-700 max-w-xs leading-relaxed">
                  Only <span className="font-bold text-gray-900">one out of four</span> patients who have been prescribed cancer medicines actually starts the treatment.
                </p>
              </div>

              {/* Hanging light bulb illustration */}
              <div className="absolute right-4 bottom-2 w-44 sm:w-56 h-auto pointer-events-none">
                <img
                  src="/images/cancer_care/did_you_know_bulb.png"
                  alt="Did you know bulb"
                  className="w-full h-auto object-contain"
                />
              </div>
            </div>

            {/* Right Card: Out-of-pocket discount with Get Here CTA */}
            <div className="lg:col-span-5 bg-white rounded-2xl p-8 sm:p-10 shadow-sm min-h-[340px] flex flex-col justify-between">
              <div>
                <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                  Out-of-pocket expenditure for cancer is one of the highest for any ailment. With MEDITRUST, you can reduce this expense by getting up to 20% OFF on your medicines.
                </p>
              </div>

              <div className="pt-6 flex justify-end">
                <a
                  href="/medicines"
                  className="inline-block px-7 py-3 rounded-lg bg-[#f0dba0] hover:bg-[#ebd28a] text-[#714d00] font-bold text-sm tracking-wide transition-all shadow-sm active:scale-95"
                >
                  Get Here
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- 7. CANCER IN INDIA STATS BANNER (SCREENSHOT 5, 6, 7) ---------------- */}
      <section className="w-full bg-black">
        {/* Top visual banner with 3D red blood cells and CANCER IN India */}
        <div className="w-full max-w-[1920px] mx-auto overflow-hidden">
          <img
            src="/images/cancer_care/cancer_in_india.png"
            alt="CANCER IN India"
            className="w-full h-auto object-cover max-h-[500px]"
          />
        </div>

        {/* Yellow Statistics Ribbon underneath matching screenshot 6 & 7 */}
        <div className="bg-[#f6e18f] py-10 sm:py-12 border-b border-amber-300">
          <div className="max-w-[1240px] mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div className="space-y-1">
                <h3 className="text-3xl sm:text-4xl font-extrabold text-[#292929] tracking-tight">
                  2,250,000+
                </h3>
                <p className="text-xs sm:text-sm text-gray-800 font-medium">
                  people are living with cancer
                </p>
              </div>

              <div className="space-y-1">
                <h3 className="text-3xl sm:text-4xl font-extrabold text-[#292929] tracking-tight">
                  1,150,000+
                </h3>
                <p className="text-xs sm:text-sm text-gray-800 font-medium">
                  people are diagnosed with cancer every year
                </p>
              </div>

              <div className="space-y-1">
                <h3 className="text-3xl sm:text-4xl font-extrabold text-[#292929] tracking-tight">
                  12%
                </h3>
                <p className="text-xs sm:text-sm text-gray-800 font-medium">
                  increase in cancer cases estimated between 2020–2025
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- 8. EMPOWERING YOU THROUGH INFORMATION (SCREENSHOT 7 & 8) ---------------- */}
      <section className="w-full bg-[#c3a0cc] overflow-hidden">
        <div className="max-w-[1920px] mx-auto">
          <img
            src="/images/cancer_care/empowering_you.png"
            alt="Empowering You Through Information"
            className="w-full h-auto object-cover max-h-[540px]"
          />
        </div>
      </section>

      {/* ---------------- 9. TRUST ONLY EVIDENCE DRIVEN MEDICAL INFORMATION (SCREENSHOT 8, 9, 10) ---------------- */}
      <section className="py-14 sm:py-20 bg-white">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6">
          <div className="mb-10">
            <p className="text-sm sm:text-base text-gray-700">
              We strongly believe that awareness is the key to manage cancer better.
            </p>
            <p className="text-sm sm:text-base text-gray-700 mb-4">
              Are you overwhelmed by information on the internet?
            </p>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#4907a3] tracking-tight">
              Trust only evidence driven medical information reviewed by experts
            </h2>
          </div>

          {/* 8 Expert Cards (4 videos top row, 4 articles bottom row) matching screenshot 9 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {expertArticles.map((item, idx) => (
              <a
                key={idx}
                href="/health-articles"
                className="group flex flex-col justify-between rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-200"
              >
                <div className="relative aspect-[16/10] bg-gray-100 overflow-hidden rounded-xl">
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {item.isVideo && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/10 group-hover:bg-black/20 transition-colors">
                      <div className="w-12 h-12 rounded-full bg-black/50 text-white flex items-center justify-center backdrop-blur-xs">
                        <svg className="w-5 h-5 fill-current ml-0.5" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                  )}
                </div>
                <div className="pt-3 pb-1">
                  <h3 className="text-sm font-semibold text-gray-800 leading-snug group-hover:text-[#4907a3] transition-colors">
                    {item.title}
                  </h3>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- 10. WHY CHOOSE MEDITRUST? / A POCKETFUL OF TRUST (SCREENSHOT 10, 11, 12) ---------------- */}
      <section className="py-16 sm:py-24 bg-[#b5dfd9] border-t border-[#a1d4cd]">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6">
          <div className="mb-12">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1f2937] tracking-tight">
              Why choose MEDITRUST?
            </h2>
            <p className="mt-1 text-base text-gray-800 font-medium">
              A pocketful of trust
            </p>
          </div>

          <div className="space-y-12 max-w-4xl">
            {whyChooseItems.map((item, idx) => (
              <div key={idx} className="flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-8">
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden shrink-0 shadow-sm bg-black">
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-800 leading-relaxed">
                    {item.desc.replace(/Tata 1mg/g, "MEDITRUST")}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- 11. POLICY STRIP & FOOTER (SCREENSHOT 12 & 13) ---------------- */}
      <footer className="bg-black text-gray-300">
        {/* Horizontal Policies Navigation Bar */}
        <div className="border-b border-gray-800 py-6">
          <div className="max-w-[1240px] mx-auto px-4 sm:px-6">
            <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs sm:text-sm font-semibold text-white">
              <a href="/privacy-policy" className="hover:text-[#ff6f61] transition">Privacy Policy</a>
              <span className="text-gray-600 hidden sm:inline">|</span>
              <a href="/terms" className="hover:text-[#ff6f61] transition">Terms and Conditions</a>
              <span className="text-gray-600 hidden sm:inline">|</span>
              <a href="/editorial-policy" className="hover:text-[#ff6f61] transition">Editorial Policy</a>
              <span className="text-gray-600 hidden sm:inline">|</span>
              <a href="/ip-policy" className="hover:text-[#ff6f61] transition">IP Policy</a>
              <span className="text-gray-600 hidden sm:inline">|</span>
              <a href="/grievance-policy" className="hover:text-[#ff6f61] transition">Grievance Redressal Policy</a>
            </div>
          </div>
        </div>

        {/* Medical Disclaimers and Client Credentials */}
        <div className="py-10 max-w-[1240px] mx-auto px-4 sm:px-6 space-y-6 text-xs text-gray-400 leading-relaxed">
          <p>
            All the information provided here is for informational and awareness purposes only. It should NOT be used as a substitute for the advice of a qualified physician. Please consult your doctor and discuss all your queries related to any disease or medicine.
          </p>
          <p>
            {company.name}'s sole intention is to support our consumers throughout their cancer journey, one step at a time. We have made all efforts to keep the information true to the best of our knowledge. However, this may not cover everything about particular health conditions, medicines, all ongoing patient support or access programs, eligibility criteria, alerts, etc. We are continuously working on updates, improvisations, and advancements.
          </p>

          <div className="pt-6 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="text-xl font-black text-white">
                MEDITRUST <span className="text-[#ff6f61]">Cancer Care</span>
              </span>
              <span className="text-gray-600">|</span>
              <span className="text-[11px] text-gray-400">
                {company.name} · {company.address}
              </span>
            </div>
            <div className="text-[11px] text-gray-500">
              © {new Date().getFullYear()} {company.name}. All rights reserved.
            </div>
          </div>
        </div>
      </footer>

      {/* ---------------- 12. FLOATING RED/CORAL HELPLINE PILL (VISIBLE IN ALL SCREENSHOTS) ---------------- */}
      <a
        href={`tel:${company.phone}`}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-5 py-3 rounded-full bg-[#f45647] hover:bg-[#ea4333] text-white font-bold text-sm shadow-2xl shadow-red-900/50 hover:scale-105 active:scale-95 transition-all"
        aria-label="Call Cancer Helpline"
      >
        <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
            <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.02-.24 11.72 11.72 0 003.68.59 1 1 0 011 1v3.5a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1 11.72 11.72 0 00.59 3.68 1 1 0 01-.24 1.02l-2.23 2.09z" />
          </svg>
        </div>
        <span className="tracking-wide">1800-102-1618</span>
      </a>
    </div>
  );
}
