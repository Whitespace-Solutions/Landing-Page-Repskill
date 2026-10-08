"use client";

import Image from "next/image";
import { Floating, usePointerParallax, type Pointer } from "@/components/motion/parallax";
import { Reveal } from "@/components/motion/reveal";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { HighlightText } from "@/components/ui/highlight-text";
import { HexOutline } from "@/components/ui/wireframe";
import { heroPersonas, homeCta } from "@/content/home";
import type { CtaData } from "@/content/types";
import { primaryCta } from "@/content/navigation";
import { cn } from "@/lib/cn";

/**
 * Posisi dekorasi di layar lebar (xl+), dalam % dari Container (kiri/lebar) dan tinggi section (atas).
 * Diambil dari contoh desain CTA Home: dua foto di kiri, satu di kanan, heksagon garis & isi di sekelilingnya.
 */
const photoLayout = [
  // Capture: kiri atas
  { className: "left-[3.5%] top-[20%]", depth: 36, duration: "8s", delay: "0s" },
  // Learn: kiri bawah, sedikit masuk ke tengah
  { className: "left-[9.5%] top-[53%]", depth: 52, duration: "9.5s", delay: "-3s" },
  // Practice: kanan
  { className: "left-[81%] top-[30%]", depth: 44, duration: "8.5s", delay: "-5s" },
];

const hexLayout = [
  // Garis kecil kiri atas
  { className: "left-[15.5%] top-[15%] w-[44px]", filled: false, depth: 24, duration: "9s", delay: "0s" },
  // Isi lembut kiri
  { className: "left-0 top-[41%] w-[38px]", filled: true, depth: 60, duration: "7.5s", delay: "-2s" },
  // Garis besar kiri bawah
  { className: "left-0 top-[64%] w-[82px]", filled: false, depth: 30, duration: "10s", delay: "-4s" },
  // Garis besar kanan
  { className: "right-0 top-[40%] w-[82px]", filled: false, depth: 30, duration: "9.5s", delay: "-1s" },
  // Isi lembut kanan
  { className: "right-[7%] top-[60%] w-[38px]", filled: true, depth: 60, duration: "8s", delay: "-6s" },
];

/**
 * CTA penutup khusus Home: teks di tengah di atas latar putih dengan cahaya oranye tipis di kiri-kanan, diapit foto
 * heksagon Capture / Learn / Practice dan heksagon dekoratif yang melayang + parallax kursor (sama seperti hero).
 * Di bawah xl foto menjadi deretan kecil di atas eyebrow dan heksagon disembunyikan. Dekorasi `aria-hidden`.
 * Copy default `homeCta`; halaman lain (mis. Success Stories) bisa mengirim `CtaData` sendiri.
 */
export function HomeCta(props: Partial<CtaData>) {
  const { mx, my, handlers } = usePointerParallax();
  const { eyebrow, title, highlight, body, primary = primaryCta, secondary } = { ...homeCta, ...props };

  return (
    <section className="relative overflow-hidden bg-white" {...handlers}>
      {/* Cahaya oranye blur tipis di kiri dan kanan */}
      <div
        className="pointer-events-none absolute top-1/2 -left-48 size-[420px] -translate-y-1/2 rounded-full bg-brand-orange opacity-7 blur-[120px]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute top-1/2 -right-48 size-[420px] -translate-y-1/2 rounded-full bg-brand-orange opacity-7 blur-[120px]"
        aria-hidden
      />

      <Container className="relative py-20 lg:py-28 xl:py-32">
        <Reveal className="pointer-events-none absolute inset-0 hidden xl:block" delay={0.15}>
          <Decorations mx={mx} my={my} />
        </Reveal>

        <Reveal className="relative mx-auto flex max-w-2xl flex-col items-center gap-6 text-center">
          <PhotoRow mx={mx} my={my} />
          {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
          <h2 className="text-h1 text-balance">
            <HighlightText text={title} highlight={highlight} />
          </h2>
          <p className="text-lead text-pretty text-brand-charcoal">{body}</p>
          <div className="mt-2 flex flex-wrap justify-center gap-3">
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
      </Container>
    </section>
  );
}

/** Foto & heksagon di kiri-kanan teks (xl+). */
function Decorations({ mx, my }: Pointer) {
  return (
    <div className="absolute inset-x-5 inset-y-0 sm:inset-x-8 lg:inset-x-16" aria-hidden>
      {hexLayout.map((hex, i) => (
        <Floating
          key={i}
          className={cn(
            "aspect-square text-brand-orange",
            hex.filled ? "opacity-20" : "opacity-50",
            hex.className,
          )}
          animation="motion-safe:animate-hex-float"
          depth={hex.depth}
          duration={hex.duration}
          delay={hex.delay}
          mx={mx}
          my={my}
        >
          {/* Diputar 90° supaya sudutnya di atas, seperti bingkai foto */}
          <HexOutline className={cn("block size-full rotate-90", hex.filled && "fill-current")} />
        </Floating>
      ))}
      {heroPersonas.map((persona, i) => {
        const layout = photoLayout[i];
        return (
          <Floating
            key={persona.title}
            className={cn("w-[10%] max-w-[136px]", layout.className)}
            animation="motion-safe:animate-float-soft"
            depth={layout.depth}
            duration={layout.duration}
            delay={layout.delay}
            mx={mx}
            my={my}
          >
            <Image src={persona.image} alt="" sizes="136px" className="block h-auto w-full drop-shadow-lg" />
          </Floating>
        );
      })}
    </div>
  );
}

/** Di bawah xl: tiga foto kecil berderet di atas eyebrow, tetap melayang pelan. */
function PhotoRow({ mx, my }: Pointer) {
  return (
    <div className="relative flex h-24 w-56 justify-center xl:hidden" aria-hidden>
      {heroPersonas.map((persona, i) => (
        <Floating
          key={persona.title}
          className={cn("w-20", ["top-3 left-0", "top-0 left-18", "top-3 left-36"][i])}
          animation="motion-safe:animate-float-soft"
          depth={0}
          duration={photoLayout[i].duration}
          delay={photoLayout[i].delay}
          mx={mx}
          my={my}
        >
          <Image src={persona.image} alt="" sizes="80px" className="block h-auto w-full drop-shadow-lg" />
        </Floating>
      ))}
    </div>
  );
}
