import { FeatureSplit } from "@/components/sections/shared/feature-split";
import { FinalCta } from "@/components/sections/shared/final-cta";
import { PageHero } from "@/components/sections/shared/page-hero";
import { VisualCta } from "@/components/sections/shared/visual-cta";
import type { FeaturePage } from "@/content/features";

/**
 * Template halaman fitur: Hero → section penjelasan (berselang-seling) → CTA (terang dengan foto bila ada `ctaVisual`).
 * Blok `continued` ikut latar & sisi blok sebelumnya, jadi selang-seling dihitung per kelompok.
 */
export function FeaturePageView({ page }: { page: FeaturePage }) {
  let group = -1;
  const groups = page.sections.map((section) => (section.continued ? group : ++group));

  return (
    <>
      {/* Mobile & tablet (satu kolom): eyebrow, judul, dan paragraf rata tengah; mulai lg rata kiri */}
      <PageHero {...page.hero} centerOnMobile />
      {page.sections.map((section, i) => (
        <FeatureSplit
          key={section.id ?? section.title}
          {...section}
          centerOnMobile
          tone={groups[i] % 2 === 0 ? "surface" : "white"}
          reverse={groups[i] % 2 === 1}
        />
      ))}
      {page.ctaVisual ? (
        <VisualCta {...page.cta} visual={page.ctaVisual} centerOnMobile />
      ) : (
        <FinalCta {...page.cta} />
      )}
    </>
  );
}
