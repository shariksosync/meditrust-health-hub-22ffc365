import { useMemo, useState } from "react";
import { useApp } from "../context/AppContext";
import { A, Art, Badge, Icon, Logo, catIcon, cx, money, useGo, useLoc } from "./ui";

export function SearchBar({ big = false, onDone }) {
  const { state } = useApp();
  const go = useGo();
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const sugg = useMemo(() => {
    const t = q.trim().toLowerCase(); if (!t) return [];
    return [...state.products.filter((p) => p.visible && `${p.name} ${p.brand} ${p.category}`.toLowerCase().includes(t)).slice(0, 5).map((p) => [p.name, `/product/${p.id}`, "bottle"]),
      ...state.labTests.filter((l) => l.visible && l.name.toLowerCase().includes(t)).slice(0, 2).map((l) => [l.name, `/lab-tests/${l.id}`, "lab"])];
  }, [q, state.products, state.labTests]);
  const submit = (e) => { e.preventDefault(); if (!q.trim()) return; go(`/search?q=${encodeURIComponent(q.trim())}`); setOpen(false); onDone?.(); };
  return <form role="search" onSubmit={submit} className={cx("relative flex w-full items-center rounded-xl border border-border bg-card focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20", big ? "p-1.5 shadow-soft" : "")}>
    <Icon name="search" size={18} className="ml-3 shrink-0 text-muted-foreground"/>
    <input aria-label="Search medicines, products and lab tests" value={q} onChange={(e) => { setQ(e.target.value); setOpen(true); }} onFocus={() => setOpen(true)} onBlur={() => setTimeout(() => setOpen(false), 150)} placeholder="Search medicines, products & lab tests" className={cx("min-w-0 flex-1 bg-transparent px-3 outline-none placeholder:text-muted-foreground", big ? "py-3 text-base" : "py-2.5 text-sm")}/>
    <button type="submit" className={cx("btn btn-primary", big ? "" : "m-1 px-3 py-1.5")}>Search</button>
    {open && sugg.length > 0 && <ul className="absolute left-0 right-0 top-full z-40 mt-2 overflow-hidden rounded-xl border border-border bg-card shadow-lift">{sugg.map(([l, h, i]) => <li key={h}><A href={h} onClick={onDone} className="flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-mint"><Icon name={i} size={16} className="text-primary"/>{l}</A></li>)}</ul>}
  </form>;
}

const menus = {
  "/medicines": (s) => s.categories.filter((c) => c.visible && /medicine/i.test(c.name)).map((c) => [c.name, `/medicines/${c.slug}`]).concat([["Upload prescription", "/prescription-upload"]]),
  "/healthcare": (s) => s.categories.filter((c) => c.visible && !/prescription/i.test(c.name)).map((c) => [c.name, `/healthcare/${c.slug}`]),
  "/lab-tests": (s) => s.labTests.filter((t) => t.visible).slice(0, 6).map((t) => [t.name, `/lab-tests/${t.id}`]),
  "/consult-doctor": () => ["General Physician", "Dermatology", "Pediatrics", "Gynecology", "Orthopedics", "Mental Wellness"].map((s) => [s, `/doctors/${s.toLowerCase().replace(/\s+/g, "-")}`]),
};

