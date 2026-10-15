import { useState } from "react";
import { A, Icon } from "../components/ui";
import { useApp } from "../context/AppContext";

export function CarePlanPage() {
  const { toast } = useApp();
  const [selectedPlan, setSelectedPlan] = useState("3m"); // '3m' or '6m'
  const [spend, setSpend] = useState(1500);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState(null);

  const plans = [
    {
      id: "3m",
      title: "3 Months Membership",
      price: 165,
      months: 3,
      perMonth: "₹55/month",
      features: [
        "Extra 5% savings on eligible medicine orders",
        "Free delivery on orders above ₹149",
        "1 Free basic health screening coupon",
        "Priority access to expert doctor consultations",
      ],
    },
    {
      id: "6m",
      title: "6 Months Membership",
      price: 299,
      months: 6,
      perMonth: "₹50/month",
      badge: "MOST POPULAR",
      features: [
        "Extra 5% savings on all medicine & wellness orders",
        "Free rapid delivery with zero convenience charges",
        "2 Free basic health screening coupons",
        "Unlimited free doctor tele-consultation follow-ups",
      ],
    },
  ];

  const currentPlan = plans.find((p) => p.id === selectedPlan) || plans[0];
  const estimatedSavings = Math.round(spend * currentPlan.months * 0.05);

  const benefits = [
    {
      icon: "bottle",
      title: "Extra 5% savings",
      desc: "Additional discount applied automatically at checkout on genuine medicines and health products.",
      bg: "bg-red-50 text-[#ff6f61]",
    },
    {
      icon: "truck",
      title: "Free & Fast Delivery",
      desc: "Enjoy zero shipping and processing fees on all eligible orders delivered right to your doorstep.",
      bg: "bg-amber-50 text-amber-600",
    },
    {
      icon: "microscope",
      title: "Lab Test Benefits",
      desc: "Special discounted rates on comprehensive full body checkups and pathology diagnostics.",
      bg: "bg-emerald-50 text-emerald-600",
    },
    {
      icon: "user",
      title: "Doctor Consultations",
      desc: "Priority chat and video consultations with qualified general physicians and specialists.",
      bg: "bg-blue-50 text-blue-600",
    },
  ];

  const careFaqs = [
    {
      q: "What is the Meditrust Care Plan?",
      a: "The Meditrust Care Plan is a premium healthcare subscription that gives you extra savings on medicines, complimentary shipping, diagnostic test vouchers, and priority doctor consultations.",
    },
    {
      q: "How does the extra 5% discount work?",
      a: "Once enrolled in Care Plan, an additional 5% discount coupon or automatic deduction is applied on top of our existing promotional offers whenever you checkout.",
    },
    {
      q: "Can my family members use the same Care Plan benefits?",
      a: "Yes! The benefits cover all orders placed from your registered Meditrust account, allowing your whole family to save on everyday prescriptions and wellness products.",
    },
    {
      q: "Is payment charged automatically upon renewal?",
      a: "In this demonstration platform, membership enrollment is free and for illustrative purposes. No real charges or recurring auto-debits will be deducted from your account.",
    },
  ];

  const handleJoinPlan = () => {
    setDialogOpen(false);
    toast(`🎉 Successfully joined Care Plan (${currentPlan.title})!`);
  };

  return (
    <div className="bg-[#fafbfb] min-h-screen pb-16">
      {/* 1. Hero Introduction Section */}
      <section className="bg-gradient-to-b from-[#fef4e8] to-[#fffaf5] border-b border-amber-200/60 py-10 sm:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-8">
            <div className="max-w-xl text-center md:text-left">
              <span className="inline-block rounded-md bg-[#662d1b] px-3 py-1 text-xs font-black tracking-widest text-white uppercase mb-3 shadow-xs">
                CARE PLAN
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 tracking-tight leading-tight">
                A little care. <br className="hidden sm:inline" />
                <span className="text-[#ff6f61]">A lot more savings.</span>
              </h1>
              <p className="mt-3 text-sm sm:text-base text-gray-700 leading-relaxed font-medium">
                Unlock guaranteed extra savings on your healthcare needs, fast free deliveries, and
                complimentary benefits for you and your family.
              </p>

              <div className="mt-6 flex flex-wrap items-center justify-center md:justify-start gap-4">
                <button
                  type="button"
                  onClick={() => setDialogOpen(true)}
                  className="rounded-lg bg-[#ff6f61] px-7 py-3 text-sm font-extrabold text-white shadow-lg hover:bg-[#e85b4d] hover:shadow-xl transition duration-150 transform hover:-translate-y-0.5 cursor-pointer"
                >
                  Join Care Plan
                </button>
                <div className="text-left">
                  <p className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Starts at only</p>
                  <p className="text-sm font-extrabold text-[#662d1b]">₹165 for 3 months</p>
                </div>
              </div>
            </div>

            {/* Hero Family Photo */}
            <div className="relative">
              <div className="absolute inset-0 rounded-2xl bg-amber-200/40 blur-xl transform scale-105" />
              <img
                src="/images/banners/care-plan-family.png"
                alt="Meditrust Care Plan Family"
                className="relative h-60 w-auto max-w-[320px] sm:h-72 sm:max-w-md object-cover rounded-2xl shadow-xl border-4 border-white"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 2. Key Benefits Grid */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <p className="text-xs font-black uppercase tracking-widest text-[#ff6f61]">Member Privileges</p>
          <h2 className="mt-1 text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
            Your care comes with premium benefits
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-gray-600">
            Engineered to make quality healthcare accessible and budget-friendly every single month.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((b) => (
            <div
              key={b.title}
              className="rounded-2xl border border-gray-200/80 bg-white p-6 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                <div className={`grid h-12 w-12 place-items-center rounded-xl ${b.bg} mb-4 shadow-xs`}>
                  <Icon name={b.icon} size={24} />
                </div>
                <h3 className="text-base font-bold text-gray-900">{b.title}</h3>
                <p className="mt-2 text-xs text-gray-600 leading-relaxed">{b.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Choose Membership Plan */}
      <section className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
        <div className="rounded-3xl border border-gray-200 bg-white p-6 sm:p-10 shadow-sm">
          <div className="text-center max-w-xl mx-auto mb-8">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900">Choose your Care Plan</h2>
            <p className="mt-1.5 text-xs sm:text-sm text-gray-600">
              Select the membership tenure that best fits your family's healthcare routine.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 max-w-3xl mx-auto">
            {plans.map((plan) => {
              const isSelected = selectedPlan === plan.id;
              return (
                <div
                  key={plan.id}
                  onClick={() => setSelectedPlan(plan.id)}
                  className={`relative cursor-pointer rounded-2xl border-2 p-6 transition-all duration-200 flex flex-col justify-between ${
                    isSelected
                      ? "border-[#ff6f61] bg-[#fff9f8] shadow-md ring-2 ring-[#ff6f61]/20"
                      : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm"
                  }`}
                >
                  {plan.badge && (
                    <span className="absolute -top-3 right-6 rounded-full bg-[#ff6f61] px-3 py-0.5 text-[10px] font-black tracking-wider text-white uppercase shadow-sm">
                      {plan.badge}
                    </span>
                  )}

                  <div>
                    <div className="flex items-center justify-between">
                      <h3 className="text-base font-bold text-gray-900">{plan.title}</h3>
                      <div
                        className={`h-5 w-5 rounded-full border-2 flex items-center justify-center ${
                          isSelected ? "border-[#ff6f61] bg-[#ff6f61] text-white" : "border-gray-300"
                        }`}
                      >
                        {isSelected && <Icon name="check" size={12} />}
                      </div>
                    </div>

                    <div className="mt-4 flex items-baseline gap-2">
                      <span className="text-3xl font-black text-gray-900">₹{plan.price}</span>
                      <span className="text-xs font-semibold text-gray-500">({plan.perMonth})</span>
                    </div>

                    <ul className="mt-6 space-y-2.5 border-t border-gray-100 pt-5 text-xs text-gray-700">
                      {plan.features.map((f, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <Icon name="check" size={14} className="text-[#ff6f61] shrink-0 mt-0.5" />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedPlan(plan.id);
                      setDialogOpen(true);
                    }}
                    className={`mt-6 w-full rounded-xl py-2.5 text-xs font-bold uppercase tracking-wider transition ${
                      isSelected
                        ? "bg-[#ff6f61] text-white hover:bg-[#e85b4d] shadow-sm"
                        : "border border-gray-300 bg-white text-gray-800 hover:bg-gray-50"
                    }`}
                  >
                    {isSelected ? "Continue with this plan" : "Select Plan"}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. Interactive Savings Calculator */}
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <div className="rounded-3xl bg-gradient-to-br from-[#1e293b] to-[#0f172a] text-white p-6 sm:p-10 shadow-xl max-w-4xl mx-auto">
          <div className="text-center max-w-xl mx-auto mb-8">
            <span className="rounded-full bg-white/10 px-3 py-1 text-[11px] font-bold text-amber-300 uppercase tracking-widest">
              Live Calculator
            </span>
            <h2 className="mt-2 text-2xl sm:text-3xl font-black tracking-tight">
              See how much you could save
            </h2>
            <p className="mt-1.5 text-xs sm:text-sm text-gray-300">
              Calculate projected extra pharmacy discounts over your {currentPlan.months}-month tenure.
            </p>
          </div>

          <div className="max-w-xl mx-auto bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8 backdrop-blur-sm">
            <div className="flex items-center justify-between text-sm sm:text-base">
              <span className="font-semibold text-gray-200">Monthly Medicine Spend</span>
              <span className="text-xl sm:text-2xl font-black text-amber-300">
                ₹{spend.toLocaleString("en-IN")}
              </span>
            </div>

            <input
              type="range"
              min="500"
              max="10000"
              step="250"
              value={spend}
              onChange={(e) => setSpend(Number(e.target.value))}
              className="mt-4 w-full accent-[#ff6f61] h-2 bg-gray-700 rounded-lg cursor-pointer"
            />
            <div className="mt-2 flex justify-between text-[11px] text-gray-400 font-medium">
              <span>₹500 / mo</span>
              <span>₹5,000 / mo</span>
              <span>₹10,000 / mo</span>
            </div>

            <div className="mt-8 rounded-xl bg-white/10 border border-white/10 p-5 text-center">
              <p className="text-xs uppercase font-bold tracking-wider text-gray-300">
                Estimated Extra Savings ({currentPlan.months} Months)
              </p>
              <p className="mt-1 text-3xl sm:text-4xl font-black text-[#ff6f61]">
                ₹{estimatedSavings.toLocaleString("en-IN")}*
              </p>
              <p className="mt-2 text-[11px] text-gray-400">
                Plus additional savings from free delivery waivers, consultation perks, and lab coupons!
              </p>
            </div>

            <div className="mt-6 text-center">
              <button
                type="button"
                onClick={() => setDialogOpen(true)}
                className="w-full sm:w-auto rounded-xl bg-[#ff6f61] px-8 py-3 text-xs font-extrabold uppercase tracking-wider text-white shadow-lg hover:bg-[#e85b4d] transition"
              >
                Join Care Plan for ₹{currentPlan.price}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 5. FAQs Section */}
      <section className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-6">Frequently Asked Questions</h2>
        <div className="space-y-3">
          {careFaqs.map((faq, i) => {
            const isOpen = activeFaq === i;
            return (
              <div
                key={i}
                className="rounded-xl border border-gray-200 bg-white overflow-hidden shadow-xs"
              >
                <button
                  type="button"
                  onClick={() => setActiveFaq(isOpen ? null : i)}
                  className="flex w-full items-center justify-between p-4 text-left font-bold text-sm text-gray-900 hover:text-[#ff6f61] transition"
                >
                  <span>{faq.q}</span>
                  <Icon
                    name="chev"
                    size={14}
                    className={`text-gray-400 transition-transform ${isOpen ? "rotate-180" : ""}`}
                  />
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 pt-1 text-xs text-gray-600 leading-relaxed border-t border-gray-100">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 6. Join Care Plan Modal Dialog */}
      {dialogOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 animate-in fade-in duration-150"
          onClick={() => setDialogOpen(false)}
        >
          <div
            className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl animate-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div className="flex items-center gap-2">
                <span className="rounded bg-[#ff6f61] px-2 py-0.5 text-[10px] font-black text-white uppercase tracking-wider">
                  MEMBERSHIP
                </span>
                <h3 className="text-base font-bold text-gray-900">{currentPlan.title}</h3>
              </div>
              <button
                type="button"
                onClick={() => setDialogOpen(false)}
                className="text-gray-400 hover:text-gray-600 text-sm font-bold p-1"
              >
                ✕
              </button>
            </div>

            <div className="my-4 space-y-3 text-xs text-gray-700">
              <div className="rounded-xl bg-[#fff7f6] border border-[#ff6f61]/20 p-4">
                <div className="flex justify-between items-baseline">
                  <span className="font-bold text-gray-900 text-sm">Total Membership Fee</span>
                  <span className="text-xl font-black text-[#ff6f61]">₹{currentPlan.price}</span>
                </div>
                <p className="mt-1 text-[11px] text-gray-500">Valid for {currentPlan.months} months from activation</p>
              </div>

              <div className="space-y-1.5 pt-1">
                <p className="font-bold text-gray-800 text-[11px] uppercase tracking-wider">Included Benefits:</p>
                {currentPlan.features.map((f, i) => (
                  <div key={i} className="flex items-center gap-2 text-[11px] text-gray-600">
                    <Icon name="check" size={12} className="text-emerald-600 shrink-0" />
                    <span>{f}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <button
                type="button"
                onClick={() => setDialogOpen(false)}
                className="flex-1 rounded-xl border border-gray-300 py-2.5 text-xs font-bold text-gray-700 hover:bg-gray-100 transition"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleJoinPlan}
                className="flex-1 rounded-xl bg-[#ff6f61] py-2.5 text-xs font-bold text-white hover:bg-[#e85b4d] shadow-md transition"
              >
                Confirm &amp; Activate
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
