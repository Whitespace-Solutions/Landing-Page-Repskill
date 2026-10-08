import Link from "next/link";
import { Mockup } from "@/components/mockups/mockup";
import { Reveal } from "@/components/motion/reveal";
import { ArrowRight, ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { featureInfo } from "@/content/features";
import type { SuccessStory } from "@/content/success-stories";
import { successStoriesPage } from "@/content/success-stories-page";
import { StoryToc, type TocItem } from "./story-toc";

const copy = successStoriesPage.detail;

/**
 * Halaman detail success story dalam format artikel (latar putih): tautan kembali + headline saja di atas, lalu tiga
 * kolom di lg+ (daftar isi menempel · artikel · kotak Book Demo menempel) dan banner CTA bergradasi oranye di bawah.
 * Di bawah lg hanya kolom artikel yang tampil.
 */
export function StoryArticle({ story }: { story: SuccessStory }) {
  const toc: TocItem[] = [
    { id: "about", label: copy.sections.about.replace("{name}", story.name) },
    { id: "challenge", label: copy.sections.challenge },
    { id: "approach", label: copy.sections.help },
    { id: "results", label: copy.sections.result },
  ];
  const [about, challenge, approach, results] = toc;

  return (
    <>
      <Container className="pt-8 pb-12 lg:pt-12 lg:pb-16">
        <Reveal className="flex flex-col items-start gap-6">
          <Link
            href={copy.back.href}
            className="group inline-flex items-center gap-1.5 text-sm font-semibold text-brand-charcoal hover:text-brand-grey"
          >
            <ArrowRight size={15} className="rotate-180 transition-transform group-hover:-translate-x-1" />
            {copy.back.label}
          </Link>
          <h1 className="max-w-[920px] text-h1 text-balance">{story.about.title}</h1>
        </Reveal>
      </Container>

      <Container className="grid items-start gap-12 pb-20 lg:grid-cols-[220px_minmax(0,1fr)_220px] xl:grid-cols-[260px_minmax(0,1fr)_260px]">
        <div className="sticky top-24 hidden lg:block">
          <StoryToc label={copy.tocLabel} items={toc} />
        </div>

        <article className="flex max-w-[760px] flex-col gap-14">
          <ArticleSection id={about.id} title={about.label}>
            <p>{story.about.body}</p>
            <dl className="mt-2 grid grid-cols-1 divide-y divide-line rounded-card border border-line sm:grid-cols-3 sm:divide-x sm:divide-y-0">
              {story.about.facts.map((fact) => (
                <div key={fact.label} className="flex flex-col gap-1 p-4">
                  <dt className="text-eyebrow text-brand-charcoal uppercase">{fact.label}</dt>
                  <dd className="font-semibold text-brand-grey">{fact.value}</dd>
                </div>
              ))}
            </dl>
          </ArticleSection>

          <ArticleSection id={challenge.id} title={challenge.label}>
            <p className="font-semibold text-brand-grey">{story.challenge.title}</p>
            <p>{story.challenge.body}</p>
            <ol className="flex flex-col gap-3">
              {story.challenge.points.map((point, i) => (
                <li key={point} className="flex gap-4 border-l-2 border-line pl-4">
                  <span className="font-bold text-brand-orange">{i + 1}.</span>
                  <span>{point}</span>
                </li>
              ))}
            </ol>
          </ArticleSection>

          <ArticleSection id={approach.id} title={approach.label}>
            <p className="font-semibold text-brand-grey">{story.help.title}</p>
            <p>{story.help.body}</p>
            <ul className="flex flex-col gap-3">
              {story.help.features.map((key) => {
                const f = featureInfo[key];
                return (
                  <li key={key}>
                    <Link
                      href={f.href}
                      className="group flex items-center justify-between gap-4 rounded-card border border-line p-5 transition-colors hover:border-brand-amber"
                    >
                      <span className="flex flex-col gap-1">
                        <span className="font-bold text-brand-grey">{f.label}</span>
                        <span className="text-sm text-brand-charcoal">{f.tools}</span>
                      </span>
                      <ArrowRight
                        size={16}
                        className="flex-none text-brand-charcoal transition-transform group-hover:translate-x-1"
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>
            <div className="mt-2 rounded-panel bg-brand-linen p-4 sm:p-8">
              <Mockup data={story.help.visual} />
            </div>
          </ArticleSection>

          <ArticleSection id={results.id} title={results.label}>
            <p>{story.result.body}</p>
            <dl className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              {story.result.metrics.map((m) => (
                <div key={m.label} className="flex flex-col gap-2 rounded-card bg-brand-linen p-5">
                  <dt className="order-last text-eyebrow text-brand-charcoal uppercase">{m.label}</dt>
                  <dd className="text-h1 text-brand-orange">{m.value}</dd>
                </div>
              ))}
            </dl>
            {story.result.quote && (
              <figure className="flex flex-col gap-3 border-l-2 border-brand-orange pl-5">
                <blockquote className="text-h3 text-brand-grey">“{story.result.quote.text}”</blockquote>
                <figcaption className="text-sm">
                  <strong className="text-brand-grey">{story.result.quote.author}</strong> ·{" "}
                  {story.result.quote.role}
                </figcaption>
              </figure>
            )}
          </ArticleSection>
        </article>

        <aside className="sticky top-24 hidden lg:block">
          <div className="flex flex-col items-center gap-5 rounded-card border border-line p-6 text-center">
            <p className="text-base font-bold text-balance text-brand-grey">{copy.aside.title}</p>
            <ButtonLink href={copy.aside.cta.href} className="w-full">
              {copy.aside.cta.label}
            </ButtonLink>
          </div>
        </aside>
      </Container>

      <StoryCtaBanner />
    </>
  );
}

function ArticleSection({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <Reveal>
      <section
        id={id}
        className="flex scroll-mt-24 flex-col gap-5 text-lg leading-relaxed text-brand-charcoal"
      >
        <h2 className="text-h2 text-brand-grey">{title}</h2>
        {children}
      </section>
    </Reveal>
  );
}

/** Banner CTA sederhana: panel membulat bergradasi oranye lembut (atas → bawah), satu kalimat + satu tombol. */
function StoryCtaBanner() {
  return (
    <Container className="pb-20 lg:pb-28">
      <Reveal className="mx-auto flex max-w-[960px] flex-col items-center gap-6 rounded-panel bg-linear-to-b from-brand-orange/5 to-brand-orange/30 px-6 py-12 text-center sm:px-12 sm:py-14">
        <h2 className="max-w-[640px] text-h2 text-balance">{copy.banner.title}</h2>
        <ButtonLink href={copy.banner.cta.href} size="lg" withArrow>
          {copy.banner.cta.label}
        </ButtonLink>
      </Reveal>
    </Container>
  );
}