export function Header() {
  const { state } = useApp();
  const { path } = useLoc();
  const [mob, setMob] = useState(false);
  const [sOpen, setSOpen] = useState(false);
  const [sub, setSub] = useState(null);
  const count = state.cart.reduce((s, c) => s + c.quantity, 0);
  const nav = state.navigation.filter((n) => n.visible);
  return <header className="sticky top-0 z-40 bg-card/95 backdrop-blur border-b border-border">
    {state.settings.announcementVisible && <div className="bg-primary-deep text-primary-foreground"><div className="container-page flex items-center justify-between gap-3 py-1.5 text-xs"><span className="flex items-center gap-1.5 truncate"><Icon name="sparkle" size={13}/>{state.settings.announcement}</span><A href="/healthcare-disclaimer" className="hidden shrink-0 underline-offset-2 hover:underline sm:block">Demonstration website</A></div></div>}
    <div className="container-page flex items-center gap-3 py-3">
      <button className="icon-btn lg:hidden" onClick={() => setMob(true)} aria-label="Open menu"><Icon name="menu"/></button>
      <Logo/>
      <button className="ml-2 hidden items-center gap-1.5 rounded-xl px-2 py-1.5 text-left text-xs hover:bg-mint md:flex" title="Demo location"><Icon name="pin" size={18} className="text-primary"/><span><span className="block text-muted-foreground">Deliver to (demo)</span><span className="font-semibold">{state.settings.location}</span></span></button>
      <div className="mx-2 hidden flex-1 md:block"><SearchBar/></div>
      <div className="ml-auto flex items-center gap-1 md:ml-0">
        <button className="icon-btn md:hidden" onClick={() => setSOpen((v) => !v)} aria-label="Search"><Icon name="search"/></button>
        <A href={state.user ? "/profile" : "/login"} className="icon-btn w-auto gap-2 px-2 text-sm font-medium" aria-label="Account"><Icon name="user"/><span className="hidden lg:inline">{state.user ? state.user.name.split(" ")[0] : "Login"}</span></A>
        <A href="/wishlist" className="icon-btn relative" aria-label="Wishlist"><Icon name="heart"/>{state.wishlist.length > 0 && <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-destructive"/>}</A>
        <A href="/cart" className="icon-btn relative" aria-label={`Cart, ${count} items`}><Icon name="cart"/>{count > 0 && <span className="absolute -right-0.5 -top-0.5 grid h-5 min-w-5 place-items-center rounded-full bg-primary px-1 text-[10px] font-bold text-primary-foreground">{count}</span>}</A>
      </div>
    </div>
    {sOpen && <div className="container-page pb-3 md:hidden"><SearchBar onDone={() => setSOpen(false)}/></div>}
    <nav className="hidden border-t border-border lg:block" aria-label="Main"><ul className="container-page flex items-center gap-1">
      {nav.map((n) => <li key={n.id} className="group relative">
        <A href={n.href} className={cx("flex items-center gap-1 px-3 py-3 text-sm font-medium transition hover:text-primary", path.startsWith(n.href) ? "text-primary" : "text-foreground")}>{n.label}{menus[n.href] && <Icon name="chev" size={14}/>}</A>
        {menus[n.href] && <div className="invisible absolute left-0 top-full z-40 w-64 rounded-xl border border-border bg-card p-2 opacity-0 shadow-lift transition group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">{menus[n.href](state).map(([l, h]) => <A key={h} href={h} className="block rounded-lg px-3 py-2 text-sm hover:bg-mint hover:text-primary">{l}</A>)}</div>}
      </li>)}
      <li className="ml-auto"><A href="/prescription-upload" className="flex items-center gap-1.5 px-3 py-3 text-sm font-semibold text-primary"><Icon name="upload" size={16}/>Upload prescription</A></li>
    </ul></nav>
    {mob && <div className="fixed inset-0 z-50 bg-foreground/40 lg:hidden" onClick={() => setMob(false)}>
      <aside className="h-full w-[85%] max-w-sm overflow-auto bg-card p-4" onClick={(e) => e.stopPropagation()}>
        <div className="mb-4 flex items-center justify-between"><Logo/><button className="icon-btn" onClick={() => setMob(false)} aria-label="Close menu"><Icon name="close"/></button></div>
        <ul className="space-y-1">{nav.map((n) => <li key={n.id}>
          <div className="flex items-center"><A href={n.href} onClick={() => setMob(false)} className="flex-1 rounded-lg px-3 py-3 font-medium hover:bg-mint">{n.label}</A>{menus[n.href] && <button className="icon-btn" aria-label={`Show ${n.label} categories`} aria-expanded={sub === n.id} onClick={() => setSub(sub === n.id ? null : n.id)}><Icon name="chev" className={sub === n.id ? "rotate-180" : ""}/></button>}</div>
          {sub === n.id && <div className="ml-3 border-l border-border pl-2">{menus[n.href](state).map(([l, h]) => <A key={h} href={h} onClick={() => setMob(false)} className="block rounded-lg px-3 py-2 text-sm text-muted-foreground hover:text-primary">{l}</A>)}</div>}
        </li>)}</ul>
        <div className="mt-4 grid gap-2 border-t border-border pt-4 text-sm">{[["Upload prescription", "/prescription-upload"], ["My orders", "/orders"], ["Wishlist", "/wishlist"], [state.user ? "My profile" : "Login / Register", state.user ? "/profile" : "/login"]].map(([l, h]) => <A key={h} href={h} onClick={() => setMob(false)} className="rounded-lg px-3 py-2 hover:bg-mint">{l}</A>)}</div>
      </aside>
    </div>}
  </header>;
}

export function Footer() {
  const { state } = useApp();
  const s = state.settings;
  const cols = [
    ["Company", [["About MEDITRUST", "/about"], ["Our Services", "/about"], ["Contact Us", "/contact"], ["Careers", "/careers"]]],
    ["Healthcare Services", [["Order Medicines", "/medicines"], ["Healthcare Products", "/healthcare"], ["Book Lab Tests", "/lab-tests"], ["Consult a Doctor", "/consult-doctor"], ["Health Articles", "/health-articles"]]],
    ["Customer Support", [["FAQs", "/faq"], ["Shipping Policy", "/shipping-policy"], ["Returns and Refunds", "/returns-policy"], ["Privacy Policy", "/privacy-policy"], ["Terms and Conditions", "/terms"], ["Healthcare Disclaimer", "/healthcare-disclaimer"]]],
  ];
  return <footer className="mt-16 bg-navy text-primary-foreground">
    <div className="container-page grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-5">
      <div className="lg:col-span-2"><Logo light/><p className="mt-4 max-w-sm text-sm text-primary-foreground/70">{s.footerText}</p>
        <ul className="mt-5 space-y-2 text-sm text-primary-foreground/85">
          <li className="flex gap-2"><Icon name="phone" size={16} className="mt-0.5 shrink-0"/><a href={`tel:${s.phone.replace(/\s/g, "")}`} className="hover:underline">{s.phone}</a></li>
          <li className="flex gap-2"><Icon name="mail" size={16} className="mt-0.5 shrink-0"/><a href={`mailto:${s.email}`} className="hover:underline">{s.email}</a></li>
          <li className="flex gap-2"><Icon name="pin" size={16} className="mt-0.5 shrink-0"/><span>{s.address}</span></li>
        </ul>
        <div className="mt-4 flex gap-3 text-xs">{Object.entries(s.social || {}).map(([k, v]) => v && <a key={k} href={v} target="_blank" rel="noreferrer" className="rounded-full border border-primary-foreground/20 px-3 py-1 capitalize hover:bg-primary-foreground/10">{k}</a>)}</div>
      </div>
      {cols.map(([t, ls]) => <div key={t}><h3 className="mb-3 text-sm font-semibold">{t}</h3><ul className="space-y-2 text-sm text-primary-foreground/70">{ls.map(([l, h]) => <li key={l}><A href={h} className="hover:text-primary-foreground">{l}</A></li>)}</ul></div>)}
    </div>
    <div className="border-t border-primary-foreground/10"><div className="container-page flex flex-col gap-2 py-5 text-xs text-primary-foreground/60 md:flex-row md:items-center md:justify-between">
      <span>© 2026 {s.companyName}. Directors: Ajay Kumar Pathri, Omkar Sanjay Telangi.</span>
      <span className="md:max-w-md">{s.disclaimer}</span>
      <A href="/admin/login" className="text-primary-foreground/50 hover:text-primary-foreground">Admin Login →</A>
    </div></div>
  </footer>;
}

export function ProductCard({ p }) {
  const { state, addToCart, toggleWish } = useApp();
  const go = useGo();
  const wished = state.wishlist.includes(p.id);
  const off = p.mrp > p.price ? Math.round(((p.mrp - p.price) / p.mrp) * 100) : 0;
  return <article className="card group flex flex-col overflow-hidden transition hover:-translate-y-0.5 hover:shadow-soft">
    <div className="relative aspect-square"><A href={`/product/${p.id}`} aria-label={p.name}><Art icon={catIcon(state.categories, p.category)} seed={parseInt(p.id.slice(-2))} image={p.image} alt={p.name}/></A>
      {p.prescription && <span className="absolute left-2 top-2"><Badge tone="rx">Rx required</Badge></span>}
      {off > 0 && !p.prescription && <span className="absolute left-2 top-2"><Badge tone="ok">{off}% off</Badge></span>}
      <button onClick={() => toggleWish(p.id)} aria-label={wished ? "Remove from wishlist" : "Add to wishlist"} aria-pressed={wished} className={cx("absolute right-2 top-2 grid h-9 w-9 place-items-center rounded-full bg-card shadow-soft transition", wished ? "text-destructive" : "text-muted-foreground hover:text-destructive")}><Icon name="heart" size={18} className={wished ? "fill-current" : ""}/></button>
    </div>
    <div className="flex flex-1 flex-col p-3 sm:p-4">
      <p className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">{p.brand} · {p.category}</p>
      <A href={`/product/${p.id}`} className="mt-1 line-clamp-2 text-sm font-semibold leading-snug hover:text-primary">{p.name}</A>
      <p className="mt-0.5 text-xs text-muted-foreground">{p.pack}</p>
      <div className="mt-auto pt-3"><div className="flex items-baseline gap-2"><span className="font-bold">{money(p.price)}</span>{off > 0 && <span className="text-xs text-muted-foreground line-through">MRP {money(p.mrp)}</span>}</div>
        <button className="btn btn-soft mt-2 w-full py-2" disabled={p.stock <= 0} onClick={() => p.prescription ? go(`/product/${p.id}`) : addToCart(p)}>{p.stock <= 0 ? "Out of stock" : p.prescription ? "View details" : <><Icon name="plus" size={16}/>Add to cart</>}</button>
      </div>
    </div>
  </article>;
}
export const ProductGrid = ({ items }) => <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 xl:grid-cols-4">{items.map((p) => <ProductCard key={p.id} p={p}/>)}</div>;

export function ProductFilters({ list, f, setF }) {
  const brands = [...new Set(list.map((p) => p.brand))].sort();
  const cats = [...new Set(list.map((p) => p.category))];
  return <aside className="card h-fit space-y-5 p-4 text-sm">
    {cats.length > 1 && <div><h3 className="mb-2 font-semibold">Category</h3><select className="input" value={f.cat} onChange={(e) => setF({ ...f, cat: e.target.value })}><option value="">All categories</option>{cats.map((c) => <option key={c}>{c}</option>)}</select></div>}
    <div><h3 className="mb-2 font-semibold">Brand</h3><div className="max-h-44 space-y-1.5 overflow-auto">{brands.map((b) => <label key={b} className="flex items-center gap-2"><input type="checkbox" className="accent-[var(--primary)]" checked={f.brands.includes(b)} onChange={() => setF({ ...f, brands: f.brands.includes(b) ? f.brands.filter((x) => x !== b) : [...f.brands, b] })}/>{b}</label>)}</div></div>
    <div><h3 className="mb-2 font-semibold">Max price: {money(f.max)}</h3><input type="range" min="50" max="2000" step="50" value={f.max} onChange={(e) => setF({ ...f, max: +e.target.value })} className="w-full accent-[var(--primary)]" aria-label="Maximum price"/></div>
    <label className="flex items-center gap-2"><input type="checkbox" className="accent-[var(--primary)]" checked={f.rxOnly === false} onChange={(e) => setF({ ...f, rxOnly: e.target.checked ? false : null })}/>Hide prescription items</label>
    <button className="btn btn-outline btn-sm w-full" onClick={() => setF({ cat: "", brands: [], max: 2000, rxOnly: null, sort: f.sort })}>Clear filters</button>
  </aside>;
}
export function applyFilters(list, f) {
  const r = list.filter((p) => (!f.cat || p.category === f.cat) && (!f.brands.length || f.brands.includes(p.brand)) && p.price <= f.max && (f.rxOnly !== false || !p.prescription));
  const disc = (p) => (p.mrp - p.price) / p.mrp;
  const by = { popular: (a, b) => b.popularity - a.popularity, low: (a, b) => a.price - b.price, high: (a, b) => b.price - a.price, name: (a, b) => a.name.localeCompare(b.name), discount: (a, b) => disc(b) - disc(a) };
  return [...r].sort(by[f.sort] || by.popular);
}
export const SortSelect = ({ f, setF }) => <label className="flex items-center gap-2 text-sm"><span className="text-muted-foreground">Sort</span><select className="input w-auto py-2" value={f.sort} onChange={(e) => setF({ ...f, sort: e.target.value })}><option value="popular">Popularity</option><option value="low">Price: low to high</option><option value="high">Price: high to low</option><option value="name">Name</option><option value="discount">Discount</option></select></label>;
