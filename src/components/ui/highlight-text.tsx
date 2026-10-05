/** Mewarnai satu frasa di dalam judul dengan oranye (maksimal satu highlight per judul). */
export function HighlightText({ text, highlight }: { text: string; highlight?: string }) {
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
