/** Konten halaman Home. Teks dipisah dari komponen agar mudah diganti tanpa menyentuh layout. */
import type { StaticImageData } from "next/image";
import captureImage from "@/assets/images/hero/capture-woman.png";
import captureAddContentShot from "@/assets/images/mockups/capture-add-content.webp";
import captureContentApprovalShot from "@/assets/images/mockups/capture-content-approval.webp";
import captureExtractionShot from "@/assets/images/mockups/capture-extraction-studio.webp";
import learnAiChatShot from "@/assets/images/mockups/learn-ai-chat.webp";
import learnKnowledgeUniverseShot from "@/assets/images/mockups/learn-knowledge-universe.webp";
import learnLearningPathShot from "@/assets/images/mockups/learn-learning-path.webp";
import practiceReflectionStudioShot from "@/assets/images/mockups/practice-reflection-studio.webp";
import practiceScenarioReadyShot from "@/assets/images/mockups/practice-scenario-ready.webp";
import practiceScenarioStudioShot from "@/assets/images/mockups/practice-scenario-studio.webp";
import learnImage from "@/assets/images/hero/learn-man.png";
import practiceImage from "@/assets/images/hero/practice-woman.png";
import type { CarouselShot } from "@/components/mockups/screenshot-carousel";
import type { DuoIconName } from "@/components/ui/duo-icon";
import type { FeatureIconName } from "@/components/ui/feature-icon";
import type { FeatureKey } from "./success-stories";
import type { CtaData } from "./types";

export const heroHeadline = {
  /** Baris pertama, lalu kata yang selalu satu baris dengan kata bergantian (mulai layar xl) */
  lead: "Make Sales",
  lastWord: "Expertise",
  /** Kata oranye yang bergantian tanpa henti; kata pertama dibaca pembaca layar dan tampil saat "reduce motion". */
  rotatingWords: ["Scalable", "Accessible", "Actionable", "Measurable"],
};

/** Foto + kartu keterangan di ilustrasi hero Home (urutan baku Capture → Learn → Practice). */
export const heroPersonas: { icon: FeatureIconName; title: string; body: string; image: StaticImageData }[] =
  [
    { icon: "capture", title: "Capture", body: "Collect trusted sales knowledge", image: captureImage },
    { icon: "learn", title: "Learn", body: "Personalized AI coaching", image: learnImage },
    { icon: "practice", title: "Practice", body: "Real scenarios and feedback", image: practiceImage },
  ];

export const clientsSection = {
  eyebrow: "Our Clients",
  title: "Trusted by sales teams building capability",
};

/** Section masalah (sales deck, slide 2–4): tiga hal yang rusak + kenapa cara biasa tidak menempel. */
export const problemSection = {
  eyebrow: "The Problem",
  title: "The gap between top reps and the rest is costing you sales",
  highlight: "costing you sales",
  lead: "Top reps close deals, but winning skills are hard to share, so the rest of the team learns slowly on real customers.",
  pains: [
    {
      icon: "ramp",
      title: "Slow to learn",
      body: "New reps need months to get good, and every week costs deals.",
    },
    {
      icon: "pitch",
      title: "Mixed messages",
      body: "Same product, but customers hear a different story from each rep.",
    },
    {
      icon: "walkout",
      title: "Skills walk out",
      body: "When a top rep leaves, their know-how leaves too.",
    },
  ] satisfies { icon: DuoIconName; title: string; body: string }[],
  fixesLabel: "WHY THE USUAL FIXES FAIL",
  fixes: [
    { label: "Classroom training", verdict: "Easy to forget and hard to use." },
    { label: "Roleplay with coworkers", verdict: "Awkward, rare, and never scored." },
    { label: "Generic AI", verdict: "Sounds smart but doesn't know the business." },
  ],
  closing: {
    text: "Selling is a skill, and you get better by practice, not by reading more.",
    highlight: "practice",
  },
};

