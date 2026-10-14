import { useState, useEffect } from "react";
import { useApp } from "../context/AppContext";
import { Icon } from "./ui";

const loginSlides = [
  {
    icon: "bottle",
    title: "Know Your Medicines",
    desc: "View medicine information like usage, side effects and cheaper substitutes before you take them.",
  },
  {
    icon: "shield",
    title: "100% Genuine Medicines",
    desc: "All products ordered through Tata 1mg are dispensed from licensed and verified retail pharmacies.",
  },
  {
    icon: "lab",
    title: "Affordable Lab Tests",
    desc: "Book checkups and diagnostic tests at home with NABL and ISO certified diagnostic partners.",
  },
  {
    icon: "steth",
    title: "Consult Certified Doctors",
    desc: "Chat or speak with experienced verified specialists across 25+ therapeutic domains.",
  },
];

const signupSlides = [
  {
    icon: "users",
    title: "Make Healthcare Simpler",
    desc: "Get medicine information, order medicines, book lab tests and consult doctors online from the comfort of your home.",
  },
  {
    icon: "package",
    title: "Medicines, Home Delivered",
    desc: "Order any medicine or health product and we'll deliver it for free. Enjoy discounts on everything.",
  },
  {
    icon: "lab",
    title: "Lab Tests at Home",
    desc: "Book any test from any lab. We'll collect the sample and send the reports. Save up to 80% every time.",
  },
];

