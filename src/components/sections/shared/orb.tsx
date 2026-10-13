"use client";

import { motion, useTransform } from "motion/react";
import type { Pointer } from "@/components/motion/parallax";
import { Wireframe } from "@/components/ui/wireframe";

/**
 * Inti ilustrasi hero: cahaya oranye berdenyut, ring orbit, dan wireframe oranye yang berputar pelan + "bernapas",
 * bergeser mengikuti kursor (parallax). `center` (opsional) tampil di tengah wireframe, tidak ikut berputar.
 * `children` = elemen yang melayang di sekelilingnya (posisi % dari wadah ini, pakai `Floating`).
 * Dipakai `HeroOrb` (Home, logo Repskill + foto) dan `ClientOrb` (Success Stories, logo klien). Dekoratif.
 */
export function Orb({
  mx,
  my,
  center,
  children,
}: Pointer & { center?: React.ReactNode; children?: React.ReactNode }) {
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

      <motion.div className="relative z-1 w-[64%] sm:w-[min(72%,332px)]" style={{ x: wx, y: wy }}>
        <div className="motion-safe:animate-orb-spin">
          <div className="motion-safe:animate-orb-breathe">
            <Wireframe className="block h-auto w-full text-brand-orange" />
          </div>
        </div>
        {center && <div className="absolute inset-0 grid place-items-center">{center}</div>}
      </motion.div>

      {children}
    </div>
  );
}
