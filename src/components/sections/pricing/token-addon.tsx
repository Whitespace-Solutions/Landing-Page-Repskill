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
    <article className="flex h-full flex-col rounded-panel border border-line bg-white p-6 sm:p-8">
      <span className="text-eyebrow text-brand-charcoal uppercase">{addOn.eyebrow}</span>
      <h3 className="mt-2 text-h3 text-brand-grey">{addOn.title}</h3>
      <p className="mt-2 text-base text-pretty text-brand-charcoal">{addOn.body}</p>
      <p className="mt-2 text-sm font-semibold text-brand-grey">{addOn.rate}</p>

      <fieldset className="mt-6 flex flex-col gap-3">
        <legend className="sr-only">{addOn.title}</legend>
        {addOn.options.map((option, i) => {
          const active = i === selected;
          return (
            <label
              key={option.tokens}
              className={cn(
                "flex cursor-pointer items-center gap-3.5 rounded-card border px-4 py-3.5 transition-colors has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-brand-orange",
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
              <span className="flex-1 font-bold whitespace-nowrap text-brand-grey">
                {option.tokens} tokens
              </span>
              <span className="font-bold whitespace-nowrap text-brand-grey">{option.price}</span>
            </label>
          );
        })}
      </fieldset>

      <div className="mt-auto flex flex-col items-center gap-3 pt-8">
        <ButtonLink href={addOn.href} size="lg" variant="outline" className="w-full">
          {addOn.ctaLabel.replace("{tokens}", tokens)}
        </ButtonLink>
        <span className="text-sm text-brand-charcoal">{addOn.note}</span>
      </div>
    </article>
  );
}
