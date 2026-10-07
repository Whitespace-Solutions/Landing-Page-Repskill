"use client";

import Image, { type StaticImageData } from "next/image";
import { Floating, usePointerParallax, type Pointer } from "@/components/motion/parallax";
import { Reveal } from "@/components/motion/reveal";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { HighlightText } from "@/components/ui/highlight-text";
import { HexOutline } from "@/components/ui/wireframe";
import { primaryCta } from "@/content/navigation";
import type { CtaData } from "@/content/types";

/**
 * CTA penutup terang dengan visual: teks rata kiri, di kanan satu foto heksagon besar, heksagon garis oranye, dan
 * heksagon isi oranye muda, semuanya melayang + parallax kursor (sama seperti CTA Home). Latar putih dengan cahaya
 * oranye tipis. Dipakai halaman fitur yang punya `ctaImage` (saat ini Capture Knowledge). Visual `aria-hidden`.
 */
export function VisualCta({
  eyebrow,
  title,
  highlight,
  body,
  primary = primaryCta,
  secondary,
  image,
}: CtaData & { image: StaticImageData }) {
  const { mx, my, handlers } = usePointerParallax();

  return (
    <section className="relative overflow-hidden border-t border-line bg-white" {...handlers}>
      {/* Cahaya oranye blur tipis di kiri dan kanan */}
      <div
        className="pointer-events-none absolute top-1/2 -left-48 size-[420px] -translate-y-1/2 rounded-full bg-brand-orange opacity-5 blur-[120px]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -top-24 -right-32 size-[520px] rounded-full bg-brand-orange opacity-7 blur-[140px]"
        aria-hidden
      />

      <Container className="relative grid items-center gap-14 py-20 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-12 lg:py-28 xl:py-32">
        <Reveal className="flex max-w-xl flex-col items-start gap-6">
          {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
          <h2 className="text-h1 text-balance">
            <HighlightText text={title} highlight={highlight} />
          </h2>
          <p className="text-lead text-pretty text-brand-charcoal">{body}</p>
          <div className="mt-2 flex flex-wrap gap-3">
            <ButtonLink href={primary.href} size="lg" withArrow>
              {primary.label}
            </ButtonLink>
            {secondary && (
              <ButtonLink href={secondary.href} size="lg" variant="outline">
                {secondary.label}
              </ButtonLink>
            )}
          </div>
        </Reveal>

        <Reveal className="w-full" delay={0.15}>
          <Visual image={image} mx={mx} my={my} />
        </Reveal>
      </Container>
    </section>
  );
}

/**
 * Komposisi dari contoh desain: foto di kiri atas, heksagon garis besar di kanan (sedikit lebih rendah), heksagon isi
 * kecil di bawah di antara keduanya. Posisi dalam % dari kotak visual (rasio 500 : 426).
 */
function Visual({ image, mx, my }: Pointer & { image: StaticImageData }) {
  return (
    <div
      className="relative mx-auto aspect-[500/426] w-full max-w-[340px] sm:max-w-[420px] lg:mr-0 lg:max-w-[460px]"
      aria-hidden
    >
      <Floating
        className="top-[31%] left-[64.5%] aspect-square w-[35.5%] text-brand-orange opacity-90"
        animation="motion-safe:animate-hex-float"
        depth={30}
        duration="9.5s"
        delay="-1s"
        mx={mx}
        my={my}
      >
        {/* Diputar 90° supaya sudutnya di atas, seperti bingkai foto */}
        <HexOutline className="block size-full rotate-90" strokeWidth={1.1} />
      </Floating>
      <Floating
        className="top-[79%] left-[47%] aspect-square w-[16%] text-brand-orange opacity-25"
        animation="motion-safe:animate-hex-float"
        depth={60}
        duration="7.5s"
        delay="-3s"
        mx={mx}
        my={my}
      >
        <HexOutline className="block size-full rotate-90 fill-current" />
      </Floating>
      <Floating
        className="top-0 left-0 w-[58%]"
        animation="motion-safe:animate-float-soft"
        depth={40}
        duration="8s"
        delay="0s"
        mx={mx}
        my={my}
      >
        <Image src={image} alt="" sizes="(min-width: 1024px) 270px, 240px" className="block h-auto w-full" />
      </Floating>
    </div>
  );
}
