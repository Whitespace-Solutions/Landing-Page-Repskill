"use client";

import { motion, type Variants } from "motion/react";

export const EASE_OUT = [0.22, 1, 0.36, 1] as const;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  // `delay` hanya disertakan bila diisi, supaya tidak menimpa delay dari `staggerChildren`.
  show: (delay?: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE_OUT, ...(delay ? { delay } : {}) },
  }),
};

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  /** Elemen HTML yang dirender, default `div` */
  as?: "div" | "section" | "li" | "span" | "p" | "h1" | "h2" | "h3";
};

/** Fade + slide up saat elemen masuk viewport (sekali saja). */
export function Reveal({ children, className, delay, as = "div" }: RevealProps) {
  const Component = motion[as];
  return (
    <Component
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      variants={fadeUp}
      custom={delay}
    >
      {children}
    </Component>
  );
}

type StaggerProps = {
  children: React.ReactNode;
  className?: string;
  /** Jeda antar anak dalam detik */
  stagger?: number;
  delay?: number;
  as?: "div" | "ul" | "ol";
};

/** Container yang menganimasikan setiap `<StaggerItem>` di dalamnya secara berurutan. */
export function Stagger({ children, className, stagger = 0.08, delay = 0, as = "div" }: StaggerProps) {
  const Component = motion[as];
  return (
    <Component
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: stagger, delayChildren: delay } } }}
    >
      {children}
    </Component>
  );
}

export function StaggerItem({
  children,
  className,
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "li";
}) {
  const Component = motion[as];
  return (
    <Component className={className} variants={fadeUp}>
      {children}
    </Component>
  );
}
