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
import { specialties, slugify, offersData } from "../data/demo";

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
  const { state } = useApp();
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("");
  const list = state.labTests.filter(
    (t) =>
      t.visible &&
      (!cat || t.category === cat) &&
      t.name.toLowerCase().includes(q.toLowerCase())
  );

  return (
    <div className="bg-[#f8f9fa] min-h-screen pb-16">
      {/* Banner */}
      <div className="bg-gradient-to-r from-red-500 to-[#ff6f61] py-8 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <p className="text-xs font-bold uppercase tracking-wider text-white/80">Tata 1mg Labs</p>
          <h1 className="mt-1 text-2xl sm:text-3xl font-extrabold">Diagnostic Tests & Checkups</h1>
          <p className="mt-1 text-sm text-white/90">
            100% Certified Labs · Safe Home Sample Collection · Free Doctor Consultation
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-6">
        <Crumbs items={[["Lab tests"]]} />

        {/* Filter bar */}
        <div className="my-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between bg-white p-3 rounded-xl border border-gray-200">
          <div className="relative flex-1 sm:max-w-xs">
            <input
              className="w-full rounded-lg border border-gray-200 py-2 pl-9 pr-3 text-xs outline-none focus:border-[#ff6f61]"
              placeholder="Search tests, e.g. CBC, Thyroid"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              aria-label="Search tests"
            />
            <Icon name="search" size={16} className="absolute left-3 top-2.5 text-gray-400" />
          </div>

          <div className="flex gap-2 overflow-x-auto pb-1 sm:pb-0">
            {["", ...new Set(state.labTests.map((t) => t.category))].map((c) => (
              <button
                key={c || "all"}
                onClick={() => setCat(c)}
                className={cx(
                  "rounded-full px-3 py-1 text-xs font-semibold whitespace-nowrap transition",
                  cat === c
                    ? "bg-[#ff6f61] text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
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

        <LabBar />
      </div>
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
  return (
    <div className="bg-[#f8f9fa] min-h-screen pb-16">
      {/* Banner */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 py-10 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <p className="text-xs font-bold uppercase tracking-wider text-[#ff6f61]">
            Tata 1mg Online Consultations
          </p>
          <h1 className="mt-1 text-2xl sm:text-3xl font-extrabold">
            Consult Top Doctors 24x7
          </h1>
          <p className="mt-1 text-sm text-gray-300">
            Connect via Video, Audio or Chat with verified healthcare specialists across 25+ specialties.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-6">
        <Crumbs items={[["Doctor consultation"]]} />
        <div className="my-4">
          <DemoNote>
            All doctors and slots are <strong>demonstration examples</strong>. No real consultation,
            video call or medical advice is provided.
          </DemoNote>
        </div>

        <h2 className="mb-4 text-lg font-bold text-gray-900">Popular Specialties</h2>
        <SpecialtyGrid />

        <h2 className="mb-4 mt-10 text-lg font-bold text-gray-900">Featured Specialists</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {state.doctors
            .filter((d) => d.visible)
            .map((d) => (
              <DoctorCard key={d.id} d={d} />
            ))}
        </div>
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
              <h2 className="font-bold text-gray-900 text-xs uppercase tracking-wider">Leadership</h2>
              <ul className="mt-2 text-xs text-gray-600 space-y-1">
                <li>Prashant Tandon (Co-Founder & CEO)</li>
                <li>Gaurav Agarwal (Co-Founder & CTO)</li>
              </ul>
            </div>
            <div className="rounded-xl bg-gray-50 p-4 border border-gray-100">
              <h2 className="font-bold text-gray-900 text-xs uppercase tracking-wider">
                Corporate Address
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
