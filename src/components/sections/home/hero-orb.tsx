"use client";

import { motion, useTransform, type MotionValue } from "motion/react";
import { HexOutline, Wireframe } from "@/components/ui/wireframe";
import { cn } from "@/lib/cn";

type Pointer = { mx: MotionValue<number>; my: MotionValue<number> };

/**
 * Ilustrasi hero Home: wireframe oranye yang berputar pelan dan "bernapas", dengan cahaya berdenyut, ring orbit,
 * dan tiga heksagon melayang. Wireframe dan heksagon bergeser mengikuti kursor (parallax, `mx`/`my` = -0.5…0.5).
 * Diadaptasi dari hero Whitespace Talents Landing. Semua animasi CSS berhenti bila "reduce motion" aktif.
 */
export function HeroOrb({ mx, my }: Pointer) {
  const wx = useTransform(mx, (v) => v * 24);
  const wy = useTransform(my, (v) => v * 24);

  return (
    <div
      className="relative mx-auto mt-8 grid aspect-square w-full max-w-[420px] place-items-center lg:mt-0 lg:aspect-auto lg:min-h-[clamp(340px,40vw,466px)] lg:max-w-none"
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
      </motion.div>

      <FloatHex
        className="top-[2%] right-[7%] w-[52px] text-brand-orange opacity-50"
        depth={40}
        duration="9s"
        delay="0s"
        mx={mx}
        my={my}
      />
      <FloatHex
        className="bottom-[5%] left-[3%] w-[38px] text-brand-grey opacity-42"
        depth={64}
        duration="7.5s"
        delay="-2s"
        mx={mx}
        my={my}
      />
      <FloatHex
        className="right-[1%] bottom-[22%] w-[30px] text-brand-orange opacity-30 max-sm:hidden"
        depth={28}
        duration="11s"
        delay="-4s"
        mx={mx}
        my={my}
      />
    </div>
  );
}

/** Satu heksagon yang melayang naik-turun sambil berputar sedikit, dan ikut parallax kursor. */
function FloatHex({
  className,
  depth,
  duration,
  delay,
  mx,
  my,
}: Pointer & { className: string; depth: number; duration: string; delay: string }) {
  const x = useTransform(mx, (v) => v * depth);
  const y = useTransform(my, (v) => v * depth);
  return (
    <motion.div className={cn("absolute aspect-square", className)} style={{ x, y }}>
      <div
        className="size-full motion-safe:animate-hex-float"
        style={{ animationDuration: duration, animationDelay: delay }}
      >
        <HexOutline className="block size-full" />
      </div>
    </motion.div>
  );
}
