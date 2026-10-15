/** Konten halaman Pricing. */
import type { StaticImageData } from "next/image";
import learnPortrait from "@/assets/images/cta/learn-portrait.webp";
import type { VisualCtaLayout } from "@/components/sections/shared/visual-cta";
import type { CtaData, Link, PageHeroData } from "./types";

export type PricingPlan = {
  /** Label kecil di atas nama, mis. "Subscription" */
  eyebrow: string;
  name: string;
  /** Chip di samping nama, mis. "Recommended"; kartu dengan badge memakai tombol primer */
  badge?: string;
  currency: string;
  price: string;
  period: string;
  /** Baris di bawah harga; `was` dicoret, `total` tebal, lalu `text` */
  billing: { text: string; was?: string; total?: string };
  /** Baris hemat oranye di bawah billing, mis. "You save Rp 7.200.000 a year" */
  savings?: string;
  /** Boleh memakai `**tebal**` */
  features: string[];
  cta: Link;
  note: string;
};

/** Kartu ketiga: beli token tambahan sekali bayar, pilih salah satu paket (radio). */
export type TokenAddOn = {
  eyebrow: string;
  title: string;
  body: string;
  /** Harga per token, sama untuk semua paket; tampil sekali di bawah deskripsi */
  rate: string;
  options: { tokens: string; price: string }[];
  /** `{tokens}` diganti jumlah token paket yang dipilih */
  ctaLabel: string;
  href: string;
  note: string;
};

export const pricingPage: {
  hero: PageHeroData;
  plans: { title: string; includedLabel: string; items: PricingPlan[]; addOn: TokenAddOn };
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
    includedLabel: "What's included",
    items: [
      {
        eyebrow: "Subscription",
        name: "Monthly",
        currency: "Rp",
        price: "3.000.000",
        period: "/mth",
        billing: { text: "Billed every month" },
        features: [
          "**100,000** tokens per month",
          "Up to **15** team members",
          "Knowledge Universe & Learning Path",
          "Role Play & Reflection Studio",
          "Standard chat and email support",
        ],
        cta: { label: "Choose Monthly", href: "/book-demo/" },
        note: "Billed in rupiah. Prices before PPN.",
      },
      {
        eyebrow: "Subscription",
        name: "Annual",
        badge: "Recommended",
        currency: "Rp",
        price: "2.400.000",
        period: "/mth",
        billing: { was: "Rp 36.000.000", total: "Rp 28.800.000", text: "billed once a year" },
        savings: "You save Rp 7.200.000 a year",
        features: [
          "**1,300,000** tokens per year **+ rollover**",
          "Everything in Monthly, plus:",
          "**Unlimited** team members",
          "Team Dashboard & usage analytics",
          "Priority support & onboarding call",
        ],
        cta: { label: "Choose Annual", href: "/book-demo/" },
        note: "Billed in rupiah. Prices before PPN.",
      },
    ],
    addOn: {
      eyebrow: "Add-on",
      title: "Need more tokens?",
      body: "Tokens land in your balance as soon as the payment is recorded. Unused tokens carry over.",
      rate: "Rp 10.000 per 1,000 tokens",
      options: [
        { tokens: "50,000", price: "Rp 500.000" },
        { tokens: "100,000", price: "Rp 1.000.000" },
        { tokens: "500,000", price: "Rp 5.000.000" },
      ],
      ctaLabel: "Buy {tokens} tokens",
      href: "/book-demo/",
      note: "Prices before PPN. Pay once, no subscription.",
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
