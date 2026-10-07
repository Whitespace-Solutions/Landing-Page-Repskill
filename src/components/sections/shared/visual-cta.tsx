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
import { cn } from "@/lib/cn";

/**
 * CTA penutup terang dengan visual: teks rata kiri, di sebelahnya satu foto heksagon besar, heksagon garis oranye, dan
 * heksagon isi oranye muda, semuanya melayang + parallax kursor (sama seperti CTA Home). Latar putih dengan cahaya
 * oranye tipis. Dipakai halaman fitur yang punya `ctaVisual` (ketiga halaman fitur). Visual `aria-hidden`.
 */
export function VisualCta({
  eyebrow,
  title,
  highlight,
  body,
  primary = primaryCta,
  secondary,
  visual,
}: CtaData & { visual: { image: StaticImageData; layout: VisualCtaLayout } }) {
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

      <Container className="relative grid items-center gap-14 py-20 lg:grid-cols-2 lg:gap-12 lg:py-28 xl:py-32">
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
          <Visual image={visual.image} layout={visual.layout} mx={mx} my={my} />
        </Reveal>
      </Container>
    </section>
  );
}

/**
 * Komposisi per halaman, diambil dari contoh desain. Posisi dalam % dari kotak visual (rasio = `box`). Urutan gambar:
 * heksagon garis, heksagon isi, lalu foto di paling depan.
 */
const layouts = {
  // Capture: foto kiri atas, heksagon garis besar di kanan (lebih rendah), heksagon isi kecil di bawah di antaranya
  capture: {
    box: "aspect-[500/426] max-w-[340px] sm:max-w-[420px] lg:max-w-[460px]",
    photo: "top-0 left-0 w-[58%]",
    outline: "top-[31%] left-[64.5%] w-[35.5%]",
    fill: "top-[79%] left-[47%] w-[16%]",
    sizes: "(min-width: 1024px) 270px, 240px",
  },
  // Learn: foto besar di tengah-kanan, heksagon garis di kanannya, heksagon isi di kiri bawah menempel ke foto.
  // Digeser 64px ke kiri (lg) supaya foto mulai di titik yang sama dengan Capture, dekat ke judul.
  learn: {
    box: "aspect-[643/442] max-w-[360px] sm:max-w-[460px] lg:-ml-16 lg:max-w-[500px]",
    photo: "top-0 left-[12%] w-[62%]",
    outline: "top-[38%] left-[78%] w-[22%]",
    fill: "top-[80%] left-0 w-[13%]",
    sizes: "(min-width: 1024px) 310px, 280px",
  },
  // Practice: foto besar di kiri, heksagon garis di kanan atas, heksagon isi di kanan bawah (sejajar tepi kanan foto)
  practice: {
    box: "aspect-[540/430] max-w-[340px] sm:max-w-[420px] lg:max-w-[440px]",
    photo: "top-0 left-0 w-[72%]",
    outline: "top-[27%] left-[78%] w-[22%]",
    fill: "top-[79%] left-[77.5%] w-[15%]",
    sizes: "(min-width: 1024px) 320px, 300px",
  },
} as const;

export type VisualCtaLayout = keyof typeof layouts;

function Visual({ image, layout, mx, my }: Pointer & { image: StaticImageData; layout: VisualCtaLayout }) {
  const l = layouts[layout];
  return (
    <div className={cn("relative mx-auto w-full lg:ml-0", l.box)} aria-hidden>
      <Floating
        className={cn("aspect-square text-brand-orange opacity-90", l.outline)}
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
        className={cn("aspect-square text-brand-orange opacity-25", l.fill)}
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
        className={l.photo}
        animation="motion-safe:animate-float-soft"
        depth={40}
        duration="8s"
        delay="0s"
        mx={mx}
        my={my}
      >
        <Image src={image} alt="" sizes={l.sizes} className="block h-auto w-full" />
      </Floating>
    </div>
  );
}
