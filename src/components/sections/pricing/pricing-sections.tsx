import Image from "next/image";
import repskillIcon from "@/assets/brand/repskill-icon.svg";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { ButtonLink } from "@/components/ui/button";
import { RichText } from "@/components/ui/rich-text";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { pricingPage, type PricingPlan } from "@/content/pricing";
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

/** Dua kartu harga (Monthly · Annual) langsung di bawah hero, tanpa judul terlihat. Kartu dengan `badge` ditonjolkan. */
export function PricingPlans() {
  const { plans } = pricingPage;
  return (
    <Section id="plans" tone="surface">
      {/* Judul hanya untuk pembaca layar; secara visual kartu langsung tampil di bawah hero */}
      <h2 className="sr-only">{plans.title}</h2>
      <Stagger
        className="mx-auto grid max-w-[1040px] items-start gap-10 md:grid-cols-2 md:gap-6"
        stagger={0.12}
      >
        {plans.items.map((plan) => (
          <StaggerItem key={plan.name} className="h-full">
            <PlanCard plan={plan} />
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}

function PlanCard({ plan }: { plan: PricingPlan }) {
  const featured = Boolean(plan.badge);
  return (
    <article
      className={cn(
        "relative flex h-full flex-col items-center rounded-panel bg-white px-6 pt-10 pb-8 text-center sm:px-10",
        featured ? "border-2 border-brand-orange shadow-float" : "border border-line",
      )}
    >
      {plan.badge && (
        <span className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-brand-orange px-4 py-1.5 text-eyebrow whitespace-nowrap text-white uppercase">
          {plan.badge}
        </span>
      )}
      <span className="flex size-16 items-center justify-center rounded-card border border-line bg-white">
        <Image src={repskillIcon} alt="" className="size-9" />
      </span>
      <h3 className="mt-5 text-h3 text-brand-orange">{plan.name}</h3>
      <p className="mt-2 flex items-baseline justify-center gap-1 text-brand-grey">
        <span className="text-h3 text-brand-charcoal">{plan.currency}</span>
        <span className="text-display">{plan.price}</span>
        <span className="text-lead text-brand-charcoal">{plan.period}</span>
      </p>
      <p className="mt-3 text-base text-brand-charcoal">
        {plan.billing.was && <s className="mr-2 whitespace-nowrap">{plan.billing.was}</s>}
        {plan.billing.total && (
          <strong className="mr-1 whitespace-nowrap text-brand-orange">{plan.billing.total}</strong>
        )}
        {plan.billing.text}
      </p>

      <ul className="mt-8 flex w-full flex-col gap-4 border-t border-line pt-8 text-left">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-start gap-3 text-base text-brand-charcoal">
            <span className="mt-0.5 flex size-6 flex-none items-center justify-center rounded-full bg-brand-amber text-brand-grey">
              <Check />
            </span>
            <span>
              <RichText text={feature} />
            </span>
          </li>
        ))}
      </ul>

      <div className="mt-auto flex w-full flex-col items-center gap-4 pt-10">
        <ButtonLink
          href={plan.cta.href}
          size="lg"
          variant={featured ? "primary" : "outline"}
          className="w-full"
        >
          {plan.cta.label}
        </ButtonLink>
        <span className="text-sm text-brand-charcoal">{plan.note}</span>
      </div>
    </article>
  );
}

function ComparisonValue({ value, highlight }: { value: boolean | string; highlight: boolean }) {
  if (typeof value === "string")
    return <span className="text-sm font-semibold text-brand-charcoal">{value}</span>;
  if (value)
    return (
      <span
        className={cn(
          "flex size-7 items-center justify-center rounded-full",
          highlight ? "bg-brand-orange text-white" : "bg-brand-amber text-brand-grey",
        )}
      >
        <Check />
        <span className="sr-only">Yes</span>
      </span>
    );
  return (
    <span className="text-xl leading-none text-brand-charcoal/40">
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
              <th className="px-6 py-5 text-eyebrow text-brand-charcoal">CAPABILITY</th>
              {comparison.columns.map((col, i) => (
                <th
                  key={col}
                  className={cn(
                    "w-40 px-6 py-5 text-center text-sm font-bold",
                    i === 1 ? "bg-brand-orange/10 text-brand-orange-deep" : "text-brand-charcoal",
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
                <td className="px-6 py-4 text-[15px] font-medium text-brand-grey">{row.label}</td>
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
