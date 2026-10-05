import { AnimatedBar } from "@/components/motion/animated-bar";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import type { MockupData, Status } from "@/content/types";
import { cn } from "@/lib/cn";

/**
 * Ilustrasi mockup UI produk, dirender dari data konten (`MockupData`).
 * Aturan visual: docs/design-system/08-imagery.md
 */
export function Mockup({ data }: { data: MockupData }) {
  switch (data.type) {
    case "chat":
      return <ChatMockup {...data} />;
    case "checklist":
      return <ChecklistMockup {...data} />;
    case "bars":
      return <BarsMockup {...data} />;
    case "knowledge-universe":
      return <KnowledgeUniverseMockup {...data} />;
    case "governance":
      return <GovernanceMockup {...data} />;
    case "quote":
      return <QuoteMockup {...data} />;
    case "structure":
      return <StructureMockup {...data} />;
  }
}

function MockupCard({
  title,
  meta,
  badge,
  className,
  children,
}: {
  title?: string;
  meta?: string;
  badge?: React.ReactNode;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("rounded-card border border-line bg-white p-5 shadow-float sm:p-6", className)}>
      {(title || meta || badge) && (
        <div className="mb-4 flex items-center justify-between gap-3">
          <div className="flex min-w-0 flex-col">
            {title && <span className="truncate text-sm font-bold text-ink">{title}</span>}
            {meta && <span className="text-xs text-brand-slate">{meta}</span>}
          </div>
          {badge}
        </div>
      )}
      {children}
    </div>
  );
}

function CheckIcon({ size = 12 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M5 12l5 5L20 7" />
    </svg>
  );
}

function StatusDot({ status }: { status: Status }) {
  return (
    <span
      className={cn(
        "flex size-5 flex-none items-center justify-center rounded-full border-2",
        status === "done" && "border-brand-teal bg-brand-teal text-white",
        status === "now" && "border-brand-orange bg-white",
        status === "todo" && "border-line bg-white",
        status === "none" && "border-brand-cyan bg-white",
      )}
    >
      {status === "done" && <CheckIcon size={10} />}
    </span>
  );
}

function LiveBadge() {
  return (
    <span className="flex items-center gap-1.5 rounded-full bg-surface-ice px-2.5 py-1 text-[11px] font-bold text-brand-teal">
      <span className="size-1.5 animate-pulse rounded-full bg-brand-teal" />
      AI
    </span>
  );
}

function ChatMockup({ title, meta, messages, chips }: Extract<MockupData, { type: "chat" }>) {
  return (
    <MockupCard title={title} meta={meta} badge={<LiveBadge />}>
      <Stagger className="flex flex-col gap-3" stagger={0.35}>
        {messages.map((m, i) => (
          <StaggerItem
            key={i}
            className={cn(
              "flex max-w-[88%] flex-col gap-1",
              m.side === "right" ? "items-end self-end" : "self-start",
            )}
          >
            <span
              className={cn(
                "text-[10.5px] font-bold tracking-[0.1em]",
                m.side === "right" ? "text-brand-teal" : "text-brand-slate",
              )}
            >
              {m.label}
            </span>
            <span
              className={cn(
                "px-3.5 py-2.5 text-sm leading-normal",
                m.side === "right"
                  ? "rounded-[14px_14px_4px_14px] bg-brand-cyan-soft text-ink"
                  : "rounded-[14px_14px_14px_4px] border border-line bg-surface text-brand-slate",
              )}
            >
              {m.text}
            </span>
          </StaggerItem>
        ))}
        {chips && (
          <StaggerItem className="mt-1 flex flex-wrap gap-2 border-t border-line pt-3">
            {chips.map((c) => (
              <span
                key={c.text}
                className={cn(
                  "rounded-full px-2.5 py-1 text-xs font-semibold",
                  c.tone === "good"
                    ? "bg-surface-ice text-brand-teal"
                    : "bg-brand-orange/10 text-brand-orange-deep",
                )}
              >
                {c.text}
              </span>
            ))}
          </StaggerItem>
        )}
      </Stagger>
    </MockupCard>
  );
}

