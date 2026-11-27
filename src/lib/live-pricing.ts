/**
 * Sinkronisasi harga live dari backend Repskill (`GET /api/public/pricing`),
 * bersumber dari Super Admin → Plans & prices (`BillingPriceList`).
 *
 * Karena situs ini memakai static export (`output: "export"`), nilai di `src/content/pricing.ts`
 * tetap dirender langsung sebagai default (SEO & tanpa kedip layout), lalu diperbarui di browser
 * bila endpoint live mengembalikan daftar harga yang valid.
 */
import type { PricingPlan, TokenAddOn } from "@/content/pricing";

export const DEFAULT_PRICING_API_URL = "https://app.repskill.ai/api/public/pricing";

export const PRICING_API_URL =
  process.env.NEXT_PUBLIC_PRICING_API_URL || DEFAULT_PRICING_API_URL;

type LocalText = { en: string; id?: string };

export type PublicPricingPlan = {
  id: "monthly" | "annual";
  months: number;
  per_month_idr: number;
  period_total_idr: number;
  list_total_idr: number | null;
  save_pct: number;
  tokens: number;
  credits: number;
  features: LocalText[];
  recommended: boolean;
};

export type PublicPricingTopup = {
  id: string;
  tokens: number;
  credits: number;
  price_idr: number;
};

export type PublicPricingPayload = {
  currency: "IDR";
  source?: "default" | "published";
  published_at?: string | null;
  recommended: "monthly" | "annual";
  ppn_bps: number | null;
  plans: PublicPricingPlan[];
  topups: PublicPricingTopup[];
  copy?: {
    subtitle?: LocalText;
    plan_note?: LocalText | null;
    trust?: LocalText[];
  };
};

const idrFormat = new Intl.NumberFormat("id-ID", { maximumFractionDigits: 0 });
const creditFormat = new Intl.NumberFormat("en-US", { maximumFractionDigits: 2 });

export function formatIdrDigits(amount: number): string {
  return idrFormat.format(Math.round(amount));
}

export function formatIdrCurrency(amount: number): string {
  return `Rp ${formatIdrDigits(amount)}`;
}

export function formatCreditCount(credits: number): string {
  return creditFormat.format(credits);
}

function isPositiveNumber(value: unknown): value is number {
  return typeof value === "number" && Number.isFinite(value) && value > 0;
}

function isLocalText(value: unknown): value is LocalText {
  return (
    typeof value === "object" &&
    value !== null &&
    typeof (value as Record<string, unknown>).en === "string" &&
    ((value as Record<string, unknown>).en as string).trim().length > 0
  );
}

function isPublicPricingPlan(value: unknown): value is PublicPricingPlan {
  if (typeof value !== "object" || value === null) return false;
  const p = value as Record<string, unknown>;
  return (
    (p.id === "monthly" || p.id === "annual") &&
    isPositiveNumber(p.months) &&
    isPositiveNumber(p.per_month_idr) &&
    isPositiveNumber(p.period_total_idr) &&
    (p.list_total_idr === null || isPositiveNumber(p.list_total_idr)) &&
    typeof p.save_pct === "number" &&
    Number.isFinite(p.save_pct) &&
    p.save_pct >= 0 &&
    isPositiveNumber(p.credits) &&
    Array.isArray(p.features) &&
    p.features.every(isLocalText) &&
    typeof p.recommended === "boolean"
  );
}

function isPublicPricingTopup(value: unknown): value is PublicPricingTopup {
  if (typeof value !== "object" || value === null) return false;
  const t = value as Record<string, unknown>;
  return (
    typeof t.id === "string" &&
    t.id.length > 0 &&
    isPositiveNumber(t.credits) &&
    isPositiveNumber(t.price_idr)
  );
}

export function parsePublicPricing(raw: unknown): PublicPricingPayload | null {
  if (typeof raw !== "object" || raw === null) return null;
  const obj = raw as Record<string, unknown>;
  if (obj.currency !== "IDR") return null;
  if (obj.recommended !== "monthly" && obj.recommended !== "annual") return null;
  if (!Array.isArray(obj.plans) || !obj.plans.every(isPublicPricingPlan)) return null;
  if (!Array.isArray(obj.topups) || obj.topups.length === 0 || !obj.topups.every(isPublicPricingTopup)) {
    return null;
  }
  const hasMonthly = obj.plans.some((p) => p.id === "monthly");
  const hasAnnual = obj.plans.some((p) => p.id === "annual");
  if (!hasMonthly || !hasAnnual) return null;

  return raw as PublicPricingPayload;
}

