import { useState } from "react";
import { useApp } from "../context/AppContext";
import { A, Art, Badge, Crumbs, DemoNote, Empty, Field, Icon, cx, emailOk, money, phoneOk, req, useForm, useGo, useLoc } from "../components/ui";
import { LabCard, NotFound, SpecialtyGrid } from "./shop";
import { specialties, slugify } from "../data/demo";

export function Newsletter() {
  const [email, setEmail] = useState(""); const [err, setErr] = useState(""); const [done, setDone] = useState(false);
  return <section className="container-page py-12"><div className="grid items-center gap-6 rounded-3xl bg-primary p-8 text-primary-foreground md:grid-cols-2 md:p-10"><div><h2 className="font-display text-3xl font-semibold">Thoughtful health updates, now and then.</h2><p className="mt-2 text-primary-foreground/80">Demo sign-up — nothing is sent or stored.</p></div>
    {done ? <p className="flex items-center gap-2 rounded-xl bg-card/15 p-4 font-medium"><Icon name="check"/>Thanks! This was a demonstration sign-up.</p> :
    <form noValidate onSubmit={(e) => { e.preventDefault(); if (!emailOk(email)) return setErr("Please enter a valid email address."); setDone(true); }}><div className="flex gap-2"><input aria-label="Email address" value={email} onChange={(e) => { setEmail(e.target.value); setErr(""); }} placeholder="you@example.com" className="input flex-1"/><button className="btn bg-navy text-primary-foreground">Subscribe</button></div>{err && <p className="mt-2 text-sm" role="alert">{err}</p>}</form>}
  </div></section>;
}

