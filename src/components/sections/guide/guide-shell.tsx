"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Stagger, StaggerItem } from "@/components/motion/reveal";
import { ArrowRight, ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import {
  articleHref,
  articlePlainText,
  featureRequest,
  featureRequestHref,
  guideEntries,
  guidePage,
  guides,
} from "@/content/guide";
import { cn } from "@/lib/cn";

const trimSlash = (path: string) => path.replace(/\/+$/, "") || "/";

// Teks yang dicari per artikel, disiapkan sekali.
const searchIndex = guideEntries.map((entry) => ({
  entry,
  haystack: [entry.article.title, entry.section.title, articlePlainText(entry.article)]
    .join(" ")
    .toLowerCase(),
}));

/**
 * Kerangka Help Center: hero + pencarian, sidebar daftar artikel, dan area konten.
 * Saat pencarian terisi, area konten diganti hasil pencarian.
 */
export function GuideShell({ children }: { children: React.ReactNode }) {
  const pathname = trimSlash(usePathname());
  const isIndex = pathname === "/guide";
  const activeGuideId = pathname.split("/")[2];

  const [query, setQuery] = useState("");
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const q = query.trim().toLowerCase();
  const results = useMemo(
    () => (q ? searchIndex.filter((s) => s.haystack.includes(q)).map((s) => s.entry) : []),
    [q],
  );

  const onNavigate = () => {
    setQuery("");
    setMobileNavOpen(false);
  };

  const search = (
    <SearchBox
      value={query}
      onChange={setQuery}
      className={isIndex ? "mt-8 max-w-2xl" : "w-full lg:max-w-xl lg:flex-1"}
    />
  );

  return (
    <>
      <section className="border-b border-line bg-white">
        {isIndex ? (
          <Container className="pt-14 pb-14 sm:pt-20 lg:pt-24 lg:pb-20">
            <Stagger className="flex flex-col gap-6" stagger={0.1}>
              <StaggerItem>
                <Eyebrow accent>{guidePage.eyebrow}</Eyebrow>
              </StaggerItem>
              <StaggerItem>
                <h1 className="text-display text-balance">{guidePage.title}</h1>
              </StaggerItem>
              <StaggerItem>
                <p className="max-w-[620px] text-lead text-pretty text-brand-charcoal">{guidePage.lead}</p>
                {search}
              </StaggerItem>
            </Stagger>
          </Container>
        ) : (
          <Container className="flex flex-wrap items-center gap-x-8 gap-y-4 py-6 lg:py-8">
            <Eyebrow accent>{guidePage.eyebrow}</Eyebrow>
            {search}
          </Container>
        )}
      </section>

      <Container className="grid gap-6 pt-8 pb-20 lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-14 lg:pt-12 lg:pb-28">
        <aside className="lg:sticky lg:top-[96px] lg:self-start">
          <button
            type="button"
            onClick={() => setMobileNavOpen((o) => !o)}
            aria-expanded={mobileNavOpen}
            aria-controls="guide-nav"
            className="flex w-full items-center justify-between rounded-button border border-line bg-white px-4 py-3 font-semibold text-brand-grey lg:hidden"
          >
            {guidePage.browse}
            <Chevron open={mobileNavOpen} />
          </button>
          <GuideNav
            id="guide-nav"
            pathname={pathname}
            isIndex={isIndex}
            activeGuideId={activeGuideId}
            onNavigate={onNavigate}
            className={cn(
              "max-lg:mt-2 max-lg:rounded-card max-lg:border max-lg:border-line max-lg:p-3",
              !mobileNavOpen && "max-lg:hidden",
            )}
          />
        </aside>

        <div className="min-w-0">
          {q ? <SearchResults query={query} results={results} onNavigate={onNavigate} /> : children}
        </div>
      </Container>
    </>
  );
}

function SearchBox({
  value,
  onChange,
  className,
}: {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}) {
  return (
    <div className={cn("relative", className)}>
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-brand-charcoal"
        aria-hidden
      >
        <circle cx="11" cy="11" r="7" />
        <path d="M20 20l-4-4" />
      </svg>
      <input
        type="text"
        role="searchbox"
        enterKeyHint="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => e.key === "Escape" && onChange("")}
        placeholder={guidePage.searchPlaceholder}
        aria-label={guidePage.searchLabel}
        className="h-13 w-full rounded-button border border-line bg-white pr-12 pl-11 text-base text-brand-grey transition-colors outline-none placeholder:text-brand-charcoal/70 focus:border-brand-grey focus:ring-2 focus:ring-brand-amber/40"
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange("")}
          aria-label="Clear search"
          className="absolute top-1/2 right-2 flex size-9 -translate-y-1/2 items-center justify-center rounded-lg text-brand-charcoal transition-colors hover:bg-surface hover:text-brand-grey"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            aria-hidden
          >
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>
      )}
    </div>
  );
}

