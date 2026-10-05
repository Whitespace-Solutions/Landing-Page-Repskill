/** Tipe data konten bersama. Halaman dibangun dari data ini, bukan teks yang ditulis langsung di komponen. */

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
  | { type: "structure"; title: string; status: string; fields: { label: string; value: string }[] };

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

export type CtaData = { title: string; body: string; cta?: string; href?: string };

export type Step = { name: string; message: string; tag?: string; href?: string };

export type StepsData = {
  id?: string;
  eyebrow: string;
  title: string;
  body?: string;
  steps: Step[];
  note?: string;
};