function ChecklistMockup({ title, meta, progress, items }: Extract<MockupData, { type: "checklist" }>) {
  return (
    <MockupCard
      title={title}
      meta={meta}
      badge={progress !== undefined && <span className="text-sm font-bold text-brand-teal">{progress}%</span>}
    >
      {progress !== undefined && (
        <span className="mb-4 block h-1.5 overflow-hidden rounded-full bg-brand-cyan-soft">
          <AnimatedBar value={progress} className="bg-brand-teal" delay={0.3} />
        </span>
      )}
      <Stagger className="flex flex-col gap-1.5" stagger={0.1}>
        {items.map((item) => (
          <StaggerItem
            key={item.label}
            className={cn(
              "flex items-center gap-3 rounded-xl px-3 py-2.5",
              item.status === "now" && "bg-brand-orange/10",
            )}
          >
            <StatusDot status={item.status} />
            <span
              className={cn(
                "flex-1 text-sm",
                item.status === "now" ? "font-bold text-ink" : "font-medium",
                item.status === "todo" ? "text-brand-slate" : "text-ink",
              )}
            >
              {item.label}
            </span>
            <span
              className={cn(
                "text-xs font-semibold whitespace-nowrap",
                item.status === "now" ? "text-brand-orange-deep" : "text-brand-slate",
              )}
            >
              {item.meta}
            </span>
          </StaggerItem>
        ))}
      </Stagger>
    </MockupCard>
  );
}

function BarsMockup({ title, meta, items, note }: Extract<MockupData, { type: "bars" }>) {
  return (
    <MockupCard title={title} meta={meta}>
      <div className="flex flex-col gap-4">
        {items.map((item, i) => (
          <div key={item.label} className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between gap-3 text-sm">
              <span className="font-semibold text-ink">{item.label}</span>
              <span
                className={cn(
                  "text-[11px] font-bold tracking-[0.1em]",
                  item.tone === "strength" ? "text-brand-teal" : "text-brand-slate",
                )}
              >
                {item.tag}
              </span>
            </div>
            <span className="block h-2 overflow-hidden rounded-full bg-line">
              <AnimatedBar
                value={item.value}
                delay={0.2 + i * 0.15}
                className={item.tone === "strength" ? "bg-brand-teal" : "bg-brand-slate"}
              />
            </span>
          </div>
        ))}
      </div>
      {note && (
        <div className="mt-5 flex flex-col gap-1 rounded-xl bg-brand-orange/10 px-4 py-3">
          <span className="text-[11px] font-bold tracking-[0.12em] text-brand-orange-deep">{note.label}</span>
          <span className="text-sm leading-normal text-ink">{note.text}</span>
        </div>
      )}
    </MockupCard>
  );
}

const KU_SOURCES = ["Company knowledge", "Product knowledge", "Sales expertise", "Best practices"];
const KU_OUTPUTS = ["Learning", "Practice", "Coaching"];

function DownArrow() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="mx-auto text-brand-cyan"
      aria-hidden
    >
      <path d="M12 5v14M6 13l6 6 6-6" />
    </svg>
  );
}

