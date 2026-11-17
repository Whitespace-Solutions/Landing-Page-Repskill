import type { Metadata } from "next";
import { HomeCta } from "@/components/sections/home/home-cta";
import { ClientLogos } from "@/components/sections/shared/client-logos";
import { StoriesHero } from "@/components/sections/success-stories/stories-hero";
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
      <StoriesHero {...page.hero} />
      <Section id="case-studies" tone="surface">
        <SectionHeader {...page.caseStudies} centerOnMobile />
        <div className="mt-10 flex flex-col gap-5 lg:mt-14">
          {successStories.map((story) => (
            <Reveal key={story.slug}>
              <StoryRow story={story} />
            </Reveal>
          ))}
        </div>
      </Section>
      <ClientLogos {...page.clients} />
      <HomeCta {...page.cta} />
    </>
  );
}
