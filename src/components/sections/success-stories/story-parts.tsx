import Image from "next/image";
import Link from "next/link";
import { Mockup } from "@/components/mockups/mockup";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { ArrowRight, ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Section, type SectionTone } from "@/components/ui/section";
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
  tone?: "light" | "ice";
}) {
  return (
    <Stagger className="grid grid-cols-1 gap-3 sm:grid-cols-3" stagger={0.1}>
      {metrics.map((m) => (
        <StaggerItem
          key={m.label}
          className={cn(
            "flex flex-col gap-2 rounded-card p-5",
            tone === "ice" ? "bg-white" : "border border-line bg-surface",
          )}
        >
          <span className="text-h1 text-brand-orange">{m.value}</span>
          <span className="text-sm font-semibold text-brand-slate">{m.label}</span>
        </StaggerItem>
      ))}
    </Stagger>
  );
}

/** Teaser satu klien di halaman /success-stories/. */
export function StoryTeaser({
  story,
  tone,
  reverse,
}: {
  story: SuccessStory;
  tone: SectionTone;
  reverse?: boolean;
}) {
  return (
    <Section id={story.slug} tone={tone}>
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-20">
        <Reveal className="flex flex-col gap-5">
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full border border-line bg-white px-2.5 py-1 text-xs font-semibold text-brand-slate">
              {story.industry}
            </span>
            <DraftBadge show={story.draft} />
          </div>
          <h3>
            <Image src={story.logo} alt={story.name} className="h-auto max-h-14 w-auto max-w-[70%]" />
          </h3>
          <p className="text-lead text-pretty text-brand-slate">{story.summary}</p>
          <div className="flex flex-col gap-2">
            <span className="text-eyebrow text-brand-teal">THE CHALLENGE</span>
            <p className="text-base text-ink">{story.challenge.title}</p>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {story.help.features.map((key) => (
              <Link
                key={key}
                href={featureInfo[key].href}
                className="rounded-md bg-surface-ice px-2 py-1 text-xs font-semibold text-brand-teal hover:bg-brand-cyan-soft"
              >
                {featureInfo[key].label}
              </Link>
            ))}
          </div>
          <ButtonLink
            href={`/success-stories/${story.slug}/`}
            variant="outline"
            withArrow
            className="mt-2 self-start"
          >
            Read the full story
          </ButtonLink>
        </Reveal>

        <Reveal delay={0.15} className={cn("flex flex-col gap-4", reverse && "lg:order-first")}>
          <div className={cn("rounded-panel p-4 sm:p-8", tone === "white" ? "bg-surface-ice" : "bg-white")}>
            <Mockup data={story.help.visual} />
          </div>
          <MetricTiles metrics={story.result.metrics} />
        </Reveal>
      </div>
    </Section>
  );
}

/** About Company — hero halaman detail. */
export function StoryAbout({ story }: { story: SuccessStory }) {
  return (
    <section className="bg-grid relative overflow-hidden bg-white">
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/0 from-40% to-white"
        aria-hidden
      />
      <Container className="relative grid items-center gap-12 pt-12 pb-16 sm:pt-16 lg:grid-cols-[1.2fr_1fr] lg:gap-16 lg:pb-24">
        <Stagger className="flex flex-col gap-6" stagger={0.1}>
          <StaggerItem className="flex flex-wrap items-center gap-3 text-sm font-semibold">
            <Link href="/success-stories/" className="text-brand-teal hover:text-brand-slate">
              Success Stories
            </Link>
            <span className="text-line">/</span>
            <span className="text-brand-slate">{story.name}</span>
            <DraftBadge show={story.draft} />
          </StaggerItem>
          <StaggerItem>
            <Eyebrow accent>About the company</Eyebrow>
          </StaggerItem>
          <StaggerItem>
            <h1 className="text-display text-balance">{story.about.title}</h1>
          </StaggerItem>
          <StaggerItem>
            <p className="max-w-[620px] text-lead text-pretty text-brand-slate">{story.about.body}</p>
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
                <dt className="text-sm text-brand-slate">{fact.label}</dt>
                <dd className="text-sm font-semibold text-ink">{fact.value}</dd>
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
            <span className="text-base leading-relaxed text-ink">{point}</span>
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
                    className="group flex items-center justify-between gap-4 rounded-card border border-line p-5 transition-colors hover:border-brand-cyan"
                  >
                    <div className="flex flex-col gap-1">
                      <span className="font-bold text-ink">{f.label}</span>
                      <span className="text-sm text-brand-slate">{f.tools}</span>
                    </div>
                    <ArrowRight
                      size={16}
                      className="flex-none text-brand-teal transition-transform group-hover:translate-x-1"
                    />
                  </Link>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>
        <Reveal delay={0.15}>
          <div className="rounded-panel bg-surface-ice p-4 sm:p-8 lg:p-10">
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
    <Section tone="ice">
      <SectionHeader eyebrow="Result" title={result.title} lead={result.body} />
      <div className="mt-10 lg:mt-14">
        <MetricTiles metrics={result.metrics} tone="ice" />
      </div>
      {result.quote && (
        <Reveal className="mt-6 flex flex-col gap-4 rounded-card bg-white p-7">
          <p className="text-h3 font-semibold text-ink">“{result.quote.text}”</p>
          <span className="text-sm text-brand-slate">
            <strong className="text-ink">{result.quote.author}</strong> · {result.quote.role}
          </span>
        </Reveal>
      )}
    </Section>
  );
}
