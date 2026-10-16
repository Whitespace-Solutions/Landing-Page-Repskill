import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { DuoIcon } from "@/components/ui/duo-icon";
import { HighlightText } from "@/components/ui/highlight-text";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { problemSection } from "@/content/home";

/** Section masalah di Home: tiga kartu "where it hurts" lalu panel "the usual fixes don't stick". */
export function Problem() {
  const { pains, fixesLabel, fixes, closing, ...header } = problemSection;

  return (
    <Section id="problem" tone="surface">
      <SectionHeader {...header} centerOnMobile />

      <Stagger className="mt-10 grid gap-4 md:grid-cols-3 lg:mt-14" stagger={0.1}>
        {pains.map((pain, i) => (
          <StaggerItem
            key={pain.title}
            className="flex h-full flex-col gap-3 rounded-card border border-line bg-white p-6 sm:p-7"
          >
            <div className="mb-1 flex items-start justify-between gap-3">
              <DuoIcon name={pain.icon} size={40} />
              <span className="text-caption font-bold tracking-[0.12em] text-brand-orange">
                {String(i + 1).padStart(2, "0")}
              </span>
            </div>
            <span className="text-h3 text-brand-grey">{pain.title}</span>
            <span className="leading-relaxed text-brand-charcoal">{pain.body}</span>
          </StaggerItem>
        ))}
      </Stagger>

      <Reveal className="mt-4 rounded-card border border-line bg-white p-6 sm:p-7">
        <span className="text-caption font-bold tracking-[0.12em] text-brand-charcoal">{fixesLabel}</span>
        <ul className="mt-4 grid gap-4 md:grid-cols-3">
          {fixes.map((fix) => (
            <li key={fix.label} className="flex gap-3">
              <span className="flex size-7 flex-none items-center justify-center rounded-full bg-surface text-brand-charcoal">
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden
                >
                  <path d="M6 6l12 12M18 6L6 18" />
                </svg>
              </span>
              <span className="flex flex-col gap-0.5">
                <span className="text-sm font-semibold text-brand-charcoal">{fix.label}</span>
                <span className="font-bold text-brand-grey">{fix.verdict}</span>
              </span>
            </li>
          ))}
        </ul>
        <p className="mt-6 border-t border-line pt-5 text-h3 text-brand-grey">
          <HighlightText text={closing.text} highlight={closing.highlight} />
        </p>
      </Reveal>
    </Section>
  );
}
