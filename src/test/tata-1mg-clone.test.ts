import { describe, expect, it } from "vitest";
import {
  popularCities,
  allCities,
  topTabs,
  navDropdowns,
  heroSlides,
  carePlanBanner,
  healthConcerns,
  fullBodyCheckups,
  superSavingDeals,
  trendingNow,
  offersData,
  paymentPartners,
  trustPillars,
  platformStats,
} from "../data/demo";

describe("Tata 1mg Clone Mock Data & Architecture", () => {
  it("contains authentic Tata 1mg popular and all cities", () => {
    expect(popularCities).toContain("Delhi");
    expect(popularCities).toContain("Gurgaon");
    expect(popularCities).toContain("Mumbai");
    expect(allCities.length).toBeGreaterThan(10);
  });

  it("contains 8 service tabs and 9 category mega dropdowns", () => {
    expect(topTabs.length).toBe(8);
    expect(topTabs[0].label).toBe("MEDICINES");
    expect(topTabs[1].label).toBe("LAB TESTS");
    expect(topTabs[2].label).toBe("CONSULT DOCTORS");

    expect(navDropdowns.length).toBe(9);
    expect(navDropdowns[0].label).toBe("Health Resource Center");
    expect(navDropdowns[1].label).toBe("Hair Care");
    expect(navDropdowns[2].label).toBe("Fitness & Health");
  });

  it("contains hero carousel with PvPI toll-free compliance notice", () => {
    expect(heroSlides.length).toBeGreaterThan(0);
    const pvpiSlide = heroSlides.find((s) => s.rightNotice?.phone === "1800 180 3024");
    expect(pvpiSlide).toBeDefined();
    expect(pvpiSlide?.rightNotice?.title).toContain("If you experience/suspect");
  });

  it("contains Care Plan membership banner data", () => {
    expect(carePlanBanner.tag).toBe("Care Plan");
    expect(carePlanBanner.subtag).toContain("₹165 for 3 months");
    expect(carePlanBanner.title).toContain("extra 5% savings");
  });

  it("contains health concerns and diagnostic checkups with SAFE badges", () => {
    expect(healthConcerns.length).toBe(8);
    expect(fullBodyCheckups.length).toBeGreaterThan(0);
    expect(fullBodyCheckups[0].safe).toBe(true);
  });

  it("contains super saving deals and trending now with countdown timer", () => {
    expect(superSavingDeals.length).toBeGreaterThan(0);
    expect(trendingNow.length).toBeGreaterThan(0);
    expect(trendingNow[0].saleEnds).toContain("Sale ends in 1 day 3 hrs");
  });

  it("contains partner offers for Medicine and Lab Tests matching offers page", () => {
    expect(offersData.medicines.length).toBeGreaterThan(0);
    expect(offersData.medicines.some((o) => o.partner === "Amazon Pay")).toBe(true);
    expect(offersData.medicines.some((o) => o.partner === "Mobikwik")).toBe(true);
    expect(offersData.medicines.some((o) => o.partner === "Paytm")).toBe(true);

    expect(offersData.labTests.length).toBeGreaterThan(0);
    expect(offersData.labTests.some((o) => o.partner === "Tata 1mg Labs")).toBe(true);
  });

  it("contains platform statistics, trust pillars, and payment partners", () => {
    expect(platformStats.some((s) => s.value === "260m+")).toBe(true);
    expect(platformStats.some((s) => s.value === "31m+")).toBe(true);
    expect(trustPillars.map((p) => p.title)).toEqual(["Reliable", "Secure", "Affordable"]);
    expect(paymentPartners).toContain("Amazon Pay");
    expect(paymentPartners).toContain("Paytm");
    expect(paymentPartners).toContain("Mobikwik");
  });
});
