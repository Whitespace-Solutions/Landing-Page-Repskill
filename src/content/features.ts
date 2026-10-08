/** Konten halaman fitur, urut alur produk: Capture Knowledge → Learn Knowledge → Practice. */
import type { StaticImageData } from "next/image";
import capturePortrait from "@/assets/images/cta/capture-portrait.webp";
import learnPortrait from "@/assets/images/cta/learn-portrait.webp";
import practicePortrait from "@/assets/images/cta/practice-portrait.webp";
import addContentScreenshot from "@/assets/images/mockups/add-content.webp";
import extractionStudioScreenshot from "@/assets/images/mockups/extraction-studio.webp";
import knowledgeChatScreenshot from "@/assets/images/mockups/knowledge-chat.webp";
import knowledgeUniverseScreenshot from "@/assets/images/mockups/knowledge-universe.webp";
import learningPathScreenshot from "@/assets/images/mockups/learning-path.webp";
import reflectionStudioPoster from "@/assets/images/mockups/reflection-studio-poster.webp";
import scenarioStudioScreenshot from "@/assets/images/mockups/scenario-studio.webp";
import type { VisualCtaLayout } from "@/components/sections/shared/visual-cta";
import type { FeatureKey } from "./success-stories";
import type { CtaData, FeatureBlockData, PageHeroData } from "./types";

export const featureInfo: Record<
  FeatureKey,
  { label: string; href: string; tools: string; description: string }
> = {
  capture: {
    label: "Capture Knowledge",
    href: "/features/capture-knowledge/",
    tools: "Extraction Studio · Add Content",
    description: "Capture and structure the expertise of your best people.",
  },
  learn: {
    label: "Learn Knowledge",
    href: "/features/learn-knowledge/",
    tools: "Knowledge Universe · Chat · Learning Path",
    description: "Turn approved company knowledge into structured learning.",
  },
  practice: {
    label: "Practice",
    href: "/features/practice/",
    tools: "Scenario Studio · Reflection Studio",
    description: "Roleplay real sales situations with AI, then reflect and improve.",
  },
};

export type FeaturePage = {
  metadata: { title: string; description: string };
  hero: PageHeroData;
  sections: FeatureBlockData[];
  cta: CtaData;
  /** Foto heksagon + komposisi untuk CTA terang (`VisualCta`). Tanpa ini halaman memakai `FinalCta` gelap. */
  ctaVisual?: { image: StaticImageData; layout: VisualCtaLayout };
};

const BOOK_DEMO = { label: "Book Demo", href: "/book-demo/" };

