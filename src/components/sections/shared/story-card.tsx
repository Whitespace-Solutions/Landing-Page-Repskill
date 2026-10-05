import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "@/components/ui/button";
import { featureInfo } from "@/content/features";
import type { SuccessStory } from "@/content/success-stories";

/** Kartu ringkas satu success story, menuju /success-stories/<slug>/. */
export function StoryCard({ story }: { story: SuccessStory }) {
  return (
    <Link
      href={`/success-stories/${story.slug}/`}
      className="group flex h-full flex-col gap-5 rounded-card border border-line bg-white p-7 transition-[border-color,box-shadow,transform] duration-200 hover:-translate-y-0.5 hover:border-brand-cyan hover:shadow-glow"
    >
      <div className="flex flex-col items-start gap-3">
        {/* Baris logo bertinggi tetap agar semua kartu sejajar */}
        <div className="flex h-10 items-center">
          <Image src={story.logo} alt={story.name} className="h-auto max-h-10 w-auto max-w-[180px]" />
        </div>
        <span className="rounded-full border border-line px-2.5 py-1 text-xs font-semibold whitespace-nowrap text-brand-slate">
          {story.industry}
        </span>
      </div>
      <p className="text-[15px] leading-relaxed text-brand-slate">{story.summary}</p>
      <div className="mt-auto flex flex-col gap-4">
        <div className="flex flex-wrap gap-1.5">
          {story.help.features.map((key) => (
            <span
              key={key}
              className="rounded-md bg-surface-ice px-2 py-1 text-xs font-semibold text-brand-teal"
            >
              {featureInfo[key].label}
            </span>
          ))}
        </div>
        <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-slate group-hover:text-ink">
          Read story
          <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}
