import { Mockup } from "@/components/mockups/mockup";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { HighlightText } from "@/components/ui/highlight-text";
import type { PageHeroData } from "@/content/types";
import { cn } from "@/lib/cn";

type PageHeroProps = PageHeroData & {
  /** Visual kanan khusus halaman (bukan mockup), mis. alur nilai di About. Dipakai bila `visual` kosong. */
  aside?: React.ReactNode;
};

/** Hero untuk halaman turunan: teks kiri, mockup/visual kanan (atau teks saja bila tanpa visual). */
export function PageHero({
  eyebrow,
  title,
  highlight,
  lead,
  primary,
  secondary,
  visual,
  aside,
}: PageHeroProps) {
  const hasVisual = Boolean(visual || aside);
  return (
    <section className="relative overflow-hidden bg-white">
      <Container
        className={cn(
          "relative grid items-center gap-12 pt-14 pb-16 sm:pt-20 lg:gap-16 lg:pt-24 lg:pb-24",
          hasVisual && "lg:grid-cols-[1.05fr_1fr]",
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

        {hasVisual && (
          <Reveal delay={0.35} className="w-full">
            {visual ? <Mockup data={visual} /> : aside}
          </Reveal>
        )}
      </Container>
    </section>
  );
}
