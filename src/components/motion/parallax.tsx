"use client";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import { cn } from "@/lib/cn";

export type Pointer = { mx: MotionValue<number>; my: MotionValue<number> };

/**
 * Posisi kursor relatif ke layar (-0.5…0.5), dihaluskan dengan spring, untuk parallax ilustrasi dekoratif.
 * Pasang `onPointerMove`/`onPointerLeave` di section-nya. Hanya mouse: mati di layar sentuh dan saat "reduce motion".
 */
export function usePointerParallax() {
  const reduceMotion = useReducedMotion();
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const mx = useSpring(rawX, { stiffness: 60, damping: 20 });
  const my = useSpring(rawY, { stiffness: 60, damping: 20 });

  const onPointerMove = (e: React.PointerEvent<HTMLElement>) => {
    if (reduceMotion || e.pointerType !== "mouse") return;
    rawX.set(e.clientX / window.innerWidth - 0.5);
    rawY.set(e.clientY / window.innerHeight - 0.5);
  };
  const onPointerLeave = () => {
    rawX.set(0);
    rawY.set(0);
  };

  return { mx, my, handlers: { onPointerMove, onPointerLeave } };
}

/**
 * Elemen dekoratif yang melayang (animasi CSS `motion-safe:animate-*`) dan ikut parallax kursor sesuai `depth` (px).
 * Posisi diatur lewat `className` (sudah `absolute`).
 */
export function Floating({
  className,
  animation,
  depth,
  duration,
  delay,
  mx,
  my,
  children,
}: Pointer & {
  className: string;
  animation: string;
  depth: number;
  duration: string;
  delay: string;
  children: React.ReactNode;
}) {
  const x = useTransform(mx, (v) => v * depth);
  const y = useTransform(my, (v) => v * depth);
  return (
    <motion.div className={cn("absolute", className)} style={{ x, y }}>
      <div
        className={cn("relative size-full", animation)}
        style={{ animationDuration: duration, animationDelay: delay }}
      >
        {children}
      </div>
    </motion.div>
  );
}
