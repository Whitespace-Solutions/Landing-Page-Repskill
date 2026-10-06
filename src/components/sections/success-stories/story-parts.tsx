import Image from "next/image";
import Link from "next/link";
import { Mockup } from "@/components/mockups/mockup";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { ArrowRight, ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { featureInfo } from "@/content/features";
import type { SuccessStory } from "@/content/success-stories";
import { cn } from "@/lib/cn";

/** Penanda konten yang belum final — hilang otomatis saat `draft: false`. */
export function DraftBadge({ show }: { show: boolean }) {
  if (!show) return null;
  return (
    <span className="rounded-full border border-dashed border-brand-orange px-2.5 py-1 text-xs font-semibold text-brand-orange-deep">
      Draft content
    </span>
  );
}

export function MetricTiles({
  metrics,
  tone = "light",
}: {
  metrics: SuccessStory["result"]["metrics"];
  tone?: "light" | "linen";
}) {
  return (
    <Stagger className="grid grid-cols-1 gap-3 sm:grid-cols-3" stagger={0.1}>
      {metrics.map((m) => (
        <StaggerItem
          key={m.label}
          className={cn(
            "flex flex-col gap-2 rounded-card p-5",
            tone === "linen" ? "bg-white" : "border border-line bg-surface",
          )}
        >
          <span className="text-h1 text-brand-orange">{m.value}</span>
          <span className="text-sm font-semibold text-brand-charcoal">{m.label}</span>
        </StaggerItem>
      ))}
    </Stagger>
  );
}

/**
 * Kartu satu klien di halaman /success-stories/: judul hasil, ringkasan, metrik, tombol ke halaman detail,
 * dan logo di panel kanan.
 */
export function StoryRow({ story }: { story: SuccessStory }) {
  const href = `/success-stories/${story.slug}/`;
  return (
    <article className="grid items-center gap-8 rounded-panel border border-line bg-white p-6 sm:p-10 lg:grid-cols-[1.5fr_1fr] lg:gap-14">
      <div className="flex flex-col gap-6">
        <div className="flex flex-wrap items-center gap-3">
          <span className="rounded-full border border-line bg-white px-2.5 py-1 text-xs font-semibold text-brand-charcoal">
            {story.industry}
          </span>
          <DraftBadge show={story.draft} />
        </div>
        <div className="flex flex-col gap-4">
          <h2 className="text-h2 text-balance">
            {story.name}: {story.headline}
          </h2>
          <p className="max-w-[620px] text-lead text-pretty text-brand-charcoal">{story.summary}</p>
        </div>
        <dl className="flex flex-wrap gap-3">
          {story.result.metrics.map((m) => (
            <div key={m.label} className="flex flex-col gap-1 rounded-card bg-brand-linen px-5 py-4">
              <dt className="order-last text-sm font-semibold text-brand-charcoal">{m.label}</dt>
              <dd className="text-h3 text-brand-grey">{m.value}</dd>
            </div>
          ))}
        </dl>
        <ButtonLink href={href} withArrow className="self-start">
          Read Case Study
        </ButtonLink>
      </div>

      <Link
        href={href}
        tabIndex={-1}
        aria-hidden
        className="order-first flex aspect-video items-center justify-center rounded-card border border-line bg-surface p-10 transition-colors hover:border-brand-amber lg:order-last"
      >
        <Image src={story.logo} alt="" className="h-auto max-h-24 w-auto max-w-[70%]" />
      </Link>
    </article>
  );
}

/** About Company — hero halaman detail. */
export function StoryAbout({ story }: { story: SuccessStory }) {
  return (
    <section className="relative overflow-hidden bg-white">
      <Container className="relative grid items-center gap-12 pt-12 pb-16 sm:pt-16 lg:grid-cols-[1.2fr_1fr] lg:gap-16 lg:pb-24">
        <Stagger className="flex flex-col gap-6" stagger={0.1}>
          <StaggerItem className="flex flex-wrap items-center gap-3 text-sm font-semibold">
            <Link href="/success-stories/" className="text-brand-orange hover:text-brand-grey">
              Success Stories
            </Link>
            <span className="text-line">/</span>
            <span className="text-brand-charcoal">{story.name}</span>
            <DraftBadge show={story.draft} />
          </StaggerItem>
          <StaggerItem>
            <Eyebrow accent>About the company</Eyebrow>
          </StaggerItem>
          <StaggerItem>
            <h1 className="text-display text-balance">{story.about.title}</h1>
          </StaggerItem>
          <StaggerItem>
            <p className="max-w-[620px] text-lead text-pretty text-brand-charcoal">{story.about.body}</p>
          </StaggerItem>
        </Stagger>

        <Reveal
          delay={0.3}
          className="flex flex-col gap-3 rounded-panel border border-line bg-white p-6 shadow-float sm:p-8"
        >
          <div className="flex h-28 items-center justify-center rounded-card bg-surface px-8">
            <Image src={story.logo} alt={story.name} className="h-auto max-h-16 w-auto max-w-full" />
          </div>
          <dl className="divide-y divide-line">
            {story.about.facts.map((fact) => (
              <div key={fact.label} className="flex items-center justify-between gap-4 py-3">
                <dt className="text-sm text-brand-charcoal">{fact.label}</dt>
                <dd className="text-sm font-semibold text-brand-grey">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </Container>
    </section>
  );
}

export function StoryChallenge({ story }: { story: SuccessStory }) {
  return (
    <Section tone="surface">
      <SectionHeader eyebrow="The Challenge" title={story.challenge.title} lead={story.challenge.body} />
      <Stagger className="mt-10 grid gap-4 md:grid-cols-3 lg:mt-14" stagger={0.1}>
        {story.challenge.points.map((point, i) => (
          <StaggerItem key={point} className="flex flex-col gap-3 rounded-card bg-white p-6">
            <span className="text-sm font-bold text-brand-orange">{String(i + 1).padStart(2, "0")}</span>
            <span className="text-base leading-relaxed text-brand-grey">{point}</span>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}

export function StoryHelp({ story }: { story: SuccessStory }) {
  return (
    <Section>
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <div className="flex flex-col gap-8">
          <SectionHeader eyebrow="How Repskill Helped" title={story.help.title} lead={story.help.body} />
          <Stagger className="flex flex-col gap-3" stagger={0.08}>
            {story.help.features.map((key) => {
              const f = featureInfo[key];
              return (
                <StaggerItem key={key}>
                  <Link
                    href={f.href}
                    className="group flex items-center justify-between gap-4 rounded-card border border-line p-5 transition-colors hover:border-brand-amber"
                  >
                    <div className="flex flex-col gap-1">
                      <span className="font-bold text-brand-grey">{f.label}</span>
                      <span className="text-sm text-brand-charcoal">{f.tools}</span>
                    </div>
                    <ArrowRight
                      size={16}
                      className="flex-none text-brand-charcoal transition-transform group-hover:translate-x-1"
                    />
                  </Link>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>
        <Reveal delay={0.15}>
          <div className="rounded-panel bg-brand-linen p-4 sm:p-8 lg:p-10">
            <Mockup data={story.help.visual} />
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

export function StoryResult({ story }: { story: SuccessStory }) {
  const { result } = story;
  return (
    <Section tone="linen">
      <SectionHeader eyebrow="Result" title={result.title} lead={result.body} />
      <div className="mt-10 lg:mt-14">
        <MetricTiles metrics={result.metrics} tone="linen" />
      </div>
      {result.quote && (
        <Reveal className="mt-6 flex flex-col gap-4 rounded-card bg-white p-7">
          <p className="text-h3 font-semibold text-brand-grey">“{result.quote.text}”</p>
          <span className="text-sm text-brand-charcoal">
            <strong className="text-brand-grey">{result.quote.author}</strong> · {result.quote.role}
          </span>
        </Reveal>
      )}
    </Section>
  );
}
