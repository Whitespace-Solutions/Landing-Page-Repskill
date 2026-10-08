import type { Metadata } from "next";
import { AboutFlow, OurPhilosophy, WhyRepskill } from "@/components/sections/about/about-sections";
import { FinalCta } from "@/components/sections/shared/final-cta";
import { PageHero } from "@/components/sections/shared/page-hero";
import { StepsTimeline } from "@/components/sections/shared/steps-timeline";
import { aboutPage } from "@/content/about";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Repskill exists to make great sales expertise scalable. Learn about our purpose, vision, mission, and philosophy.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero {...aboutPage.hero} aside={<AboutFlow />} />
      <WhyRepskill />
      <OurPhilosophy />
      <StepsTimeline {...aboutPage.approach} tone="light" />
      <FinalCta {...aboutPage.cta} />
    </>
  );
}
