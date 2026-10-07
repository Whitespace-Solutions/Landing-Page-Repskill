"use client";

import Image from "next/image";
import { motion, useTransform } from "motion/react";
import repskillIcon from "@/assets/brand/repskill-icon.svg";
import { Floating, type Pointer } from "@/components/motion/parallax";
import { FeatureIcon } from "@/components/ui/feature-icon";
import { HexOutline, Wireframe } from "@/components/ui/wireframe";
import { heroPersonas } from "@/content/home";
import { cn } from "@/lib/cn";

/**
 * Posisi tiap persona (foto heksagon + kartu keterangan), dalam % dari wadah ilustrasi. `photo` = sudut kiri atas foto,
 * `card` = posisi kartu relatif ke foto (% dari ukuran foto). Mengikuti contoh desain hero, dengan aturan: foto dan
 * kartu tidak boleh menabrak wireframe yang berputar (kartu di luar lingkaran wireframe, di sudut-sudutnya).
 */
const personaLayout = [
  // Capture: kiri atas, kartu di kanan atas foto (di atas wireframe)
  { photo: "left-[-12%] top-[6%]", card: "left-[96%] top-[-82%]", depth: 36, duration: "8s", delay: "0s" },
  // Learn: kiri bawah, kartu di kanan bawah foto (di bawah wireframe)
  { photo: "left-[-7%] top-[74%]", card: "left-[69%] top-[84%]", depth: 52, duration: "9.5s", delay: "-3s" },
  // Practice: kanan, kartu di bawah foto, rata kanan (di luar sisi kanan bawah wireframe)
  {
    photo: "left-[88%] top-[60%]",
    card: "right-[-30%] top-[124%]",
    depth: 44,
    duration: "8.5s",
    delay: "-5s",
  },
];

/**
 * Ilustrasi hero Home: wireframe oranye yang berputar pelan dan "bernapas", dengan cahaya berdenyut dan ring orbit.
 * Di tengahnya logo Repskill (tidak ikut berputar, hanya melayang). Di sekelilingnya tiga foto heksagon dengan kartu
 * Capture / Learn / Practice dan dua heksagon garis, semuanya melayang pelan. Semua elemen bergeser mengikuti kursor
 * (parallax, `mx`/`my` = -0.5…0.5). Animasi CSS memakai `motion-safe:` sehingga berhenti saat "reduce motion".
 * Seluruh ilustrasi dekoratif (`aria-hidden`): isinya sudah dijelaskan oleh judul, paragraf, dan menu Features.
 */
export function HeroOrb({ mx, my }: Pointer) {
  const wx = useTransform(mx, (v) => v * 24);
  const wy = useTransform(my, (v) => v * 24);

  return (
    <div
      className="relative mx-auto mt-14 grid aspect-square w-full max-w-[270px] place-items-center sm:max-w-[380px] lg:mt-0 lg:ml-[6%] lg:aspect-auto lg:min-h-[clamp(340px,40vw,466px)] lg:w-[82%] lg:max-w-none"
      aria-hidden
    >
      <div className="absolute aspect-square w-4/5 rounded-full bg-orb-glow motion-safe:animate-orb-glow" />
      <svg
        viewBox="0 0 400 400"
        fill="none"
        className="absolute h-auto w-full max-w-[460px] overflow-visible text-brand-orange opacity-60"
      >
        <circle cx="200" cy="200" r="194" stroke="currentColor" strokeOpacity={0.3} />
        <circle cx="200" cy="200" r="146" stroke="currentColor" strokeOpacity={0.2} />
        <ellipse cx="200" cy="200" rx="194" ry="70" stroke="currentColor" strokeOpacity={0.16} />
        <ellipse cx="200" cy="200" rx="70" ry="194" stroke="currentColor" strokeOpacity={0.16} />
      </svg>

      <motion.div className="relative z-1 w-[min(72%,332px)]" style={{ x: wx, y: wy }}>
        <div className="motion-safe:animate-orb-spin">
          <div className="motion-safe:animate-orb-breathe">
            <Wireframe className="block h-auto w-full text-brand-orange" />
          </div>
        </div>
        {/* Logo di tengah: di luar wadah putar, jadi hanya melayang */}
        <div className="absolute inset-0 grid place-items-center">
          <div className="w-[28%] motion-safe:animate-float-soft" style={{ animationDuration: "7s" }}>
            <Image src={repskillIcon} alt="" className="h-auto w-full drop-shadow-xl" priority />
          </div>
        </div>
      </motion.div>

      <Floating
        className="top-[2%] right-[7%] aspect-square w-[52px] text-brand-orange opacity-50"
        animation="motion-safe:animate-hex-float"
        depth={40}
        duration="9s"
        delay="0s"
        mx={mx}
        my={my}
      >
        <HexOutline className="block size-full" />
      </Floating>
      {/* Heksagon abu: di atas foto Learn, di luar jangkauan wireframe */}
      <Floating
        className="top-[60%] left-[-12%] aspect-square w-[28px] text-brand-grey opacity-42 sm:w-[38px]"
        animation="motion-safe:animate-hex-float"
        depth={64}
        duration="7.5s"
        delay="-2s"
        mx={mx}
        my={my}
      >
        <HexOutline className="block size-full" />
      </Floating>

      {heroPersonas.map((persona, i) => {
        const layout = personaLayout[i];
        return (
          <Floating
            key={persona.title}
            className={cn("z-2 w-[20%] max-w-[120px]", layout.photo)}
            animation="motion-safe:animate-float-soft"
            depth={layout.depth}
            duration={layout.duration}
            delay={layout.delay}
            mx={mx}
            my={my}
          >
            <Image src={persona.image} alt="" sizes="120px" className="block h-auto w-full drop-shadow-lg" />
            <div
              className={cn(
                "absolute flex w-max items-center gap-2 rounded-xl border border-line/80 bg-white/95 py-2 pr-3 pl-2 shadow-pop backdrop-blur-sm xl:items-start xl:gap-2.5 xl:py-2.5",
                layout.card,
              )}
            >
              <span className="flex size-7 flex-none items-center justify-center rounded-lg bg-brand-orange text-white xl:size-8">
                <FeatureIcon name={persona.icon} size={16} />
              </span>
              <span className="flex flex-col">
                <span className="text-[13px] font-bold text-brand-grey">{persona.title}</span>
                <span className="hidden max-w-[112px] text-[11.5px] leading-snug text-brand-charcoal xl:block">
                  {persona.body}
                </span>
              </span>
            </div>
          </Floating>
        );
      })}
    </div>
  );
}
