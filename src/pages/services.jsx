import { useState } from "react";
import { useApp } from "../context/AppContext";
import {
  A,
  Art,
  Badge,
  Crumbs,
  DemoNote,
  Empty,
  Field,
  Icon,
  cx,
  emailOk,
  money,
  phoneOk,
  req,
  useForm,
  useGo,
} from "../components/ui";
import {
  specialties,
  slugify,
  offersData,
  labTrustCards,
  labHealthNeeds,
  labPromoBanners,
  labRadiologyCards,
  labCollectionSteps,
  labPopularTestSuggestions,
  popularCities,
  company,
  fullBodyCheckups,
  pathologyTests,
  ayurvedaFeaturedHerbs,
  ayurvedaSkinHerbs,
  ayurvedaDigestiveHerbs,
  ayurvedaHairHerbs,
  ayurvedaAZDirectory,
  consultTrustPillars,
  consultFaqs,
  consultTestimonials,
  partnerSolutions,
  partnerStats,
} from "../data/demo";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [err, setErr] = useState("");
  const [done, setDone] = useState(false);
  return (
    <section className="container-page py-12">
      <div className="grid items-center gap-6 rounded-3xl bg-[#ff6f61] p-8 text-white md:grid-cols-2 md:p-10 shadow-lg">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold">
            Thoughtful health updates, now and then.
          </h2>
          <p className="mt-2 text-white/80 text-sm">
            Demo sign-up — get wellness tips and exclusive health offers delivered to your inbox.
          </p>
        </div>
        {done ? (
          <p className="flex items-center gap-2 rounded-xl bg-white/20 p-4 font-medium text-white">
            <Icon name="check" size={20} /> Thanks! This was a demonstration sign-up.
          </p>
        ) : (
          <form
            noValidate
            onSubmit={(e) => {
              e.preventDefault();
              if (!emailOk(email)) return setErr("Please enter a valid email address.");
              setDone(true);
            }}
          >
            <div className="flex gap-2">
              <input
                aria-label="Email address"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setErr("");
                }}
                placeholder="you@example.com"
                className="input flex-1 bg-white text-gray-900 border-none shadow"
              />
              <button className="rounded-lg bg-gray-900 px-5 py-2.5 text-xs font-bold text-white hover:bg-black transition">
                Subscribe
              </button>
            </div>
            {err && <p className="mt-2 text-sm text-yellow-200" role="alert">{err}</p>}
          </form>
        )}
      </div>
    </section>
  );
}

/* ---------------- Lab tests ---------------- */
export function LabCard({ t }) {
  const { state, toggleLab } = useApp();
  const inCart = state.labCart.includes(t.id);
  const discount = t.mrp > t.price ? Math.round(((t.mrp - t.price) / t.mrp) * 100) : 0;

  return (
    <div className="flex flex-col justify-between rounded-xl border border-gray-200 bg-white p-4 shadow-sm hover:shadow-md transition">
      <div>
        <div className="flex items-center justify-between gap-2 mb-2">
          <span className="inline-flex items-center gap-1 rounded bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700">
            <Icon name="check" size={12} /> SAFE
          </span>
          <span className="text-[11px] font-medium text-gray-400">Reports in 24 hrs</span>
        </div>
        <A
          href={`/lab-tests/${t.id}`}
          className="font-bold text-gray-900 hover:text-[#ff6f61] transition line-clamp-2 text-sm leading-snug"
        >
          {t.name}
        </A>
        <p className="mt-1 text-xs text-gray-500 line-clamp-2">{t.description}</p>
        <div className="mt-3 flex flex-wrap items-center gap-2 text-[11px] text-gray-500">
          <span className="rounded bg-gray-100 px-2 py-0.5">{t.sample || "Blood Sample"}</span>
          <span className="rounded bg-gray-100 px-2 py-0.5">{t.prep || "Fasting optional"}</span>
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
        <div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-base font-bold text-gray-900">{money(t.price)}</span>
            {t.mrp > t.price && (
              <span className="text-xs text-gray-400 line-through">{money(t.mrp)}</span>
            )}
          </div>
          {discount > 0 && (
            <span className="text-[10px] font-bold text-emerald-600">{discount}% off</span>
          )}
        </div>
        <button
          onClick={() => toggleLab(t.id)}
          className={cx(
            "rounded px-4 py-1.5 text-xs font-bold uppercase transition",
            inCart
              ? "border border-[#ff6f61] bg-white text-[#ff6f61]"
              : "bg-[#ff6f61] text-white hover:bg-[#e85b4d]"
          )}
        >
          {inCart ? "ADDED" : "ADD"}
        </button>
      </div>
    </div>
  );
}