function GuideNav({
  id,
  pathname,
  isIndex,
  activeGuideId,
  onNavigate,
  className,
}: {
  id: string;
  pathname: string;
  isIndex: boolean;
  activeGuideId?: string;
  onNavigate: () => void;
  className?: string;
}) {
  // Grup yang dibuka/tutup manual oleh pengguna; selain itu grup aktif (atau semua di halaman indeks) terbuka.
  const [toggled, setToggled] = useState<Record<string, boolean>>({});

  return (
    <nav id={id} aria-label="Guide" className={cn("flex flex-col gap-1", className)}>
      {guides.map((guide) => {
        const open = toggled[guide.id] ?? (isIndex || guide.id === activeGuideId);
        return (
          <div key={guide.id}>
            <button
              type="button"
              onClick={() => setToggled((t) => ({ ...t, [guide.id]: !open }))}
              aria-expanded={open}
              className={cn(
                "flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left font-bold transition-colors hover:bg-surface",
                guide.id === activeGuideId ? "text-brand-grey" : "text-brand-charcoal",
              )}
            >
              {guide.label}
              <Chevron open={open} />
            </button>
            {open && (
              <div className="mt-1 mb-3 ml-3 flex flex-col border-l border-line pl-2">
                {guide.sections.map((section) => (
                  <div key={section.title} className="flex flex-col">
                    <span className="px-3 pt-3 pb-1.5 text-caption font-bold tracking-[0.12em] text-brand-charcoal uppercase">
                      {section.title}
                    </span>
                    {section.articles.map((article) => {
                      const href = articleHref(guide.id, article.slug);
                      const active = pathname === trimSlash(href);
                      return (
                        <Link
                          key={article.slug}
                          href={href}
                          onClick={onNavigate}
                          aria-current={active ? "page" : undefined}
                          className={cn(
                            "rounded-lg px-3 py-2 text-sm transition-colors",
                            active
                              ? "bg-brand-orange/10 font-semibold text-brand-orange-deep"
                              : "font-medium text-brand-charcoal hover:bg-surface hover:text-brand-grey",
                          )}
                        >
                          {article.title}
                        </Link>
                      );
                    })}
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
      <div className="mt-2 border-t border-line pt-2">
        <Link
          href={featureRequestHref}
          onClick={onNavigate}
          aria-current={pathname === trimSlash(featureRequestHref) ? "page" : undefined}
          className={cn(
            "flex items-center justify-between rounded-xl px-3 py-2.5 font-bold transition-colors hover:bg-surface",
            pathname === trimSlash(featureRequestHref)
              ? "text-brand-orange-deep"
              : "text-brand-charcoal hover:text-brand-grey",
          )}
        >
          {featureRequest.label}
          <ArrowRight size={16} />
        </Link>
      </div>
    </nav>
  );
}

function SearchResults({
  query,
  results,
  onNavigate,
}: {
  query: string;
  results: typeof guideEntries;
  onNavigate: () => void;
}) {
  return (
    <div>
      <h2 className="text-h2">{guidePage.results}</h2>
      <p className="mt-3 text-brand-charcoal" aria-live="polite">
        {results.length
          ? `${results.length} ${results.length === 1 ? "article matches" : "articles match"} “${query.trim()}”.`
          : guidePage.empty}
      </p>
      {results.length > 0 ? (
        <ul className="mt-8 flex flex-col gap-3">
          {results.map((entry) => (
            <li key={entry.href}>
              <Link
                href={entry.href}
                onClick={onNavigate}
                className="group flex items-center justify-between gap-4 rounded-card border border-line bg-white p-5 transition duration-200 hover:-translate-y-0.5 hover:border-brand-amber hover:shadow-glow"
              >
                <span className="flex flex-col gap-1">
                  <span className="text-caption font-bold tracking-[0.12em] text-brand-orange-deep uppercase">
                    {entry.guide.label} · {entry.section.title}
                  </span>
                  <span className="text-lg font-bold text-brand-grey">{entry.article.title}</span>
                </span>
                <ArrowRight className="flex-none text-brand-charcoal transition-transform duration-200 group-hover:translate-x-1 group-hover:text-brand-grey" />
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <div className="mt-8">
          <ButtonLink href={featureRequestHref} variant="outline" onClick={onNavigate}>
            {featureRequest.label}
          </ButtonLink>
        </div>
      )}
    </div>
  );
}

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("flex-none transition-transform duration-200", open && "rotate-180")}
      aria-hidden
    >
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}
