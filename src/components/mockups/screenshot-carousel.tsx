"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Image, { type StaticImageData } from "next/image";
import { useEffect, useState } from "react";
import { EASE_SMOOTH } from "@/components/motion/animated-bar";
import { cn } from "@/lib/cn";

export type CarouselShot = { image: StaticImageData; alt: string };

/**
 * Screenshot produk yang berganti otomatis (crossfade + zoom halus), mis. pratinjau kartu Capture di section The Solution (Home).
 * Gambar memenuhi wadah (`object-cover`, rata kiri atas). Saat "reduce motion" hanya screenshot pertama yang tampil.
 */
export function ScreenshotCarousel({
  shots,
  interval = 3200,
  offset = 0,
  className,
}: {
  shots: CarouselShot[];
  /** Lama tiap screenshot tampil, dalam ms */
  interval?: number;
  /** Jeda tambahan sebelum pergantian pertama (ms), supaya beberapa carousel berdampingan tidak berganti serempak */
  offset?: number;
  className?: string;
}) {
  const reduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduceMotion || shots.length < 2) return;
    const next = () => setIndex((i) => (i + 1) % shots.length);
    let id: ReturnType<typeof setInterval> | undefined;
    const start = setTimeout(() => {
      next();
      id = setInterval(next, interval);
    }, interval + offset);
    return () => {
      clearTimeout(start);
      clearInterval(id);
    };
  }, [reduceMotion, shots.length, interval, offset]);

  const shot = shots[reduceMotion ? 0 : index];

  return (
    <div className={cn("relative size-full overflow-hidden", className)}>
      <AnimatePresence initial={false}>
        <motion.div
          key={shot.image.src}
          className="absolute inset-0"
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: EASE_SMOOTH }}
        >
          <Image
            src={shot.image}
            alt={shot.alt}
            sizes="(min-width: 768px) 400px, 100vw"
            className="size-full object-cover object-left-top"
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
