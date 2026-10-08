/**
 * Success stories / case study per klien.
 * Menambah klien baru = simpan logonya di src/assets/clients/ lalu tambah satu objek di array ini → halaman /success-stories/<slug>/,
 * kartu, logo, menu, dan sitemap ikut terbuat otomatis.
 *
 * ⚠️ Semua isi di bawah masih DRAFT (template). Ganti dengan konten yang sudah disetujui klien,
 * lalu set `draft: false`. Jangan isi angka hasil yang belum terverifikasi.
 *
 * ⚠️ Angka metrik dan data profil (industry, sales team, region) di bawah adalah DUMMY (permintaan user 2026-10-08, untuk melihat layout). Ganti dengan angka yang sudah
 * disetujui klien sebelum `draft: false`.
 */
import type { StaticImageData } from "next/image";
import ascoLogo from "@/assets/clients/asco.png";
import bammsLogo from "@/assets/clients/bamms.png";
import rechargeLogo from "@/assets/clients/recharge.png";
import trilogyLogo from "@/assets/clients/trilogy.png";
import type { MockupData } from "./types";

/** Urutan baku mengikuti alur produk: Capture → Learn → Practice. */
export type FeatureKey = "capture" | "learn" | "practice";

export type SuccessStory = {
  slug: string;
  name: string;
  /** Logo resmi klien (src/assets/clients/, latar transparan & sudah di-crop) */
  logo: StaticImageData;
  industry: string;
  /** Hasil utama, tampil sebagai judul "<name>: <headline>" di halaman daftar */
  headline: string;
  /** Satu kalimat untuk kartu & teaser */
  summary: string;
  draft: boolean;
  about: {
    title: string;
    body: string;
    facts: { label: string; value: string }[];
  };
  challenge: { title: string; body: string; points: string[] };
  help: { title: string; body: string; features: FeatureKey[]; visual: MockupData };
  result: {
    title: string;
    body: string;
    metrics: { value: string; label: string }[];
    quote?: { text: string; author: string; role: string };
  };
};

/** DUMMY: [capability outcome, practice activity, business outcome] */
const dummyMetrics = (capability: string, practice: string, business: string) => [
  { value: capability, label: "Capability outcome" },
  { value: practice, label: "Practice activity" },
  { value: business, label: "Business outcome" },
];

/** DUMMY: profil klien di halaman detail (Industry · Sales team · Region) */
type DummyFacts = { industry: string; team: string; region: string };

const draftStory = (
  slug: string,
  name: string,
  logo: StaticImageData,
  headline: string,
  features: FeatureKey[],
  visual: MockupData,
  metrics: SuccessStory["result"]["metrics"],
  facts: DummyFacts,
): SuccessStory => ({
  slug,
  name,
  logo,
  industry: `${facts.industry} · ${facts.team}`,
  headline,
  summary: `How ${name} turned the expertise of its best people into capability across the sales team.`,
  draft: true,
  about: {
    title: `How ${name} made sales expertise scalable`,
    body: `Short company overview of ${name}: what it sells, who it sells to, and how its sales team is organized.`,
    facts: [
      { label: "Industry", value: facts.industry },
      { label: "Sales team", value: facts.team },
      { label: "Region", value: facts.region },
    ],
  },
  challenge: {
    title: "Expertise was concentrated in a few people",
    body: `Describe where expertise sat inside ${name} and what the wider team needed to build.`,
    points: [
      "Where best practices lived before Repskill.",
      "What made knowledge hard to transfer.",
      "Which sales situations the team needed to master.",
    ],
  },
  help: {
    title: `How Repskill helped ${name}`,
    body: "Describe which Repskill capabilities were used and how the rollout worked.",
    features,
    visual,
  },
  result: {
    title: "Outcomes, verified",
    body: "Publish verified results only. Replace the placeholders below once the client has approved them.",
    metrics,
  },
});

export const successStories: SuccessStory[] = [
  draftStory(
    "bamms",
    "bamms",
    bammsLogo,
    "Best Practices Shared Across the Team",
    ["capture", "learn"],
    {
      type: "structure",
      title: "Best practice captured",
      status: "Approved",
      fields: [
        { label: "TOPIC", value: "Handling early pricing questions" },
        { label: "SOURCE", value: "Top performer interview" },
        { label: "USED IN", value: "Learning Path · Scenario Studio" },
      ],
    },
    dummyMetrics("+32%", "4.5x", "+18%"),
    { industry: "Technology", team: "40 reps", region: "Indonesia" },
  ),
  draftStory(
    "recharge",
    "ReCharge",
    rechargeLogo,
    "Faster Capability Growth",
    ["learn", "practice"],
    {
      type: "bars",
      title: "Capability progress",
      meta: "Team average",
      items: [
        { label: "Discovery", value: 78, tone: "strength", tag: "+12" },
        { label: "Objection handling", value: 64, tone: "strength", tag: "+18" },
        { label: "Next-step commitment", value: 52, tone: "strength", tag: "+9" },
      ],
    },
    dummyMetrics("+41%", "6x", "+22%"),
    { industry: "Consumer electronics", team: "60 reps", region: "Indonesia" },
  ),
  draftStory(
    "asco",
    "ASCO",
    ascoLogo,
    "Reps Ready for Tough Conversations",
    ["capture", "practice"],
    {
      type: "chat",
      title: "Scenario · Competitor comparison",
      messages: [
        { side: "left", label: "AI BUYER", text: "Why should we switch from our current vendor?" },
        { side: "right", label: "YOU", text: "What would need to be true for a change to be worth it?" },
      ],
      chips: [{ text: "Asked an open question", tone: "good" }],
    },
    dummyMetrics("+27%", "3x", "+15%"),
    { industry: "Automotive", team: "120 reps", region: "Indonesia" },
  ),
  draftStory(
    "trilogy",
    "Trilogy",
    trilogyLogo,
    "One Consistent Sales Playbook",
    ["capture", "learn", "practice"],
    {
      type: "checklist",
      title: "Learning Path · Discovery fundamentals",
      meta: "4 modules",
      progress: 55,
      items: [
        { label: "Know your buyer", meta: "Done", status: "done" },
        { label: "Ask better discovery questions", meta: "Done", status: "done" },
        { label: "Handle early pricing questions", meta: "In progress", status: "now" },
        { label: "Practice: discovery call", meta: "Next", status: "todo" },
      ],
    },
    dummyMetrics("+35%", "5x", "+20%"),
    { industry: "Consumer goods", team: "35 reps", region: "Indonesia" },
  ),
];

export const getStory = (slug: string) => successStories.find((s) => s.slug === slug);
