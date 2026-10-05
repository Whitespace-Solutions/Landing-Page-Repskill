import type { Metadata } from "next";
import {
  FeatureComparison,
  PricingModel,
  WhatsIncluded,
} from "@/components/sections/pricing/pricing-sections";
import { FinalCta } from "@/components/sections/shared/final-cta";
import { PageHero } from "@/components/sections/shared/page-hero";
import { StepsTimeline } from "@/components/sections/shared/steps-timeline";
import { pricingPage } from "@/content/pricing";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Pricing tailored to your organization's needs. Every Repskill capability and your Knowledge Universe included.",
};

export default function PricingPage() {
  return (
    <>
      <PageHero {...pricingPage.hero} />
      <PricingModel />
      <WhatsIncluded />
      <FeatureComparison />
      <StepsTimeline {...pricingPage.implementation} tone="light" />
      <FinalCta {...pricingPage.cta} />
    </>
  );
}
