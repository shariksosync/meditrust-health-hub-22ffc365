import { useEffect, useMemo, useState } from "react";
import { applyCoupon, priceOf, useApp } from "../context/AppContext";
import { A, Badge, DemoNote, Empty, Field, Icon, Stars, cx, money, phoneOk, req, useForm, useGo, useLoc } from "../components/ui";
import { ProductCard, ProductFilters, ProductGrid, SearchBar, SortSelect, applyFilters } from "../components/Layout";
import * as D from "../data/demo";

// Reusable Section Header with red "See all >" button
function SectionHead({ title, href, isAd = false }) {
  return (
    <div className="mb-4 flex items-center justify-between border-b border-gray-100 pb-2">
      <div className="flex items-center gap-2">
        {isAd && (
          <span className="rounded border border-gray-300 px-1 py-0.5 text-[10px] font-bold text-gray-500 uppercase">
            Ad
          </span>
        )}
        <h2 className="text-base sm:text-lg font-bold text-gray-900">{title}</h2>
      </div>
      {href && (
        <A
          href={href}
          className="rounded-md border border-[#ff6f61] px-2.5 py-1 text-xs font-semibold text-[#ff6f61] hover:bg-[#ff6f61] hover:text-white transition"
        >
          See all &gt;
        </A>
      )}
    </div>
  );
}

// Horizontal Scroll Carousel Container
function ScrollRow({ children }) {
  return (
    <div className="flex gap-3 sm:gap-4 overflow-x-auto pb-3 pt-1 scrollbar-thin no-scrollbar">
      {children}
    </div>
  );
}

// 1mg Deal/Product Card (for deals, trending, collagen, flash sales, etc.)
function DealCard({ item }) {
  const { addToCart } = useApp();
  const off = item.mrp && item.mrp > item.price ? Math.round(((item.mrp - item.price) / item.mrp) * 100) : 0;

  return (
    <div className="w-[180px] sm:w-[200px] shrink-0 rounded-xl border border-gray-200 bg-white p-3 flex flex-col justify-between hover:shadow-md transition">
      <div>
        {/* Product image container */}
        <A href={`/search?q=${encodeURIComponent(item.name.slice(0, 15))}`} className="block relative aspect-square w-full mb-2">
          <div className="grid h-full w-full place-items-center p-2 rounded-lg bg-white overflow-hidden">
            {item.image ? (
              <img src={item.image} alt={item.name} className="h-full w-full object-contain hover:scale-105 transition" />
            ) : (
              <div className="grid h-20 w-20 place-items-center rounded-xl bg-gray-50 text-[#ff6f61]">
                <Icon name="bottle" size={34} />
              </div>
            )}
          </div>
        </A>

        {/* Name */}
        <A
          href={`/search?q=${encodeURIComponent(item.name.slice(0, 15))}`}
          className="line-clamp-2 text-xs font-bold text-gray-900 hover:text-[#ff6f61] transition leading-snug"
          title={item.name}
        >
          {item.name}
        </A>

        {/* Subtitle / Pack */}
        <p className="mt-0.5 text-[11px] text-gray-500 truncate">{item.pack}</p>

        {/* Rating */}
        {item.rating && (
          <div className="mt-1">
            <Stars rating={item.rating} reviews={item.reviews} />
          </div>
        )}

        {/* Delivery estimate */}
        {item.delivery && (
          <p className="mt-1 text-[10px] font-medium text-gray-500">{item.delivery}</p>
        )}
      </div>

      <div className="mt-2.5 pt-2 border-t border-gray-100">
        <div className="flex items-baseline gap-1.5">
          <span className="text-xs sm:text-sm font-bold text-gray-900">{money(item.price)}</span>
          {item.mrp && item.mrp > item.price && (
            <>
              <span className="text-[10px] text-gray-400 line-through">₹{item.mrp}</span>
              <span className="text-[10px] font-bold text-emerald-600">{item.discount || `${off}% off`}</span>
            </>
          )}
        </div>

        {/* Green Sale Badge if active */}
        {item.saleEnds && (
          <div className="mt-1 flex items-center gap-1">
            <span className="rounded bg-[#1aab2a] px-1 py-0.2 text-[9px] font-bold text-white">Sale</span>
            <span className="text-[10px] font-medium text-emerald-700 truncate">{item.saleEnds}</span>
          </div>
        )}

        <button
          onClick={() =>
            addToCart({
              id: item.id,
              name: item.name,
              price: item.price,
              mrp: item.mrp || item.price,
              pack: item.pack,
              category: "OTC Medicines",
            })
          }
          className="mt-2 w-full rounded border border-[#ff6f61] py-1 text-[11px] font-bold text-[#ff6f61] hover:bg-[#ff6f61] hover:text-white transition"
        >
          ADD
        </button>
      </div>
    </div>
  );
}

// Lab Package Card with SAFE badge
function CheckupCard({ checkup }) {
  const { toggleLab, state } = useApp();
  const inCart = state.labCart.includes(checkup.id);

  return (
    <div className="w-[230px] sm:w-[250px] shrink-0 rounded-xl border border-gray-200 bg-white p-3.5 flex flex-col justify-between hover:shadow-md transition">
      <div>
        <p className="line-clamp-2 text-xs sm:text-sm font-bold text-gray-900 leading-snug">
          {checkup.name}
        </p>
        <p className="mt-1 text-[11px] text-gray-500">{checkup.testsCount}</p>

        <div className="mt-2 flex items-center justify-between">
          <span className="text-[11px] font-bold text-gray-800">{checkup.provider}</span>
          {checkup.safe && (
            <span className="flex items-center gap-1 rounded border border-amber-300 bg-[#fef7e7] px-1.5 py-0.5 text-[10px] font-bold text-gray-800">
              <Icon name="check" size={10} className="text-emerald-600" />
              SAFE
            </span>
          )}
        </div>
      </div>

      <div className="mt-3 pt-2 border-t border-gray-100 flex items-center justify-between">
        <div>
          <span className="text-sm sm:text-base font-bold text-gray-900">{money(checkup.price)}</span>
          {checkup.mrp && (
            <div className="flex items-center gap-1">
              <span className="text-xs text-gray-400 line-through">₹{checkup.mrp}</span>
              <span className="text-xs font-bold text-emerald-600">{checkup.discount}</span>
            </div>
          )}
        </div>
        <button
          onClick={() => toggleLab(checkup.id)}
          className={cx(
            "rounded px-2.5 py-1 text-xs font-bold transition",
            inCart ? "bg-emerald-600 text-white" : "border border-[#ff6f61] text-[#ff6f61] hover:bg-[#ff6f61] hover:text-white"
          )}
        >
          {inCart ? "Booked" : "Book"}
        </button>
      </div>
    </div>
  );
}

