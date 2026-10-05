import type { Metadata } from "next";
import { FeaturePageView } from "@/components/sections/features/feature-page";
import { learnPage } from "@/content/features";

export const metadata: Metadata = learnPage.metadata;

export default function LearnKnowledgePage() {
  return <FeaturePageView page={learnPage} />;
}
