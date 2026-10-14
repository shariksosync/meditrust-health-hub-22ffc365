import { createFileRoute } from "@tanstack/react-router";
import App from "../App";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Tata 1mg: India's Leading Online Pharmacy & Healthcare Platform" },
      { name: "description", content: "Buy medicines and health products online at Tata 1mg. Find reliable diagnostics, lab tests, and doctor consultations." },
      { property: "og:title", content: "Tata 1mg: India's Leading Online Pharmacy & Healthcare Platform" },
      { property: "og:description", content: "Buy medicines and health products online at Tata 1mg." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: App,
});
