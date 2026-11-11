"use client";

import { motion, type Variants } from "motion/react";
import Link from "next/link";
import { EASE_OUT } from "@/components/motion/reveal";
import type { StepsData } from "@/content/types";
import { cn } from "@/lib/cn";

/** Jeda antar langkah (detik): bullet berikutnya muncul tepat saat garis sampai di sana. */
const STEP = 0.55;
/** Jeda antar denyut bullet pada loop setelah intro (detik). */
const PING_GAP = 0.5;

const dotVariants: Variants = {
  hidden: { scale: 0, opacity: 0 },
  show: (i: number) => ({
    scale: 1,
    opacity: 1,
    transition: { delay: i * STEP, type: "spring", stiffness: 320, damping: 20 },
  }),
};

const rippleVariants: Variants = {
  hidden: { scale: 1, opacity: 0 },
  show: (i: number) => ({
    scale: [1, 2.8],
    opacity: [0.6, 0],
    transition: { delay: i * STEP, duration: 0.9, ease: EASE_OUT },
  }),
};

const lineVariants: Variants = {
  hidden: { scaleX: 0 },
  show: (i: number) => ({
    scaleX: 1,
    transition: { delay: i * STEP, duration: STEP, ease: "linear" },
  }),
};

const textVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * STEP + 0.15, duration: 0.7, ease: EASE_OUT },
  }),
};

/**
 * Daftar langkah timeline yang muncul berurutan: bullet "pop" + riak, garis amber terisi menuju bullet berikutnya, teks
 * fade + naik. Setelah intro, denyut cahaya berjalan dari bullet ke bullet (loop CSS, berhenti saat "reduce motion").
 */
export function StepsTimelineList({ steps, dark }: { steps: StepsData["steps"]; dark: boolean }) {
  const introEnd = steps.length * STEP + 0.6;

  return (
    <motion.ol
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      className={cn("mt-12 grid lg:mt-18", steps.length === 5 ? "lg:grid-cols-5" : "lg:grid-cols-4")}
    >
      {steps.map((step, i) => (
        <li key={step.name} className="relative flex flex-col py-7 pr-6">
          {/* Jalur tipis + garis progres yang terisi dari kiri */}
          <span
            className={cn("absolute inset-x-0 top-0 h-0.5", dark ? "bg-brand-amber/25" : "bg-brand-amber/20")}
            aria-hidden
          />
          <motion.span
            custom={i}
            variants={lineVariants}
            className="absolute inset-x-0 top-0 h-0.5 origin-left bg-brand-amber"
            aria-hidden
          />

          {/* Bullet: riak sekali saat muncul, lalu denyut berulang yang berjalan antar bullet */}
          <span className="absolute -top-[5px] left-0 size-3" aria-hidden>
            <span
              className="absolute inset-0 rounded-full bg-brand-amber opacity-0 motion-safe:animate-step-ping"
              style={{ animationDelay: `${introEnd + i * PING_GAP}s` }}
            />
            <motion.span
              custom={i}
              variants={rippleVariants}
              className="absolute inset-0 rounded-full bg-brand-amber"
            />
            <motion.span
              custom={i}
              variants={dotVariants}
              className={cn(
                "absolute inset-0 rounded-full bg-brand-amber",
                dark
                  ? "shadow-[0_0_0_4px_var(--color-brand-grey)]"
                  : "shadow-[0_0_0_4px_var(--color-brand-linen)]",
              )}
            />
          </span>

          <motion.div custom={i} variants={textVariants} className="flex flex-1 flex-col gap-3.5">
            <span className="text-h3 lg:text-2xl">{step.name}</span>
            <span
              className={cn(
                "text-[15px] leading-relaxed text-balance lg:min-h-[70px]",
                dark ? "text-line" : "text-brand-charcoal",
              )}
            >
              {step.message}
            </span>
            {step.tag && (
              <StepTag href={step.href} dark={dark}>
                {step.tag}
              </StepTag>
            )}
          </motion.div>
        </li>
      ))}
    </motion.ol>
  );
}

function StepTag({ href, dark, children }: { href?: string; dark: boolean; children: React.ReactNode }) {
  const className = cn(
    "self-start rounded-lg border px-3 py-2 text-[13.5px] font-semibold transition-colors",
    dark ? "border-white/15 bg-white/10 text-white" : "border-line bg-white text-brand-charcoal",
    href && (dark ? "hover:bg-white/20" : "hover:border-brand-orange hover:text-brand-orange"),
  );
  return href ? (
    <Link href={href} className={className}>
      {children}
    </Link>
  ) : (
    <span className={className}>{children}</span>
  );
}
