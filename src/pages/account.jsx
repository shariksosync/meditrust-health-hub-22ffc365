import { useState } from "react";
import { useApp } from "../context/AppContext";
import { A, DemoNote, Empty, Field, Icon, emailOk, phoneOk, req, useForm, useGo } from "../components/ui";
import { ProductGrid } from "../components/Layout";

const Shell = ({ title, sub, children }) => <div className="container-page max-w-md py-12"><div className="card p-6 sm:p-8"><h1 className="font-display text-3xl font-semibold">{title}</h1><p className="mb-5 mt-1 text-sm text-muted-foreground">{sub}</p>{children}<div className="mt-5"><DemoNote>Sign-in is simulated in your browser and is not secure. Never use a real password.</DemoNote></div></div></div>;

export function Login() {
  const { update, toast } = useApp(); const go = useGo();
  const f = useForm({ email: "", password: "" }, (v) => ({ ...(emailOk(v.email) ? {} : { email: "Enter a valid email." }), ...(v.password.length >= 6 ? {} : { password: "Password must be at least 6 characters." }) }));
  return <Shell title="Welcome back" sub="Log in to your demo account."><form noValidate className="space-y-4" onSubmit={f.submit((v) => { update({ user: { name: v.email.split("@")[0], email: v.email, phone: "" } }); toast("Logged in (demo)"); go("/profile"); })}>
    <Field label="Email" error={f.e.email}><input className="input" type="email" value={f.v.email} onChange={f.set("email")}/></Field>
    <Field label="Password" error={f.e.password}><input className="input" type="password" value={f.v.password} onChange={f.set("password")}/></Field>
    <div className="flex justify-end text-sm"><A href="/forgot-password" className="text-primary">Forgot password?</A></div><button className="btn btn-primary w-full">Log in</button>
    <p className="text-center text-sm">New here? <A href="/register" className="font-semibold text-primary">Create an account</A></p></form></Shell>;
}
export function Register() {
  const { update, toast } = useApp(); const go = useGo();
  const f = useForm({ name: "", email: "", phone: "", password: "", confirm: "", agree: false }, (v) => ({ ...req(v, ["name"]), ...(emailOk(v.email) ? {} : { email: "Enter a valid email." }), ...(phoneOk(v.phone) ? {} : { phone: "Enter a valid 10-digit mobile number." }), ...(v.password.length >= 8 ? {} : { password: "Use at least 8 characters." }), ...(v.confirm === v.password ? {} : { confirm: "Passwords don't match." }), ...(v.agree ? {} : { agree: "Please accept the terms." }) }));
  return <Shell title="Create an account" sub="A demo account stored only in this browser."><form noValidate className="space-y-4" onSubmit={f.submit((v) => { update({ user: { name: v.name, email: v.email, phone: v.phone } }); toast("Account created (demo)"); go("/profile"); })}>
    {[["name", "Full name"], ["email", "Email", "email"], ["phone", "Mobile number"], ["password", "Password", "password"], ["confirm", "Confirm password", "password"]].map(([k, l, t]) => <Field key={k} label={l} error={f.e[k]}><input className="input" type={t || "text"} value={f.v[k]} onChange={f.set(k)}/></Field>)}
    <label className="flex items-start gap-2 text-sm"><input type="checkbox" checked={f.v.agree} onChange={f.set("agree")} className="mt-1 accent-[var(--primary)]"/><span>I agree to the <A href="/terms" className="text-primary underline">terms</A> and <A href="/privacy-policy" className="text-primary underline">privacy policy</A>.</span></label>{f.e.agree && <p className="text-xs text-destructive">{f.e.agree}</p>}
    <button className="btn btn-primary w-full">Create account</button><p className="text-center text-sm">Already registered? <A href="/login" className="font-semibold text-primary">Log in</A></p></form></Shell>;
}
export function Forgot() {
  const [done, setDone] = useState(false);
  const f = useForm({ email: "" }, (v) => (emailOk(v.email) ? {} : { email: "Enter a valid email." }));
  return <Shell title="Reset password" sub="We'll simulate sending a reset link.">{done ? <p className="flex items-center gap-2 rounded-xl bg-mint p-4 text-sm"><Icon name="check" className="text-success"/>Demo only — no email was sent. <A href="/login" className="font-semibold text-primary">Back to login</A></p> : <form noValidate className="space-y-4" onSubmit={f.submit(() => setDone(true))}><Field label="Email" error={f.e.email}><input className="input" type="email" value={f.v.email} onChange={f.set("email")}/></Field><button className="btn btn-primary w-full">Send reset link</button></form>}</Shell>;
}

function NeedLogin() { return <div className="container-page max-w-md py-12"><Empty icon="user" title="Please log in" text="Log in to your demo account to see this page." action="Log in" href="/login"/></div>; }
const Tabs = () => <div className="mb-6 flex gap-2 overflow-x-auto">{[["Profile", "/profile"], ["Addresses", "/addresses"], ["Orders", "/orders"], ["Wishlist", "/wishlist"]].map(([l, h]) => <A key={h} href={h} className="chip shrink-0">{l}</A>)}</div>;

