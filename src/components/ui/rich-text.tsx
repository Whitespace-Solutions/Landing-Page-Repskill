import { Fragment } from "react";

/** Teks dengan `**tebal**` → <strong> (Shadow Grey). Dipakai Guide dan kartu harga. */
export function RichText({ text }: { text: string }) {
  return text.split(/\*\*(.+?)\*\*/g).map((part, i) =>
    i % 2 ? (
      <strong key={i} className="font-semibold text-brand-grey">
        {part}
      </strong>
    ) : (
      <Fragment key={i}>{part}</Fragment>
    ),
  );
}
