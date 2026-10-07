import { cn } from "@/lib/cn";

/** Nama ikon alur produk Repskill (Capture → Learn → Practice). */
export type FeatureIconName = "capture" | "learn" | "practice";

const paths: Record<FeatureIconName, React.ReactNode> = {
  // Bingkai bidik + lampu: menangkap keahlian top performer
  capture: (
    <>
      <path d="M4 8V6a2 2 0 0 1 2-2h2" />
      <path d="M16 4h2a2 2 0 0 1 2 2v2" />
      <path d="M20 16v2a2 2 0 0 1-2 2h-2" />
      <path d="M8 20H6a2 2 0 0 1-2-2v-2" />
      <path d="M12 7.5a3.5 3.5 0 0 0-2 6.37V15h4v-1.13a3.5 3.5 0 0 0-2-6.37Z" />
      <path d="M10.5 17.5h3" />
    </>
  ),
  // Buku terbuka: belajar dari pengetahuan yang sudah disetujui
  learn: (
    <>
      <path d="M12 7v13" />
      <path d="M3 5.5A1.5 1.5 0 0 1 4.5 4H8a4 4 0 0 1 4 4 4 4 0 0 1 4-4h3.5A1.5 1.5 0 0 1 21 5.5v11a1.5 1.5 0 0 1-1.5 1.5H15a3 3 0 0 0-3 3 3 3 0 0 0-3-3H4.5A1.5 1.5 0 0 1 3 16.5Z" />
    </>
  ),
  // Dua balon chat: roleplay percakapan sales dengan AI
  practice: (
    <>
      <path d="M4 4h9a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H8l-3 3v-3H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z" />
      <path d="M18 8h2a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-1v3l-3-3h-4a2 2 0 0 1-2-2v-1" />
    </>
  ),
};

/** Ikon garis untuk Capture, Learn, dan Practice. Warna mengikuti `text-*`; dekoratif. */
export function FeatureIcon({
  name,
  size = 20,
  className,
}: {
  name: FeatureIconName;
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("flex-none", className)}
      aria-hidden
    >
      {paths[name]}
    </svg>
  );
}
