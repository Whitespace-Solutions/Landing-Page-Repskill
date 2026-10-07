import { Fragment } from "react";
import Link from "next/link";
import { Mockup } from "@/components/mockups/mockup";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { ArrowRight, ButtonLink } from "@/components/ui/button";
import {
  articleHref,
  featureRequest,
  featureRequestHref,
  guideHref,
  guidePage,
  guides,
  type Guide,
  type GuideBlock,
  type GuideEntry,
} from "@/content/guide";
import { cn } from "@/lib/cn";

/** Teks dengan `**tebal**` → <strong>. */
function RichText({ text }: { text: string }) {
  return text.split(/\*\*(.+?)\*\*/g).map((part, i) =>
    i % 2 ? (
      <strong key={i} className="font-semibold text-brand-grey">
        {part}
      </strong>
    ) : (
      <Fragment key={i}>{part}</Fragment>
    ),
  );
}

export function GuideBreadcrumb({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm">
        {items.map((item, i) => (
          <li key={item.label} className="flex items-center gap-2">
            {i > 0 && (
              <span className="text-brand-charcoal/50" aria-hidden>
                /
              </span>
            )}
            {item.href ? (
              <Link
                href={item.href}
                className="font-medium text-brand-charcoal transition-colors hover:text-brand-grey"
              >
                {item.label}
              </Link>
            ) : (
              <span className="font-semibold text-brand-grey" aria-current="page">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

const sectionLabel = "text-caption font-bold tracking-[0.12em] uppercase";

/* ---------- /guide/ ---------- */

/** Isi halaman indeks: satu kartu per panduan + ajakan Feature Request. */
export function GuideHome() {
  return (
    <div className="flex flex-col gap-4">
      <Stagger className="grid gap-4 xl:grid-cols-2">
        {guides.map((guide) => (
          <StaggerItem key={guide.id} className="flex">
            <GuideCard guide={guide} />
          </StaggerItem>
        ))}
      </Stagger>
      <Reveal className="flex flex-col items-start gap-4 rounded-card bg-brand-linen p-6 sm:flex-row sm:items-center sm:justify-between sm:p-7">
        <div className="flex flex-col gap-1.5">
          <h2 className="text-h3">Can&apos;t find what you need?</h2>
          <p className="text-brand-charcoal">{featureRequest.lead}</p>
        </div>
        <ButtonLink href={featureRequestHref} variant="outline" className="flex-none">
          {featureRequest.label}
        </ButtonLink>
      </Reveal>
    </div>
  );
}

function GuideCard({ guide }: { guide: Guide }) {
  return (
    <div className="flex w-full flex-col gap-4 rounded-card border border-line bg-white p-6 sm:p-7">
      <span className={cn(sectionLabel, "text-brand-orange-deep")}>{guide.audience}</span>
      <h2 className="text-h3">
        <Link href={guideHref(guide.id)} className="transition-colors hover:text-brand-orange-deep">
          {guide.label}
        </Link>
      </h2>
      <p className="text-pretty text-brand-charcoal">{guide.description}</p>
      <ul className="mt-2 flex flex-col border-t border-line">
        {guide.sections.flatMap((section) =>
          section.articles.map((article) => (
            <li key={article.slug} className="border-b border-line">
              <Link
                href={articleHref(guide.id, article.slug)}
                className="group flex items-center justify-between gap-3 py-3 text-base font-medium text-brand-grey transition-colors hover:text-brand-orange-deep"
              >
                {article.title}
                <ArrowRight
                  size={16}
                  className="flex-none text-brand-charcoal transition-transform duration-200 group-hover:translate-x-1 group-hover:text-brand-orange-deep"
                />
              </Link>
            </li>
          )),
        )}
      </ul>
      <Link
        href={guideHref(guide.id)}
        className="group mt-auto inline-flex items-center gap-2 pt-2 font-semibold text-brand-grey"
      >
        {guidePage.readGuide}
        <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-1" />
      </Link>
    </div>
  );
}

/* ---------- /guide/[guide]/ ---------- */

export function GuideOverview({ guide }: { guide: Guide }) {
  return (
    <div>
      <GuideBreadcrumb items={[{ label: guidePage.home, href: "/guide/" }, { label: guide.label }]} />
      <h1 className="mt-5 text-h1 text-balance">{guide.label}</h1>
      <p className="mt-4 max-w-[620px] text-lead text-pretty text-brand-charcoal">{guide.description}</p>

      <div className="mt-10 flex flex-col gap-10 border-t border-line pt-10">
        {guide.sections.map((section) => (
          <section key={section.title} className="flex flex-col gap-4">
            <h2 className="text-h3">{section.title}</h2>
            <Stagger className="grid gap-3 md:grid-cols-2">
              {section.articles.map((article) => (
                <StaggerItem key={article.slug}>
                  <Link
                    href={articleHref(guide.id, article.slug)}
                    className="group flex h-full items-center justify-between gap-4 rounded-xl border border-line bg-white px-5 py-4 font-semibold text-brand-grey transition duration-200 hover:-translate-y-0.5 hover:border-brand-amber hover:shadow-glow"
                  >
                    {article.title}
                    <ArrowRight
                      size={16}
                      className="flex-none text-brand-charcoal transition-transform duration-200 group-hover:translate-x-1 group-hover:text-brand-grey"
                    />
                  </Link>
                </StaggerItem>
              ))}
            </Stagger>
          </section>
        ))}
      </div>
    </div>
  );
}

/* ---------- /guide/[guide]/[slug]/ ---------- */

export function GuideArticleView({
  entry,
  prev,
  next,
}: {
  entry: GuideEntry;
  prev?: GuideEntry;
  next?: GuideEntry;
}) {
  const { guide, article } = entry;
  return (
    <article className="max-w-[780px]">
      <GuideBreadcrumb
        items={[
          { label: guidePage.home, href: "/guide/" },
          { label: guide.label, href: guideHref(guide.id) },
          { label: article.title },
        ]}
      />
      <h1 className="mt-5 text-h1 text-balance">{article.title}</h1>

      <div className="mt-8 flex flex-col gap-6 border-t border-line pt-8">
        {article.blocks.map((block, i) => (
          <ArticleBlock key={i} block={block} />
        ))}
      </div>

      <nav aria-label="Article" className="mt-14 grid gap-4 border-t border-line pt-8 sm:grid-cols-2">
        {prev && <PagerLink entry={prev} direction="prev" />}
        {next && <PagerLink entry={next} direction="next" />}
      </nav>
    </article>
  );
}

function ArticleBlock({ block }: { block: GuideBlock }) {
  switch (block.type) {
    case "p":
      return (
        <p className="text-lg/relaxed text-pretty text-brand-charcoal">
          <RichText text={block.text} />
        </p>
      );
    case "h2":
      return <h2 className="mt-2 text-h3">{block.text}</h2>;
    case "steps":
      return (
        <Stagger as="ol" className="flex flex-col gap-4">
          {block.items.map((item, i) => (
            <StaggerItem as="li" key={i} className="flex gap-4">
              <span
                className="flex size-8 flex-none items-center justify-center rounded-full bg-brand-linen text-sm font-bold text-brand-grey"
                aria-hidden
              >
                {i + 1}
              </span>
              <span className="pt-0.5 text-lg/relaxed text-pretty text-brand-charcoal">
                <RichText text={item} />
              </span>
            </StaggerItem>
          ))}
        </Stagger>
      );
    case "callout":
      return (
        <aside className="flex flex-col gap-2 rounded-card bg-brand-linen p-5 sm:flex-row sm:gap-6 sm:p-6">
          <span className="flex-none text-eyebrow text-brand-orange-deep uppercase sm:w-24 sm:pt-1">
            {block.label}
          </span>
          <p className="text-pretty text-brand-grey">
            <RichText text={block.text} />
          </p>
        </aside>
      );
    case "shot":
      return (
        <Reveal as="div" className="my-2">
          <figure>
            <div className="overflow-hidden rounded-panel border border-line bg-surface">
              <div className="flex items-center gap-2 border-b border-line bg-white px-4 py-3">
                <span className="size-2.5 rounded-full bg-line" />
                <span className="size-2.5 rounded-full bg-line" />
                <span className="size-2.5 rounded-full bg-line" />
                <span className="ml-2 truncate text-caption font-semibold text-brand-charcoal">
                  {block.label}
                </span>
              </div>
              <div className="px-4 py-8 sm:px-10 sm:py-12">
                <div className="mx-auto max-w-[460px]">
                  <Mockup data={block.visual} />
                </div>
              </div>
            </div>
            <figcaption className="mt-3 text-caption text-brand-charcoal">{block.caption}</figcaption>
          </figure>
        </Reveal>
      );
  }
}

function PagerLink({ entry, direction }: { entry: GuideEntry; direction: "prev" | "next" }) {
  const isNext = direction === "next";
  return (
    <Link
      href={entry.href}
      className={cn(
        "group flex flex-col gap-1.5 rounded-card border border-line bg-white p-5 transition duration-200 hover:-translate-y-0.5 hover:border-brand-amber hover:shadow-glow",
        isNext && "sm:col-start-2 sm:items-end sm:text-right",
      )}
    >
      <span className={cn(sectionLabel, "inline-flex items-center gap-1.5 text-brand-charcoal")}>
        {!isNext && <ArrowRight size={14} className="rotate-180" />}
        {isNext ? guidePage.next : guidePage.prev}
        {isNext && <ArrowRight size={14} />}
      </span>
      <span className="font-bold text-brand-grey">{entry.article.title}</span>
      <span className="text-sm text-brand-charcoal">{entry.guide.label}</span>
    </Link>
  );
}