// Alur vertikal Sources → Knowledge Universe → Powers, supaya lega di panel sempit maupun lebar.
function KnowledgeUniverseMockup({ center = "Curated, approved, company-specific" }: { center?: string }) {
  return (
    <MockupCard>
      <div className="flex flex-col gap-3">
        <span className="text-[11px] font-bold tracking-[0.14em] text-brand-slate">SOURCES</span>
        <Stagger className="grid grid-cols-2 gap-2" stagger={0.08}>
          {KU_SOURCES.map((s) => (
            <StaggerItem
              key={s}
              className="flex items-center gap-2.5 rounded-xl border border-line px-3 py-2.5 text-[13px] font-semibold text-ink"
            >
              <span className="size-2 flex-none rounded-xs bg-brand-slate" />
              {s}
            </StaggerItem>
          ))}
        </Stagger>

        <DownArrow />

        <Reveal
          delay={0.3}
          className="relative flex items-center justify-between gap-4 overflow-hidden rounded-card bg-brand-teal px-5 py-5 text-white"
        >
          <span className="absolute -top-12 -right-8 size-32 rounded-full border border-brand-cyan-soft/30" />
          <span className="absolute -right-2 -bottom-16 size-32 rounded-full border border-brand-cyan-soft/20" />
          <div className="relative flex flex-col gap-1">
            <span className="text-[11px] font-bold tracking-[0.14em] text-brand-cyan-soft">
              SHARED FOUNDATION
            </span>
            <span className="text-lg leading-tight font-extrabold">Knowledge Universe</span>
          </div>
          <span className="relative max-w-[150px] text-right text-xs leading-snug text-brand-cyan-soft">
            {center}
          </span>
        </Reveal>

        <DownArrow />

        <span className="text-[11px] font-bold tracking-[0.14em] text-brand-slate">POWERS</span>
        <Stagger className="grid grid-cols-3 gap-2" stagger={0.08} delay={0.5}>
          {KU_OUTPUTS.map((o) => (
            <StaggerItem
              key={o}
              className="rounded-xl bg-surface-ice px-3 py-2.5 text-center text-[13px] font-semibold text-brand-teal"
            >
              {o}
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </MockupCard>
  );
}

function GovernanceMockup({ title, items }: Extract<MockupData, { type: "governance" }>) {
  return (
    <MockupCard title={title} meta="Nothing is published without approval">
      <Stagger as="ol" className="flex flex-col" stagger={0.15}>
        {items.map((item, i) => (
          <StaggerItem as="li" key={item.label} className="flex gap-3.5">
            <div className="flex flex-col items-center">
              <span
                className={cn(
                  "flex size-7 flex-none items-center justify-center rounded-full border-[1.5px] text-xs font-bold",
                  item.status === "done" && "border-brand-slate bg-white text-brand-slate",
                  item.status === "now" && "border-brand-orange bg-brand-orange text-white",
                  item.status === "todo" && "border-brand-teal bg-brand-teal text-white",
                )}
              >
                {item.status === "todo" ? <CheckIcon /> : i + 1}
              </span>
              {i < items.length - 1 && <span className="min-h-4 w-[1.5px] flex-1 bg-line" />}
            </div>
            <div className="flex flex-1 items-start justify-between gap-3 pt-1 pb-5">
              <span
                className={cn("text-sm font-bold", item.status === "todo" ? "text-brand-teal" : "text-ink")}
              >
                {item.label}
              </span>
              <span
                className={cn(
                  "rounded-full px-2.5 py-0.5 text-xs font-semibold whitespace-nowrap",
                  item.status === "now"
                    ? "bg-brand-orange/10 text-brand-orange-deep"
                    : item.status === "todo"
                      ? "bg-surface-ice text-brand-teal"
                      : "bg-surface text-brand-slate",
                )}
              >
                {item.meta}
              </span>
            </div>
          </StaggerItem>
        ))}
      </Stagger>
    </MockupCard>
  );
}

function QuoteMockup({ role, parts, tags }: Extract<MockupData, { type: "quote" }>) {
  return (
    <MockupCard>
      <div className="flex items-center gap-3">
        <span className="flex size-11 items-center justify-center rounded-full bg-brand-slate text-sm font-bold text-white shadow-[0_0_0_3px_var(--color-white),0_0_0_5px_var(--color-brand-orange)]">
          TP
        </span>
        <div className="flex flex-col">
          <span className="text-[11px] font-bold tracking-[0.14em] text-brand-teal">TOP PERFORMER</span>
          <span className="text-sm font-semibold text-ink">{role}</span>
        </div>
      </div>
      <p className="mt-5 text-lg leading-relaxed text-ink">
        “
        {parts.map((p, i) =>
          p.highlight ? (
            <mark key={i} className="rounded bg-brand-cyan-soft px-1 text-ink">
              {p.text}
            </mark>
          ) : (
            <span key={i}>{p.text}</span>
          ),
        )}
        ”
      </p>
      <div className="mt-5 flex flex-wrap items-center gap-2 border-t border-line pt-4">
        <span className="text-[11px] font-bold tracking-[0.12em] text-brand-slate">EXTRACTED</span>
        {tags.map((t) => (
          <span key={t} className="rounded-md bg-surface-ice px-2 py-1 text-xs font-semibold text-brand-teal">
            {t}
          </span>
        ))}
      </div>
    </MockupCard>
  );
}

function StructureMockup({ title, status, fields }: Extract<MockupData, { type: "structure" }>) {
  return (
    <MockupCard
      title={title}
      badge={
        <span className="rounded-full bg-brand-orange/10 px-2.5 py-1 text-xs font-semibold text-brand-orange-deep">
          {status}
        </span>
      }
    >
      <Stagger className="flex flex-col divide-y divide-line rounded-xl border border-line" stagger={0.1}>
        {fields.map((f) => (
          <StaggerItem key={f.label} className="flex flex-col gap-1 px-4 py-3">
            <span className="text-[11px] font-bold tracking-[0.12em] text-brand-teal">{f.label}</span>
            <span className="text-sm leading-snug font-medium text-ink">{f.value}</span>
          </StaggerItem>
        ))}
      </Stagger>
    </MockupCard>
  );
}
