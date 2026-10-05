import { Reveal } from "@/components/motion/reveal";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { primaryCta } from "@/content/navigation";

type FinalCtaProps = {
  title?: string;
  body?: string;
  cta?: string;
  href?: string;
};

/** CTA penutup yang dipakai ulang di bagian bawah banyak halaman. */
export function FinalCta({
  title = "Make Your Sales Expertise Scalable.",
  body = "See how Repskill can help turn your organization's expertise into capability your whole sales team can build.",
  cta = primaryCta.label,
  href = primaryCta.href,
}: FinalCtaProps) {
  return (
    <section className="relative overflow-hidden bg-brand-slate text-white">
      {/* Aksen garis miring dari brand symbol */}
      <div
        className="pointer-events-none absolute -top-10 right-[8%] hidden h-[140%] w-24 -skew-x-[20deg] bg-brand-orange/90 md:block"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -top-10 right-[calc(8%+7rem)] hidden h-[140%] w-24 -skew-x-[20deg] bg-brand-cyan/25 md:block"
        aria-hidden
      />

      <Container className="relative py-20 lg:py-28">
        <Reveal className="flex max-w-2xl flex-col gap-6">
          <h2 className="text-h1 text-balance">{title}</h2>
          <p className="text-lead text-pretty text-line">{body}</p>
          <ButtonLink href={href} size="lg" withArrow className="mt-2 self-start">
            {cta}
          </ButtonLink>
        </Reveal>
      </Container>
    </section>
  );
}
