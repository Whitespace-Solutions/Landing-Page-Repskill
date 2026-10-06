"use client";

import { motion, type Variants } from "motion/react";
import { EASE_OUT } from "@/components/motion/reveal";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { primaryCta } from "@/content/navigation";

const intro: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const rise: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE_OUT } },
};

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-white">
      <Container className="relative pt-14 pb-16 sm:pt-20 sm:pb-20 lg:pt-26 lg:pb-28">
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
      </Container>
    </section>
  );
}
