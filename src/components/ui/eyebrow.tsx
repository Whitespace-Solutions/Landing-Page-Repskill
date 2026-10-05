import { cn } from "@/lib/cn";

/** Label kecil uppercase di atas judul section, dengan aksen garis miring oranye opsional. */
export function Eyebrow({
  children,
  accent = false,
  className,
}: {
  children: React.ReactNode;
  accent?: boolean;
  className?: string;
}) {
  return (
    <span
      className={cn("inline-flex items-center gap-2.5 text-eyebrow text-brand-teal uppercase", className)}
    >
      {accent && <span className="h-1 w-[18px] -skew-x-[38deg] bg-brand-orange" aria-hidden />}
      {children}
    </span>
  );
}
