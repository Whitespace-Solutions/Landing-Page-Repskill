/** Konten halaman Pricing. */
import type { StaticImageData } from "next/image";
import learnPortrait from "@/assets/images/cta/learn-portrait.webp";
import type { VisualCtaLayout } from "@/components/sections/shared/visual-cta";
import type { CtaData, FeatureBlockData, Link, PageHeroData } from "./types";

export type PricingPlan = {
  name: string;
  /** Label di atas kartu, mis. "Save 20%"; kartu dengan badge ditonjolkan (border oranye, tombol primer) */
  badge?: string;
  currency: string;
  price: string;
  period: string;
  /** Baris di bawah harga; `was` dicoret, `total` oranye tebal, lalu `text` */
  billing: { text: string; was?: string; total?: string };
  /** Boleh memakai `**tebal**` */
  features: string[];
  cta: Link;
  note: string;
};

export const pricingPage: {
  hero: PageHeroData;
  plans: { title: string; items: PricingPlan[] };
  /** Cara kerja token (data dari halaman Team tokens di platform) */
  tokens: FeatureBlockData;
  comparison: {
    eyebrow: string;
    title: string;
    lead: string;
    columns: [string, string];
    rows: { label: string; values: [boolean | string, boolean | string] }[];
  };
  cta: CtaData;
  ctaVisual: { image: StaticImageData; layout: VisualCtaLayout };
} = {
  hero: {
    eyebrow: "Pricing",
    title: "Build Sales Capability Around Your Organization",
    highlight: "Your Organization",
    lead: "One plan, two ways to pay. Every team gets the full Repskill toolkit. Pick the billing rhythm that suits you.",
    layout: "side",
  },
  plans: {
    title: "Pricing",
    items: [
      {
        name: "Monthly",
        currency: "Rp",
        price: "3.000.000",
        period: "/mth",
        billing: { text: "Billed every month. Cancel anytime." },
        features: [
          "**100,000** tokens per month",
          "Up to **15** team members",
          "Knowledge Universe & Learning Path",
          "Role Play & Reflection Studio",
          "Standard chat and email support",
        ],
        cta: { label: "Get started", href: "/book-demo/" },
        note: "14-day free trial · no card required",
      },
      {
        name: "Annual",
        badge: "Save 20%",
        currency: "Rp",
        price: "2.400.000",
        period: "/mth",
        billing: { was: "Rp 36.000.000", total: "Rp 28.800.000", text: "billed once a year" },
        features: [
          "Everything in Monthly, plus:",
          "**1,300,000** tokens per year **+ rollover**",
          "**Unlimited** team members",
          "Team Dashboard & usage analytics",
          "Priority support & onboarding call",
        ],
        cta: { label: "Get started", href: "/book-demo/" },
        note: "14-day free trial · no card required",
      },
    ],
  },
  tokens: {
    id: "tokens",
    eyebrow: "Tokens",
    title: "One token balance for your whole team",
    body: "Tokens power everything your team does in Repskill, from roleplay practice to Chat and Reflection Studio. Admins see the balance, set limits, and know exactly where tokens go.",
    points: [
      "One shared balance, always shown with its rupiah value",
      "Top up anytime at Rp 10.000 per 1,000 tokens",
      "Set a monthly team limit and track usage against it",
      "See where tokens go, and how long your balance will last",
    ],
    visual: {
      type: "token-usage",
      title: "Where tokens go",
      meta: "October 2026, by area",
      items: [
        { label: "Practice (roleplay)", tokens: "6,051", share: 74 },
        { label: "Scenario Studio", tokens: "890", share: 11 },
        { label: "Chat", tokens: "781", share: 10 },
        { label: "Reflection Studio", tokens: "199", share: 2 },
        { label: "Content", tokens: "179", share: 2 },
        { label: "Other areas", tokens: "60", share: 1 },
      ],
      action: "See usage details",
    },
  },
  comparison: {
    eyebrow: "Feature Comparison",
    title: "Training vs. building capability",
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
  cta: {
    eyebrow: "Get Started",
    title: "Build Sales Capability Around Your Organization",
    highlight: "Your Organization",
    body: "Tell us about your team and goals.",
    primary: { label: "Talk to Sales", href: "/book-demo/" },
    secondary: { label: "Read Success Stories", href: "/success-stories/" },
  },
  ctaVisual: { image: learnPortrait, layout: "learn" },
};
