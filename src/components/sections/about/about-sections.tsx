import { Stagger, StaggerItem } from "@/components/motion/reveal";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { aboutPage } from "@/content/about";
import { cn } from "@/lib/cn";

/** Visual hero About: alur nilai Expertise → Capability → Performance, langkah terakhir oranye. */
export function AboutFlow() {
  const { flow } = aboutPage;
  const last = flow.length - 1;
  return (
    <Stagger
      as="ol"
      className="flex flex-col items-center gap-2 rounded-panel bg-surface p-4 sm:p-6"
      stagger={0.18}
    >
      {flow.map((step, i) => (
        <StaggerItem as="li" key={step.name} className="flex w-full flex-col items-center gap-2">
          <div
            className={cn(
              "flex w-full items-center gap-4 rounded-card px-5 py-4.5 sm:px-6",
              i === last ? "bg-brand-orange text-white shadow-float" : "bg-white",
            )}
          >
            <span
              className={cn(
                "flex size-10 flex-none items-center justify-center rounded-full text-sm font-bold",
                i === last ? "bg-white/20 text-white" : "bg-brand-linen text-brand-grey",
              )}
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <div className="flex flex-col gap-0.5">
              <span className="text-h3">{step.name}</span>
              <span className={cn("text-[15px]", i === last ? "text-white/85" : "text-brand-charcoal")}>
                {step.desc}
              </span>
            </div>
          </div>
          {i < last && (
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-brand-orange"
              aria-hidden
            >
              <path d="M12 5v14M6 13l6 6 6-6" />
            </svg>
          )}
        </StaggerItem>
      ))}
    </Stagger>
  );
}

/** Why Repskill Exists + Vision & Mission (anchor #vision, #mission). */
export function WhyRepskill() {
  const { why } = aboutPage;
  return (
    <Section tone="surface">
      <SectionHeader eyebrow={why.eyebrow} title={why.title} lead={why.body} layout="side" />
      <Stagger className="mt-10 grid gap-4 md:grid-cols-2 lg:mt-14" stagger={0.12}>
        {why.statements.map((item) => (
          <StaggerItem key={item.id} className="flex flex-col gap-4 rounded-card bg-white p-7 lg:p-9">
            <div id={item.id} className="scroll-mt-[120px]">
              <Eyebrow>{item.key}</Eyebrow>
            </div>
            <p className="text-h3 text-balance">{item.text}</p>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}

/** Our Philosophy: Mentor × Builder + prinsip yang dirasakan tim klien. */
export function OurPhilosophy() {
  const { philosophy } = aboutPage;
  return (
    <Section tone="dark" size="lg">
      <SectionHeader
        eyebrow={philosophy.eyebrow}
        title={philosophy.title}
        lead={philosophy.body}
        layout="side"
        size="h1"
        tone="dark"
      />
      <Stagger className="mt-12 grid gap-4 md:grid-cols-2 lg:mt-16" stagger={0.12}>
        {philosophy.archetypes.map((a) => (
          <StaggerItem key={a.name} className="flex flex-col gap-4 rounded-card bg-white/10 p-7 lg:p-8">
            <Eyebrow className="text-brand-amber">{a.name}</Eyebrow>
            <span className="text-h3 text-balance text-white">{a.line}</span>
            <div className="mt-auto flex flex-wrap gap-2 pt-2">
              {a.traits.map((t) => (
                <span key={t} className="rounded-md bg-white/15 px-2.5 py-1 text-xs font-semibold text-white">
                  {t}
                </span>
              ))}
            </div>
          </StaggerItem>
        ))}
      </Stagger>
      <Stagger as="ul" className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-4" stagger={0.08}>
        {philosophy.principles.map((p) => (
          <StaggerItem
            as="li"
            key={p.name}
            className="flex flex-col gap-3 rounded-card border border-white/15 p-6"
          >
            <span className="flex size-8 items-center justify-center rounded-full bg-brand-amber text-brand-grey">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                <path d="M5 12.5l4.5 4.5L19 7.5" />
              </svg>
            </span>
            <span className="text-lg font-bold text-white">{p.name}</span>
            <span className="text-[15px] leading-relaxed text-line">{p.desc}</span>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}