function resolvePlanNote(payload: PublicPricingPayload, fallbackNote: string): string {
  const customNote = payload.copy?.plan_note?.en?.trim();
  if (customNote) return customNote;
  if (payload.ppn_bps === 0) return "No PPN applied";
  return fallbackNote;
}

function buildPlanFromLive(
  live: PublicPricingPlan,
  fallback: PricingPlan,
  note: string,
): PricingPlan {
  const isAnnual = live.id === "annual";
  const creditLine = isAnnual
    ? `**${formatCreditCount(live.credits)}** credits per year, one-twelfth to use each month`
    : `**${formatCreditCount(live.credits)}** credits per month`;

  const hasDiscount =
    live.list_total_idr !== null &&
    live.list_total_idr > live.period_total_idr &&
    live.save_pct > 0;

  const billing: PricingPlan["billing"] = isAnnual
    ? hasDiscount && live.list_total_idr !== null
      ? {
          was: formatIdrCurrency(live.list_total_idr),
          total: formatIdrCurrency(live.period_total_idr),
          text: "billed yearly",
        }
      : {
          total: formatIdrCurrency(live.period_total_idr),
          text: "billed yearly",
        }
    : hasDiscount && live.list_total_idr !== null
      ? {
          was: formatIdrCurrency(live.list_total_idr),
          total: formatIdrCurrency(live.period_total_idr),
          text: "billed monthly",
        }
      : { text: "Billed monthly" };

  const savings =
    hasDiscount && live.list_total_idr !== null
      ? `You save ${formatIdrCurrency(live.list_total_idr - live.period_total_idr)} ${isAnnual ? "a year" : "a month"} (${live.save_pct}%)`
      : undefined;

  return {
    ...fallback,
    badge: live.recommended ? "Recommended" : undefined,
    price: formatIdrDigits(live.per_month_idr),
    billing,
    savings,
    features: [creditLine, ...live.features.map((f) => f.en)],
    note,
  };
}

function buildTopupRate(topups: PublicPricingTopup[], fallbackRate: string): string {
  const rates = topups.map((pack) => Math.round(pack.price_idr / pack.credits));
  if (rates.length === 0) return fallbackRate;
  const minRate = Math.min(...rates);
  const maxRate = Math.max(...rates);
  if (minRate === maxRate) return `${formatIdrCurrency(minRate)} per credit`;
  return `From ${formatIdrCurrency(minRate)} per credit`;
}

export function mergeLivePricing(
  fallback: { title: string; items: PricingPlan[]; addOn: TokenAddOn },
  payload: PublicPricingPayload,
): { title: string; items: PricingPlan[]; addOn: TokenAddOn } {
  const note = resolvePlanNote(payload, fallback.items[0]?.note ?? "Prices before PPN");
  const byId = new Map(payload.plans.map((p) => [p.id, p]));

  const items = fallback.items.map((plan) => {
    const id = plan.name.toLowerCase() === "annual" ? "annual" : "monthly";
    const live = byId.get(id);
    return live ? buildPlanFromLive(live, plan, note) : plan;
  });

  const addOn: TokenAddOn = {
    ...fallback.addOn,
    rate: buildTopupRate(payload.topups, fallback.addOn.rate),
    options: payload.topups.map((pack) => ({
      tokens: formatCreditCount(pack.credits),
      price: formatIdrCurrency(pack.price_idr),
    })),
    note,
  };

  return { ...fallback, items, addOn };
}

export async function fetchPublicPricing(signal?: AbortSignal): Promise<PublicPricingPayload | null> {
  try {
    const res = await fetch(PRICING_API_URL, {
      method: "GET",
      headers: { Accept: "application/json" },
      signal,
    });
    if (!res.ok) return null;
    const data: unknown = await res.json();
    return parsePublicPricing(data);
  } catch {
    return null;
  }
}
