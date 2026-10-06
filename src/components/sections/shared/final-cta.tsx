import { Reveal } from "@/components/motion/reveal";
import { SlashStripes } from "@/components/motion/slash-stripes";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { HighlightText } from "@/components/ui/highlight-text";
import { primaryCta } from "@/content/navigation";
import type { CtaData } from "@/content/types";

/**
 * CTA penutup yang dipakai ulang di bagian bawah banyak halaman.
 * Panel Shadow Grey membulat di atas latar putih, supaya tidak menempel ke footer yang juga gelap.
 */
export function FinalCta({ eyebrow, title, highlight, body, primary = primaryCta, secondary }: CtaData) {
  return (
    <section className="bg-white">
      <Container className="py-16 lg:py-24">
        <div className="relative overflow-hidden rounded-panel bg-brand-grey px-6 py-14 text-white sm:px-12 lg:px-16 lg:py-20">
          <SlashStripes className="absolute inset-y-0 right-0 hidden w-1/3 lg:block" />

          <Reveal className="relative flex max-w-2xl flex-col gap-6">
            {eyebrow && <Eyebrow accent>{eyebrow}</Eyebrow>}
            <h2 className="text-h1 text-balance">
              <HighlightText text={title} highlight={highlight} />
            </h2>
            <p className="text-lead text-pretty text-line/80">{body}</p>
            <div className="mt-2 flex flex-wrap gap-3">
              <ButtonLink href={primary.href} size="lg" withArrow>
                {primary.label}
              </ButtonLink>
              {secondary && (
                <ButtonLink href={secondary.href} size="lg" variant="outline-dark">
                  {secondary.label}
                </ButtonLink>
              )}
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