export function Profile() {
  const { state, update, toast } = useApp(); const go = useGo();
  const u = state.user;
  const f = useForm({ name: u?.name || "", email: u?.email || "", phone: u?.phone || "" }, (v) => ({ ...req(v, ["name"]), ...(emailOk(v.email) ? {} : { email: "Enter a valid email." }), ...(v.phone && !phoneOk(v.phone) ? { phone: "Enter a valid 10-digit number." } : {}) }));
  if (!u) return <NeedLogin/>;
  return <div className="container-page max-w-3xl py-8"><h1 className="mb-4 font-display text-3xl font-semibold">My profile</h1><Tabs/>
    <form noValidate onSubmit={f.submit((v) => { update({ user: v }); toast("Profile updated"); })} className="card grid gap-4 p-6 sm:grid-cols-2">
      <Field label="Name" error={f.e.name}><input className="input" value={f.v.name} onChange={f.set("name")}/></Field><Field label="Email" error={f.e.email}><input className="input" value={f.v.email} onChange={f.set("email")}/></Field><Field label="Mobile" error={f.e.phone}><input className="input" value={f.v.phone} onChange={f.set("phone")}/></Field>
      <div className="flex items-end gap-2 sm:col-span-2"><button className="btn btn-primary">Save changes</button><button type="button" className="btn btn-outline" onClick={() => { update({ user: null }); toast("Logged out", "info"); go("/"); }}><Icon name="logout" size={16}/>Log out</button></div></form>
    <div className="card mt-6 p-6"><h2 className="font-semibold">Health records (demo)</h2><p className="mt-1 text-sm text-muted-foreground">Health records are not stored by this prototype. A real implementation would need secure, consented storage.</p></div></div>;
}
export function Addresses() {
  const { state, update, toast } = useApp();
  const [edit, setEdit] = useState(null);
  const f = useForm({ name: "", phone: "", line: "", city: "", pin: "" }, (v) => ({ ...req(v, ["name", "line", "city"]), ...(phoneOk(v.phone) ? {} : { phone: "Enter a valid 10-digit number." }), ...(/^\d{6}$/.test(v.pin) ? {} : { pin: "Enter a 6-digit PIN." }) }));
  if (!state.user) return <NeedLogin/>;
  const save = (v) => { update((s) => ({ addresses: edit === "new" ? [...s.addresses, { ...v, id: Date.now() }] : s.addresses.map((a) => a.id === edit ? { ...v, id: edit } : a) })); setEdit(null); toast("Address saved"); };
  return <div className="container-page max-w-3xl py-8"><h1 className="mb-4 font-display text-3xl font-semibold">Saved addresses</h1><Tabs/>
    <div className="grid gap-3 sm:grid-cols-2">{state.addresses.map((a) => <div key={a.id} className="card p-4 text-sm"><p className="font-semibold">{a.name}</p><p className="text-muted-foreground">{a.line}, {a.city} {a.pin}<br/>{a.phone}</p><div className="mt-3 flex gap-2"><button className="btn btn-outline btn-sm" onClick={() => { f.setV(a); setEdit(a.id); }}>Edit</button><button className="btn btn-outline btn-sm text-destructive" onClick={() => update((s) => ({ addresses: s.addresses.filter((x) => x.id !== a.id) }))}>Delete</button></div></div>)}
      {!edit && <button className="card grid min-h-28 place-items-center border-dashed p-4 text-sm font-semibold text-primary hover:border-primary" onClick={() => { f.setV({ name: state.user.name, phone: "", line: "", city: "", pin: "" }); setEdit("new"); }}><span className="flex items-center gap-2"><Icon name="plus"/>Add address</span></button>}</div>
    {edit && <form noValidate onSubmit={f.submit(save)} className="card mt-4 grid gap-4 p-5 sm:grid-cols-2">{[["name", "Name"], ["phone", "Mobile"], ["line", "House, street, area"], ["city", "City"], ["pin", "PIN code"]].map(([k, l]) => <Field key={k} label={l} error={f.e[k]}><input className="input" value={f.v[k]} onChange={f.set(k)}/></Field>)}<div className="flex items-end gap-2"><button className="btn btn-primary">Save</button><button type="button" className="btn btn-outline" onClick={() => setEdit(null)}>Cancel</button></div></form>}</div>;
}
export function Wishlist() {
  const { state } = useApp();
  const items = state.wishlist.map((id) => state.products.find((p) => p.id === id && p.visible)).filter(Boolean);
  return <div className="container-page py-8"><h1 className="mb-5 font-display text-3xl font-semibold">Wishlist</h1>{items.length ? <ProductGrid items={items}/> : <Empty icon="heart" title="Your wishlist is empty" text="Tap the heart on any product to save it here." action="Browse products" href="/healthcare"/>}</div>;
}
