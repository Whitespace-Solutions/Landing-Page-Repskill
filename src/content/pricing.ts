/** Konten halaman Pricing. */
import type { StaticImageData } from "next/image";
import learnPortrait from "@/assets/images/cta/learn-portrait.webp";
import type { VisualCtaLayout } from "@/components/sections/shared/visual-cta";
import type { CtaData, Link, PageHeroData } from "./types";

export type PricingPlan = {
  /** Label kecil di kanan nama, mis. "Subscription" */
  eyebrow: string;
  name: string;
  /** Label isi gelap di kanan nama, mis. "Recommended"; paket dengan badge memakai tombol primer */
  badge?: string;
  currency: string;
  price: string;
  period: string;
  /** Baris di bawah harga; `was` dicoret, `total` tebal, lalu `text` */
  billing: { text: string; was?: string; total?: string };
  /** Baris hemat di bawah billing, mis. "You save Rp 7.200.000 a year" */
  savings?: string;
  /** Boleh memakai `**tebal**` */
  features: string[];
  cta: Link;
  note: string;
};

/** Kartu ketiga: beli credits tambahan sekali bayar, pilih salah satu paket (radio). Field `tokens` = jumlah credits. */
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
  plans: { title: string; items: PricingPlan[]; addOn: TokenAddOn };
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
        eyebrow: "Subscription",
        name: "Monthly",
        currency: "Rp",
        price: "5.000.000",
        period: "/mth",
        billing: { text: "Billed monthly" },
        features: [
          "**1,000** credits per month",
          "Up to **15** team members",
          "Knowledge Universe & Learning Path",
          "Role Play & Reflection Studio",
          "Standard chat and email support",
        ],
        cta: { label: "Choose Monthly", href: "/book-demo/" },
        note: "Prices before PPN",
      },
      {
        eyebrow: "Subscription",
        name: "Annual",
        badge: "Recommended",
        currency: "Rp",
        price: "4.050.000",
        period: "/mth",
        billing: { was: "Rp 60.000.000", total: "Rp 48.600.000", text: "billed yearly" },
        savings: "You save Rp 11.400.000 a year (19%)",
        features: [
          "**13,000** credits per year, one-twelfth to use each month",
          "Everything in Monthly, plus:",
          "Team Dashboard & usage analytics",
          "Priority support & onboarding call",
        ],
        cta: { label: "Choose Annual", href: "/book-demo/" },
        note: "Prices before PPN",
      },
    ],
    addOn: {
      eyebrow: "Add-on",
      title: "Need more credits?",
      body: "Credits land in your balance as soon as payment is recorded. Top-up credits do not expire monthly; they stay as long as your subscription is active.",
      rate: "Rp 5.000 per credit",
      options: [
        { tokens: "100", price: "Rp 500.000" },
        { tokens: "200", price: "Rp 1.000.000" },
        { tokens: "1,000", price: "Rp 5.000.000" },
      ],
      ctaLabel: "Buy {tokens} credits",
      href: "/book-demo/",
      note: "Prices before PPN",
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
