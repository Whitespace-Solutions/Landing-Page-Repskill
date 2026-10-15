import Link from "next/link";
import { ScreenshotCarousel } from "@/components/mockups/screenshot-carousel";
import { Stagger, StaggerItem } from "@/components/motion/reveal";
import { ArrowRight } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { featureInfo } from "@/content/features";
import { solutionSection } from "@/content/home";
import type { FeatureKey } from "@/content/success-stories";

const { shots, ...header } = solutionSection;

// Urutan mengikuti alur produk di brand guideline: Capture → Learn → Practice.
// Tiap kartu menampilkan screenshot produk yang berganti; mulainya digeser 1 dtk per kartu supaya tidak serempak.
const ORDER: { key: FeatureKey; stage: string }[] = [
  { key: "capture", stage: "01 · CAPTURE" },
  { key: "learn", stage: "02 · LEARN" },
  { key: "practice", stage: "03 · PRACTICE & REFLECT" },
];

export function Solution() {
  return (
    <Section id="solution">
      <SectionHeader {...header} singleLineTitle />

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
    </Section>
  );
}