export const practicePage: FeaturePage = {
  metadata: {
    title: "Practice — AI Sales Roleplay & Reflection",
    description:
      "Simulate realistic sales situations with AI, get feedback, and reflect on every conversation with Scenario Studio and Reflection Studio.",
  },
  hero: {
    eyebrow: "Features · Practice",
    title: "Practice Before It Matters",
    highlight: "Before It Matters",
    lead: "Simulate realistic sales situations with AI, get feedback right away, and reflect on every conversation, so your team walks into the real one prepared.",
    primary: BOOK_DEMO,
    secondary: { label: "See Scenario Studio", href: "#scenario-studio" },
    visual: {
      type: "chat",
      title: "Scenario · Pricing objection",
      meta: "Mid-market",
      messages: [
        {
          side: "left",
          label: "AI BUYER",
          text: "We already work with another vendor. Why would we change now?",
        },
        {
          side: "right",
          label: "YOU",
          text: "Fair question. What would need to be true for a change to be worth it?",
        },
        { side: "left", label: "AI BUYER", text: "Honestly, onboarding time. Our last rollout took months." },
      ],
      chips: [
        { text: "Asked an open question", tone: "good" },
        { text: "Try: quantify the impact", tone: "next" },
      ],
    },
  },
  sections: [
    {
      id: "scenario-studio",
      eyebrow: "Scenario Studio",
      title: "Practice real sales conversations before they happen",
      body: "Rehearse against an AI buyer trained on your own playbooks. Build a scenario for an upcoming meeting, or practice ready-made scenarios your team has approved.",
      points: [
        "Set up a real meeting with its objective, buyer, and context",
        "Practice live in your own voice, or flip roles and hear how a top rep handles your toughest objections",
        "Learn from top performers with a demo call and a sales mentor podcast",
      ],
      visual: {
        type: "screenshot",
        image: scenarioStudioScreenshot,
        alt: "Repskill Scenario Studio: rehearse the conversation that matters against an AI buyer trained on your own playbooks, with Create Scenario for a specific real meeting and Library Mode for ready-made team scenarios approved by your content team.",
      },
    },
    {
      id: "reflection-studio",
      eyebrow: "Reflection Studio",
      title: "Turn every sales experience into an opportunity to improve",
      body: "Reflect after practice and after real meetings. Understand strengths and gaps, and leave every reflection with a clear next action.",
      points: [
        "Guided reflection while the conversation is fresh",
        "A clear, encouraging view of strengths and gaps",
        "Strong reflections can become new best practices after review",
      ],
      visual: {
        type: "video",
        src: "/media/reflection-studio.mp4",
        poster: reflectionStudioPoster,
        width: 1112,
        height: 536,
        label:
          "Screen recording of Repskill Reflection Studio: choosing the recording type and uploading a meeting recording for reflection.",
      },
    },
  ],
  ctaVisual: { image: practicePortrait, layout: "practice" },
  cta: {
    eyebrow: "Get Started",
    title: "Give Your Team a Safe Place to Practice",
    highlight: "Practice",
    body: "See how Repskill helps your sales team rehearse, reflect, and improve before the conversations that matter.",
    secondary: { label: "View Pricing", href: "/pricing/" },
  },
};

export const capturePage: FeaturePage = {
  metadata: {
    title: "Capture Knowledge — Extraction Studio",
    description:
      "Extract company and top-performer knowledge, structure it, and prepare it for review and use across the organization.",
  },
  hero: {
    eyebrow: "Features · Capture Knowledge",
    title: "Capture the Expertise Behind Your Best Sales Performance",
    highlight: "Best Sales Performance",
    lead: "Extract company and top-performer knowledge, structure it, and prepare it for review and use across the organization.",
    primary: BOOK_DEMO,
    secondary: { label: "See how review works", href: "#add-content" },
    visual: {
      type: "quote",
      role: "Account Executive · Enterprise",
      parts: [
        { text: "When pricing comes up early, " },
        { text: "I go back to the problem we agreed on", highlight: true },
        { text: " and " },
        { text: "confirm who else is part of the decision", highlight: true },
        { text: " before I talk numbers." },
      ],
      tags: ["Objection handling", "Decision process"],
    },
  },
  sections: [
    {
      id: "extraction-studio",
      eyebrow: "Extraction Studio",
      title: "Turn what top performers know into structured knowledge",
      body: "Capture real approaches in the words of the people who use them, then extract and structure the practices behind strong performance.",
      points: [
        "Capture from top performers, company knowledge, and field insights",
        "Extract the specific practices behind strong performance",
        "Structure expertise so it can power learning and practice",
      ],
      visual: {
        type: "screenshot",
        image: extractionStudioScreenshot,
        alt: "Repskill Extraction Studio: an AI-assisted interview that pulls tacit knowledge out of top performers, with a choice between a Free-form Interview and a Context-driven Interview and a Start interview panel.",
      },
    },
    {
      id: "add-content",
      eyebrow: "Add Content",
      title: "Add knowledge. Review it. Approve it",
      body: "Bring in company materials and new best practices. Nothing reaches your team until it has been reviewed, curated, and approved.",
      points: [
        "Add product, process, and positioning materials",
        "Review and curation by your content managers",
        "Only approved content joins the Knowledge Universe",
      ],
      visual: {
        type: "screenshot",
        image: addContentScreenshot,
        alt: "Repskill Add Content: turn any source into content your team uses in three steps, pick type, upload, and review, choosing between a Document and a Video Learning.",
      },
    },
  ],
  ctaVisual: { image: capturePortrait, layout: "capture" },
  cta: {
    eyebrow: "Get Started",
    title: "Make Your Best People's Expertise Scalable",
    highlight: "Scalable",
    body: "See how Repskill captures what your top performers know and turns it into knowledge your whole team can use.",
    secondary: { label: "Next: Learn Knowledge", href: "/features/learn-knowledge/" },
  },
};

