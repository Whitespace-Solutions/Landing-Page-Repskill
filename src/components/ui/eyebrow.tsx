import { cn } from "@/lib/cn";

/** Label kecil uppercase oranye di atas judul section. */
export function Eyebrow({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={cn("inline-flex items-center text-eyebrow text-brand-orange uppercase", className)}>
      {children}
    </span>
  );
}
