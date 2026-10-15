import { useMemo, useState, useRef, useEffect } from "react";
import { useApp } from "../context/AppContext";
import { A, Badge, Icon, Logo, Stars, cx, money, useGo, useLoc } from "./ui";
import { topTabs, navDropdowns, popularCities, allCities, paymentPartners } from "../data/demo";
import { AuthModal } from "./AuthModals";

export function SearchBar({ big = false, onDone }) {
  const { state } = useApp();
  const go = useGo();
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, []);

  const sugg = useMemo(() => {
    const t = q.trim().toLowerCase();
    if (!t) return [];
    return [
      ...state.products
        .filter((p) => p.visible && `${p.name} ${p.brand} ${p.category}`.toLowerCase().includes(t))
        .slice(0, 5)
        .map((p) => [p.name, `/product/${p.id}`, "bottle"]),
      ...state.labTests
        .filter((l) => l.visible && l.name.toLowerCase().includes(t))
        .slice(0, 3)
        .map((l) => [l.name, `/lab-tests/${l.id}`, "lab"]),
    ];
  }, [q, state.products, state.labTests]);

  const submit = (e) => {
    e.preventDefault();
    if (!q.trim()) return;
    go(`/search?q=${encodeURIComponent(q.trim())}`);
    setOpen(false);
    onDone?.();
  };

  return (
    <div ref={containerRef} className="relative w-full">
      <form
        role="search"
        onSubmit={submit}
        className={cx(
          "flex w-full items-center rounded-lg bg-[#f1f4f6] border border-transparent focus-within:border-gray-300 focus-within:bg-white focus-within:shadow-sm transition",
          big ? "h-12 px-4" : "h-10 px-3"
        )}
      >
        <input
          aria-label="Search for Medicines and Health Products"
          value={q}
          onChange={(e) => {
            setQ(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          placeholder="Search for Medicines and Health Products"
          className="min-w-0 flex-1 bg-transparent text-sm text-gray-800 outline-none placeholder:text-gray-400 font-normal"
        />
        <button
          type="submit"
          aria-label="Submit search"
          className="p-1 text-gray-500 hover:text-[#ff6f61] transition"
        >
          <Icon name="search" size={18} />
        </button>
      </form>

      {open && sugg.length > 0 && (
        <ul className="absolute left-0 right-0 top-full z-50 mt-1.5 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-xl max-h-72 overflow-y-auto">
          {sugg.map(([l, h, i]) => (
            <li key={h}>
              <A
                href={h}
                onClick={() => {
                  setOpen(false);
                  onDone?.();
                }}
                className="flex items-center gap-3 px-4 py-2.5 text-xs sm:text-sm text-gray-700 hover:bg-[#fff3f2] hover:text-[#ff6f61] transition"
              >
                <Icon name={i} size={16} className="text-[#ff6f61] shrink-0" />
                <span className="truncate">{l}</span>
              </A>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export function CitySelector() {
  const { state, update, toast } = useApp();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, []);

  const selectCity = (city) => {
    update({ settings: { ...state.settings, location: city } });
    setOpen(false);
    toast(`Location changed to ${city}`);
  };

  return (
    <div ref={dropdownRef} className="relative shrink-0">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1.5 px-3 py-2 text-xs sm:text-sm text-gray-800 bg-[#f1f4f6] rounded-lg hover:bg-gray-200 transition font-medium"
      >
        <Icon name="pin" size={16} className="text-gray-600 shrink-0" />
        <span className="max-w-[90px] sm:max-w-[140px] truncate">{state.settings.location || "Pimpri-Chinchwad"}</span>
        <Icon name="crosshair" size={14} className="text-gray-500 shrink-0" />
      </button>

      {open && (
        <div className="absolute left-0 top-full z-50 mt-1.5 w-64 rounded-xl border border-gray-200 bg-white p-3 shadow-2xl animate-in fade-in zoom-in-95 duration-150">
          <p className="px-2 pb-1 text-[11px] font-bold tracking-wider text-gray-400 uppercase">
            POPULAR CITIES
          </p>
          <div className="space-y-0.5">
            {popularCities.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => selectCity(c)}
                className={cx(
                  "flex w-full items-center justify-between rounded-md px-2.5 py-1.5 text-xs text-left transition",
                  state.settings.location === c
                    ? "bg-[#fff3f2] font-semibold text-[#ff6f61]"
                    : "text-gray-700 hover:bg-gray-100"
                )}
              >
                <span>{c}</span>
                {state.settings.location === c && <Icon name="check" size={14} />}
              </button>
            ))}
          </div>

          <div className="my-2 border-t border-gray-100" />

          <p className="px-2 pb-1 text-[11px] font-bold tracking-wider text-gray-400 uppercase">
            ALL CITIES
          </p>
          <div className="max-h-48 overflow-y-auto space-y-0.5 pr-1">
            {allCities.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => selectCity(c)}
                className="w-full rounded-md px-2.5 py-1 text-xs text-left text-gray-600 hover:bg-gray-100 transition truncate"
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export function Header() {
  const { state, update, toast } = useApp();
  const { path } = useLoc();
  const [mob, setMob] = useState(false);
  const [authModal, setAuthModal] = useState({ open: false, mode: "login" });
  const [cartHover, setCartHover] = useState(false);
  const [helpHover, setHelpHover] = useState(false);
  const [userDropdown, setUserDropdown] = useState(false);

  const cartCount = state.cart.reduce((s, c) => s + c.quantity, 0);

  const handleLogout = () => {
    update({ user: null });
    setUserDropdown(false);
    toast("Logged out successfully");
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-white border-b border-gray-200">
        {/* Tier 1: Brand Logo + Primary Service Tabs + Auth/Offers/Cart/Help */}
        <div className="border-b border-gray-100">
          <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6">
            {/* Left: Mobile hamburger + TATA 1mg Logo */}
            <div className="flex items-center gap-3">
              <button
                className="grid h-9 w-9 place-items-center rounded-lg text-gray-700 hover:bg-gray-100 lg:hidden"
                onClick={() => setMob(true)}
                aria-label="Open mobile navigation menu"
              >
                <Icon name="menu" size={22} />
              </button>
              <Logo />
            </div>

            {/* Middle: Primary Service Tabs (Medicines, Lab Tests, Consult Doctors, etc.) */}
            <nav className="hidden lg:flex items-center space-x-1 xl:space-x-4 h-full" aria-label="Main Services">
              {topTabs.map((tab) => {
                const isActive =
                  tab.id === "medicines"
                    ? path === "/" || path.startsWith("/medicines") || path.startsWith("/product")
                    : path.startsWith(tab.href);

                return (
                  <A
                    key={tab.id}
                    href={tab.href}
                    target={tab.target}
                    rel={tab.target === "_blank" ? "noopener noreferrer" : undefined}
                    className={cx(
                      "relative flex items-center h-full px-2 xl:px-3 text-[13px] sm:text-[14px] font-extrabold tracking-tight transition duration-150 hover:text-[#ff6f61]",
                      isActive ? "text-[#ff6f61]" : "text-gray-800"
                    )}
                  >
                    <span>{tab.label}</span>
                    {tab.badge && (
                      <span className="ml-1.5 rounded bg-[#ff6f61] px-1.5 py-0.5 text-[9px] font-extrabold text-white tracking-wider">
                        {tab.badge}
                      </span>
                    )}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#ff6f61]" />
                    )}
                  </A>
                );
              })}
            </nav>

            {/* Right Side: Login/Signup | Offers | Cart | Need Help? */}
            <div className="flex items-center gap-3 sm:gap-5 text-sm font-semibold text-gray-700">
              {/* User Account / Login */}
              {state.user ? (
                <div className="relative">
                  <button
                    onClick={() => setUserDropdown((v) => !v)}
                    className="flex items-center gap-1.5 py-1 px-2 rounded-md hover:bg-gray-100 font-semibold text-gray-900"
                  >
                    <Icon name="user" size={17} className="text-[#ff6f61]" />
                    <span className="max-w-[90px] truncate">{state.user.name.split(" ")[0]}</span>
                    <Icon name="chev" size={12} className={userDropdown ? "rotate-180" : ""} />
                  </button>

                  {userDropdown && (
                    <div className="absolute right-0 top-full z-50 mt-1.5 w-44 rounded-xl border border-gray-200 bg-white p-2 shadow-xl">
                      <p className="px-3 py-1.5 text-[11px] text-gray-400 uppercase font-bold">My Account</p>
                      <A href="/orders" onClick={() => setUserDropdown(false)} className="block px-3 py-1.5 rounded-lg text-xs hover:bg-gray-100">
                        My Orders
                      </A>
                      <A href="/wishlist" onClick={() => setUserDropdown(false)} className="block px-3 py-1.5 rounded-lg text-xs hover:bg-gray-100">
                        Wishlist
                      </A>
                      <A href="/profile" onClick={() => setUserDropdown(false)} className="block px-3 py-1.5 rounded-lg text-xs hover:bg-gray-100">
                        Manage Profile
                      </A>
                      <div className="my-1 border-t border-gray-100" />
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-3 py-1.5 rounded-lg text-xs text-red-600 hover:bg-red-50 font-semibold"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => setAuthModal({ open: true, mode: "login" })}
                    className="hover:text-[#ff6f61] font-semibold text-sm text-gray-800"
                  >
                    Login
                  </button>
                  <span className="text-gray-300">|</span>
                  <button
                    type="button"
                    onClick={() => setAuthModal({ open: true, mode: "signup" })}
                    className="hover:text-[#ff6f61] font-semibold text-sm text-gray-800"
                  >
                    Signup
                  </button>
                </div>
              )}

              {/* Offers link */}
              <A href="/offers" className="hidden sm:inline-flex items-center hover:text-[#ff6f61] text-sm text-gray-800 font-semibold">
                Offers
              </A>

              {/* Cart Icon with Hover dropdown preview */}
              <div
                className="relative"
                onMouseEnter={() => setCartHover(true)}
                onMouseLeave={() => setCartHover(false)}
              >
                <A
                  href="/cart"
                  className="relative p-1.5 text-gray-800 hover:text-[#ff6f61] transition block"
                  aria-label={`Cart, ${cartCount} items`}
                >
                  <Icon name="cart" size={23} />
                  {cartCount > 0 && (
                    <span className="absolute -right-1 -top-1 grid h-4 min-w-4 place-items-center rounded-full bg-[#ff6f61] px-1 text-[9px] font-black text-white">
                      {cartCount}
                    </span>
                  )}
                </A>

                {/* Hover Cart Preview matching Screenshot 2026-10-14 200919.png */}
                {cartHover && (
                  <div className="absolute right-0 top-full z-50 mt-1 w-56 rounded-md border border-gray-200 bg-white p-4 shadow-xl">
                    <div className="flex items-center justify-between border-b border-gray-100 pb-3 text-xs font-bold text-gray-900">
                      <span>Order Summary</span>
                      <span>{cartCount} Item{cartCount === 1 ? "" : "s"}</span>
                    </div>
                    <A
                      href="/cart"
                      className="mt-3 block w-full rounded bg-transparent border-0 text-center py-2 text-xs font-bold text-[#ff6f61] hover:bg-[#fff3f2] tracking-wider transition uppercase"
                    >
                      PROCEED TO CART
                    </A>
                  </div>
                )}
              </div>

              {/* Need Help? Hover dropdown matching Screenshot 2026-10-14 200929.png */}
              <div
                className="relative hidden sm:block"
                onMouseEnter={() => setHelpHover(true)}
                onMouseLeave={() => setHelpHover(false)}
              >
                <A href="/faq" className="hover:text-[#ff6f61] text-sm text-gray-800 font-semibold">
                  Need Help?
                </A>

                {helpHover && (
                  <div className="absolute right-0 top-full z-50 mt-1 w-64 rounded-xl border border-gray-200 bg-white p-4 shadow-xl">
                    <p className="text-sm font-bold text-gray-900">Need Help ?</p>
                    <div className="mt-3 flex items-center justify-between">
                      <span className="text-xs text-gray-600">with your orders</span>
                      <button
                        onClick={() => {
                          setHelpHover(false);
                          setAuthModal({ open: true, mode: "login" });
                        }}
                        className="rounded bg-[#ff6f61] px-4 py-1.5 text-xs font-bold text-white hover:bg-[#e85b4d] uppercase"
                      >
                        LOGIN
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Tier 2: Location selector + Wide Search Input + Quick Buy Promo */}
        <div className="border-b border-gray-100 bg-white py-2.5">
          <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 sm:px-6">
            <CitySelector />
            <div className="flex-1 min-w-0">
              <SearchBar />
            </div>

            {/* Quick Buy CTA matching reference bar */}
            <div className="hidden lg:flex items-center gap-3 pl-3 shrink-0">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-800">
                <Icon name="lightning" size={14} className="text-[#ff6f61]" />
                <span>QUICK BUY! Get up to 25% off on medicines*</span>
              </div>
              <A
                href="/prescription-upload"
                className="rounded-md bg-[#ff6f61] px-4 py-2 text-xs font-bold text-white shadow-sm hover:bg-[#e85b4d] transition shrink-0"
              >
                Quick order
              </A>
            </div>
          </div>
        </div>

        {/* Tier 3: Category Mega Dropdowns Menu Bar matching reference */}
        <div className="hidden lg:block bg-white text-xs font-medium text-gray-700">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <ul className="flex items-center justify-between space-x-1">
              {navDropdowns.map((category) => (
                <li key={category.label} className="group relative py-2.5">
                  <button
                    type="button"
                    className="flex items-center gap-1 text-[13px] text-gray-700 hover:text-[#ff6f61] transition font-normal"
                  >
                    <span>{category.label}</span>
                    <Icon name="chev" size={12} className="text-gray-400 group-hover:rotate-180 transition duration-150" />
                  </button>

                  {/* Dropdown Popover */}
                  <div className="invisible opacity-0 group-hover:visible group-hover:opacity-100 absolute left-0 top-full z-50 min-w-[210px] rounded-lg border border-gray-200 bg-white py-2 shadow-2xl transition duration-150">
                    {category.items.map((subItem) => (
                      <A
                        key={subItem.name}
                        href={subItem.href}
                        className="block px-4 py-2 text-xs font-normal text-gray-800 hover:bg-[#fff3f2] hover:text-[#ff6f61] transition"
                      >
                        {subItem.name}
                      </A>
                    ))}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mob && (
        <div
          className="fixed inset-0 z-50 bg-black/60 lg:hidden animate-in fade-in duration-200"
          onClick={() => setMob(false)}
        >
          <aside
            className="h-full w-[85%] max-w-sm overflow-y-auto bg-white p-5 shadow-2xl animate-in slide-in-from-left duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
              <Logo />
              <button
                className="p-1 text-gray-500 hover:text-black"
                onClick={() => setMob(false)}
                aria-label="Close menu"
              >
                <Icon name="close" size={22} />
              </button>
            </div>

            <div className="py-4 border-b border-gray-100">
              <A
                href="/prescription-upload"
                onClick={() => setMob(false)}
                className="flex items-center justify-center gap-2 rounded-lg bg-[#ff6f61] py-2.5 text-xs font-bold text-white shadow-sm"
              >
                <Icon name="upload" size={16} />
                Quick order (Upload prescription)
              </A>
            </div>

            {/* Service navigation */}
            <div className="py-3">
              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">Services</p>
              <ul className="space-y-1">
                {topTabs.map((t) => (
                  <li key={t.id}>
                    <A
                      href={t.href}
                      target={t.target}
                      rel={t.target === "_blank" ? "noopener noreferrer" : undefined}
                      onClick={() => setMob(false)}
                      className="flex items-center justify-between rounded-lg px-3 py-2 text-sm font-medium text-gray-800 hover:bg-gray-100"
                    >
                      <span>{t.label}</span>
                      {t.badge && (
                        <span className="rounded bg-[#ff6f61] px-1.5 py-0.5 text-[9px] font-bold text-white">
                          {t.badge}
                        </span>
                      )}
                    </A>
                  </li>
                ))}
              </ul>
            </div>

            {/* Categories */}
            <div className="py-3 border-t border-gray-100">
              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">Shop Categories</p>
              <ul className="space-y-1">
                {navDropdowns.map((cat) => (
                  <li key={cat.label}>
                    <A
                      href={cat.items[0]?.href || "/healthcare"}
                      onClick={() => setMob(false)}
                      className="block rounded-lg px-3 py-2 text-xs font-medium text-gray-700 hover:bg-gray-100"
                    >
                      {cat.label}
                    </A>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      )}

      {/* Auth Modal (Login / Sign Up) */}
      <AuthModal
        open={authModal.open}
        initialMode={authModal.mode}
        onClose={() => setAuthModal({ open: false, mode: "login" })}
      />
    </>
  );
}

export function Footer() {
  const [expandInfo, setExpandInfo] = useState(false);

  return (
    <footer className="mt-16 bg-white border-t border-gray-200 text-gray-700 text-xs pb-20">
      {/* 0. Top Stats Bar: India's largest healthcare platform */}
      <div className="border-b border-gray-100 py-10 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <h3 className="text-center text-lg sm:text-xl font-bold text-gray-900 mb-8">
            India&apos;s largest healthcare platform
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 max-w-5xl mx-auto">
            {/* Stat 1: Visitors */}
            <div className="flex items-center justify-between p-6 rounded-2xl bg-white border border-gray-100 shadow-sm">
              <div>
                <p className="text-3xl font-extrabold text-gray-900">260m+</p>
                <p className="text-xs text-gray-500 font-medium mt-1">Visitors</p>
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
            <div className="flex items-center justify-between p-6 rounded-2xl bg-white border border-gray-100 shadow-sm">
              <div>
                <p className="text-3xl font-extrabold text-gray-900">31m+</p>
                <p className="text-xs text-gray-500 font-medium mt-1">Orders Delivered</p>
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
            <div className="flex items-center justify-between p-6 rounded-2xl bg-white border border-gray-100 shadow-sm">
              <div>
                <p className="text-3xl font-extrabold text-gray-900">1800+</p>
                <p className="text-xs text-gray-500 font-medium mt-1">Cities</p>
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
      </div>

      {/* 1. Main Navigation Grid */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-5">
          {/* Know Us */}
          <div>
            <h4 className="mb-3 text-sm font-bold text-gray-900">Know Us</h4>
            <ul className="space-y-2 text-gray-600">
              <li><A href="/about" className="hover:text-[#ff6f61]">About Us</A></li>
              <li><A href="/contact" className="hover:text-[#ff6f61]">Contact Us</A></li>
              <li><A href="/about" className="hover:text-[#ff6f61]">Press Coverage</A></li>
              <li><A href="/careers" className="hover:text-[#ff6f61]">Careers</A></li>
              <li><A href="/about" className="hover:text-[#ff6f61]">Business Partnership</A></li>
              <li><A href="/about" className="hover:text-[#ff6f61]">Become a Health Partner</A></li>
              <li><A href="/about" className="hover:text-[#ff6f61]">Corporate Governance</A></li>
            </ul>
          </div>

          {/* Our Policies */}
          <div>
            <h4 className="mb-3 text-sm font-bold text-gray-900">Our Policies</h4>
            <ul className="space-y-2 text-gray-600">
              <li><A href="/privacy-policy" className="hover:text-[#ff6f61]">Privacy Policy</A></li>
              <li><A href="/terms" className="hover:text-[#ff6f61]">Terms and Conditions</A></li>
              <li><A href="/health-articles" className="hover:text-[#ff6f61]">Editorial Policy</A></li>
              <li><A href="/returns-policy" className="hover:text-[#ff6f61]">Return Policy</A></li>
              <li><A href="/terms" className="hover:text-[#ff6f61]">IP Policy</A></li>
              <li><A href="/contact" className="hover:text-[#ff6f61]">Grievance Redressal Policy</A></li>
              <li><A href="/healthcare-disclaimer" className="hover:text-[#ff6f61]">Fake Jobs and Fraud Disclaimer</A></li>
            </ul>
          </div>

          {/* Our Services */}
          <div>
            <h4 className="mb-3 text-sm font-bold text-gray-900">Our Services</h4>
            <ul className="space-y-2 text-gray-600">
              <li><A href="/medicines" className="hover:text-[#ff6f61]">Order Medicines</A></li>
              <li><A href="/lab-tests" className="hover:text-[#ff6f61]">Book Lab Tests</A></li>
              <li><A href="/consult-doctor" className="hover:text-[#ff6f61]">Consult a Doctor</A></li>
              <li><A href="/healthcare/ayurveda-products" className="hover:text-[#ff6f61]">Ayurveda Articles</A></li>
              <li><A href="/health-articles" className="hover:text-[#ff6f61]">Hindi Articles</A></li>
              <li><A href="/care-plan" className="hover:text-[#ff6f61]">Care Plan</A></li>
              <li><A href="/lab-tests" className="hover:text-[#ff6f61]">NABH</A></li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="mb-3 text-sm font-bold text-gray-900">Connect</h4>
            <p className="mb-3 text-xs text-gray-500">Social Links</p>
            <div className="flex flex-wrap items-center gap-2.5">
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
              <a href="https://youtube.com" target="_blank" rel="noreferrer" title="YouTube" className="hover:opacity-80 transition inline-block">
                <img
                  src="/images/partnerships/icon_youtube.png"
                  alt="YouTube"
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
            </div>
          </div>

          {/* Download App */}
          <div>
            <h4 className="mb-3 text-sm font-bold text-gray-900">Download the MEDITRUST app</h4>
            <div className="space-y-2.5">
              <a
                href="https://play.google.com/store/apps/details?id=com.aranoah.healthkart.plus"
                target="_blank"
                rel="noreferrer"
                className="inline-block hover:opacity-90 transition"
              >
                <img
                  src="/images/partnerships/google_play_badge.png"
                  alt="Get it on Google Play"
                  className="h-10 w-auto object-contain cursor-pointer drop-shadow-xs"
                />
              </a>

              <a
                href="https://apps.apple.com/in/app/tata-1mg/id1081682217"
                target="_blank"
                rel="noreferrer"
                className="inline-block hover:opacity-90 transition"
              >
                <img
                  src="/images/partnerships/app_store_badge_official.png"
                  alt="Download on the App Store"
                  className="h-10 w-auto object-contain cursor-pointer drop-shadow-xs"
                />
              </a>
            </div>
          </div>
        </div>

        {/* 2. Trust Pillars (Reliable, Secure, Affordable) matching uploaded icons */}
        <div className="my-12 grid gap-6 border-y border-gray-100 py-10 sm:grid-cols-3">
          <div className="flex items-start gap-4">
            <div className="h-10 w-10 shrink-0 flex items-center justify-center">
              <img
                src="/images/partnerships/icon_reliable_shield.png"
                alt="Reliable"
                className="h-full w-full object-contain"
              />
            </div>
            <div>
              <h5 className="font-bold text-gray-900 text-sm">Reliable</h5>
              <p className="mt-1 text-xs text-gray-500 leading-relaxed">
                All products displayed on MEDITRUST are procured from verified and licensed pharmacies. All labs listed on the platform are accredited.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="h-10 w-10 shrink-0 flex items-center justify-center">
              <img
                src="/images/partnerships/icon_secure_shield.png"
                alt="Secure"
                className="h-full w-full object-contain"
              />
            </div>
            <div>
              <h5 className="font-bold text-gray-900 text-sm">Secure</h5>
              <p className="mt-1 text-xs text-gray-500 leading-relaxed">
                MEDITRUST uses Secure Sockets Layer (SSL) 128-bit encryption and is Payment Card Industry Data Security Standard (PCI DSS) compliant.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="h-10 w-10 shrink-0 flex items-center justify-center">
              <img
                src="/images/partnerships/icon_wallet.png"
                alt="Affordable"
                className="h-full w-full object-contain"
              />
            </div>
            <div>
              <h5 className="font-bold text-gray-900 text-sm">Affordable</h5>
              <p className="mt-1 text-xs text-gray-500 leading-relaxed">
                Find affordable medicine substitutes, save up to 50% on health products, up to 80% off on lab tests and free doctor consultations.
              </p>
            </div>
          </div>
        </div>

        {/* 3. Certifications Seal */}
        <div className="my-8 flex flex-col items-center justify-center text-center">
          <div className="flex items-center gap-3 border border-gray-300 rounded px-4 py-2 bg-white">
            <div className="text-left font-serif font-black text-xs border-r border-gray-300 pr-3">
              URS <br />
              <span className="text-[9px] font-sans">ISO 27001</span>
            </div>
            <div className="text-left font-serif text-[10px]">
              UKAS <br />
              <span className="text-[9px] font-sans">MANAGEMENT SYSTEMS</span>
            </div>
          </div>
          <p className="mt-3 text-xs text-gray-500">
            India's only LegitScript and ISO/IEC 27001:2022 certified online healthcare platform
          </p>
        </div>

        {/* 4. Expandable "Know more about MEDITRUST" Accordion */}
        <div className="border-t border-gray-100 pt-6">
          <button
            type="button"
            onClick={() => setExpandInfo((v) => !v)}
            className="flex items-center gap-2 text-sm font-semibold text-gray-800 hover:text-[#ff6f61] transition"
          >
            <span>Know more about MEDITRUST</span>
            <Icon name="chev" size={14} className={expandInfo ? "rotate-180" : ""} />
          </button>

          {expandInfo && (
            <div className="mt-4 space-y-3 text-xs leading-relaxed text-gray-500">
              <p>
                MEDITRUST (MEDITRUST LIFE SCIENCE PVT LTD) is your complete healthcare partner under the visionary leadership of registered directors Ajay Kumar Pathri and Omkar Sanjay Telangi. We simplify healthcare with reliable medicines delivered to your doorstep, accredited diagnostic lab tests from the comfort of your home, and online doctor consultations across all clinical specialties.
              </p>
              <p>
                Our Care Plan offers extra benefits including flat 5% extra savings on medicines, zero delivery fees on orders, complimentary lab checkups, and exclusive member discounts.
              </p>
            </div>
          )}
        </div>

        {/* Corporate & Registered Office Information */}
        <div className="mt-8 border-t border-gray-100 pt-6 grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-gray-600">
          <div>
            <h5 className="font-bold text-gray-900 mb-1.5 text-sm">MEDITRUST LIFE SCIENCE PVT LTD</h5>
            <p className="leading-relaxed">
              <strong>Registered Office:</strong> Morya Colony, Matoshree Nagar, Sector No. 32, Chinchwad, Pimpri-Chinchwad, Maharashtra 411033
            </p>
            <p className="mt-1">
              <strong>Registered Directors:</strong> Ajay Kumar Pathri, Omkar Sanjay Telangi
            </p>
          </div>
          <div>
            <h5 className="font-bold text-gray-900 mb-1.5 text-sm">Customer Support &amp; Enquiries</h5>
            <p>
              <strong>Phone:</strong>{" "}
              <a href="tel:+917276048377" className="font-semibold text-[#ff6f61] hover:underline">
                +91 7276048377
              </a>
            </p>
            <p className="mt-1">
              <strong>Email:</strong>{" "}
              <a href="mailto:contact@meditrusts.life" className="font-semibold text-[#ff6f61] hover:underline">
                contact@meditrusts.life
              </a>
            </p>
          </div>
        </div>

        {/* 5. Legal disclaimer and Copyright */}
        <div className="mt-6 border-t border-gray-100 pt-4 text-[11px] text-gray-500 leading-relaxed">
          <p>
            © 2026 MEDITRUST LIFE SCIENCE PVT LTD. All rights reserved. All medicines are dispensed in compliance with the Drugs and Cosmetics Act, 1940 and Drugs and Cosmetics Rules, 1945. We do not process requests for Schedule X and habit forming drugs.
          </p>
        </div>

        {/* 6. Payment Partners Row & Admin Link */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-gray-100 pt-6">
          <div className="flex flex-wrap items-center gap-3 text-xs font-bold text-gray-800">
            <span className="text-gray-500 font-semibold mr-1">Our payment partners:</span>
            {paymentPartners.map((p) => (
              <span key={p} className="rounded border border-gray-200 px-2 py-1 text-[11px] bg-gray-50 font-medium">
                {p}
              </span>
            ))}
          </div>

          <A href="/admin/login" className="text-gray-400 hover:text-gray-700 text-[11px]">
            Admin Login →
          </A>
        </div>
      </div>
    </footer>
  );
}

export function StickyBottomBar() {
  const { toast } = useApp();
  const [closed, setClosed] = useState(false);
  const [phone, setPhone] = useState("");

  if (closed) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!phone || phone.replace(/\D/g, "").length < 10) {
      toast("Please enter a valid 10-digit mobile number", "error");
      return;
    }
    toast("Thank you! Our pharmacy specialist will call you shortly.");
    setPhone("");
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200 shadow-2xl py-2 px-3 sm:px-4 animate-in slide-in-from-bottom duration-300">
      <div className="mx-auto flex max-w-7xl flex-col sm:flex-row items-center justify-between gap-2 sm:gap-3">
        {/* Left Side: Call Info */}
        <div className="flex items-center justify-between w-full sm:w-auto gap-2">
          <div className="flex items-center gap-2">
            <div className="grid h-7 w-7 sm:h-8 sm:w-8 place-items-center rounded-full bg-blue-50 text-blue-600 shrink-0">
              <Icon name="phone" size={15} />
            </div>
            <div className="text-[11px] sm:text-xs">
              <span className="font-bold text-gray-900">Order on Call: </span>
              <a href="tel:+917276048377" className="font-bold text-emerald-700 hover:underline">
                +91 7276048377
              </a>
            </div>
          </div>

          <button
            onClick={() => setClosed(true)}
            aria-label="Close bottom bar"
            className="p-1 text-gray-400 hover:text-gray-800 transition rounded-full hover:bg-gray-100 sm:hidden shrink-0"
          >
            <Icon name="close" size={15} />
          </button>
        </div>

        {/* Right Side: Phone callback form + Close button */}
        <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
          <form onSubmit={handleSubmit} className="flex items-center gap-1.5 sm:gap-2 w-full sm:w-auto">
            <div className="flex h-8 sm:h-9 flex-1 sm:flex-initial items-center rounded-md border border-gray-300 bg-white px-2 focus-within:border-[#ff6f61]">
              <span className="text-[11px] sm:text-xs font-semibold text-gray-600 mr-1 flex items-center gap-0.5">
                🇮🇳 +91
              </span>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Phone Number"
                className="w-full sm:w-36 text-xs text-gray-900 outline-none"
              />
            </div>
            <button
              type="submit"
              className="flex items-center gap-1 rounded-md bg-[#ff6f61] px-2.5 sm:px-4 py-2 text-[11px] sm:text-xs font-bold text-white shadow hover:bg-[#e85b4d] active:scale-95 transition whitespace-nowrap shrink-0"
            >
              <Icon name="phone" size={12} />
              <span>Get Call</span>
            </button>
          </form>

          <button
            onClick={() => setClosed(true)}
            aria-label="Close bottom bar"
            className="hidden sm:block p-1.5 text-gray-400 hover:text-gray-800 transition rounded-full hover:bg-gray-100 shrink-0"
          >
            <Icon name="close" size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

export function ProductCard({ p }) {
  const { state, addToCart, toggleWish } = useApp();
  const go = useGo();
  const wished = state.wishlist.includes(p.id);
  const off = p.mrp > p.price ? Math.round(((p.mrp - p.price) / p.mrp) * 100) : 0;

  return (
    <article className="group relative flex flex-col justify-between rounded-xl border border-gray-200 bg-white p-3.5 transition hover:shadow-lg">
      <div>
        {/* Wishlist toggle */}
        <button
          onClick={() => toggleWish(p.id)}
          aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
          className={cx(
            "absolute right-3 top-3 z-10 grid h-7 w-7 place-items-center rounded-full bg-white shadow-sm transition",
            wished ? "text-red-500" : "text-gray-400 hover:text-red-500"
          )}
        >
          <Icon name="heart" size={15} className={wished ? "fill-current" : ""} />
        </button>

        {/* Product Image */}
        <A href={`/product/${p.id}`} className="block relative aspect-square w-full overflow-hidden rounded-lg bg-white mb-3">
          <div className="grid h-full w-full place-items-center p-2 group-hover:scale-105 transition duration-200">
            {p.image || D.medicineCatalogImages ? (
              <img
                src={p.image || D.medicineCatalogImages[Math.abs(p.name.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0)) % D.medicineCatalogImages.length]}
                alt={p.name}
                className="h-full w-full object-contain"
                onError={(e) => {
                  e.currentTarget.src = "/images/products/med_unienzyme.png";
                }}
              />
            ) : (
              <div className="grid h-24 w-24 place-items-center rounded-xl bg-gray-50 text-[#ff6f61]">
                <Icon name="bottle" size={38} />
              </div>
            )}
          </div>
        </A>

        {/* Product Brand & Category */}
        <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
          {p.brand}
        </p>

        {/* Product Title */}
        <A
          href={`/product/${p.id}`}
          className="mt-1 line-clamp-2 text-xs sm:text-sm font-semibold text-gray-900 leading-snug hover:text-[#ff6f61] transition"
        >
          {p.name}
        </A>

        {/* Pack Subtitle */}
        <p className="mt-0.5 text-[11px] text-gray-500">{p.pack}</p>

        {/* Rating */}
        <div className="mt-1.5">
          <Stars rating={p.rating || 4.3} reviews={p.reviews || 88} />
        </div>

        {/* Delivery speed badge */}
        <p className="mt-1.5 text-[10px] font-medium text-gray-500">
          {p.delivery || "Get by Tomorrow"}
        </p>
      </div>

      {/* Price & Add to Cart button */}
      <div className="mt-3 border-t border-gray-100 pt-3">
        <div className="flex items-baseline gap-1.5">
          <span className="text-sm sm:text-base font-bold text-gray-900">{money(p.price)}</span>
          {off > 0 && (
            <>
              <span className="text-xs text-gray-400 line-through">₹{p.mrp}</span>
              <span className="text-xs font-bold text-emerald-600">{off}% off</span>
            </>
          )}
        </div>

        <button
          onClick={() => (p.prescription ? go(`/product/${p.id}`) : addToCart(p))}
          className="mt-2.5 w-full rounded-md border border-[#ff6f61] bg-white py-1.5 text-xs font-bold text-[#ff6f61] hover:bg-[#ff6f61] hover:text-white transition shadow-sm"
        >
          {p.prescription ? "View details" : "ADD"}
        </button>
      </div>
    </article>
  );
}

export const ProductGrid = ({ items }) => (
  <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 xl:grid-cols-4">
    {items.map((p) => (
      <ProductCard key={p.id} p={p} />
    ))}
  </div>
);

export function ProductFilters({ list, f, setF }) {
  const brands = [...new Set(list.map((p) => p.brand))].sort();
  const cats = [...new Set(list.map((p) => p.category))];
  return (
    <aside className="rounded-xl border border-gray-200 bg-white p-4 text-xs space-y-5">
      {cats.length > 1 && (
        <div>
          <h3 className="mb-2 font-bold text-gray-900 uppercase tracking-wider text-[11px]">Category</h3>
          <select
            className="w-full rounded border border-gray-200 p-2 text-xs outline-none"
            value={f.cat}
            onChange={(e) => setF({ ...f, cat: e.target.value })}
          >
            <option value="">All categories</option>
            {cats.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </div>
      )}
      <div>
        <h3 className="mb-2 font-bold text-gray-900 uppercase tracking-wider text-[11px]">Brand</h3>
        <div className="max-h-44 space-y-1 overflow-auto pr-1">
          {brands.map((b) => (
            <label key={b} className="flex items-center gap-2 cursor-pointer text-gray-700 hover:text-black">
              <input
                type="checkbox"
                className="accent-[#ff6f61]"
                checked={f.brands.includes(b)}
                onChange={() =>
                  setF({
                    ...f,
                    brands: f.brands.includes(b) ? f.brands.filter((x) => x !== b) : [...f.brands, b],
                  })
                }
              />
              <span className="truncate">{b}</span>
            </label>
          ))}
        </div>
      </div>
      <div>
        <h3 className="mb-2 font-bold text-gray-900 uppercase tracking-wider text-[11px]">
          Max Price: {money(f.max)}
        </h3>
        <input
          type="range"
          min="50"
          max="3000"
          step="50"
          value={f.max}
          onChange={(e) => setF({ ...f, max: +e.target.value })}
          className="w-full accent-[#ff6f61]"
        />
      </div>
      <button
        className="w-full rounded border border-gray-300 py-1.5 text-xs font-semibold text-gray-700 hover:bg-gray-100 transition"
        onClick={() => setF({ cat: "", brands: [], max: 3000, rxOnly: null, sort: f.sort })}
      >
        Clear filters
      </button>
    </aside>
  );
}

export function applyFilters(list, f) {
  const r = list.filter(
    (p) =>
      (!f.cat || p.category === f.cat) &&
      (!f.brands.length || f.brands.includes(p.brand)) &&
      p.price <= f.max &&
      (f.rxOnly !== false || !p.prescription)
  );
  const disc = (p) => (p.mrp - p.price) / p.mrp;
  const by = {
    popular: (a, b) => (b.popularity || 0) - (a.popularity || 0),
    low: (a, b) => a.price - b.price,
    high: (a, b) => b.price - a.price,
    name: (a, b) => a.name.localeCompare(b.name),
    discount: (a, b) => disc(b) - disc(a),
  };
  return [...r].sort(by[f.sort] || by.popular);
}

export const SortSelect = ({ f, setF }) => (
  <label className="flex items-center gap-2 text-xs">
    <span className="text-gray-500 font-medium">Sort by</span>
    <select
      className="rounded border border-gray-200 bg-white py-1.5 px-2 text-xs font-semibold text-gray-800 outline-none"
      value={f.sort}
      onChange={(e) => setF({ ...f, sort: e.target.value })}
    >
      <option value="popular">Popularity</option>
      <option value="low">Price: Low to High</option>
      <option value="high">Price: High to Low</option>
      <option value="name">Name</option>
      <option value="discount">Discount</option>
    </select>
  </label>
);
