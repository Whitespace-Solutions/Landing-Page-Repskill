"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";
import type { MockupData } from "@/content/types";
import { ExpandableMedia } from "./expandable-media";

type VideoData = Extract<MockupData, { type: "video" }>;

/** basePath GitHub Pages: file di `public/` tidak otomatis diberi prefix, jadi ditambahkan manual. */
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/**
 * Rekaman layar produk di dalam kartu mockup (border `line`, `rounded-card`, `shadow-float`). Diputar otomatis tanpa
 * suara dan berulang hanya saat terlihat di layar. Saat "reduce motion" aktif video tidak diputar: poster tampil dengan
 * kontrol, jadi pengunjung bisa memutarnya sendiri. Bisa dibuka layar penuh: di sana video diputar dengan kontrol.
 */
export function VideoMockup({ src, poster, width, height, label }: VideoData) {
  const ref = useRef<HTMLVideoElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    // Diatur lewat DOM, bukan prop: nilai awal useReducedMotion di klien bisa beda dengan HTML statis, dan React tidak
    // memperbaiki atribut yang beda saat hidrasi.
    video.controls = !!reduceMotion;
    if (reduceMotion) {
      video.pause();
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) void video.play().catch(() => {});
        else video.pause();
      },
      { threshold: 0.25 },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, [reduceMotion]);

  return (
    <ExpandableMedia
      label={label}
      expanded={
        <video
          className="h-auto max-h-full w-auto max-w-full rounded-card bg-white shadow-pop"
          width={width}
          height={height}
          poster={poster.src}
          controls
          autoPlay={!reduceMotion}
          muted
          loop
          playsInline
          aria-label={label}
        >
          <source src={`${BASE_PATH}${src}`} type="video/mp4" />
        </video>
      }
    >
      <div className="overflow-hidden rounded-card border border-line bg-white shadow-float">
        <video
          ref={ref}
          className="block h-auto w-full"
          width={width}
          height={height}
          poster={poster.src}
          muted
          loop
          playsInline
          preload="metadata"
          aria-label={label}
        >
          <source src={`${BASE_PATH}${src}`} type="video/mp4" />
        </video>
      </div>
    </ExpandableMedia>
  );
}