export const learnPage: FeaturePage = {
  metadata: {
    title: "Learn Knowledge — Knowledge Universe & Learning Path",
    description:
      "One curated source of company knowledge, an AI chat grounded in it, and structured learning paths that build real sales skills.",
  },
  hero: {
    eyebrow: "Features · Learn Knowledge",
    title: "Turn Knowledge Into Learning People Can Build On",
    highlight: "Learning",
    lead: "Give your team one curated source of company knowledge, and structured ways to learn from it.",
    primary: BOOK_DEMO,
    secondary: { label: "Explore the Knowledge Universe", href: "#knowledge-universe" },
    visual: {
      type: "checklist",
      title: "Learning Path · Discovery fundamentals",
      meta: "4 modules",
      progress: 55,
      items: [
        { label: "Know your buyer", meta: "Done", status: "done" },
        { label: "Ask better discovery questions", meta: "Done", status: "done" },
        { label: "Handle early pricing questions", meta: "In progress", status: "now" },
        { label: "Practice: discovery call scenario", meta: "Next", status: "todo" },
      ],
    },
  },
  sections: [
    {
      id: "knowledge-universe",
      eyebrow: "Knowledge Universe",
      title: "One curated knowledge foundation, built around your business",
      body: "Company knowledge, product knowledge, sales expertise, and best practices, reviewed and approved before it powers learning, practice, and coaching.",
      points: [
        "Company-specific, not generic content",
        "Reviewed and approved before it is used",
        "Powers Learning Paths, Scenario Studio, and Reflection Studio",
      ],
      visual: {
        type: "screenshot",
        image: knowledgeUniverseScreenshot,
        alt: "Repskill Knowledge Universe: 49 resources with a knowledge base search, filters for SOPs, non-SOPs, and bookmarks, and article cards such as executive sponsor alignment at a mid-market logistics company.",
      },
    },
    {
      id: "chat",
      eyebrow: "Knowledge Chat",
      title: "Turn company knowledge into instant sales guidance",
      body: "Knowledge Chat gives reps reliable answers grounded in your company's approved knowledge, so they can prepare, respond, and sell with confidence.",
      points: [
        "Find the right answer in seconds",
        "Ask a specialist for negotiation, pitch, and ROI guidance",
        "Keep every conversation consistent with approved knowledge",
      ],
      visual: {
        type: "screenshot",
        image: knowledgeChatScreenshot,
        alt: "Repskill Knowledge Chat: ask anything about your sales knowledge, with specialists such as Negotiation Coach, Pitch Mentor, and ROI Advisor, and suggested questions like how to respond when a buyer says you are 20% more expensive.",
      },
    },
    {
      id: "learning-path",
      eyebrow: "Learning Path",
      title: "Structured learning journeys that build real skills",
      body: "Organize knowledge into modules that build on each other, each connected to a practice scenario, so learning turns into capability.",
      points: [
        "Modules built from approved company knowledge",
        "Each module connects to a practice scenario",
        "Progress shows how skills build over time",
      ],
      visual: {
        type: "screenshot",
        image: learningPathScreenshot,
        alt: "Repskill Learning Path: a company and product onboarding path with a progress bar, a Start the next item button, and modules such as How we work with reading items.",
      },
    },
  ],
  ctaVisual: { image: learnPortrait, layout: "learn" },
  cta: {
    eyebrow: "Get Started",
    title: "Build Learning Around Your Own Expertise",
    highlight: "Your Own Expertise",
    body: "See how Repskill turns your company knowledge into learning your sales team can build on.",
    secondary: { label: "Next: Practice", href: "/features/practice/" },
  },
};
