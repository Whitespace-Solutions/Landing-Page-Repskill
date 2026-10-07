"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { EASE_OUT } from "@/components/motion/reveal";
import { cn } from "@/lib/cn";

/**
 * Kata yang bergantian tanpa henti: kata lama naik keluar ke atas, kata baru naik masuk dari bawah. Wadah
 * `overflow-hidden` + `clip-path` dipotong tepat di tinggi huruf, jadi kata tidak terlihat di atas/bawah batas teks.
 * Lebar dikunci ke kata terpanjang (lewat pseudo-element, tanpa teks tambahan di DOM) supaya judul tidak bergeser.
 * Pembaca layar hanya mendengar kata pertama. Saat "reduce motion" aktif, kata pertama tampil diam.
 */
export function RotatingWords({
  words,
  interval = 2000,
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
    <span
      className={cn(
        // Potong tepat di tinggi huruf: buang ruang kosong bawaan font di atas huruf kapital & di bawah garis dasar
        "inline-grid overflow-hidden align-bottom [clip-path:inset(0.1em_0_0.1em_0)]",
        className,
      )}
    >
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
          initial={{ y: "100%" }}
          animate={{ y: "0%" }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.5, ease: EASE_OUT }}
          aria-hidden
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
