"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/cn";
import { EASE_OUT } from "./reveal";

const stripes = [
  { className: "right-[calc(8%+6.5rem)] bg-brand-charcoal xl:right-[calc(8%+7.5rem)]", delay: 0.15 },
  { className: "right-[8%] bg-brand-orange", delay: 0.27 },
];

/** Motif garis miring dari brand symbol: dua bilah yang meluncur masuk dari kanan saat terlihat. Untuk latar gelap. */
export function SlashStripes({ className }: { className?: string }) {
  return (
    <div className={cn("pointer-events-none", className)} aria-hidden>
      {stripes.map((stripe) => (
        <motion.span
          key={stripe.className}
          className={cn("absolute -top-[10%] h-[120%] w-20 xl:w-24", stripe.className)}
          // Skew lewat Motion, bukan class Tailwind: transform inline dari Motion menimpa `-skew-x-*`.
          style={{ skewX: -20 }}
          initial={{ opacity: 0, x: 96 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: EASE_OUT, delay: stripe.delay }}
        />
      ))}
    </div>
  );
}
