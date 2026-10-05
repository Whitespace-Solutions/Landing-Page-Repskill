import Link from "next/link";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import type { StepsData } from "@/content/types";
import { cn } from "@/lib/cn";

type StepsTimelineProps = StepsData & {
  /** `light` dipakai bila section sebelum/sesudahnya sudah gelap (mis. tepat di atas CTA). */
  tone?: "dark" | "light";
};

/** Pola "Alur / timeline": langkah bernomor dengan garis atas, langkah terakhir oranye. */
export function StepsTimeline({ id, eyebrow, title, body, steps, note, tone = "dark" }: StepsTimelineProps) {
  const dark = tone === "dark";
  const last = steps.length - 1;

  return (
    <Section id={id} tone={dark ? "slate" : "ice"} size="lg">
      <SectionHeader
        eyebrow={eyebrow}
        title={title}
        lead={body}
        layout="side"
        size="h1"
        tone={dark ? "dark" : "light"}
      />

      <Stagger
        as="ol"
        stagger={0.12}
        className={cn("mt-12 grid lg:mt-18", steps.length === 5 ? "lg:grid-cols-5" : "lg:grid-cols-4")}
      >
        {steps.map((step, i) => (
          <StaggerItem
            as="li"
            key={step.name}
            className={cn(
              "relative flex flex-col gap-3.5 border-t-2 py-7 pr-6",
              i === last ? "border-brand-orange" : dark ? "border-brand-cyan/55" : "border-brand-teal/30",
            )}
          >
            <span
              className={cn(
                "absolute -top-[7px] left-0 size-3 rounded-full",
                dark
                  ? "shadow-[0_0_0_4px_var(--color-brand-slate)]"
                  : "shadow-[0_0_0_4px_var(--color-surface-ice)]",
                i === last ? "bg-brand-orange" : dark ? "bg-brand-cyan" : "bg-brand-teal",
              )}
              aria-hidden
            />
            <span
              className={cn(
                "text-[13px] font-bold tracking-[0.08em]",
                dark ? "text-brand-cyan" : "text-brand-teal",
              )}
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className={cn("text-h3 lg:text-2xl", i === last && "text-brand-orange")}>{step.name}</span>
            <span
              className={cn(
                "text-[15px] leading-relaxed lg:min-h-[70px]",
                dark ? "text-line" : "text-brand-slate",
              )}
            >
              {step.message}
            </span>
            {step.tag && (
              <StepTag href={step.href} dark={dark}>
                {step.tag}
              </StepTag>
            )}
          </StaggerItem>
        ))}
      </Stagger>

      {note && (
        <Reveal
          className={cn(
            "mt-10 flex items-center gap-3 rounded-[14px] border px-5.5 py-4.5 text-[15px] leading-normal",
            dark ? "border-brand-cyan/30 bg-brand-cyan/10" : "border-brand-teal/20 bg-white text-ink",
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
            className={cn("flex-none", dark ? "text-brand-cyan" : "text-brand-teal")}
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

function StepTag({ href, dark, children }: { href?: string; dark: boolean; children: React.ReactNode }) {
  const className = cn(
    "self-start rounded-lg border px-3 py-2 text-[13.5px] font-semibold transition-colors",
    dark ? "border-white/15 bg-white/10 text-white" : "border-line bg-white text-brand-slate",
    href && (dark ? "hover:bg-white/20" : "hover:border-brand-teal hover:text-brand-teal"),
  );
  return href ? (
    <Link href={href} className={className}>
      {children}
    </Link>
  ) : (
    <span className={className}>{children}</span>
  );
}
