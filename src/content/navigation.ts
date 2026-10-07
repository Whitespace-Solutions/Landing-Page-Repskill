/**
 * Struktur navigasi situs — satu sumber untuk header, footer, dan sitemap.
 * Mengikuti sitemap baru (Oktober 2026).
 */
import type { FeatureIconName } from "@/components/ui/feature-icon";
import { guideRoutes } from "./guide";
import { successStories } from "./success-stories";

export type NavLink = {
  label: string;
  href: string;
  description?: string;
  /** Label kecil di atas judul, mis. "PRACTICE" */
  kicker?: string;
  /** Ikon di sub menu (lihat `FeatureIcon`) */
  icon?: FeatureIconName;
};

export type NavItem = NavLink & {
  children?: NavLink[];
  /** Tautan ringkasan di bagian bawah dropdown */
  overview?: NavLink;
  /** `row`: sub menu dropdown desktop berjajar ke samping (satu baris), bukan bertumpuk ke bawah */
  layout?: "row";
};

// Urutan baku alur produk: Capture → Learn → Practice.
export const features: NavLink[] = [
  {
    kicker: "CAPTURE",
    icon: "capture",
    label: "Capture Knowledge",
    href: "/features/capture-knowledge/",
    description: "Capture and structure the expertise of your best people.",
  },
  {
    kicker: "LEARN",
    icon: "learn",
    label: "Learn Knowledge",
    href: "/features/learn-knowledge/",
    description: "Turn approved company knowledge into structured learning.",
  },
  {
    kicker: "PRACTICE & REFLECT",
    icon: "practice",
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

/**
 * Login ke aplikasi Repskill. Alamatnya diatur lewat env `NEXT_PUBLIC_LOGIN_URL`
 * (GitHub: Settings → Secrets and variables → Actions → Variables → `LOGIN_URL`).
 */
export const loginLink: NavLink = {
  label: "Log in",
  href: process.env.NEXT_PUBLIC_LOGIN_URL || "/book-demo/",
};

export const mainNav: NavItem[] = [
  { label: "Features", href: "/features/", children: features, layout: "row" },
  // Tanpa dropdown: daftar klien tampil sebagai kartu di halaman /success-stories/.
  { label: "Success Stories", href: "/success-stories/" },
  { label: "Pricing", href: "/pricing/" },
  { label: "About Us", href: "/about/" },
  { label: "Guide", href: "/guide/" },
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
      { label: "Guide", href: "/guide/" },
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
  ...guideRoutes,
];
