/** Konten halaman induk /success-stories/. Data tiap klien ada di success-stories.ts. */
import type { CtaData, PageHeroData } from "./types";

export const successStoriesPage: {
  hero: PageHeroData;
  clients: { eyebrow: string; title: string };
  caseStudies: { eyebrow: string; title: string; lead: string };
  cta: CtaData;
} = {
  hero: {
    eyebrow: "Success Stories",
    title: "See Expertise Become Capability.",
    highlight: "Capability.",
    lead: "See how organizations turn the expertise of their best people into capability across the sales team with Repskill.",
    primary: { label: "Book Demo", href: "/book-demo/" },
    secondary: { label: "Read the stories", href: "#case-studies" },
  },
  clients: { eyebrow: "Our Clients", title: "Sales teams building capability with Repskill." },
  caseStudies: {
    eyebrow: "Case Studies",
    title: "Every story follows the same journey.",
    lead: "From the expertise challenge, through the Repskill approach, to verified outcomes.",
  },
  cta: {
    title: "See What Repskill Could Do for Your Organization.",
    body: "Tell us a little about your organization and what you'd like to improve.",
  },
};
