import { CaseStudies } from "@/components/sections/home/case-studies";
import { Hero } from "@/components/sections/home/hero";
import { PlatformOverview } from "@/components/sections/home/platform-overview";
import { ClientLogos } from "@/components/sections/shared/client-logos";
import { FinalCta } from "@/components/sections/shared/final-cta";
import { StepsTimeline } from "@/components/sections/shared/steps-timeline";
import { clientsSection, howItWorks } from "@/content/home";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ClientLogos {...clientsSection} />
      <PlatformOverview />
      <StepsTimeline {...howItWorks} />
      <CaseStudies />
      <FinalCta />
    </>
  );
}
