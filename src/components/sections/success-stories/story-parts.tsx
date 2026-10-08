import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "@/components/ui/button";
import type { SuccessStory } from "@/content/success-stories";

/** Penanda konten yang belum final — hilang otomatis saat `draft: false`. */
export function DraftBadge({ show }: { show: boolean }) {
  if (!show) return null;
  return (
    <span className="rounded-full border border-dashed border-brand-orange px-2.5 py-1 text-xs font-semibold text-brand-orange-deep">
      Draft content
    </span>
  );
}

/**
 * Satu baris klien di halaman /success-stories/ (latar `surface`): judul hasil + ringkasan + tautan "Read Case Study",
 * kolom metrik, dan logo berwarna dalam kotak putih. Antar baris dipisah garis tipis.
 */
export function StoryRow({ story }: { story: SuccessStory }) {
  const href = `/success-stories/${story.slug}/`;
  return (
    <article className="grid gap-8 border-t border-line py-10 lg:grid-cols-[minmax(0,1.7fr)_minmax(0,1fr)_minmax(0,1fr)] lg:gap-12 lg:py-14">
      <div className="flex flex-col items-start gap-5">
        <DraftBadge show={story.draft} />
        <h2 className="text-h2 text-balance text-brand-grey">
          {story.name}: {story.headline}
        </h2>
        <p className="max-w-[620px] text-base leading-relaxed text-pretty text-brand-charcoal">
          {story.summary}
        </p>
        <Link
          href={href}
          className="group mt-3 inline-flex items-center gap-3 border-b border-brand-grey/30 pb-3 text-eyebrow text-brand-grey uppercase transition-colors hover:border-brand-orange hover:text-brand-orange"
        >
          Read Case Study
          <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
        </Link>
      </div>

      <dl className="grid grid-cols-3 gap-6 lg:flex lg:flex-col lg:gap-8">
        {story.result.metrics.map((m) => (
          <div key={m.label} className="flex flex-col gap-2">
            <dt className="order-last text-eyebrow text-brand-charcoal uppercase">{m.label}</dt>
            <dd className="text-h2 text-brand-grey">{m.value}</dd>
          </div>
        ))}
      </dl>

      <Link
        href={href}
        tabIndex={-1}
        aria-hidden
        className="order-first flex h-28 items-center justify-center rounded-card border border-line bg-white p-8 transition-colors hover:border-brand-amber lg:order-none lg:aspect-[2.2/1] lg:h-auto lg:self-start"
      >
        <Image src={story.logo} alt="" className="h-auto max-h-14 w-auto max-w-[70%]" />
      </Link>
    </article>
  );
}
