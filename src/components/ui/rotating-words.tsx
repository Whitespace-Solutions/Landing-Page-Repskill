"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { EASE_OUT } from "@/components/motion/reveal";
import { cn } from "@/lib/cn";

/**
 * Kata yang bergantian tanpa henti: kata lama naik keluar ke atas, kata baru naik masuk dari bawah.
 * Lebar dikunci ke kata terpanjang (lewat pseudo-element, tanpa teks tambahan di DOM) supaya judul tidak bergeser.
 * Pembaca layar hanya mendengar kata pertama. Saat "reduce motion" aktif, kata pertama tampil diam.
 */
export function RotatingWords({
  words,
  interval = 2500,
  className,
}: {
  words: string[];
  /** Lama tiap kata tampil, dalam milidetik */
  interval?: number;
  className?: string;
}) {
  const reduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduceMotion || words.length < 2) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % words.length), interval);
    return () => window.clearInterval(id);
  }, [reduceMotion, words.length, interval]);

  return (
    <span className={cn("-my-[0.12em] inline-grid overflow-hidden py-[0.12em] align-bottom", className)}>
      <span className="sr-only">{words[0]}</span>
      {/* Pengunci lebar: setiap kata sebagai pseudo-element tak terlihat di sel grid yang sama */}
      {words.map((word) => (
        <span
          key={word}
          data-word={word}
          className="invisible col-start-1 row-start-1 whitespace-nowrap before:content-[attr(data-word)]"
          aria-hidden
        />
      ))}
      <AnimatePresence initial={false}>
        <motion.span
          key={words[index]}
          className="col-start-1 row-start-1 whitespace-nowrap"
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.6, ease: EASE_OUT }}
          aria-hidden
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
