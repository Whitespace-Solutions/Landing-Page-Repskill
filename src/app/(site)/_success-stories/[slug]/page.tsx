import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { StoryArticle } from "@/components/sections/success-stories/story-article";
import { getStory, successStories } from "@/content/success-stories";

/** Ditulis manual (bukan PageProps<...>) supaya tetap lolos typecheck saat rute disembunyikan (folder _success-stories). */
type StoryPageProps = { params: Promise<{ slug: string }> };

// Semua halaman dibuat saat build dari src/content/success-stories.ts
export const dynamicParams = false;

export function generateStaticParams() {
  return successStories.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: StoryPageProps): Promise<Metadata> {
  const story = getStory((await params).slug);
  if (!story) return {};
  return { title: `${story.name} — Success Story`, description: story.summary };
}

export default async function SuccessStoryPage({ params }: StoryPageProps) {
  const story = getStory((await params).slug);
  if (!story) notFound();

  return <StoryArticle story={story} />;
}
