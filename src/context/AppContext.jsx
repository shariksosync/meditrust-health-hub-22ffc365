import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import * as D from "../data/demo";

const KEY = "meditrust-demo-v2";
const Ctx = createContext(null);

const initial = () => ({
  products: D.products, categories: D.categories, labTests: D.labTests, doctors: D.doctors,
  articles: D.articles, offers: D.offers, faqs: D.faqs, banners: D.banners, orders: D.orders,
  bookings: D.bookings, appointments: D.appointments, customers: D.customers, navigation: D.navigation,
  shortcuts: D.shortcuts, trust: D.trust, pages: D.pages, settings: D.defaultSettings,
  cart: [], labCart: [], wishlist: [], recent: [], addresses: [], prescription: null,
  user: null, admin: false, activity: [{ at: new Date().toISOString(), text: "Demo data loaded" }],
  lastOrder: null, lastBooking: null, lastAppointment: null,
});

export const priceOf = (cart, products) => cart.reduce((s, c) => s + (products.find((p) => p.id === c.id)?.price || 0) * c.quantity, 0);
export function applyCoupon(code, subtotal, offers) {
  const o = offers.find((x) => x.code.toLowerCase() === String(code).trim().toLowerCase());
  const today = new Date().toISOString().slice(0, 10);
  if (!o) return { error: "This coupon code wasn't found." };
  if (!o.active || (o.validTo && o.validTo < today) || (o.validFrom && o.validFrom > today)) return { error: "This coupon isn't active right now." };
  if (subtotal < o.minimum) return { error: `Add items worth ₹${o.minimum - subtotal} more to use ${o.code}.` };
  return { offer: o, discount: Math.min(subtotal, o.type === "percent" ? Math.round((subtotal * o.value) / 100) : o.value) };
}

export function AppProvider({ children }) {
  const [state, setState] = useState(initial);
  const [ready, setReady] = useState(false);
  const [toasts, setToasts] = useState([]);
  const n = useRef(0);
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(KEY) || "null");
      if (saved) setState((s) => ({ ...s, ...saved, prescription: null, settings: { ...D.defaultSettings, ...saved.settings, sections: { ...D.defaultSettings.sections, ...(saved.settings?.sections || {}) } } }));
    } catch { /* corrupt cache: fall back to sample data */ }
    setReady(true);
  }, []);
  useEffect(() => {
    if (!ready) return;
    const { prescription, ...rest } = state; // prescriptions are never persisted
    localStorage.setItem(KEY, JSON.stringify(rest));
    document.documentElement.style.setProperty("--primary", state.settings.primaryColor || "#087F8C");
  }, [ready, state]);

  const toast = useCallback((text, tone = "success") => {
    const id = ++n.current;
    setToasts((t) => [...t, { id, text, tone }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3200);
  }, []);
  const update = useCallback((patch) => setState((s) => ({ ...s, ...(typeof patch === "function" ? patch(s) : patch) })), []);
  const log = useCallback((text) => update((s) => ({ activity: [{ at: new Date().toISOString(), text }, ...s.activity].slice(0, 30) })), [update]);

  const api = useMemo(() => ({
    state, ready, toasts, toast, update, log,
    addToCart: (p, q = 1, pack) => {
      update((s) => ({ cart: s.cart.some((c) => c.id === p.id) ? s.cart.map((c) => c.id === p.id ? { ...c, quantity: c.quantity + q, pack: pack || c.pack } : c) : [...s.cart, { id: p.id, quantity: q, pack: pack || p.pack }] }));
      toast(`${p.name} added to cart`);
    },
    setQty: (id, q) => update((s) => ({ cart: q <= 0 ? s.cart.filter((c) => c.id !== id) : s.cart.map((c) => c.id === id ? { ...c, quantity: q } : c) })),
    toggleWish: (id) => {
      const had = state.wishlist.includes(id);
      update((s) => ({ wishlist: had ? s.wishlist.filter((x) => x !== id) : [...s.wishlist, id] }));
      toast(had ? "Removed from wishlist" : "Saved to wishlist", "info");
    },
    viewed: (id) => update((s) => ({ recent: [id, ...s.recent.filter((x) => x !== id)].slice(0, 8) })),
    toggleLab: (id) => update((s) => ({ labCart: s.labCart.includes(id) ? s.labCart.filter((x) => x !== id) : [...s.labCart, id] })),
    reset: () => { localStorage.removeItem(KEY); setState(initial()); toast("Demo data reset"); },
  }), [state, ready, toasts, toast, update, log]);
  return <Ctx.Provider value={api}>{children}</Ctx.Provider>;
}

export function useApp() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useApp must be used inside AppProvider");
  return v;
}
