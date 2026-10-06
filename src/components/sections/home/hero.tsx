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

const capabilities = [
  { stage: "LEARN", name: "Learning Path", progress: 70 },
  { stage: "PRACTICE", name: "Scenario Studio", progress: 55 },
  { stage: "REFLECT", name: "Reflection Studio", progress: 40 },
];

const team = ["AR", "BK", "CL", "DM", "EN", "FS", "GT", "HW", "IR", "JP", "KL", "MN"].map((initials, i) => ({
  initials,
  progress: [86, 72, 90, 64, 80, 76, 92, 68, 84, 70, 88, 74][i],
  highlight: i % 5 === 2,
}));

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-white">
      <Container className="relative pt-14 pb-14 sm:pt-20 lg:pt-26 lg:pb-24">
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
            Repskill turns the knowledge of your best people into skills your whole sales team can build.
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

        <PipelineVisual />
      </Container>
    </section>
  );
}

/** Visual Expertise → Capability → Performance dengan animasi bertahap. */
function PipelineVisual() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease: EASE_OUT, delay: 0.55 }}
      className="mt-12 rounded-panel border border-line bg-white p-4 shadow-float sm:p-6 lg:mt-18"
    >
      <motion.div
        initial="hidden"
        animate="show"
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.18, delayChildren: 0.8 } } }}
        className="grid gap-4 md:grid-cols-2 xl:grid-cols-3"
      >
        {/* 01 · Expertise */}
        <motion.div variants={rise} className="flex flex-col gap-4 rounded-[14px] bg-surface p-5.5">
          <CardHead label="01 · EXPERTISE" badge="Top performer" />
          <div className="flex items-center gap-3">
            <div className="flex size-12 items-center justify-center rounded-full bg-brand-grey font-bold text-white shadow-[0_0_0_4px_#fff,0_0_0_6px_var(--color-brand-orange)]">
              TP
            </div>
            <div className="flex flex-1 flex-col gap-1.5">
              <span className="h-2 w-[70%] rounded bg-brand-grey" />
              <span className="h-2 w-[45%] rounded bg-line" />
            </div>
          </div>
          <blockquote className="rounded-xl border border-line bg-white px-4 py-3.5 text-sm leading-normal text-brand-charcoal italic">
            “When the buyer pushes on price, I go back to the problem we agreed on first.”
          </blockquote>
          <div className="flex flex-wrap gap-1.5">
            {["Discovery", "Objection handling", "Next steps"].map((tag) => (
              <span
                key={tag}
                className="rounded-md bg-line px-2.5 py-1 text-xs font-semibold text-brand-charcoal"
              >
                {tag}
              </span>
            ))}
          </div>
        </motion.div>

        {/* 02 · Capability */}
        <motion.div variants={rise} className="flex flex-col gap-3 rounded-[14px] bg-brand-linen p-5.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold tracking-[0.14em] whitespace-nowrap text-brand-orange">
              02 · CAPABILITY
            </span>
            <span className="text-xs font-semibold whitespace-nowrap text-brand-grey">
              Knowledge Universe
            </span>
          </div>
          {capabilities.map((c, i) => (
            <div key={c.name} className="flex items-center gap-3 rounded-[10px] bg-white px-3.5 py-3">
              <span className="w-[68px] text-[11px] font-bold tracking-[0.1em] text-brand-charcoal">
                {c.stage}
              </span>
              <span className="flex-1 text-sm font-semibold whitespace-nowrap">{c.name}</span>
              <span className="h-1.5 w-12 overflow-hidden rounded-full bg-brand-linen">
                <motion.span
                  className="block h-full rounded-full bg-brand-amber"
                  initial={{ width: 0 }}
                  animate={{ width: `${c.progress}%` }}
                  transition={{ duration: 1, ease: EASE_OUT, delay: 1.4 + i * 0.15 }}
                />
              </span>
            </div>
          ))}
          <span className="mt-0.5 flex items-center gap-2 text-[12.5px] font-semibold text-brand-grey">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              <path d="M5 12l5 5L20 7" />
            </svg>
            Reviewed and approved knowledge
          </span>
        </motion.div>

        {/* 03 · Performance */}
        <motion.div
          variants={rise}
          className="flex flex-col gap-4 rounded-[14px] bg-surface p-5.5 md:col-span-2 xl:col-span-1"
        >
          <CardHead label="03 · PERFORMANCE" badge="Whole team" badgeAccent />
          <div className="grid grid-cols-4 gap-2.5 md:grid-cols-6 xl:grid-cols-4">
            {team.map((m, i) => (
              <motion.div
                key={m.initials}
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 320, damping: 20, delay: 1.6 + i * 0.05 }}
                className="flex flex-col items-center gap-1.5"
              >
                <div className="flex size-9 items-center justify-center rounded-full border-[1.5px] border-brand-grey bg-white text-[11px] font-bold text-brand-charcoal">
                  {m.initials}
                </div>
                <div className="h-1 w-9 overflow-hidden rounded-full bg-line">
                  <motion.div
                    className={m.highlight ? "h-1 bg-brand-orange" : "h-1 bg-brand-amber"}
                    initial={{ width: 0 }}
                    animate={{ width: `${m.progress}%` }}
                    transition={{ duration: 0.9, ease: EASE_OUT, delay: 2 + i * 0.05 }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
          <span className="text-[13px] leading-normal text-brand-charcoal">
            Expertise from one person, built into capability across the team.
          </span>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

function CardHead({
  label,
  badge,
  badgeAccent = false,
}: {
  label: string;
  badge: string;
  badgeAccent?: boolean;
}) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-xs font-bold tracking-[0.14em] whitespace-nowrap text-brand-charcoal">
        {label}
      </span>
      <span
        className={
          badgeAccent
            ? "rounded-full bg-brand-orange px-2.5 py-1 text-xs font-semibold whitespace-nowrap text-white"
            : "rounded-full border border-line bg-white px-2.5 py-1 text-xs font-semibold whitespace-nowrap text-brand-charcoal"
        }
      >
        {badge}
      </span>
    </div>
  );
}
