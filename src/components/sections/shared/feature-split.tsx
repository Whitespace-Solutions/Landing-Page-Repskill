import { Mockup } from "@/components/mockups/mockup";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { ArrowRight } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Section, type SectionTone } from "@/components/ui/section";
import type { FeatureBlockData } from "@/content/types";
import { cn } from "@/lib/cn";
import Link from "next/link";

type FeatureSplitProps = FeatureBlockData & {
  tone?: SectionTone;
  /** Visual di kiri (dipakai berselang-seling antar section) */
  reverse?: boolean;
};

/** Pola "Split": teks + poin di satu sisi, mockup produk di sisi lain. */
export function FeatureSplit({
  id,
  eyebrow,
  title,
  body,
  points,
  link,
  visual,
  tone = "white",
  reverse = false,
}: FeatureSplitProps) {
  return (
    <Section id={id} tone={tone}>
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <div className="flex flex-col gap-5">
          <Reveal className="flex flex-col gap-5">
            <Eyebrow>{eyebrow}</Eyebrow>
            <h2 className="text-h2 text-balance">{title}</h2>
            <p className="text-lead text-pretty text-brand-slate">{body}</p>
          </Reveal>
          {points && (
            <Stagger as="ul" className="mt-2 flex flex-col gap-3" stagger={0.08}>
              {points.map((point) => (
                <StaggerItem as="li" key={point} className="flex items-start gap-3 text-base text-ink">
                  <span className="mt-0.5 flex size-5 flex-none items-center justify-center rounded-full bg-brand-teal text-white">
                    <svg
                      width="11"
                      height="11"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden
                    >
                      <path d="M5 12l5 5L20 7" />
                    </svg>
                  </span>
                  {point}
                </StaggerItem>
              ))}
            </Stagger>
          )}
          {link && (
            <Reveal>
              <Link
                href={link.href}
                className="group mt-2 inline-flex items-center gap-2 font-semibold text-brand-teal hover:text-brand-slate"
              >
                {link.label}
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </Reveal>
          )}
        </div>

        <Reveal delay={0.15} className={cn(reverse && "lg:order-first")}>
          <div
            className={cn(
              "rounded-panel p-4 sm:p-8 lg:p-10",
              tone === "white" ? "bg-surface-ice" : "bg-white",
            )}
          >
            <Mockup data={visual} />
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
