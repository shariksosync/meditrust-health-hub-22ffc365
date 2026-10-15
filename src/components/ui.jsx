import { useEffect, useState } from "react";
import { useRouter, useRouterState } from "@tanstack/react-router";
import { useApp } from "../context/AppContext";

export const money = (v) => `₹${Number(v || 0).toLocaleString("en-IN")}`;
export const cx = (...c) => c.filter(Boolean).join(" ");

/* ---------- Lightweight pathname router over the browser History API ---------- */
export function useLoc() {
  const loc = useRouterState({ select: (s) => s.location });
  return { path: loc.pathname.replace(/\/+$/, "") || "/", query: new URLSearchParams(loc.searchStr || "") };
}
export function useGo() {
  const router = useRouter();
  return (to) => { router.history.push(to); if (typeof window !== "undefined") window.scrollTo({ top: 0 }); };
}
export function matchRoute(routes, path) {
  for (const [pattern, Comp] of routes) {
    const a = pattern.split("/"), b = path.split("/");
    if (a.length !== b.length) continue;
    const params = {};
    if (a.every((seg, i) => seg.startsWith(":") ? (params[seg.slice(1)] = decodeURIComponent(b[i])) : seg === b[i])) return { Comp, params };
  }
  return null;
}
export function A({ href = "/", children, className, onClick, target, ...rest }) {
  const go = useGo();
  return <a href={href} target={target} className={className} {...rest} onClick={(e) => {
    onClick?.(e);
    if (!e.defaultPrevented && href.startsWith("/") && target !== "_blank" && !e.metaKey && !e.ctrlKey && e.button === 0) { e.preventDefault(); go(href); }
  }}>{children}</a>;
}

/* ---------- Inline SVG icons ---------- */
const P = {
  shield: <><path d="M12 3 20 6v5c0 5-3.5 8.4-8 10-4.5-1.6-8-5-8-10V6l8-3Z"/><path d="M12 8v6M9 11h6"/></>,
  search: <><circle cx="10.8" cy="10.8" r="6.8"/><path d="m16 16 4.2 4.2"/></>,
  cart: <><path d="M3 4h2l2.1 11h10.8l2-8H6"/><circle cx="9" cy="19" r="1"/><circle cx="17" cy="19" r="1"/></>,
  heart: <path d="M20.8 8.8c0 5.2-8.8 10.4-8.8 10.4S3.2 14 3.2 8.8A4.7 4.7 0 0 1 12 6.3a4.7 4.7 0 0 1 8.8 2.5Z"/>,
  user: <><circle cx="12" cy="8" r="3.4"/><path d="M4.8 20a7.2 7.2 0 0 1 14.4 0"/></>,
  menu: <path d="M4 7h16M4 12h16M4 17h16"/>,
  close: <path d="m6 6 12 12M18 6 6 18"/>,
  arrow: <path d="M5 12h14M13 6l6 6-6 6"/>,
  chev: <path d="m6 9 6 6 6-6"/>,
  plus: <path d="M12 5v14M5 12h14"/>,
  minus: <path d="M5 12h14"/>,
  check: <path d="m5 12 4 4L19 6"/>,
  pin: <><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/></>,
  leaf: <><path d="M20 4C10 4 5 8 5 14c0 3 2 5 5 5 6 0 10-5 10-15Z"/><path d="M4 21c2-5 6-8 12-11"/></>,
  bottle: <><path d="M9 3h6M10 3v4l-3 3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-9l-3-3V3"/><path d="M8 13h8"/></>,
  rx: <><path d="M6 20V4h5a4 4 0 0 1 0 8H6"/><path d="m10 12 8 8M18 12l-6 6"/></>,
  sun: <><circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M2 12h2m16 0h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></>,
  drop: <><path d="M12 3s7 7.5 7 12a7 7 0 0 1-14 0c0-4.5 7-12 7-12Z"/><path d="M9 16a3 3 0 0 0 3 3"/></>,
  flower: <><circle cx="12" cy="12" r="2.5"/><path d="M12 9.5V4m0 16v-5.5M9.5 12H4m16 0h-5.5M10 10 6.5 6.5m11 11L14 14m0-4 3.5-3.5m-11 11L10 14"/></>,
  sparkle: <path d="m12 3 1.7 5.3L19 10l-5.3 1.7L12 17l-1.7-5.3L5 10l5.3-1.7L12 3Z"/>,
  monitor: <><rect x="3" y="4" width="18" height="13" rx="2"/><path d="M8 21h8m-4-4v4M7 11h2l1.5-3 2 6 1.5-3h3"/></>,
  clock: <><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></>,
  lab: <><path d="M9 3h6M10 3v6l-5 9a2 2 0 0 0 2 3h10a2 2 0 0 0 2-3l-5-9V3"/><path d="M7 15h10"/></>,
  book: <><path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v17H6.5A2.5 2.5 0 0 0 4 22V5.5Z"/><path d="M4 17a2.5 2.5 0 0 1 2.5-2.5H20"/></>,
  package: <><path d="m12 3 9 5-9 5-9-5 9-5Z"/><path d="M3 8v9l9 5 9-5V8m-9 5v9"/></>,
  steth: <><path d="M6 3v6a4 4 0 0 0 8 0V3"/><path d="M10 13v3a5 5 0 0 0 10 0v-2"/><circle cx="20" cy="12" r="2"/></>,
  phone: <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z"/>,
  mail: <><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></>,
  tag: <><path d="M20 12 12 20 3 11V3h8l9 9Z"/><circle cx="7.5" cy="7.5" r="1.5"/></>,
  upload: <><path d="M12 16V4m-5 5 5-5 5 5"/><path d="M4 16v3a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-3"/></>,
  trash: <><path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13"/></>,
  edit: <><path d="M4 20h4L19 9l-4-4L4 16v4Z"/><path d="m13 7 4 4"/></>,
  eye: <><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/></>,
  grid: <><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></>,
  calendar: <><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4m8-4v4"/></>,
  share: <><circle cx="18" cy="5" r="2.5"/><circle cx="6" cy="12" r="2.5"/><circle cx="18" cy="19" r="2.5"/><path d="m8.2 10.8 7.6-4.5m-7.6 6.9 7.6 4.5"/></>,
  logout: <><path d="M15 4h4v16h-4M10 8l-4 4 4 4M6 12h10"/></>,
  info: <><circle cx="12" cy="12" r="9"/><path d="M12 11v6m0-9.5v.5"/></>,
  users: <><circle cx="9" cy="8" r="3"/><path d="M3 20a6 6 0 0 1 12 0M16 4a3 3 0 0 1 0 6m2 10a6 6 0 0 0-3-5.2"/></>,
  settings: <><circle cx="12" cy="12" r="3"/><path d="M12 2v3m0 14v3M2 12h3m14 0h3M4.9 4.9 7 7m10 10 2.1 2.1M4.9 19.1 7 17M17 7l2.1-2.1"/></>,
  lightning: <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8Z" fill="currentColor"/>,
  crosshair: <><circle cx="12" cy="12" r="7"/><path d="M12 2v3m0 14v3M2 12h3m14 0h3"/></>,
  star: <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" fill="currentColor"/>,
  safe: <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></>,
};
export function Icon({ name, size = 20, className = "" }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">{P[name] || P.plus}</svg>;
}

