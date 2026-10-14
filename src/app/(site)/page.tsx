import { CaseStudies } from "@/components/sections/home/case-studies";
import { Differentiators } from "@/components/sections/home/differentiators";
import { Hero } from "@/components/sections/home/hero";
import { HomeCta } from "@/components/sections/home/home-cta";
import { Solution } from "@/components/sections/home/solution";
import { Problem } from "@/components/sections/home/problem";
import { ClientLogos } from "@/components/sections/shared/client-logos";
import { StepsTimeline } from "@/components/sections/shared/steps-timeline";
import { clientsSection, howItWorks } from "@/content/home";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Problem />
      <Solution />
      <StepsTimeline {...howItWorks} />
      <Differentiators />
      <CaseStudies />
      <ClientLogos {...clientsSection} />
      <HomeCta singleLineTitle />
    </>
  );
}
