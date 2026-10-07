"use client";

import { motion, useMotionValue, useReducedMotion, useSpring, type Variants } from "motion/react";
import { EASE_OUT } from "@/components/motion/reveal";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { primaryCta } from "@/content/navigation";
import { HeroOrb } from "./hero-orb";

const intro: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const rise: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE_OUT } },
};

export function Hero() {
  const reduceMotion = useReducedMotion();
  // Posisi kursor relatif ke layar (-0.5…0.5), dihaluskan dengan spring, untuk parallax ilustrasi.
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

  return (
    <section
      className="relative overflow-hidden bg-white"
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
    >
      {/* Aksen cahaya oranye blur tipis (7%) di pojok kanan atas */}
      <div
        className="pointer-events-none absolute -top-32 -right-32 size-[360px] rounded-full bg-brand-orange opacity-7 blur-[100px] lg:-top-48 lg:-right-40 lg:size-[640px] lg:blur-[140px]"
        aria-hidden
      />
      <Container className="relative grid items-center gap-2 pt-14 pb-16 sm:pt-20 sm:pb-20 lg:grid-cols-[minmax(0,1.18fr)_minmax(0,0.82fr)] lg:gap-12 lg:pt-26 lg:pb-28">
        <motion.div
          variants={intro}
          initial="hidden"
          animate="show"
          className="flex max-w-[820px] flex-col gap-6"
        >
          <motion.div variants={rise}>
            <Eyebrow accent>AI-Powered Sales Capability Platform</Eyebrow>
          </motion.div>
          <motion.h1 variants={rise} className="text-display text-balance">
            Make Sales Expertise <span className="text-brand-orange">Scalable.</span>
          </motion.h1>
          <motion.p variants={rise} className="max-w-[620px] text-lead text-pretty text-brand-charcoal">
            Repskill is AI sales coaching that turns your best people’s knowledge into sales skills your whole
            team can build.
          </motion.p>
          <motion.div variants={rise} className="mt-2 flex flex-wrap gap-3">
            <ButtonLink href={primaryCta.href} size="lg" withArrow>
              {primaryCta.label}
            </ButtonLink>
            <ButtonLink href="#platform" size="lg" variant="outline">
              Explore Repskill
            </ButtonLink>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.25, ease: EASE_OUT }}
        >
          <HeroOrb mx={mx} my={my} />
        </motion.div>
      </Container>
    </section>
  );
}
