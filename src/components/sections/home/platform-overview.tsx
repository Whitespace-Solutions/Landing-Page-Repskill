import Link from "next/link";
import { ScreenshotCarousel } from "@/components/mockups/screenshot-carousel";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { ArrowRight } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { featureInfo } from "@/content/features";
import { platformOverview } from "@/content/home";
import type { FeatureKey } from "@/content/success-stories";

const { shots, ...header } = platformOverview;

// Urutan mengikuti alur produk di brand guideline: Capture → Learn → Practice.
// Tiap kartu menampilkan screenshot produk yang berganti; mulainya digeser 1 dtk per kartu supaya tidak serempak.
const ORDER: { key: FeatureKey; stage: string }[] = [
  { key: "capture", stage: "01 · CAPTURE" },
  { key: "learn", stage: "02 · LEARN" },
  { key: "practice", stage: "03 · PRACTICE & REFLECT" },
];

export function PlatformOverview() {
  return (
    <Section id="platform">
      <SectionHeader {...header} />

      <Stagger className="mt-10 grid gap-4 md:grid-cols-3 lg:mt-14" stagger={0.1}>
        {ORDER.map(({ key, stage }, i) => {
          const f = featureInfo[key];
          return (
            <StaggerItem key={key}>
              <Link
                href={f.href}
                className="group flex h-full flex-col gap-4 rounded-card border border-line bg-white p-3.5 pb-6 transition-[border-color,box-shadow,transform] duration-200 hover:-translate-y-0.5 hover:border-brand-amber hover:shadow-glow"
              >
                <div className="h-44 overflow-hidden rounded-xl border border-line bg-surface">
                  <ScreenshotCarousel shots={shots[key]} offset={i * 1000} />
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
