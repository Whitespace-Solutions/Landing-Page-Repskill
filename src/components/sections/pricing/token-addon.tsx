"use client";

import { useState } from "react";
import { ButtonLink } from "@/components/ui/button";
import type { TokenAddOn } from "@/content/pricing";
import { cn } from "@/lib/cn";
import { creditUnitWord } from "@/lib/live-pricing";
import { PlanTag } from "./plan-parts";

const optionKey = (option: TokenAddOn["options"][number], index: number) =>
  option.id ?? `${option.tokens}-${index}`;

/**
 * Kolom ketiga panel Pricing: paket token tambahan sebagai radio. Warna minimal: paket terpilih bergaris Shadow Grey
 * dengan latar `surface`, label tombol ikut jumlah token yang dipilih.
 */
export function TokenAddOnCard({ addOn }: { addOn: TokenAddOn }) {
  const [selectedKey, setSelectedKey] = useState(() =>
    addOn.options[0] ? optionKey(addOn.options[0], 0) : "",
  );
  const currentOption = addOn.options.find((opt, i) => optionKey(opt, i) === selectedKey) ?? addOn.options[0];
  const activeKey = currentOption ? optionKey(currentOption, addOn.options.indexOf(currentOption)) : "";
  const tokens = currentOption?.tokens ?? "";
  const unit = creditUnitWord(tokens);
  const ctaHref = tokens
    ? `${addOn.href}${addOn.href.includes("?") ? "&" : "?"}credits=${encodeURIComponent(tokens)}`
    : addOn.href;
  const ctaText = tokens
    ? addOn.ctaLabel.replace("{tokens} credits", `${tokens} ${unit}`).replace("{tokens}", tokens)
    : addOn.ctaLabel.replace("{tokens}", "").trim();

  return (
    <article className="flex min-w-0 flex-col p-6 sm:p-8 lg:p-7 xl:p-8">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h3 className="text-h3 text-brand-grey">{addOn.title}</h3>
        <PlanTag>{addOn.eyebrow}</PlanTag>
      </div>
      <p className="mt-5 text-sm font-semibold text-brand-grey">{addOn.rate}</p>
      <p className="mt-1 text-sm text-pretty text-brand-charcoal">{addOn.body}</p>

      <fieldset className="mt-6 flex min-w-0 flex-col gap-2 border-t border-line pt-6">
        <legend className="sr-only">{addOn.title}</legend>
        {addOn.options.map((option, i) => {
          const key = optionKey(option, i);
          const active = key === activeKey;
          return (
            <label
              key={key}
              className={cn(
                "flex cursor-pointer items-center gap-3 rounded-button border px-3.5 py-2.5 text-sm transition-colors has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-brand-orange",
                active ? "border-brand-grey bg-surface" : "border-line hover:border-brand-grey/40",
              )}
            >
              <input
                type="radio"
                name="token-addon"
                value={key}
                checked={active}
                onChange={() => setSelectedKey(key)}
                className="sr-only"
              />
              <span
                className={cn(
                  "flex size-4 flex-none items-center justify-center rounded-full border-2",
                  active ? "border-brand-grey" : "border-line",
                )}
                aria-hidden
              >
                {active && <span className="size-1.5 rounded-full bg-brand-grey" />}
              </span>
              {/* Jumlah kiri, harga kanan; di kolom sempit harga turun ke bawah, tidak keluar panel */}
              <span className="flex min-w-0 flex-1 flex-wrap items-baseline justify-between gap-x-3 text-brand-grey">
                <span className="font-semibold whitespace-nowrap">
                  {option.tokens} {creditUnitWord(option.tokens)}
                </span>
                <span className="whitespace-nowrap">{option.price}</span>
              </span>
            </label>
          );
        })}
      </fieldset>

      <div className="mt-auto flex flex-col items-center gap-2.5 pt-8">
        <ButtonLink href={ctaHref} variant="outline" className="w-full">
          {ctaText}
        </ButtonLink>
        <span className="text-caption text-brand-charcoal">{addOn.note}</span>
      </div>
    </article>
  );
}
