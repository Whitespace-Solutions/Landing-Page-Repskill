import type { Metadata } from "next";
import { ClientLogos } from "@/components/sections/shared/client-logos";
import { FinalCta } from "@/components/sections/shared/final-cta";
import { PageHero } from "@/components/sections/shared/page-hero";
import { Reveal } from "@/components/motion/reveal";
import { StoryRow } from "@/components/sections/success-stories/story-parts";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { successStories } from "@/content/success-stories";
import { successStoriesPage as page } from "@/content/success-stories-page";

export const metadata: Metadata = {
  title: "Success Stories",
  description:
    "See how organizations turn the expertise of their best people into sales capability with Repskill.",
};

export default function SuccessStoriesPage() {
  return (
    <>
      <PageHero {...page.hero} />
      <ClientLogos {...page.clients} />
      <Section id="case-studies" tone="surface">
        <SectionHeader {...page.caseStudies} />
        <div className="mt-10 flex flex-col gap-6 lg:mt-14">
          {successStories.map((story) => (
            <Reveal key={story.slug}>
              <StoryRow story={story} />
            </Reveal>
          ))}
        </div>
      </Section>
      <FinalCta {...page.cta} />
    </>
  );
}
