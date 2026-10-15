import { Fragment } from "react";

/**
 * Mewarnai satu frasa di dalam judul dengan oranye (maksimal satu highlight per judul).
 * `\n` di teks = pindah baris mulai layar `sm`; di HP jadi spasi biasa supaya judul tetap turun baris alami.
 */
export function HighlightText({ text, highlight }: { text: string; highlight?: string }) {
  const lines = text.split("\n");
  return (
    <>
      {lines.map((line, i) => (
        <Fragment key={i}>
          {i > 0 && (
            <>
              {" "}
              <br className="hidden sm:inline" />
            </>
          )}
          <Highlighted text={line} highlight={highlight} />
        </Fragment>
      ))}
    </>
  );
}

function Highlighted({ text, highlight }: { text: string; highlight?: string }) {
  const index = highlight ? text.indexOf(highlight) : -1;
  if (!highlight || index === -1) return <>{text}</>;

  return (
    <>
      {text.slice(0, index)}
      <span className="text-brand-orange">{highlight}</span>
      {text.slice(index + highlight.length)}
    </>
  );
}