export function Home() {
  const [slideIdx, setSlideIdx] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto carousel rotation
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setSlideIdx((prev) => (prev + 1) % D.heroSlides.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [isPaused]);

  const slide = D.heroSlides[slideIdx];

  return (
    <div className="bg-white min-h-screen pb-16">
      {/* 1. Hero Multi-Slide Carousel Banner matching Screenshot 2026-10-14 201806.png */}
      <section className="border-b border-gray-200 bg-[#fafafa]">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6">
          <div className="grid gap-4 lg:grid-cols-12 items-stretch">
            {/* Left Main Hero Banner */}
            <div
              className={`relative lg:col-span-8 overflow-hidden rounded-xl bg-gradient-to-r ${slide.bg} flex flex-col justify-between min-h-[220px] shadow-sm`}
            >
              {slide.image ? (
                <A href={slide.actionHref} className="block w-full h-full">
                  <img
                    src={slide.image}
                    alt={slide.headline}
                    className="w-full h-full object-cover rounded-xl min-h-[220px]"
                  />
                </A>
              ) : (
                <div className="p-6 sm:p-8 flex flex-col justify-between h-full">
                  <div className="max-w-md">
                    <span className="inline-block rounded-md bg-black px-2 py-0.5 text-[10px] font-black text-white tracking-widest uppercase mb-2">
                      {slide.brandTag}
                    </span>
                    <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-gray-900 leading-tight">
                      {slide.headline}
                    </h1>
                    <ul className="mt-3 space-y-1 text-xs text-gray-700 font-medium">
                      {slide.features.map((f, i) => (
                        <li key={i} className="flex items-center gap-1.5">
                          <Icon name="check" size={13} className="text-[#ff6f61]" />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    <A
                      href={slide.actionHref}
                      className="rounded-md bg-black px-5 py-2 text-xs font-bold text-white shadow-md hover:bg-gray-800 transition"
                    >
                      {slide.actionText}
                    </A>
                    <span className="text-[10px] text-gray-500 font-medium">T&amp;C Apply</span>
                  </div>
                </div>
              )}
            </div>

            {/* Right Public Interest Banner (PvPI toll-free) */}
            <div className="lg:col-span-4 rounded-xl border border-gray-200 bg-gradient-to-r from-orange-50 to-amber-50 p-4 sm:p-5 flex flex-col justify-between shadow-sm">
              <div>
                <p className="text-xs font-bold text-red-600 uppercase tracking-wide">
                  {slide.rightNotice.title}
                </p>
                <p className="mt-1 text-xs text-gray-700 leading-relaxed">
                  {slide.rightNotice.desc}
                </p>
                <div className="mt-3 flex items-center gap-2">
                  <div className="grid h-8 w-8 place-items-center rounded-full bg-black text-white">
                    <Icon name="phone" size={14} />
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-500">PvPI Toll Free Number</p>
                    <a href={`tel:${slide.rightNotice.phone.replace(/\s/g, "")}`} className="font-extrabold text-sm text-gray-900 hover:text-[#ff6f61]">
                      {slide.rightNotice.phone}
                    </a>
                  </div>
                </div>
              </div>
              <p className="mt-3 text-[9px] text-gray-500 border-t border-amber-200/60 pt-2 leading-tight">
                {slide.rightNotice.org}
              </p>
            </div>
          </div>

          {/* Carousel Controls: Prev, Next, Dots, Pause */}
          <div className="mt-3 flex items-center justify-center gap-3">
            <button
              onClick={() => setSlideIdx((p) => (p === 0 ? D.heroSlides.length - 1 : p - 1))}
              className="grid h-6 w-6 place-items-center rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300 text-xs font-bold"
              aria-label="Previous slide"
            >
              &lt;
            </button>
            <button
              onClick={() => setSlideIdx((p) => (p + 1) % D.heroSlides.length)}
              className="grid h-6 w-6 place-items-center rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300 text-xs font-bold"
              aria-label="Next slide"
            >
              &gt;
            </button>

            <div className="flex items-center gap-1.5">
              {D.heroSlides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setSlideIdx(i)}
                  className={`h-2 rounded-full transition-all ${
                    slideIdx === i ? "w-6 bg-gray-800" : "w-2 bg-gray-300"
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={() => setIsPaused((p) => !p)}
              className="grid h-6 w-6 place-items-center rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300 text-[10px]"
              aria-label={isPaused ? "Play slider" : "Pause slider"}
            >
              {isPaused ? "▶" : "❚❚"}
            </button>
          </div>
        </div>
      </section>

      {/* 2. Platform Headline Title */}
      <section className="py-6 text-center border-b border-gray-100">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
            MEDITRUST: India's Leading Online Pharmacy &amp; Healthcare Platform
          </h2>
        </div>
      </section>

      {/* 3. Care Plan Promotion Banner */}
      <section className="mx-auto max-w-7xl px-4 py-5 sm:px-6">
        <div className="relative overflow-hidden rounded-2xl bg-[#fef4e8] border border-amber-200 p-5 sm:p-6 flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm">
          <div className="flex items-center gap-4">
            {D.carePlanBanner.avatar ? (
              <img
                src={D.carePlanBanner.avatar}
                alt="Care Plan"
                className="h-16 w-16 sm:h-20 sm:w-20 rounded-full object-contain shrink-0 bg-amber-100/60 p-1 shadow-xs"
              />
            ) : (
              <div className="hidden sm:grid h-16 w-16 shrink-0 place-items-center rounded-full bg-amber-200/70 text-[#662d1b] font-black text-xl">
                1mg
              </div>
            )}
            <div>
              <div className="flex items-center gap-2">
                <span className="rounded bg-[#662d1b] px-2 py-0.5 text-xs font-bold text-white uppercase tracking-wider">
                  {D.carePlanBanner.tag}
                </span>
                <span className="text-xs font-semibold text-[#662d1b]">
                  {D.carePlanBanner.subtag}
                </span>
              </div>
              <h3 className="mt-2 text-sm sm:text-base font-bold text-gray-900 leading-snug">
                {D.carePlanBanner.title}
              </h3>
              <p className="mt-0.5 text-xs text-gray-600 font-medium">
                {D.carePlanBanner.action}
              </p>
            </div>
          </div>
          <A
            href={D.carePlanBanner.btnHref}
            className="rounded-md bg-[#662d1b] px-6 py-2.5 text-xs font-bold text-white shadow-md hover:bg-[#522314] transition shrink-0"
          >
            {D.carePlanBanner.btnText}
          </A>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 space-y-10 mt-6">
        {/* 4. Section 1: Shop by health concerns */}
        <section>
          <SectionHead title="Shop by health concerns" href="/healthcare" />
          <ScrollRow>
            {D.healthConcerns.map((hc) => (
              <A
                key={hc.id}
                href={hc.href}
                className="w-[125px] sm:w-[135px] shrink-0 text-center group"
              >
                <div
                  className="aspect-square w-full rounded-2xl grid place-items-center p-3 mb-2 shadow-sm group-hover:scale-105 transition"
                  style={{ backgroundColor: hc.color }}
                >
                  {hc.image ? (
                    <img
                      src={hc.image}
                      alt={hc.name}
                      className="h-16 w-16 sm:h-20 sm:w-20 object-contain"
                    />
                  ) : (
                    <div className="grid h-14 w-14 place-items-center rounded-xl bg-white shadow-sm text-gray-800">
                      <Icon name={hc.icon} size={28} className="text-[#ff6f61]" />
                    </div>
                  )}
                </div>
                <p className="text-xs font-semibold text-gray-800 group-hover:text-[#ff6f61] transition line-clamp-2">
                  {hc.name}
                </p>
              </A>
            ))}
          </ScrollRow>
        </section>

        {/* 5. Section 2: Full body health checkups */}
        <section>
          <SectionHead title="Full body health checkups" href="/lab-tests" />
          <ScrollRow>
            {D.fullBodyCheckups.map((fbc) => (
              <CheckupCard key={fbc.id} checkup={fbc} />
            ))}
          </ScrollRow>
        </section>

        {/* 6. Section 3: Featured brands */}
        <section>
          <SectionHead title="Featured brands" href="/healthcare" />
          <ScrollRow>
            {D.featuredBrands.map((b) => (
              <A
                key={b.id}
                href={`/search?q=${encodeURIComponent(b.name)}`}
                className="w-[105px] sm:w-[120px] shrink-0 text-center group"
              >
                <div className="aspect-square w-full rounded-full border border-gray-200 bg-white grid place-items-center p-3 mb-1.5 shadow-sm group-hover:shadow-md transition group-hover:border-[#ff6f61] overflow-hidden">
                  {b.image ? (
                    <img
                      src={b.image}
                      alt={b.name}
                      className="h-14 w-14 sm:h-16 sm:w-16 object-contain"
                    />
                  ) : (
                    <span className="font-extrabold text-xs sm:text-sm text-gray-900 truncate">
                      {b.name}
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-gray-500 truncate">{b.category}</p>
              </A>
            ))}
          </ScrollRow>
        </section>

        {/* 7. Section 4: Personal care */}
        <section>
          <SectionHead title="Personal care" href="/healthcare/personal-care" />
          <ScrollRow>
            {D.personalCareCategories.map((pc) => (
              <A
                key={pc.id}
                href={pc.href}
                className="w-[125px] sm:w-[135px] shrink-0 text-center group"
              >
                <div
                  className="aspect-square w-full rounded-2xl grid place-items-center p-3 mb-2 shadow-sm group-hover:scale-105 transition overflow-hidden"
                  style={{ backgroundColor: pc.color }}
                >
                  {pc.image ? (
                    <img
                      src={pc.image}
                      alt={pc.name}
                      className="h-16 w-16 sm:h-20 sm:w-20 object-contain"
                    />
                  ) : (
                    <div className="grid h-14 w-14 place-items-center rounded-xl bg-white shadow-sm text-gray-800">
                      <Icon name="sparkle" size={28} className="text-[#ff6f61]" />
                    </div>
                  )}
                </div>
                <p className="text-xs font-semibold text-gray-800 group-hover:text-[#ff6f61] transition">
                  {pc.name}
                </p>
              </A>
            ))}
          </ScrollRow>
        </section>

        {/* 8. Section 5: Pathology Tests | Up to 70% off */}
        <section>
          <SectionHead title="Pathology Tests | Up to 70% off" href="/lab-tests" />
          <ScrollRow>
            {D.pathologyTests.map((pt) => (
              <div
                key={pt.id}
                className="w-[210px] sm:w-[230px] shrink-0 rounded-xl border border-gray-200 bg-white p-3.5 flex flex-col justify-between hover:shadow-md transition"
              >
                <div>
                  <p className="text-xs sm:text-sm font-bold text-gray-900 leading-snug">
                    {pt.name}
                  </p>
                  <p className="mt-1 text-[11px] text-gray-500">{pt.desc}</p>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-[11px] font-bold text-gray-800">{pt.provider}</span>
                    {pt.safe && (
                      <span className="flex items-center gap-1 rounded border border-amber-300 bg-[#fef7e7] px-1.5 py-0.5 text-[10px] font-bold text-gray-800">
                        <Icon name="check" size={10} className="text-emerald-600" />
                        SAFE
                      </span>
                    )}
                  </div>
                </div>
                <div className="mt-3 pt-2 border-t border-gray-100 flex items-center justify-between">
                  <div>
                    <span className="text-sm font-bold text-gray-900">{money(pt.price)}</span>
                    {pt.discount && (
                      <div className="flex items-center gap-1">
                        <span className="text-xs text-gray-400 line-through">₹{pt.mrp}</span>
                        <span className="text-xs font-bold text-emerald-600">{pt.discount}</span>
                      </div>
                    )}
                  </div>
                  <A
                    href={`/lab-tests/${pt.id}`}
                    className="rounded border border-[#ff6f61] px-2.5 py-1 text-xs font-bold text-[#ff6f61] hover:bg-[#ff6f61] hover:text-white transition"
                  >
                    Book
                  </A>
                </div>
              </div>
            ))}
          </ScrollRow>
        </section>

        {/* 9. Section 6: Super saving deals */}
        <section>
          <SectionHead title="Super saving deals" href="/medicines" />
          <ScrollRow>
            {D.superSavingDeals.map((deal) => (
              <DealCard key={deal.id} item={deal} />
            ))}
          </ScrollRow>
        </section>

        {/* 10. Section 7: Popular categories */}
        <section>
          <SectionHead title="Popular categories" href="/healthcare" />
          <ScrollRow>
            {D.popularCategories.map((cat) => (
              <A
                key={cat.id}
                href={cat.href}
                className="w-[125px] sm:w-[135px] shrink-0 text-center group"
              >
                <div
                  className="aspect-square w-full rounded-2xl grid place-items-center p-3 mb-2 shadow-sm group-hover:scale-105 transition overflow-hidden"
                  style={{ backgroundColor: cat.color }}
                >
                  {cat.image ? (
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className="h-16 w-16 sm:h-20 sm:w-20 object-contain"
                    />
                  ) : (
                    <div className="grid h-14 w-14 place-items-center rounded-xl bg-white shadow-sm text-gray-800">
                      <Icon name="tag" size={26} className="text-[#ff6f61]" />
                    </div>
                  )}
                </div>
                <p className="text-xs font-semibold text-gray-800 group-hover:text-[#ff6f61] transition">
                  {cat.name}
                </p>
              </A>
            ))}
          </ScrollRow>
        </section>

        {/* 11. Section 8: Trending now (with Sale ends in... badge) */}
        <section>
          <SectionHead title="Trending now" href="/medicines" />
          <ScrollRow>
            {D.trendingNow.map((item) => (
              <DealCard key={item.id} item={item} />
            ))}
          </ScrollRow>
        </section>

        {/* 12. Section 9: Skin care products */}
        <section>
          <SectionHead title="Skin care products" href="/healthcare/skin-care" />
          <ScrollRow>
            {D.skinCareProducts.map((item) => (
              <DealCard key={item.id} item={item} />
            ))}
          </ScrollRow>
        </section>

        {/* 13. Section 10: Popular Combo Deals */}
        <section>
          <SectionHead title="Popular Combo Deals" href="/healthcare" />
          <ScrollRow>
            {D.popularComboDeals.map((item) => (
              <DealCard key={item.id} item={item} />
            ))}
          </ScrollRow>
        </section>

        {/* 14. Section 11: Top deals of pain relief and cough & cold */}
        <section>
          <SectionHead title="Top deals of pain relief and cough & cold" href="/healthcare" />
          <ScrollRow>
            {D.topDealsPainCough.map((item) => (
              <DealCard key={item.id} item={item} />
            ))}
          </ScrollRow>
        </section>

        {/* 15. Section 12: Collagen | supplement of the week */}
        <section>
          <SectionHead title="Collagen | supplement of the week" href="/healthcare/vitamins-supplements" />
          <ScrollRow>
            {D.collagenSupplement.map((item) => (
              <DealCard key={item.id} item={item} />
            ))}
          </ScrollRow>
        </section>

        {/* 16. Section 13: Flash sale deals */}
        <section>
          <SectionHead title="Flash sale deals" href="/medicines" />
          <ScrollRow>
            {D.flashSaleDeals.map((item) => (
              <DealCard key={item.id} item={item} />
            ))}
          </ScrollRow>
        </section>

        {/* 17. Section 14: Radiology Tests | Up to 60% off */}
        <section>
          <SectionHead title="Radiology Tests | Up to 60% off" href="/lab-tests" />
          <ScrollRow>
            {D.radiologyTests.map((rt) => (
              <div
                key={rt.id}
                className="w-[210px] sm:w-[230px] shrink-0 rounded-xl border border-gray-200 bg-white p-3.5 flex flex-col justify-between hover:shadow-md transition"
              >
                <div>
                  <p className="text-xs sm:text-sm font-bold text-gray-900 leading-snug">
                    {rt.name}
                  </p>
                  <p className="mt-1 text-[11px] text-gray-500">{rt.desc}</p>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-[11px] font-bold text-gray-800">{rt.provider}</span>
                    {rt.safe && (
                      <span className="flex items-center gap-1 rounded border border-amber-300 bg-[#fef7e7] px-1.5 py-0.5 text-[10px] font-bold text-gray-800">
                        <Icon name="check" size={10} className="text-emerald-600" />
                        SAFE
                      </span>
                    )}
                  </div>
                </div>
                <div className="mt-3 pt-2 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-sm font-bold text-gray-900">{money(rt.price)}</span>
                  <A
                    href={`/lab-tests/${rt.id}`}
                    className="rounded border border-[#ff6f61] px-2.5 py-1 text-xs font-bold text-[#ff6f61] hover:bg-[#ff6f61] hover:text-white transition"
                  >
                    Book
                  </A>
                </div>
              </div>
            ))}
          </ScrollRow>
        </section>

        {/* 18. Section 15: Explore something new */}
        <section>
          <SectionHead title="Explore something new" href="/healthcare" />
          <ScrollRow>
            {D.exploreSomethingNew.map((item) => (
              <DealCard key={item.id} item={item} />
            ))}
          </ScrollRow>
        </section>

        {/* 19. Section 16: Ad In the spotlight */}
        <section>
          <SectionHead title="In the spotlight" isAd={true} />
          <ScrollRow>
            {D.inTheSpotlight.map((item) => (
              <DealCard key={item.id} item={item} />
            ))}
          </ScrollRow>
        </section>

        {/* 20. Section 17: Ayurveda top brands */}
        <section>
          <SectionHead title="Ayurveda top brands" href="/healthcare/ayurveda-products" />
          <ScrollRow>
            {D.ayurvedaTopBrands.map((b) => (
              <A
                key={b.id}
                href={`/search?q=${encodeURIComponent(b.name)}`}
                className="w-[105px] sm:w-[120px] shrink-0 text-center group"
              >
                <div
                  className="aspect-square w-full rounded-2xl grid place-items-center p-3 mb-1.5 shadow-sm group-hover:scale-105 transition overflow-hidden"
                  style={{ backgroundColor: b.color }}
                >
                  {b.image ? (
                    <img
                      src={b.image}
                      alt={b.name}
                      className="h-14 w-14 sm:h-16 sm:w-16 object-contain"
                    />
                  ) : (
                    <span className="font-extrabold text-xs sm:text-sm text-gray-900 truncate">
                      {b.name}
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-gray-500">Ayurveda</p>
              </A>
            ))}
          </ScrollRow>
        </section>

        {/* 21. Section 18: Deals of the day */}
        <section>
          <SectionHead title="Deals of the day" href="/medicines" />
          <ScrollRow>
            {D.dealsOfTheDay.map((item) => (
              <DealCard key={item.id} item={item} />
            ))}
          </ScrollRow>
        </section>

        {/* 22. Section 19: Ad Skincare Picks Just for You */}
        <section>
          <SectionHead title="Skincare Picks Just for You" isAd={true} />
          <ScrollRow>
            {D.skincarePicks.map((item) => (
              <DealCard key={item.id} item={item} />
            ))}
          </ScrollRow>
        </section>

        {/* 23. Section 20: Ad Pain Relief Essentials */}
        <section>
          <SectionHead title="Pain Relief Essentials" isAd={true} />
          <ScrollRow>
            {D.painReliefEssentials.map((item) => (
              <DealCard key={item.id} item={item} />
            ))}
          </ScrollRow>
        </section>

        {/* 24. Section 21: Ad Healthy Hair Starts Here */}
        <section>
          <SectionHead title="Healthy Hair Starts Here" isAd={true} />
          <ScrollRow>
            {D.healthyHairStartsHere.map((item) => (
              <DealCard key={item.id} item={item} />
            ))}
          </ScrollRow>
        </section>

        {/* 25. Section 22: Tuco Kids top sellers */}
        <section>
          <SectionHead title="Tuco Kids top sellers" href="/healthcare/baby-care" />
          <ScrollRow>
            {D.tucoKidsTopSellers.map((item) => (
              <DealCard key={item.id} item={item} />
            ))}
          </ScrollRow>
        </section>

        {/* 26. Section 23: Homeopathy women's health */}
        <section>
          <SectionHead title="Homeopathy women's health" href="/healthcare/homeopathy" />
          <ScrollRow>
            {D.homeopathyWomensHealth.map((item) => (
              <DealCard key={item.id} item={item} />
            ))}
          </ScrollRow>
        </section>

        {/* 27. Section 24: Ayurveda herbs knowledge */}
        <section>
          <SectionHead title="Ayurveda" href="/healthcare/ayurveda-products" />
          <ScrollRow>
            {D.ayurvedaKnowledge.map((herb) => (
              <div
                key={herb.id}
                className="w-[200px] sm:w-[220px] shrink-0 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm hover:shadow-md transition flex flex-col justify-between"
              >
                <div>
                  <div className="aspect-[4/3] w-full rounded-xl bg-emerald-50 mb-3 grid place-items-center text-emerald-700 overflow-hidden">
                    {herb.image ? (
                      <img
                        src={herb.image}
                        alt={herb.name}
                        className="w-full h-full object-cover rounded-xl"
                      />
                    ) : (
                      <Icon name="leaf" size={40} />
                    )}
                  </div>
                  <h3 className="font-bold text-gray-900 text-sm">{herb.name}</h3>
                  <p className="mt-1 text-xs text-gray-500 leading-relaxed line-clamp-3">
                    {herb.desc}
                  </p>
                </div>
                <A
                  href={`/search?q=${encodeURIComponent(herb.name)}`}
                  className="mt-3 block text-xs font-semibold text-[#ff6f61] hover:underline"
                >
                  Explore medicines →
                </A>
              </div>
            ))}
          </ScrollRow>
        </section>

        {/* 28. Section 25: India's largest healthcare platform */}
        <section className="py-8 border-t border-gray-100">
          <h2 className="text-center text-xl sm:text-2xl font-bold text-gray-900 mb-8">
            India's largest healthcare platform
          </h2>
          <div className="grid gap-6 sm:grid-cols-3">
            <div className="rounded-2xl border border-gray-100 bg-[#fafafa] p-6 flex items-center justify-between shadow-sm">
              <div>
                <p className="text-3xl font-extrabold text-gray-900">260m+</p>
                <p className="mt-1 text-xs sm:text-sm font-semibold text-gray-500">Visitors</p>
              </div>
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-emerald-100 text-emerald-700">
                <Icon name="users" size={26} />
              </div>
            </div>

            <div className="rounded-2xl border border-gray-100 bg-[#fafafa] p-6 flex items-center justify-between shadow-sm">
              <div>
                <p className="text-3xl font-extrabold text-gray-900">31m+</p>
                <p className="mt-1 text-xs sm:text-sm font-semibold text-gray-500">Orders Delivered</p>
              </div>
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-blue-100 text-blue-600">
                <Icon name="package" size={26} />
              </div>
            </div>

            <div className="rounded-2xl border border-gray-100 bg-[#fafafa] p-6 flex items-center justify-between shadow-sm">
              <div>
                <p className="text-3xl font-extrabold text-gray-900">1800+</p>
                <p className="mt-1 text-xs sm:text-sm font-semibold text-gray-500">Cities</p>
              </div>
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-pink-100 text-pink-600">
                <Icon name="pin" size={26} />
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

// ---------------------- QUICK ORDER / UPLOAD PRESCRIPTION ----------------------
// Matching Screenshot 2026-10-14 200806 / quick order.png
export function PrescriptionUpload() {
  const { state, update, toast } = useApp();
  const go = useGo();
  const [file, setFile] = useState(null);
  const [url, setUrl] = useState("");
  const [err, setErr] = useState("");

  useEffect(() => () => url && URL.revokeObjectURL(url), [url]);

  const pick = (e) => {
    const f = e.target.files?.[0];
    setErr("");
    if (!f) return;
    if (!/^image\/|pdf$/.test(f.type)) return setErr("Please choose an image or PDF file.");
    if (f.size > 5e6) return setErr("Please choose a file under 5 MB.");
    setFile(f);
    setUrl(URL.createObjectURL(f));
    update({ prescription: { name: f.name } });
    toast("Prescription attached successfully!");
  };

  return (
    <div className="bg-white min-h-[80vh] py-8">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="grid gap-8 lg:grid-cols-12">
          {/* Left Column: Upload Dropzone matching quick order.png */}
          <div className="lg:col-span-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Upload prescriptions</h1>
            <p className="mt-1 text-xs sm:text-sm text-gray-500">
              and let us arrange your medicines for you
            </p>

            {/* Dashed Dropzone */}
            <div className="mt-6 rounded-2xl border-2 border-dashed border-gray-300 bg-[#fafafa] p-8 text-center hover:border-[#ff6f61] transition">
              <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-white shadow-sm text-gray-500 mb-4">
                <Icon name="upload" size={32} className="text-[#ff6f61]" />
              </div>

              <label className="inline-block cursor-pointer rounded-md border border-[#ff6f61] bg-white px-6 py-2.5 text-sm font-bold text-[#ff6f61] hover:bg-[#ff6f61] hover:text-white transition shadow-sm">
                Upload prescription
                <input
                  type="file"
                  accept="image/*,application/pdf"
                  className="sr-only"
                  onChange={pick}
                />
              </label>

              <p className="mt-3 text-xs text-gray-400">
                Drag files from your computer (JPG, PNG and PDF)
              </p>

              {err && <p className="mt-2 text-xs font-semibold text-red-500">{err}</p>}

              {file && (
                <div className="mt-5 inline-flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-3 text-left shadow-sm">
                  <div className="grid h-10 w-10 place-items-center rounded-lg bg-emerald-50 text-emerald-600">
                    <Icon name="check" size={20} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-900">{file.name}</p>
                    <p className="text-[11px] text-gray-400">{Math.round(file.size / 1024)} KB</p>
                  </div>
                  <button
                    onClick={() => {
                      setFile(null);
                      setUrl("");
                      update({ prescription: null });
                    }}
                    className="ml-3 text-xs text-red-500 hover:underline"
                  >
                    Remove
                  </button>
                </div>
              )}
            </div>

            {/* OR separator */}
            <div className="my-6 flex items-center">
              <div className="flex-1 border-t border-gray-200" />
              <span className="px-4 text-xs font-bold text-gray-400">OR</span>
              <div className="flex-1 border-t border-gray-200" />
            </div>

            {/* Select from past prescriptions card */}
            <div className="flex items-center justify-between rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-lg bg-gray-100 text-gray-700">
                  <Icon name="book" size={20} />
                </div>
                <span className="text-xs sm:text-sm font-semibold text-gray-800">
                  Select from your past prescriptions
                </span>
              </div>
              <button
                type="button"
                onClick={() => {
                  update({ prescription: { name: "Saved_Rx_DrSharma.pdf" } });
                  setFile({ name: "Saved_Rx_DrSharma.pdf", size: 245000 });
                  toast("Past prescription selected!");
                }}
                className="rounded-md border border-[#ff6f61] px-4 py-1.5 text-xs font-bold text-[#ff6f61] hover:bg-[#ff6f61] hover:text-white transition"
              >
                Select files
              </button>
            </div>
          </div>

          {/* Right Column: Continue button & Security notes */}
          <div className="lg:col-span-4 lg:border-l lg:border-gray-100 lg:pl-8 flex flex-col justify-start">
            <button
              disabled={!state.prescription}
              onClick={() => go("/medicines")}
              className="w-full rounded-md bg-[#ff6f61] py-3 text-sm font-bold text-white shadow-md hover:bg-[#e85b4d] disabled:bg-gray-300 disabled:text-gray-500 disabled:shadow-none transition"
            >
              Continue
            </button>

            <div className="mt-8 space-y-4 text-xs text-gray-500 leading-relaxed">
              <p>All uploads are encrypted &amp; visible only to our pharmacists.</p>
              <p>Any prescription you upload is validated before processing the order.</p>
              <A href="/faq" className="inline-block text-xs font-semibold text-[#ff6f61] hover:underline">
                What is a valid prescription?
              </A>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ---------------------- CART PAGE ----------------------
// Matching Screenshot 2026-10-14 200806 / cart.png
export function Cart() {
  const { state, setQty } = useApp();
  const go = useGo();
  const lines = state.cart.map((c) => ({
    ...c,
    p: state.products.find((p) => p.id === c.id) || { id: c.id, name: "Product", price: 199, mrp: 249, pack: "Pack" },
  }));
  const sub = priceOf(state.cart, state.products);
  const needsRx = lines.some((l) => l.p.prescription) && !state.prescription;

  // Empty cart matching cart.png
  if (!lines.length) {
    return (
      <div className="bg-white min-h-[75vh] flex flex-col items-center justify-center p-6 text-center">
        {/* Shopping Cart Artwork with floating flies/sparkles matching screenshot */}
        <div className="relative mb-6">
          <div className="grid h-36 w-36 place-items-center rounded-full bg-gray-50 text-gray-400">
            <Icon name="cart" size={68} />
          </div>
          <span className="absolute -top-1 right-2 text-xl">✨</span>
          <span className="absolute bottom-2 -left-2 text-xl">✨</span>
        </div>

        <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Your cart is empty</h1>
        <p className="mt-1 text-xs sm:text-sm text-gray-500 max-w-sm">
          We have all the medicines and healthcare products that you need.
        </p>

        <A
          href="/medicines"
          className="mt-6 inline-block rounded-md border-2 border-[#ff6f61] px-8 py-2.5 text-xs sm:text-sm font-bold text-[#ff6f61] hover:bg-[#ff6f61] hover:text-white transition shadow-sm"
        >
          Find medicines
        </A>
      </div>
    );
  }

  // Active Cart State
  return (
    <div className="bg-[#fafafa] min-h-[80vh] py-8">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">My Cart ({lines.length} items)</h1>

        <div className="grid gap-6 lg:grid-cols-12 items-start">
          {/* Cart Items List */}
          <div className="lg:col-span-8 space-y-4">
            <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm divide-y divide-gray-100">
              {lines.map(({ p, quantity, pack }) => (
                <div key={p.id} className="py-4 first:pt-0 last:pb-0 flex gap-4 items-center">
                  <div className="h-20 w-20 shrink-0 grid place-items-center rounded-lg bg-gray-50 text-[#ff6f61]">
                    <Icon name="bottle" size={32} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <A href={`/product/${p.id}`} className="text-sm font-bold text-gray-900 hover:text-[#ff6f61] transition truncate block">
                      {p.name}
                    </A>
                    <p className="text-xs text-gray-500">{pack || p.pack}</p>
                    {p.prescription && (
                      <span className="inline-block mt-1 rounded bg-red-50 text-red-600 px-1.5 py-0.5 text-[10px] font-bold">
                        Prescription Required
                      </span>
                    )}

                    <div className="mt-3 flex items-center justify-between">
                      <div className="flex items-center gap-1.5 border border-gray-300 rounded-md bg-white">
                        <button
                          onClick={() => setQty(p.id, Math.max(0, quantity - 1))}
                          className="px-2 py-1 text-gray-600 hover:text-black font-bold"
                        >
                          -
                        </button>
                        <span className="w-6 text-center text-xs font-bold">{quantity}</span>
                        <button
                          onClick={() => setQty(p.id, quantity + 1)}
                          className="px-2 py-1 text-gray-600 hover:text-black font-bold"
                        >
                          +
                        </button>
                      </div>

                      <div className="text-right">
                        <span className="text-sm font-bold text-gray-900">{money(p.price * quantity)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {needsRx && (
              <div className="rounded-xl border border-amber-300 bg-[#fef7e7] p-4 text-xs text-gray-800">
                <span className="font-bold">Prescription required for some items. </span>
                <A href="/prescription-upload" className="font-bold text-[#ff6f61] underline ml-1">
                  Upload prescription now
                </A>
              </div>
            )}
          </div>

          {/* Order Summary Card */}
          <div className="lg:col-span-4">
            <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm space-y-4">
              <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wide">
                Order Summary
              </h2>

              <div className="space-y-2 text-xs text-gray-600 border-b border-gray-100 pb-4">
                <div className="flex justify-between">
                  <span>Item Total</span>
                  <span className="font-semibold text-gray-900">{money(sub)}</span>
                </div>
                <div className="flex justify-between text-emerald-600">
                  <span>Care Plan Savings (demo)</span>
                  <span>-₹50</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping Fee</span>
                  <span className="text-emerald-600 font-semibold">FREE</span>
                </div>
              </div>

              <div className="flex justify-between text-base font-bold text-gray-900">
                <span>To Pay</span>
                <span>{money(Math.max(0, sub - 50))}</span>
              </div>

              <button
                disabled={needsRx}
                onClick={() => go("/checkout")}
                className="w-full rounded-md bg-[#ff6f61] py-3 text-xs font-bold text-white shadow hover:bg-[#e85b4d] uppercase tracking-wider transition disabled:bg-gray-300"
              >
                PROCEED TO CHECKOUT
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ---------------------- LISTING & SEARCH ----------------------
export function Listing({ params, base }) {
  const { state } = useApp();
  const { path, query } = useLoc();
  const q = query.get("q") || "";
  const cat = params.category ? state.categories.find((c) => c.slug === params.category) : null;
  const blank = { cat: "", brands: [], max: 3000, rxOnly: null, sort: "popular" };
  const [f, setF] = useState(blank);

  useEffect(() => setF(blank), [path, q]);

  let list = state.products.filter((p) => p.visible);
  if (base === "medicines") list = list.filter((p) => /medicine/i.test(p.category) || ["Vitamins & Supplements", "Diabetes Care"].includes(p.category));
  if (base === "healthcare") list = list.filter((p) => !p.prescription);
  if (cat) list = state.products.filter((p) => p.visible && p.category === cat.name);
  if (base === "search") {
    const t = q.toLowerCase();
    list = list.filter((p) => `${p.name} ${p.brand} ${p.category}`.toLowerCase().includes(t));
  }

  const shown = applyFilters(list, f);
  const title = base === "search" ? `Results for “${q}”` : cat ? cat.name : base === "medicines" ? "Medicines" : "Healthcare products";

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-3 border-b border-gray-100 pb-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
          <p className="text-xs text-gray-500 mt-1">{shown.length} products available</p>
        </div>
        <SortSelect f={f} setF={setF} />
      </div>

      <div className="grid gap-6 lg:grid-cols-[240px_1fr]">
        <ProductFilters list={list} f={f} setF={setF} />
        <div>
          {shown.length ? (
            <ProductGrid items={shown} />
          ) : (
            <Empty icon="search" title="No products found" text="Try searching with a different term." action="Browse all medicines" />
          )}
        </div>
      </div>
    </div>
  );
}

// ---------------------- PRODUCT DETAILS PAGE ----------------------
export function Product({ params }) {
  const { state, addToCart, toggleWish } = useApp();
  const go = useGo();
  const p = state.products.find((x) => x.id === params.id && x.visible) || state.products[0];
  const [qty, setQty] = useState(1);
  const wished = state.wishlist.includes(p.id);
  const off = p.mrp > p.price ? Math.round(((p.mrp - p.price) / p.mrp) * 100) : 0;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <div className="grid gap-8 lg:grid-cols-2">
        {/* Product image */}
        <div className="rounded-2xl border border-gray-200 bg-white p-8 grid place-items-center">
          <div className="grid h-64 w-64 place-items-center rounded-2xl bg-gray-50 text-[#ff6f61]">
            <Icon name="bottle" size={96} />
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-4">
          <p className="text-xs font-bold uppercase tracking-wider text-gray-400">{p.brand}</p>
          <h1 className="text-2xl font-bold text-gray-900 leading-tight">{p.name}</h1>
          <p className="text-xs text-gray-500">{p.pack}</p>

          <div className="flex items-center gap-2">
            <Stars rating={p.rating || 4.3} reviews={p.reviews || 88} />
          </div>

          <div className="flex items-baseline gap-3 pt-2">
            <span className="text-3xl font-extrabold text-gray-900">{money(p.price)}</span>
            {off > 0 && (
              <>
                <span className="text-sm text-gray-400 line-through">MRP {money(p.mrp)}</span>
                <span className="rounded bg-emerald-50 px-2 py-0.5 text-xs font-bold text-emerald-600">{off}% off</span>
              </>
            )}
          </div>
          <p className="text-[11px] text-gray-400">Inclusive of all taxes</p>

          <div className="pt-4 flex items-center gap-3">
            <div className="flex items-center border border-gray-300 rounded-md">
              <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="px-3 py-2 font-bold text-gray-600">-</button>
              <span className="w-8 text-center text-sm font-bold">{qty}</span>
              <button onClick={() => setQty((q) => q + 1)} className="px-3 py-2 font-bold text-gray-600">+</button>
            </div>

            <button
              onClick={() => addToCart(p, qty)}
              className="flex-1 rounded-md bg-[#ff6f61] py-3 text-xs font-bold text-white shadow-md hover:bg-[#e85b4d] uppercase tracking-wider"
            >
              Add to cart
            </button>

            <button
              onClick={() => toggleWish(p.id)}
              className={cx("p-3 rounded-md border border-gray-300 transition", wished ? "text-red-500 border-red-300" : "text-gray-400 hover:text-black")}
            >
              <Icon name="heart" size={20} className={wished ? "fill-current" : ""} />
            </button>
          </div>

          <div className="mt-8 rounded-xl border border-gray-100 bg-[#fafafa] p-4 text-xs text-gray-600 leading-relaxed">
            <h3 className="font-bold text-gray-900 mb-1">Product Description</h3>
            <p>{p.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ---------------------- CHECKOUT ----------------------
export function Checkout() {
  const { state, update, log } = useApp();
  const go = useGo();
  const sub = priceOf(state.cart, state.products);
  const saved = state.addresses[0] || {};
  const form = useForm(
    { name: state.user?.name || saved.name || "", phone: saved.phone || "", line: saved.line || "", city: saved.city || "Gurgaon", pin: saved.pin || "122001", pay: "cod" },
    (v) => ({ ...req(v, ["name", "line", "city"]), ...(phoneOk(v.phone) ? {} : { phone: "Enter valid 10-digit number" }) })
  );

  const place = (v) => {
    const order = {
      id: `ORD-${Date.now().toString().slice(-6)}`,
      date: new Date().toISOString().slice(0, 10),
      customer: v.name,
      status: "Placed (demo)",
      address: `${v.line}, ${v.city} ${v.pin}`,
      total: sub,
      items: state.cart.map((c) => ({ id: c.id, quantity: c.quantity })),
    };
    update((s) => ({ orders: [order, ...s.orders], cart: [], lastOrder: order.id }));
    log(`Order ${order.id} placed`);
    go("/order-confirmation");
  };

  const F = ({ k, label }) => (
    <Field label={label} error={form.e[k]}>
      <input className="input" value={form.v[k]} onChange={form.set(k)} />
    </Field>
  );

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Simulated Checkout</h1>
      <form onSubmit={form.submit(place)} className="grid gap-6 md:grid-cols-12">
        <div className="md:col-span-8 rounded-xl border border-gray-200 bg-white p-6 space-y-4">
          <h2 className="font-bold text-gray-900">Delivery Address</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {F({ k: "name", label: "Full Name" })}
            {F({ k: "phone", label: "Mobile Number" })}
            <div className="sm:col-span-2">{F({ k: "line", label: "Address Line" })}</div>
            {F({ k: "city", label: "City" })}
            {F({ k: "pin", label: "PIN Code" })}
          </div>
        </div>
        <div className="md:col-span-4 rounded-xl border border-gray-200 bg-white p-5 space-y-4">
          <h2 className="font-bold text-gray-900">To Pay: {money(sub)}</h2>
          <button type="submit" className="w-full rounded bg-[#ff6f61] py-3 text-xs font-bold text-white shadow hover:bg-[#e85b4d] uppercase">
            Place Order
          </button>
        </div>
      </form>
    </div>
  );
}

// ---------------------- ORDER CONFIRMATION & ORDERS ----------------------
export function OrderConfirmation() {
  const { state } = useApp();
  const o = state.orders.find((x) => x.id === state.lastOrder) || state.orders[0];

  return (
    <div className="mx-auto max-w-xl px-4 py-16 text-center">
      <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-emerald-100 text-emerald-700">
        <Icon name="check" size={32} />
      </div>
      <h1 className="mt-4 text-2xl font-bold text-gray-900">Order Confirmed!</h1>
      <p className="mt-2 text-xs text-gray-500">Order ID: <strong>{o?.id}</strong></p>
      <div className="mt-6 flex justify-center gap-3">
        <A href="/orders" className="rounded bg-[#ff6f61] px-5 py-2 text-xs font-bold text-white">View Orders</A>
        <A href="/" className="rounded border border-gray-300 px-5 py-2 text-xs font-semibold text-gray-700">Back Home</A>
      </div>
    </div>
  );
}

export function Orders() {
  const { state } = useApp();
  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">My Orders</h1>
      {state.orders.length ? (
        <div className="space-y-3">
          {state.orders.map((o) => (
            <div key={o.id} className="rounded-xl border border-gray-200 bg-white p-4 flex items-center justify-between">
              <div>
                <p className="font-bold text-gray-900">{o.id}</p>
                <p className="text-xs text-gray-500">{o.date} · {o.status}</p>
              </div>
              <span className="font-bold text-[#ff6f61]">{money(o.total)}</span>
            </div>
          ))}
        </div>
      ) : (
        <Empty title="No orders yet" text="Explore products and place your first demo order." action="Shop now" />
      )}
    </div>
  );
}

export function OrderDetail() {
  return <Orders />;
}

export function NotFound() {
  return (
    <div className="p-16 text-center">
      <h1 className="text-3xl font-bold text-gray-900">Page Not Found</h1>
      <A href="/" className="mt-4 inline-block text-sm font-semibold text-[#ff6f61] underline">Back to Home</A>
    </div>
  );
}

export function StatusBadge({ s }) {
  const tones = {
    Delivered: "bg-emerald-50 text-emerald-700 border-emerald-200",
    Shipped: "bg-blue-50 text-blue-700 border-blue-200",
    Processing: "bg-amber-50 text-amber-700 border-amber-200",
    Placed: "bg-purple-50 text-purple-700 border-purple-200",
    Cancelled: "bg-red-50 text-red-700 border-red-200",
    Scheduled: "bg-sky-50 text-sky-700 border-sky-200",
  };
  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${tones[s] || "bg-gray-100 text-gray-700 border-gray-200"}`}>
      {s}
    </span>
  );
}

