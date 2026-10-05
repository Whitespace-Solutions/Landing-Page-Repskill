/** Konten halaman Pricing. */
import type { CtaData, PageHeroData, StepsData } from "./types";

export const pricingPage: {
  hero: PageHeroData;
  plan: {
    eyebrow: string;
    name: string;
    title: string;
    body: string;
    includes: string[];
    cta: { label: string; href: string };
    factors: { title: string; items: { title: string; desc: string }[] };
  };
  included: {
    eyebrow: string;
    title: string;
    items: { stage: string; title: string; tools: string; desc: string; href: string; accent?: boolean }[];
  };
  comparison: {
    eyebrow: string;
    title: string;
    lead: string;
    columns: [string, string];
    rows: { label: string; values: [boolean | string, boolean | string] }[];
  };
  implementation: StepsData;
  cta: CtaData;
} = {
  hero: {
    eyebrow: "Pricing",
    title: "Build Sales Capability Around Your Organization.",
    highlight: "Your Organization.",
    lead: "Choose an approach that fits your organization's sales capability goals.",
    primary: { label: "Talk to Sales", href: "/book-demo/" },
    secondary: { label: "What's included", href: "#included" },
  },
  plan: {
    eyebrow: "Pricing Model",
    name: "Repskill Platform",
    title: "Pricing tailored to your organization's needs.",
    body: "One platform that includes every Repskill capability and your own Knowledge Universe.",
    includes: [
      "Capture Knowledge: Extraction Studio & content review",
      "Learn Knowledge: Knowledge Universe, Chat & Learning Path",
      "Practice: Scenario Studio & Reflection Studio",
      "Onboarding and implementation support",
    ],
    cta: { label: "Talk to Sales", href: "/book-demo/" },
    factors: {
      title: "What shapes your plan",
      items: [
        { title: "Team size", desc: "How many people will learn and practice on Repskill." },
        { title: "Knowledge scope", desc: "How much company and expert knowledge to capture." },
        { title: "Rollout", desc: "The teams, regions, and timeline for your launch." },
      ],
    },
  },
  included: {
    eyebrow: "What's Included",
    title: "Everything that turns expertise into capability.",
    items: [
      {
        stage: "CAPTURE",
        title: "Capture Knowledge",
        tools: "Extraction Studio · Add Content",
        desc: "Capture and structure the expertise of your best people.",
        href: "/features/capture-knowledge/",
      },
      {
        stage: "LEARN",
        title: "Learn Knowledge",
        tools: "Chat · Learning Path",
        desc: "Turn approved company knowledge into structured learning.",
        href: "/features/learn-knowledge/",
      },
      {
        stage: "PRACTICE",
        title: "Practice",
        tools: "Scenario Studio · Reflection Studio",
        desc: "Roleplay real sales situations with AI, then reflect and improve.",
        href: "/features/practice/",
      },
      {
        stage: "FOUNDATION",
        title: "Knowledge Universe",
        tools: "Curated · Reviewed · Approved",
        desc: "Your company-specific knowledge foundation for every capability.",
        href: "/features/learn-knowledge/#knowledge-universe",
        accent: true,
      },
    ],
  },
  comparison: {
    eyebrow: "Feature Comparison",
    title: "Training vs. building capability.",
    lead: "Training shares information. Repskill builds the skills that show up in real sales conversations.",
    columns: ["Traditional training", "Repskill"],
    rows: [
      { label: "Built from your own top performers' expertise", values: [false, true] },
      { label: "Company-specific knowledge, reviewed and approved", values: ["Partly", true] },
      { label: "Realistic practice before real conversations", values: [false, true] },
      { label: "Feedback after every practice session", values: [false, true] },
      { label: "Reflection after real meetings", values: [false, true] },
      { label: "Continuous, not a one-off event", values: [false, true] },
    ],
  },
  implementation: {
    id: "implementation",
    eyebrow: "Implementation",
    title: "From first conversation to capability.",
    steps: [
      { name: "Talk to Sales", message: "Share your goals and sales organization." },
      { name: "Capture knowledge", message: "Bring in company and expert knowledge." },
      { name: "Review & approve", message: "Build your curated Knowledge Universe." },
      { name: "Launch", message: "Roll out Learning Paths and practice scenarios." },
      { name: "Reflect & improve", message: "Build capability across the team." },
    ],
  },
  cta: {
    title: "Build Sales Capability Around Your Organization.",
    body: "Pricing tailored to your organization's needs. Tell us about your team and goals.",
    cta: "Talk to Sales",
  },
};
