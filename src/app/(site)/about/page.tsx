import type { Metadata } from "next";
import {
  HowWeThink,
  OurPhilosophy,
  PurposeVisionMission,
  WhyRepskill,
} from "@/components/sections/about/about-sections";
import { FinalCta } from "@/components/sections/shared/final-cta";
import { PageHero } from "@/components/sections/shared/page-hero";
import { aboutPage } from "@/content/about";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Repskill exists to make great sales expertise scalable. Learn about our purpose, vision, mission, and philosophy.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero {...aboutPage.hero} />
      <WhyRepskill />
      <PurposeVisionMission />
      <OurPhilosophy />
      <HowWeThink />
      <FinalCta {...aboutPage.cta} />
    </>
  );
}
