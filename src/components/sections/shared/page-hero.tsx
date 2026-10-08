import { Mockup } from "@/components/mockups/mockup";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { HighlightText } from "@/components/ui/highlight-text";
import type { PageHeroData } from "@/content/types";
import { cn } from "@/lib/cn";

/**
 * Hero untuk halaman turunan: teks kiri, mockup kanan (atau teks saja bila tanpa visual).
 * `layout="side"` (tanpa visual & tombol): judul di kiri, lead di kanan sejajar bawah judul, di lg+. Judul `text-h1`, baru
 * `text-display` mulai 1360px, supaya tetap dua baris di laptop 1280px.
 */
export function PageHero({
  eyebrow,
  title,
  highlight,
  lead,
  primary,
  secondary,
  visual,
  layout,
}: PageHeroData) {
  if (layout === "side") {
    return (
      <section className="relative overflow-hidden bg-white">
        <Container className="grid gap-6 pt-14 pb-16 sm:pt-20 lg:grid-cols-[minmax(0,1fr)_minmax(0,380px)] lg:items-end lg:gap-16 lg:pt-24 lg:pb-24">
          <Stagger className="flex flex-col gap-6" stagger={0.1}>
            <StaggerItem>
              <Eyebrow>{eyebrow}</Eyebrow>
            </StaggerItem>
            <StaggerItem>
              <h1 className="max-w-[860px] text-h1 text-balance min-[1360px]:text-display">
                <HighlightText text={title} highlight={highlight} />
              </h1>
            </StaggerItem>
          </Stagger>
          <Reveal delay={0.25}>
            <p className="text-lead text-pretty text-brand-charcoal lg:pb-2">{lead}</p>
          </Reveal>
        </Container>
      </section>
    );
  }

  return (
    <section className="relative overflow-hidden bg-white">
      <Container
        className={cn(
          "relative grid items-center gap-12 pt-14 pb-16 sm:pt-20 lg:gap-16 lg:pt-24 lg:pb-24",
          visual && "lg:grid-cols-[1.05fr_1fr]",
        )}
      >
        <Stagger className="flex max-w-[720px] flex-col gap-6" stagger={0.1}>
          <StaggerItem>
            <Eyebrow>{eyebrow}</Eyebrow>
          </StaggerItem>
          <StaggerItem>
            <h1 className="text-display text-balance">
              <HighlightText text={title} highlight={highlight} />
            </h1>
          </StaggerItem>
          <StaggerItem>
            <p className="max-w-[620px] text-lead text-pretty text-brand-charcoal">{lead}</p>
          </StaggerItem>
          {(primary || secondary) && (
            <StaggerItem className="mt-2 flex flex-wrap gap-3">
              {primary && (
                <ButtonLink href={primary.href} size="lg" withArrow>
                  {primary.label}
                </ButtonLink>
              )}
              {secondary && (
                <ButtonLink href={secondary.href} size="lg" variant="outline">
                  {secondary.label}
                </ButtonLink>
              )}
            </StaggerItem>
          )}
        </Stagger>

        {visual && (
          <Reveal delay={0.35} className="w-full">
            <Mockup data={visual} />
          </Reveal>
        )}
      </Container>
    </section>
  );
}
