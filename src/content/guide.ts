/**
 * Konten Help Center (/guide/): Admin Guide dan User Guide, plus formulir Feature Request.
 * Sumber: halaman Guide di landing Whitespace Talent (versi EN), visual ditulis ulang sebagai mockup Repskill.
 * Teks `**tebal**` dirender sebagai huruf tebal.
 */
import type { MockupData } from "./types";

export type GuideBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "steps"; items: string[] }
  | { type: "callout"; label: string; text: string }
  /** Ilustrasi layar produk: bingkai jendela aplikasi berisi mockup */
  | { type: "shot"; label: string; caption: string; visual: MockupData };

export type GuideArticle = { slug: string; title: string; blocks: GuideBlock[] };
export type GuideSection = { title: string; articles: GuideArticle[] };
export type Guide = {
  id: string;
  label: string;
  /** Untuk siapa panduan ini, tampil sebagai label kecil di kartu */
  audience: string;
  description: string;
  sections: GuideSection[];
};

export const guides: Guide[] = [
  {
    id: "admin",
    label: "Admin Guide",
    audience: "For admins",
    description: "Set up your workspace, manage people and roles, and keep your knowledge base trustworthy.",
    sections: [
      {
        title: "Getting started",
        articles: [
          {
            slug: "create-workspace",
            title: "Create your workspace",
            blocks: [
              {
                type: "p",
                text: "Your workspace is your company's private space. Everything in it, knowledge, role-plays, and call analyses, is isolated to your tenant, and the AI only ever sees your company's data.",
              },
              { type: "h2", text: "Steps" },
              {
                type: "steps",
                items: [
                  "Accept your invite and set an admin password, or sign in with **Google** or **Microsoft**.",
                  "Name the workspace and set your default language to **Bahasa Indonesia** or English.",
                  "Complete the **Tenant Profile**, seven short sections describing what you sell. This grounds every answer and role-play.",
                ],
              },
              {
                type: "callout",
                label: "Tip",
                text: "Fill the Tenant Profile once, properly. It is the single biggest lever on answer quality across the whole product.",
              },
            ],
          },
          {
            slug: "add-users-roles",
            title: "Add users and assign roles",
            blocks: [
              {
                type: "p",
                text: "You can invite people one at a time or in bulk from **User Management**, and give each person a role that decides what they can see and do.",
              },
              { type: "h2", text: "Steps" },
              {
                type: "steps",
                items: [
                  "Open **User Management** and go to the **Users** tab.",
                  "Click **Invite users** and add work emails, individually or by pasting a list.",
                  "Pick a role for each: Seller, Manager, or Content manager.",
                  "Send. Invitees set up their account and land straight in their workspace.",
                ],
              },
              {
                type: "shot",
                label: "User Management → Users",
                caption: "Invite users and assign roles",
                visual: {
                  type: "checklist",
                  title: "Users",
                  meta: "4 people · invite-only",
                  items: [
                    { label: "Rina Pratama", meta: "Manager · Joined", status: "done" },
                    { label: "Dimas Saputra", meta: "Seller · Joined", status: "done" },
                    { label: "Sari Wulandari", meta: "Content manager · Invited", status: "now" },
                    { label: "Budi Hartono", meta: "Seller · Pending", status: "todo" },
                  ],
                },
              },
              {
                type: "p",
                text: "Every invite and change is recorded in the join history, so you always know who was added and when.",
              },
            ],
          },
        ],
      },
      {
        title: "Roles & access",
        articles: [
          {
            slug: "role-model",
            title: "Understand the role model",
            blocks: [
              {
                type: "p",
                text: "Access is role-based by design. A seller sees their own practice and private reflections; a manager sees their team's scores; a content manager owns the knowledge base. A sales user can never retrieve another department's information through chat.",
              },
              {
                type: "steps",
                items: [
                  "**Seller** — runs role-plays, asks chat, uploads their own calls. Reflections are private to them.",
                  "**Manager** — sees team scores and coaching in Manager Studio.",
                  "**Content manager** — extracts, reviews, and approves knowledge.",
                  "**Admin** — manages users, roles, and the workspace.",
                ],
              },
            ],
          },
          {
            slug: "invite-history",
            title: "Invite-only join and history",
            blocks: [
              {
                type: "p",
                text: "There is no open sign-up. People join only by invitation, which keeps your workspace closed and auditable.",
              },
              {
                type: "p",
                text: "The **join history** logs every invitation, acceptance, role change, and removal, with a timestamp. Open a member's record to edit their role or revoke access.",
              },
            ],
          },
        ],
      },
      {
        title: "Content & knowledge",
        articles: [
          {
            slug: "extract-performers",
            title: "Extract your top performers",
            blocks: [
              {
                type: "p",
                text: "The knowledge base is only as good as what your best people know. **Extraction Studio** pulls that out of their heads instead of asking them to write documents.",
              },
              { type: "h2", text: "Steps" },
              {
                type: "steps",
                items: [
                  "Open **Extraction Studio** and start an interview with a top closer.",
                  "Let the AI interviewer ask, by voice or text. It probes for the context experts don't realise they hold.",
                  "Or drag in a folder of SOPs, scripts, and decks; the platform parses and tags it.",
                  "Review the auto-tagged drafts, then send them for approval.",
                ],
              },
              {
                type: "shot",
                label: "Extraction Studio",
                caption: "AI interview + auto-tagged output",
                visual: {
                  type: "chat",
                  title: "Interview · Top performer",
                  meta: "Voice",
                  messages: [
                    {
                      side: "left",
                      label: "AI INTERVIEWER",
                      text: "When a buyer says the price is too high, what do you ask first?",
                    },
                    {
                      side: "right",
                      label: "TOP PERFORMER",
                      text: "I ask what they're comparing us to. Usually it's not price, it's scope.",
                    },
                    {
                      side: "left",
                      label: "AI INTERVIEWER",
                      text: "How do you bring the conversation back to scope?",
                    },
                  ],
                  chips: [
                    { text: "Tagged: Pricing objection", tone: "good" },
                    { text: "Ready for review", tone: "next" },
                  ],
                },
              },
            ],
          },
          {
            slug: "approve-content",
            title: "Approve content before it goes live",
            blocks: [
              {
                type: "p",
                text: "Nothing reaches sellers until a content manager approves it. This keeps the Knowledge Universe trustworthy.",
              },
              {
                type: "steps",
                items: [
                  "Open the **Content** queue to see pending drafts.",
                  "Review a draft, edit if needed, and check its tags and category.",
                  "**Approve** to publish, or **Request changes** to send it back with a note.",
                ],
              },
              {
                type: "callout",
                label: "Note",
                text: "Approved content immediately becomes answerable in chat and usable as a coaching reference.",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "user",
    label: "User Guide",
    audience: "For sales teams",
    description: "Get set up, rehearse with AI role-plays, and get private coaching on your real calls.",
    sections: [
      {
        title: "Getting started",
        articles: [
          {
            slug: "set-up-account",
            title: "Set up your account",
            blocks: [
              {
                type: "p",
                text: "You'll get an email invite from your admin. Setting up takes under a minute.",
              },
              {
                type: "steps",
                items: [
                  "Open the invite and click **Accept**.",
                  "Set a password, or continue with **Google** or **Microsoft**.",
                  "Confirm your name so your coach and manager see the right person.",
                ],
              },
            ],
          },
          {
            slug: "find-your-way",
            title: "Find your way around",
            blocks: [
              {
                type: "p",
                text: "Everything you need sits in one workspace, four surfaces that share the same knowledge.",
              },
              {
                type: "steps",
                items: [
                  "**Knowledge Chat** — ask anything and get a grounded, cited answer.",
                  "**Scenario Studio** — practice a buyer role-play.",
                  "**Reflection Studio** — upload a real call for coaching.",
                  "**Learning Path** — follow the sequence your manager set.",
                ],
              },
            ],
          },
        ],
      },
      {
        title: "Role-play",
        articles: [
          {
            slug: "start-roleplay",
            title: "Start an AI role-play",
            blocks: [
              {
                type: "p",
                text: "A role-play lets you rehearse a hard conversation out loud, against an AI that plays the buyer and pushes back like the real one will.",
              },
              { type: "h2", text: "Steps" },
              {
                type: "steps",
                items: [
                  "Open **Scenario Studio** and describe the situation, the meeting, the pressure, the deal stage.",
                  "The AI generates a realistic script tuned to it.",
                  "Switch to **voice** and practice live, in Bahasa. The AI holds the persona.",
                  "End the session to get your review.",
                ],
              },
              {
                type: "shot",
                label: "Scenario Studio",
                caption: "Live voice role-play",
                visual: {
                  type: "chat",
                  title: "Scenario · Renewal pushback",
                  meta: "Voice · Live",
                  messages: [
                    {
                      side: "left",
                      label: "AI BUYER",
                      text: "Our budget was cut this year. I'm not sure we can renew at the same level.",
                    },
                    {
                      side: "right",
                      label: "YOU",
                      text: "Understood. Which results from this year matter most to keep?",
                    },
                    {
                      side: "left",
                      label: "AI BUYER",
                      text: "Onboarding speed for new hires. That's what my director looks at.",
                    },
                  ],
                  chips: [
                    { text: "Found the real priority", tone: "good" },
                    { text: "Try: tie renewal to onboarding", tone: "next" },
                  ],
                },
              },
            ],
          },
          {
            slug: "linkedin-persona",
            title: "Practice against a LinkedIn persona",
            blocks: [
              {
                type: "p",
                text: "You can rehearse against the actual person you're about to meet.",
              },
              {
                type: "steps",
                items: [
                  "In setup, choose **Persona from LinkedIn**.",
                  "Paste the buyer's profile URL.",
                  "The AI builds a persona from their role, seniority, and industry, then plays them.",
                ],
              },
              {
                type: "callout",
                label: "Why",
                text: "The objections a skeptical CFO raises are not the ones a friendly champion raises. Practising the right persona is the whole point.",
              },
            ],
          },
        ],
      },
      {
        title: "Real calls & coaching",
        articles: [
          {
            slug: "analyze-call",
            title: "Analyze a real sales call",
            blocks: [
              {
                type: "p",
                text: "Upload a recording of a real call and Reflection Studio coaches you on it, privately.",
              },
              { type: "h2", text: "Steps" },
              {
                type: "steps",
                items: [
                  "Open **Reflection Studio** and upload the call recording.",
                  "Pick the **deal stage** (first call, late-stage, renewal) so it grades against the right rubric.",
                  "Confirm the speaker labels when asked.",
                  "Wait for the analysis, accuracy matters more than speed, so it thinks for a moment.",
                ],
              },
              {
                type: "callout",
                label: "Private",
                text: "Reflections are private to you. Audio is processed then deleted; only the transcript and scores are kept.",
              },
            ],
          },
          {
            slug: "read-reflection",
            title: "Read your reflection result",
            blocks: [
              {
                type: "p",
                text: "The result is a verdict and coaching, never a raw number to game.",
              },
              {
                type: "steps",
                items: [
                  "**Verdict** — Strong, Solid, Fair, or Needs work, with a trend versus your last call.",
                  "**Buying signals & objections** — every signal the buyer gave and every objection you hit, tied to the moment.",
                  "**Coaching** — the highest-leverage fixes, with the exact words your top closer would have used.",
                  "**Find what fixes this** — the knowledge in your library that closes the gap.",
                ],
              },
              {
                type: "shot",
                label: "Reflection result",
                caption: "Verdict, signals, and coaching",
                visual: {
                  type: "bars",
                  title: "Reflection · Discovery call",
                  meta: "Verdict: Solid · trending up",
                  items: [
                    { label: "Discovery questions", value: 78, tone: "strength", tag: "STRENGTH" },
                    { label: "Handling the budget objection", value: 62, tone: "strength", tag: "STRENGTH" },
                    { label: "Agreeing on next steps", value: 38, tone: "gap", tag: "GAP" },
                  ],
                  note: {
                    label: "COACHING",
                    text: "Confirm a date for the next meeting before you hang up.",
                  },
                },
              },
            ],
          },
        ],
      },
    ],
  },
];

/** Teks halaman Help Center (hero, pencarian, navigasi artikel). */
export const guidePage = {
  eyebrow: "Help Center",
  title: "How Can We Help You?",
  lead: "Step-by-step guides for admins and sales teams using Repskill.",
  searchPlaceholder: "Search the guide…",
  searchLabel: "Search the guide",
  browse: "Browse the guide",
  home: "Guide",
  prev: "Previous",
  next: "Next",
  readGuide: "Open guide",
  results: "Search Results",
  empty: "No articles match your search. Try a different term, or tell us what's missing.",
};

export const featureRequest = {
  slug: "feature-request",
  label: "Request a Feature",
  title: "Request a Feature",
  lead: "Missing something, or have an idea that would help your team sell? Tell us. We read every request.",
  fields: {
    name: "Your Name",
    email: "Work Email",
    idea: "What should we build?",
    ideaPlaceholder: "Describe the feature and why it would help your team…",
  },
  errors: {
    name: "Please tell us who you are.",
    email: "Please enter a valid work email.",
    idea: "Please describe what you'd like us to build.",
    ideaShort: "A little more detail would help.",
  },
  submit: "Send Request",
  success: {
    title: "Thanks, your request is noted",
    body: "We read every request. If it shapes the roadmap, we'll follow up.",
  },
  error: "Something went wrong. Please try again in a moment.",
};

/* ---------- helpers ---------- */

export type GuideEntry = { guide: Guide; section: GuideSection; article: GuideArticle; href: string };

export const guideHref = (guideId: string) => `/guide/${guideId}/`;
export const articleHref = (guideId: string, slug: string) => `/guide/${guideId}/${slug}/`;
export const featureRequestHref = `/guide/${featureRequest.slug}/`;

/** Semua artikel berurutan (Admin lalu User), untuk pencarian dan tombol Previous/Next. */
export const guideEntries: GuideEntry[] = guides.flatMap((guide) =>
  guide.sections.flatMap((section) =>
    section.articles.map((article) => ({
      guide,
      section,
      article,
      href: articleHref(guide.id, article.slug),
    })),
  ),
);

export const getGuide = (id: string) => guides.find((g) => g.id === id);

export const getGuideEntry = (guideId: string, slug: string) =>
  guideEntries.find((e) => e.guide.id === guideId && e.article.slug === slug);

/** Teks polos sebuah artikel (tanpa `**`), untuk pencarian dan meta description. */
export const articlePlainText = (article: GuideArticle) =>
  article.blocks
    .flatMap((b) => {
      if (b.type === "steps") return b.items;
      if (b.type === "shot") return [b.label, b.caption];
      return [b.text];
    })
    .join(" ")
    .replace(/\*\*/g, "");

export const guideRoutes: string[] = [
  "/guide/",
  ...guides.map((g) => guideHref(g.id)),
  ...guideEntries.map((e) => e.href),
  featureRequestHref,
];
