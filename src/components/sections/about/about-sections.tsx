import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { aboutPage } from "@/content/about";
import { cn } from "@/lib/cn";

/** Why Repskill Exists */
export function WhyRepskill() {
  const { why } = aboutPage;
  const last = why.flow.length - 1;
  return (
    <Section tone="surface">
      <div className="grid items-center gap-12 lg:grid-cols-[1.3fr_1fr] lg:gap-20">
        <SectionHeader eyebrow={why.eyebrow} title={why.title} lead={why.body} />
        <Stagger className="flex flex-col items-stretch gap-2" stagger={0.18}>
          {why.flow.map((step, i) => (
            <StaggerItem key={step} className="flex flex-col items-center gap-2">
              <div
                className={cn(
                  "w-full rounded-card px-6 py-5 text-center text-h3",
                  i === last ? "bg-brand-orange text-white" : "bg-white text-brand-grey",
                )}
              >
                {step}
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
      </div>
    </Section>
  );
}

/** Purpose / Vision / Mission — tiap blok punya anchor sendiri (#purpose, #vision, #mission). */
export function PurposeVisionMission() {
  return (
    <Section>
      <div className="flex flex-col divide-y divide-line border-y border-line">
        {aboutPage.pvm.map((item, i) => (
          <Reveal key={item.id} className="grid gap-4 py-10 lg:grid-cols-[280px_1fr] lg:gap-16 lg:py-14">
            <div id={item.id} className="flex scroll-mt-[120px] items-center gap-4">
              <span className="text-sm font-bold text-brand-orange">{String(i + 1).padStart(2, "0")}</span>
              <Eyebrow>{item.key}</Eyebrow>
            </div>
            <p className="text-h2 text-balance">{item.text}</p>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

/** Our Philosophy — Mentor × Builder + brand personality */
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
        {philosophy.archetypes.map((a, i) => (
          <StaggerItem
            key={a.name}
            className={cn("flex flex-col gap-4 rounded-card p-7", i === 0 ? "bg-white/10" : "bg-brand-linen")}
          >
            <span className={cn("text-eyebrow", i === 0 ? "text-brand-orange" : "text-brand-grey")}>
              {a.name.toUpperCase()}
            </span>
            <span className={cn("text-h3", i === 0 ? "text-white" : "text-brand-grey")}>{a.line}</span>
            <div className="flex flex-wrap gap-2">
              {a.traits.map((t) => (
                <span
                  key={t}
                  className={cn(
                    "rounded-md px-2.5 py-1 text-xs font-semibold",
                    i === 0 ? "bg-white/15 text-white" : "bg-brand-grey/10 text-brand-grey",
                  )}
                >
                  {t}
                </span>
              ))}
            </div>
          </StaggerItem>
        ))}
      </Stagger>
      <Stagger className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6" stagger={0.06}>
        {philosophy.personality.map((p) => (
          <StaggerItem key={p.name} className="flex flex-col gap-2 rounded-card border border-white/15 p-5">
            <span className="text-[12px] font-bold tracking-[0.12em] text-brand-amber">
              {p.name.toUpperCase()}
            </span>
            <span className="text-sm leading-relaxed text-line">{p.desc}</span>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}

/** How We Think About Sales Capability */
export function HowWeThink() {
  const { thinking } = aboutPage;
  const last = thinking.stages.length - 1;
  return (
    <Section tone="linen">
      <SectionHeader eyebrow={thinking.eyebrow} title={thinking.title} />
      <Stagger className="mt-10 grid gap-4 sm:grid-cols-2 lg:mt-14 lg:grid-cols-5" stagger={0.1}>
        {thinking.stages.map((s, i) => (
          <StaggerItem key={s.name} className="flex flex-col gap-3 rounded-card bg-white p-6">
            <span
              className={cn("text-sm font-bold", i === last ? "text-brand-orange" : "text-brand-charcoal")}
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className={cn("text-h3", i === last && "text-brand-orange")}>{s.name}</span>
            <span className="text-[15px] leading-relaxed text-brand-charcoal">{s.desc}</span>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}
