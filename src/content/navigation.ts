/**
 * Struktur navigasi situs — satu sumber untuk header, footer, dan sitemap.
 * Mengikuti sitemap baru (Oktober 2026).
 */
import { successStories } from "./success-stories";

export type NavLink = {
  label: string;
  href: string;
  description?: string;
  /** Label kecil di atas judul, mis. "PRACTICE" */
  kicker?: string;
};

export type NavItem = NavLink & {
  children?: NavLink[];
  /** Tautan ringkasan di bagian bawah dropdown */
  overview?: NavLink;
};

// Urutan baku alur produk: Capture → Learn → Practice.
export const features: NavLink[] = [
  {
    kicker: "CAPTURE",
    label: "Capture Knowledge",
    href: "/features/capture-knowledge/",
    description: "Capture and structure the expertise of your best people.",
  },
  {
    kicker: "LEARN",
    label: "Learn Knowledge",
    href: "/features/learn-knowledge/",
    description: "Turn approved company knowledge into structured learning.",
  },
  {
    kicker: "PRACTICE & REFLECT",
    label: "Practice",
    href: "/features/practice/",
    description: "Roleplay real sales situations with AI, then reflect and improve.",
  },
];

export const stories: NavLink[] = successStories.map((s) => ({
  label: s.name,
  href: `/success-stories/${s.slug}/`,
  description: s.industry,
}));

export const primaryCta: NavLink = { label: "Book Demo", href: "/book-demo/" };

export const mainNav: NavItem[] = [
  { label: "Features", href: "/features/", children: features },
  {
    label: "Success Stories",
    href: "/success-stories/",
    children: stories,
    overview: { label: "All success stories", href: "/success-stories/" },
  },
  { label: "Pricing", href: "/pricing/" },
  { label: "About Us", href: "/about/" },
];

export const footerNav: { title: string; links: NavLink[] }[] = [
  { title: "FEATURES", links: features },
  {
    title: "SUCCESS STORIES",
    links: [{ label: "All stories", href: "/success-stories/" }, ...stories],
  },
  {
    title: "COMPANY",
    links: [
      { label: "About Us", href: "/about/" },
      { label: "Pricing", href: "/pricing/" },
    ],
  },
  { title: "GET STARTED", links: [primaryCta] },
];

/** Semua URL statis untuk sitemap.xml. Halaman success story ditambahkan otomatis. */
export const allRoutes: string[] = [
  "/",
  ...features.map((f) => f.href),
  "/success-stories/",
  ...stories.map((s) => s.href),
  "/pricing/",
  "/about/",
  "/book-demo/",
];