export function Logo({ light = false }) {
  return (
    <A href="/" className="flex items-center gap-2 shrink-0 select-none group" aria-label="MEDITRUST Home">
      <svg
        className="w-7 h-8 shrink-0 text-[#ff6f61]"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
      <div className="flex flex-col leading-tight">
        <span className={cx("font-black tracking-tight text-xl sm:text-2xl leading-none", light ? "text-white" : "text-[#ff6f61]")}>
          MEDITRUST
        </span>
        <span className="text-[8px] sm:text-[9px] font-bold text-gray-500 tracking-wider uppercase mt-0.5">
          LIFESCIENCE PVT LTD
        </span>
      </div>
    </A>
  );
}

export function Stars({ rating = 4.3, reviews }) {
  return (
    <div className="flex items-center gap-1 text-[11px] font-semibold text-emerald-700">
      <div className="flex items-center gap-0.5 text-emerald-600">
        {[1, 2, 3, 4, 5].map((s) => (
          <svg
            key={s}
            className={`h-3 w-3 ${s <= Math.round(rating) ? "fill-emerald-600 text-emerald-600" : "fill-gray-200 text-gray-200"}`}
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
      <span>{rating}</span>
      {reviews && <span className="text-gray-400 font-normal">({reviews})</span>}
    </div>
  );
}

export const Badge = ({ tone = "mint", children }) => <span className={cx("badge", `badge-${tone}`)}>{children}</span>;
export const DemoNote = ({ children }) => <div className="flex gap-2 rounded-xl border border-warning/40 bg-warning/10 p-3 text-sm text-foreground"><Icon name="info" size={18} className="mt-0.5 shrink-0 text-warning"/><span>{children}</span></div>;

export function Field({ label, error, children, hint }) {
  return <label className="block text-sm"><span className="mb-1 block font-medium text-foreground">{label}</span>{children}{hint && !error && <span className="mt-1 block text-xs text-muted-foreground">{hint}</span>}{error && <span className="mt-1 block text-xs text-destructive" role="alert">{error}</span>}</label>;
}
export function useForm(init, validate) {
  const [v, setV] = useState(init); const [e, setE] = useState({});
  return { v, e, set: (k) => (ev) => setV((s) => ({ ...s, [k]: ev?.target ? (ev.target.type === "checkbox" ? ev.target.checked : ev.target.value) : ev })), setV,
    submit: (fn) => (ev) => { ev.preventDefault(); const errs = validate(v) || {}; setE(errs); if (!Object.keys(errs).length) fn(v); } };
}
export const req = (v, keys) => Object.fromEntries(keys.filter((k) => !String(v[k] ?? "").trim()).map((k) => [k, "This field is required."]));
export const emailOk = (s) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
export const phoneOk = (s) => /^[6-9]\d{9}$/.test(String(s).replace(/\D/g, "").slice(-10)) && String(s).replace(/\D/g, "").length >= 10;

export function Modal({ open, onClose, title, children, wide }) {
  useEffect(() => { if (!open) return; const k = (e) => e.key === "Escape" && onClose(); window.addEventListener("keydown", k); return () => window.removeEventListener("keydown", k); }, [open, onClose]);
  if (!open) return null;
  return <div className="fixed inset-0 z-50 flex items-end justify-center bg-foreground/40 p-0 sm:items-center sm:p-4" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
    <div role="dialog" aria-modal="true" aria-label={title} className={cx("max-h-[92vh] w-full overflow-auto rounded-t-2xl bg-card p-5 shadow-lift sm:rounded-2xl", wide ? "sm:max-w-3xl" : "sm:max-w-lg")}>
      <div className="mb-4 flex items-center justify-between gap-3"><h2 className="font-display text-xl font-semibold">{title}</h2><button className="icon-btn" onClick={onClose} aria-label="Close"><Icon name="close"/></button></div>
      {children}
    </div>
  </div>;
}
export function Confirm({ open, onClose, onConfirm, title = "Are you sure?", text }) {
  return <Modal open={open} onClose={onClose} title={title}><p className="text-sm text-muted-foreground">{text}</p><div className="mt-5 flex justify-end gap-2"><button className="btn btn-outline" onClick={onClose}>Cancel</button><button className="btn btn-danger" onClick={() => { onConfirm(); onClose(); }}>Confirm</button></div></Modal>;
}
export function Toasts() {
  const { toasts } = useApp();
  return <div className="pointer-events-none fixed bottom-20 right-4 z-[60] flex flex-col gap-2 sm:bottom-6" aria-live="polite">{toasts.map((t) => <div key={t.id} className={cx("toast", t.tone === "error" ? "border-destructive" : t.tone === "info" ? "border-primary" : "border-success")}><Icon name={t.tone === "error" ? "info" : "check"} size={18}/>{t.text}</div>)}</div>;
}
export function Empty({ icon = "package", title, text, action, href = "/medicines" }) {
  return <div className="card flex flex-col items-center px-6 py-14 text-center"><span className="mb-3 grid h-14 w-14 place-items-center rounded-full bg-mint text-primary"><Icon name={icon} size={26}/></span><h3 className="font-display text-lg font-semibold">{title}</h3><p className="mt-1 max-w-sm text-sm text-muted-foreground">{text}</p>{action && <A href={href} className="btn btn-primary mt-5">{action}</A>}</div>;
}
export function Crumbs({ items }) {
  return <nav aria-label="Breadcrumb" className="mb-4 flex flex-wrap items-center gap-1 text-sm text-muted-foreground"><A href="/" className="hover:text-primary">Home</A>{items.map(([l, h]) => <span key={l} className="flex items-center gap-1"><span>/</span>{h ? <A href={h} className="hover:text-primary">{l}</A> : <span className="text-foreground">{l}</span>}</span>)}</nav>;
}
export function Section({ eyebrow, title, text, href, action = "View all", children, className }) {
  return <section className={cx("container-page py-10 sm:py-14", className)}>
    <div className="mb-6 flex flex-wrap items-end justify-between gap-3"><div>{eyebrow && <p className="eyebrow">{eyebrow}</p>}<h2 className="font-display text-2xl font-semibold sm:text-3xl">{title}</h2>{text && <p className="mt-1 text-muted-foreground">{text}</p>}</div>{href && <A href={href} className="link-arrow">{action}<Icon name="arrow" size={16}/></A>}</div>
    {children}
  </section>;
}
const tones = ["tone-0", "tone-1", "tone-2", "tone-3", "tone-4", "tone-5"];
export function Art({ icon, seed = 0, image, alt = "", className = "", label }) {
  const [broken, setBroken] = useState(false);
  if (image && !broken) return <img src={image} alt={alt} loading="lazy" onError={() => setBroken(true)} className={cx("h-full w-full object-cover", className)}/>;
  return <div className={cx("art relative grid h-full w-full place-items-center overflow-hidden", tones[seed % 6], className)} role="img" aria-label={alt}>
    <span className="absolute h-[70%] w-[70%] rounded-full bg-card/50"/><span className="relative grid h-16 w-16 place-items-center rounded-2xl bg-card text-primary shadow-soft"><Icon name={icon} size={32}/></span>
    {label && <span className="absolute bottom-2 left-3 text-[10px] font-semibold tracking-widest text-foreground/50">{label}</span>}
  </div>;
}
export const catIcon = (cats, name) => cats.find((c) => c.name === name)?.icon || "plus";
