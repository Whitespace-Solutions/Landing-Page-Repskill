import { Reveal } from "@/components/motion/reveal";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import type { StepsData } from "@/content/types";
import { cn } from "@/lib/cn";
import { StepsTimelineList } from "./steps-timeline-list";

type StepsTimelineProps = StepsData & {
  /** `light` dipakai bila section sebelum/sesudahnya sudah gelap (mis. tepat di atas CTA). */
  tone?: "dark" | "light";
};

/** Pola "Alur / timeline": langkah dengan garis atas & bullet amber (tanpa nomor), muncul berurutan, lihat `StepsTimelineList`. */
export function StepsTimeline({ id, eyebrow, title, body, steps, note, tone = "dark" }: StepsTimelineProps) {
  const dark = tone === "dark";

  return (
    <Section id={id} tone={dark ? "dark" : "linen"} size="lg">
      <SectionHeader
        eyebrow={eyebrow}
        title={title}
        lead={body}
        layout="side"
        size="h1"
        tone={dark ? "dark" : "light"}
        centerOnMobile
      />

      <StepsTimelineList steps={steps} dark={dark} />

      {note && (
        <Reveal
          className={cn(
            "mt-10 flex items-center gap-3 rounded-[14px] border px-5.5 py-4.5 text-[15px] leading-normal",
            dark
              ? "border-brand-amber/30 bg-brand-amber/10"
              : "border-brand-amber/20 bg-white text-brand-grey",
          )}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={cn("flex-none", dark ? "text-brand-amber" : "text-brand-orange")}
            aria-hidden
          >
            <path d="M3 12a9 9 0 0 1 15.5-6.2L21 8M21 3v5h-5M21 12a9 9 0 0 1-15.5 6.2L3 16M3 21v-5h5" />
          </svg>
          {note}
        </Reveal>
      )}
    </Section>
  );
}
