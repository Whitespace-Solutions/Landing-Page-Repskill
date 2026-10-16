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
  /** Judul satu baris mulai `lg` (layout `stack`; hanya untuk judul yang muat, mis. The Solution di Home). */
  singleLineTitle?: boolean;
  /** Rata tengah di bawah `lg` (mobile & tablet), rata kiri mulai `lg`. Dipakai di section Home. */
  centerOnMobile?: boolean;
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
  singleLineTitle = false,
  centerOnMobile = false,
  className,
}: SectionHeaderProps) {
  const dark = tone === "dark";
  // Wadah: teks & tombol ke tengah di mobile; kolom teks: isinya ke tengah
  const centerWrap = centerOnMobile && "justify-center text-center lg:justify-between lg:text-left";
  const centerColumn = centerOnMobile && "items-center lg:items-start";
  const heading = (
    <h2
      className={cn(
        size === "h1" ? "text-h1" : "text-h2",
        "text-balance",
        singleLineTitle && "lg:whitespace-nowrap",
        dark ? "text-white" : "text-brand-grey",
      )}
    >
      <HighlightText text={title} highlight={highlight} />
    </h2>
  );
  const leadText = lead && (
    <p
      className={cn(
        "text-lead text-pretty",
        singleLineTitle && "max-w-[720px]",
        dark ? "text-line" : "text-brand-charcoal",
      )}
    >
      {lead}
    </p>
  );
  const eyebrowEl = <Eyebrow className={dark ? "text-brand-amber" : undefined}>{eyebrow}</Eyebrow>;

  if (layout === "side") {
    return (
      <Reveal
        className={cn("flex flex-wrap items-end justify-between gap-x-16 gap-y-6", centerWrap, className)}
      >
        <div className={cn("flex flex-[1_1_520px] flex-col gap-5", centerColumn)}>
          {eyebrowEl}
          {heading}
        </div>
        {leadText && <div className="flex-[1_1_360px]">{leadText}</div>}
      </Reveal>
    );
  }

  return (
    <Reveal
      className={cn("flex flex-wrap items-end justify-between gap-x-10 gap-y-6", centerWrap, className)}
    >
      <div
        className={cn("flex max-w-[720px] flex-col gap-5", singleLineTitle && "lg:max-w-none", centerColumn)}
      >
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