/** Jawaban atas section The Problem: satu platform Capture → Learn → Practice & Reflect. */
export const solutionSection = {
  eyebrow: "The Solution",
  /** Mulai layar `lg` tepat dua baris: `\n` memisah baris, `singleLineTitle` (di `Solution`) menjaga tiap baris utuh */
  title: "Meet Repskill the One Platform to Capture,\nLearn, and Practice",
  highlight: "Repskill",
  lead: "A flight simulator for your sales team, built on your own playbook. Capture what your best people know, learn it, then practice and reflect until it sticks.",
  /** Screenshot yang berganti di tiap kartu, urut sesuai baris alat kartu itu (`featureInfo[key].tools`) */
  shots: {
    capture: [
      {
        image: captureExtractionShot,
        alt: "Repskill Extraction Studio: choose a free-form or context-driven AI interview with a top performer.",
      },
      {
        image: captureAddContentShot,
        alt: "Repskill Add Content: turn any source into content your team uses, in three steps: pick type, upload, review.",
      },
      {
        image: captureContentApprovalShot,
        alt: "Repskill Content Approval: Knowledge Universe and Scenario Library items pending review, with content gaps and conflicting content.",
      },
    ],
    learn: [
      {
        image: learnKnowledgeUniverseShot,
        alt: "Repskill Knowledge Universe: search the knowledge base and pick up where you left off.",
      },
      {
        image: learnAiChatShot,
        alt: "Repskill AI Chat: an answer grounded in your Knowledge Universe, with sources and match confidence.",
      },
      {
        image: learnLearningPathShot,
        alt: "Repskill Learning Path: a required Objection Handling path assigned by your manager, with progress.",
      },
    ],
    practice: [
      {
        image: practiceScenarioStudioShot,
        alt: "Repskill Scenario Studio: create a scenario for a real meeting, or practice ready-made team scenarios.",
      },
      {
        image: practiceScenarioReadyShot,
        alt: "Repskill scenario ready: practice the sales call live, challenge an AI top rep, or learn from a demo call and podcast.",
      },
      {
        image: practiceReflectionStudioShot,
        alt: "Repskill Reflection Studio: choose the recording type, such as a sales presentation or coaching session, then upload the file.",
      },
    ],
  } satisfies Record<FeatureKey, CarouselShot[]>,
};

/** Pembeda (sales deck, slide 23 & 26): dibangun untuk Indonesia, tata kelola kelas enterprise. */
export const differentiators = {
  eyebrow: "Why Repskill",
  title: "Built for Indonesia and governed for enterprise",
  highlight: "Indonesia",
  lead: "Reps practice when it feels safe, and managers trust what the AI says. Both are designed in from the start.",
  columns: [
    {
      kicker: "NOT TRANSLATED. BUILT.",
      items: [
        {
          title: "Bahasa-native voices",
          body: "Buyers speak natural Indonesian and address your rep as Pak or Bu.",
        },
        {
          title: "Bilingual end to end",
          body: "English and Bahasa Indonesia across screens, buyer voices, and reports.",
        },
        {
          title: "Voice-first practice",
          body: "A live spoken conversation with the buyer, not a text quiz.",
        },
        {
          title: "Your company's voice",
          body: "Describe the company once. Every AI feature sells your real products, your way.",
        },
      ],
    },
    {
      kicker: "YOUR KNOWLEDGE STAYS YOURS.",
      items: [
        {
          title: "A separate store per company",
          body: "Each company's knowledge lives in its own isolated store, not just filtered.",
        },
        {
          title: "Approval gates the AI",
          body: "Unapproved content never appears in any answer, roleplay, or score.",
        },
        {
          title: "Guardrails, roles, and secure sign-in",
          body: "Set what the AI must never say, combine five roles, and sign in with Google or Microsoft and two-factor authentication.",
        },
        {
          title: "Practice stays private",
          body: "No role can listen to practice recordings, not even an admin.",
        },
      ],
    },
  ],
};

export const caseStudiesSection = {
  eyebrow: "Success Stories",
  title: "See Expertise Become Capability",
  lead: "See how organizations use Repskill to capture knowledge, build skills, and improve sales capability.",
  action: { label: "View Success Stories", href: "/success-stories/" },
};

export const homeCta: CtaData = {
  eyebrow: "Get Started",
  title: "Make Your Sales Expertise Scalable",
  highlight: "Scalable",
  body: "See how Repskill can help turn your organization's expertise into capability your whole sales team can build.",
  secondary: { label: "View Pricing", href: "/pricing/" },
};
