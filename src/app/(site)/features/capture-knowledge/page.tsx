import type { Metadata } from "next";
import { FeaturePageView } from "@/components/sections/features/feature-page";
import { capturePage } from "@/content/features";

export const metadata: Metadata = capturePage.metadata;

export default function CaptureKnowledgePage() {
  return <FeaturePageView page={capturePage} />;
}
