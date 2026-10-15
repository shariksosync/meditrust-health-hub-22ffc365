import { useState } from "react";
import { company, partnerSolutions, partnerStats } from "../data/demo";
import { Icon } from "../components/ui";

export function PartnershipsPage() {
  const [activeTab, setActiveTab] = useState("hospital");
  const [solutionsDropdownOpen, setSolutionsDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    org: "",
    email: "",
    phone: "",
    service: "Hospital Pharmacy Integration",
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone) {
      alert("Please fill in your name, email and phone number.");
      return;
    }
    setSubmitted(true);
  };

  const solutionDropdownItems = [
    {
      title: "Corporate Wellness",
      iconName: "shield",
      desc: "Comprehensive employee wellness & health checks",
      tabKey: "corporate",
    },
    {
      title: "Hospital Services",
      iconName: "building-2",
      desc: "OPD pharmacy integration & 2-hr discharge delivery",
      tabKey: "hospital",
    },
    {
      title: "Patient Support Program",
      iconName: "users",
      desc: "Therapy adherence, counseling & financial assistance",
      tabKey: "patient-support",
    },
    {
      title: "Insurance",
      iconName: "shield-check",
      desc: "Cashless OPD, diagnostics & automated claims",
      tabKey: "insurance",
    },
    {
      title: "Strategic Partners",
      iconName: "handshake",
      desc: "Omnichannel health supply chain & telehealth",
      tabKey: "strategic",
    },
    {
      title: "Health Associates",
      iconName: "share-2",
      desc: "Independent franchise networks & clinics",
      tabKey: "strategic",
    },
    {
      title: "Advertise with us",
      iconName: "badge-percent",
      desc: "Reach 260M+ health-conscious monthly consumers",
      tabKey: "strategic",
    },
    {
      title: "Authorised Collection Centres",
      iconName: "map-pin",
      desc: "Diagnostic collection points across India",
      tabKey: "hospital",
    },
  ];

  return (
    <div className="min-h-screen bg-[#f8f9fa] text-[#181a1f] font-sans antialiased selection:bg-[#ff5443] selection:text-white flex flex-col justify-between">
      {/* ---------------- 1. DEDICATED FLOATING PILL NAVBAR (MATCHING SCREENSHOT 000809) ---------------- */}
      <header className="sticky top-0 z-50 pt-4 px-4 sm:px-6 pointer-events-none">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Left Pill: Brand Logo + Divider + Home + Our Solutions Dropdown */}
          <div className="pointer-events-auto flex items-center bg-white/95 backdrop-blur-md rounded-2xl sm:rounded-full px-5 py-2.5 shadow-md border border-gray-100 gap-4 sm:gap-6">
            <a href="/" className="flex items-center gap-2 group">
              <span className="text-xl sm:text-2xl font-black tracking-tight text-gray-900 group-hover:text-[#ff5443] transition">
                MEDITRUST
              </span>
              <span className="hidden sm:inline-block rounded-full bg-red-50 text-[#ff5443] px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wider">
                Partnerships
              </span>
            </a>

            <div className="hidden sm:block h-5 w-px bg-gray-200" />

            <nav className="hidden md:flex items-center gap-5 text-xs sm:text-sm font-bold text-gray-800">
              <a href="/partnerships" className="hover:text-[#ff5443] transition">
                Home
              </a>

              {/* Our Solutions Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setSolutionsDropdownOpen(true)}
                onMouseLeave={() => setSolutionsDropdownOpen(false)}
              >
                <button
                  type="button"
                  className="flex items-center gap-1.5 hover:text-[#ff5443] transition py-1"
                >
                  <span>Our Solutions</span>
                  <Icon
                    name="chevron-down"
                    size={14}
                    className={`transition-transform duration-200 ${
                      solutionsDropdownOpen ? "rotate-180 text-[#ff5443]" : "text-gray-400"
                    }`}
                  />
                </button>

                {solutionsDropdownOpen && (
                  <div className="absolute left-0 top-full mt-2 w-80 rounded-2xl border border-gray-100 bg-white p-3 shadow-2xl animate-in fade-in slide-in-from-top-2 duration-150">
                    <p className="px-3 py-1.5 text-[10px] font-extrabold tracking-wider text-gray-400 uppercase">
                      Enterprise Solutions
                    </p>
                    <div className="space-y-1">
                      {solutionDropdownItems.map((item, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => {
                            setActiveTab(item.tabKey);
                            setSolutionsDropdownOpen(false);
                            const el = document.getElementById("tailored-solutions");
                            if (el) el.scrollIntoView({ behavior: "smooth" });
                          }}
                          className="flex w-full items-center gap-3 rounded-xl p-2.5 text-left hover:bg-red-50/60 transition group"
                        >
                          <div className="h-8 w-8 rounded-lg bg-red-50/50 flex items-center justify-center p-1.5 border border-red-100/50 group-hover:bg-red-100/60 text-[#ff5443]">
                            <Icon name={item.iconName} size={16} />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="text-xs font-bold text-gray-900 group-hover:text-[#ff5443] transition truncate">
                              {item.title}
                            </p>
                            <p className="text-[10px] text-gray-500 truncate">{item.desc}</p>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </nav>
          </div>

          {/* Right Pill: About Us + Contact Us CTA Button */}
          <div className="pointer-events-auto flex items-center bg-white/95 backdrop-blur-md rounded-2xl sm:rounded-full px-4 sm:px-5 py-2 shadow-md border border-gray-100 gap-3 sm:gap-5">
            <a
              href="/about"
              className="hidden sm:inline-block text-xs sm:text-sm font-bold text-gray-800 hover:text-[#ff5443] transition"
            >
              About Us
            </a>

            <a
              href="#lead-form"
              className="rounded-full bg-gradient-to-r from-[#eb5b26] to-[#e4336f] px-5 sm:px-6 py-2 sm:py-2.5 text-xs sm:text-sm font-bold text-white shadow-md hover:opacity-95 transition hover:scale-105 active:scale-95"
            >
              Contact Us
            </a>

            {/* Mobile Hamburger */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-1.5 text-gray-700 hover:text-[#ff5443] transition"
              aria-label="Toggle menu"
            >
              <Icon name="menu" size={20} />
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="pointer-events-auto md:hidden max-w-7xl mx-auto mt-2 rounded-2xl bg-white p-4 shadow-2xl border border-gray-200 animate-in fade-in duration-150">
            <nav className="space-y-2">
              <a
                href="/partnerships"
                className="block px-3 py-2 text-sm font-bold text-gray-900 hover:bg-gray-50 rounded-lg"
              >
                Home
              </a>
              <a
                href="/about"
                className="block px-3 py-2 text-sm font-bold text-gray-900 hover:bg-gray-50 rounded-lg"
              >
                About Us
              </a>
              <a
                href="#tailored-solutions"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 text-sm font-bold text-gray-900 hover:bg-gray-50 rounded-lg"
              >
                Our Solutions
              </a>
              <a
                href="#lead-form"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 text-sm font-bold text-[#ff5443] hover:bg-red-50 rounded-lg"
              >
                Contact Us
              </a>
            </nav>
          </div>
        )}
      </header>

      {/* ---------------- 2. HERO SECTION WITH AUTHENTIC BACKGROUND SVGS ---------------- */}
      <section className="relative overflow-hidden min-h-[520px] sm:min-h-[620px] flex items-center justify-center bg-[#fdf5f3] -mt-16 sm:-mt-20 pt-20">
        <picture className="absolute inset-0 w-full h-full pointer-events-none">
          <source media="(max-width: 767px)" srcSet="/images/partnerships/hero_bg_mobile.png" />
          <source media="(min-width: 768px)" srcSet="/images/partnerships/hero_bg_desktop.png" />
          <img
            src="/images/partnerships/hero_bg_desktop.png"
            alt="Healthcare Partnerships Hero Background"
            className="w-full h-full object-cover opacity-90"
          />
        </picture>

        <div className="relative z-10 mx-auto max-w-4xl px-4 text-center py-16 sm:py-20">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-gray-900 tracking-tight leading-[1.15]">
            Let’s <span className="text-[#FF5443]">Empower </span>Healthcare <span className="text-[#FF5443]">Together</span>
          </h1>
          <p className="mt-5 text-sm sm:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Partner with India’s trusted healthcare platform to deliver care, enhance efficiency and improve health outcomes
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              href="#lead-form"
              className="rounded-xl bg-[#181a1f] px-8 py-3.5 text-xs sm:text-sm font-bold uppercase tracking-wider text-white shadow-xl hover:bg-black transition hover:scale-105 active:scale-95"
            >
              Know more about us
            </a>
            <a
              href="#tailored-solutions"
              className="rounded-xl border border-gray-300 bg-white/90 backdrop-blur-xs px-6 py-3.5 text-xs sm:text-sm font-bold text-gray-800 shadow-sm hover:bg-white transition"
            >
              Our Solutions
            </a>
          </div>
        </div>
      </section>

      {/* ---------------- 3. INTEGRATED HEALTHCARE PLATFORM & 3 PILLARS (BLENDED) ---------------- */}
      <section id="supportSection" className="py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid gap-10 lg:grid-cols-12 items-center">
            {/* Left Column: Heading + Supported By 3 Pillars */}
            <div className="lg:col-span-7 space-y-8">
              <div>
                <h2 className="text-2xl sm:text-4xl font-extrabold text-gray-900 leading-tight">
                  India’s Largest <span className="text-[#FF5443]">Integrated Healthcare Platform</span>
                </h2>
                <h3 className="mt-6 text-xs sm:text-sm font-bold text-gray-400 uppercase tracking-wider">
                  Supported by
                </h3>
              </div>

              <div className="space-y-8 sm:space-y-10">
                {/* ePharmacy */}
                <div className="space-y-3">
                  <div className="flex items-center gap-4">
                    <img
                      src="/images/partnerships/icon_epharmacy_new.png"
                      alt="ePharmacy"
                      className="h-10 w-10 sm:h-12 sm:w-12 object-contain"
                    />
                    <h4 className="text-xl sm:text-2xl font-medium text-gray-900">ePharmacy</h4>
                  </div>
                  <p className="text-sm sm:text-base text-gray-700 leading-relaxed max-w-xl">
                    Fast and reliable home delivery of genuine medicines and health essentials across 19000+ pincodes.
                  </p>
                </div>

                {/* eDiagnostics */}
                <div className="space-y-3">
                  <div className="flex items-center gap-4">
                    <img
                      src="/images/partnerships/icon_ediagnostics_new.png"
                      alt="eDiagnostics"
                      className="h-10 w-10 sm:h-12 sm:w-12 object-contain"
                    />
                    <h4 className="text-xl sm:text-2xl font-medium text-gray-900">eDiagnostics</h4>
                  </div>
                  <p className="text-sm sm:text-base text-gray-700 leading-relaxed max-w-xl">
                    Online lab test booking service with our certified labs, complete with convenient at-home sample collection and online reports.
                  </p>
                </div>

                {/* eConsultations */}
                <div className="space-y-3">
                  <div className="flex items-center gap-4">
                    <img
                      src="/images/partnerships/icon_econsultations_new.png"
                      alt="eConsultations"
                      className="h-10 w-10 sm:h-12 sm:w-12 object-contain"
                    />
                    <h4 className="text-xl sm:text-2xl font-medium text-gray-900">eConsultations</h4>
                  </div>
                  <p className="text-sm sm:text-base text-gray-700 leading-relaxed max-w-xl">
                    Immediate and free access to qualified doctors for virtual consultations.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column: Platform stats graphic (clean, blended, no box) */}
            <div className="lg:col-span-5 flex justify-center">
              <img
                src="/images/partnerships/support_platform.png"
                alt="India's largest integrated healthcare platform stats"
                className="w-full max-w-md object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-6 sm:py-10">
        {/* ---------------- 4. CORE ENTERPRISE SOLUTIONS (BLENDED) ---------------- */}
        <section>
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900">Enterprise Solutions Ecosystem</h2>
            <p className="mt-2 text-xs sm:text-sm text-gray-500">
              End-to-end digital infrastructure built for hospitals, clinical research, insurance companies, and wellness brands.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {partnerSolutions.map((sol) => (
              <div
                key={sol.id}
                className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xs hover:shadow-lg transition flex flex-col justify-between"
              >
                <div>
                  <div className="h-48 overflow-hidden bg-gray-100 border-b border-gray-100 flex items-center justify-center relative">
                    <img
                      src={sol.img}
                      alt={sol.title}
                      className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-6">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#ff5443]">
                      {sol.subtitle}
                    </span>
                    <h3 className="mt-1 text-lg font-bold text-gray-900">{sol.title}</h3>
                    <p className="mt-2 text-xs text-gray-600 leading-relaxed">{sol.desc}</p>

                    <ul className="mt-4 space-y-2 border-t border-gray-100 pt-3">
                      {sol.points.map((pt, pIdx) => (
                        <li key={pIdx} className="flex items-center gap-2 text-xs text-gray-700">
                          <Icon name="check" size={14} className="text-emerald-500 shrink-0" />
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <a
                    href="#lead-form"
                    className="block text-center rounded-lg bg-gray-900 py-2.5 text-xs font-bold uppercase text-white hover:bg-black transition"
                  >
                    Inquire For Collaboration
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ---------------- 6. TAILORED SECTOR SOLUTIONS TABS ---------------- */}
        <section id="tailored-solutions" className="mt-16 rounded-2xl bg-white border border-gray-200 p-6 sm:p-10 shadow-xs">
          <div className="text-center max-w-xl mx-auto mb-8">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
              Tailored <span className="text-[#FF5443]">Solutions</span> for Every Need
            </h2>
            <p className="mt-1 text-xs text-gray-500">Industry-specific healthcare architectures tailored to your operational models</p>
          </div>

          <div className="flex flex-wrap justify-center gap-2.5 border-b border-gray-200 pb-5">
            {[
              ["hospital", "Hospital Services", "building-2"],
              ["patient-support", "Patient Support Program", "users"],
              ["insurance", "Insurance", "shield-check"],
              ["corporate", "Corporate Wellness", "shield"],
              ["strategic", "Strategic Partners", "handshake"],
            ].map(([tabKey, tabLabel, tabIcon]) => (
              <button
                key={tabKey}
                onClick={() => setActiveTab(tabKey)}
                className={cx(
                  "flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition",
                  activeTab === tabKey
                    ? "bg-[#ff5443] text-white shadow-sm"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                )}
              >
                <Icon name={tabIcon} size={16} />
                <span>{tabLabel}</span>
              </button>
            ))}
          </div>

          <div className="mt-8 grid gap-8 lg:grid-cols-2 items-center">
            <div>
              <span className="text-xs font-bold text-[#ff5443] uppercase tracking-wider">Sector Focus</span>
              <h3 className="mt-1 text-xl font-bold text-gray-900">
                {activeTab === "hospital" && "Hospital Digital Pharmacy & Home Discharge Delivery"}
                {activeTab === "patient-support" && "Patient Support Programs (PSP) for Chronic Therapies"}
                {activeTab === "insurance" && "Cashless OPD, Diagnostic & Pharmacy Benefits Integration"}
                {activeTab === "corporate" && "Comprehensive Annual Health Checkups & Employee Care"}
                {activeTab === "strategic" && "Integrated Telehealth & Omnichannel Health Supply Chain"}
              </h3>
              <p className="mt-3 text-xs sm:text-sm text-gray-600 leading-relaxed">
                {activeTab === "hospital" && "Enable discharged patients to receive prescribed medicines at home within 2 hours. Seamless API integration with your hospital Information System (HIS) ensures zero stockouts, automated substitution checks, and real-time delivery tracking."}
                {activeTab === "patient-support" && "Dedicated patient counseling, financial assistance program management, and monthly medication compliance refills for cardiology, oncology, and endocrinology regimens."}
                {activeTab === "insurance" && "Direct cashless claim settlement for OPD prescriptions, home lab tests, and health supplements across India. Reduces administrative overhead with automated fraud-check algorithms."}
                {activeTab === "corporate" && "Custom wellness dashboards, ergonomic on-site biometric screening camps, annual health checkups, and corporate pharmacy discounts for teams of 50 to 50,000 employees."}
                {activeTab === "strategic" && "Co-branded digital storefronts, diagnostic kiosk deployment, and joint health programs powered by MEDITRUST infrastructure."}
              </p>

              <div className="mt-6 flex flex-wrap gap-4 text-xs font-semibold text-gray-800">
                <span className="inline-flex items-center gap-1.5 rounded-lg bg-gray-50 px-3 py-1.5 border border-gray-200">
                  <Icon name="check" size={14} className="text-emerald-500" /> ISO 9001 & 27001 Certified
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-lg bg-gray-50 px-3 py-1.5 border border-gray-200">
                  <Icon name="check" size={14} className="text-emerald-500" /> 100% Genuine Inventory
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-lg bg-gray-50 px-3 py-1.5 border border-gray-200">
                  <Icon name="check" size={14} className="text-emerald-500" /> Dedicated Account Manager
                </span>
              </div>
            </div>

            <div className="overflow-hidden rounded-xl border border-gray-200 shadow-sm bg-gray-50">
              <img
                src="/images/partnerships/sol_hospital_service.png"
                alt="Healthcare Architecture Solution"
                className="w-full h-80 object-cover rounded-xl"
              />
            </div>
          </div>
        </section>

        {/* ---------------- CREATING SUCCESS STORIES WITH OUR PARTNERS (NO BOX, BLENDED) ---------------- */}
        <section className="mt-16 py-6 overflow-hidden">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-2xl sm:text-4xl font-extrabold text-gray-900 tracking-tight text-center sm:text-left">
              Creating <span className="text-[#FF5443]">success stories</span> with <span className="text-[#FF5443]">our partners</span>
            </h2>
          </div>

          <div className="relative mt-8 w-full overflow-hidden mask-linear-gradient">
            <div className="flex w-max items-center gap-12 animate-marquee">
              <img
                src="/images/partnerships/seamless_brands_banner.png"
                alt="Partner Brands"
                className="h-16 sm:h-20 w-auto object-contain hover:scale-[1.02] transition-transform duration-300"
              />
              <img
                src="/images/partnerships/seamless_brands_banner.png"
                alt="Partner Brands Duplicate"
                className="h-16 sm:h-20 w-auto object-contain hover:scale-[1.02] transition-transform duration-300"
              />
              <img
                src="/images/partnerships/seamless_brands_banner.png"
                alt="Partner Brands Duplicate 2"
                className="h-16 sm:h-20 w-auto object-contain hover:scale-[1.02] transition-transform duration-300"
              />
            </div>
          </div>
        </section>

        {/* ---------------- A MESSAGE FROM OUR CEO ---------------- */}
        <section className="mt-16 rounded-2xl bg-white border border-gray-200 p-8 sm:p-12 shadow-xs overflow-hidden">
          <div className="grid gap-10 lg:grid-cols-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-5">
              <div>
                <h2 className="text-2xl sm:text-4xl font-extrabold text-gray-900 leading-tight">
                  A message from <span className="text-[#FF5443]">Our CEO</span>
                </h2>
                <p className="mt-2 text-sm sm:text-base font-semibold text-gray-500">
                  Leading with a vision and compassion
                </p>
              </div>

              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                We are driven by a singular mission to make high-quality healthcare understandable, accessible, and affordable for millions across India. In today’s fast-paced world, healthcare is not just limited to treatment; it’s about education, prevention, and proactive engagement. As we continue to innovate and expand, our commitment to excellence and integrity remains steadfast.
              </p>

              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                We are proud to partner with businesses - both established and emerging - that share our passion for making a meaningful impact. Together, we are transforming lives by delivering exceptional healthcare services that drive positive change.
              </p>

              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                To our current and future partners—your trust in {company.name} is what inspires us. Together, we can empower communities and revolutionise healthcare accessibility for a healthier tomorrow.
              </p>

              <div className="pt-2 border-t border-gray-100">
                <p className="text-xs font-medium text-gray-500">Warm regards,</p>
                <p className="mt-1 text-sm font-bold text-gray-900">{company.directors[0]}</p>
                <p className="text-xs text-gray-500">Chief Executive Officer</p>
              </div>
            </div>

            {/* Right Photo */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center">
              <div className="relative mx-auto w-64 sm:w-72 aspect-[4/5] rounded-3xl overflow-hidden shadow-xl border-4 border-white bg-gradient-to-b from-red-50 to-orange-100">
                <img
                  src="/images/partnerships/ceo_ajay_pathri.png"
                  alt={`${company.directors[0]} - Chief Executive Officer`}
                  className="w-full h-full object-cover object-top"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 text-white">
                  <p className="text-sm font-bold">{company.directors[0]}</p>
                  <p className="text-[11px] text-gray-200">Chief Executive Officer</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ---------------- 7. CONTACT / LEAD FORM (CLEAN, NO PLANT ILLUSTRATION) ---------------- */}
        <section id="lead-form" className="relative mt-20 py-10 max-w-4xl mx-auto">
          <div>
            {/* Form Column */}
            <div>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
                Let's <span className="text-[#FF5443]">Collaborate</span> for Success
              </h2>
              <p className="mt-1 text-xs text-gray-500">Asterisk (*) denotes mandatory fields</p>

              {submitted ? (
                <div className="mt-8 py-10 rounded-2xl bg-white/80 backdrop-blur-xs border border-gray-100 text-center shadow-xs">
                  <span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-emerald-100 text-emerald-600">
                    <Icon name="check" size={24} />
                  </span>
                  <h3 className="mt-3 text-base font-bold text-gray-900">Inquiry Received Successfully</h3>
                  <p className="mt-1 text-xs text-gray-600">
                    Our institutional partnership team will contact you within 24 business hours.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-4 rounded-lg bg-[#ff5443] px-5 py-2 text-xs font-bold text-white hover:bg-[#e84333] transition"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                  <div>
                    <input
                      type="text"
                      required
                      placeholder="Name*"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full rounded-lg border border-gray-300 bg-white/90 backdrop-blur-xs px-4 py-3 text-xs sm:text-sm text-gray-900 placeholder-gray-400 outline-none focus:border-[#ff5443] focus:bg-white shadow-xs transition"
                    />
                  </div>

                  <div>
                    <input
                      type="email"
                      required
                      placeholder="Work Email ID*"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full rounded-lg border border-gray-300 bg-white/90 backdrop-blur-xs px-4 py-3 text-xs sm:text-sm text-gray-900 placeholder-gray-400 outline-none focus:border-[#ff5443] focus:bg-white shadow-xs transition"
                    />
                  </div>

                  <div>
                    <input
                      type="tel"
                      required
                      placeholder="Contact number*"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full rounded-lg border border-gray-300 bg-white/90 backdrop-blur-xs px-4 py-3 text-xs sm:text-sm text-gray-900 placeholder-gray-400 outline-none focus:border-[#ff5443] focus:bg-white shadow-xs transition"
                    />
                  </div>

                  <div>
                    <input
                      type="text"
                      required
                      placeholder="Organisation Name*"
                      value={formData.org}
                      onChange={(e) => setFormData({ ...formData, org: e.target.value })}
                      className="w-full rounded-lg border border-gray-300 bg-white/90 backdrop-blur-xs px-4 py-3 text-xs sm:text-sm text-gray-900 placeholder-gray-400 outline-none focus:border-[#ff5443] focus:bg-white shadow-xs transition"
                    />
                  </div>

                  <div className="relative">
                    <select
                      value={formData.employeeStrength || "Employee Strength*"}
                      onChange={(e) => setFormData({ ...formData, employeeStrength: e.target.value })}
                      className="w-full rounded-lg border border-gray-300 bg-white/90 backdrop-blur-xs px-4 py-3 text-xs sm:text-sm text-gray-700 outline-none focus:border-[#ff5443] focus:bg-white shadow-xs transition appearance-none cursor-pointer"
                    >
                      <option disabled value="Employee Strength*">Employee Strength*</option>
                      <option value="1-50 employees">1-50 employees</option>
                      <option value="50-250 employees">50-250 employees</option>
                      <option value="250-1000 employees">250-1000 employees</option>
                      <option value="1000+ employees">1000+ employees</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-gray-400">
                      <Icon name="chevron-down" size={16} />
                    </div>
                  </div>

                  <div className="relative">
                    <select
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full rounded-lg border border-gray-300 bg-white/90 backdrop-blur-xs px-4 py-3 text-xs sm:text-sm text-gray-700 outline-none focus:border-[#ff5443] focus:bg-white shadow-xs transition appearance-none cursor-pointer"
                    >
                      <option disabled value="">Services you would like to know about*</option>
                      <option value="Hospital Pharmacy Integration">Hospital Pharmacy Integration</option>
                      <option value="Corporate Wellness & Screening Drives">Corporate Wellness & Screening Drives</option>
                      <option value="Diagnostic Network Franchise">Diagnostic Network Franchise</option>
                      <option value="Patient Support Program (PSP)">Patient Support Program (PSP)</option>
                      <option value="Insurance / Cashless OPD Tie-up">Insurance / Cashless OPD Tie-up</option>
                      <option value="Other Strategic Alliance">Other Strategic Alliance</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-gray-400">
                      <Icon name="chevron-down" size={16} />
                    </div>
                  </div>

                  <div>
                    <textarea
                      rows={3}
                      placeholder="Please mention your requirement"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full rounded-lg border border-gray-300 bg-white/90 backdrop-blur-xs px-4 py-3 text-xs sm:text-sm text-gray-900 placeholder-gray-400 outline-none focus:border-[#ff5443] focus:bg-white shadow-xs transition"
                    />
                  </div>

                  <button
                    type="submit"
                    className="rounded-xl bg-gradient-to-r from-[#eb5b26] to-[#e4336f] px-10 py-3.5 text-xs sm:text-sm font-bold uppercase tracking-wider text-white shadow-md hover:opacity-95 transition hover:scale-[1.02] active:scale-95 cursor-pointer"
                  >
                    Get In Touch
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>
      </div>

      {/* ---------------- 8. CORPORATE CERTIFIED FOOTER (MATCHING SCREENSHOT 4, BLENDED WITH PAGE) ---------------- */}
      <footer className="relative bg-transparent text-gray-700 pt-6 pb-12 overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
          {/* India's largest healthcare platform stats strip */}
          <div className="mb-12">
            <h3 className="text-center text-lg sm:text-xl font-bold text-gray-900 mb-6">
              India&apos;s largest healthcare platform
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto">
              {/* Stat 1: Visitors */}
              <div className="flex items-center justify-between p-5 rounded-2xl bg-white border border-gray-100/80 shadow-xs">
                <div>
                  <p className="text-2xl sm:text-3xl font-extrabold text-gray-900">260m+</p>
                  <p className="text-xs text-gray-500 font-medium mt-0.5">Visitors</p>
                </div>
                <div className="h-12 w-12 rounded-xl bg-emerald-50 flex items-center justify-center p-2 shrink-0">
                  <img
                    src="/images/partnerships/footer_stat_visitors.png"
                    alt="Visitors"
                    className="h-full w-full object-contain"
                  />
                </div>
              </div>

              {/* Stat 2: Orders Delivered */}
              <div className="flex items-center justify-between p-5 rounded-2xl bg-white border border-gray-100/80 shadow-xs">
                <div>
                  <p className="text-2xl sm:text-3xl font-extrabold text-gray-900">31m+</p>
                  <p className="text-xs text-gray-500 font-medium mt-0.5">Orders Delivered</p>
                </div>
                <div className="h-12 w-12 rounded-xl bg-blue-50 flex items-center justify-center p-2 shrink-0">
                  <img
                    src="/images/partnerships/footer_stat_orders.png"
                    alt="Orders Delivered"
                    className="h-full w-full object-contain"
                  />
                </div>
              </div>

              {/* Stat 3: Cities */}
              <div className="flex items-center justify-between p-5 rounded-2xl bg-white border border-gray-100/80 shadow-xs">
                <div>
                  <p className="text-2xl sm:text-3xl font-extrabold text-gray-900">1800+</p>
                  <p className="text-xs text-gray-500 font-medium mt-0.5">Cities</p>
                </div>
                <div className="h-12 w-12 rounded-xl bg-pink-50 flex items-center justify-center p-2 shrink-0">
                  <img
                    src="/images/partnerships/footer_stat_cities.png"
                    alt="Cities"
                    className="h-full w-full object-contain"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Brand & LegitScript Certificate Header with Google Play Badge */}
          <div className="pb-8 border-b border-gray-200/60 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <span className="text-2xl sm:text-3xl font-black tracking-tight text-gray-900">
                MEDITRUST
              </span>
              <p className="mt-2 text-xs sm:text-sm font-medium text-gray-700 max-w-2xl">
                India&apos;s only LegitScript and ISO/ IEC 27001:2022 certified online healthcare platform
              </p>
            </div>
            <div className="shrink-0 flex items-center gap-3">
              <a
                href="https://play.google.com/store"
                target="_blank"
                rel="noreferrer"
                title="Download MEDITRUST app on Google Play"
                className="inline-block hover:opacity-90 transition"
              >
                <img
                  src="/images/partnerships/google_play_badge.png"
                  alt="Get it on Google Play"
                  className="h-10 sm:h-11 w-auto object-contain cursor-pointer drop-shadow-xs"
                />
              </a>
              <a
                href="https://apps.apple.com"
                target="_blank"
                rel="noreferrer"
                title="Download on the App Store"
                className="inline-block hover:opacity-90 transition"
              >
                <img
                  src="/images/partnerships/app_store_badge_official.png"
                  alt="Download on the App Store"
                  className="h-10 sm:h-11 w-auto object-contain cursor-pointer drop-shadow-xs"
                />
              </a>
            </div>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-12 py-10 border-b border-gray-100 text-xs">
            {/* Our Policies (col-span-3) */}
            <div className="md:col-span-3">
              <h5 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-4">
                Our Policies
              </h5>
              <ul className="space-y-2.5 text-gray-600">
                <li><a href="/privacy-policy" className="hover:text-[#ff5443] transition">Privacy Policy</a></li>
                <li><a href="/terms" className="hover:text-[#ff5443] transition">Terms and Conditions</a></li>
                <li><a href="/editorial-policy" className="hover:text-[#ff5443] transition">Editorial Policy</a></li>
                <li><a href="/return-policy" className="hover:text-[#ff5443] transition">Return Policy</a></li>
                <li><a href="/ip-policy" className="hover:text-[#ff5443] transition">IP Policy</a></li>
                <li><a href="/grievance" className="hover:text-[#ff5443] transition">Grievance Redressal Policy</a></li>
                <li><a href="/fake-jobs" className="hover:text-[#ff5443] transition">Fake Jobs and Fraud</a></li>
              </ul>
            </div>

            {/* Our Solution (col-span-3 with subtle right divider) */}
            <div className="md:col-span-3 md:border-r md:border-dashed md:border-gray-300 md:pr-6">
              <h5 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-4">
                Our Solution
              </h5>
              <ul className="space-y-2.5 text-gray-600">
                <li><a href="#tailored-solutions" onClick={() => setActiveTab("corporate")} className="hover:text-[#ff5443] transition">Corporate wellness</a></li>
                <li><a href="#tailored-solutions" onClick={() => setActiveTab("hospital")} className="hover:text-[#ff5443] transition">Hospital Services</a></li>
                <li><a href="#tailored-solutions" onClick={() => setActiveTab("patient-support")} className="hover:text-[#ff5443] transition">Patient Support Program</a></li>
                <li><a href="#tailored-solutions" onClick={() => setActiveTab("insurance")} className="hover:text-[#ff5443] transition">Insurance</a></li>
                <li><a href="#tailored-solutions" onClick={() => setActiveTab("strategic")} className="hover:text-[#ff5443] transition">Strategic Partners</a></li>
                <li><a href="#tailored-solutions" onClick={() => setActiveTab("strategic")} className="hover:text-[#ff5443] transition">Health Associates</a></li>
                <li><a href="#lead-form" className="hover:text-[#ff5443] transition">Advertise with us</a></li>
                <li><a href="#tailored-solutions" onClick={() => setActiveTab("hospital")} className="hover:text-[#ff5443] transition">Collection Centres</a></li>
              </ul>
            </div>

            {/* Trust Badges: Reliable & Secure (col-span-3) */}
            <div className="md:col-span-3 space-y-6 md:pl-2">
              <div className="flex items-start gap-3">
                <img
                  src="/images/partnerships/icon_reliable_shield.png"
                  alt="Reliable"
                  className="h-6 w-6 object-contain shrink-0 mt-0.5"
                />
                <div>
                  <strong className="text-xs font-bold text-gray-900">Reliable</strong>
                  <p className="text-[11px] text-gray-500 leading-relaxed mt-1">
                    All products displayed on {company.name} are procured from verified and licensed pharmacies. All labs listed on the platform are accredited
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <img
                  src="/images/partnerships/icon_secure_shield.png"
                  alt="Secure"
                  className="h-6 w-6 object-contain shrink-0 mt-0.5"
                />
                <div>
                  <strong className="text-xs font-bold text-gray-900">Secure</strong>
                  <p className="text-[11px] text-gray-500 leading-relaxed mt-1">
                    {company.name} uses Secure Sockets Layer (SSL) 128-bit encryption and is Payment Card Industry Data Security Standard (PCI DSS) compliant
                  </p>
                </div>
              </div>
            </div>

            {/* Affordable & Connect With Us (col-span-3) */}
            <div className="md:col-span-3 space-y-6">
              <div className="flex items-start gap-3">
                <img
                  src="/images/partnerships/icon_wallet.png"
                  alt="Affordable"
                  className="h-6 w-6 object-contain shrink-0 mt-0.5"
                />
                <div>
                  <strong className="text-xs font-bold text-gray-900">Affordable</strong>
                  <p className="text-[11px] text-gray-500 leading-relaxed mt-1">
                    Find affordable medicine substitutes, save up to 50% on health products, up to 80% off on lab tests and free doctor consultations.
                  </p>
                </div>
              </div>

              <div>
                <strong className="text-xs font-bold text-gray-900 block mb-3">Connect with us</strong>
                <div className="flex items-center gap-2.5">
                  <a href="https://facebook.com" target="_blank" rel="noreferrer" title="Facebook" className="hover:opacity-80 transition inline-block">
                    <img
                      src="/images/partnerships/icon_facebook.png"
                      alt="Facebook"
                      className="h-6 w-6 object-contain cursor-pointer"
                    />
                  </a>
                  <a href="https://instagram.com" target="_blank" rel="noreferrer" title="Instagram" className="hover:opacity-80 transition inline-block">
                    <img
                      src="/images/partnerships/icon_instagram.png"
                      alt="Instagram"
                      className="h-6 w-6 object-contain cursor-pointer"
                    />
                  </a>
                  <a href="https://twitter.com" target="_blank" rel="noreferrer" title="Twitter / X" className="hover:opacity-80 transition inline-block">
                    <img
                      src="/images/partnerships/icon_twitter.png"
                      alt="X (Twitter)"
                      className="h-6 w-6 object-contain cursor-pointer"
                    />
                  </a>
                  <a href="https://linkedin.com" target="_blank" rel="noreferrer" title="LinkedIn" className="hover:opacity-80 transition inline-block">
                    <img
                      src="/images/partnerships/icon_linkedin.png"
                      alt="LinkedIn"
                      className="h-6 w-6 object-contain cursor-pointer"
                    />
                  </a>
                  <a href="https://medium.com" target="_blank" rel="noreferrer" title="Medium" className="hover:opacity-80 transition inline-block">
                    <img
                      src="/images/partnerships/icon_medium.png"
                      alt="Medium"
                      className="h-6 w-6 object-contain cursor-pointer"
                    />
                  </a>
                  <a href="https://youtube.com" target="_blank" rel="noreferrer" title="YouTube" className="hover:opacity-80 transition inline-block">
                    <img
                      src="/images/partnerships/icon_youtube.png"
                      alt="YouTube"
                      className="h-6 w-6 object-contain cursor-pointer"
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-6 text-left text-[11px] text-gray-500">
            <p>© {new Date().getFullYear()} {company.name}. All rights reserved. All medicines are dispensed in compliance with the Drugs and Cosmetics Act, 1940 and Drugs and Cosmetics Rules, 1945. We do not process requests for Schedule X and habit forming drugs.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function cx(...classes) {
  return classes.filter(Boolean).join(" ");
}
