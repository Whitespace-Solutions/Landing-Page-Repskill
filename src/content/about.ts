/** Konten halaman About Us (sumber: brand guideline hal. 3–8). */
import type { CtaData, PageHeroData } from "./types";

export const aboutPage: {
  hero: PageHeroData;
  why: { eyebrow: string; title: string; body: string; flow: string[] };
  pvm: { id: string; key: string; text: string }[];
  philosophy: {
    eyebrow: string;
    title: string;
    body: string;
    archetypes: { name: string; line: string; traits: string[] }[];
    personality: { name: string; desc: string }[];
  };
  thinking: { eyebrow: string; title: string; stages: { name: string; desc: string }[] };
  cta: CtaData;
} = {
  hero: {
    eyebrow: "About Repskill",
    title: "Make Great Sales Expertise Scalable",
    highlight: "Scalable",
    lead: "Repskill turns the knowledge of your best people into skills your whole sales team can build.",
    primary: { label: "Book Demo", href: "/book-demo/" },
    secondary: { label: "How Repskill works", href: "/#how" },
  },
  why: {
    eyebrow: "Why Repskill Exists",
    title: "Great sales expertise should not remain locked inside a few top performers",
    body: "Repskill helps organizations capture, structure, practice, and scale that expertise across the team.",
    flow: ["Expertise", "Capability", "Performance"],
  },
  pvm: [
    { id: "purpose", key: "Purpose", text: "Make great sales expertise scalable." },
    {
      id: "vision",
      key: "Vision",
      text: "A world where great sales expertise can be learned, practiced, and scaled.",
    },
    {
      id: "mission",
      key: "Mission",
      text: "Help organizations capture their best sales knowledge and turn it into continuous learning, practice, and coaching.",
    },
  ],
  philosophy: {
    eyebrow: "Our Philosophy",
    title: "Mentor × Builder",
    body: "Repskill should feel like a knowledgeable mentor that helps organizations systematically build sales capability at scale.",
    archetypes: [
      {
        name: "The Mentor",
        line: "Guide people to become better at what they do.",
        traits: ["Knowledgeable", "Supportive", "Experienced", "Guiding"],
      },
      {
        name: "The Builder",
        line: "Build sales capability systematically at scale.",
        traits: ["Structured", "Scalable", "Practical", "Performance-oriented"],
      },
    ],
    personality: [
      { name: "Smart", desc: "Intelligent, knowledgeable, credible." },
      { name: "Practical", desc: "Focused on real-world application." },
      { name: "Human", desc: "Supportive technology, not robotic." },
      { name: "Confident", desc: "Professional, clear, and credible." },
      { name: "Encouraging", desc: "Improves without judgment." },
      { name: "Action-oriented", desc: "Always moves users toward the next step." },
    ],
  },
  thinking: {
    eyebrow: "How We Think About Sales Capability",
    title: "Capture expertise. Build skills. Scale capability",
    stages: [
      { name: "Capture", desc: "Extract company & top-performer knowledge." },
      { name: "Learn", desc: "Turn knowledge into structured learning." },
      { name: "Practice", desc: "Simulate realistic sales situations." },
      { name: "Reflect", desc: "Understand what happened and why." },
      { name: "Improve", desc: "Build capability across the team." },
    ],
  },
  cta: {
    eyebrow: "Get Started",
    title: "Make Your Sales Expertise Scalable",
    highlight: "Scalable",
    body: "See how Repskill can help turn your organization's expertise into capability your whole sales team can build.",
    secondary: { label: "Read Success Stories", href: "/success-stories/" },
  },
};
