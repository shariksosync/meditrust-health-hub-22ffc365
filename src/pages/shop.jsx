import { useEffect, useMemo, useState } from "react";
import heroFallback from "../assets/meditrust-healthcare.jpg";
import { applyCoupon, priceOf, useApp } from "../context/AppContext";
import { A, Art, Badge, Crumbs, DemoNote, Empty, Field, Icon, Section, catIcon, cx, money, phoneOk, req, useForm, useGo, useLoc } from "../components/ui";
import { ProductCard, ProductFilters, ProductGrid, SearchBar, SortSelect, applyFilters } from "../components/Layout";
import { ArticleCard, Newsletter } from "./services";

export function Home() {
  const { state } = useApp();
  const s = state.settings, sec = s.sections;
  const featured = state.products.filter((p) => p.visible && p.featured).slice(0, 8);
  return <>
    <section className="hero-glow border-b border-border"><div className="container-page grid items-center gap-10 py-10 lg:grid-cols-2 lg:py-16">
      <div><p className="eyebrow flex items-center gap-1.5"><Icon name="shield" size={14}/>MEDITRUST · Everyday healthcare</p>
        <h1 className="font-display text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">{s.heroTitle}</h1>
        <p className="mt-4 max-w-xl text-lg text-muted-foreground">{s.heroSubtitle}</p>
        <div className="mt-6 max-w-xl"><SearchBar big/></div>
        <div className="mt-5 flex flex-wrap gap-3"><A href={s.heroPrimaryHref} className="btn btn-primary px-5 py-3">{s.heroPrimaryText}<Icon name="arrow" size={17}/></A><A href={s.heroSecondaryHref} className="btn btn-outline px-5 py-3">{s.heroSecondaryText}</A></div>
      </div>
      <div className="relative"><div className="aspect-[4/3] overflow-hidden rounded-3xl shadow-lift"><img src={s.heroImage || heroFallback} onError={(e) => { e.currentTarget.src = heroFallback; }} alt="Pharmacist helping a customer in a bright modern pharmacy" className="h-full w-full object-cover"/></div>
        <div className="absolute -bottom-5 left-4 flex items-center gap-3 rounded-2xl bg-card p-3 pr-5 shadow-lift"><span className="grid h-10 w-10 place-items-center rounded-xl bg-mint text-primary"><Icon name="upload"/></span><div className="text-sm"><p className="font-semibold">Have a prescription?</p><A href="/prescription-upload" className="text-primary">Try the demo upload →</A></div></div>
      </div>
    </div></section>
    {sec.shortcuts && <Section eyebrow="All in one place" title="How can we help today?"><div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">{state.shortcuts.filter((x) => x.visible).map((c, i) => <A key={c.id} href={c.href} className="card group p-4 transition hover:border-primary hover:shadow-soft"><span className={cx("mb-3 grid h-12 w-12 place-items-center rounded-xl text-primary", `tone-${i % 6}`)}><Icon name={c.icon} size={24}/></span><p className="font-semibold">{c.title}</p><p className="mt-1 text-xs text-muted-foreground">{c.text}</p></A>)}</div></Section>}
    {sec.categories && <Section eyebrow="Thoughtfully organised" title="Shop by category" href="/healthcare" className="pt-0 sm:pt-0"><div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">{[...state.categories].filter((c) => c.visible).sort((a, b) => a.order - b.order).map((c, i) => <A key={c.id} href={/medicine/i.test(c.name) ? `/medicines/${c.slug}` : `/healthcare/${c.slug}`} className="card overflow-hidden transition hover:shadow-soft"><div className="aspect-[4/3]"><Art icon={c.icon} seed={i} image={c.image} alt={c.name}/></div><div className="p-3"><p className="text-sm font-semibold">{c.name}</p><p className="mt-0.5 line-clamp-1 text-xs text-muted-foreground">{c.description}</p></div></A>)}</div></Section>}
    {sec.featured && <Section eyebrow="Popular picks" title="Featured products" text="Illustrative products from our demonstration catalogue." href="/medicines" className="pt-0 sm:pt-0"><ProductGrid items={featured}/></Section>}
    {sec.promos && <section className="container-page grid gap-4 pb-6 md:grid-cols-3">{state.banners.filter((b) => b.visible).map((b) => <A key={b.id} href={b.href} className={cx("relative overflow-hidden rounded-2xl p-6 transition hover:shadow-lift", b.tone === "navy" ? "bg-navy text-primary-foreground" : b.tone === "teal" ? "bg-primary text-primary-foreground" : "bg-mint text-foreground")}><p className="text-xs font-bold uppercase tracking-widest opacity-75">Offer · demo</p><h3 className="mt-2 font-display text-2xl font-semibold">{b.title}</h3><p className="mt-1 text-sm opacity-80">{b.text}</p>{b.coupon && <p className="mt-4 inline-block rounded-lg border border-dashed border-current px-2 py-1 text-xs font-bold">Use {b.coupon}{b.validTo ? ` · till ${b.validTo}` : ""}</p>}<Icon name="sparkle" size={90} className="absolute -bottom-4 -right-4 opacity-15"/></A>)}</section>}
    {sec.labs && <div className="bg-card border-y border-border"><Section eyebrow="Diagnostics · demonstration" title="Popular lab tests" text="Sample listings only — no laboratory is connected." href="/lab-tests"><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{state.labTests.filter((t) => t.visible).slice(0, 4).map((t) => <LabCard key={t.id} t={t}/>)}</div></Section></div>}
    {sec.doctors && <Section eyebrow="Consultation · demo" title="Consult by specialty" text="Example specialties with demonstration profiles." href="/consult-doctor"><SpecialtyGrid/></Section>}
    {sec.trust && <section className="bg-mint"><div className="container-page grid gap-4 py-12 sm:grid-cols-2 lg:grid-cols-4">{state.trust.map((t) => <div key={t.id} className="rounded-2xl bg-card p-5"><span className="mb-3 grid h-11 w-11 place-items-center rounded-xl bg-primary text-primary-foreground"><Icon name={t.icon}/></span><p className="font-semibold">{t.title}</p><p className="mt-1 text-sm text-muted-foreground">{t.text}</p></div>)}</div></section>}
    {sec.articles && <Section eyebrow="Health library" title="Read & learn" href="/health-articles"><div className="grid gap-4 md:grid-cols-3">{state.articles.filter((a) => a.published).slice(0, 3).map((a) => <ArticleCard key={a.id} a={a}/>)}</div><p className="mt-4 text-xs text-muted-foreground">Articles are general information and not a substitute for professional medical advice.</p></Section>}
    {sec.newsletter && <Newsletter/>}
  </>;
}

export function LabCard({ t }) {
  const { state, toggleLab } = useApp();
  const inCart = state.labCart.includes(t.id);
  return <article className="card flex flex-col p-5"><div className="flex items-start justify-between gap-2"><span className="grid h-11 w-11 place-items-center rounded-xl bg-mint text-primary"><Icon name="lab"/></span><Badge tone="muted">{t.category}</Badge></div>
    <A href={`/lab-tests/${t.id}`} className="mt-3 font-semibold hover:text-primary">{t.name}</A><p className="mt-1 text-xs text-muted-foreground">Sample: {t.sample} · Home collection (demo)</p>
    <div className="mt-auto flex items-center justify-between pt-4"><div><span className="font-bold">{money(t.price)}</span> <span className="text-xs text-muted-foreground line-through">{money(t.mrp)}</span></div><button className={cx("btn btn-sm", inCart ? "btn-primary" : "btn-soft")} onClick={() => toggleLab(t.id)}>{inCart ? <><Icon name="check" size={14}/>Added</> : "Book test"}</button></div>
  </article>;
}
export function SpecialtyGrid() {
  const icons = ["steth", "sparkle", "heart", "flower", "monitor", "leaf"];
  return <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">{["General Physician", "Dermatology", "Pediatrics", "Gynecology", "Orthopedics", "Mental Wellness"].map((s, i) => <A key={s} href={`/doctors/${s.toLowerCase().replace(/\s+/g, "-")}`} className="card flex flex-col items-center p-5 text-center transition hover:border-primary"><span className={cx("mb-3 grid h-14 w-14 place-items-center rounded-full text-primary", `tone-${i}`)}><Icon name={icons[i]} size={26}/></span><span className="text-sm font-semibold">{s}</span></A>)}</div>;
}

const blank = { cat: "", brands: [], max: 2000, rxOnly: null, sort: "popular" };
export function Listing({ params, base }) {
  const { state } = useApp();
  const { path, query } = useLoc();
  const q = query.get("q") || "";
  const cat = params.category ? state.categories.find((c) => c.slug === params.category) : null;
  const [f, setF] = useState(blank);
  useEffect(() => setF(blank), [path, q]);
  let list = state.products.filter((p) => p.visible);
  if (base === "medicines") list = list.filter((p) => /medicine/i.test(p.category) || ["Vitamins & Supplements", "Diabetes Care"].includes(p.category));
  if (base === "healthcare") list = list.filter((p) => !p.prescription);
  if (cat) list = state.products.filter((p) => p.visible && p.category === cat.name);
  if (base === "search") { const t = q.toLowerCase(); list = list.filter((p) => `${p.name} ${p.brand} ${p.category}`.toLowerCase().includes(t)); }
  const shown = applyFilters(list, f);
  const title = base === "search" ? `Results for “${q}”` : cat ? cat.name : base === "medicines" ? "Medicines" : "Healthcare products";
  const tests = base === "search" ? state.labTests.filter((t) => t.visible && t.name.toLowerCase().includes(q.toLowerCase())) : [];
  if (params.category && !cat) return <NotFound/>;
  return <div className="container-page py-8">
    <Crumbs items={[[base === "search" ? "Search" : base === "medicines" ? "Medicines" : "Healthcare", cat ? `/${base}` : null], ...(cat ? [[cat.name]] : [])]}/>
    <div className="mb-5 flex flex-wrap items-end justify-between gap-3"><div><h1 className="font-display text-3xl font-semibold">{title}</h1><p className="text-sm text-muted-foreground">{shown.length} demonstration products{cat ? ` · ${cat.description}` : ""}</p></div><SortSelect f={f} setF={setF}/></div>
    {base === "medicines" && !cat && <div className="mb-5"><DemoNote>Prescription items require a demo prescription upload before checkout. Nothing is dispensed or delivered.</DemoNote></div>}
    {!cat && base !== "search" && <div className="mb-5 flex gap-2 overflow-x-auto pb-1">{state.categories.filter((c) => c.visible && (base === "healthcare" ? !/prescription/i.test(c.name) : true)).map((c) => <A key={c.id} href={`/${base}/${c.slug}`} className="chip shrink-0">{c.name}</A>)}</div>}
    <div className="grid gap-6 lg:grid-cols-[240px_1fr]"><ProductFilters list={list} f={f} setF={setF}/>
      <div>{tests.length > 0 && <div className="mb-6"><h2 className="mb-3 font-semibold">Lab tests</h2><div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">{tests.map((t) => <LabCard key={t.id} t={t}/>)}</div></div>}
        {shown.length ? <ProductGrid items={shown}/> : <Empty icon="search" title="No products match" text="Try a different search or clear the filters." action="Browse all medicines"/>}</div>
    </div>
  </div>;
}

export function Product({ params }) {
  const { state, addToCart, toggleWish, viewed } = useApp();
  const go = useGo();
  const p = state.products.find((x) => x.id === params.id && x.visible);
  const [qty, setQty] = useState(1);
  const [pack, setPack] = useState(p?.pack);
  const [img, setImg] = useState(0);
  useEffect(() => { if (p) { viewed(p.id); setPack(p.pack); setQty(1); } }, [p?.id]); // eslint-disable-line
  if (!p) return <NotFound/>;
  const off = p.mrp > p.price ? Math.round(((p.mrp - p.price) / p.mrp) * 100) : 0;
  const related = state.products.filter((x) => x.visible && x.category === p.category && x.id !== p.id).slice(0, 4);
  const recent = state.recent.filter((id) => id !== p.id).map((id) => state.products.find((x) => x.id === id)).filter(Boolean).slice(0, 4);
  const icon = catIcon(state.categories, p.category);
  const mult = pack === "Pack of 2" ? 2 : pack === "Pack of 3" ? 3 : 1;
  const add = () => addToCart({ ...p }, qty * mult, p.pack);
  return <div className="container-page py-8">
    <Crumbs items={[[p.prescription ? "Medicines" : "Healthcare", p.prescription ? "/medicines" : "/healthcare"], [p.category, `/${p.prescription ? "medicines" : "healthcare"}/${state.categories.find((c) => c.name === p.category)?.slug || ""}`], [p.name]]}/>
    <div className="grid gap-8 lg:grid-cols-2">
      <div><div className="card aspect-square overflow-hidden"><Art icon={icon} seed={parseInt(p.id.slice(-2)) + img} image={img === 0 ? p.image : ""} alt={p.name} label={img ? ["", "BACK OF PACK", "LABEL VIEW"][img] : ""}/></div>
        <div className="mt-3 flex gap-2">{[0, 1, 2].map((i) => <button key={i} onClick={() => setImg(i)} aria-label={`View image ${i + 1}`} className={cx("h-16 w-16 overflow-hidden rounded-xl border-2", img === i ? "border-primary" : "border-transparent")}><Art icon={icon} seed={parseInt(p.id.slice(-2)) + i} image={i === 0 ? p.image : ""} alt=""/></button>)}</div></div>
      <div><p className="text-sm font-medium text-primary">{p.brand}</p><h1 className="mt-1 font-display text-3xl font-semibold">{p.name}</h1>
        <div className="mt-2 flex flex-wrap gap-2"><Badge tone="muted">{p.category}</Badge>{p.prescription && <Badge tone="rx">Prescription required</Badge>}<Badge tone={p.stock > 10 ? "ok" : "warn"}>{p.stock > 0 ? `${p.stock} in stock (demo)` : "Out of stock"}</Badge></div>
        <div className="mt-5 flex items-baseline gap-3"><span className="text-3xl font-bold">{money(p.price)}</span>{off > 0 && <><span className="text-muted-foreground line-through">MRP {money(p.mrp)}</span><Badge tone="ok">{off}% off</Badge></>}</div><p className="text-xs text-muted-foreground">Demonstration price, inclusive of all taxes</p>
        <div className="mt-5"><p className="mb-2 text-sm font-semibold">Pack size</p><div className="flex flex-wrap gap-2">{p.packs.map((x) => <button key={x} onClick={() => setPack(x)} className={cx("chip", pack === x && "chip-on")}>{x}</button>)}</div></div>
        <div className="mt-5 flex flex-wrap items-center gap-3"><Qty value={qty} set={setQty}/>
          {p.prescription && !state.prescription ? <button className="btn btn-primary flex-1" onClick={() => go("/prescription-upload")}><Icon name="upload" size={17}/>Upload prescription to add</button> : <button className="btn btn-primary flex-1" disabled={p.stock <= 0} onClick={add}><Icon name="cart" size={17}/>Add to cart</button>}
          <button className="btn btn-outline" onClick={() => toggleWish(p.id)} aria-pressed={state.wishlist.includes(p.id)}><Icon name="heart" size={17} className={state.wishlist.includes(p.id) ? "fill-current text-destructive" : ""}/>Wishlist</button></div>
        {p.prescription && <div className="mt-4"><DemoNote>This item is marked prescription-required. A demo upload unlocks the cart; it is not reviewed by a pharmacist and nothing is dispensed.</DemoNote></div>}
        <div className="mt-6 card p-4"><h2 className="font-semibold">About this product</h2><p className="mt-2 text-sm text-muted-foreground">{p.description}</p><dl className="mt-3 grid grid-cols-2 gap-2 text-sm"><dt className="text-muted-foreground">Product ID</dt><dd>{p.id}</dd><dt className="text-muted-foreground">Pack</dt><dd>{p.pack}</dd><dt className="text-muted-foreground">Brand</dt><dd>{p.brand}</dd></dl></div>
      </div>
    </div>
    {related.length > 0 && <div className="mt-12"><h2 className="mb-4 font-display text-2xl font-semibold">Related products</h2><ProductGrid items={related}/></div>}
    {recent.length > 0 && <div className="mt-12"><h2 className="mb-4 font-display text-2xl font-semibold">Recently viewed</h2><ProductGrid items={recent}/></div>}
  </div>;
}
export const Qty = ({ value, set, small }) => <div className="flex items-center rounded-xl border border-border bg-card"><button className={cx("grid place-items-center text-primary", small ? "h-8 w-8" : "h-11 w-10")} onClick={() => set(Math.max(small ? 0 : 1, value - 1))} aria-label="Decrease quantity"><Icon name="minus" size={16}/></button><span className="w-8 text-center text-sm font-semibold" aria-live="polite">{value}</span><button className={cx("grid place-items-center text-primary", small ? "h-8 w-8" : "h-11 w-10")} onClick={() => set(value + 1)} aria-label="Increase quantity"><Icon name="plus" size={16}/></button></div>;

export function PrescriptionUpload() {
  const { state, update, toast } = useApp();
  const [file, setFile] = useState(null); const [url, setUrl] = useState(""); const [err, setErr] = useState("");
  useEffect(() => () => url && URL.revokeObjectURL(url), [url]);
  const pick = (e) => { const f = e.target.files?.[0]; setErr(""); if (!f) return; if (!/^image\/|pdf$/.test(f.type)) return setErr("Please choose an image or PDF file."); if (f.size > 5e6) return setErr("Please choose a file under 5 MB."); setFile(f); setUrl(URL.createObjectURL(f)); };
  return <div className="container-page max-w-3xl py-8"><Crumbs items={[["Medicines", "/medicines"], ["Upload prescription"]]}/><h1 className="font-display text-3xl font-semibold">Upload a prescription</h1><p className="mt-1 text-muted-foreground">A demonstration of the prescription step for Rx-marked products.</p>
    <div className="mt-5"><DemoNote>Demonstration only. Your file is previewed in this browser and is <strong>never uploaded, stored or reviewed</strong>. No pharmacist verification takes place. Please don't use a real prescription.</DemoNote></div>
    <div className="card mt-5 p-6"><label className="flex cursor-pointer flex-col items-center rounded-2xl border-2 border-dashed border-border p-8 text-center hover:border-primary"><Icon name="upload" size={32} className="text-primary"/><span className="mt-2 font-semibold">Choose an image or PDF</span><span className="text-xs text-muted-foreground">Max 5 MB · preview only</span><input type="file" accept="image/*,application/pdf" className="sr-only" onChange={pick}/></label>
      {err && <p className="mt-3 text-sm text-destructive" role="alert">{err}</p>}
      {file && <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center">{file.type.startsWith("image/") ? <img src={url} alt="Prescription preview" className="h-40 w-40 rounded-xl border border-border object-cover"/> : <div className="grid h-40 w-40 place-items-center rounded-xl border border-border bg-surface text-sm">PDF selected</div>}<div className="flex-1"><p className="font-semibold">{file.name}</p><p className="text-xs text-muted-foreground">{Math.round(file.size / 1024)} KB · not uploaded</p><div className="mt-3 flex gap-2"><button className="btn btn-primary" onClick={() => { update({ prescription: { name: file.name } }); toast("Demo prescription attached for this session"); }}>Attach for this session</button><button className="btn btn-outline" onClick={() => { setFile(null); setUrl(""); }}>Remove</button></div></div></div>}
      {state.prescription && <p className="mt-4 flex items-center gap-2 text-sm text-success"><Icon name="check" size={16}/>Demo prescription “{state.prescription.name}” attached (not verified). <A href="/medicines/prescription-medicines" className="underline">Continue shopping</A></p>}
    </div></div>;
}

export function Cart() {
  const { state, setQty } = useApp();
  const go = useGo();
  const lines = state.cart.map((c) => ({ ...c, p: state.products.find((p) => p.id === c.id) })).filter((l) => l.p);
  const sub = priceOf(state.cart, state.products);
  const needsRx = lines.some((l) => l.p.prescription) && !state.prescription;
  if (!lines.length) return <div className="container-page max-w-3xl py-12"><Empty icon="cart" title="Your cart is empty" text="Add demonstration products to explore the checkout flow." action="Explore medicines"/></div>;
  return <div className="container-page py-8"><h1 className="mb-5 font-display text-3xl font-semibold">Your cart</h1><div className="grid gap-6 lg:grid-cols-[1fr_360px]">
    <ul className="card divide-y divide-border">{lines.map(({ p, quantity, pack }) => <li key={p.id} className="flex gap-4 p-4"><A href={`/product/${p.id}`} className="h-20 w-20 shrink-0 overflow-hidden rounded-xl"><Art icon={catIcon(state.categories, p.category)} seed={parseInt(p.id.slice(-2))} image={p.image} alt={p.name}/></A><div className="min-w-0 flex-1"><A href={`/product/${p.id}`} className="font-semibold hover:text-primary">{p.name}</A><p className="text-xs text-muted-foreground">{pack} · {p.brand}</p>{p.prescription && <Badge tone="rx">Rx</Badge>}<div className="mt-2 flex flex-wrap items-center justify-between gap-2"><Qty small value={quantity} set={(q) => setQty(p.id, q)}/><span className="font-bold">{money(p.price * quantity)}</span></div><button className="mt-1 text-xs text-destructive hover:underline" onClick={() => setQty(p.id, 0)}>Remove</button></div></li>)}</ul>
    <Summary sub={sub}>{needsRx && <div className="mb-3"><DemoNote>Your cart has prescription items. <A href="/prescription-upload" className="font-semibold underline">Attach a demo prescription</A> to continue.</DemoNote></div>}<button className="btn btn-primary w-full" disabled={needsRx} onClick={() => go("/checkout")}>Proceed to checkout</button></Summary>
  </div></div>;
}
function Summary({ sub, discount = 0, children }) {
  const delivery = sub - discount >= 499 || sub === 0 ? 0 : 49;
  return <aside className="card h-fit p-5"><h2 className="font-semibold">Order summary</h2><dl className="mt-3 space-y-2 text-sm"><div className="flex justify-between"><dt className="text-muted-foreground">Item total</dt><dd>{money(sub)}</dd></div>{discount > 0 && <div className="flex justify-between text-success"><dt>Coupon discount</dt><dd>−{money(discount)}</dd></div>}<div className="flex justify-between"><dt className="text-muted-foreground">Delivery (demo)</dt><dd>{delivery ? money(delivery) : "Free"}</dd></div><div className="flex justify-between border-t border-border pt-2 text-base font-bold"><dt>To pay</dt><dd>{money(sub - discount + delivery)}</dd></div></dl><div className="mt-4">{children}</div><p className="mt-3 text-xs text-muted-foreground">No payment is collected. This is a simulated checkout.</p></aside>;
}

export function Checkout() {
  const { state, update, log } = useApp();
  const go = useGo();
  const sub = priceOf(state.cart, state.products);
  const [code, setCode] = useState(""); const [coupon, setCoupon] = useState(null); const [cErr, setCErr] = useState("");
  const saved = state.addresses[0] || {};
  const form = useForm({ name: state.user?.name || saved.name || "", phone: saved.phone || "", line: saved.line || "", city: saved.city || "", pin: saved.pin || "", pay: "cod" }, (v) => ({ ...req(v, ["name", "line", "city"]), ...(phoneOk(v.phone) ? {} : { phone: "Enter a valid 10-digit mobile number." }), ...(/^\d{6}$/.test(v.pin) ? {} : { pin: "Enter a 6-digit PIN code." }) }));
  if (!state.cart.length) return <div className="container-page max-w-3xl py-12"><Empty icon="cart" title="Nothing to check out" text="Your cart is empty." action="Shop products"/></div>;
  const discount = coupon ? applyCoupon(coupon.code, sub, state.offers).discount || 0 : 0;
  const place = (v) => {
    const delivery = sub - discount >= 499 ? 0 : 49;
    const order = { id: `ORD-${Date.now().toString().slice(-6)}`, date: new Date().toISOString().slice(0, 10), customer: v.name, status: "Placed (demo)", address: `${v.line}, ${v.city} ${v.pin}`, coupon: coupon?.code || "", items: state.cart.map((c) => { const p = state.products.find((x) => x.id === c.id); return { id: c.id, name: p.name, price: p.price, quantity: c.quantity }; }), total: sub - discount + delivery };
    update((s) => ({ orders: [order, ...s.orders], cart: [], lastOrder: order.id, prescription: null }));
    log(`Demo order ${order.id} created`); go("/order-confirmation");
  };
  const F = ({ k, label, ...r }) => <Field label={label} error={form.e[k]}><input className="input" value={form.v[k]} onChange={form.set(k)} {...r}/></Field>;
  return <div className="container-page py-8"><Crumbs items={[["Cart", "/cart"], ["Checkout"]]}/><h1 className="mb-5 font-display text-3xl font-semibold">Checkout</h1>
    <form onSubmit={form.submit(place)} className="grid gap-6 lg:grid-cols-[1fr_360px]" noValidate>
      <div className="space-y-5"><div className="card p-5"><h2 className="mb-4 font-semibold">Delivery address</h2><div className="grid gap-4 sm:grid-cols-2">{F({ k: "name", label: "Full name" })}{F({ k: "phone", label: "Mobile number", inputMode: "numeric" })}<div className="sm:col-span-2">{F({ k: "line", label: "House, street, area" })}</div>{F({ k: "city", label: "City" })}{F({ k: "pin", label: "PIN code", inputMode: "numeric", maxLength: 6 })}</div></div>
        <div className="card p-5"><h2 className="mb-3 font-semibold">Payment</h2>{[["cod", "Pay on delivery (simulated)"], ["upi", "UPI (simulated — nothing is charged)"]].map(([k, l]) => <label key={k} className="flex items-center gap-2 py-1.5 text-sm"><input type="radio" name="pay" checked={form.v.pay === k} onChange={() => form.setV({ ...form.v, pay: k })} className="accent-[var(--primary)]"/>{l}</label>)}<div className="mt-3"><DemoNote>No payment gateway is connected. Placing the order only creates a demo record in this browser.</DemoNote></div></div></div>
      <Summary sub={sub} discount={discount}><div className="mb-3"><label className="text-sm font-medium" htmlFor="cc">Coupon code</label><div className="mt-1 flex gap-2"><input id="cc" className="input" value={code} onChange={(e) => setCode(e.target.value)} placeholder="e.g. WELCOME10"/><button type="button" className="btn btn-outline" onClick={() => { const r = applyCoupon(code, sub, state.offers); if (r.error) { setCErr(r.error); setCoupon(null); } else { setCErr(""); setCoupon(r.offer); } }}>Apply</button></div>{cErr && <p className="mt-1 text-xs text-destructive">{cErr}</p>}{coupon && <p className="mt-1 text-xs text-success">{coupon.code} applied — you save {money(discount)}. <button type="button" className="underline" onClick={() => setCoupon(null)}>Remove</button></p>}</div><button className="btn btn-primary w-full">Place demo order</button></Summary>
    </form></div>;
}

export function OrderConfirmation() {
  const { state } = useApp();
  const o = state.orders.find((x) => x.id === state.lastOrder);
  if (!o) return <div className="container-page max-w-3xl py-12"><Empty title="No recent order" text="Place a demo order to see a confirmation." action="Start shopping"/></div>;
  return <div className="container-page max-w-2xl py-12 text-center"><span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-success/15 text-success"><Icon name="check" size={32}/></span><h1 className="mt-4 font-display text-3xl font-semibold">Demo order recorded</h1><p className="mt-2 text-muted-foreground">Order <strong>{o.id}</strong> for {money(o.total)} was saved in this browser only. No payment was taken and nothing will be delivered.</p><div className="mt-6 flex justify-center gap-3"><A href={`/orders/${o.id}`} className="btn btn-primary">View order</A><A href="/" className="btn btn-outline">Back to home</A></div></div>;
}

export function Orders() {
  const { state } = useApp();
  return <div className="container-page max-w-4xl py-8"><h1 className="mb-1 font-display text-3xl font-semibold">My orders</h1><p className="mb-5 text-sm text-muted-foreground">Sample orders and demo orders you place are shown here.</p>
    {state.orders.length ? <ul className="space-y-3">{state.orders.map((o) => <li key={o.id}><A href={`/orders/${o.id}`} className="card flex flex-wrap items-center justify-between gap-3 p-4 hover:border-primary"><div><p className="font-semibold">{o.id}</p><p className="text-xs text-muted-foreground">{o.date} · {o.items.length} items</p></div><StatusBadge s={o.status}/><span className="font-bold">{money(o.total)}</span></A></li>)}</ul> : <Empty title="No orders yet" text="Your demo orders will appear here." action="Start shopping"/>}
    <BookingHistory/></div>;
}
function BookingHistory() {
  const { state } = useApp();
  return <div className="mt-10 grid gap-6 md:grid-cols-2"><div><h2 className="mb-3 font-semibold">Lab bookings (demo)</h2>{state.bookings.map((b) => <div key={b.id} className="card mb-2 p-3 text-sm"><div className="flex justify-between"><strong>{b.id}</strong><StatusBadge s={b.status}/></div><p className="text-muted-foreground">{b.tests.join(", ")} · {b.date} {b.time}</p></div>)}</div><div><h2 className="mb-3 font-semibold">Consultations (demo)</h2>{state.appointments.map((b) => <div key={b.id} className="card mb-2 p-3 text-sm"><div className="flex justify-between"><strong>{b.id}</strong><StatusBadge s={b.status}/></div><p className="text-muted-foreground">{b.doctor} · {b.specialty} · {b.date} {b.time}</p></div>)}</div></div>;
}
export const StatusBadge = ({ s }) => <Badge tone={/deliver|complete/i.test(s) ? "ok" : /cancel/i.test(s) ? "rx" : /ship|schedul/i.test(s) ? "mint" : "warn"}>{s}</Badge>;

export function OrderDetail({ params }) {
  const { state, addToCart } = useApp();
  const o = state.orders.find((x) => x.id === params.id);
  if (!o) return <NotFound/>;
  const reorder = () => o.items.forEach((i) => { const p = state.products.find((x) => x.id === i.id); if (p && p.visible) addToCart(p, i.quantity); });
  const steps = ["Placed", "Processing", "Shipped", "Delivered"];
  const at = Math.max(0, steps.findIndex((s) => o.status.startsWith(s)));
  return <div className="container-page max-w-3xl py-8"><Crumbs items={[["Orders", "/orders"], [o.id]]}/><div className="flex flex-wrap items-center justify-between gap-3"><h1 className="font-display text-3xl font-semibold">{o.id}</h1><StatusBadge s={o.status}/></div><p className="text-sm text-muted-foreground">{o.date} · Demo record — not a real order</p>
    <ol className="my-6 grid grid-cols-4 gap-2">{steps.map((s, i) => <li key={s} className="text-center text-xs"><div className={cx("mx-auto mb-1 h-2 rounded-full", i <= at ? "bg-primary" : "bg-border")}/>{s}</li>)}</ol>
    <ul className="card divide-y divide-border">{o.items.map((i) => <li key={i.id} className="flex justify-between p-4 text-sm"><span>{i.name} × {i.quantity}</span><span className="font-semibold">{money(i.price * i.quantity)}</span></li>)}<li className="flex justify-between p-4 font-bold"><span>Total</span><span>{money(o.total)}</span></li></ul>
    <p className="mt-4 text-sm"><span className="text-muted-foreground">Delivery address:</span> {o.address}</p>
    <button className="btn btn-primary mt-5" onClick={reorder}><Icon name="cart" size={17}/>Reorder items</button></div>;
}

export function NotFound() {
  return <div className="container-page max-w-xl py-20 text-center"><p className="font-display text-7xl font-semibold text-primary">404</p><h1 className="mt-3 text-xl font-semibold">We couldn't find that page</h1><p className="mt-2 text-muted-foreground">The link may be broken or the item may be hidden.</p><A href="/" className="btn btn-primary mt-6">Go home</A></div>;
}
