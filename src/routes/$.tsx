import { createFileRoute } from "@tanstack/react-router";
import App from "../App";

// Every non-root URL is handled by the app's own pathname router (src/App.jsx).
export const Route = createFileRoute("/$")({
  head: () => ({
    meta: [
      { title: "MEDITRUST: India's Leading Online Pharmacy & Healthcare Platform | MEDITRUST LIFE SCIENCE PVT LTD" },
      { name: "description", content: "MEDITRUST LIFE SCIENCE PVT LTD - Online Pharmacy and Healthcare Platform. Chinchwad, Maharashtra." },
      { property: "og:title", content: "MEDITRUST: India's Leading Online Pharmacy & Healthcare Platform" },
      { property: "og:description", content: "Explore the MEDITRUST e-pharmacy and digital health platform." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: App,
});
