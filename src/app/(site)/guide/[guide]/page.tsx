import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { GuideOverview } from "@/components/sections/guide/guide-parts";
import { getGuide, guides } from "@/content/guide";

// Semua halaman dibuat saat build dari src/content/guide.ts
export const dynamicParams = false;

export function generateStaticParams() {
  return guides.map((g) => ({ guide: g.id }));
}

export async function generateMetadata({ params }: PageProps<"/guide/[guide]">): Promise<Metadata> {
  const guide = getGuide((await params).guide);
  if (!guide) return {};
  return { title: guide.label, description: guide.description };
}

export default async function GuideOverviewPage({ params }: PageProps<"/guide/[guide]">) {
  const guide = getGuide((await params).guide);
  if (!guide) notFound();
  return <GuideOverview guide={guide} />;
}