/* ---------------- Lab tests ---------------- */
export function LabTests() {
  const { state } = useApp();
  const [q, setQ] = useState(""); const [cat, setCat] = useState("");
  const list = state.labTests.filter((t) => t.visible && (!cat || t.category === cat) && t.name.toLowerCase().includes(q.toLowerCase()));
  return <div className="container-page py-8"><Crumbs items={[["Lab tests"]]}/><h1 className="font-display text-3xl font-semibold">Lab tests</h1><p className="mt-1 text-muted-foreground">Browse sample diagnostic listings and try the demo booking flow.</p>
    <div className="my-5"><DemoNote>Laboratory integrations, sample collection and results are <strong>not connected</strong>. Bookings are saved in this browser only.</DemoNote></div>
    <div className="mb-5 flex flex-col gap-3 sm:flex-row"><input className="input sm:max-w-xs" placeholder="Search tests" value={q} onChange={(e) => setQ(e.target.value)} aria-label="Search tests"/><div className="flex gap-2 overflow-x-auto">{["", ...new Set(state.labTests.map((t) => t.category))].map((c) => <button key={c || "all"} onClick={() => setCat(c)} className={cx("chip shrink-0", cat === c && "chip-on")}>{c || "All"}</button>)}</div></div>
    {list.length ? <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{list.map((t) => <LabCard key={t.id} t={t}/>)}</div> : <Empty icon="lab" title="No tests found" text="Try a different search." />}
    <LabBar/></div>;
}
function LabBar() {
  const { state } = useApp();
  if (!state.labCart.length) return null;
  const total = state.labCart.reduce((s, id) => s + (state.labTests.find((t) => t.id === id)?.price || 0), 0);
  return <div className="sticky bottom-4 z-30 mt-6 flex items-center justify-between gap-3 rounded-2xl bg-navy p-4 text-primary-foreground shadow-lift"><span className="text-sm">{state.labCart.length} test(s) · <strong>{money(total)}</strong></span><A href="/lab-tests/booking" className="btn btn-primary">Continue booking</A></div>;
}
export function LabTest({ params }) {
  const { state, toggleLab } = useApp();
  const t = state.labTests.find((x) => x.id === params.id && x.visible);
  if (!t) return <NotFound/>;
  const inCart = state.labCart.includes(t.id);
  return <div className="container-page max-w-4xl py-8"><Crumbs items={[["Lab tests", "/lab-tests"], [t.name]]}/><div className="card p-6"><Badge tone="muted">{t.category}</Badge><h1 className="mt-2 font-display text-3xl font-semibold">{t.name}</h1><p className="mt-2 text-muted-foreground">{t.description}</p>
    <dl className="mt-5 grid gap-4 sm:grid-cols-3">{[["Sample type", t.sample, "drop"], ["Preparation", t.prep, "clock"], ["Collection", "Home collection (demo)", "pin"]].map(([k, v, i]) => <div key={k} className="rounded-xl bg-surface p-4"><Icon name={i} className="text-primary"/><dt className="mt-2 text-xs font-semibold uppercase text-muted-foreground">{k}</dt><dd className="text-sm">{v}</dd></div>)}</dl>
    <div className="mt-6 flex flex-wrap items-center gap-4"><span className="text-2xl font-bold">{money(t.price)}</span><span className="text-muted-foreground line-through">{money(t.mrp)}</span><button className={cx("btn", inCart ? "btn-outline" : "btn-primary")} onClick={() => toggleLab(t.id)}>{inCart ? "Remove from booking" : "Add to booking"}</button>{inCart && <A href="/lab-tests/booking" className="btn btn-primary">Continue booking</A>}</div>
  </div><div className="mt-4"><DemoNote>Demonstration listing. Prices are illustrative; no accredited laboratory partner is represented.</DemoNote></div></div>;
}
const days = () => Array.from({ length: 6 }, (_, i) => { const d = new Date(); d.setDate(d.getDate() + i + 1); return d.toISOString().slice(0, 10); });
export function LabBooking() {
  const { state, update, log, toggleLab } = useApp();
  const go = useGo();
  const tests = state.labCart.map((id) => state.labTests.find((t) => t.id === id)).filter(Boolean);
  const form = useForm({ date: "", time: "", patient: "", age: "", phone: "", address: "" }, (v) => ({ ...req(v, ["date", "time", "patient", "address"]), ...(+v.age > 0 && +v.age < 120 ? {} : { age: "Enter a valid age." }), ...(phoneOk(v.phone) ? {} : { phone: "Enter a valid 10-digit mobile number." }) }));
  if (!tests.length) return <div className="container-page max-w-3xl py-12"><Empty icon="lab" title="No tests selected" text="Choose one or more tests to start a demo booking." action="Browse lab tests" href="/lab-tests"/></div>;
  const total = tests.reduce((s, t) => s + t.price, 0);
  const book = (v) => { const b = { id: `LAB-${Date.now().toString().slice(-5)}`, date: v.date, time: v.time, patient: v.patient, tests: tests.map((t) => t.name), total, status: "Scheduled" }; update((s) => ({ bookings: [b, ...s.bookings], labCart: [], lastBooking: b.id })); log(`Demo lab booking ${b.id} created`); go("/lab-tests/booking-confirmation"); };
  return <div className="container-page py-8"><Crumbs items={[["Lab tests", "/lab-tests"], ["Booking"]]}/><h1 className="mb-5 font-display text-3xl font-semibold">Book lab tests (demo)</h1>
    <form noValidate onSubmit={form.submit(book)} className="grid gap-6 lg:grid-cols-[1fr_340px]"><div className="space-y-5">
      <div className="card p-5"><h2 className="mb-3 font-semibold">Choose a demo slot</h2><div className="flex flex-wrap gap-2">{days().map((d) => <button type="button" key={d} onClick={() => form.setV({ ...form.v, date: d })} className={cx("chip", form.v.date === d && "chip-on")}>{new Date(d).toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short" })}</button>)}</div>{form.e.date && <p className="mt-1 text-xs text-destructive">Choose a date.</p>}
        <div className="mt-3 flex flex-wrap gap-2">{["7:00 AM", "8:00 AM", "9:30 AM", "11:00 AM"].map((t) => <button type="button" key={t} onClick={() => form.setV({ ...form.v, time: t })} className={cx("chip", form.v.time === t && "chip-on")}>{t}</button>)}</div>{form.e.time && <p className="mt-1 text-xs text-destructive">Choose a time.</p>}</div>
      <div className="card grid gap-4 p-5 sm:grid-cols-2"><h2 className="font-semibold sm:col-span-2">Patient details</h2><Field label="Patient name" error={form.e.patient}><input className="input" value={form.v.patient} onChange={form.set("patient")}/></Field><Field label="Age" error={form.e.age}><input className="input" type="number" value={form.v.age} onChange={form.set("age")}/></Field><Field label="Mobile number" error={form.e.phone}><input className="input" value={form.v.phone} onChange={form.set("phone")}/></Field><div className="sm:col-span-2"><Field label="Collection address" error={form.e.address}><textarea className="input" rows={2} value={form.v.address} onChange={form.set("address")}/></Field></div><p className="text-xs text-muted-foreground sm:col-span-2">Please use sample details — no medical information is needed or stored on a server.</p></div>
    </div>
    <aside className="card h-fit p-5"><h2 className="font-semibold">Booking summary</h2><ul className="mt-3 space-y-2 text-sm">{tests.map((t) => <li key={t.id} className="flex justify-between gap-2"><span>{t.name}</span><span className="flex items-center gap-2">{money(t.price)}<button type="button" onClick={() => toggleLab(t.id)} aria-label={`Remove ${t.name}`} className="text-muted-foreground hover:text-destructive"><Icon name="close" size={14}/></button></span></li>)}</ul><div className="mt-3 flex justify-between border-t border-border pt-3 font-bold"><span>Total</span><span>{money(total)}</span></div><button className="btn btn-primary mt-4 w-full">Confirm demo booking</button><p className="mt-2 text-xs text-muted-foreground">No payment, lab, or sample collection is connected.</p></aside>
    </form></div>;
}
export function LabConfirm() {
  const { state } = useApp();
  const b = state.bookings.find((x) => x.id === state.lastBooking);
  return <Confirmation title="Demo lab booking recorded" ok={!!b} text={b && <>Booking <strong>{b.id}</strong> for {b.patient} on {b.date} at {b.time}. This is a simulation — no sample will be collected and no results will be issued.</>}/>;
}
function Confirmation({ title, text, ok }) {
  if (!ok) return <div className="container-page max-w-3xl py-12"><Empty title="Nothing to confirm" text="Start a demo booking first." action="Go home" href="/"/></div>;
  return <div className="container-page max-w-2xl py-12 text-center"><span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-success/15 text-success"><Icon name="check" size={32}/></span><h1 className="mt-4 font-display text-3xl font-semibold">{title}</h1><p className="mt-2 text-muted-foreground">{text}</p><div className="mt-6 flex justify-center gap-3"><A href="/orders" className="btn btn-primary">View my bookings</A><A href="/" className="btn btn-outline">Back to home</A></div></div>;
}

/* ---------------- Doctors ---------------- */
function DoctorCard({ d }) {
  return <article className="card flex gap-4 p-4"><div className="h-20 w-20 shrink-0 overflow-hidden rounded-2xl"><Art icon="user" seed={parseInt(d.id.split("-")[1])} image={d.image} alt={d.name}/></div><div className="min-w-0 flex-1"><div className="flex flex-wrap items-center gap-2"><A href={`/doctor/${d.id}`} className="font-semibold hover:text-primary">{d.name}</A><Badge tone="warn">Demo profile</Badge></div><p className="text-sm text-primary">{d.specialty}</p><p className="text-xs text-muted-foreground">{d.languages} · Fee {money(d.fee)} (demo)</p><A href={`/doctor/${d.id}`} className="btn btn-soft btn-sm mt-2">View slots</A></div></article>;
}
export function Consult() {
  const { state } = useApp();
  return <div className="container-page py-8"><Crumbs items={[["Doctor consultation"]]}/><h1 className="font-display text-3xl font-semibold">Doctor consultation</h1><p className="mt-1 text-muted-foreground">Explore specialties and try a demo appointment flow.</p><div className="my-5"><DemoNote>All doctors and slots are <strong>demonstration examples</strong>. No real consultation, video call or medical advice is provided.</DemoNote></div><SpecialtyGrid/><h2 className="mb-3 mt-10 font-display text-2xl font-semibold">Demo profiles</h2><div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">{state.doctors.filter((d) => d.visible).map((d) => <DoctorCard key={d.id} d={d}/>)}</div></div>;
}
export function Specialty({ params }) {
  const { state } = useApp();
  const name = specialties.find((s) => slugify(s) === params.specialty);
  if (!name) return <NotFound/>;
  const list = state.doctors.filter((d) => d.visible && d.specialty === name);
  return <div className="container-page py-8"><Crumbs items={[["Doctor consultation", "/consult-doctor"], [name]]}/><h1 className="mb-5 font-display text-3xl font-semibold">{name}</h1>{list.length ? <div className="grid gap-4 md:grid-cols-2">{list.map((d) => <DoctorCard key={d.id} d={d}/>)}</div> : <Empty icon="steth" title="No demo profiles here yet" text="Try another specialty." action="All specialties" href="/consult-doctor"/>}</div>;
}
export function Doctor({ params }) {
  const { state, update } = useApp();
  const go = useGo();
  const d = state.doctors.find((x) => x.id === params.id && x.visible);
  const [slot, setSlot] = useState("");
  if (!d) return <NotFound/>;
  return <div className="container-page max-w-4xl py-8"><Crumbs items={[["Doctor consultation", "/consult-doctor"], [d.specialty, `/doctors/${slugify(d.specialty)}`], [d.name]]}/><div className="card grid gap-6 p-6 md:grid-cols-[180px_1fr]"><div className="aspect-square overflow-hidden rounded-2xl"><Art icon="user" seed={parseInt(d.id.split("-")[1])} image={d.image} alt={d.name}/></div><div><Badge tone="warn">Demonstration profile — not a verified professional</Badge><h1 className="mt-2 font-display text-3xl font-semibold">{d.name}</h1><p className="text-primary">{d.specialty}</p><p className="mt-3 text-sm text-muted-foreground">{d.description}</p><p className="mt-2 text-sm">Languages: {d.languages} · Fee: {money(d.fee)} (demo)</p>
    <h2 className="mb-2 mt-5 font-semibold">Demo availability (tomorrow)</h2><div className="flex flex-wrap gap-2">{d.slots.map((s) => <button key={s} onClick={() => setSlot(s)} className={cx("chip", slot === s && "chip-on")}>{s}</button>)}</div>
    <button className="btn btn-primary mt-5" disabled={!slot} onClick={() => { update({ pendingAppt: { doctor: d.id, time: slot } }); go("/consultation/booking"); }}>Book demo appointment</button></div></div></div>;
}
export function ConsultBooking() {
  const { state, update, log } = useApp();
  const go = useGo();
  const pend = state.pendingAppt;
  const d = state.doctors.find((x) => x.id === pend?.doctor);
  const form = useForm({ date: days()[0], type: "Video", patient: state.user?.name || "", phone: "", reason: "" }, (v) => ({ ...req(v, ["patient", "date"]), ...(phoneOk(v.phone) ? {} : { phone: "Enter a valid 10-digit mobile number." }) }));
  if (!d) return <div className="container-page max-w-3xl py-12"><Empty icon="steth" title="Choose a demo doctor first" text="Pick a profile and slot to start." action="Browse doctors" href="/consult-doctor"/></div>;
  const book = (v) => { const a = { id: `APT-${Date.now().toString().slice(-5)}`, date: v.date, time: pend.time, patient: v.patient, doctor: d.name, specialty: d.specialty, type: v.type, status: "Scheduled" }; update((s) => ({ appointments: [a, ...s.appointments], lastAppointment: a.id, pendingAppt: null })); log(`Demo appointment ${a.id} created`); go("/consultation/confirmation"); };
  return <div className="container-page max-w-3xl py-8"><Crumbs items={[["Doctor consultation", "/consult-doctor"], ["Booking"]]}/><h1 className="mb-5 font-display text-3xl font-semibold">Appointment details (demo)</h1>
    <form noValidate onSubmit={form.submit(book)} className="card space-y-4 p-6"><p className="rounded-xl bg-mint p-3 text-sm">{d.name} · {d.specialty} · {pend.time} · Fee {money(d.fee)} (demo)</p>
      <div className="grid gap-4 sm:grid-cols-2"><Field label="Date" error={form.e.date}><select className="input" value={form.v.date} onChange={form.set("date")}>{days().map((x) => <option key={x}>{x}</option>)}</select></Field><Field label="Consultation type"><select className="input" value={form.v.type} onChange={form.set("type")}><option>Video</option><option>Phone</option><option>In-clinic</option></select></Field><Field label="Patient name" error={form.e.patient}><input className="input" value={form.v.patient} onChange={form.set("patient")}/></Field><Field label="Mobile number" error={form.e.phone}><input className="input" value={form.v.phone} onChange={form.set("phone")}/></Field></div>
      <Field label="Reason for visit (optional)" hint="Please don't enter real medical details — this is a demo."><input className="input" value={form.v.reason} onChange={form.set("reason")}/></Field>
      <button className="btn btn-primary w-full">Confirm demo appointment</button></form></div>;
}
export function ConsultConfirm() {
  const { state } = useApp();
  const a = state.appointments.find((x) => x.id === state.lastAppointment);
  return <Confirmation title="Demo appointment recorded" ok={!!a} text={a && <>Appointment <strong>{a.id}</strong> with {a.doctor} ({a.type}) on {a.date} at {a.time}. No real consultation will take place.</>}/>;
}

/* ---------------- Articles ---------------- */
export function ArticleCard({ a }) {
  return <article className="card overflow-hidden"><A href={`/health-articles/${a.slug}`} className="block aspect-[16/10] overflow-hidden"><Art icon="book" seed={a.title.length} image={a.image} alt={a.title}/></A><div className="p-4"><div className="flex items-center gap-2 text-xs text-muted-foreground"><Badge tone="mint">{a.category}</Badge><span className="flex items-center gap-1"><Icon name="clock" size={13}/>{a.readingTime} min read</span></div><A href={`/health-articles/${a.slug}`} className="mt-2 block font-semibold leading-snug hover:text-primary">{a.title}</A><p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{a.excerpt}</p></div></article>;
}
export function Articles() {
  const { state } = useApp();
  const [q, setQ] = useState(""); const [cat, setCat] = useState("");
  const pub = state.articles.filter((a) => a.published);
  const list = pub.filter((a) => (!cat || a.category === cat) && a.title.toLowerCase().includes(q.toLowerCase()));
  const feat = pub.find((a) => a.featured);
  return <div className="container-page py-8"><Crumbs items={[["Health articles"]]}/><h1 className="font-display text-3xl font-semibold">Health articles</h1><p className="mt-1 text-muted-foreground">General educational reading — not a substitute for professional medical advice.</p>
    {feat && !q && !cat && <A href={`/health-articles/${feat.slug}`} className="card mt-6 grid overflow-hidden md:grid-cols-2"><div className="aspect-[16/10] md:aspect-auto"><Art icon="book" image={feat.image} alt={feat.title}/></div><div className="p-6"><Badge tone="mint">Featured · {feat.category}</Badge><h2 className="mt-3 font-display text-2xl font-semibold">{feat.title}</h2><p className="mt-2 text-muted-foreground">{feat.excerpt}</p><span className="link-arrow mt-4">Read article<Icon name="arrow" size={16}/></span></div></A>}
    <div className="my-6 flex flex-col gap-3 sm:flex-row"><input className="input sm:max-w-xs" placeholder="Search articles" aria-label="Search articles" value={q} onChange={(e) => setQ(e.target.value)}/><div className="flex gap-2 overflow-x-auto">{["", ...new Set(pub.map((a) => a.category))].map((c) => <button key={c || "all"} className={cx("chip shrink-0", cat === c && "chip-on")} onClick={() => setCat(c)}>{c || "All"}</button>)}</div></div>
    {list.length ? <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{list.map((a) => <ArticleCard key={a.id} a={a}/>)}</div> : <Empty icon="book" title="No articles found" text="Try another search."/>}</div>;
}
export function Article({ params }) {
  const { state, toast } = useApp();
  const a = state.articles.find((x) => x.slug === params.slug && x.published);
  if (!a) return <NotFound/>;
  const related = state.articles.filter((x) => x.published && x.id !== a.id && x.category === a.category).slice(0, 3);
  const share = async () => { try { if (navigator.share) await navigator.share({ title: a.title, url: location.href }); else { await navigator.clipboard.writeText(location.href); toast("Link copied", "info"); } } catch { /* user cancelled */ } };
  return <div className="container-page max-w-3xl py-8"><Crumbs items={[["Health articles", "/health-articles"], [a.category]]}/><Badge tone="mint">{a.category}</Badge><h1 className="mt-3 font-display text-4xl font-semibold leading-tight">{a.title}</h1><div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-muted-foreground"><span>{a.author}</span><span>·</span><span>{a.date}</span><span>·</span><span>{a.readingTime} min read</span><button className="btn btn-outline btn-sm ml-auto" onClick={share}><Icon name="share" size={14}/>Share</button></div>
    <div className="my-6 aspect-[16/9] overflow-hidden rounded-2xl"><Art icon="book" image={a.image} alt={a.title}/></div><div className="prose-mt">{a.body.split("\n").filter(Boolean).map((p, i) => <p key={i}>{p}</p>)}</div>
    <DemoNote>This content is general information and is not a substitute for professional medical advice, diagnosis or treatment.</DemoNote>
    {related.length > 0 && <div className="mt-10"><h2 className="mb-4 font-display text-2xl font-semibold">Related articles</h2><div className="grid gap-4 sm:grid-cols-3">{related.map((r) => <ArticleCard key={r.id} a={r}/>)}</div></div>}</div>;
}

/* ---------------- Info pages ---------------- */
export function InfoPage({ id }) {
  const { state } = useApp();
  const pg = state.pages.find((p) => p.id === id);
  if (!pg) return <NotFound/>;
  return <div className="container-page max-w-3xl py-10"><Crumbs items={[[pg.title]]}/><h1 className="mb-6 font-display text-4xl font-semibold">{pg.title}</h1><div className="card prose-mt p-6">{pg.body.split("\n").filter(Boolean).map((p, i) => <p key={i}>{p}</p>)}
    {id === "about" && <div className="mt-4 grid gap-4 sm:grid-cols-2"><div className="rounded-xl bg-mint p-4"><h2 className="font-semibold">Directors</h2><ul className="mt-1 text-sm">{["Ajay Kumar Pathri", "Omkar Sanjay Telangi"].map((x) => <li key={x}>{x}</li>)}</ul></div><div className="rounded-xl bg-mint p-4"><h2 className="font-semibold">Registered address</h2><p className="mt-1 text-sm">{state.settings.address}</p></div></div>}
  </div>{id === "about" && <div className="mt-6 flex gap-3"><A href="/contact" className="btn btn-primary">Contact us</A><A href="/medicines" className="btn btn-outline">Explore the demo</A></div>}</div>;
}
export function Contact() {
  const { state } = useApp(); const s = state.settings;
  const [sent, setSent] = useState(false);
  const form = useForm({ name: "", email: "", phone: "", message: "" }, (v) => ({ ...req(v, ["name", "message"]), ...(emailOk(v.email) ? {} : { email: "Enter a valid email address." }), ...(v.phone && !phoneOk(v.phone) ? { phone: "Enter a valid 10-digit mobile number." } : {}), ...(v.message.trim().length && v.message.trim().length < 10 ? { message: "Please write at least 10 characters." } : {}) }));
  return <div className="container-page py-10"><Crumbs items={[["Contact"]]}/><h1 className="mb-6 font-display text-4xl font-semibold">Contact us</h1><div className="grid gap-6 lg:grid-cols-[1fr_1.3fr]">
    <div className="space-y-3">{[["phone", "Phone", s.phone, `tel:${s.phone.replace(/\s/g, "")}`], ["mail", "Email", s.email, `mailto:${s.email}`], ["pin", "Address", s.address]].map(([i, l, v, h]) => <div key={l} className="card flex gap-3 p-4"><span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-mint text-primary"><Icon name={i}/></span><div><p className="text-xs font-semibold uppercase text-muted-foreground">{l}</p>{h ? <a href={h} className="font-medium hover:text-primary">{v}</a> : <p className="font-medium">{v}</p>}</div></div>)}<p className="text-sm text-muted-foreground">{s.companyName}</p></div>
    <div className="card p-6">{sent ? <div className="py-10 text-center"><Icon name="check" size={36} className="mx-auto text-success"/><h2 className="mt-3 text-xl font-semibold">Thanks — message received (demo)</h2><p className="mt-1 text-sm text-muted-foreground">This form is a demonstration; no email was sent. For real enquiries, write to {s.email}.</p><button className="btn btn-outline mt-5" onClick={() => { setSent(false); form.setV({ name: "", email: "", phone: "", message: "" }); }}>Send another</button></div> :
      <form noValidate onSubmit={form.submit(() => setSent(true))} className="grid gap-4 sm:grid-cols-2"><Field label="Name" error={form.e.name}><input className="input" value={form.v.name} onChange={form.set("name")}/></Field><Field label="Email" error={form.e.email}><input className="input" type="email" value={form.v.email} onChange={form.set("email")}/></Field><div className="sm:col-span-2"><Field label="Phone (optional)" error={form.e.phone}><input className="input" value={form.v.phone} onChange={form.set("phone")}/></Field></div><div className="sm:col-span-2"><Field label="Message" error={form.e.message}><textarea rows={5} className="input" value={form.v.message} onChange={form.set("message")}/></Field></div><button className="btn btn-primary sm:col-span-2">Send message</button></form>}</div>
  </div></div>;
}
export function Faq() {
  const { state } = useApp(); const [open, setOpen] = useState(0);
  return <div className="container-page max-w-3xl py-10"><Crumbs items={[["FAQs"]]}/><h1 className="mb-6 font-display text-4xl font-semibold">Frequently asked questions</h1><div className="space-y-2">{state.faqs.filter((f) => f.visible).map((f, i) => <div key={f.id} className="card"><button className="flex w-full items-center justify-between gap-3 p-4 text-left font-semibold" aria-expanded={open === i} onClick={() => setOpen(open === i ? -1 : i)}>{f.question}<Icon name="chev" className={cx("shrink-0 transition", open === i && "rotate-180")}/></button>{open === i && <p className="px-4 pb-4 text-sm text-muted-foreground">{f.answer}</p>}</div>)}</div></div>;
}
export function Offers() {
  const { state, toast } = useApp();
  const today = new Date().toISOString().slice(0, 10);
  const list = state.offers.filter((o) => o.active && (!o.validTo || o.validTo >= today));
  return <div className="container-page py-10"><Crumbs items={[["Offers"]]}/><h1 className="font-display text-4xl font-semibold">Offers</h1><p className="mb-6 mt-1 text-muted-foreground">Demonstration coupons you can try at checkout.</p>{list.length ? <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{list.map((o) => <div key={o.id} className="card relative overflow-hidden p-5"><span className="absolute -right-6 -top-6 h-20 w-20 rounded-full bg-mint"/><p className="text-xs font-bold uppercase tracking-widest text-primary">{o.label}</p><p className="mt-2 font-display text-3xl font-semibold">{o.type === "percent" ? `${o.value}% off` : `${money(o.value)} off`}</p><p className="mt-1 text-sm text-muted-foreground">On carts over {money(o.minimum)} · valid till {o.validTo}</p><button className="mt-4 w-full rounded-xl border-2 border-dashed border-primary py-2 font-bold text-primary" onClick={() => { navigator.clipboard?.writeText(o.code); toast(`${o.code} copied`, "info"); }}>{o.code}</button></div>)}</div> : <Empty icon="tag" title="No active offers" text="Check back later."/>}</div>;
}
