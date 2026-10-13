import Image from "next/image";
import { AnimatedBar, EASE_SMOOTH } from "@/components/motion/animated-bar";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { HexOutline } from "@/components/ui/wireframe";
import type { MockupData, Status } from "@/content/types";
import { cn } from "@/lib/cn";
import { ExpandableMedia } from "./expandable-media";
import { VideoMockup } from "./video-mockup";

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
    case "approval-queue":
      return <ApprovalQueueMockup {...data} />;
    case "team":
      return <TeamMockup {...data} />;
    case "quote":
      return <QuoteMockup {...data} />;
    case "persona-scene":
      return <PersonaSceneMockup {...data} />;
    case "structure":
      return <StructureMockup {...data} />;
    case "video":
      return <VideoMockup {...data} />;
    case "screenshot":
      return <ScreenshotMockup {...data} />;
    case "token-usage":
      return <TokenUsageMockup {...data} />;
  }
}

/**
 * Kartu "Where tokens go" seperti di platform: area, jumlah token tebal · persen, bar amber yang terisi pelan & halus
 * berurutan. Panjang bar = persentase area dari total (74% → bar terisi 74%).
 */
function TokenUsageMockup({ title, meta, items, action }: Extract<MockupData, { type: "token-usage" }>) {
  return (
    <div className="rounded-panel border border-line bg-white p-6 shadow-float sm:p-7">
      <p className="text-h3 text-brand-grey">{title}</p>
      <p className="mt-1 text-sm text-brand-charcoal">{meta}</p>
      <ul className="mt-5 flex flex-col gap-4">
        {items.map((item, i) => (
          <li key={item.label} className="flex flex-col gap-2">
            <div className="flex items-baseline justify-between gap-3">
              <span className="font-semibold text-brand-grey">{item.label}</span>
              <span className="whitespace-nowrap text-brand-charcoal">
                <strong className="font-bold text-brand-grey">{item.tokens}</strong> · {item.share}%
              </span>
            </div>
            <span className="block h-2.5 overflow-hidden rounded-full bg-brand-linen">
              <AnimatedBar
                value={item.share}
                delay={0.3 + i * 0.18}
                duration={1.6}
                ease={EASE_SMOOTH}
                className="bg-brand-amber"
              />
            </span>
          </li>
        ))}
      </ul>
      {action && (
        <span className="mt-6 inline-flex items-center gap-2 rounded-button border border-line px-4 py-2.5 text-sm font-semibold text-brand-grey">
          {action}
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <path d="M9 6l6 6-6 6" />
          </svg>
        </span>
      )}
    </div>
  );
}

/** Screenshot produk dalam bingkai yang sama dengan `VideoMockup`; bisa dibuka layar penuh. */
function ScreenshotMockup({ image, alt }: Extract<MockupData, { type: "screenshot" }>) {
  return (
    <ExpandableMedia
      label={alt}
      expanded={
        <Image
          src={image}
          alt={alt}
          sizes="100vw"
          className="h-auto max-h-full w-auto max-w-full rounded-card bg-white object-contain shadow-pop"
        />
      }
    >
      <div className="overflow-hidden rounded-card border border-line bg-white shadow-float">
        <Image
          src={image}
          alt={alt}
          className="block h-auto w-full"
          sizes="(min-width: 1024px) 700px, 100vw"
        />
      </div>
    </ExpandableMedia>
  );
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
            {title && <span className="truncate text-sm font-bold text-brand-grey">{title}</span>}
            {meta && <span className="text-xs text-brand-charcoal">{meta}</span>}
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
        status === "done" && "border-brand-amber bg-brand-amber text-brand-grey",
        status === "now" && "border-brand-orange bg-white",
        status === "todo" && "border-line bg-white",
        status === "none" && "border-brand-amber bg-white",
      )}
    >
      {status === "done" && <CheckIcon size={10} />}
    </span>
  );
}