export function LabTests() {
  const { state, toggleLab, toast } = useApp();
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("");
  const [city, setCity] = useState(state.settings.location || "Gurgaon");
  const [cityOpen, setCityOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [bannerIdx, setBannerIdx] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [accordionOpen, setAccordionOpen] = useState(false);

  // Auto-scroll banner
  useState(() => {
    const timer = setInterval(() => {
      if (!isPaused) {
        setBannerIdx((p) => (p + 1) % labPromoBanners.length);
      }
    }, 4500);
    return () => clearInterval(timer);
  });

  const list = state.labTests.filter(
    (t) =>
      t.visible &&
      (!cat || t.category === cat) &&
      t.name.toLowerCase().includes(q.toLowerCase())
  );

  const filteredPopular = labPopularTestSuggestions.filter((p) =>
    !q.trim() ? true : p.name.toLowerCase().includes(q.toLowerCase())
  );

  return (
    <div className="bg-white min-h-screen pb-20">
      {/* 1. HERO SECTION matching Screenshot 2026-10-14 234636.png */}
      <section className="border-b border-gray-100 bg-[#ffffff] pt-8 pb-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid gap-8 lg:grid-cols-12 items-start">
            {/* Left Column (Headline + Search + Quick Pills + Category Grid) */}
            <div className="lg:col-span-7 xl:col-span-7 space-y-6">
              <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-gray-900 leading-[1.15] tracking-tight">
                Book lab tests online from trusted and certified labs
              </h1>

              {/* Lab Search Bar with Location + Popular Suggestions (Screenshots 1, 8, 9) */}
              <div className="relative z-30">
                <div className="flex items-center rounded-2xl border border-gray-200 bg-white p-1.5 shadow-md focus-within:border-[#ff6f61] transition">
                  {/* City Selector */}
                  <div className="relative shrink-0">
                    <button
                      type="button"
                      onClick={() => {
                        setCityOpen((v) => !v);
                        setSearchOpen(false);
                      }}
                      className="flex items-center gap-1.5 px-3 py-2 text-xs sm:text-sm font-semibold text-gray-800 hover:text-[#ff6f61] transition"
                    >
                      <Icon name="pin" size={16} className="text-[#ff6f61]" />
                      <span className="truncate max-w-[90px] sm:max-w-[110px]">{city}</span>
                      <Icon name="crosshair" size={13} className="text-gray-400" />
                    </button>

                    {/* City Dropdown matching Screenshot 8 */}
                    {cityOpen && (
                      <div className="absolute left-0 top-full mt-2 w-56 rounded-xl border border-gray-200 bg-white p-2 shadow-2xl z-50 animate-in fade-in duration-150">
                        <p className="px-3 py-1.5 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                          Top Cities
                        </p>
                        <div className="space-y-0.5 max-h-48 overflow-y-auto">
                          {popularCities.map((c) => (
                            <button
                              key={c}
                              type="button"
                              onClick={() => {
                                setCity(c);
                                setCityOpen(false);
                                toast(`Location set to ${c}`);
                              }}
                              className={cx(
                                "flex w-full items-center justify-between px-3 py-2 text-xs text-left rounded-lg transition",
                                city === c
                                  ? "bg-red-50 font-bold text-[#ff6f61]"
                                  : "text-gray-700 hover:bg-gray-100"
                              )}
                            >
                              <span>{c}</span>
                              {city === c && <Icon name="check" size={14} />}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="h-6 w-px bg-gray-200" />

                  {/* Input */}
                  <div className="flex-1 flex items-center px-3">
                    <input
                      value={q}
                      onChange={(e) => {
                        setQ(e.target.value);
                        setSearchOpen(true);
                      }}
                      onFocus={() => {
                        setSearchOpen(true);
                        setCityOpen(false);
                      }}
                      placeholder="Search tests or full body checkups"
                      className="w-full text-xs sm:text-sm text-gray-800 outline-none placeholder:text-gray-400"
                    />
                  </div>

                  {/* Search Icon Button */}
                  <button
                    type="button"
                    onClick={() => setSearchOpen(false)}
                    className="grid h-10 w-10 place-items-center rounded-xl bg-[#ff6f61] text-white shadow-sm hover:bg-[#e85b4d] transition shrink-0"
                    aria-label="Search lab tests"
                  >
                    <Icon name="search" size={18} />
                  </button>
                </div>

                {/* Popular Tests Suggestion Dropdown matching Screenshot 9 */}
                {searchOpen && (
                  <div className="absolute left-0 right-0 top-full mt-2 rounded-2xl border border-gray-200 bg-white p-3 shadow-2xl z-50 animate-in fade-in duration-150">
                    <p className="px-2 pb-2 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                      Popular tests
                    </p>
                    <div className="divide-y divide-gray-100">
                      {filteredPopular.map((pt) => {
                        const inCart = state.labCart.includes(pt.testId);
                        return (
                          <div
                            key={pt.id}
                            className="flex items-center justify-between py-2.5 px-2 hover:bg-gray-50 rounded-lg transition"
                          >
                            <div className="flex items-center gap-3">
                              <div className="grid h-9 w-9 place-items-center rounded-lg bg-orange-50 text-[#ff6f61] shrink-0 font-bold text-xs">
                                🧪
                              </div>
                              <div>
                                <p className="text-xs sm:text-sm font-bold text-gray-900 leading-snug">
                                  {pt.name}
                                </p>
                                <p className="text-[11px] text-gray-500">{pt.testsCount}</p>
                              </div>
                            </div>
                            <button
                              type="button"
                              onClick={() => {
                                toggleLab(pt.testId);
                                setSearchOpen(false);
                              }}
                              className={cx(
                                "px-3 py-1 text-xs font-bold uppercase transition rounded-md",
                                inCart
                                  ? "bg-emerald-600 text-white"
                                  : "text-[#ff6f61] hover:bg-red-50"
                              )}
                            >
                              {inCart ? "BOOKED" : "BOOK"}
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* 3 Quick Action Pills matching Screenshot 1 */}
              <div className="grid grid-cols-3 gap-2.5 sm:gap-3">
                <a
                  href={`tel:${company.phone.replace(/\s/g, "")}`}
                  className="flex items-center justify-center gap-2 rounded-xl border border-sky-100 bg-[#f0f8ff] p-3 text-center text-xs font-bold text-gray-800 hover:border-sky-300 transition shadow-xs"
                >
                  <span className="grid h-6 w-6 place-items-center rounded-full bg-blue-500 text-white text-[10px]">
                    <Icon name="phone" size={12} />
                  </span>
                  <span className="truncate">Book via <span className="font-extrabold text-blue-900">Phone Call</span></span>
                </a>

                <A
                  href="/quick-order"
                  className="flex items-center justify-center gap-2 rounded-xl border border-pink-100 bg-[#fff5f6] p-3 text-center text-xs font-bold text-gray-800 hover:border-pink-300 transition shadow-xs"
                >
                  <span className="grid h-6 w-6 place-items-center rounded-full bg-pink-500 text-white text-[10px]">
                    <Icon name="prescription" size={12} />
                  </span>
                  <span className="truncate">Quick <span className="font-extrabold text-pink-900">Order</span></span>
                </A>

                <a
                  href={`https://wa.me/${company.phone.replace(/[^0-9]/g, "")}?text=Hi,%20I%20would%20like%20to%20book%20a%20lab%20test%20with%20MEDITRUST`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 rounded-xl border border-emerald-100 bg-[#f2fdf5] p-3 text-center text-xs font-bold text-gray-800 hover:border-emerald-300 transition shadow-xs"
                >
                  <span className="grid h-6 w-6 place-items-center rounded-full bg-emerald-500 text-white text-[10px]">
                    💬
                  </span>
                  <span className="truncate">Book via <span className="font-extrabold text-emerald-900">Whatsapp</span></span>
                </a>
              </div>

              {/* Find tests & packages for your needs matching Screenshot 1 */}
              <div className="rounded-2xl border border-gray-100 bg-[#fbfcfc] p-4 sm:p-5 shadow-xs">
                <p className="text-xs sm:text-sm font-bold text-gray-800 mb-3">
                  Find tests &amp; packages for your needs
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {[
                    { title: "Full Body Packages", icon: "👤", cat: "Fever" },
                    { title: "X Rays, Scans & More", icon: "🫁", cat: "Radiology" },
                    { title: "Fever Tests", icon: "🌡️", cat: "Fever" },
                    { title: "Diabetes Tests", icon: "🩸", cat: "Diabetes" },
                    { title: "Vitamins Tests", icon: "💊", cat: "Vitamins" },
                  ].map((item, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setCat(item.cat)}
                      className={cx(
                        "flex items-center justify-between rounded-xl border p-2.5 text-left transition shadow-2xs group",
                        cat === item.cat
                          ? "border-[#ff6f61] bg-red-50/50"
                          : "border-gray-200 bg-white hover:border-[#ff6f61]"
                      )}
                    >
                      <span className="text-xs font-semibold text-gray-800 group-hover:text-[#ff6f61] leading-tight">
                        {item.title}
                      </span>
                      <span className="text-lg shrink-0 ml-1">{item.icon}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column (4 Trust Cards Grid matching Screenshot 1) */}
            <div className="lg:col-span-5 xl:col-span-5 grid grid-cols-2 gap-3.5 sm:gap-4">
              {labTrustCards.map((card) => (
                <div
                  key={card.id}
                  className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition aspect-[4/3] flex flex-col justify-end"
                >
                  <img
                    src={card.image}
                    alt={card.title}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  />
                  {/* Subtle dark gradient overlay on bottom for text readability */}
                  <div className="relative z-10 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-3 pt-6 text-white">
                    <p className="text-xs sm:text-sm font-extrabold leading-tight">{card.title}</p>
                    <p className="text-[10px] text-gray-200 mt-0.5 line-clamp-1">{card.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 2. "Tests and packages for your health needs" matching Screenshot 2 */}
      <section className="py-10 border-b border-gray-100 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900 tracking-tight">
              Tests and packages for your health needs
            </h2>
            <div className="hidden sm:flex items-center gap-2">
              <span className="text-xs text-gray-400 font-medium">Scroll to explore</span>
            </div>
          </div>

          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-none">
            {labHealthNeeds.map((need) => (
              <A
                key={need.id}
                href={need.href}
                className="w-[150px] sm:w-[170px] shrink-0 text-center group"
              >
                <div className="aspect-square w-full rounded-2xl overflow-hidden shadow-sm group-hover:shadow-md group-hover:scale-105 transition duration-200 border border-gray-100 bg-slate-50">
                  <img
                    src={need.image}
                    alt={need.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="mt-2 text-xs sm:text-sm font-bold text-gray-800 group-hover:text-[#ff6f61] transition">
                  {need.name}
                </p>
              </A>
            ))}
          </div>
        </div>
      </section>

      {/* 3. PROMO VIDEO / LAB FEATURE BANNERS matching Screenshots 2 & 3 */}
      <section className="py-10 bg-[#fafafa] border-b border-gray-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid gap-5 md:grid-cols-3">
            {labPromoBanners.map((banner, idx) => (
              <div
                key={banner.id}
                className="relative overflow-hidden rounded-2xl shadow-sm hover:shadow-md transition aspect-[16/9] sm:aspect-[2/1] group flex flex-col justify-end"
              >
                <img
                  src={banner.image}
                  alt={banner.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition duration-300"
                />
                <div className="relative z-10 bg-gradient-to-t from-black/85 via-black/40 to-transparent p-4 pt-8 text-white flex items-end justify-between">
                  <div>
                    <span className="inline-block rounded bg-black/60 backdrop-blur-xs px-2 py-0.5 text-[9px] font-black uppercase tracking-wider mb-1">
                      {banner.title}
                    </span>
                    <p className="text-xs sm:text-sm font-bold leading-tight">{banner.subtitle}</p>
                    <p className="text-[10px] text-gray-300 line-clamp-1">{banner.desc}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => toast(`Opening presentation: ${banner.subtitle}`)}
                    className="rounded-md bg-white px-3 py-1 text-[11px] font-extrabold text-gray-900 shadow hover:bg-gray-100 transition shrink-0 ml-2"
                  >
                    {banner.btnText}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. "Radiology tests, x-rays & scans" matching Screenshots 3 & 4 */}
      <section className="py-10 border-b border-gray-100 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900 tracking-tight">
                Radiology tests, x-rays &amp; scans
              </h2>
              <p className="mt-1 text-xs text-gray-500">
                Advanced diagnostic scans and imaging from accredited radiology centers
              </p>
            </div>
            <A href="/lab-tests" className="text-xs font-bold text-[#ff6f61] hover:underline">
              View all →
            </A>
          </div>

          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-none">
            {labRadiologyCards.map((rad) => (
              <A
                key={rad.id}
                href={rad.href}
                className="w-[150px] sm:w-[170px] shrink-0 text-center group"
              >
                <div className="aspect-square w-full rounded-2xl overflow-hidden shadow-sm group-hover:shadow-md group-hover:scale-105 transition duration-200 border border-gray-100 bg-orange-50/30">
                  <img
                    src={rad.image}
                    alt={rad.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="mt-2 text-xs sm:text-sm font-bold text-gray-800 group-hover:text-[#ff6f61] transition">
                  {rad.name}
                </p>
              </A>
            ))}
          </div>
        </div>
      </section>

      {/* 5. "How does home sample collection work?" matching Screenshots 4 & 5 */}
      <section className="py-12 border-b border-gray-100 bg-[#fbfcfc]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900 tracking-tight mb-8">
            How does home sample collection work?
          </h2>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {labCollectionSteps.map((s) => (
              <div
                key={s.step}
                className="rounded-2xl border border-gray-200 bg-white p-3.5 shadow-xs hover:shadow-sm transition flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-[4/3] w-full rounded-xl overflow-hidden mb-3.5 bg-gray-100">
                    <img
                      src={s.image}
                      alt={s.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 left-2 grid h-7 w-7 place-items-center rounded-lg bg-black/80 font-black text-sm text-white">
                      {s.step}
                    </div>
                  </div>
                  <h3 className="text-xs sm:text-sm font-extrabold text-gray-900 leading-snug">
                    {s.title}
                  </h3>
                  <p className="mt-1.5 text-[11px] text-gray-500 leading-relaxed">
                    {s.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. APP DOWNLOAD PROMO BANNER matching Screenshot 6 */}
      <section className="py-10 border-b border-gray-100 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-amber-50/70 via-orange-50/40 to-amber-50/80 border border-amber-200/60 p-6 sm:p-10 flex flex-col lg:flex-row items-center justify-between gap-8 shadow-sm">
            <div className="max-w-lg space-y-4">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 leading-tight">
                Download the MEDITRUST app. Trusted healthcare, at your fingertips.
              </h2>
              <p className="text-xs sm:text-sm text-gray-600">
                Book tests, track real-time reports, and get AI-powered health insights anytime, anywhere.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <div className="flex items-center gap-2">
                  <a
                    href="https://apps.apple.com/in/app/tata-1mg/id1081682217"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-block rounded-xl bg-black px-4 py-2 text-white hover:bg-gray-800 transition"
                  >
                    <p className="text-[9px] uppercase tracking-wider text-gray-400">Download on the</p>
                    <p className="text-xs font-bold leading-tight">App Store</p>
                  </a>
                  <a
                    href="https://play.google.com/store/apps/details?id=com.aranoah.healthkart.plus"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-block rounded-xl bg-black px-4 py-2 text-white hover:bg-gray-800 transition"
                  >
                    <p className="text-[9px] uppercase tracking-wider text-gray-400">GET IT ON</p>
                    <p className="text-xs font-bold leading-tight">Google Play</p>
                  </a>
                </div>

                <div className="hidden sm:flex items-center gap-3 border-l border-amber-200 pl-4">
                  <div className="grid h-12 w-12 place-items-center rounded-lg bg-white p-1 border border-amber-200 text-center font-mono font-bold text-[10px] text-gray-800">
                    QR
                  </div>
                  <p className="text-[11px] font-medium text-gray-500 leading-tight">
                    Scan QR code <br /> to install app
                  </p>
                </div>
              </div>
            </div>

            <div className="w-full lg:w-1/2 flex justify-center">
              <img
                src="/images/lab_tests/lab_app_mockup.png"
                alt="MEDITRUST App Mockup"
                className="max-h-72 w-auto object-contain rounded-2xl drop-shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 7. ALL LAB TESTS CATALOG / FILTERABLE DIRECTORY */}
      <section className="py-10 bg-[#fafafa]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
                All Diagnostic Tests &amp; Full Body Packages
              </h2>
              <p className="mt-1 text-xs text-gray-500">
                Choose from doctor-curated pathology packages and individual diagnostic tests
              </p>
            </div>

            {/* Filter pills */}
            <div className="flex gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
              {["", "Full Body", "Pathology", "Radiology", "Fever", "Diabetes", "Thyroid"].map((c) => (
                <button
                  key={c || "all"}
                  onClick={() => setCat(c === "Full Body" ? "Health" : c)}
                  className={cx(
                    "rounded-full px-3.5 py-1.5 text-xs font-bold whitespace-nowrap transition shadow-2xs",
                    (c === "" && !cat) || (c === "Full Body" && cat === "Health") || cat === c
                      ? "bg-[#ff6f61] text-white"
                      : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
                  )}
                >
                  {c || "All Tests"}
                </button>
              ))}
            </div>
          </div>

          {list.length ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {list.map((t) => (
                <LabCard key={t.id} t={t} />
              ))}
            </div>
          ) : (
            <Empty icon="lab" title="No tests found" text="Try a different search term or category." />
          )}
        </div>
      </section>

      {/* 8. EXPANDABLE KNOWLEDGE ACCORDION matching Screenshot 6 */}
      <section className="py-8 bg-white border-t border-gray-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <button
            type="button"
            onClick={() => setAccordionOpen((v) => !v)}
            className="flex w-full items-center justify-between py-3 text-left text-sm sm:text-base font-bold text-gray-900 hover:text-[#ff6f61] transition"
          >
            <span>Keep your health in check with MEDITRUST: Lab tests just a click away</span>
            <Icon
              name="chev"
              size={18}
              className={cx("text-gray-400 transition-transform", accordionOpen && "rotate-180")}
            />
          </button>

          {accordionOpen && (
            <div className="mt-4 space-y-3 text-xs leading-relaxed text-gray-600 border-t border-gray-100 pt-4">
              <p>
                Diagnostics are an essential component of modern preventive and curative healthcare. MEDITRUST brings accredited diagnostic testing right to your doorstep with safe, temperature-controlled sample logistics and automated analyzers.
              </p>
              <p>
                All samples collected by our certified phlebotomists are handled with barcoded, tamper-proof vacutainers and processed under rigorous ISO and NABL protocols. Reports are verified by MD pathologists and delivered directly to your email and phone within 24 hours.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Floating Lab Booking Cart Bar */}
      <LabBar />
    </div>
  );
}

function LabBar() {
  const { state } = useApp();
  if (!state.labCart.length) return null;
  const total = state.labCart.reduce(
    (s, id) => s + (state.labTests.find((t) => t.id === id)?.price || 0),
    0
  );
  return (
    <div className="sticky bottom-6 z-30 mt-8 flex items-center justify-between gap-4 rounded-xl bg-gray-900 p-4 text-white shadow-2xl">
      <div className="flex items-center gap-3">
        <span className="grid h-10 w-10 place-items-center rounded-lg bg-emerald-500/20 text-emerald-400">
          <Icon name="check" size={20} />
        </span>
        <div>
          <p className="text-xs text-gray-400">{state.labCart.length} test(s) selected</p>
          <p className="text-base font-bold text-white">{money(total)}</p>
        </div>
      </div>
      <A
        href="/lab-tests/booking"
        className="rounded-lg bg-[#ff6f61] px-6 py-2.5 text-xs font-bold uppercase text-white hover:bg-[#e85b4d] shadow transition"
      >
        Continue Booking
      </A>
    </div>
  );
}

export function LabTest({ params }) {
  const { state, toggleLab } = useApp();
  const t = state.labTests.find((x) => x.id === params.id && x.visible);
  if (!t) return <NotFound />;
  const inCart = state.labCart.includes(t.id);
  const discount = t.mrp > t.price ? Math.round(((t.mrp - t.price) / t.mrp) * 100) : 0;

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 py-8">
      <Crumbs items={[["Lab tests", "/lab-tests"], [t.name]]} />
      <div className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8 shadow-sm">
        <div className="flex items-center gap-2">
          <span className="rounded bg-emerald-50 px-2 py-0.5 text-xs font-bold text-emerald-700">
            SAFE · 100% Certified Lab
          </span>
          <span className="rounded bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600">
            {t.category}
          </span>
        </div>

        <h1 className="mt-3 text-2xl sm:text-3xl font-bold text-gray-900">{t.name}</h1>
        <p className="mt-2 text-sm text-gray-600 leading-relaxed">{t.description}</p>

        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {[
            ["Sample Type", t.sample || "Blood Sample", "drop"],
            ["Preparation", t.prep || "Fasting optional", "clock"],
            ["Collection", "Home collection (demo)", "pin"],
          ].map(([k, v, i]) => (
            <div key={k} className="rounded-xl bg-gray-50 p-4 border border-gray-100">
              <Icon name={i} className="text-[#ff6f61]" size={20} />
              <p className="mt-2 text-[10px] font-bold uppercase tracking-wider text-gray-400">
                {k}
              </p>
              <p className="text-xs font-semibold text-gray-800">{v}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-between border-t border-gray-100 pt-6 gap-4">
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-gray-900">{money(t.price)}</span>
            {t.mrp > t.price && (
              <span className="text-sm text-gray-400 line-through">{money(t.mrp)}</span>
            )}
            {discount > 0 && (
              <span className="rounded bg-emerald-50 px-2 py-0.5 text-xs font-bold text-emerald-600">
                {discount}% OFF
              </span>
            )}
          </div>

          <div className="flex items-center gap-3">
            <button
              className={cx(
                "rounded-lg px-6 py-2.5 text-xs font-bold uppercase transition",
                inCart
                  ? "border border-[#ff6f61] text-[#ff6f61]"
                  : "bg-[#ff6f61] text-white hover:bg-[#e85b4d]"
              )}
              onClick={() => toggleLab(t.id)}
            >
              {inCart ? "Remove from Cart" : "Book Test"}
            </button>
            {inCart && (
              <A
                href="/lab-tests/booking"
                className="rounded-lg bg-gray-900 px-6 py-2.5 text-xs font-bold uppercase text-white hover:bg-black transition"
              >
                Proceed to Checkout
              </A>
            )}
          </div>
        </div>
      </div>
      <div className="mt-4">
        <DemoNote>
          Demonstration diagnostic listing. Prices are illustrative; no accredited laboratory partner is represented.
        </DemoNote>
      </div>
    </div>
  );
}

const days = () =>
  Array.from({ length: 6 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i + 1);
    return d.toISOString().slice(0, 10);
  });

export function LabBooking() {
  const { state, update, log, toggleLab } = useApp();
  const go = useGo();
  const tests = state.labCart
    .map((id) => state.labTests.find((t) => t.id === id))
    .filter(Boolean);

  const form = useForm(
    { date: "", time: "", patient: "", age: "", phone: "", address: "" },
    (v) => ({
      ...req(v, ["date", "time", "patient", "address"]),
      ...(+v.age > 0 && +v.age < 120 ? {} : { age: "Enter a valid age." }),
      ...(phoneOk(v.phone) ? {} : { phone: "Enter a valid 10-digit mobile number." }),
    })
  );

  if (!tests.length)
    return (
      <div className="mx-auto max-w-3xl px-4 py-16">
        <Empty
          icon="lab"
          title="No tests selected"
          text="Choose one or more diagnostic tests to start a demo booking."
          action="Browse lab tests"
          href="/lab-tests"
        />
      </div>
    );

  const total = tests.reduce((s, t) => s + t.price, 0);

  const book = (v) => {
    const b = {
      id: `LAB-${Date.now().toString().slice(-5)}`,
      date: v.date,
      time: v.time,
      patient: v.patient,
      tests: tests.map((t) => t.name),
      total,
      status: "Scheduled",
    };
    update((s) => ({ bookings: [b, ...s.bookings], labCart: [], lastBooking: b.id }));
    log(`Demo lab booking ${b.id} created`);
    go("/lab-tests/booking-confirmation");
  };

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-8">
      <Crumbs items={[["Lab tests", "/lab-tests"], ["Booking"]]} />
      <h1 className="mb-6 text-2xl sm:text-3xl font-bold text-gray-900">
        Book Lab Tests (Demo)
      </h1>

      <form
        noValidate
        onSubmit={form.submit(book)}
        className="grid gap-6 lg:grid-cols-[1fr_360px]"
      >
        <div className="space-y-6">
          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <h2 className="mb-3 text-sm font-bold text-gray-900">Choose a Demo Slot</h2>
            <div className="flex flex-wrap gap-2">
              {days().map((d) => (
                <button
                  type="button"
                  key={d}
                  onClick={() => form.setV({ ...form.v, date: d })}
                  className={cx(
                    "rounded-lg px-3 py-1.5 text-xs font-semibold border transition",
                    form.v.date === d
                      ? "border-[#ff6f61] bg-[#ff6f61]/10 text-[#ff6f61]"
                      : "border-gray-200 text-gray-700 hover:border-gray-300"
                  )}
                >
                  {new Date(d).toLocaleDateString("en-IN", {
                    weekday: "short",
                    day: "numeric",
                    month: "short",
                  })}
                </button>
              ))}
            </div>
            {form.e.date && <p className="mt-1 text-xs text-red-500">Choose a date.</p>}

            <div className="mt-4 flex flex-wrap gap-2">
              {["7:00 AM", "8:00 AM", "9:30 AM", "11:00 AM", "2:00 PM"].map((t) => (
                <button
                  type="button"
                  key={t}
                  onClick={() => form.setV({ ...form.v, time: t })}
                  className={cx(
                    "rounded-lg px-3 py-1.5 text-xs font-semibold border transition",
                    form.v.time === t
                      ? "border-[#ff6f61] bg-[#ff6f61]/10 text-[#ff6f61]"
                      : "border-gray-200 text-gray-700 hover:border-gray-300"
                  )}
                >
                  {t}
                </button>
              ))}
            </div>
            {form.e.time && <p className="mt-1 text-xs text-red-500">Choose a time.</p>}
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <h2 className="mb-4 text-sm font-bold text-gray-900">Patient Details</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Patient Name" error={form.e.patient}>
                <input
                  className="w-full rounded-md border border-gray-300 p-2 text-xs outline-none focus:border-[#ff6f61]"
                  value={form.v.patient}
                  onChange={form.set("patient")}
                />
              </Field>
              <Field label="Age" error={form.e.age}>
                <input
                  className="w-full rounded-md border border-gray-300 p-2 text-xs outline-none focus:border-[#ff6f61]"
                  type="number"
                  value={form.v.age}
                  onChange={form.set("age")}
                />
              </Field>
              <Field label="Mobile Number" error={form.e.phone}>
                <input
                  className="w-full rounded-md border border-gray-300 p-2 text-xs outline-none focus:border-[#ff6f61]"
                  value={form.v.phone}
                  onChange={form.set("phone")}
                />
              </Field>
              <div className="sm:col-span-2">
                <Field label="Home Collection Address" error={form.e.address}>
                  <textarea
                    className="w-full rounded-md border border-gray-300 p-2 text-xs outline-none focus:border-[#ff6f61]"
                    rows={2}
                    value={form.v.address}
                    onChange={form.set("address")}
                  />
                </Field>
              </div>
            </div>
            <p className="mt-2 text-[11px] text-gray-400">
              Please use sample details — no medical information is needed or stored on a server.
            </p>
          </div>
        </div>

        <aside className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm h-fit">
          <h2 className="font-bold text-gray-900 text-sm">Booking Summary</h2>
          <ul className="mt-3 space-y-2 text-xs">
            {tests.map((t) => (
              <li key={t.id} className="flex justify-between items-start gap-2 border-b border-gray-50 pb-2">
                <span className="text-gray-700">{t.name}</span>
                <span className="flex items-center gap-2 font-bold text-gray-900 shrink-0">
                  {money(t.price)}
                  <button
                    type="button"
                    onClick={() => toggleLab(t.id)}
                    aria-label={`Remove ${t.name}`}
                    className="text-gray-400 hover:text-red-500"
                  >
                    <Icon name="close" size={14} />
                  </button>
                </span>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex justify-between border-t border-gray-200 pt-3 text-sm font-bold text-gray-900">
            <span>Total Payable</span>
            <span className="text-[#ff6f61]">{money(total)}</span>
          </div>
          <button className="mt-4 w-full rounded-lg bg-[#ff6f61] py-3 text-xs font-bold uppercase text-white shadow hover:bg-[#e85b4d] transition">
            Confirm Demo Booking
          </button>
          <p className="mt-2 text-center text-[10px] text-gray-400">
            No real payment or diagnostic sample collection will take place.
          </p>
        </aside>
      </form>
    </div>
  );
}

export function LabConfirm() {
  const { state } = useApp();
  const b = state.bookings.find((x) => x.id === state.lastBooking);
  return (
    <Confirmation
      title="Demo Lab Booking Recorded"
      ok={!!b}
      text={
        b && (
          <>
            Booking <strong>{b.id}</strong> for {b.patient} on {b.date} at {b.time}. This is a
            simulation — no sample will be collected and no results will be issued.
          </>
        )
      }
    />
  );
}

function Confirmation({ title, text, ok }) {
  if (!ok)
    return (
      <div className="mx-auto max-w-3xl px-4 py-16">
        <Empty
          title="Nothing to confirm"
          text="Start a demo booking first."
          action="Go home"
          href="/"
        />
      </div>
    );
  return (
    <div className="mx-auto max-w-xl px-4 py-16 text-center">
      <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-emerald-100 text-emerald-600">
        <Icon name="check" size={32} />
      </span>
      <h1 className="mt-4 text-2xl font-bold text-gray-900">{title}</h1>
      <p className="mt-2 text-xs sm:text-sm text-gray-500">{text}</p>
      <div className="mt-6 flex justify-center gap-3">
        <A
          href="/orders"
          className="rounded-lg bg-[#ff6f61] px-5 py-2.5 text-xs font-bold text-white shadow"
        >
          View My Bookings
        </A>
        <A
          href="/"
          className="rounded-lg border border-gray-300 px-5 py-2.5 text-xs font-semibold text-gray-700 hover:bg-gray-50"
        >
          Back to Home
        </A>
      </div>
    </div>
  );
}

/* ---------------- Doctors ---------------- */
export function SpecialtyGrid() {
  const doctorSpecialties = [
    { name: "General Physician", icon: "user", count: "120+ Doctors", href: "/doctors/general-physician" },
    { name: "Dermatologist", icon: "sun", count: "80+ Doctors", href: "/doctors/dermatologist" },
    { name: "Gynecologist", icon: "heart", count: "95+ Doctors", href: "/doctors/gynecologist" },
    { name: "Pediatrician", icon: "smile", count: "60+ Doctors", href: "/doctors/pediatrician" },
    { name: "Orthopedist", icon: "plus", count: "45+ Doctors", href: "/doctors/orthopedist" },
    { name: "ENT Specialist", icon: "zap", count: "50+ Doctors", href: "/doctors/ent-specialist" },
    { name: "Cardiologist", icon: "heart", count: "40+ Doctors", href: "/doctors/cardiologist" },
    { name: "Dentist", icon: "check", count: "70+ Doctors", href: "/doctors/dentist" },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
      {doctorSpecialties.map((s) => (
        <A
          key={s.name}
          href={s.href}
          className="group rounded-xl border border-gray-200 bg-white p-4 text-center shadow-xs hover:border-[#ff6f61] hover:shadow-md transition"
        >
          <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-red-50 text-[#ff6f61] group-hover:scale-105 transition">
            <Icon name={s.icon || "user"} size={22} />
          </div>
          <h3 className="mt-2.5 text-xs sm:text-sm font-bold text-gray-900 group-hover:text-[#ff6f61] transition">
            {s.name}
          </h3>
          <p className="mt-0.5 text-[11px] text-gray-400">{s.count}</p>
        </A>
      ))}
    </div>
  );
}

function DoctorCard({ d }) {
  return (
    <article className="rounded-xl border border-gray-200 bg-white p-4 flex gap-4 shadow-sm hover:shadow-md transition">
      <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-gray-100">
        <Art icon="user" seed={parseInt(d.id.split("-")[1]) || 1} image={d.image} alt={d.name} />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <A
            href={`/doctor/${d.id}`}
            className="font-bold text-gray-900 hover:text-[#ff6f61] transition text-sm"
          >
            {d.name}
          </A>
          <span className="rounded bg-amber-50 px-1.5 py-0.5 text-[9px] font-bold text-amber-700">
            Demo Profile
          </span>
        </div>
        <p className="text-xs font-medium text-[#ff6f61] mt-0.5">{d.specialty}</p>
        <p className="text-[11px] text-gray-400 mt-1">
          {d.languages} · Fee: <strong className="text-gray-700">{money(d.fee)}</strong>
        </p>
        <A
          href={`/doctor/${d.id}`}
          className="inline-block mt-3 rounded bg-red-50 px-3 py-1 text-xs font-bold text-[#ff6f61] hover:bg-[#ff6f61] hover:text-white transition"
        >
          Consult Now
        </A>
      </div>
    </article>
  );
}

export function Consult() {
  const { state } = useApp();
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <div className="bg-[#f8f9fa] min-h-screen pb-16">
      {/* 1. CARE PLAN SAVINGS BANNER matching Screenshot 1 */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 pt-4">
        <A
          href="/care-plan"
          className="block overflow-hidden rounded-xl border border-amber-200 bg-gradient-to-r from-amber-50 via-orange-50 to-amber-100 p-3 sm:p-4 shadow-xs hover:shadow-md transition"
        >
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="rounded bg-gray-900 px-2 py-0.5 text-[10px] font-extrabold text-amber-300 uppercase tracking-wider">
                CARE PLAN
              </span>
              <p className="text-xs sm:text-sm font-semibold text-gray-800">
                You can save an additional <strong className="text-gray-900">₹600/yr</strong> on consultations with MEDITRUST Care Plan membership
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs font-bold text-[#ff6f61]">
              <span>Explore Plan</span>
              <Icon name="arrow" size={14} />
            </div>
          </div>
        </A>
      </div>

      {/* 2. HERO SECTION matching Screenshot 1 */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-6">
        <div className="overflow-hidden rounded-2xl bg-gradient-to-r from-rose-50 via-orange-50 to-rose-100 p-6 sm:p-10 border border-rose-100 flex flex-col md:flex-row items-center justify-between gap-8 shadow-xs">
          <div className="max-w-xl">
            <span className="inline-block rounded-full bg-[#ff6f61]/15 px-3 py-1 text-xs font-bold text-[#ff6f61]">
              Online Consultations Starting at ₹199
            </span>
            <h1 className="mt-3 text-2xl sm:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight">
              Consult India's Top Doctors Online, Safely from Home
            </h1>
            <p className="mt-3 text-xs sm:text-base text-gray-600 leading-relaxed">
              Connect in under 5 minutes with verified medical practitioners across 25+ specialties via HD Video, Audio call, or WhatsApp chat. Instant verifiable digital prescriptions.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <A
                href="/doctors/general-physician"
                className="rounded-xl bg-[#ff6f61] px-6 py-3 text-xs sm:text-sm font-bold uppercase tracking-wider text-white shadow-md hover:bg-[#e85b4d] transition"
              >
                Consult Now
              </A>
              <A
                href="#specialties"
                className="rounded-xl border border-gray-300 bg-white px-5 py-3 text-xs sm:text-sm font-bold text-gray-700 hover:bg-gray-50 transition shadow-xs"
              >
                Browse Specialties
              </A>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-6 border-t border-rose-200/60 pt-4 text-xs font-medium text-gray-600">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                <span><strong>3,000+</strong> Verified Doctors</span>
              </div>
              <div>
                <span><strong>30 Lakh+</strong> Happy Consultations</span>
              </div>
              <div>
                <span><strong>25+</strong> Specialties</span>
              </div>
            </div>
          </div>

          <div className="shrink-0 flex justify-center">
            <img
              src="/images/consult_doctor/consult_hero_art.png"
              alt="Consult Doctor Online"
              className="max-h-64 sm:max-h-72 object-contain drop-shadow-md"
              onError={(e) => { e.currentTarget.style.display = 'none'; }}
            />
          </div>
        </div>
      </section>

      {/* 3. TRUST PILLARS matching Screenshot 2 */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {consultTrustPillars.map((tp, idx) => (
            <div
              key={idx}
              className="flex items-start gap-4 rounded-xl border border-gray-200 bg-white p-5 shadow-xs hover:shadow-sm transition"
            >
              <div className="h-12 w-12 shrink-0 overflow-hidden rounded-xl bg-orange-50/70 p-2 border border-orange-100 flex items-center justify-center">
                <img
                  src={tp.iconImg}
                  alt={tp.title}
                  className="h-full w-full object-contain"
                  onError={(e) => { e.currentTarget.style.display = 'none'; }}
                />
              </div>
              <div>
                <h3 className="text-xs sm:text-sm font-bold text-gray-900">{tp.title}</h3>
                <p className="mt-1 text-xs text-gray-500 leading-relaxed">{tp.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-6" id="specialties">
        <Crumbs items={[["Doctor consultation"]]} />
        <div className="my-4">
          <DemoNote>
            Demonstration medical consultation platform for <strong>{company.name}</strong>. No actual physician appointment, video call or clinical treatment is performed.
          </DemoNote>
        </div>

        {/* 4. POPULAR SPECIALTIES */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-gray-900">Consult Top Doctors by Specialty</h2>
            <p className="text-xs text-gray-500">Pick from over 25+ verified medical disciplines</p>
          </div>
        </div>
        <SpecialtyGrid />

        {/* 5. FEATURED SPECIALISTS LIST */}
        <h2 className="mb-2 mt-10 text-lg sm:text-xl font-bold text-gray-900">Featured Specialists</h2>
        <p className="mb-4 text-xs text-gray-500">Available right now for instant or scheduled consultations</p>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {state.doctors
            .filter((d) => d.visible)
            .map((d) => (
              <DoctorCard key={d.id} d={d} />
            ))}
        </div>

        {/* 6. PATIENT TESTIMONIALS */}
        <section className="mt-12 rounded-2xl bg-white border border-gray-200 p-6 sm:p-8">
          <h2 className="text-base sm:text-lg font-bold text-gray-900">What Our Patients Say</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            {consultTestimonials.map((t, idx) => (
              <div key={idx} className="rounded-xl bg-gray-50 p-5 border border-gray-100 flex flex-col justify-between">
                <p className="text-xs sm:text-sm italic text-gray-700 leading-relaxed">
                  "{t.text}"
                </p>
                <div className="mt-4 pt-3 border-t border-gray-200 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-gray-900">{t.name}</p>
                    <p className="text-[10px] text-gray-400">{t.role}</p>
                  </div>
                  <div className="flex text-amber-400 text-xs">
                    ★★★★★
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 7. DOCTOR RECRUITMENT BANNER matching Screenshot 3 & 4 */}
        <section className="mt-8 overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-800 to-teal-900 text-white p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md">
          <div className="max-w-lg">
            <span className="rounded bg-emerald-500/30 px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wider text-emerald-200">
              For Healthcare Providers
            </span>
            <h3 className="mt-2 text-xl sm:text-2xl font-bold">Are you a Doctor? Join MEDITRUST</h3>
            <p className="mt-2 text-xs sm:text-sm text-emerald-100 leading-relaxed">
              Expand your digital medical practice. Connect with thousands of verified patients across Maharashtra and India with sovereign scheduling and automated EHR tools.
            </p>
            <div className="mt-4 flex gap-3">
              <a
                href={`tel:${company.phone}`}
                className="rounded-lg bg-white px-5 py-2.5 text-xs font-bold text-emerald-900 shadow hover:bg-emerald-50 transition"
              >
                Join as Doctor · {company.phone}
              </a>
            </div>
          </div>
          <div className="shrink-0">
            <img
              src="/images/consult_doctor/doctor_join_banner.png"
              alt="Doctor Join Banner"
              className="max-h-40 rounded-xl object-contain shadow-sm border border-emerald-700"
              onError={(e) => { e.currentTarget.style.display = 'none'; }}
            />
          </div>
        </section>

        {/* 8. CONSULT FAQs ACCORDION matching Screenshot 3 */}
        <section className="mt-8 rounded-2xl bg-white border border-gray-200 p-6 sm:p-8">
          <h2 className="text-base sm:text-lg font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
          <div className="divide-y divide-gray-100">
            {consultFaqs.map((faq, idx) => (
              <div key={idx} className="py-3.5">
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="flex w-full items-center justify-between text-left text-xs sm:text-sm font-semibold text-gray-800 hover:text-[#ff6f61] transition"
                >
                  <span>{faq.q}</span>
                  <Icon
                    name="chev"
                    size={16}
                    className={cx("text-gray-400 transition-transform", openFaq === idx && "rotate-180")}
                  />
                </button>
                {openFaq === idx && (
                  <p className="mt-2 text-xs text-gray-600 leading-relaxed pr-6">
                    {faq.a}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export function Specialty({ params }) {
  const { state } = useApp();
  const name = specialties.find((s) => slugify(s) === params.specialty);
  if (!name) return <NotFound />;
  const list = state.doctors.filter((d) => d.visible && d.specialty === name);
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-8">
      <Crumbs items={[["Doctor consultation", "/consult-doctor"], [name]]} />
      <h1 className="mb-6 text-2xl sm:text-3xl font-bold text-gray-900">{name}</h1>
      {list.length ? (
        <div className="grid gap-4 md:grid-cols-2">
          {list.map((d) => (
            <DoctorCard key={d.id} d={d} />
          ))}
        </div>
      ) : (
        <Empty
          icon="steth"
          title="No demo profiles here yet"
          text="Try another specialty."
          action="All specialties"
          href="/consult-doctor"
        />
      )}
    </div>
  );
}

export function Doctor({ params }) {
  const { state, update } = useApp();
  const go = useGo();
  const d = state.doctors.find((x) => x.id === params.id && x.visible);
  const [slot, setSlot] = useState("");
  if (!d) return <NotFound />;

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 py-8">
      <Crumbs
        items={[
          ["Doctor consultation", "/consult-doctor"],
          [d.specialty, `/doctors/${slugify(d.specialty)}`],
          [d.name],
        ]}
      />
      <div className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8 shadow-sm grid gap-6 md:grid-cols-[180px_1fr]">
        <div className="aspect-square overflow-hidden rounded-2xl bg-gray-100">
          <Art icon="user" seed={parseInt(d.id.split("-")[1]) || 1} image={d.image} alt={d.name} />
        </div>
        <div>
          <span className="rounded bg-amber-50 px-2 py-0.5 text-xs font-bold text-amber-700">
            Demonstration profile — not a verified professional
          </span>
          <h1 className="mt-2 text-2xl sm:text-3xl font-bold text-gray-900">{d.name}</h1>
          <p className="text-sm font-semibold text-[#ff6f61]">{d.specialty}</p>
          <p className="mt-3 text-xs sm:text-sm text-gray-500 leading-relaxed">{d.description}</p>
          <p className="mt-2 text-xs text-gray-600">
            Languages: {d.languages} · Fee: <strong className="text-gray-900">{money(d.fee)}</strong> (demo)
          </p>

          <h2 className="mb-2 mt-6 text-xs font-bold uppercase tracking-wider text-gray-400">
            Demo availability (tomorrow)
          </h2>
          <div className="flex flex-wrap gap-2">
            {d.slots.map((s) => (
              <button
                key={s}
                onClick={() => setSlot(s)}
                className={cx(
                  "rounded-lg px-3 py-1.5 text-xs font-semibold border transition",
                  slot === s
                    ? "border-[#ff6f61] bg-[#ff6f61]/10 text-[#ff6f61]"
                    : "border-gray-200 text-gray-700 hover:border-gray-300"
                )}
              >
                {s}
              </button>
            ))}
          </div>

          <button
            className="mt-6 rounded-lg bg-[#ff6f61] px-6 py-2.5 text-xs font-bold uppercase text-white shadow hover:bg-[#e85b4d] transition disabled:opacity-50"
            disabled={!slot}
            onClick={() => {
              update({ pendingAppt: { doctor: d.id, time: slot } });
              go("/consultation/booking");
            }}
          >
            Book Demo Appointment
          </button>
        </div>
      </div>
    </div>
  );
}

export function ConsultBooking() {
  const { state, update, log } = useApp();
  const go = useGo();
  const pend = state.pendingAppt;
  const d = state.doctors.find((x) => x.id === pend?.doctor);
  const form = useForm(
    {
      date: days()[0],
      type: "Video",
      patient: state.user?.name || "",
      phone: "",
      reason: "",
    },
    (v) => ({
      ...req(v, ["patient", "date"]),
      ...(phoneOk(v.phone) ? {} : { phone: "Enter a valid 10-digit mobile number." }),
    })
  );

  if (!d)
    return (
      <div className="mx-auto max-w-3xl px-4 py-16">
        <Empty
          icon="steth"
          title="Choose a demo doctor first"
          text="Pick a profile and slot to start."
          action="Browse doctors"
          href="/consult-doctor"
        />
      </div>
    );

  const book = (v) => {
    const a = {
      id: `APT-${Date.now().toString().slice(-5)}`,
      date: v.date,
      time: pend.time,
      patient: v.patient,
      doctor: d.name,
      specialty: d.specialty,
      type: v.type,
      status: "Scheduled",
    };
    update((s) => ({
      appointments: [a, ...s.appointments],
      lastAppointment: a.id,
      pendingAppt: null,
    }));
    log(`Demo appointment ${a.id} created`);
    go("/consultation/confirmation");
  };

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 py-8">
      <Crumbs items={[["Doctor consultation", "/consult-doctor"], ["Booking"]]} />
      <h1 className="mb-6 text-2xl sm:text-3xl font-bold text-gray-900">
        Appointment Details (Demo)
      </h1>

      <form
        noValidate
        onSubmit={form.submit(book)}
        className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm space-y-4"
      >
        <p className="rounded-xl bg-red-50 p-3 text-xs sm:text-sm font-semibold text-[#ff6f61]">
          {d.name} · {d.specialty} · {pend.time} · Fee {money(d.fee)} (demo)
        </p>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Date" error={form.e.date}>
            <select
              className="w-full rounded-md border border-gray-300 p-2 text-xs outline-none focus:border-[#ff6f61]"
              value={form.v.date}
              onChange={form.set("date")}
            >
              {days().map((x) => (
                <option key={x}>{x}</option>
              ))}
            </select>
          </Field>
          <Field label="Consultation Type">
            <select
              className="w-full rounded-md border border-gray-300 p-2 text-xs outline-none focus:border-[#ff6f61]"
              value={form.v.type}
              onChange={form.set("type")}
            >
              <option>Video</option>
              <option>Phone</option>
              <option>In-clinic</option>
            </select>
          </Field>
          <Field label="Patient Name" error={form.e.patient}>
            <input
              className="w-full rounded-md border border-gray-300 p-2 text-xs outline-none focus:border-[#ff6f61]"
              value={form.v.patient}
              onChange={form.set("patient")}
            />
          </Field>
          <Field label="Mobile Number" error={form.e.phone}>
            <input
              className="w-full rounded-md border border-gray-300 p-2 text-xs outline-none focus:border-[#ff6f61]"
              value={form.v.phone}
              onChange={form.set("phone")}
            />
          </Field>
        </div>

        <Field
          label="Reason for Visit (optional)"
          hint="Please don't enter real medical details — this is a demo."
        >
          <input
            className="w-full rounded-md border border-gray-300 p-2 text-xs outline-none focus:border-[#ff6f61]"
            value={form.v.reason}
            onChange={form.set("reason")}
          />
        </Field>

        <button className="w-full rounded-lg bg-[#ff6f61] py-3 text-xs font-bold uppercase text-white shadow hover:bg-[#e85b4d] transition">
          Confirm Demo Appointment
        </button>
      </form>
    </div>
  );
}

export function ConsultConfirm() {
  const { state } = useApp();
  const a = state.appointments.find((x) => x.id === state.lastAppointment);
  return (
    <Confirmation
      title="Demo Appointment Recorded"
      ok={!!a}
      text={
        a && (
          <>
            Appointment <strong>{a.id}</strong> with {a.doctor} ({a.type}) on {a.date} at {a.time}. No
            real consultation will take place.
          </>
        )
      }
    />
  );
}

/* ---------------- Articles ---------------- */
export function ArticleCard({ a }) {
  return (
    <article className="rounded-xl border border-gray-200 bg-white overflow-hidden shadow-xs hover:shadow-md transition">
      <A href={`/health-articles/${a.slug}`} className="block aspect-[16/10] overflow-hidden bg-gray-100">
        <Art icon="book" seed={a.title.length} image={a.image} alt={a.title} />
      </A>
      <div className="p-4">
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <span className="rounded bg-red-50 px-2 py-0.5 text-[10px] font-bold text-[#ff6f61]">
            {a.category}
          </span>
          <span className="flex items-center gap-1 text-[11px]">
            <Icon name="clock" size={12} /> {a.readingTime} min read
          </span>
        </div>
        <A
          href={`/health-articles/${a.slug}`}
          className="mt-2 block font-bold text-gray-900 leading-snug hover:text-[#ff6f61] transition text-sm"
        >
          {a.title}
        </A>
        <p className="mt-1 line-clamp-2 text-xs text-gray-500 leading-relaxed">{a.excerpt}</p>
      </div>
    </article>
  );
}

export function Articles() {
  const { state } = useApp();
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("");
  const pub = state.articles.filter((a) => a.published);
  const list = pub.filter(
    (a) => (!cat || a.category === cat) && a.title.toLowerCase().includes(q.toLowerCase())
  );
  const feat = pub.find((a) => a.featured);

  return (
    <div className="bg-[#f8f9fa] min-h-screen pb-16">
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 py-10 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <p className="text-xs font-bold uppercase tracking-wider text-[#ff6f61]">
            Tata 1mg Health Resource Center
          </p>
          <h1 className="mt-1 text-2xl sm:text-3xl font-extrabold">Health & Wellness Articles</h1>
          <p className="mt-1 text-sm text-gray-300">
            Expert-reviewed articles, seasonal health advice, medicine guides, and wellness tips.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-6">
        <Crumbs items={[["Health articles"]]} />

        {feat && !q && !cat && (
          <A
            href={`/health-articles/${feat.slug}`}
            className="rounded-2xl border border-gray-200 bg-white overflow-hidden shadow-sm grid md:grid-cols-2 mt-4 hover:shadow-md transition"
          >
            <div className="aspect-[16/10] md:aspect-auto bg-gray-100">
              <Art icon="book" image={feat.image} alt={feat.title} />
            </div>
            <div className="p-6 flex flex-col justify-between">
              <div>
                <span className="rounded bg-red-50 px-2 py-0.5 text-xs font-bold text-[#ff6f61]">
                  Featured · {feat.category}
                </span>
                <h2 className="mt-3 text-xl sm:text-2xl font-bold text-gray-900">{feat.title}</h2>
                <p className="mt-2 text-xs sm:text-sm text-gray-500 leading-relaxed">{feat.excerpt}</p>
              </div>
              <span className="mt-4 flex items-center gap-1 text-xs font-bold text-[#ff6f61]">
                Read Article <Icon name="arrow" size={14} />
              </span>
            </div>
          </A>
        )}

        <div className="my-6 flex flex-col gap-3 sm:flex-row bg-white p-3 rounded-xl border border-gray-200">
          <input
            className="rounded-lg border border-gray-200 px-3 py-2 text-xs outline-none focus:border-[#ff6f61] sm:max-w-xs"
            placeholder="Search articles..."
            aria-label="Search articles"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
          <div className="flex gap-2 overflow-x-auto">
            {["", ...new Set(pub.map((a) => a.category))].map((c) => (
              <button
                key={c || "all"}
                className={cx(
                  "rounded-full px-3 py-1 text-xs font-semibold whitespace-nowrap transition",
                  cat === c ? "bg-[#ff6f61] text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                )}
                onClick={() => setCat(c)}
              >
                {c || "All Topics"}
              </button>
            ))}
          </div>
        </div>

        {list.length ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((a) => (
              <ArticleCard key={a.id} a={a} />
            ))}
          </div>
        ) : (
          <Empty icon="book" title="No articles found" text="Try another search." />
        )}
      </div>
    </div>
  );
}

export function Article({ params }) {
  const { state, toast } = useApp();
  const a = state.articles.find((x) => x.slug === params.slug && x.published);
  if (!a) return <NotFound />;
  const related = state.articles
    .filter((x) => x.published && x.id !== a.id && x.category === a.category)
    .slice(0, 3);

  const share = async () => {
    try {
      if (navigator.share) await navigator.share({ title: a.title, url: location.href });
      else {
        await navigator.clipboard.writeText(location.href);
        toast("Link copied to clipboard", "info");
      }
    } catch {
      /* user cancelled */
    }
  };

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 py-8">
      <Crumbs items={[["Health articles", "/health-articles"], [a.category]]} />
      <span className="rounded bg-red-50 px-2.5 py-1 text-xs font-bold text-[#ff6f61]">
        {a.category}
      </span>
      <h1 className="mt-3 text-2xl sm:text-4xl font-extrabold text-gray-900 leading-tight">
        {a.title}
      </h1>
      <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-gray-500">
        <span>By {a.author}</span>
        <span>·</span>
        <span>{a.date}</span>
        <span>·</span>
        <span>{a.readingTime} min read</span>
        <button
          className="ml-auto inline-flex items-center gap-1.5 rounded-md border border-gray-300 px-3 py-1 text-xs font-semibold text-gray-700 hover:bg-gray-50 transition"
          onClick={share}
        >
          <Icon name="share" size={14} /> Share
        </button>
      </div>

      <div className="my-6 aspect-[16/9] overflow-hidden rounded-2xl bg-gray-100">
        <Art icon="book" image={a.image} alt={a.title} />
      </div>

      <div className="space-y-4 text-sm sm:text-base text-gray-800 leading-relaxed">
        {a.body
          .split("\n")
          .filter(Boolean)
          .map((p, i) => (
            <p key={i}>{p}</p>
          ))}
      </div>

      <div className="my-8">
        <DemoNote>
          This content is general information and is not a substitute for professional medical advice,
          diagnosis or treatment.
        </DemoNote>
      </div>

      {related.length > 0 && (
        <div className="mt-12 border-t border-gray-200 pt-8">
          <h2 className="mb-4 text-xl font-bold text-gray-900">Related Articles</h2>
          <div className="grid gap-4 sm:grid-cols-3">
            {related.map((r) => (
              <ArticleCard key={r.id} a={r} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/* ---------------- Info pages ---------------- */
export function InfoPage({ id }) {
  const { state } = useApp();
  const pg = state.pages.find((p) => p.id === id);
  if (!pg) return <NotFound />;

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 py-10">
      <Crumbs items={[[pg.title]]} />
      <h1 className="mb-6 text-3xl font-extrabold text-gray-900">{pg.title}</h1>
      <div className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8 shadow-sm space-y-4 text-sm text-gray-700 leading-relaxed">
        {pg.body
          .split("\n")
          .filter(Boolean)
          .map((p, i) => (
            <p key={i}>{p}</p>
          ))}

        {id === "about" && (
          <div className="mt-6 grid gap-4 sm:grid-cols-2 border-t border-gray-100 pt-6">
            <div className="rounded-xl bg-gray-50 p-4 border border-gray-100">
              <h2 className="font-bold text-gray-900 text-xs uppercase tracking-wider">Registered Directors &amp; Leadership</h2>
              <ul className="mt-2 text-xs text-gray-600 space-y-1">
                <li>Ajay Kumar Pathri (Registered Director)</li>
                <li>Omkar Sanjay Telangi (Registered Director)</li>
              </ul>
            </div>
            <div className="rounded-xl bg-gray-50 p-4 border border-gray-100">
              <h2 className="font-bold text-gray-900 text-xs uppercase tracking-wider">
                Corporate &amp; Registered Address
              </h2>
              <p className="mt-2 text-xs text-gray-600 leading-relaxed">{state.settings.address}</p>
            </div>
          </div>
        )}
      </div>
      {id === "about" && (
        <div className="mt-6 flex gap-3">
          <A
            href="/contact"
            className="rounded-lg bg-[#ff6f61] px-5 py-2.5 text-xs font-bold text-white shadow"
          >
            Contact Us
          </A>
          <A
            href="/medicines"
            className="rounded-lg border border-gray-300 px-5 py-2.5 text-xs font-semibold text-gray-700 hover:bg-gray-50"
          >
            Explore Medicines
          </A>
        </div>
      )}
    </div>
  );
}

export function Contact() {
  const { state } = useApp();
  const s = state.settings;
  const [sent, setSent] = useState(false);
  const form = useForm(
    { name: "", email: "", phone: "", message: "" },
    (v) => ({
      ...req(v, ["name", "message"]),
      ...(emailOk(v.email) ? {} : { email: "Enter a valid email address." }),
      ...(v.phone && !phoneOk(v.phone) ? { phone: "Enter a valid 10-digit mobile number." } : {}),
      ...(v.message.trim().length && v.message.trim().length < 10
        ? { message: "Please write at least 10 characters." }
        : {}),
    })
  );

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 py-10">
      <Crumbs items={[["Contact"]]} />
      <h1 className="mb-6 text-3xl font-extrabold text-gray-900">Contact Us</h1>
      <div className="grid gap-6 lg:grid-cols-[1fr_1.3fr]">
        <div className="space-y-3">
          {[
            ["phone", "Phone", s.phone, `tel:${s.phone.replace(/\s/g, "")}`],
            ["mail", "Email", s.email, `mailto:${s.email}`],
            ["pin", "Corporate Office", s.address],
          ].map(([i, l, v, h]) => (
            <div key={l} className="rounded-xl border border-gray-200 bg-white p-4 flex gap-3 shadow-xs">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-red-50 text-[#ff6f61]">
                <Icon name={i} size={18} />
              </span>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">{l}</p>
                {h ? (
                  <a href={h} className="text-xs font-bold text-gray-800 hover:text-[#ff6f61]">
                    {v}
                  </a>
                ) : (
                  <p className="text-xs font-semibold text-gray-800">{v}</p>
                )}
              </div>
            </div>
          ))}
          <p className="text-xs text-gray-400 mt-2">{s.companyName}</p>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          {sent ? (
            <div className="py-10 text-center">
              <span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-emerald-100 text-emerald-600">
                <Icon name="check" size={24} />
              </span>
              <h2 className="mt-3 text-lg font-bold text-gray-900">
                Thanks — message received (demo)
              </h2>
              <p className="mt-1 text-xs text-gray-500">
                This form is a demonstration; no email was sent. For real enquiries, write to {s.email}.
              </p>
              <button
                className="mt-5 rounded-lg border border-gray-300 px-4 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-50"
                onClick={() => {
                  setSent(false);
                  form.setV({ name: "", email: "", phone: "", message: "" });
                }}
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form
              noValidate
              onSubmit={form.submit(() => setSent(true))}
              className="grid gap-4 sm:grid-cols-2"
            >
              <Field label="Name" error={form.e.name}>
                <input
                  className="w-full rounded-md border border-gray-300 p-2 text-xs outline-none focus:border-[#ff6f61]"
                  value={form.v.name}
                  onChange={form.set("name")}
                />
              </Field>
              <Field label="Email" error={form.e.email}>
                <input
                  className="w-full rounded-md border border-gray-300 p-2 text-xs outline-none focus:border-[#ff6f61]"
                  type="email"
                  value={form.v.email}
                  onChange={form.set("email")}
                />
              </Field>
              <div className="sm:col-span-2">
                <Field label="Phone (optional)" error={form.e.phone}>
                  <input
                    className="w-full rounded-md border border-gray-300 p-2 text-xs outline-none focus:border-[#ff6f61]"
                    value={form.v.phone}
                    onChange={form.set("phone")}
                  />
                </Field>
              </div>
              <div className="sm:col-span-2">
                <Field label="Message" error={form.e.message}>
                  <textarea
                    rows={4}
                    className="w-full rounded-md border border-gray-300 p-2 text-xs outline-none focus:border-[#ff6f61]"
                    value={form.v.message}
                    onChange={form.set("message")}
                  />
                </Field>
              </div>
              <button className="sm:col-span-2 rounded-lg bg-[#ff6f61] py-2.5 text-xs font-bold uppercase text-white shadow hover:bg-[#e85b4d] transition">
                Send Message
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export function Faq() {
  const { state } = useApp();
  const [open, setOpen] = useState(0);

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 py-10">
      <Crumbs items={[["FAQs"]]} />
      <h1 className="mb-6 text-3xl font-extrabold text-gray-900">Frequently Asked Questions</h1>
      <div className="space-y-3">
        {state.faqs
          .filter((f) => f.visible)
          .map((f, i) => (
            <div
              key={f.id}
              className="rounded-xl border border-gray-200 bg-white overflow-hidden shadow-xs"
            >
              <button
                className="flex w-full items-center justify-between gap-3 p-4 text-left font-bold text-sm text-gray-900 hover:text-[#ff6f61] transition"
                aria-expanded={open === i}
                onClick={() => setOpen(open === i ? -1 : i)}
              >
                <span>{f.question}</span>
                <Icon
                  name="chev"
                  size={16}
                  className={cx("shrink-0 text-gray-400 transition-transform", open === i && "rotate-180")}
                />
              </button>
              {open === i && (
                <p className="px-4 pb-4 text-xs sm:text-sm text-gray-600 leading-relaxed border-t border-gray-50 pt-3">
                  {f.answer}
                </p>
              )}
            </div>
          ))}
      </div>
    </div>
  );
}

/* ---------------- Offers (Pixel-Perfect to offers page.png) ---------------- */
function PartnerLogo({ type }) {
  if (type === "amazon") {
    return (
      <div className="flex flex-col items-center justify-center">
        <span className="font-sans font-black text-2xl tracking-tight text-gray-900 leading-none">
          pay
        </span>
        <svg className="w-16 h-3 mt-0.5" viewBox="0 0 100 24" fill="none">
          <path
            d="M 10 6 Q 50 24 90 6"
            stroke="#ff9900"
            strokeWidth="6"
            strokeLinecap="round"
          />
          <path d="M 85 4 L 92 7 L 85 14" fill="#ff9900" />
        </svg>
      </div>
    );
  }
  if (type === "mobikwik") {
    return (
      <div className="w-16 h-16 rounded-2xl bg-[#0055ff] flex items-center justify-center shadow-sm">
        <svg className="w-10 h-10 text-white" viewBox="0 0 24 24" fill="currentColor">
          <path d="M4 6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6zm3 10h2.5l2-4.5 2 4.5H16l-3.5-7h-2L7 16z" />
        </svg>
      </div>
    );
  }
  if (type === "paytm") {
    return (
      <div className="w-16 h-16 rounded-2xl bg-sky-50 border border-sky-200 flex items-center justify-center p-2 shadow-xs">
        <span className="font-sans font-black text-xl text-[#002e6e] tracking-tight">
          pay<span className="text-[#00baf2]">tm</span>
        </span>
      </div>
    );
  }
  if (type === "simpl") {
    return (
      <div className="w-16 h-16 rounded-2xl bg-[#1a2d36] flex items-center justify-center p-2 shadow-xs">
        <span className="font-sans font-black text-xl text-[#00d68f] tracking-tight">
          simpl
        </span>
      </div>
    );
  }
  if (type === "tata1mg") {
    return (
      <div className="w-16 h-16 rounded-2xl bg-red-50 border border-red-200 flex flex-col items-center justify-center p-1.5 shadow-xs text-center">
        <span className="text-[9px] font-bold text-gray-800 tracking-wider">TATA</span>
        <span className="text-base font-black text-[#ff6f61] leading-none">1mg</span>
        <span className="text-[7px] font-extrabold text-gray-500 uppercase tracking-widest mt-0.5">
          LABS
        </span>
      </div>
    );
  }
  if (type === "hdfc") {
    return (
      <div className="w-16 h-16 rounded-2xl bg-[#004c8f] flex flex-col items-center justify-center p-1.5 shadow-xs text-center">
        <div className="w-4 h-4 bg-red-600 rounded-xs mb-0.5 flex items-center justify-center">
          <div className="w-2 h-2 bg-white"></div>
        </div>
        <span className="text-[8px] font-bold text-white tracking-tight leading-tight">
          HDFC BANK
        </span>
      </div>
    );
  }
  return (
    <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center text-[#ff6f61] font-bold text-sm">
      1mg
    </div>
  );
}

export function Offers() {
  const { toast } = useApp();
  const [tab, setTab] = useState("medicine"); // "medicine" | "lab"
  const [openDetails, setOpenDetails] = useState({});

  const toggleDetails = (id) => {
    setOpenDetails((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const copyCode = (code) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(code);
      toast(`Coupon code ${code} copied!`);
    }
  };

  const medicineOffers = offersData?.medicines || [
    {
      id: "med-1",
      partner: "Amazon Pay",
      logo: "amazon",
      headline: "Get up to ₹75 cashback on a minimum order value (MOV) of ₹499 and above, valid once per customer.",
      expiry: "Expiry: 31 Oct 26",
      code: "AMZ75",
    },
    {
      id: "med-2",
      partner: "Amazon Pay",
      logo: "amazon",
      headline: "Get up to ₹75 cashback on a minimum order value (MOV) of ₹499 and above, valid once per customer.",
      expiry: "Expiry: 31 Oct 26",
      code: "AMZPAY",
    },
    {
      id: "med-3",
      partner: "Mobikwik",
      logo: "mobikwik",
      headline: "Get upto Rs.150 Cashback on minimum transaction of Rs.599/- with Mobikwik UPI (@ikwik).",
      expiry: "Expiry: 31 Oct 26",
      code: "MBK150",
    },
    {
      id: "med-4",
      partner: "Paytm",
      logo: "paytm",
      headline: "Assured cashback up to ₹300*. T&C Apply* on your wallet and UPI payments.",
      expiry: "Expiry: 31 Oct 26",
      code: "PAYTM300",
    },
    {
      id: "med-5",
      partner: "Simpl",
      logo: "simpl",
      headline: "Get 10% instant cashback up to ₹100 on your first Simpl checkout on Tata 1mg.",
      expiry: "Expiry: 31 Oct 26",
      code: "SIMPL100",
    },
  ];

  const labOffers = offersData?.labTests || [
    {
      id: "lab-1",
      partner: "Tata 1mg Labs",
      logo: "tata1mg",
      headline: "Flat 50% discount on comprehensive full body checkup packages.",
      expiry: "Expiry: 31 Oct 26",
      code: "HEALTH50",
    },
    {
      id: "lab-2",
      partner: "HDFC Bank",
      logo: "hdfc",
      headline: "Flat ₹200 off on diagnostic tests and pathology above ₹999 with HDFC credit/debit cards.",
      expiry: "Expiry: 31 Oct 26",
      code: "HDFC200",
    },
  ];

  const currentOffers = tab === "medicine" ? medicineOffers : labOffers;

  return (
    <div className="bg-white min-h-[85vh] py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-col md:flex-row items-start gap-8">
          {/* Left Sidebar matching offers page.png */}
          <aside className="w-full md:w-64 shrink-0 rounded-2xl border border-gray-200 bg-white p-5 shadow-xs">
            <nav className="flex md:flex-col gap-3">
              <button
                type="button"
                onClick={() => setTab("medicine")}
                className={cx(
                  "text-left text-sm font-bold transition py-1 px-2 rounded-lg",
                  tab === "medicine"
                    ? "text-[#ff6f61] bg-red-50/50"
                    : "text-gray-900 hover:text-[#ff6f61]"
                )}
              >
                Medicine Offers
              </button>
              <button
                type="button"
                onClick={() => setTab("lab")}
                className={cx(
                  "text-left text-sm font-bold transition py-1 px-2 rounded-lg",
                  tab === "lab"
                    ? "text-[#ff6f61] bg-red-50/50"
                    : "text-gray-900 hover:text-[#ff6f61]"
                )}
              >
                Lab Test Offers
              </button>
            </nav>
          </aside>

          {/* Right Offers List matching offers page.png */}
          <main className="flex-1 w-full">
            <h1 className="text-xl font-bold text-gray-900 mb-5">
              {tab === "medicine" ? "Medicine Offers" : "Lab Test Offers"}
            </h1>

            <div className="space-y-4">
              {currentOffers.map((o) => (
                <div
                  key={o.id}
                  className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-6 shadow-xs hover:shadow-sm transition"
                >
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                    {/* Brand Logo Box */}
                    <div className="w-24 sm:w-28 h-20 shrink-0 flex items-center justify-center">
                      <PartnerLogo type={o.logo} />
                    </div>

                    {/* Offer Content */}
                    <div className="flex-1 min-w-0">
                      {/* Top Dash Accent matching screenshot */}
                      <div className="w-4 h-1 bg-[#ff6f61] rounded-full mb-2"></div>
                      <h2 className="text-sm sm:text-base font-bold text-gray-900 leading-snug">
                        {o.headline}
                      </h2>
                      <p className="mt-1 text-xs sm:text-sm text-gray-500">{o.expiry}</p>

                      <div className="mt-3 flex items-center justify-between">
                        <button
                          type="button"
                          onClick={() => toggleDetails(o.id)}
                          className="text-xs sm:text-sm font-semibold text-[#ff6f61] hover:underline"
                        >
                          {openDetails[o.id] ? "Hide Details" : "Offer Details"}
                        </button>

                        {o.code && (
                          <button
                            type="button"
                            onClick={() => copyCode(o.code)}
                            className="rounded-md border border-dashed border-[#ff6f61] bg-red-50/30 px-3 py-1 text-xs font-bold text-[#ff6f61] hover:bg-[#ff6f61] hover:text-white transition"
                          >
                            CODE: {o.code}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Expandable Terms & Conditions */}
                  {openDetails[o.id] && (
                    <div className="mt-4 border-t border-gray-100 pt-3 text-xs text-gray-600 bg-gray-50/70 p-4 rounded-xl space-y-1.5 animate-in fade-in duration-200">
                      <p className="font-bold text-gray-800">Terms & Conditions:</p>
                      <ul className="list-disc pl-4 space-y-1 text-gray-500">
                        <li>Offer valid on minimum order value as specified in the promo.</li>
                        <li>Cashback will be credited to your linked wallet/account within 24-48 working hours.</li>
                        <li>Applicable once per user during the ongoing promotional campaign.</li>
                        <li>Tata 1mg reserves the right to modify or withdraw the promotion at its discretion.</li>
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

/* ---------------- AYURVEDA PAGE ---------------- */
export function Ayurveda() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedLetter, setSelectedLetter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const alphabet = ["All", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "Y", "Z"];

  const filteredDirectory = ayurvedaAZDirectory.filter((item) => {
    const matchesLetter = selectedLetter === "All" || item.letter === selectedLetter;
    const matchesSearch = !searchTerm || 
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.botName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.benefits.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesLetter && matchesSearch;
  });

  return (
    <div className="bg-[#f8f9fa] min-h-screen pb-16">
      {/* 1. HINDI ARTH BANNER matching Screenshot 1 */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 pt-4">
        <div className="overflow-hidden rounded-xl border border-amber-200 bg-[#fff9f2] shadow-xs">
          <img
            src="/images/ayurveda/arth_banner.png"
            alt="Ayurveda Arth Banner - ज्ञान, स्वास्थ्य और दीर्घायु"
            className="w-full object-cover max-h-24 sm:max-h-28"
            onError={(e) => { e.currentTarget.style.display = 'none'; }}
          />
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-6">
        <Crumbs items={[["Ayurveda & Herbal Care"]]} />
        <div className="my-3">
          <DemoNote>
            Authentic Ayurvedic health information and genuine herbal catalog curated for <strong>{company.name}</strong>.
          </DemoNote>
        </div>

        {/* 2. SECTION: FEATURED HERBS matching Screenshot 1 */}
        <section className="mt-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Featured Herbs</h2>
              <p className="text-xs text-gray-500">Ancient remedies backed by modern clinical research</p>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-3 sm:gap-4">
            {ayurvedaFeaturedHerbs.map((h) => (
              <div
                key={h.id}
                className="group rounded-xl border border-gray-200 bg-white p-3 text-center shadow-xs hover:border-emerald-500 hover:shadow-md transition flex flex-col justify-between"
              >
                <div className="mx-auto h-24 w-24 sm:h-28 sm:w-28 overflow-hidden rounded-lg bg-emerald-50/50 p-1 flex items-center justify-center">
                  <img
                    src={h.img}
                    alt={h.name}
                    className="h-full w-full object-contain group-hover:scale-105 transition"
                    onError={(e) => { e.currentTarget.style.display = 'none'; }}
                  />
                </div>
                <div className="mt-2">
                  <h3 className="text-xs sm:text-sm font-bold text-gray-900 group-hover:text-emerald-700 transition">
                    {h.name}
                  </h3>
                  <p className="mt-0.5 text-[11px] font-medium text-emerald-600">{h.subtitle}</p>
                  <p className="mt-1 text-[10px] text-gray-400 line-clamp-2">{h.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 3. SECTION: HERBS FOR SKIN CARE matching Screenshot 2 */}
        <section className="mt-10">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Herbs for Skin Care</h2>
              <p className="text-xs text-gray-500">Herbal extracts to nourish, heal and brighten your natural skin glow</p>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-3 sm:gap-4">
            {ayurvedaSkinHerbs.map((h) => (
              <div
                key={h.id}
                className="group rounded-xl border border-gray-200 bg-white p-3 text-center shadow-xs hover:border-rose-400 hover:shadow-md transition flex flex-col justify-between"
              >
                <div className="mx-auto h-24 w-24 sm:h-28 sm:w-28 overflow-hidden rounded-lg bg-rose-50/50 p-1 flex items-center justify-center">
                  <img
                    src={h.img}
                    alt={h.name}
                    className="h-full w-full object-contain group-hover:scale-105 transition"
                    onError={(e) => { e.currentTarget.style.display = 'none'; }}
                  />
                </div>
                <div className="mt-2">
                  <h3 className="text-xs sm:text-sm font-bold text-gray-900 group-hover:text-rose-600 transition">
                    {h.name}
                  </h3>
                  <p className="mt-0.5 text-[11px] font-medium text-rose-500">{h.subtitle}</p>
                  <p className="mt-1 text-[10px] text-gray-400 line-clamp-2">{h.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 4. SECTION: HERBS FOR DIGESTIVE CARE matching Screenshot 2 */}
        <section className="mt-10">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Herbs for Digestive Care</h2>
              <p className="text-xs text-gray-500">Ayurvedic roots, fruits, and seeds that balance gut flora and metabolism</p>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-3 sm:gap-4">
            {ayurvedaDigestiveHerbs.map((h) => (
              <div
                key={h.id}
                className="group rounded-xl border border-gray-200 bg-white p-3 text-center shadow-xs hover:border-amber-500 hover:shadow-md transition flex flex-col justify-between"
              >
                <div className="mx-auto h-24 w-24 sm:h-28 sm:w-28 overflow-hidden rounded-lg bg-amber-50/50 p-1 flex items-center justify-center">
                  <img
                    src={h.img}
                    alt={h.name}
                    className="h-full w-full object-contain group-hover:scale-105 transition"
                    onError={(e) => { e.currentTarget.style.display = 'none'; }}
                  />
                </div>
                <div className="mt-2">
                  <h3 className="text-xs sm:text-sm font-bold text-gray-900 group-hover:text-amber-700 transition">
                    {h.name}
                  </h3>
                  <p className="mt-0.5 text-[11px] font-medium text-amber-600">{h.subtitle}</p>
                  <p className="mt-1 text-[10px] text-gray-400 line-clamp-2">{h.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 5. SECTION: HERBS FOR HAIR CARE matching Screenshot 3 */}
        <section className="mt-10">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Herbs for Hair Care</h2>
              <p className="text-xs text-gray-500">Traditional botanicals for root strength, shine, and scalp health</p>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-3 sm:gap-4">
            {ayurvedaHairHerbs.map((h) => (
              <div
                key={h.id}
                className="group rounded-xl border border-gray-200 bg-white p-3 text-center shadow-xs hover:border-teal-500 hover:shadow-md transition flex flex-col justify-between"
              >
                <div className="mx-auto h-24 w-24 sm:h-28 sm:w-28 overflow-hidden rounded-lg bg-teal-50/50 p-1 flex items-center justify-center">
                  <img
                    src={h.img}
                    alt={h.name}
                    className="h-full w-full object-contain group-hover:scale-105 transition"
                    onError={(e) => { e.currentTarget.style.display = 'none'; }}
                  />
                </div>
                <div className="mt-2">
                  <h3 className="text-xs sm:text-sm font-bold text-gray-900 group-hover:text-teal-700 transition">
                    {h.name}
                  </h3>
                  <p className="mt-0.5 text-[11px] font-medium text-teal-600">{h.subtitle}</p>
                  <p className="mt-1 text-[10px] text-gray-400 line-clamp-2">{h.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 6. A-Z AYURVEDIC HERBS DIRECTORY matching Screenshots 3-7 */}
        <section className="mt-12 rounded-2xl bg-white border border-gray-200 p-6 sm:p-8 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Ayurvedic Herbs A-Z Directory</h2>
              <p className="text-xs text-gray-500">Explore comprehensive encyclopedic profiles, botanical taxonomy, and therapeutic applications</p>
            </div>
            <div className="relative w-full sm:w-72">
              <input
                type="text"
                placeholder="Search herb name or benefit..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-lg border border-gray-300 py-2 pl-3 pr-8 text-xs outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600"
              />
              {searchTerm && (
                <button
                  type="button"
                  onClick={() => setSearchTerm("")}
                  className="absolute right-2.5 top-2.5 text-gray-400 hover:text-gray-600"
                >
                  <Icon name="close" size={14} />
                </button>
              )}
            </div>
          </div>

          {/* Alphabet Tabs */}
          <div className="mt-6 flex flex-wrap gap-1.5 border-b border-gray-100 pb-4">
            {alphabet.map((letter) => (
              <button
                key={letter}
                onClick={() => setSelectedLetter(letter)}
                className={cx(
                  "min-w-7 h-7 rounded px-1.5 text-xs font-bold transition",
                  selectedLetter === letter
                    ? "bg-emerald-700 text-white shadow-xs"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                )}
              >
                {letter}
              </button>
            ))}
          </div>

          {/* 3-Column Herb Directory Grid */}
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredDirectory.length > 0 ? (
              filteredDirectory.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3.5 rounded-xl border border-gray-100 bg-[#fafafa] p-3 hover:border-emerald-400 hover:bg-white hover:shadow-xs transition"
                >
                  <div className="h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-emerald-50 p-1 border border-emerald-100">
                    <img
                      src={item.thumb}
                      alt={item.name}
                      className="h-full w-full object-contain"
                      onError={(e) => { e.currentTarget.style.display = 'none'; }}
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-baseline justify-between gap-1">
                      <h4 className="text-xs sm:text-sm font-bold text-gray-900 truncate">{item.name}</h4>
                      <span className="rounded bg-emerald-100 px-1.5 py-0.2 text-[9px] font-bold text-emerald-800 shrink-0">
                        {item.letter}
                      </span>
                    </div>
                    <p className="text-[11px] italic text-gray-500 truncate">{item.botName}</p>
                    <p className="mt-0.5 text-[10px] text-gray-600 font-medium truncate">
                      Benefits: {item.benefits}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full py-12 text-center text-xs text-gray-400">
                No herbs found matching your search.
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

/* ---------------- PARTNERSHIPS PAGE ---------------- */
export function Partnerships() {
  const [activeTab, setActiveTab] = useState("hospital");
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

  return (
    <div className="bg-[#f8f9fa] min-h-screen pb-16">
      {/* 1. HERO SECTION matching Screenshot 1 */}
      <section className="bg-gradient-to-r from-orange-50 via-amber-50 to-rose-50 border-b border-orange-100 py-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 flex flex-col lg:flex-row items-center justify-between gap-10">
          <div className="max-w-2xl">
            <span className="inline-block rounded-full bg-orange-100 px-3 py-1 text-xs font-bold text-orange-800 uppercase tracking-wider">
              MEDITRUST Enterprise Healthcare
            </span>
            <h1 className="mt-4 text-3xl sm:text-5xl font-black text-gray-900 tracking-tight leading-tight">
              Let's Empower Healthcare Together
            </h1>
            <p className="mt-4 text-sm sm:text-base text-gray-600 leading-relaxed">
              Partner with India's trusted omnichannel healthcare and pharmacy network. We empower hospitals, corporations, diagnostic labs, insurance providers, and pharmaceutical innovators with cutting-edge digital supply chains and telehealth platforms.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="#lead-form"
                className="rounded-xl bg-[#ff6f61] px-6 py-3 text-xs sm:text-sm font-bold uppercase tracking-wider text-white shadow-md hover:bg-[#e85b4d] transition"
              >
                Partner With Us
              </a>
              <a
                href={`tel:${company.phone}`}
                className="rounded-xl border border-gray-300 bg-white px-5 py-3 text-xs sm:text-sm font-bold text-gray-700 hover:bg-gray-50 transition shadow-xs flex items-center gap-2"
              >
                <Icon name="phone" size={16} className="text-[#ff6f61]" />
                <span>Call {company.phone}</span>
              </a>
            </div>
          </div>

          <div className="shrink-0 flex justify-center">
            <img
              src="/images/partnerships/partner_floral_hero.png"
              alt="Healthcare Partnerships"
              className="max-h-72 sm:max-h-80 object-contain drop-shadow-md"
              onError={(e) => { e.currentTarget.style.display = 'none'; }}
            />
          </div>
        </div>
      </section>

      {/* 2. SCALE & REACH STATS matching Screenshot 2 */}
      <section className="border-b border-gray-200 bg-white py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {partnerStats.map((st, idx) => (
              <div key={idx} className="p-2">
                <p className="text-2xl sm:text-4xl font-extrabold text-[#ff6f61]">{st.value}</p>
                <p className="mt-1 text-xs font-semibold text-gray-600">{st.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-10">
        {/* 3. CORE PLATFORM SOLUTIONS matching Screenshot 2 */}
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
                  <div className="h-44 overflow-hidden bg-gray-50 border-b border-gray-100 flex items-center justify-center p-2">
                    <img
                      src={sol.img}
                      alt={sol.title}
                      className="h-full w-full object-contain"
                      onError={(e) => { e.currentTarget.style.display = 'none'; }}
                    />
                  </div>
                  <div className="p-6">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#ff6f61]">
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

        {/* 4. TAILORED SECTOR SOLUTIONS TABS matching Screenshots 3-7 */}
        <section className="mt-16 rounded-2xl bg-white border border-gray-200 p-6 sm:p-10 shadow-xs">
          <div className="text-center max-w-xl mx-auto mb-8">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Tailored Strategic Solutions</h2>
            <p className="mt-1 text-xs text-gray-500">Industry-specific healthcare architectures tailored to your operational models</p>
          </div>

          <div className="flex flex-wrap justify-center gap-2 border-b border-gray-200 pb-4">
            {[
              ["hospital", "Hospital Services"],
              ["patient-support", "Patient Support Programs"],
              ["insurance", "Insurance & TPA Networks"],
              ["corporate", "Corporate Wellness"],
              ["clinical", "Clinical Research Logistics"],
            ].map(([tabKey, tabLabel]) => (
              <button
                key={tabKey}
                onClick={() => setActiveTab(tabKey)}
                className={cx(
                  "rounded-full px-4 py-2 text-xs font-bold transition",
                  activeTab === tabKey
                    ? "bg-[#ff6f61] text-white shadow-xs"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                )}
              >
                {tabLabel}
              </button>
            ))}
          </div>

          <div className="mt-8 grid gap-8 lg:grid-cols-2 items-center">
            <div>
              <span className="text-xs font-bold text-[#ff6f61] uppercase">Sector Focus</span>
              <h3 className="mt-1 text-xl font-bold text-gray-900">
                {activeTab === "hospital" && "Hospital Digital Pharmacy & Home Discharge Delivery"}
                {activeTab === "patient-support" && "Patient Support Programs (PSP) for Chronic Therapies"}
                {activeTab === "insurance" && "Cashless OPD, Diagnostic & Pharmacy Benefits Integration"}
                {activeTab === "corporate" && "Comprehensive Annual Health Checkups & Employee Care"}
                {activeTab === "clinical" && "Temperature-Controlled Clinical Trial Sample Logistics"}
              </h3>
              <p className="mt-3 text-xs sm:text-sm text-gray-600 leading-relaxed">
                {activeTab === "hospital" && "Enable discharged patients to receive prescribed medicines at home within 2 hours. Seamless API integration with your hospital Information System (HIS) ensures zero stockouts, automated substitution checks, and real-time delivery tracking."}
                {activeTab === "patient-support" && "Dedicated patient counseling, financial assistance program management, and monthly medication compliance refills for cardiology, oncology, and endocrinology regimens."}
                {activeTab === "insurance" && "Direct cashless claim settlement for OPD prescriptions, home lab tests, and health supplements across India. Reduces administrative overhead with automated fraud-check algorithms."}
                {activeTab === "corporate" && "Custom wellness dashboards, ergonomic on-site biometric screening camps, annual health checkups, and corporate pharmacy discounts for teams of 50 to 50,000 employees."}
                {activeTab === "clinical" && "Cold-chain validation (-20°C to +25°C), barcoded biological sample transport, and strict regulatory compliance aligned with GCP and ICMR guidelines."}
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
                className="w-full object-cover max-h-80"
                onError={(e) => { e.currentTarget.style.display = 'none'; }}
              />
            </div>
          </div>
        </section>

        {/* 5. CONTACT / LEAD FORM matching Screenshot 8 & 9 */}
        <section id="lead-form" className="mt-16 rounded-2xl bg-white border border-gray-200 p-6 sm:p-10 shadow-xs">
          <div className="grid gap-8 lg:grid-cols-2">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-wider text-[#ff6f61]">
                Connect With Our Corporate Team
              </span>
              <h2 className="mt-2 text-2xl sm:text-3xl font-extrabold text-gray-900">
                Partner with MEDITRUST LIFE SCIENCE PVT LTD
              </h2>
              <p className="mt-3 text-xs sm:text-sm text-gray-600 leading-relaxed">
                Whether you represent a hospital network, diagnostic franchise, corporate HR team, or pharmaceutical enterprise, our business development team will craft a bespoke collaboration package.
              </p>

              <div className="mt-8 space-y-4 text-xs sm:text-sm text-gray-700">
                <div className="flex items-start gap-3">
                  <Icon name="pin" size={18} className="text-[#ff6f61] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-gray-900">Registered Office:</strong>
                    <p className="text-xs text-gray-500">{company.address}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Icon name="phone" size={18} className="text-[#ff6f61] shrink-0" />
                  <div>
                    <strong className="text-gray-900">Direct Contact:</strong>
                    <p className="text-xs text-gray-500">{company.phone}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Icon name="mail" size={18} className="text-[#ff6f61] shrink-0" />
                  <div>
                    <strong className="text-gray-900">Email Inquiries:</strong>
                    <p className="text-xs text-gray-500">{company.email}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Icon name="user" size={18} className="text-[#ff6f61] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-gray-900">Registered Directors:</strong>
                    <p className="text-xs text-gray-500">{company.directors.join(" · ")}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-xl bg-gray-50 p-6 border border-gray-200">
              {submitted ? (
                <div className="py-12 text-center">
                  <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-emerald-100 text-emerald-600">
                    <Icon name="check" size={28} />
                  </span>
                  <h3 className="mt-4 text-lg font-bold text-gray-900">Thank you for your inquiry!</h3>
                  <p className="mt-2 text-xs text-gray-600">
                    Your partnership request has been recorded for demonstration. Our business development desk will reach out shortly.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-6 rounded-lg bg-[#ff6f61] px-5 py-2 text-xs font-bold text-white hover:bg-[#e85b4d] transition"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <h3 className="text-sm font-bold text-gray-900">Request a Callback / Proposal</h3>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div>
                      <label className="text-[11px] font-bold uppercase tracking-wider text-gray-500">
                        Full Name *
                      </label>
                      <input
                        required
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="mt-1 w-full rounded-lg border border-gray-300 p-2 text-xs outline-none focus:border-[#ff6f61]"
                        placeholder="Dr. Ajay Sharma"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-bold uppercase tracking-wider text-gray-500">
                        Organization / Hospital
                      </label>
                      <input
                        type="text"
                        value={formData.org}
                        onChange={(e) => setFormData({ ...formData, org: e.target.value })}
                        className="mt-1 w-full rounded-lg border border-gray-300 p-2 text-xs outline-none focus:border-[#ff6f61]"
                        placeholder="Apollo Healthcare / Self"
                      />
                    </div>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <div>
                      <label className="text-[11px] font-bold uppercase tracking-wider text-gray-500">
                        Email Address *
                      </label>
                      <input
                        required
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="mt-1 w-full rounded-lg border border-gray-300 p-2 text-xs outline-none focus:border-[#ff6f61]"
                        placeholder="sharma@hospital.org"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-bold uppercase tracking-wider text-gray-500">
                        Contact Phone *
                      </label>
                      <input
                        required
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="mt-1 w-full rounded-lg border border-gray-300 p-2 text-xs outline-none focus:border-[#ff6f61]"
                        placeholder="+91 9876543210"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-bold uppercase tracking-wider text-gray-500">
                      Solution Interest
                    </label>
                    <select
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="mt-1 w-full rounded-lg border border-gray-300 p-2 text-xs outline-none focus:border-[#ff6f61] bg-white"
                    >
                      <option>Hospital Pharmacy Integration</option>
                      <option>Corporate Health & Wellness Program</option>
                      <option>Diagnostic Network Franchise</option>
                      <option>Insurance OPD & TPA Cashless</option>
                      <option>Patient Support Program (PSP)</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[11px] font-bold uppercase tracking-wider text-gray-500">
                      Collaboration Details
                    </label>
                    <textarea
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="mt-1 w-full rounded-lg border border-gray-300 p-2 text-xs outline-none focus:border-[#ff6f61]"
                      placeholder="Tell us about your organization's requirements..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full rounded-lg bg-[#ff6f61] py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow hover:bg-[#e85b4d] transition"
                  >
                    Submit Proposal Request
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-4 py-16 text-center">
      <h1 className="text-3xl font-bold text-gray-900">404 - Not Found</h1>
      <p className="mt-2 text-xs text-gray-500">The requested resource could not be found.</p>
      <A
        href="/"
        className="mt-4 inline-block rounded-lg bg-[#ff6f61] px-5 py-2 text-xs font-bold text-white shadow"
      >
        Back to Home
      </A>
    </div>
  );
}

