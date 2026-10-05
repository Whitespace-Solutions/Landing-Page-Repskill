import { cn } from "@/lib/cn";
import { Container } from "./container";

const tones = {
  white: "bg-white",
  surface: "bg-surface",
  ice: "bg-surface-ice",
  slate: "bg-brand-slate text-white",
} as const;

export type SectionTone = keyof typeof tones;

type SectionProps = {
  id?: string;
  tone?: SectionTone;
  /** `lg` untuk section unggulan / gelap (lihat docs/design-system/05-layout.md) */
  size?: "md" | "lg";
  className?: string;
  containerClassName?: string;
  children: React.ReactNode;
};

/** Wrapper section standar: background sesuai tone + Container + padding vertikal. */
export function Section({
  id,
  tone = "white",
  size = "md",
  className,
  containerClassName,
  children,
}: SectionProps) {
  return (
    <section id={id} className={cn("scroll-mt-[72px]", tones[tone], className)}>
      <Container className={cn(size === "lg" ? "py-20 lg:py-32" : "py-20 lg:py-28", containerClassName)}>
        {children}
      </Container>
    </section>
  );
}
