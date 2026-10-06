import type { Metadata } from "next";
import { GuideHome } from "@/components/sections/guide/guide-parts";
import { guidePage } from "@/content/guide";

export const metadata: Metadata = {
  title: "Guide",
  description: `${guidePage.lead} Admin Guide, User Guide, and feature requests.`,
};

// Judul (h1) dan pencarian ada di hero pada layout.
export default function GuidePage() {
  return <GuideHome />;
}