function LiveBadge() {
  return (
    <span className="flex items-center gap-1.5 rounded-full bg-brand-linen px-2.5 py-1 text-[11px] font-bold text-brand-grey">
      <span className="size-1.5 animate-pulse rounded-full bg-brand-amber" />
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
                m.side === "right" ? "text-brand-grey" : "text-brand-charcoal",
              )}
            >
              {m.label}
            </span>
            <span
              className={cn(
                "px-3.5 py-2.5 text-sm leading-normal",
                m.side === "right"
                  ? "rounded-[14px_14px_4px_14px] bg-brand-linen text-brand-grey"
                  : "rounded-[14px_14px_14px_4px] border border-line bg-surface text-brand-charcoal",
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
                    ? "bg-brand-amber/25 text-brand-grey"
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
      badge={progress !== undefined && <span className="text-sm font-bold text-brand-grey">{progress}%</span>}
    >
      {progress !== undefined && (
        <span className="mb-4 block h-1.5 overflow-hidden rounded-full bg-brand-linen">
          <AnimatedBar value={progress} className="bg-brand-amber" delay={0.3} />
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
                item.status === "now" ? "font-bold text-brand-grey" : "font-medium",
                item.status === "todo" ? "text-brand-charcoal" : "text-brand-grey",
              )}
            >
              {item.label}
            </span>
            <span
              className={cn(
                "text-xs font-semibold whitespace-nowrap",
                item.status === "now" ? "text-brand-orange-deep" : "text-brand-charcoal",
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
              <span className="font-semibold text-brand-grey">{item.label}</span>
              <span
                className={cn(
                  "text-[11px] font-bold tracking-[0.1em]",
                  item.tone === "strength" ? "text-brand-grey" : "text-brand-charcoal",
                )}
              >
                {item.tag}
              </span>
            </div>
            <span className="block h-2 overflow-hidden rounded-full bg-line">
              <AnimatedBar
                value={item.value}
                delay={0.2 + i * 0.15}
                className={item.tone === "strength" ? "bg-brand-amber" : "bg-brand-grey"}
              />
            </span>
          </div>
        ))}
      </div>
      {note && (
        <div className="mt-5 flex flex-col gap-1 rounded-xl bg-brand-orange/10 px-4 py-3">
          <span className="text-[11px] font-bold tracking-[0.12em] text-brand-orange-deep">{note.label}</span>
          <span className="text-sm leading-normal text-brand-grey">{note.text}</span>
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
      className="mx-auto text-brand-charcoal/50"
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
        <span className="text-[11px] font-bold tracking-[0.14em] text-brand-charcoal">SOURCES</span>
        <Stagger className="grid grid-cols-2 gap-2" stagger={0.08}>
          {KU_SOURCES.map((s) => (
            <StaggerItem
              key={s}
              className="flex items-center gap-2.5 rounded-xl border border-line px-3 py-2.5 text-[13px] font-semibold text-brand-grey"
            >
              <span className="size-2 flex-none rounded-xs bg-brand-grey" />
              {s}
            </StaggerItem>
          ))}
        </Stagger>

        <DownArrow />

        <Reveal
          delay={0.3}
          className="relative flex items-center justify-between gap-4 overflow-hidden rounded-card bg-brand-amber px-5 py-5 text-brand-grey"
        >
          <span className="absolute -top-12 -right-8 size-32 rounded-full border border-brand-grey/15" />
          <span className="absolute -right-2 -bottom-16 size-32 rounded-full border border-brand-grey/15" />
          <div className="relative flex flex-col gap-1">
            <span className="text-[11px] font-bold tracking-[0.14em] text-brand-grey/70">
              SHARED FOUNDATION
            </span>
            <span className="text-lg leading-tight font-extrabold">Knowledge Universe</span>
          </div>
          <span className="relative max-w-[150px] text-right text-xs leading-snug text-brand-grey/70">
            {center}
          </span>
        </Reveal>

        <DownArrow />

        <span className="text-[11px] font-bold tracking-[0.14em] text-brand-charcoal">POWERS</span>
        <Stagger className="grid grid-cols-3 gap-2" stagger={0.08} delay={0.5}>
          {KU_OUTPUTS.map((o) => (
            <StaggerItem
              key={o}
              className="rounded-xl bg-brand-linen px-3 py-2.5 text-center text-[13px] font-semibold text-brand-grey"
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
                  item.status === "done" && "border-brand-grey bg-white text-brand-charcoal",
                  item.status === "now" && "border-brand-orange bg-brand-orange text-white",
                  item.status === "todo" && "border-brand-amber bg-brand-amber text-brand-grey",
                )}
              >
                {item.status === "todo" ? <CheckIcon /> : i + 1}
              </span>
              {i < items.length - 1 && <span className="min-h-4 w-[1.5px] flex-1 bg-line" />}
            </div>
            <div className="flex flex-1 items-start justify-between gap-3 pt-1 pb-5">
              <span className={cn("text-sm font-bold", "text-brand-grey")}>{item.label}</span>
              <span
                className={cn(
                  "rounded-full px-2.5 py-0.5 text-xs font-semibold whitespace-nowrap",
                  item.status === "now"
                    ? "bg-brand-orange/10 text-brand-orange-deep"
                    : item.status === "todo"
                      ? "bg-brand-amber/25 text-brand-grey"
                      : "bg-surface text-brand-charcoal",
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

// Antrean approval Content Manager (slide "Content Manager" di sales deck): item teratas sedang direview (oranye).
function ApprovalQueueMockup({
  title,
  badge,
  items,
  actions,
  note,
}: Extract<MockupData, { type: "approval-queue" }>) {
  return (
    <MockupCard
      title={title}
      badge={
        <span className="rounded-full bg-brand-orange/10 px-2.5 py-1 text-xs font-bold whitespace-nowrap text-brand-orange-deep">
          {badge}
        </span>
      }
    >
      <Stagger className="flex flex-col gap-2.5" stagger={0.12}>
        {items.map((item, i) => (
          <StaggerItem
            key={item.title}
            className={cn(
              "flex flex-col gap-2.5 rounded-xl border px-4 py-3.5",
              i === 0 ? "border-brand-orange/40 bg-brand-orange/5" : "border-line bg-white",
            )}
          >
            <div className="flex flex-col gap-1">
              <span className="w-fit rounded-full bg-surface px-2 py-0.5 text-[10.5px] font-bold tracking-[0.1em] text-brand-charcoal">
                {item.source}
              </span>
              <span className="text-sm font-bold text-brand-grey">{item.title}</span>
              <span className="text-xs text-brand-charcoal">{item.note}</span>
            </div>
            <div className="flex flex-wrap gap-2">
              <span
                className={cn(
                  "rounded-full px-3 py-1 text-xs font-semibold",
                  i === 0 ? "bg-brand-orange text-white" : "bg-surface text-brand-grey",
                )}
              >
                {actions[0]}
              </span>
              <span className="rounded-full border border-line px-3 py-1 text-xs font-semibold text-brand-charcoal">
                {actions[1]}
              </span>
            </div>
          </StaggerItem>
        ))}
        {note && (
          <StaggerItem className="flex flex-col gap-1 rounded-xl bg-brand-linen px-4 py-3">
            <span className="text-[11px] font-bold tracking-[0.12em] text-brand-grey/70">{note.label}</span>
            <span className="text-sm leading-normal text-brand-grey">{note.text}</span>
          </StaggerItem>
        )}
      </Stagger>
    </MockupCard>
  );
}

function initials(name: string) {
  return name
    .split(/\s+/)
    .map((w) => w[0])
    .join("")
    .replace(/[^A-Za-z]/g, "")
    .slice(0, 2)
    .toUpperCase();
}

// Team Dashboard (slide "Know where your team really stands"): rep yang butuh coaching disorot oranye.
function TeamMockup({ title, meta, items, note }: Extract<MockupData, { type: "team" }>) {
  return (
    <MockupCard title={title} meta={meta}>
      <Stagger className="flex flex-col gap-1.5" stagger={0.1}>
        {items.map((item) => (
          <StaggerItem
            key={item.name}
            className={cn(
              "flex items-center gap-3 rounded-xl px-3 py-2.5",
              item.tone === "alert" && "bg-brand-orange/10",
            )}
          >
            <span
              className={cn(
                "flex size-9 flex-none items-center justify-center rounded-full text-xs font-bold",
                item.tone === "alert" ? "bg-brand-orange text-white" : "bg-brand-grey text-white",
              )}
            >
              {initials(item.name)}
            </span>
            <div className="flex min-w-0 flex-1 flex-col">
              <span className="truncate text-sm font-bold text-brand-grey">{item.name}</span>
              <span className="truncate text-xs text-brand-charcoal">{item.meta}</span>
            </div>
            <div className="flex flex-col items-end gap-1">
              <span
                className={cn(
                  "rounded-full px-2 py-0.5 text-[10.5px] font-bold tracking-[0.08em] whitespace-nowrap",
                  item.tone === "good" && "bg-brand-amber/25 text-brand-grey",
                  item.tone === "steady" && "bg-surface text-brand-grey",
                  item.tone === "alert" && "bg-white text-brand-orange-deep",
                )}
              >
                {item.band}
              </span>
              <span
                className={cn(
                  "text-xs font-semibold whitespace-nowrap",
                  item.tone === "alert" ? "text-brand-orange-deep" : "text-brand-charcoal",
                )}
              >
                {item.trend}
              </span>
            </div>
          </StaggerItem>
        ))}
      </Stagger>
      {note && (
        <div className="mt-4 flex items-center gap-2.5 rounded-xl bg-brand-linen px-4 py-3 text-sm text-brand-grey">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="flex-none"
            aria-hidden
          >
            <rect x="5" y="11" width="14" height="10" rx="2" />
            <path d="M8 11V7a4 4 0 0 1 8 0v4" />
          </svg>
          {note}
        </div>
      )}
    </MockupCard>
  );
}

const POPUP_ICONS: Record<
  Extract<MockupData, { type: "persona-scene" }>["popups"][number]["icon"],
  React.ReactNode
> = {
  // Mikrofon: wawancara/roleplay suara
  mic: (
    <>
      <rect x="9" y="3" width="6" height="11" rx="3" />
      <path d="M5 11a7 7 0 0 0 14 0M12 18v3" />
    </>
  ),
  // Dokumen: draf artikel
  document: (
    <>
      <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
      <path d="M14 3v5h5M9 13h6M9 17h4" />
    </>
  ),
  // Jalur berkelok dengan titik awal & akhir: learning path
  path: (
    <>
      <circle cx="6" cy="19" r="2" />
      <circle cx="18" cy="5" r="2" />
      <path d="M8 19h8.5a3.5 3.5 0 0 0 0-7h-9a3.5 3.5 0 0 1 0-7H16" />
    </>
  ),
  // Lingkaran centang: tes lulus
  check: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M8 12.5l2.5 2.5L16 9.5" />
    </>
  ),
  // Grafik batang: scorecard
  chart: (
    <>
      <path d="M4 20h16" />
      <path d="M7 16v-4M12 16V7M17 16v-6" />
    </>
  ),
};

function PopupIcon({ icon }: { icon: keyof typeof POPUP_ICONS }) {
  return (
    <svg
      width="50%"
      height="50%"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {POPUP_ICONS[icon]}
    </svg>
  );
}

type PersonaScene = Extract<MockupData, { type: "persona-scene" }>;
type ScenePopupData = PersonaScene["popups"][number];

/**
 * Hero Capture (contoh desain 2026-10-13). Mulai `sm` komposisi ini satu kesatuan yang diskalakan dengan lebar wadah:
 * semua posisi, ukuran, dan teks memakai `cqw` (persen lebar wadah), diukur langsung dari contoh desain, jadi
 * proporsinya sama persis di semua lebar. Foto heksagon besar di kiri sebagai latar, kartu kutipan di kanan atas
 * menumpuk sisi kanan foto, pop-up "Extraction Studio" di bawah kartu, pop-up "Draft article ready" menumpuk bagian
 * bawah foto, heksagon isi oranye kecil di kiri dan heksagon garis oranye kecil di kanan bawah. Di mobile (< `sm`)
 * tampil versi bertumpuk. Pop-up berhenti melayang saat "reduce motion".
 */
function PersonaSceneMockup({ image, quote, popups }: PersonaScene) {
  const [first, second] = popups;
  return (
    <>
      {/* sm+: komposisi berskala (angka = cqw / % dari lebar wadah, diukur dari contoh desain) */}
      <div className="@container relative hidden sm:block" style={{ paddingTop: "70%" }}>
        <div className="pointer-events-none absolute" style={{ left: 0, top: "50.8cqw", width: "6.6%" }}>
          <HexOutline
            strokeWidth={0}
            className="block h-auto w-full rotate-90 fill-brand-orange text-brand-orange opacity-30"
          />
        </div>
        <div
          className="pointer-events-none absolute"
          style={{ left: "83.2%", top: "54.2cqw", width: "8.8%" }}
        >
          <HexOutline
            strokeWidth={2.6}
            className="block h-auto w-full rotate-90 text-brand-orange opacity-80"
          />
        </div>

        <div className="absolute" style={{ left: "4.1%", top: 0, width: "50.4%" }}>
          <Reveal>
            <Image src={image} alt="" sizes="360px" className="block h-auto w-full drop-shadow-xl" />
          </Reveal>
        </div>

        <div className="absolute z-2" style={{ left: "44.5%", top: "2.5cqw", width: "55%" }}>
          <Reveal delay={0.15}>
            <SceneQuote {...quote} fluid />
          </Reveal>
        </div>

        {first && (
          <div className="absolute z-3" style={{ left: "56.8%", top: "37.4cqw" }}>
            <Reveal delay={0.35}>
              <ScenePopup popup={first} duration="8s" delay="0s" fluid />
            </Reveal>
          </div>
        )}
        {second && (
          <div className="absolute z-3" style={{ left: "13.2%", top: "56.6cqw" }}>
            <Reveal delay={0.5}>
              <ScenePopup popup={second} duration="9.5s" delay="-3s" fluid />
            </Reveal>
          </div>
        )}
      </div>

      {/* Mobile: foto, kartu, lalu pop-up bertumpuk */}
      <div className="@container relative sm:hidden">
        <div className="pointer-events-none absolute" style={{ right: "6%", top: "10cqw", width: "16%" }}>
          <HexOutline
            strokeWidth={2.6}
            className="block h-auto w-full rotate-90 text-brand-orange opacity-80"
          />
        </div>
        <Reveal className="w-[64%]">
          <Image src={image} alt="" sizes="260px" className="block h-auto w-full drop-shadow-xl" />
        </Reveal>
        <Reveal delay={0.15} className="relative z-2 -mt-[10cqw] ml-auto w-[88%]">
          <SceneQuote {...quote} />
        </Reveal>
        <div className="mt-4 flex flex-col items-end gap-3">
          {first && (
            <Reveal delay={0.35} className="w-[66%]">
              <ScenePopup popup={first} duration="8s" delay="0s" />
            </Reveal>
          )}
          {second && (
            <Reveal delay={0.5} className="w-[76%] self-start">
              <ScenePopup popup={second} duration="9.5s" delay="-3s" />
            </Reveal>
          )}
        </div>
      </div>
    </>
  );
}

/** `fluid`: ukuran ikut lebar wadah (`cqw`, komposisi sm+); tanpa itu ukuran tetap dalam px (mobile). */
const sizer = (fluid?: boolean) => (px: number, cqw: number) => (fluid ? `${cqw}cqw` : `${px}px`);

/** Pop-up produk di `persona-scene`. Ukuran dalam `cqw` mengikuti contoh desain (tinggi ±12% lebar wadah). */
function ScenePopup({
  popup,
  duration,
  delay,
  fluid,
}: {
  popup: ScenePopupData;
  duration: string;
  delay: string;
  fluid?: boolean;
}) {
  const size = sizer(fluid);
  return (
    <div
      className="flex w-max items-center border border-line/80 bg-white/95 shadow-pop backdrop-blur-sm motion-safe:animate-float-soft"
      style={{
        animationDuration: duration,
        animationDelay: delay,
        gap: `${size(10, 2)}`,
        padding: `${size(8, 1.8)} ${size(14, 2.9)} ${size(8, 1.8)} ${size(8, 1.8)}`,
        borderRadius: `${size(12, 2.2)}`,
      }}
    >
      <span
        className="flex flex-none items-center justify-center bg-brand-orange text-white"
        style={{ width: `${size(32, 6.7)}`, height: `${size(32, 6.7)}`, borderRadius: `${size(8, 1.6)}` }}
      >
        <PopupIcon icon={popup.icon} />
      </span>
      <span className="flex flex-col">
        <span
          className="flex items-center gap-1.5 font-bold text-brand-grey"
          style={{ fontSize: `${size(13, 2.35)}` }}
        >
          {popup.label}
          {popup.live && <span className="size-1.5 animate-pulse rounded-full bg-brand-amber" />}
        </span>
        <span className="leading-snug text-brand-charcoal" style={{ fontSize: `${size(11.5, 2.05)}` }}>
          {popup.text}
        </span>
      </span>
    </div>
  );
}

/** Kartu kutipan top performer di `persona-scene`. Ukuran dalam `cqw` mengikuti contoh desain. */
function SceneQuote({
  badge,
  kicker,
  role,
  parts,
  quoted,
  footerLabel,
  tags,
  fluid,
}: PersonaScene["quote"] & { fluid?: boolean }) {
  const size = sizer(fluid);
  return (
    <div
      className="border border-line bg-white shadow-float"
      style={{ padding: `${size(16, 3.2)}`, borderRadius: `${size(16, 3)}` }}
    >
      <div className="flex items-center" style={{ gap: `${size(10, 1.8)}` }}>
        <span
          className="flex flex-none items-center justify-center rounded-full bg-brand-grey font-bold text-white shadow-[0_0_0_2px_var(--color-white),0_0_0_3.5px_var(--color-brand-orange)]"
          style={{ width: `${size(32, 6.4)}`, height: `${size(32, 6.4)}`, fontSize: `${size(11, 1.9)}` }}
        >
          {badge}
        </span>
        <div className="flex min-w-0 flex-col">
          <span
            className="font-bold tracking-[0.14em] text-brand-orange"
            style={{ fontSize: `${size(10, 1.85)}` }}
          >
            {kicker}
          </span>
          <span
            className="leading-snug font-semibold text-brand-grey"
            style={{ fontSize: `${size(12, 2.25)}` }}
          >
            {role}
          </span>
        </div>
      </div>
      <p
        className="leading-relaxed text-brand-grey"
        style={{ marginTop: `${size(10, 2.2)}`, fontSize: `${size(14, 2.6)}` }}
      >
        {quoted && "“"}
        {parts.map((p, i) =>
          p.highlight ? (
            <mark key={i} className="rounded bg-brand-linen px-0.5 text-brand-grey">
              {p.text}
            </mark>
          ) : (
            <span key={i}>{p.text}</span>
          ),
        )}
        {quoted && "”"}
      </p>
      <div
        className="flex flex-wrap items-center border-t border-line"
        style={{ marginTop: `${size(10, 2)}`, paddingTop: `${size(10, 2)}`, gap: `${size(6, 1.4)}` }}
      >
        <span
          className="font-bold tracking-[0.12em] text-brand-charcoal"
          style={{ fontSize: `${size(10, 1.8)}` }}
        >
          {footerLabel}
        </span>
        {tags.map((t) => (
          <span
            key={t}
            className="rounded-md bg-brand-linen font-semibold text-brand-grey"
            style={{ fontSize: `${size(11, 2.05)}`, padding: `${size(2, 0.6)} ${size(6, 1.3)}` }}
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

function QuoteMockup({ role, parts, tags }: Extract<MockupData, { type: "quote" }>) {
  return (
    <MockupCard>
      <div className="flex items-center gap-3">
        <span className="flex size-11 items-center justify-center rounded-full bg-brand-grey text-sm font-bold text-white shadow-[0_0_0_3px_var(--color-white),0_0_0_5px_var(--color-brand-orange)]">
          TP
        </span>
        <div className="flex flex-col">
          <span className="text-[11px] font-bold tracking-[0.14em] text-brand-orange">TOP PERFORMER</span>
          <span className="text-sm font-semibold text-brand-grey">{role}</span>
        </div>
      </div>
      <p className="mt-5 text-lg leading-relaxed text-brand-grey">
        “
        {parts.map((p, i) =>
          p.highlight ? (
            <mark key={i} className="rounded bg-brand-linen px-1 text-brand-grey">
              {p.text}
            </mark>
          ) : (
            <span key={i}>{p.text}</span>
          ),
        )}
        ”
      </p>
      <div className="mt-5 flex flex-wrap items-center gap-2 border-t border-line pt-4">
        <span className="text-[11px] font-bold tracking-[0.12em] text-brand-charcoal">EXTRACTED</span>
        {tags.map((t) => (
          <span key={t} className="rounded-md bg-brand-linen px-2 py-1 text-xs font-semibold text-brand-grey">
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
            <span className="text-[11px] font-bold tracking-[0.12em] text-brand-charcoal">{f.label}</span>
            <span className="text-sm leading-snug font-medium text-brand-grey">{f.value}</span>
          </StaggerItem>
        ))}
      </Stagger>
    </MockupCard>
  );
}
