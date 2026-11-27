/**
 * Sinkronisasi harga live dari backend Repskill (`GET /api/public/pricing`),
 * bersumber dari Super Admin → Plans & prices (`BillingPriceList`).
 *
 * Karena situs ini memakai static export (`output: "export"`), nilai di `src/content/pricing.ts`
 * tetap dirender langsung sebagai default (SEO & tanpa kedip layout), lalu diperbarui di browser
 * bila endpoint live mengembalikan daftar harga yang valid.
 */
import { livePricingCopy as copy, type PricingPlan, type TokenAddOn } from "@/content/pricing";

export const DEFAULT_PRICING_API_URL = "https://app.repskill.ai/api/public/pricing";

export const PRICING_API_URL = process.env.NEXT_PUBLIC_PRICING_API_URL || DEFAULT_PRICING_API_URL;

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

export type MergedPricingPlans = {
  title: string;
  items: PricingPlan[];
  addOn: TokenAddOn | null;
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

export function creditUnitWord(formattedCredits: string): string {
  return /^1$/.test(formattedCredits.trim()) ? copy.creditUnitOne : copy.creditUnitMany;
}

/** Mengisi `{nama}` pada teks di `livePricingCopy`. */
function fill(template: string, values: Record<string, string>): string {
  return template.replace(/\{(\w+)\}/g, (whole, key: string) => values[key] ?? whole);
}

function rateDecimals(rate: number, fits: (shown: number) => boolean, max = 6): number {
  if (!Number.isFinite(rate)) return 0;
  for (let d = 0; d < max; d++) {
    const scale = 10 ** d;
    if (fits(Math.round(rate * scale) / scale)) return d;
  }
  return max;
}

function formatRateIdr(rate: number, decimals: number): string {
  if (!Number.isFinite(rate)) return "—";
  const d = decimals === 0 ? 0 : Math.max(2, decimals);
  return new Intl.NumberFormat("id-ID", {
    minimumFractionDigits: d,
    maximumFractionDigits: d,
  }).format(rate);
}

function isPositiveNumber(value: unknown): value is number {
  return typeof value === "number" && Number.isFinite(value) && value > 0;
}

function isLocalText(value: unknown): value is LocalText {
  if (typeof value !== "object" || value === null) return false;
  const obj = value as Record<string, unknown>;
  if (typeof obj.en !== "string" || obj.en.trim().length === 0) return false;
  if (obj.id !== undefined && typeof obj.id !== "string") return false;
  return true;
}

function isValidCopy(value: unknown): boolean {
  if (value === undefined) return true;
  if (typeof value !== "object" || value === null) return false;
  const copy = value as Record<string, unknown>;
  if (copy.subtitle !== undefined && !isLocalText(copy.subtitle)) return false;
  if (copy.plan_note !== undefined && copy.plan_note !== null && !isLocalText(copy.plan_note)) {
    return false;
  }
  if (copy.trust !== undefined && (!Array.isArray(copy.trust) || !copy.trust.every(isLocalText))) {
    return false;
  }
  return true;
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
  if (
    obj.ppn_bps !== null &&
    (typeof obj.ppn_bps !== "number" || !Number.isInteger(obj.ppn_bps) || obj.ppn_bps < 0)
  ) {
    return null;
  }
  if (!Array.isArray(obj.plans) || !obj.plans.every(isPublicPricingPlan)) return null;
  if (!Array.isArray(obj.topups) || !obj.topups.every(isPublicPricingTopup)) return null;
  if (!isValidCopy(obj.copy)) return null;

  const hasMonthly = obj.plans.some((p) => p.id === "monthly");
  const hasAnnual = obj.plans.some((p) => p.id === "annual");
  if (!hasMonthly || !hasAnnual) return null;

  return raw as PublicPricingPayload;
}

function resolvePlanNote(payload: PublicPricingPayload, fallbackNote: string): string {
  const customNote = typeof payload.copy?.plan_note?.en === "string" ? payload.copy.plan_note.en.trim() : "";
  if (customNote) return customNote;
  return fallbackNote;
}

function buildPlanFromLive(live: PublicPricingPlan, fallback: PricingPlan, note: string): PricingPlan {
  const isAnnual = live.id === "annual";
  const formattedCredits = formatCreditCount(live.credits);
  const unit = creditUnitWord(formattedCredits);
  const creditLine = fill(isAnnual ? copy.creditsYearly : copy.creditsMonthly, {
    credits: formattedCredits,
    unit,
  });

  const hasDiscount = live.list_total_idr !== null && live.list_total_idr > live.period_total_idr;

  const billing: PricingPlan["billing"] = isAnnual
    ? hasDiscount && live.list_total_idr !== null
      ? {
          was: formatIdrCurrency(live.list_total_idr),
          total: formatIdrCurrency(live.period_total_idr),
          text: copy.billedYearly,
        }
      : {
          total: formatIdrCurrency(live.period_total_idr),
          text: copy.billedYearly,
        }
    : hasDiscount && live.list_total_idr !== null
      ? {
          was: formatIdrCurrency(live.list_total_idr),
          total: formatIdrCurrency(live.period_total_idr),
          text: copy.billedMonthly,
        }
      : { text: copy.billedMonthlyPlain };

  const pctSuffix = live.save_pct > 0 ? ` (${live.save_pct}%)` : "";
  const savings =
    hasDiscount && live.list_total_idr !== null
      ? fill(copy.saving, {
          amount: formatIdrCurrency(live.list_total_idr - live.period_total_idr),
          period: isAnnual ? copy.savingPeriodYear : copy.savingPeriodMonth,
          pct: pctSuffix,
        })
      : undefined;

  return {
    ...fallback,
    badge: live.recommended ? copy.badge : undefined,
    price: formatIdrDigits(live.per_month_idr),
    billing,
    savings,
    features: [creditLine, ...live.features.map((f) => f.en)],
    note,
  };
}

function buildTopupRate(topups: PublicPricingTopup[], fallbackRate: string): string {
  if (topups.length === 0) return fallbackRate;
  const entries = topups.map((pack) => ({
    pack,
    rate: pack.price_idr / pack.credits,
  }));
  const minEntry = entries.reduce((best, cur) => (cur.rate < best.rate ? cur : best), entries[0]);
  const allSame = entries.every((e) => Math.abs(e.rate - minEntry.rate) < 1e-9);
  const decimals = rateDecimals(
    minEntry.rate,
    (shown) => Math.round(shown * minEntry.pack.credits) === minEntry.pack.price_idr,
  );
  const formatted = `Rp ${formatRateIdr(minEntry.rate, decimals)}`;
  return fill(allSame ? copy.topupRateSame : copy.topupRateFrom, { rate: formatted });
}

export function mergeLivePricing(
  fallback: { title: string; items: PricingPlan[]; addOn: TokenAddOn },
  payload: PublicPricingPayload,
): MergedPricingPlans {
  const planNote = resolvePlanNote(payload, fallback.items[0]?.note ?? "Prices before PPN");
  const topupNote = fallback.addOn.note;
  const byId = new Map(payload.plans.map((p) => [p.id, p]));

  const items = fallback.items.map((plan) => {
    const id = plan.name.toLowerCase() === "annual" ? "annual" : "monthly";
    const live = byId.get(id);
    return live ? buildPlanFromLive(live, plan, planNote) : plan;
  });

  const addOn: TokenAddOn | null =
    payload.topups.length === 0
      ? null
      : {
          ...fallback.addOn,
          rate: buildTopupRate(payload.topups, fallback.addOn.rate),
          options: payload.topups.map((pack) => ({
            id: pack.id,
            tokens: formatCreditCount(pack.credits),
            price: formatIdrCurrency(pack.price_idr),
          })),
          note: topupNote,
        };

  return { ...fallback, items, addOn };
}

/**
 * Gagal tetap membiarkan harga bawaan build tampil (halaman tidak boleh rusak), tetapi tidak diam:
 * sebab dicatat di console, satu-satunya tanda yang bisa dilihat situs statis ini.
 */
function warnLivePricingFallback(reason: string): null {
  console.warn(`[live-pricing] showing the built-in prices: ${reason} (${PRICING_API_URL})`);
  return null;
}

export async function fetchPublicPricing(signal?: AbortSignal): Promise<PublicPricingPayload | null> {
  try {
    const res = await fetch(PRICING_API_URL, {
      method: "GET",
      headers: { Accept: "application/json" },
      signal,
    });
    if (!res.ok) return warnLivePricingFallback(`the endpoint answered HTTP ${res.status}`);
    const data: unknown = await res.json();
    return parsePublicPricing(data) ?? warnLivePricingFallback("the response does not match the expected price list shape");
  } catch (err) {
    // A page that is leaving aborts its own request; that is not a fault.
    if (signal?.aborted) return null;
    return warnLivePricingFallback(err instanceof Error ? err.message : "the request failed");
  }
}
