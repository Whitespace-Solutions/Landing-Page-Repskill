import { Stagger, StaggerItem } from "@/components/motion/reveal";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { HighlightText } from "@/components/ui/highlight-text";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { aboutPage } from "@/content/about";

/** Hero About: satu pernyataan kuat rata kiri selebar container, tanpa tombol atau visual. */
export function AboutHero() {
  const { hero } = aboutPage;
  return (
    <section className="bg-white">
      <Container className="pt-14 pb-16 sm:pt-20 lg:pt-24 lg:pb-24">
        <Stagger className="flex flex-col gap-6" stagger={0.12}>
          <StaggerItem>
            <Eyebrow>{hero.eyebrow}</Eyebrow>
          </StaggerItem>
          <StaggerItem>
            <h1 className="text-display text-pretty">
              <HighlightText text={hero.title} highlight={hero.highlight} />
            </h1>
          </StaggerItem>
          <StaggerItem>
            <p className="max-w-[960px] text-lead text-pretty text-brand-charcoal">{hero.lead}</p>
          </StaggerItem>
        </Stagger>
      </Container>
    </section>
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
