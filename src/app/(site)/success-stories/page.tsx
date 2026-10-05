import type { Metadata } from "next";
import { ClientLogos } from "@/components/sections/shared/client-logos";
import { FinalCta } from "@/components/sections/shared/final-cta";
import { PageHero } from "@/components/sections/shared/page-hero";
import { StoryTeaser } from "@/components/sections/success-stories/story-parts";
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
      <Section id="case-studies" tone="surface" containerClassName="pb-0 lg:pb-0">
        <SectionHeader {...page.caseStudies} />
      </Section>
      {successStories.map((story, i) => (
        <StoryTeaser
          key={story.slug}
          story={story}
          tone={i % 2 === 0 ? "surface" : "white"}
          reverse={i % 2 === 1}
        />
      ))}
      <FinalCta {...page.cta} />
    </>
  );
}
