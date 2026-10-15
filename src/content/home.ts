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
  title: "Your revenue rides on a few people",
  highlight: "a few people",
  lead: "Every sales team has a top rep everyone else depends on. Nobody can explain exactly how they do it, so the rest of the team learns on live customers. That's the most expensive classroom there is.",
  pains: [
    {
      icon: "ramp",
      title: "Ramp is slow",
      body: "New reps take months to become productive, paid for in senior time and lost deals.",
    },
    {
      icon: "pitch",
      title: "Pitch is uneven",
      body: "Same product, different story. What the customer hears depends on who picks up the phone.",
    },
    {
      icon: "walkout",
      title: "Know-how walks out",
      body: "When a top rep resigns, their playbook leaves with them. The next hire starts from zero.",
    },
  ] satisfies { icon: DuoIconName; title: string; body: string }[],
  fixesLabel: "THE USUAL FIXES DON'T STICK",
  fixes: [
    { label: "Classroom training", verdict: "Heard once. Forgotten next month." },
    { label: "Roleplay with colleagues", verdict: "Awkward, rare, and unscored." },
    { label: "Generic AI chatbot", verdict: "Doesn't know your product." },
  ],
  closing: {
    text: "Selling is a skill. Skills are built by practice, not by more content.",
    highlight: "practice",
  },
};

/** Jawaban atas section The Problem: satu platform Capture → Learn → Practice & Reflect. */
export const solutionSection = {
  eyebrow: "The Solution",
  /** Tampil satu baris mulai layar `lg` (`singleLineTitle` di `Solution`) */
  title: "Meet Repskill the One Platform to Capture, Learn, and Practice",
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
