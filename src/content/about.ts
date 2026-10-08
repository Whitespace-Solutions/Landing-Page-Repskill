/** Konten halaman About Us (sumber: brand guideline hal. 3–8). */
import type { CtaData, StepsData } from "./types";

export const aboutPage: {
  /** Hero pernyataan: hanya kalimat pembuka, tanpa tombol atau visual. */
  hero: { eyebrow: string; title: string; highlight?: string; lead: string };
  why: {
    eyebrow: string;
    title: string;
    body: string;
    /** Purpose sudah menjadi judul hero, jadi di sini cukup Vision & Mission. */
    statements: { id: string; key: string; text: string }[];
  };
  philosophy: {
    eyebrow: string;
    title: string;
    body: string;
    archetypes: { name: string; line: string; traits: string[] }[];
    principles: { name: string; desc: string }[];
  };
  approach: StepsData;
  cta: CtaData;
} = {
  hero: {
    eyebrow: "About Repskill",
    title: "Make Great Sales Expertise Scalable",
    highlight: "Scalable",
    lead: "Repskill turns the knowledge of your best people into skills your whole sales team can build.",
  },
  why: {
    eyebrow: "Why Repskill Exists",
    title: "Great Sales Expertise Should Not Stay With a Few Top Performers",
    body: "Repskill helps organizations capture, structure, practice, and scale that expertise across the team.",
    statements: [
      {
        id: "vision",
        key: "Our Vision",
        text: "A world where great sales expertise can be learned, practiced, and scaled.",
      },
      {
        id: "mission",
        key: "Our Mission",
        text: "Help organizations capture their best sales knowledge and turn it into continuous learning, practice, and coaching.",
      },
    ],
  },
  philosophy: {
    eyebrow: "Our Philosophy",
    title: "Part Mentor, Part Builder",
    body: "We guide people the way a trusted coach would, and we build capability the way a good system should: structured, repeatable, and ready to scale.",
    archetypes: [
      {
        name: "The Mentor",
        line: "Help every rep get better at the conversations that matter.",
        traits: ["Knowledgeable", "Supportive", "Guiding"],
      },
      {
        name: "The Builder",
        line: "Turn that guidance into a system that scales across the team.",
        traits: ["Structured", "Scalable", "Performance-oriented"],
      },
    ],
    principles: [
      {
        name: "Grounded in Your Knowledge",
        desc: "Coaching draws on your company's reviewed and approved knowledge, not generic advice.",
      },
      {
        name: "Built for Real Sales Moments",
        desc: "Practice centers on situations reps actually face, from discovery calls to pricing objections.",
      },
      {
        name: "Supportive, Not Judgmental",
        desc: "Feedback shows the gap and how to close it, so reps keep improving with confidence.",
      },
      {
        name: "Always a Next Step",
        desc: "Every session points to what to learn or practice next.",
      },
    ],
  },
  approach: {
    id: "approach",
    eyebrow: "Our Approach",
    title: "Capture expertise. Build skills. Scale capability",
    body: "Sales capability grows through a repeatable cycle, built on a Knowledge Universe your team has reviewed and approved.",
    steps: [
      {
        name: "Capture",
        message: "Extract company and top-performer knowledge.",
        tag: "Extraction Studio",
        href: "/features/capture-knowledge/",
      },
      {
        name: "Learn",
        message: "Turn knowledge into structured learning.",
        tag: "Learning Path",
        href: "/features/learn-knowledge/",
      },
      {
        name: "Practice",
        message: "Simulate realistic sales situations.",
        tag: "Scenario Studio",
        href: "/features/practice/#scenario-studio",
      },
      {
        name: "Reflect",
        message: "Understand what happened and why.",
        tag: "Reflection Studio",
        href: "/features/practice/#reflection-studio",
      },
      { name: "Improve", message: "Build capability across the team." },
    ],
  },
  cta: {
    eyebrow: "Get Started",
    title: "Put Your Best Sales Knowledge to Work",
    highlight: "to Work",
    body: "Book a demo to see how Repskill turns what your top performers know into skills your whole team can practice.",
    secondary: { label: "Read Success Stories", href: "/success-stories/" },
  },
};
