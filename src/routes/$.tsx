import { createFileRoute } from "@tanstack/react-router";
import App from "../App";

// Every non-root URL is handled by the app's own pathname router (src/App.jsx).
export const Route = createFileRoute("/$")({
  head: () => ({
    meta: [
      { title: "MEDITRUST — Healthcare Made Simple (Demo)" },
      { name: "description", content: "MEDITRUST LIFE SCIENCE demonstration healthcare platform: pharmacy, lab tests, consultations and health articles." },
      { property: "og:title", content: "MEDITRUST — Healthcare Made Simple (Demo)" },
      { property: "og:description", content: "Explore the MEDITRUST demonstration e-pharmacy and digital health platform." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: App,
});
