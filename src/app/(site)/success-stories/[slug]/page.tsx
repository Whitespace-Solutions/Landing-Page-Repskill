import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FinalCta } from "@/components/sections/shared/final-cta";
import {
  StoryAbout,
  StoryChallenge,
  StoryHelp,
  StoryResult,
} from "@/components/sections/success-stories/story-parts";
import { getStory, successStories } from "@/content/success-stories";

// Semua halaman dibuat saat build dari src/content/success-stories.ts
export const dynamicParams = false;

export function generateStaticParams() {
  return successStories.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps<"/success-stories/[slug]">): Promise<Metadata> {
  const story = getStory((await params).slug);
  if (!story) return {};
  return { title: `${story.name} — Success Story`, description: story.summary };
}

export default async function SuccessStoryPage({ params }: PageProps<"/success-stories/[slug]">) {
  const story = getStory((await params).slug);
  if (!story) notFound();

  return (
    <>
      <StoryAbout story={story} />
      <StoryChallenge story={story} />
      <StoryHelp story={story} />
      <StoryResult story={story} />
      <FinalCta
        title="See What Repskill Could Do for Your Organization."
        body="Tell us a little about your organization and what you'd like to improve."
      />
    </>
  );
}
