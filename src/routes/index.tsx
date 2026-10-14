import { createFileRoute } from "@tanstack/react-router";
import App from "../App";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "MEDITRUST: India's Leading Online Pharmacy & Healthcare Platform | MEDITRUST LIFE SCIENCE PVT LTD" },
      { name: "description", content: "Buy authentic medicines and health products online at MEDITRUST LIFE SCIENCE PVT LTD. Reliable diagnostics, certified lab tests, and doctor consultations." },
      { property: "og:title", content: "MEDITRUST: India's Leading Online Pharmacy & Healthcare Platform" },
      { property: "og:description", content: "Buy authentic medicines and health products online at MEDITRUST LIFE SCIENCE PVT LTD." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: App,
});
