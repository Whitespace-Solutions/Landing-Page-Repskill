import { Stagger, StaggerItem } from "@/components/motion/reveal";
import { StoryCard } from "@/components/sections/shared/story-card";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { caseStudiesSection } from "@/content/home";
import { successStories } from "@/content/success-stories";

export function CaseStudies() {
  return (
    <Section tone="surface">
      <SectionHeader {...caseStudiesSection} />
      <Stagger className="mt-10 grid gap-4 sm:grid-cols-2 lg:mt-14 xl:grid-cols-4" stagger={0.08}>
        {successStories.map((story) => (
          <StaggerItem key={story.slug}>
            <StoryCard story={story} />
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}
