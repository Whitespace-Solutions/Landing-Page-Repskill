"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import { EASE_OUT } from "@/components/motion/reveal";
import { cn } from "@/lib/cn";

const COUNT = 32;
/** Di layar kecil bilah pertama disembunyikan supaya sisanya tidak terlalu tipis. */
const HIDDEN_ON_MOBILE = 12;
const STAGGER = 0.035;

// Bilah naik dari kiri ke kanan: Expertise (abu) → Capability (amber) → Performance (oranye).
// Nilai deterministik (tanpa Math.random) supaya HTML statis sama dengan hasil render di browser.
const bars = Array.from({ length: COUNT }, (_, i) => {
  const t = i / (COUNT - 1);
  const jitter = (((i * 37) % 7) - 3) * 1.5;
  const height = Math.min(100, Math.max(12, 12 + 88 * t ** 1.6 + jitter));
  const color = t < 0.45 ? "bg-white/10" : t < 0.88 ? "bg-brand-amber" : "bg-brand-orange";
  return { height, color, hideOnMobile: i < HIDDEN_ON_MOBILE };
});

const grow: Variants = {
  hidden: { scaleY: 0 },
  show: { scaleY: 1, transition: { duration: 0.7, ease: EASE_OUT } },
};

/** Grafik dekoratif di dasar footer: bilah miring (motif brand symbol) yang tumbuh saat terlihat, lalu bergelombang pelan. */
export function FooterGraphic({ className }: { className?: string }) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={cn(
        "pointer-events-none -mx-6 flex h-24 items-end gap-1.5 sm:h-32 sm:gap-2.5 lg:h-40 lg:gap-3",
        className,
      )}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-40px" }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: STAGGER } } }}
      aria-hidden
    >
      {bars.map((bar, i) => (
        <motion.span
          key={i}
          className={cn(
            "relative block flex-1 origin-bottom overflow-hidden",
            bar.color,
            bar.hideOnMobile && "hidden sm:block",
          )}
          // Skew lewat Motion, bukan class Tailwind: transform inline dari Motion menimpa `-skew-x-*`.
          style={{ height: `${bar.height}%`, skewX: -20 }}
          variants={grow}
        >
          {/* Gelombang terang yang bergerak maju dari kiri ke kanan, berulang. Mati bila "reduce motion" aktif.
              Elemennya selalu dirender (opacity 0) supaya markup server dan browser sama. */}
          <motion.span
            className="absolute inset-0 bg-white"
            initial={{ opacity: 0 }}
            animate={reduceMotion ? undefined : { opacity: [0, 0.22, 0] }}
            transition={{
              duration: 1.2,
              ease: "easeInOut",
              delay: 1.6 + i * 0.07,
              repeat: Infinity,
              repeatDelay: COUNT * 0.07 + 2,
            }}
          />
        </motion.span>
      ))}
    </motion.div>
  );
}
