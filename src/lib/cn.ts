import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

// Daftarkan token kustom dari globals.css. Tanpa ini, tailwind-merge mengira `text-h2` adalah warna
// dan membuangnya saat digabung dengan `text-brand-teal`. Tambahkan di sini bila menambah token baru.
const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      text: ["display", "h1", "h2", "h3", "lead", "caption", "eyebrow"],
      radius: ["button", "card", "panel"],
      shadow: ["float", "pop", "glow"],
      ease: ["brand"],
    },
  },
});

/** Gabungkan className kondisional dan selesaikan konflik class Tailwind. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
