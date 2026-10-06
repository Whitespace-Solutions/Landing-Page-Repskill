/** Konten halaman Home. Teks dipisah dari komponen agar mudah diganti tanpa menyentuh layout. */
import type { CtaData, StepsData } from "./types";

export const clientsSection = {
  eyebrow: "Our Clients",
  title: "Trusted by sales teams building capability.",
};

export const platformOverview = {
  eyebrow: "Platform Overview",
  title: "One Platform to Capture, Learn, and Practice.",
  lead: "Repskill brings your best sales knowledge into one curated Knowledge Universe, then turns it into learning, practice, and reflection.",
};

export const howItWorks: StepsData = {
  id: "how",
  eyebrow: "How It Works",
  title: "From Expertise to Capability.",
  body: "Capture what your best people know. Turn it into learning and practice. Reflect on performance. Build capability across the team.",
  note: "A continuous cycle: reflection can surface new best practices, which return to review and the Knowledge Universe.",
  steps: [
    {
      name: "Capture",
      message: "Capture the expertise that makes your best people successful.",
      tag: "Capture Knowledge",
      href: "/features/capture-knowledge/",
    },
    {
      name: "Learn",
      message: "Turn knowledge into learning people can build on.",
      tag: "Learn Knowledge",
      href: "/features/learn-knowledge/",
    },
    {
      name: "Practice",
      message: "Practice realistic sales situations before they matter.",
      tag: "Scenario Studio",
      href: "/features/practice/#scenario-studio",
    },
    {
      name: "Reflect",
      message: "Turn every sales experience into an opportunity to improve.",
      tag: "Reflection Studio",
      href: "/features/practice/#reflection-studio",
    },
    {
      name: "Improve",
      message: "Build capability your whole sales team can use.",
      tag: "See success stories",
      href: "/success-stories/",
    },
  ],
};

export const caseStudiesSection = {
  eyebrow: "Success Stories",
  title: "See Expertise Become Capability.",
  lead: "See how organizations use Repskill to capture knowledge, build skills, and improve sales capability.",
  action: { label: "View Success Stories", href: "/success-stories/" },
};

export const homeCta: CtaData = {
  eyebrow: "Get Started",
  title: "Make Your Sales Expertise Scalable.",
  highlight: "Scalable.",
  body: "See how Repskill can help turn your organization's expertise into capability your whole sales team can build.",
  secondary: { label: "View Pricing", href: "/pricing/" },
};
