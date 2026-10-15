import { cn } from "@/lib/cn";

/** Centang polos untuk daftar fitur di kolom harga (tanpa lingkaran warna, supaya panel tetap tenang). */
export function PlanCheck({ className }: { className?: string }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("mt-0.5 flex-none text-brand-grey", className)}
      aria-hidden
    >
      <path d="M5 12l5 5L20 7" />
    </svg>
  );
}

/** Label kecil di kanan nama kolom, mis. "Subscription"; `strong` (Recommended) = isi Shadow Grey, teks putih. */
export function PlanTag({ children, strong = false }: { children: React.ReactNode; strong?: boolean }) {
  return (
    <span
      className={cn(
        "rounded-md border px-2 py-1 text-caption leading-none font-semibold tracking-[0.06em] whitespace-nowrap uppercase",
        strong ? "border-brand-grey bg-brand-grey text-white" : "border-line text-brand-charcoal",
      )}
    >
      {children}
    </span>
  );
}
