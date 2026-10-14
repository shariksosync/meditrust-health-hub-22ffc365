import { createFileRoute } from "@tanstack/react-router";
import App from "../App";

// Every non-root URL is handled by the app's own pathname router (src/App.jsx).
export const Route = createFileRoute("/$")({
  head: () => ({
    meta: [
      { title: "Tata 1mg: India's Leading Online Pharmacy & Healthcare Platform" },
      { name: "description", content: "Tata 1mg - Online Pharmacy and Healthcare Platform." },
      { property: "og:title", content: "Tata 1mg: India's Leading Online Pharmacy & Healthcare Platform" },
      { property: "og:description", content: "Explore the Tata 1mg e-pharmacy and digital health platform." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: App,
});
