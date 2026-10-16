import { Stagger, StaggerItem } from "@/components/motion/reveal";
import { cn } from "@/lib/cn";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { differentiators } from "@/content/home";

/** Pembeda di Home: dua kolom (dibangun untuk Indonesia · tata kelola enterprise), tiap poin dengan centang amber. */
export function Differentiators() {
  const { columns, ...header } = differentiators;

  return (
    <Section id="why-repskill" tone="surface">
      <SectionHeader {...header} layout="side" centerOnMobile />

      <Stagger className="mt-10 grid gap-4 lg:mt-14 lg:grid-cols-2" stagger={0.12}>
        {columns.map((column, c) => (
          <StaggerItem
            key={column.kicker}
            className={cn(
              "flex h-full flex-col gap-6 rounded-card p-6 sm:p-8",
              c === 0 ? "bg-brand-linen" : "border border-line bg-white",
            )}
          >
            <span className="text-caption font-bold tracking-[0.12em] text-brand-grey/70">
              {column.kicker}
            </span>
            <ul className="grid gap-5 sm:grid-cols-2">
              {column.items.map((item) => (
                <li key={item.title} className="flex gap-3">
                  <span className="mt-0.5 flex size-6 flex-none items-center justify-center rounded-full bg-brand-amber text-brand-grey">
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden
                    >
                      <path d="M5 12l5 5L20 7" />
                    </svg>
                  </span>
                  <span className="flex flex-col gap-1">
                    <span className="font-bold text-brand-grey">{item.title}</span>
                    <span className="text-sm leading-relaxed text-brand-charcoal">{item.body}</span>
                  </span>
                </li>
              ))}
            </ul>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}
