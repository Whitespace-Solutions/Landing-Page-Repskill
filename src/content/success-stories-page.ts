/** Konten halaman induk /success-stories/. Data tiap klien ada di success-stories.ts. */
import type { CtaData, Link, PageHeroData } from "./types";

export const successStoriesPage: {
  hero: PageHeroData;
  clients: { eyebrow: string; title: string };
  caseStudies: { eyebrow: string; title: string; lead: string };
  cta: CtaData;
  /** Halaman detail tiap klien (/success-stories/<slug>/), format artikel */
  detail: {
    back: Link;
    tocLabel: string;
    /** Judul tiap bagian artikel; `{name}` diganti nama klien */
    sections: { about: string; challenge: string; help: string; result: string };
    aside: { title: string; cta: Link };
    /** Banner CTA bergradasi oranye di bawah artikel */
    banner: { title: string; cta: Link };
  };
} = {
  hero: {
    eyebrow: "Success Stories",
    title: "See Expertise Become Capability",
    highlight: "Capability",
    lead: "See how organizations turn the expertise of their best people into capability across the sales team with Repskill.",
    primary: { label: "Book Demo", href: "/book-demo/" },
    secondary: { label: "Read the stories", href: "#case-studies" },
  },
  clients: { eyebrow: "Our Clients", title: "Sales teams building capability with Repskill." },
  caseStudies: {
    eyebrow: "Case Studies",
    title: "Every story follows the same journey",
    lead: "From the expertise challenge, through the Repskill approach, to verified outcomes.",
  },
  cta: {
    eyebrow: "Get Started",
    title: "See What Repskill Could Do for Your Organization",
    highlight: "Your Organization",
    body: "Tell us a little about your organization and what you'd like to improve.",
    secondary: { label: "View Pricing", href: "/pricing/" },
  },
  detail: {
    back: { label: "Back", href: "/success-stories/" },
    tocLabel: "Table of contents",
    sections: {
      about: "About {name}",
      challenge: "The Challenge",
      help: "How Repskill Helped",
      result: "Results at a Glance",
    },
    aside: { title: "Want to see Repskill in action?", cta: { label: "Book Demo", href: "/book-demo/" } },
    banner: {
      title: "See how Repskill can make your team's sales expertise scalable.",
      cta: { label: "Book Demo", href: "/book-demo/" },
    },
  },
};
