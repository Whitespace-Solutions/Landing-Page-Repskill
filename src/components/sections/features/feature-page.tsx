import { FeatureSplit } from "@/components/sections/shared/feature-split";
import { FinalCta } from "@/components/sections/shared/final-cta";
import { PageHero } from "@/components/sections/shared/page-hero";
import { VisualCta } from "@/components/sections/shared/visual-cta";
import type { FeaturePage } from "@/content/features";

/** Template halaman fitur: Hero → section penjelasan (berselang-seling) → CTA (terang dengan foto bila ada `ctaVisual`). */
export function FeaturePageView({ page }: { page: FeaturePage }) {
  return (
    <>
      <PageHero {...page.hero} />
      {page.sections.map((section, i) => (
        <FeatureSplit
          key={section.id ?? section.title}
          {...section}
          tone={i % 2 === 0 ? "surface" : "white"}
          reverse={i % 2 === 1}
        />
      ))}
      {page.ctaVisual ? <VisualCta {...page.cta} visual={page.ctaVisual} /> : <FinalCta {...page.cta} />}
    </>
  );
}
