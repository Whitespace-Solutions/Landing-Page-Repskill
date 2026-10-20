/** Hitung slot jadwal demo dari jam kerja host, lalu kelompokkan per tanggal di zona waktu pengunjung. */

export type SlotConfig = {
  hostUtcOffset: number;
  weekdays: number[];
  hours: [number, number][];
  durationMinutes: number;
  minNoticeHours: number;
  windowDays: number;
};

/** Semua waktu mulai slot (instan UTC) dari sekarang sampai `windowDays` ke depan. */
export function generateSlots(c: SlotConfig, now = new Date()): Date[] {
  const slots: Date[] = [];
  const earliest = now.getTime() + c.minNoticeHours * 3_600_000;
  // "Hari ini" menurut jam host: geser ke offset host lalu baca dengan getter UTC
  const hostNow = new Date(now.getTime() + c.hostUtcOffset * 3_600_000);

  for (let d = 0; d <= c.windowDays; d++) {
    const day = Date.UTC(hostNow.getUTCFullYear(), hostNow.getUTCMonth(), hostNow.getUTCDate() + d);
    if (!c.weekdays.includes(new Date(day).getUTCDay())) continue;
    for (const [start, end] of c.hours) {
      for (let m = start * 60; m + c.durationMinutes <= end * 60; m += c.durationMinutes) {
        const t = day + (m - c.hostUtcOffset * 60) * 60_000;
        if (t >= earliest) slots.push(new Date(t));
      }
    }
  }
  return slots;
}

/** Kunci tanggal "YYYY-MM-DD" untuk sebuah instan di zona waktu tertentu. */
export function dateKey(date: Date, timeZone: string) {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
}

/** Kelompokkan slot per tanggal lokal (urutan tetap kronologis). */
export function groupByDate(slots: Date[], timeZone: string) {
  const map = new Map<string, Date[]>();
  for (const slot of slots) {
    const key = dateKey(slot, timeZone);
    map.set(key, [...(map.get(key) ?? []), slot]);
  }
  return map;
}

/** Label offset, mis. "GMT+7". */
export function gmtOffset(timeZone: string, date = new Date()) {
  const part = new Intl.DateTimeFormat("en-US", { timeZone, timeZoneName: "shortOffset" })
    .formatToParts(date)
    .find((p) => p.type === "timeZoneName");
  return part?.value ?? "";
}

/** Zona waktu browser, dengan cadangan bila tidak terbaca. */
export function visitorTimeZone(fallback: string) {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone || fallback;
  } catch {
    return fallback;
  }
}
