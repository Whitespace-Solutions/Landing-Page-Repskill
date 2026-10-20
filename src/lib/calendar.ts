/** Tautan & file kalender untuk jadwal demo (tanpa backend): Google Calendar "template" dan file .ics. */

export type CalendarEvent = {
  title: string;
  start: Date;
  durationMinutes: number;
  details: string;
  /** Email tamu; Google Calendar mengirim undangan ke mereka saat acara disimpan */
  guests?: string[];
};

/** Format UTC dasar untuk kalender, mis. "20261022T030000Z". */
const stamp = (date: Date) =>
  date
    .toISOString()
    .replace(/[-:]/g, "")
    .replace(/\.\d{3}/, "");

const end = (e: CalendarEvent) => new Date(e.start.getTime() + e.durationMinutes * 60_000);

/** URL Google Calendar yang membuka acara terisi (judul, waktu, detail, tamu); pengguna tinggal klik Save. */
export function googleCalendarUrl(e: CalendarEvent) {
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: e.title,
    dates: `${stamp(e.start)}/${stamp(end(e))}`,
    details: e.details,
  });
  if (e.guests?.length) params.set("add", e.guests.join(","));
  return `https://calendar.google.com/calendar/render?${params}`;
}

/** Isi file .ics (Outlook, Apple Calendar, dll.). */
export function icsFile(e: CalendarEvent) {
  const escape = (s: string) => s.replace(/[\\;,]/g, (c) => `\\${c}`).replace(/\n/g, "\\n");
  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Repskill//Book Demo//EN",
    "BEGIN:VEVENT",
    `UID:${stamp(e.start)}-${Math.random().toString(36).slice(2)}@repskill.ai`,
    `DTSTAMP:${stamp(new Date())}`,
    `DTSTART:${stamp(e.start)}`,
    `DTEND:${stamp(end(e))}`,
    `SUMMARY:${escape(e.title)}`,
    `DESCRIPTION:${escape(e.details)}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
}

/** Unduh file .ics di browser. */
export function downloadIcs(e: CalendarEvent, filename = "repskill-demo.ics") {
  const url = URL.createObjectURL(new Blob([icsFile(e)], { type: "text/calendar;charset=utf-8" }));
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
