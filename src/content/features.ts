/** Konten halaman fitur, urut alur produk: Capture Knowledge → Learn Knowledge → Practice. */
import type { StaticImageData } from "next/image";
import capturePortrait from "@/assets/images/cta/capture-portrait.webp";
import learnPortrait from "@/assets/images/cta/learn-portrait.webp";
import practicePortrait from "@/assets/images/cta/practice-portrait.webp";
import captureAddContentPoster from "@/assets/images/mockups/capture-add-content-poster.webp";
import captureContentManagerPoster from "@/assets/images/mockups/capture-content-manager-poster.webp";
import captureExtractionStudioPoster from "@/assets/images/mockups/capture-extraction-studio-poster.webp";
import learnAiChatPoster from "@/assets/images/mockups/learn-ai-chat-poster.webp";
import learnKnowledgeUniversePoster from "@/assets/images/mockups/learn-knowledge-universe-poster.webp";
import learnLearningPathPoster from "@/assets/images/mockups/learn-learning-path-poster.webp";
import practiceReflectionStudioPoster from "@/assets/images/mockups/practice-reflection-studio-poster.webp";
import practiceScenarioStudioPoster from "@/assets/images/mockups/practice-scenario-studio-poster.webp";
import practiceTeamDashboardPoster from "@/assets/images/mockups/practice-team-dashboard-poster.webp";
import practiceYouVsAiPoster from "@/assets/images/mockups/practice-you-vs-ai-poster.webp";
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
    tools: "Extraction Studio · Add Content · Content Manager",
    description: "Capture and structure the expertise of your best people.",
  },
  learn: {
    label: "Learn Knowledge",
    href: "/features/learn-knowledge/",
    tools: "Knowledge Universe · AI Chat · Learning Path",
    description: "Turn approved company knowledge into structured learning.",
  },
  practice: {
    label: "Practice",
    href: "/features/practice/",
    tools: "Scenario Studio · Reflection Studio · Team Dashboard",
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

export const practicePage: FeaturePage = {
  metadata: {
    title: "Practice — AI Sales Roleplay & Reflection",
    description:
      "Rehearse the meeting before it happens with an AI buyer that knows your products, review the real one after it happens, and score every call against your own playbook.",
  },
  hero: {
    eyebrow: "Features · Practice & Reflect",
    title: "Practice Before It Matters",
    highlight: "Before It Matters",
    lead: "Rehearse the meeting before it happens, with an AI buyer that knows your products. Review the real one after it happens. Every score traces back to your own playbook.",
    visual: {
      type: "persona-scene",
      image: practicePortrait,
      quote: {
        badge: "AI",
        kicker: "AI BUYER · IMPATIENT VP",
        role: "Renewal call · burned by us before",
        parts: [
          { text: "Last time your team delivered late. " },
          { text: "Why would this be different?", highlight: true },
        ],
        quoted: true,
        footerLabel: "COACH TIP",
        tags: ["Acknowledge first, then ask"],
      },
      popups: [
        { icon: "mic", label: "Live roleplay", text: "Voice · Bahasa Indonesia", live: true },
        { icon: "chart", label: "Scorecard ready", text: "Opening · 3 of 4 met" },
      ],
    },
  },
  sections: [
    {
      id: "scenario-studio",
      eyebrow: "Scenario Studio",
      title: "Turn any sales meeting into a practice scenario",
      body: "Describe the meeting in a sentence or two. AI sets the buyer, goal, and script.",
      points: [
        "Pick the buyer persona and the goal of the call",
        "Rewrite the script in one click",
        "Or pick a ready-made, team-approved scenario",
      ],
      visual: {
        type: "video",
        src: "/media/practice-scenario-studio.mp4",
        poster: practiceScenarioStudioPoster,
        width: 1280,
        height: 720,
        label:
          "Screen recording of Repskill Scenario Studio: describing a product demo meeting, choosing a skeptical CFO buyer persona, and getting a ready scenario.",
      },
    },
    {
      id: "you-vs-ai",
      eyebrow: "You vs AI",
      title: "Practice the call live with an AI buyer before it counts",
      body: "You play the rep. The AI plays a believable buyer who pushes back, then scores the call on your playbook.",
      points: [
        "Practice out loud in Bahasa Indonesia or English",
        "Buyers know your playbooks, not the grading rules",
        "Flip roles or hear an AI top rep run the call",
        "Get scored on your rubric and see what to say next",
      ],
      visual: {
        type: "video",
        src: "/media/practice-you-vs-ai.mp4",
        poster: practiceYouVsAiPoster,
        width: 1280,
        height: 720,
        label:
          "Screen recording of Repskill You vs AI: starting a live practice sales call with the AI buyer, ending and scoring the session, and reviewing the transcript with what to improve.",
      },
      continued: true,
    },
    {
      id: "reflection-studio",
      eyebrow: "Reflection Studio",
      title: "Every real meeting becomes coaching",
      body: "Upload a real meeting. AI breaks it down, and weak spots become your next practice scenario.",
      points: [
        "Sales presentations: strengths, gaps, and key moments",
        "Coaching 1-on-1s: private feedback for the coach",
        "Team meetings: decisions and action items, no scores",
        "Ask the AI anything about the session",
      ],
      visual: {
        type: "video",
        src: "/media/practice-reflection-studio.mp4",
        poster: practiceReflectionStudioPoster,
        width: 1280,
        height: 720,
        label:
          "Screen recording of Repskill Reflection Studio: choosing the recording type, uploading a meeting, and reviewing a team meeting summary with topics, decisions, and action items.",
      },
    },
    {
      id: "team-dashboard",
      eyebrow: "Team Dashboard",
      title: "Know where your team really stands",
      body: "See every rep's practice count, band, and skill trend, and coach before it shows up in the pipeline.",
      points: [
        "Assign learning paths with due dates and reminders",
        "See who is improving and who has stalled",
        "Managers see ratings, never recordings or transcripts",
      ],
      visual: {
        type: "video",
        src: "/media/practice-team-dashboard.mp4",
        poster: practiceTeamDashboardPoster,
        width: 1280,
        height: 720,
        label:
          "Screen recording of Repskill Manage my team: the direct reports a supervisor assigns work to, and the roleplays the team finished, filtered by needs coaching, slipping, or improving, with ratings only.",
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
      "Interview your top performers, turn any file into review-ready content, and approve everything before your team or the AI uses it.",
  },
  hero: {
    eyebrow: "Features · Capture Knowledge",
    title: "Capture the Expertise Behind Your Best Sales Performance",
    highlight: "Best Sales Performance",
    lead: "Interview your top performers, turn any file into review-ready content, and approve everything before your team or the AI uses it.",
    visual: {
      type: "persona-scene",
      image: learnPortrait,
      quote: {
        badge: "TP",
        kicker: "TOP PERFORMER",
        quoted: true,
        footerLabel: "EXTRACTED",
        role: "Account Executive · Enterprise",
        parts: [
          { text: "When pricing comes up early, " },
          { text: "I go back to the problem we agreed on.", highlight: true },
        ],
        tags: ["Objection handling"],
      },
      popups: [
        { icon: "mic", label: "Extraction Studio", text: "Voice interview in progress", live: true },
        { icon: "document", label: "Draft article ready", text: "Sent to Content Manager for review" },
      ],
    },
  },
  sections: [
    {
      id: "extraction-studio",
      eyebrow: "Extraction Studio",
      title: "Experts talk instead of writing",
      body: "A 15 to 25 minute AI voice interview turns what your top performers know into structured content.",
      points: [
        "Free-form or topic-focused interviews",
        "AI follow-ups capture the exact words that work",
        "Supervisors can assign topics, like “too expensive”",
        "Every insight becomes a draft article for review",
      ],
      visual: {
        type: "video",
        src: "/media/capture-extraction-studio.mp4",
        poster: captureExtractionStudioPoster,
        width: 1280,
        height: 720,
        label:
          "Screen recording of Repskill Extraction Studio: choosing a free-form interview, starting a voice interview, and the AI capturing insights such as objection handling and best practices from a rep's answer.",
      },
    },
    {
      id: "add-content",
      eyebrow: "Add Content",
      title: "Drop it in and let AI draft it for you to check",
      body: "Upload what you already have. AI turns it into review-ready articles and suggests the details.",
      points: [
        "Documents, audio, and video, one by one or in bulk",
        "Audio and video get a transcript and AI summary",
        "Review every AI suggestion before you submit",
      ],
      visual: {
        type: "video",
        src: "/media/capture-add-content.mp4",
        poster: captureAddContentPoster,
        width: 1280,
        height: 720,
        label:
          "Screen recording of Repskill Add Content: uploading a sales playbook PDF, the AI preparing a draft article, and the draft becoming ready to review.",
      },
    },
    {
      id: "content-manager",
      eyebrow: "Content Manager",
      title: "Nothing goes live without review",
      body: "Every change waits for approval, hidden from your team and the AI until then.",
      points: [
        "Approve, or send back with a written reason",
        "Unanswered chat questions become content requests",
        "AI flags conflicting and outdated content",
        "Merge duplicates and keep the originals",
      ],
      visual: {
        type: "video",
        src: "/media/capture-content-manager.mp4",
        poster: captureContentManagerPoster,
        width: 1280,
        height: 720,
        label:
          "Screen recording of Repskill Manage Content: opening the Content Library of published, draft, and unpublished items, then reviewing an article with options to change its topic or type or unpublish it.",
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
      "Your playbook in one place, an AI chat that only knows your company, and learning paths that end in a test or a graded roleplay.",
  },
  hero: {
    eyebrow: "Features · Learn Knowledge",
    title: "Turn Knowledge Into Learning People Can Build On",
    highlight: "Learning",
    lead: "A knowledge base and an e-learning platform in one place: your playbook, an AI chat that only knows your company, and learning paths that end in real practice.",
    visual: {
      type: "persona-scene",
      image: capturePortrait,
      quote: {
        badge: "AI",
        kicker: "AI CHAT",
        role: "Grounded in your playbook",
        parts: [
          { text: "Open with their operational pain, then " },
          { text: "close with a dated next step.", highlight: true },
        ],
        footerLabel: "SOURCE",
        tags: ["Sales playbook · 94%"],
      },
      popups: [
        { icon: "path", label: "Learning Path", text: "Onboarding Sales · 2 of 12 done" },
        { icon: "check", label: "Test passed", text: "Product basics · 9/10" },
      ],
    },
  },
  sections: [
    {
      id: "knowledge-universe",
      eyebrow: "Knowledge Universe",
      title: "Your playbook in one place",
      body: "SOPs, playbooks, and demos in one place, so knowledge stays with the company.",
      points: [
        "Search in plain language",
        "Articles, videos, and audio by department",
        "Powers learning paths, roleplays, and scorecards",
        "Only approved content is ever visible",
      ],
      visual: {
        type: "video",
        src: "/media/learn-knowledge-universe.mp4",
        poster: learnKnowledgeUniversePoster,
        width: 1280,
        height: 720,
        label:
          "Screen recording of Repskill Knowledge Universe: searching the knowledge base, browsing 49 resources across 17 topics, and opening Content & Campaigns to filter articles and SOPs.",
      },
    },
    {
      id: "chat",
      eyebrow: "AI Chat",
      title: "Like AI Chat, but it only knows your company",
      body: "Reps ask in plain language and get answers from your approved knowledge only.",
      points: [
        "Every answer shows its sources and confidence",
        "General knowledge is clearly labeled",
        "Specialists like Negotiation Coach and ROI Advisor",
        "Speak or type in Bahasa Indonesia or English",
      ],
      visual: {
        type: "video",
        src: "/media/learn-ai-chat.mp4",
        poster: learnAiChatPoster,
        width: 1280,
        height: 720,
        label:
          "Screen recording of Repskill AI Chat: picking a suggested question about what to check before sending a contract for approval, and getting a step-by-step answer from company knowledge.",
      },
    },
    {
      id: "learning-path",
      eyebrow: "Learning Path",
      title: "What every new hire must master",
      body: "Assign a path built from your knowledge. Each module ends in a test or roleplay.",
      points: [
        "Content, tests, and graded roleplays in one path",
        "Due dates with automatic reminders",
        "Progress shows what to do next",
      ],
      visual: {
        type: "video",
        src: "/media/learn-learning-path.mp4",
        poster: learnLearningPathPoster,
        width: 1280,
        height: 720,
        label:
          "Screen recording of Repskill Learning Path: opening an Objection Handling path assigned by the manager, viewing its modules, and reading the first item with an AI summary.",
      },
    },
  ],
  ctaVisual: { image: capturePortrait, layout: "learn" },
  cta: {
    eyebrow: "Get Started",
    title: "Build Learning Around Your Own Expertise",
    highlight: "Your Own Expertise",
    body: "See how Repskill turns your company knowledge into learning your sales team can build on.",
    secondary: { label: "Next: Practice", href: "/features/practice/" },
  },
};
