import type { Metadata } from "next";
import { AboutHero, OurPhilosophy, WhyRepskill } from "@/components/sections/about/about-sections";
import { HomeCta } from "@/components/sections/home/home-cta";
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
      <AboutHero />
      <WhyRepskill />
      <OurPhilosophy />
      <StepsTimeline {...aboutPage.approach} tone="light" />
      <HomeCta {...aboutPage.cta} />
    </>
  );
}