export function AuthModal({ open, onClose, initialMode = "login" }) {
  const { state, update, toast } = useApp();
  const [mode, setMode] = useState(initialMode); // 'login' | 'signup'
  const [step, setStep] = useState("input"); // 'input' | 'otp'
  const [contact, setContact] = useState("");
  const [isExpert, setIsExpert] = useState(false);
  const [otp, setOtp] = useState(["1", "2", "3", "4"]);
  const [slideIdx, setSlideIdx] = useState(0);

  useEffect(() => {
    if (open) {
      setMode(initialMode);
      setStep("input");
      setSlideIdx(0);
    }
  }, [open, initialMode]);

  const slides = mode === "login" ? loginSlides : signupSlides;

  // Auto-advance slides every 3.5 seconds
  useEffect(() => {
    if (!open) return;
    const timer = setInterval(() => {
      setSlideIdx((prev) => (prev + 1) % slides.length);
    }, 3500);
    return () => clearInterval(timer);
  }, [open, slides.length]);

  if (!open) return null;

  const handleSendOtp = (e) => {
    e.preventDefault();
    if (!contact.trim()) {
      toast("Please enter your mobile number or email", "error");
      return;
    }
    setStep("otp");
    toast(`OTP sent to ${contact}`);
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    const demoUser = {
      name: contact.includes("@") ? contact.split("@")[0] : `User ${contact.slice(-4)}`,
      email: contact.includes("@") ? contact : `${contact}@demo.1mg`,
      phone: contact.replace(/\D/g, "") || "9876543210",
      expert: isExpert,
    };
    update({ user: demoUser });
    toast(`Welcome back, ${demoUser.name}!`);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative flex w-full max-w-[820px] min-h-[500px] overflow-hidden rounded-2xl bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute right-4 top-4 z-20 text-gray-500 hover:text-black transition p-1.5 rounded-full hover:bg-gray-100"
        >
          <Icon name="close" size={20} />
        </button>

        {/* Left Side: Illustration & Value Carousel */}
        <div className="hidden md:flex w-[46%] flex-col items-center justify-center border-r border-gray-100 bg-[#fafafa] p-8 text-center select-none">
          {/* Animated Illustration Graphic */}
          <div className="relative mb-8 grid h-44 w-44 place-items-center">
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-amber-100/60 via-red-50 to-orange-100/80 animate-pulse" />
            <div className="relative grid h-24 w-24 place-items-center rounded-2xl bg-white shadow-md text-[#ff6f61]">
              <Icon name={slides[slideIdx]?.icon || "bottle"} size={52} />
            </div>
            {/* Ambient decorative elements */}
            <span className="absolute -top-1 right-6 h-3 w-3 rounded-full bg-orange-300 opacity-60" />
            <span className="absolute bottom-4 left-6 h-2 w-2 rounded-full bg-red-400 opacity-70" />
          </div>

          {/* Slide Text */}
          <h3 className="text-xl font-bold text-gray-900 transition-all duration-300">
            {slides[slideIdx]?.title}
          </h3>
          <p className="mt-3 text-xs leading-relaxed text-gray-500 max-w-xs transition-all duration-300">
            {slides[slideIdx]?.desc}
          </p>

          {/* Dots Indicator */}
          <div className="mt-8 flex items-center justify-center gap-1.5">
            {slides.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setSlideIdx(i)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  slideIdx === i ? "w-5 bg-[#ff6f61]" : "w-2 bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Right Side: Form Content */}
        <div className="flex flex-1 flex-col justify-center p-8 sm:p-12">
          {step === "input" ? (
            <>
              {mode === "login" ? (
                <>
                  <h2 className="text-2xl font-bold text-gray-900">Login</h2>
                  <p className="mt-1 text-xs text-gray-500">
                    Get access to your orders, lab tests & doctor consultations
                  </p>

                  <form onSubmit={handleSendOtp} className="mt-8 space-y-6">
                    <div className="relative">
                      <input
                        type="text"
                        required
                        value={contact}
                        onChange={(e) => setContact(e.target.value)}
                        placeholder="Enter Your mobile number or email"
                        className="w-full border-0 border-b-2 border-gray-300 bg-transparent py-2.5 text-sm font-medium text-gray-900 outline-none transition focus:border-[#ff6f61] placeholder:text-gray-400"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full rounded-md bg-[#ff6f61] py-3 text-sm font-bold text-white shadow-md hover:bg-[#e85b4d] active:scale-[0.99] transition"
                    >
                      Send OTP
                    </button>
                  </form>

                  <div className="mt-6 text-center text-xs text-gray-600">
                    New on 1mg ?{" "}
                    <button
                      type="button"
                      onClick={() => setMode("signup")}
                      className="font-bold text-[#ff6f61] hover:underline"
                    >
                      Sign Up
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <h2 className="text-2xl font-bold text-gray-900">Sign Up</h2>
                  <p className="mt-1 text-xs text-gray-500">
                    Please enter your Mobile number to receive One Time Password (OTP)
                  </p>

                  <form onSubmit={handleSendOtp} className="mt-8 space-y-5">
                    <div className="relative">
                      <input
                        type="tel"
                        required
                        value={contact}
                        onChange={(e) => setContact(e.target.value)}
                        placeholder="Enter 10 digit mobile number"
                        className="w-full border-0 border-b-2 border-gray-300 bg-transparent py-2.5 text-sm font-medium text-gray-900 outline-none transition focus:border-[#ff6f61] placeholder:text-gray-400"
                      />
                    </div>

                    <label className="flex items-center gap-2.5 cursor-pointer text-xs text-gray-600 pt-1">
                      <input
                        type="checkbox"
                        checked={isExpert}
                        onChange={(e) => setIsExpert(e.target.checked)}
                        className="h-4 w-4 rounded border-gray-300 accent-[#ff6f61]"
                      />
                      <span>Are You a HealthCare Expert?</span>
                    </label>

                    <button
                      type="submit"
                      className="w-full rounded-md bg-[#ff6f61] py-3 text-sm font-bold text-white shadow-md hover:bg-[#e85b4d] active:scale-[0.99] transition"
                    >
                      Continue
                    </button>
                  </form>

                  <div className="mt-6 text-center text-xs text-gray-600">
                    Already on 1mg ?{" "}
                    <button
                      type="button"
                      onClick={() => setMode("login")}
                      className="font-bold text-[#ff6f61] hover:underline"
                    >
                      Login
                    </button>
                  </div>
                </>
              )}

              <p className="mt-6 text-center text-[11px] leading-relaxed text-gray-400">
                By signing up, you agree to our{" "}
                <a href="/terms" className="text-gray-600 underline hover:text-[#ff6f61]">
                  Terms and Conditions
                </a>{" "}
                &{" "}
                <a href="/privacy-policy" className="text-gray-600 underline hover:text-[#ff6f61]">
                  Privacy policy
                </a>
              </p>

              <div className="mt-4 text-center text-xs">
                <span className="text-gray-500">Need Help? </span>
                <a href="/faq" className="font-semibold text-[#ff6f61] hover:underline">
                  Get in touch
                </a>
              </div>
            </>
          ) : (
            /* OTP Verification Screen */
            <form onSubmit={handleVerifyOtp} className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Verify OTP</h2>
                <p className="mt-1 text-xs text-gray-500">
                  Enter the 4-digit verification code sent to{" "}
                  <strong className="text-gray-800">{contact}</strong>
                </p>
              </div>

              <div className="flex justify-center gap-3 py-2">
                {otp.map((digit, i) => (
                  <input
                    key={i}
                    id={`otp-${i}`}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => {
                      const next = [...otp];
                      next[i] = e.target.value.slice(-1);
                      setOtp(next);
                      if (e.target.value && i < 3) {
                        document.getElementById(`otp-${i + 1}`)?.focus();
                      }
                    }}
                    className="h-12 w-12 text-center text-lg font-bold border-2 border-gray-200 rounded-lg focus:border-[#ff6f61] outline-none"
                  />
                ))}
              </div>

              <button
                type="submit"
                className="w-full rounded-md bg-[#ff6f61] py-3 text-sm font-bold text-white shadow-md hover:bg-[#e85b4d] active:scale-[0.99] transition"
              >
                Verify & Continue
              </button>

              <div className="flex items-center justify-between text-xs text-gray-500">
                <button
                  type="button"
                  onClick={() => setStep("input")}
                  className="hover:underline text-gray-700"
                >
                  ← Edit number
                </button>
                <button
                  type="button"
                  onClick={() => toast("New OTP sent!")}
                  className="text-[#ff6f61] hover:underline font-semibold"
                >
                  Resend OTP
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
