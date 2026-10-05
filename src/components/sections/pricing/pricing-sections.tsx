import Link from "next/link";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { ArrowRight, ButtonLink } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { pricingPage } from "@/content/pricing";
import { cn } from "@/lib/cn";

function Check({ className }: { className?: string }) {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="M5 12l5 5L20 7" />
    </svg>
  );
}

/** Plans / Pricing Model */
export function PricingModel() {
  const { plan } = pricingPage;
  return (
    <Section tone="surface">
      <div className="grid gap-4 lg:grid-cols-[1.4fr_1fr]">
        <Reveal className="flex flex-col gap-6 rounded-panel border border-line bg-white p-7 shadow-float sm:p-10">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <Eyebrow>{plan.eyebrow}</Eyebrow>
            <span className="rounded-full bg-brand-orange px-3 py-1 text-xs font-semibold text-white">
              All capabilities included
            </span>
          </div>
          <div className="flex flex-col gap-3">
            <span className="text-h3 text-brand-slate">{plan.name}</span>
            <h2 className="text-h2 text-balance">{plan.title}</h2>
            <p className="text-lead text-pretty text-brand-slate">{plan.body}</p>
          </div>
          <ul className="grid gap-3 sm:grid-cols-2">
            {plan.includes.map((item) => (
              <li key={item} className="flex items-start gap-3 text-[15px] text-ink">
                <span className="mt-0.5 flex size-5 flex-none items-center justify-center rounded-full bg-brand-teal text-white">
                  <Check />
                </span>
                {item}
              </li>
            ))}
          </ul>
          <ButtonLink href={plan.cta.href} size="lg" withArrow className="mt-2 self-start">
            {plan.cta.label}
          </ButtonLink>
        </Reveal>

        <Reveal
          delay={0.15}
          className="flex flex-col gap-5 rounded-panel bg-brand-slate p-7 text-white sm:p-10"
        >
          <span className="text-eyebrow text-brand-cyan">{plan.factors.title.toUpperCase()}</span>
          <Stagger as="ol" className="flex flex-col gap-5" stagger={0.1}>
            {plan.factors.items.map((f, i) => (
              <StaggerItem as="li" key={f.title} className="flex gap-4">
                <span className="text-sm font-bold text-brand-cyan">{String(i + 1).padStart(2, "0")}</span>
                <div className="flex flex-col gap-1">
                  <span className="font-bold">{f.title}</span>
                  <span className="text-[15px] leading-relaxed text-line">{f.desc}</span>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </Reveal>
      </div>
    </Section>
  );
}

/** What's Included */
export function WhatsIncluded() {
  const { included } = pricingPage;
  return (
    <Section id="included">
      <SectionHeader eyebrow={included.eyebrow} title={included.title} />
      <Stagger className="mt-10 grid gap-4 sm:grid-cols-2 lg:mt-14 xl:grid-cols-4" stagger={0.08}>
        {included.items.map((item) => (
          <StaggerItem key={item.title}>
            <Link
              href={item.href}
              className={cn(
                "group flex h-full flex-col gap-3 rounded-card p-6 transition-[border-color,box-shadow,transform] duration-200 hover:-translate-y-0.5",
                item.accent
                  ? "bg-brand-teal text-white"
                  : "border border-line bg-white hover:border-brand-cyan hover:shadow-glow",
              )}
            >
              <span
                className={cn(
                  "text-[11.5px] font-bold tracking-[0.12em]",
                  item.accent ? "text-brand-cyan-soft" : "text-brand-teal",
                )}
              >
                {item.stage}
              </span>
              <span className="text-h3">{item.title}</span>
              <span
                className={cn(
                  "text-[13px] font-semibold",
                  item.accent ? "text-brand-cyan-soft" : "text-brand-slate",
                )}
              >
                {item.tools}
              </span>
              <span
                className={cn("text-[15px] leading-relaxed", item.accent ? "text-white" : "text-brand-slate")}
              >
                {item.desc}
              </span>
              <ArrowRight
                size={16}
                className={cn(
                  "mt-auto transition-transform group-hover:translate-x-1",
                  item.accent ? "text-white" : "text-brand-teal",
                )}
              />
            </Link>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}

function ComparisonValue({ value, highlight }: { value: boolean | string; highlight: boolean }) {
  if (typeof value === "string")
    return <span className="text-sm font-semibold text-brand-slate">{value}</span>;
  if (value)
    return (
      <span
        className={cn(
          "flex size-7 items-center justify-center rounded-full text-white",
          highlight ? "bg-brand-orange" : "bg-brand-teal",
        )}
      >
        <Check />
        <span className="sr-only">Yes</span>
      </span>
    );
  return (
    <span className="text-xl leading-none text-brand-slate/40">
      —<span className="sr-only">No</span>
    </span>
  );
}

/** Feature Comparison */
export function FeatureComparison() {
  const { comparison } = pricingPage;
  return (
    <Section tone="surface">
      <SectionHeader eyebrow={comparison.eyebrow} title={comparison.title} lead={comparison.lead} />
      <Reveal className="mt-10 overflow-x-auto rounded-card border border-line bg-white lg:mt-14">
        <table className="w-full min-w-[560px] border-collapse text-left">
          <thead>
            <tr className="border-b border-line">
              <th className="px-6 py-5 text-eyebrow text-brand-slate">CAPABILITY</th>
              {comparison.columns.map((col, i) => (
                <th
                  key={col}
                  className={cn(
                    "w-40 px-6 py-5 text-center text-sm font-bold",
                    i === 1 ? "bg-brand-orange/10 text-brand-orange-deep" : "text-brand-slate",
                  )}
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {comparison.rows.map((row) => (
              <tr key={row.label} className="border-b border-line last:border-b-0">
                <td className="px-6 py-4 text-[15px] font-medium text-ink">{row.label}</td>
                {row.values.map((value, i) => (
                  <td key={i} className={cn("px-6 py-4", i === 1 && "bg-brand-orange/5")}>
                    <div className="flex justify-center">
                      <ComparisonValue value={value} highlight={i === 1} />
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </Reveal>
    </Section>
  );
}
