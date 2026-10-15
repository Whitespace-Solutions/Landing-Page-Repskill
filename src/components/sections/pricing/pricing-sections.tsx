import { Reveal } from "@/components/motion/reveal";
import { ButtonLink } from "@/components/ui/button";
import { RichText } from "@/components/ui/rich-text";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { pricingPage, type PricingPlan } from "@/content/pricing";
import { cn } from "@/lib/cn";
import { PlanCheck, PlanTag } from "./plan-parts";
import { TokenAddOnCard } from "./token-addon";

/** Centang di dalam lingkaran untuk tabel perbandingan */
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

/**
 * Satu panel putih langsung di bawah hero (tanpa judul terlihat), dibagi 3 kolom dengan garis tipis: Monthly · Annual
 * (langganan) · Add-on token. Mulai `lg` berjejer; di bawahnya bertumpuk. Warna minimal: hanya tombol paket `badge`
 * (Annual) yang oranye.
 */
export function PricingPlans() {
  const { plans } = pricingPage;
  return (
    // Plans dan Feature Comparison sama-sama `surface`: padding bawah Plans saja yang jadi jarak (Comparison tanpa padding atas)
    <Section id="plans" tone="surface" containerClassName="pb-16 lg:pb-20">
      {/* Judul hanya untuk pembaca layar; secara visual panel langsung tampil di bawah hero */}
      <h2 className="sr-only">{plans.title}</h2>
      <Reveal className="grid divide-y divide-line overflow-hidden rounded-panel border border-line bg-white lg:grid-cols-3 lg:divide-x lg:divide-y-0">
        {plans.items.map((plan) => (
          <PlanColumn key={plan.name} plan={plan} />
        ))}
        <TokenAddOnCard addOn={plans.addOn} />
      </Reveal>
    </Section>
  );
}

function PlanColumn({ plan }: { plan: PricingPlan }) {
  const featured = Boolean(plan.badge);
  return (
    <article className="flex min-w-0 flex-col p-6 sm:p-8 lg:p-7 xl:p-8">
      {/* Satu label per kolom supaya nama + label tetap satu baris: badge (Recommended) menggantikan eyebrow */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h3 className="text-h3 text-brand-grey">{plan.name}</h3>
        {plan.badge ? <PlanTag strong>{plan.badge}</PlanTag> : <PlanTag>{plan.eyebrow}</PlanTag>}
      </div>

      <p className="mt-5 flex flex-wrap items-baseline gap-x-1 text-brand-grey">
        <span className="text-base font-bold">{plan.currency}</span>
        <span className="text-h2">{plan.price}</span>
        <span className="text-sm text-brand-charcoal">{plan.period}</span>
      </p>
      <p className="mt-1 text-sm text-brand-charcoal">
        {/* Spasi sungguhan (bukan margin) supaya baris bisa patah di antara bagian-bagiannya */}
        {plan.billing.was && <s className="whitespace-nowrap">{plan.billing.was}</s>}{" "}
        {plan.billing.total && (
          <strong className="whitespace-nowrap text-brand-grey">{plan.billing.total}</strong>
        )}{" "}
        {plan.billing.text}
        {plan.savings && <span className="block font-semibold text-brand-grey">{plan.savings}</span>}
      </p>

      <ul className="mt-6 flex flex-col gap-3 border-t border-line pt-6">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-start gap-2.5 text-sm text-brand-charcoal">
            <PlanCheck />
            <span>
              <RichText text={feature} />
            </span>
          </li>
        ))}
      </ul>

      <div className="mt-auto flex flex-col items-center gap-2.5 pt-8">
        <ButtonLink href={plan.cta.href} variant={featured ? "primary" : "outline"} className="w-full">
          {plan.cta.label}
        </ButtonLink>
        <span className="text-caption text-brand-charcoal">{plan.note}</span>
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
    <Section tone="surface" containerClassName="pt-0 lg:pt-0">
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
