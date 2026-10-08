"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/cn";
import { EASE_OUT } from "./reveal";

/** Easing pelan di awal & akhir untuk bar yang mengisi lebih lambat (mis. pemakaian token di Pricing). */
export const EASE_SMOOTH = [0.65, 0, 0.35, 1] as const;

/** Bar progres yang mengisi dari 0 ke `value`% saat terlihat. Bungkus dengan elemen track (tinggi + background). */
export function AnimatedBar({
  value,
  className,
  delay = 0,
  duration = 1,
  ease = EASE_OUT,
}: {
  value: number;
  className?: string;
  delay?: number;
  duration?: number;
  ease?: readonly [number, number, number, number];
}) {
  return (
    <motion.span
      className={cn("block h-full rounded-full", className)}
      initial={{ width: 0 }}
      whileInView={{ width: `${value}%` }}
      viewport={{ once: true }}
      transition={{ duration, ease: [...ease], delay }}
    />
  );
}
