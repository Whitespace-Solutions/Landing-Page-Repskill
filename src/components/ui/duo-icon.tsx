import { cn } from "@/lib/cn";

/** Nama ikon dua warna (garis Shadow Grey + aksen oranye). */
export type DuoIconName = "ramp" | "pitch" | "walkout" | "mentor" | "builder";

const icons: Record<DuoIconName, { base: React.ReactNode; accent: React.ReactNode }> = {
  // Orang + balon chat: mentor yang membimbing lewat percakapan
  mentor: {
    base: (
      <>
        <circle cx="9" cy="8.5" r="3.5" />
        <path d="M3 20.5c0-3.3 2.7-6 6-6s6 2.7 6 6" />
      </>
    ),
    accent: (
      <path d="M15 3.5h5a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1h-2l-2 2v-2h-1a1 1 0 0 1-1-1v-4a1 1 0 0 1 1-1Z" />
    ),
  },
  // Balok bertumpuk: builder yang menyusun sistem; balok teratas (aksen) menandai skala
  builder: {
    base: (
      <>
        <rect x="3" y="14" width="8" height="6.5" rx="1" />
        <rect x="13" y="14" width="8" height="6.5" rx="1" />
      </>
    ),
    accent: <rect x="8" y="5.5" width="8" height="6.5" rx="1" />,
  },
  // Jam pasir: ramp rep baru lama, pasirnya (oranye) sudah habis turun
  ramp: {
    base: (
      <>
        <path d="M6 3h12" />
        <path d="M6 21h12" />
        <path d="M7.5 3c0 4 3.5 6 4.5 9 1-3 4.5-5 4.5-9" />
        <path d="M7.5 21c0-4 3.5-6 4.5-9 1 3 4.5 5 4.5 9" />
      </>
    ),
    accent: (
      <>
        <path d="M9.5 18.5c.6-1.5 1.4-2.3 2.5-2.6 1.1.3 1.9 1.1 2.5 2.6" />
        <path d="M12 13.5v.5" />
      </>
    ),
  },
  // Balon chat dengan bar tidak sama tinggi: cerita yang berbeda tiap rep
  pitch: {
    base: <path d="M4 4.5h16a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1h-8l-4 3v-3H4a1 1 0 0 1-1-1v-10a1 1 0 0 1 1-1Z" />,
    accent: (
      <>
        <path d="M8 13v-2.5" />
        <path d="M12 13V8" />
        <path d="M16 13v-1" />
      </>
    ),
  },
  // Pintu dengan panah keluar: keahlian ikut pergi saat top rep resign
  walkout: {
    base: (
      <>
        <path d="M13 4H6a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h7" />
        <path d="M9.5 12h.01" />
      </>
    ),
    accent: (
      <>
        <path d="M13 12h8" />
        <path d="M18 9l3 3-3 3" />
      </>
    ),
  },
};

/**
 * Ikon garis dua warna untuk kartu ilustratif (mis. section The Problem di Home): garis utama Shadow Grey, satu aksen
 * oranye. Gaya sama dengan ikon lain (stroke bulat, viewBox 24). Dekoratif.
 */
export function DuoIcon({
  name,
  size = 36,
  tone = "light",
  className,
}: {
  name: DuoIconName;
  size?: number;
  /** `dark`: untuk latar gelap — garis utama putih, aksen amber */
  tone?: "light" | "dark";
  className?: string;
}) {
  const { base, accent } = icons[name];
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("flex-none", className)}
      aria-hidden
    >
      <g className={tone === "dark" ? "stroke-white" : "stroke-brand-grey"}>{base}</g>
      <g className={tone === "dark" ? "stroke-brand-amber" : "stroke-brand-orange"}>{accent}</g>
    </svg>
  );
}
