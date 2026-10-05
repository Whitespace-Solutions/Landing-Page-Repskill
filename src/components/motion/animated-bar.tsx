"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/cn";
import { EASE_OUT } from "./reveal";

/** Bar progres yang mengisi dari 0 ke `value`% saat terlihat. Bungkus dengan elemen track (tinggi + background). */
export function AnimatedBar({
  value,
  className,
  delay = 0,
}: {
  value: number;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.span
      className={cn("block h-full rounded-full", className)}
      initial={{ width: 0 }}
      whileInView={{ width: `${value}%` }}
      viewport={{ once: true }}
      transition={{ duration: 1, ease: EASE_OUT, delay }}
    />
  );
}
