import { describe, expect, it } from "vitest";
import {
  company,
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
  featuredBrands,
  popularCategories,
  ayurvedaKnowledge,
  offersData,
  paymentPartners,
  trustPillars,
  platformStats,
  labTrustCards,
  labHealthNeeds,
  labPromoBanners,
  labRadiologyCards,
  labCollectionSteps,
  labPopularTestSuggestions,
  ayurvedaFeaturedHerbs,
  ayurvedaSkinHerbs,
  ayurvedaDigestiveHerbs,
  ayurvedaHairHerbs,
  ayurvedaAZDirectory,
  consultTrustPillars,
  consultFaqs,
  consultTestimonials,
  partnerSolutions,
  partnerStats,
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

  it("contains authentic MEDITRUST LIFE SCIENCE PVT LTD registered company details", () => {
    expect(company.name).toBe("MEDITRUST LIFE SCIENCE PVT LTD");
    expect(company.directors).toContain("Ajay Kumar Pathri");
    expect(company.directors).toContain("Omkar Sanjay Telangi");
    expect(company.phone).toBe("+91 7276048377");
    expect(company.address).toContain("Chinchwad");
    expect(company.address).toContain("411033");
  });

  it("contains extracted authentic image paths across homepage sections", () => {
    expect(heroSlides[0].image).toBe("/images/banners/hero-slide-1.png");
    expect(carePlanBanner.avatar).toBe("/images/banners/care-plan-man.png");
    expect(healthConcerns[0].image).toBe("/images/concerns/diabetes.png");
    expect(featuredBrands[0].image).toBe("/images/brands/pentasure.png");
    expect(popularCategories[0].image).toBe("/images/categories/bestoffers.png");
    expect(superSavingDeals[0].image).toContain("/images/products/");
    expect(trendingNow[0].image).toContain("/images/products/");
    expect(ayurvedaKnowledge[0].image).toBe("/images/ayurveda/celery.png");
  });

  it("contains authentic Lab Tests landing page data and extracted images matching screenshots", () => {
    expect(labTrustCards.length).toBe(4);
    expect(labTrustCards[0].image).toBe("/images/lab_tests/trust_nabl.png");
    expect(labTrustCards[1].image).toBe("/images/lab_tests/wide_coverage.png");
    expect(labTrustCards[2].image).toBe("/images/lab_tests/home_collection.png");
    expect(labTrustCards[3].image).toBe("/images/lab_tests/fast_reports.png");

    expect(labHealthNeeds.length).toBe(6);
    expect(labHealthNeeds[0].name).toBe("Men");
    expect(labHealthNeeds[0].image).toBe("/images/lab_tests/need_men.png");
    expect(labHealthNeeds[1].name).toBe("Women");
    expect(labHealthNeeds[1].image).toBe("/images/lab_tests/need_women.png");

    expect(labPromoBanners.length).toBe(3);
    expect(labPromoBanners[0].image).toBe("/images/lab_tests/banner_phlebotomist.png");
    expect(labPromoBanners[1].image).toBe("/images/lab_tests/banner_trust_see.png");
    expect(labPromoBanners[2].image).toBe("/images/lab_tests/banner_national_ref_lab.png");

    expect(labRadiologyCards.length).toBe(6);
    expect(labRadiologyCards[0].name).toBe("CT Scan");
    expect(labRadiologyCards[0].image).toBe("/images/lab_tests/rad_ct_scan.png");

    expect(labCollectionSteps.length).toBe(5);
    expect(labCollectionSteps[0].step).toBe(1);
    expect(labCollectionSteps[0].image).toBe("/images/lab_tests/step_1_booking.png");

    expect(labPopularTestSuggestions.length).toBe(3);
    expect(labPopularTestSuggestions[0].name).toContain("Urine R/M");
  });

  it("verifies Ayurveda page herbal categories and A-Z directory matching screenshots 1-7", () => {
    expect(ayurvedaFeaturedHerbs.length).toBe(7);
    expect(ayurvedaFeaturedHerbs[0].name).toBe("Ashwagandha");
    expect(ayurvedaFeaturedHerbs[0].img).toBe("/images/ayurveda/herb_ashwagandha.png");

    expect(ayurvedaSkinHerbs.length).toBe(7);
    expect(ayurvedaSkinHerbs[0].name).toBe("Aloe Vera");
    expect(ayurvedaSkinHerbs[0].img).toBe("/images/ayurveda/skin_aloe_vera.png");

    expect(ayurvedaDigestiveHerbs.length).toBe(7);
    expect(ayurvedaDigestiveHerbs[0].name).toContain("Alsi");
    expect(ayurvedaDigestiveHerbs[0].img).toBe("/images/ayurveda/digest_alsi.png");

    expect(ayurvedaHairHerbs.length).toBe(7);
    expect(ayurvedaHairHerbs[0].name).toContain("Onion");
    expect(ayurvedaHairHerbs[0].img).toBe("/images/ayurveda/hair_onion.png");

    expect(ayurvedaAZDirectory.length).toBeGreaterThanOrEqual(18);
    expect(ayurvedaAZDirectory.some((x) => x.name === "Ashwagandha")).toBe(true);
    expect(ayurvedaAZDirectory.some((x) => x.letter === "T")).toBe(true);
  });

  it("verifies Consult Doctor trust pillars, testimonials, and FAQs matching screenshots 1-4", () => {
    expect(consultTrustPillars.length).toBe(4);
    expect(consultTrustPillars[0].title).toBe("100% Confidential");
    expect(consultTrustPillars[0].iconImg).toBe("/images/consult_doctor/pillar_confidential.png");
    expect(consultTrustPillars[1].title).toBe("Certified Doctors");
    expect(consultTrustPillars[2].title).toBe("Convenience");
    expect(consultTrustPillars[3].title).toBe("Cost Effective");

    expect(consultFaqs.length).toBe(6);
    expect(consultFaqs[0].q).toContain("When will I get an answer");
    expect(consultTestimonials.length).toBe(2);
    expect(consultTestimonials[0].name).toBe("Aarohi");
  });

  it("verifies Partnerships platform solutions, metrics, and lead form matching screenshots 1-9", () => {
    expect(partnerSolutions.length).toBe(3);
    expect(partnerSolutions[0].title).toBe("ePharmacy Solutions");
    expect(partnerSolutions[0].img).toBe("/images/partnerships/sol_card_epharmacy.png");
    expect(partnerSolutions[1].title).toBe("eDiagnostics Network");
    expect(partnerSolutions[2].title).toBe("eConsultations Suite");

    expect(partnerStats.length).toBe(4);
    expect(partnerStats.some((s) => s.value.includes("24,000+"))).toBe(true);
    expect(partnerStats.some((s) => s.value.includes("800+"))).toBe(true);

    const ayurTab = topTabs.find((t) => t.id === "ayurveda");
    expect(ayurTab?.href).toBe("/ayurveda");

    const partnerTab = topTabs.find((t) => t.id === "partnerships");
    expect(partnerTab?.href).toBe("/partnerships");
    expect(partnerTab?.target).toBe("_blank");

    const cancerTab = topTabs.find((t) => t.id === "cancer-care");
    expect(cancerTab).toBeDefined();
    expect(cancerTab?.href).toBe("/cancer-care");
    expect(cancerTab?.target).toBe("_blank");
  });
});
