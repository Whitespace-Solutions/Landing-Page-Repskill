"use client";

import { motion, type Variants } from "motion/react";
import { usePointerParallax } from "@/components/motion/parallax";
import { EASE_OUT } from "@/components/motion/reveal";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { HighlightText } from "@/components/ui/highlight-text";
import type { PageHeroData } from "@/content/types";
import { ClientOrb } from "./client-orb";

const intro: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const rise: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE_OUT } },
};

/**
 * Hero Success Stories: tata letak sama dengan hero Home (teks kiri, orb kanan, parallax kursor), dengan logo klien
 * melayang di sekitar orb (`ClientOrb`). Copy dari `successStoriesPage.hero`.
 */
export function StoriesHero({ eyebrow, title, highlight, lead, primary, secondary }: PageHeroData) {
  const { mx, my, handlers } = usePointerParallax();

  return (
    <section className="relative overflow-hidden bg-white" {...handlers}>
      {/* Aksen cahaya oranye blur tipis (7%) di pojok kanan atas, sama dengan hero Home */}
      <div
        className="pointer-events-none absolute -top-32 -right-32 size-[360px] rounded-full bg-brand-orange opacity-7 blur-[100px] lg:-top-48 lg:-right-40 lg:size-[640px] lg:blur-[140px]"
        aria-hidden
      />
      <Container className="relative grid items-center gap-2 pt-14 pb-20 sm:pt-20 sm:pb-24 lg:grid-cols-[minmax(0,1.18fr)_minmax(0,0.82fr)] lg:gap-12 lg:pt-26 lg:pb-32">
        <motion.div
          variants={intro}
          initial="hidden"
          animate="show"
          // Mobile & tablet (satu kolom): teks rata tengah; mulai lg kembali rata kiri di samping orb
          className="mx-auto flex max-w-[820px] flex-col items-center gap-6 text-center lg:mx-0 lg:items-start lg:text-left"
        >
          <motion.div variants={rise}>
            <Eyebrow>{eyebrow}</Eyebrow>
          </motion.div>
          <motion.h1 variants={rise} className="text-display text-balance">
            <HighlightText text={title} highlight={highlight} />
          </motion.h1>
          <motion.p variants={rise} className="max-w-[620px] text-lead text-pretty text-brand-charcoal">
            {lead}
          </motion.p>
          {(primary || secondary) && (
            <motion.div variants={rise} className="mt-2 flex flex-wrap justify-center gap-3 lg:justify-start">
              {primary && (
                <ButtonLink href={primary.href} size="lg" withArrow>
                  {primary.label}
                </ButtonLink>
              )}
              {secondary && (
                <ButtonLink href={secondary.href} size="lg" variant="outline">
                  {secondary.label}
                </ButtonLink>
              )}
            </motion.div>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.25, ease: EASE_OUT }}
        >
          <ClientOrb mx={mx} my={my} />
        </motion.div>
      </Container>
    </section>
  );
}
