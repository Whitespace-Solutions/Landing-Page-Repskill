import type { Metadata } from "next";
import {
  FeatureComparison,
  PricingModel,
  PricingPlans,
  WhatsIncluded,
} from "@/components/sections/pricing/pricing-sections";
import { PageHero } from "@/components/sections/shared/page-hero";
import { VisualCta } from "@/components/sections/shared/visual-cta";
import { pricingPage } from "@/content/pricing";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Simple, transparent pricing: one plan, billed monthly or annually. Every team gets the full Repskill toolkit.",
};

export default function PricingPage() {
  return (
    <>
      <PageHero {...pricingPage.hero} />
      <PricingPlans />
      <PricingModel />
      <WhatsIncluded />
      <FeatureComparison />
      <VisualCta {...pricingPage.cta} visual={pricingPage.ctaVisual} />
    </>
  );
}
