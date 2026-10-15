"use client";

import { useState } from "react";
import { ButtonLink } from "@/components/ui/button";
import type { TokenAddOn } from "@/content/pricing";
import { cn } from "@/lib/cn";

/**
 * Kartu ketiga di Pricing: paket token tambahan sebagai radio. Paket terpilih berlatar Linen dengan border oranye, dan
 * label tombol ikut jumlah token yang dipilih.
 */
export function TokenAddOnCard({ addOn }: { addOn: TokenAddOn }) {
  const [selected, setSelected] = useState(0);
  const tokens = addOn.options[selected].tokens;

  return (
    <article className="flex h-full flex-col rounded-panel border border-line bg-white p-6 sm:p-7">
      <span className="text-eyebrow text-brand-charcoal uppercase">{addOn.eyebrow}</span>
      <h3 className="mt-2 text-h3 text-brand-grey">{addOn.title}</h3>
      <p className="mt-2 text-sm text-pretty text-brand-charcoal">{addOn.body}</p>
      <p className="mt-1.5 text-sm font-semibold text-brand-grey">{addOn.rate}</p>

      <fieldset className="mt-5 flex min-w-0 flex-col gap-2.5">
        <legend className="sr-only">{addOn.title}</legend>
        {addOn.options.map((option, i) => {
          const active = i === selected;
          return (
            <label
              key={option.tokens}
              className={cn(
                "flex cursor-pointer items-center gap-3 rounded-card border px-3.5 py-3 text-sm transition-colors has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-brand-orange",
                active ? "border-brand-orange bg-brand-linen" : "border-line hover:border-brand-amber",
              )}
            >
              <input
                type="radio"
                name="token-addon"
                value={option.tokens}
                checked={active}
                onChange={() => setSelected(i)}
                className="sr-only"
              />
              <span
                className={cn(
                  "flex size-5 flex-none items-center justify-center rounded-full border-2",
                  active ? "border-brand-orange" : "border-line",
                )}
                aria-hidden
              >
                {active && <span className="size-2.5 rounded-full bg-brand-orange" />}
              </span>
              {/* Jumlah kiri, harga kanan; di kartu sempit harga turun ke bawah, tidak keluar kartu */}
              <span className="flex min-w-0 flex-1 flex-wrap items-baseline justify-between gap-x-3 gap-y-0.5 font-bold text-brand-grey">
                <span className="whitespace-nowrap">{option.tokens} tokens</span>
                <span className="whitespace-nowrap">{option.price}</span>
              </span>
            </label>
          );
        })}
      </fieldset>

      <div className="mt-auto flex flex-col items-center gap-2.5 pt-7">
        <ButtonLink href={addOn.href} size="lg" variant="outline" className="w-full">
          {addOn.ctaLabel.replace("{tokens}", tokens)}
        </ButtonLink>
        <span className="text-caption text-brand-charcoal">{addOn.note}</span>
      </div>
    </article>
  );
}
