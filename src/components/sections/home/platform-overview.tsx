import Link from "next/link";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { ArrowRight } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { featureInfo } from "@/content/features";
import { platformOverview } from "@/content/home";
import type { FeatureKey } from "@/content/success-stories";

// Urutan mengikuti alur produk di brand guideline: Capture → Learn → Practice.
const ORDER: { key: FeatureKey; stage: string; preview: React.ReactNode }[] = [
  { key: "capture", stage: "01 · CAPTURE", preview: <CapturePreview /> },
  { key: "learn", stage: "02 · LEARN", preview: <LearnPreview /> },
  { key: "practice", stage: "03 · PRACTICE & REFLECT", preview: <PracticePreview /> },
];

export function PlatformOverview() {
  return (
    <Section id="platform">
      <SectionHeader {...platformOverview} />

      <Stagger className="mt-10 grid gap-4 md:grid-cols-3 lg:mt-14" stagger={0.1}>
        {ORDER.map(({ key, stage, preview }) => {
          const f = featureInfo[key];
          return (
            <StaggerItem key={key}>
              <Link
                href={f.href}
                className="group flex h-full flex-col gap-4 rounded-card border border-line bg-white p-3.5 pb-6 transition-[border-color,box-shadow,transform] duration-200 hover:-translate-y-0.5 hover:border-brand-amber hover:shadow-glow"
              >
                <div className="flex h-44 flex-col justify-center gap-2.5 rounded-xl bg-surface p-4">
                  {preview}
                </div>
                <div className="flex flex-1 flex-col gap-2 px-2">
                  <span className="text-[11.5px] font-bold tracking-[0.12em] text-brand-orange">{stage}</span>
                  <span className="text-h3">{f.label}</span>
                  <span className="text-[13px] font-semibold text-brand-charcoal">{f.tools}</span>
                  <span className="text-[15px] leading-relaxed text-brand-charcoal">{f.description}</span>
                  <span className="mt-auto inline-flex items-center gap-1.5 pt-2 text-sm font-semibold text-brand-charcoal group-hover:text-brand-grey">
                    Explore {f.label}
                    <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </StaggerItem>
          );
        })}
      </Stagger>

      <Reveal className="mt-4 flex flex-wrap items-center justify-between gap-4 rounded-card bg-brand-linen px-6 py-5 text-brand-grey">
        <div className="flex items-center gap-3">
          <span className="flex size-9 items-center justify-center rounded-full bg-brand-amber">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              <rect x="5" y="11" width="14" height="10" rx="2" />
              <path d="M8 11V7a4 4 0 0 1 8 0v4" />
            </svg>
          </span>
          <div className="flex flex-col">
            <span className="text-[11px] font-bold tracking-[0.14em] text-brand-grey/70">
              SHARED FOUNDATION
            </span>
            <span className="font-bold">Knowledge Universe: reviewed and approved before it is used.</span>
          </div>
        </div>
        <Link
          href="/features/learn-knowledge/#knowledge-universe"
          className="group inline-flex items-center gap-1.5 text-sm font-semibold text-brand-charcoal hover:text-brand-orange"
        >
          How it works
          <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
        </Link>
      </Reveal>
    </Section>
  );
}

function CapturePreview() {
  return (
    <>
      <div className="rounded-lg bg-white px-3 py-2.5 text-xs leading-snug text-brand-charcoal italic">
        “I always confirm the decision process first…”
      </div>
      <div className="flex items-center gap-2 text-[10.5px] font-bold tracking-[0.1em] text-brand-charcoal">
        <span className="h-px flex-1 bg-brand-amber" />
        STRUCTURED
      </div>
      <div className="flex flex-col gap-1.5">
        <span className="h-1.5 w-4/5 rounded-full bg-brand-amber" />
        <span className="h-1.5 w-3/5 rounded-full bg-brand-amber" />
        <span className="h-1.5 w-2/3 rounded-full bg-brand-linen" />
      </div>
    </>
  );
}

function LearnPreview() {
  const rows = [
    { w: "w-3/5", s: "done" },
    { w: "w-1/2", s: "done" },
    { w: "w-2/3", s: "now" },
    { w: "w-2/5", s: "todo" },
  ];
  return (
    <>
      {rows.map((r, i) => (
        <div key={i} className="flex items-center gap-2.5">
          <span
            className={
              r.s === "done"
                ? "size-4 rounded-full bg-brand-amber"
                : r.s === "now"
                  ? "size-4 rounded-full border-[2.5px] border-brand-orange bg-white"
                  : "size-4 rounded-full border-2 border-line bg-white"
            }
          />
          <span className={`h-1.5 rounded-full ${r.w} ${r.s === "todo" ? "bg-line" : "bg-brand-grey"}`} />
        </div>
      ))}
    </>
  );
}

function PracticePreview() {
  return (
    <>
      <div className="max-w-[80%] self-start rounded-[10px_10px_10px_2px] bg-white px-3 py-2 text-xs leading-snug text-brand-charcoal">
        We already have a vendor for this.
      </div>
      <div className="max-w-[80%] self-end rounded-[10px_10px_2px_10px] bg-brand-linen px-3 py-2 text-xs leading-snug text-brand-grey">
        What would need to change for you to look again?
      </div>
      <span className="self-start rounded-full bg-brand-orange px-2.5 py-1 text-[11px] font-bold text-white">
        Feedback ready
      </span>
    </>
  );
}
