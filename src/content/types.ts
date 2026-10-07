/** Tipe data konten bersama. Halaman dibangun dari data ini, bukan teks yang ditulis langsung di komponen. */
import type { StaticImageData } from "next/image";

export type Link = { label: string; href: string };

export type Status = "done" | "now" | "todo" | "none";

/** Ilustrasi mockup UI produk (lihat docs/design-system/08-imagery.md). */
export type MockupData =
  | {
      type: "chat";
      title: string;
      meta?: string;
      messages: { side: "left" | "right"; label: string; text: string }[];
      chips?: { text: string; tone: "good" | "next" }[];
    }
  | {
      type: "checklist";
      title: string;
      meta?: string;
      /** 0–100 */
      progress?: number;
      items: { label: string; meta: string; status: Status }[];
    }
  | {
      type: "bars";
      title: string;
      meta?: string;
      items: { label: string; value: number; tone: "strength" | "gap"; tag: string }[];
      note?: { label: string; text: string };
    }
  | { type: "knowledge-universe"; center?: string }
  | { type: "governance"; title: string; items: { label: string; meta: string; status: Status }[] }
  | { type: "quote"; role: string; parts: { text: string; highlight?: boolean }[]; tags: string[] }
  | { type: "structure"; title: string; status: string; fields: { label: string; value: string }[] }
  | {
      /** Rekaman layar produk (MP4 di `public/media/`, diputar otomatis tanpa suara, berulang) */
      type: "video";
      /** Path di `public/`, tanpa basePath, mis. "/media/reflection-studio.mp4" */
      src: string;
      poster: StaticImageData;
      width: number;
      height: number;
      /** Deskripsi isi video untuk pembaca layar */
      label: string;
    };

export type PageHeroData = {
  eyebrow: string;
  title: string;
  /** Frasa di dalam `title` yang diwarnai oranye */
  highlight?: string;
  lead: string;
  primary?: Link;
  secondary?: Link;
  visual?: MockupData;
};

export type FeatureBlockData = {
  id?: string;
  eyebrow: string;
  title: string;
  body: string;
  points?: string[];
  link?: Link;
  visual: MockupData;
};

/** CTA penutup (`FinalCta`). `primary` default ke `primaryCta` (Book Demo). */
export type CtaData = {
  eyebrow?: string;
  title: string;
  /** Frasa di dalam `title` yang diwarnai oranye */
  highlight?: string;
  body: string;
  primary?: Link;
  secondary?: Link;
};

export type Step = { name: string; message: string; tag?: string; href?: string };

export type StepsData = {
  id?: string;
  eyebrow: string;
  title: string;
  body?: string;
  steps: Step[];
  note?: string;
};
