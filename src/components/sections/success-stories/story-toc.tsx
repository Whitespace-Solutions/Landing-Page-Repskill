"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

export type TocItem = { id: string; label: string };

/**
 * Daftar isi artikel success story (lg+, menempel saat di-scroll). Bagian yang sedang dibaca ditandai: teks Shadow Grey
 * tebal + garis bawah oranye.
 */
export function StoryToc({ label, items }: { label: string; items: TocItem[] }) {
  const [active, setActive] = useState(items[0]?.id);

  useEffect(() => {
    // Bagian aktif = bagian terakhir yang judulnya sudah melewati sepertiga atas layar
    let frame = 0;
    const update = () => {
      frame = 0;
      const line = window.innerHeight / 3;
      const current = items.filter((item) => {
        const el = document.getElementById(item.id);
        return el !== null && el.getBoundingClientRect().top <= line;
      });
      setActive(current.at(-1)?.id ?? items[0]?.id);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [items]);

  return (
    <nav aria-label={label} className="flex flex-col gap-5 rounded-card border border-line p-6">
      <span className="text-eyebrow text-brand-charcoal uppercase">{label}</span>
      <ol className="flex flex-col gap-3.5">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              aria-current={active === item.id ? "location" : undefined}
              className={cn(
                "border-b-2 pb-0.5 text-base transition-colors",
                active === item.id
                  ? "border-brand-orange font-bold text-brand-grey"
                  : "border-transparent font-semibold text-brand-charcoal hover:text-brand-grey",
              )}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
