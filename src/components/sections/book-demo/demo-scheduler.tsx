"use client";

import { useMemo, useState } from "react";
import { FormError } from "@/components/ui/form-field";
import { bookDemoPage, demoSchedule } from "@/content/book-demo";
import { cn } from "@/lib/cn";
import { dateKey, generateSlots, gmtOffset, groupByDate, visitorTimeZone } from "@/lib/demo-slots";

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const pad = (n: number) => String(n).padStart(2, "0");
const monthIndex = (key: string) => Number(key.slice(0, 4)) * 12 + Number(key.slice(5, 7)) - 1;

/** Label jadwal lengkap, mis. "Tue, Oct 21, 10:00 AM (Asia/Jakarta)". */
export function formatSlot(slot: Date, timeZone: string, hour12 = true) {
  const text = new Intl.DateTimeFormat("en-US", {
    timeZone,
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12,
  }).format(slot);
  return `${text} (${timeZone})`;
}

/**
 * Langkah 3 Book Demo: kalender bulanan + daftar jam di zona waktu pengunjung, lalu konfirmasi. Slot dihitung dari jam
 * kerja di `demoSchedule` (bukan ketersediaan kalender sungguhan).
 */
export function DemoScheduler({
  onConfirm,
  onSkip,
}: {
  onConfirm: (slot: Date, timeZone: string) => Promise<boolean>;
  onSkip: () => void;
}) {
  const { meeting, form } = bookDemoPage;
  const slots = useMemo(() => generateSlots(demoSchedule), []);
  const [timeZone, setTimeZone] = useState(() => visitorTimeZone(demoSchedule.hostTimeZone));
  const [hour12, setHour12] = useState(false);
  const [slot, setSlot] = useState<Date | null>(null);
  const [state, setState] = useState<"idle" | "sending" | "error">("idle");

  const byDate = useMemo(() => groupByDate(slots, timeZone), [slots, timeZone]);
  const keys = [...byDate.keys()];
  const [selectedKey, setSelectedKey] = useState(() => keys[0] ?? "");
  const activeKey = byDate.has(selectedKey) ? selectedKey : (keys[0] ?? "");
  const [month, setMonth] = useState(() => monthIndex(activeKey || dateKey(new Date(), timeZone)));

  const minMonth = keys.length ? monthIndex(keys[0]) : month;
  const maxMonth = keys.length ? monthIndex(keys[keys.length - 1]) : month;
  const year = Math.floor(month / 12);
  const m = month % 12;
  const leading = new Date(Date.UTC(year, m, 1)).getUTCDay();
  const daysInMonth = new Date(Date.UTC(year, m + 1, 0)).getUTCDate();
  const todayKey = dateKey(new Date(), timeZone);

  const zones = [...new Set([visitorTimeZone(demoSchedule.hostTimeZone), ...demoSchedule.timeZones])];
  const timeFormat = new Intl.DateTimeFormat("en-US", {
    timeZone,
    hour: "numeric",
    minute: "2-digit",
    hour12,
  });
  const dayLabel = (key: string) =>
    new Intl.DateTimeFormat("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      timeZone: "UTC",
    }).format(new Date(`${key}T12:00:00Z`));

  function changeZone(zone: string) {
    setTimeZone(zone);
    // Pertahankan jam yang dipilih; tanggalnya bisa bergeser di zona baru
    if (slot) setSelectedKey(dateKey(slot, zone));
  }

  function pickDay(key: string) {
    setSelectedKey(key);
    setSlot(null);
  }

  async function confirm() {
    if (!slot) return;
    setState("sending");
    const ok = await onConfirm(slot, timeZone);
    if (!ok) setState("error");
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-3 rounded-card bg-surface p-5">
        <p className="font-bold text-brand-grey">{meeting.title}</p>
        <p className="text-sm text-brand-charcoal">{meeting.description}</p>
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-brand-grey">
          <span className="flex items-center gap-2">
            <Icon path="M12 7v5l3 2M12 21a9 9 0 100-18 9 9 0 000 18z" />
            {meeting.durationLabel}
          </span>
          <label className="flex items-center gap-2">
            <Icon path="M12 21a9 9 0 100-18 9 9 0 000 18zM3 12h18M12 3c2.5 2.7 3.8 5.7 3.8 9s-1.3 6.3-3.8 9c-2.5-2.7-3.8-5.7-3.8-9S9.5 5.7 12 3z" />
            <span className="sr-only">Time zone</span>
            <select
              value={timeZone}
              onChange={(e) => changeZone(e.target.value)}
              className="max-w-56 cursor-pointer rounded-md bg-transparent py-0.5 font-semibold outline-none focus-visible:ring-2 focus-visible:ring-brand-amber/40"
            >
              {zones.map((zone) => (
                <option key={zone} value={zone}>
                  {zone.replace(/_/g, " ")} ({gmtOffset(zone)})
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-[minmax(0,1fr)_minmax(0,11rem)]">
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-brand-grey" aria-live="polite">
              {new Intl.DateTimeFormat("en-US", { month: "long", year: "numeric", timeZone: "UTC" }).format(
                new Date(Date.UTC(year, m, 1)),
              )}
            </span>
            <div className="flex gap-2">
              <NavButton
                label="Previous month"
                disabled={month <= minMonth}
                onClick={() => setMonth(month - 1)}
              >
                <path d="M15 6l-6 6 6 6" />
              </NavButton>
              <NavButton label="Next month" disabled={month >= maxMonth} onClick={() => setMonth(month + 1)}>
                <path d="M9 6l6 6-6 6" />
              </NavButton>
            </div>
          </div>
          <div className="grid grid-cols-7 gap-1 text-center">
            {WEEKDAYS.map((d) => (
              <span key={d} className="py-1 text-xs font-semibold text-brand-charcoal">
                {d}
              </span>
            ))}
            {Array.from({ length: leading }, (_, i) => (
              <span key={`blank-${i}`} />
            ))}
            {Array.from({ length: daysInMonth }, (_, i) => {
              const key = `${year}-${pad(m + 1)}-${pad(i + 1)}`;
              const available = byDate.has(key);
              const active = key === activeKey;
              return (
                <button
                  key={key}
                  type="button"
                  disabled={!available}
                  aria-pressed={active}
                  aria-label={dayLabel(key)}
                  onClick={() => pickDay(key)}
                  className={cn(
                    "mx-auto flex size-10 items-center justify-center rounded-full text-sm transition-colors",
                    active
                      ? "bg-brand-grey font-semibold text-white"
                      : available
                        ? "bg-brand-linen font-semibold text-brand-grey hover:bg-brand-amber/40"
                        : "text-brand-charcoal/40",
                    key === todayKey && !active && "ring-1 ring-brand-grey/30",
                  )}
                >
                  {i + 1}
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between gap-2">
            <span className="text-sm font-semibold text-brand-grey">{meeting.selectTime}</span>
            <div className="flex rounded-md border border-line p-0.5 text-xs font-semibold">
              {[true, false].map((h12) => (
                <button
                  key={String(h12)}
                  type="button"
                  aria-pressed={hour12 === h12}
                  onClick={() => setHour12(h12)}
                  className={cn(
                    "rounded px-2 py-1 transition-colors",
                    hour12 === h12 ? "bg-brand-grey text-white" : "text-brand-charcoal hover:text-brand-grey",
                  )}
                >
                  {h12 ? "12h" : "24h"}
                </button>
              ))}
            </div>
          </div>
          {activeKey && <span className="text-caption text-brand-charcoal">{dayLabel(activeKey)}</span>}
          <div className="flex max-h-80 flex-col gap-2 overflow-y-auto pr-1">
            {(byDate.get(activeKey) ?? []).map((s) => {
              const active = slot?.getTime() === s.getTime();
              return (
                <button
                  key={s.getTime()}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setSlot(s)}
                  className={cn(
                    "flex-none rounded-button border px-4 py-2.5 text-sm font-semibold transition-colors",
                    active
                      ? "border-brand-grey bg-brand-grey text-white"
                      : "border-line bg-white text-brand-grey hover:border-brand-grey",
                  )}
                >
                  {timeFormat.format(s)}
                </button>
              );
            })}
            {!byDate.get(activeKey)?.length && (
              <p className="text-sm text-brand-charcoal">{meeting.noSlots}</p>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3 border-t border-line pt-5">
        {slot && (
          <p className="text-sm font-semibold text-brand-grey">{formatSlot(slot, timeZone, hour12)}</p>
        )}
        {state === "error" && <FormError>{form.error}</FormError>}
        <button
          type="button"
          disabled={!slot || state === "sending"}
          onClick={confirm}
          className="inline-flex items-center justify-center gap-2 rounded-button bg-brand-orange px-6 py-4 text-base font-semibold text-white transition-colors hover:bg-brand-orange-hover disabled:opacity-50"
        >
          {state === "sending" ? form.sending : meeting.confirm}
        </button>
        <button
          type="button"
          onClick={onSkip}
          className="self-center text-sm font-semibold text-brand-charcoal underline-offset-4 hover:text-brand-grey hover:underline"
        >
          {meeting.skip}
        </button>
      </div>
    </div>
  );
}

function NavButton({
  label,
  disabled,
  onClick,
  children,
}: {
  label: string;
  disabled: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className="flex size-8 items-center justify-center rounded-full border border-line text-brand-grey transition-colors hover:border-brand-grey disabled:opacity-40 disabled:hover:border-line"
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        {children}
      </svg>
    </button>
  );
}

function Icon({ path }: { path: string }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="flex-none text-brand-charcoal"
      aria-hidden
    >
      <path d={path} />
    </svg>
  );
}
