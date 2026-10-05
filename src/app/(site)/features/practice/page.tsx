import type { Metadata } from "next";
import { FeaturePageView } from "@/components/sections/features/feature-page";
import { practicePage } from "@/content/features";

export const metadata: Metadata = practicePage.metadata;

export default function PracticePage() {
  return <FeaturePageView page={practicePage} />;
}
