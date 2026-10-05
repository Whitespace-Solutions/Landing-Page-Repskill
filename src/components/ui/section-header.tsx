import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/cn";
import { ButtonLink } from "./button";
import { Eyebrow } from "./eyebrow";
import { HighlightText } from "./highlight-text";

type SectionHeaderProps = {
  eyebrow: string;
  title: string;
  highlight?: string;
  lead?: string;
  /** Tombol outline di sisi kanan, mis. "View Success Stories" */
  action?: { label: string; href: string };
  /** `side`: judul kiri, paragraf kanan (untuk section besar / gelap) */
  layout?: "stack" | "side";
  size?: "h1" | "h2";
  tone?: "light" | "dark";
  className?: string;
};

/** Kerangka standar pembuka section: Eyebrow → Judul → Lead (→ tombol). */
export function SectionHeader({
  eyebrow,
  title,
  highlight,
  lead,
  action,
  layout = "stack",
  size = "h2",
  tone = "light",
  className,
}: SectionHeaderProps) {
  const dark = tone === "dark";
  const heading = (
    <h2
      className={cn(size === "h1" ? "text-h1" : "text-h2", "text-balance", dark ? "text-white" : "text-ink")}
    >
      <HighlightText text={title} highlight={highlight} />
    </h2>
  );
  const leadText = lead && (
    <p className={cn("text-lead text-pretty", dark ? "text-line" : "text-brand-slate")}>{lead}</p>
  );
  const eyebrowEl = <Eyebrow className={dark ? "text-brand-cyan" : undefined}>{eyebrow}</Eyebrow>;

  if (layout === "side") {
    return (
      <Reveal className={cn("flex flex-wrap items-end justify-between gap-x-16 gap-y-6", className)}>
        <div className="flex flex-[1_1_520px] flex-col gap-5">
          {eyebrowEl}
          {heading}
        </div>
        {leadText && <div className="flex-[1_1_360px]">{leadText}</div>}
      </Reveal>
    );
  }

  return (
    <Reveal className={cn("flex flex-wrap items-end justify-between gap-x-10 gap-y-6", className)}>
      <div className="flex max-w-[720px] flex-col gap-5">
        {eyebrowEl}
        {heading}
        {leadText}
      </div>
      {action && (
        <ButtonLink href={action.href} variant={dark ? "outline-dark" : "outline"}>
          {action.label}
        </ButtonLink>
      )}
    </Reveal>
  );
}
