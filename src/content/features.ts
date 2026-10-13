/** Konten halaman fitur, urut alur produk: Capture Knowledge → Learn Knowledge → Practice. */
import type { StaticImageData } from "next/image";
import capturePortrait from "@/assets/images/cta/capture-portrait.webp";
import learnPortrait from "@/assets/images/cta/learn-portrait.webp";
import practicePortrait from "@/assets/images/cta/practice-portrait.webp";
import addContentScreenshot from "@/assets/images/mockups/add-content.webp";
import contentManagerReviewScreenshot from "@/assets/images/mockups/content-manager-review.webp";
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
      title: "Describe the meeting. AI preps it",
      body: "Describe the meeting in a sentence or two. AI sets the buyer, goal, and script.",
      points: [
        "Edit the script in one click: more casual, more detail, or more concise",
        "Covers the whole call, from opening and discovery to objections and the close",
        "Then choose how to practice it: listen, podcast, practice, or flip roles",
        "Or pick a ready-made scenario your team has already approved",
      ],
      visual: {
        type: "screenshot",
        image: scenarioStudioScreenshot,
        alt: "Repskill Scenario Studio: rehearse the conversation that matters against an AI buyer trained on your own playbooks, with Create Scenario for a specific real meeting and Library Mode for ready-made team scenarios approved by your content team.",
      },
    },
    {
      id: "you-vs-ai",
      eyebrow: "You vs AI",
      title: "Rehearse the call before it counts",
      body: "You play the rep. The AI plays a believable buyer who pushes back, in Bahasa Indonesia or English.",
      points: [
        "Buyers are briefed from your company facts and playbooks, but never see the grading rules",
        "Flip Roles: you play the buyer, and an AI top rep shows how it's done",
        "AI vs AI: hear the whole call end to end, then try it yourself",
        "Podcast: an AI-voiced interview with a top performer on this exact scenario",
      ],
      visual: {
        type: "chat",
        title: "Practice call · Pak Budi Santoso",
        meta: "Skeptical CFO · PT Maju Logistik",
        messages: [
          {
            side: "left",
            label: "PAK BUDI",
            text: "Your price is 30% above what we pay now. Why should I even consider switching?",
          },
          {
            side: "right",
            label: "YOU",
            text: "Fair question, Pak. Before price, what is a late delivery costing you today?",
          },
          { side: "left", label: "PAK BUDI", text: "Hmm. More than I'd like to admit. Go on." },
        ],
        chips: [
          { text: "Asked before pitching", tone: "good" },
          { text: "Next: quantify the cost", tone: "next" },
        ],
      },
    },
    {
      id: "scorecard",
      eyebrow: "Session Review",
      title: "A scorecard traced to your standards",
      body: "Every call is graded on manager-approved rules from your playbook, with the transcript line as proof.",
      points: [
        "Coaching summary, full transcript, conversation flow, and analytics",
        "See exactly why you were scored that way, and what to say next time",
        "Every rule links back to the section of your playbook it came from",
        "Company facts brief the AI buyer, but never change a score",
      ],
      visual: {
        type: "bars",
        title: "Scorecard · by section",
        meta: "Cold outreach · 10 min 15 sec",
        items: [
          { label: "Opening", value: 75, tone: "strength", tag: "3 OF 4 MET" },
          { label: "Value presentation", value: 50, tone: "strength", tag: "2 OF 4 MET" },
          { label: "Need identification", value: 20, tone: "gap", tag: "1 OF 5 MET" },
          { label: "Objection handling", value: 33, tone: "gap", tag: "1 OF 3 MET" },
        ],
        note: {
          label: "WHY YOU WERE SCORED THIS WAY",
          text: "At 6:14 the buyer said “that's expensive.” At 6:20 you offered 15% off. Next time, ask: expensive compared to what?",
        },
      },
    },
    {
      id: "reflection-studio",
      eyebrow: "Reflection Studio",
      title: "Every real meeting becomes coaching",
      body: "Upload a real meeting. AI breaks it down, and weak spots become your next practice scenario.",
      points: [
        "Sales presentations: strengths, what to improve, and key moments",
        "Coaching 1-on-1s: how well the manager coached, private to the coach",
        "Team meetings: decisions, open items, owners, and due dates, with no one scored",
        "Ask the AI anything about the session",
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
    {
      id: "team-dashboard",
      eyebrow: "Team Dashboard",
      title: "Know where your team really stands",
      body: "See every rep's practice count, band, and skill trend, and coach before it shows up in the pipeline.",
      points: [
        "Assign a learning path with a graded roleplay, a due date, and automatic reminders",
        "Spot who is improving, who is steady, and who has stalled",
        "Privacy built in: managers see ratings and progress, never a practice recording or transcript",
      ],
      visual: {
        type: "team",
        title: "Team Dashboard · Roleplay review",
        meta: "Illustrative data",
        items: [
          {
            name: "Sari W.",
            meta: "14 roleplays · On track",
            band: "STRONG",
            trend: "↗ Improving",
            tone: "good",
          },
          {
            name: "Andi P.",
            meta: "11 roleplays · On track",
            band: "SOLID",
            trend: "↗ Improving",
            tone: "good",
          },
          {
            name: "Dimas K.",
            meta: "4 roleplays · Stalled",
            band: "FAIR",
            trend: "↘ Slipping",
            tone: "steady",
          },
          {
            name: "Rina S.",
            meta: "2 roleplays · Overdue",
            band: "NEEDS WORK",
            trend: "Needs coaching",
            tone: "alert",
          },
        ],
        note: "Practice recordings stay private to the rep",
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
      title: "Experts don't write. They talk",
      body: "A 15 to 25 minute AI voice interview turns what your top performers know into structured content.",
      points: [
        "Choose a free-form interview for lived experience, or a context-driven one to go deep on a topic",
        "The AI asks follow-up questions until it has the exact words and the moment to use them",
        "Supervisors can assign a topic, such as how to handle “too expensive”",
        "Every insight becomes a draft article, ready for review",
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
      title: "Drop it in. AI drafts it, you just check",
      body: "Upload what you already have. AI turns it into review-ready articles and suggests the details.",
      points: [
        "PDF, Word, text, audio, and video, one file at a time or in bulk",
        "Audio and video get a transcript, a seekable player, and an AI summary",
        "Accept or edit every AI suggestion before you submit it for approval",
      ],
      visual: {
        type: "screenshot",
        image: addContentScreenshot,
        alt: "Repskill Add Content: turn any source into content your team uses in three steps, pick type, upload, and review, choosing between a Document and a Video Learning.",
      },
    },
    {
      id: "content-manager",
      eyebrow: "Content Manager",
      title: "Nothing goes live without review",
      body: "Every change waits for approval, hidden from your team and the AI until then.",
      points: [
        "Approve and publish, or send it back with a written reason the author can see",
        "Questions the chat couldn't answer come back as content requests",
        "AI flags conflicting documents, and outdated content is assigned for renewal",
        "Merge duplicate articles while keeping the originals",
      ],
      visual: {
        type: "screenshot",
        image: contentManagerReviewScreenshot,
        alt: "Repskill Content Approval review panel: a pending item with its type, submitter, similar-content check, and body preview, with Approve & publish and a Send back button that requires a written reason the author sees.",
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
        "Ask in plain language, like “How do we handle a price objection?”",
        "Articles, videos, and audio side by side, by department",
        "The same approved knowledge powers learning paths, roleplays, and scorecards",
        "Only reviewed and approved content is ever visible",
      ],
      visual: {
        type: "screenshot",
        image: knowledgeUniverseScreenshot,
        alt: "Repskill Knowledge Universe: 49 resources with a knowledge base search, filters for SOPs, non-SOPs, and bookmarks, and article cards such as executive sponsor alignment at a mid-market logistics company.",
      },
    },
    {
      id: "chat",
      eyebrow: "AI Chat",
      title: "Like ChatGPT, but it only knows your company",
      body: "Reps ask in plain language and get answers from your approved knowledge only.",
      points: [
        "Every answer shows its sources and a confidence level, one click from the original",
        "Honest when it doesn't know: general knowledge is clearly labeled",
        "Specialists on call: Negotiation Coach, Pitch Mentor, and ROI Advisor",
        "Speak or type, with read-aloud in Bahasa Indonesia or English",
      ],
      visual: {
        type: "screenshot",
        image: knowledgeChatScreenshot,
        alt: "Repskill AI Chat: ask anything about your sales knowledge, with specialists such as Negotiation Coach, Pitch Mentor, and ROI Advisor, and suggested questions like how to respond when a buyer says you are 20% more expensive.",
      },
    },
    {
      id: "learning-path",
      eyebrow: "Learning Path",
      title: "What every new hire must master",
      body: "Assign a path built from your knowledge. Each module ends in a test or roleplay.",
      points: [
        "Articles, videos, audio, tests, and graded roleplays in one path",
        "Assigned with a due date and automatic reminders",
        "Progress shows what's done and what to start next",
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
