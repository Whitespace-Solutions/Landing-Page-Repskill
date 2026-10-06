import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { GuideArticleView } from "@/components/sections/guide/guide-parts";
import { articlePlainText, getGuideEntry, guideEntries } from "@/content/guide";

// Semua artikel dibuat saat build dari src/content/guide.ts
export const dynamicParams = false;

export function generateStaticParams() {
  return guideEntries.map((e) => ({ guide: e.guide.id, slug: e.article.slug }));
}

export async function generateMetadata({ params }: PageProps<"/guide/[guide]/[slug]">): Promise<Metadata> {
  const { guide, slug } = await params;
  const entry = getGuideEntry(guide, slug);
  if (!entry) return {};
  const text = articlePlainText(entry.article);
  return {
    title: `${entry.article.title} — ${entry.guide.label}`,
    description: text.length > 160 ? `${text.slice(0, 157).trimEnd()}…` : text,
  };
}

export default async function GuideArticlePage({ params }: PageProps<"/guide/[guide]/[slug]">) {
  const { guide, slug } = await params;
  const entry = getGuideEntry(guide, slug);
  if (!entry) notFound();

  const index = guideEntries.indexOf(entry);
  return <GuideArticleView entry={entry} prev={guideEntries[index - 1]} next={guideEntries[index + 1]} />;
}
