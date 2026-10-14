import { createFileRoute } from "@tanstack/react-router";
import App from "../App";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "MEDITRUST — Medicines, Lab Tests & Doctor Consultation (Demo)" },
      { name: "description", content: "MEDITRUST LIFE SCIENCE demo e-pharmacy: browse medicines, healthcare products, lab tests and doctor consultations." },
      { property: "og:title", content: "MEDITRUST — Digital Healthcare & E-Pharmacy (Demo)" },
      { property: "og:description", content: "Medicines, diagnostics, wellness essentials and healthcare services — a demonstration platform." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: App,
});
