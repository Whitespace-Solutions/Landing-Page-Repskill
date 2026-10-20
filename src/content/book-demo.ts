/** Konten halaman Book Demo. Formulir 3 langkah (data diri → tim → pilih jadwal) adalah fokus visual utama halaman. */

export const bookDemoPage = {
  eyebrow: "Book Demo",
  /** `\n` = patah baris di HP saja (dua baris); mulai `sm` jadi spasi biasa */
  title: "Let's Talk About Your\nSales Capability",
  lead: "Share a few details about your team, then pick a time that works for you. It takes less than a minute.",
  expectations: [
    "A conversation about your sales team and goals",
    "A walkthrough of Capture Knowledge, Learn Knowledge, and Practice",
    "A recommended approach for your organization",
  ],
  form: {
    steps: ["Your details", "Your team", "Pick a time"],
    contact: { title: "Tell us about you", next: "Next" },
    team: {
      title: "About your team",
      businessModel: {
        label: "Business model",
        options: ["B2B", "B2C", "Both B2B and B2C"],
      },
      reps: {
        label: "Number of sales reps",
        options: ["1–10", "11–30", "31–100", "101–500", "500+"],
      },
      source: { label: "How did you hear about us?" },
      back: "Back",
      submit: "Get a Demo",
    },
    sending: "Sending…",
    consent: "By submitting, you agree to be contacted by Repskill about your request.",
    error: "Something went wrong. Please try again in a moment.",
    /** Setelah langkah 2 data lead sudah terkirim; ini hanya bila pengunjung tidak memilih jadwal. */
    requested: {
      title: "Thank you. Your request has been received.",
      body: "Our team will be in touch soon to arrange your demo.",
    },
    booked: {
      title: "You're booked in.",
      body: (when: string, email: string) =>
        `${when}. Our team will send a calendar invite to ${email} shortly.`,
    },
  },
  meeting: {
    title: "Repskill · 30 min Intro Call",
    description: "A short call to understand your sales team and show how Repskill can help.",
    durationLabel: "30 mins",
    selectDate: "Select a date",
    selectTime: "Select a time",
    noSlots: "No times left on this day. Please pick another date.",
    confirm: "Confirm Booking",
    skip: "Skip for now, contact me by email",
    addToGoogle: "Add to Google Calendar",
    /** Label tombol setelah diklik */
    addedToGoogle: "Added to Calendar",
    icsHint: "Using Outlook or Apple Calendar?",
    downloadIcs: "Download the invite",
    /** Detail acara di kalender pengunjung */
    calendarDetails: "Intro call with the Repskill team. We will send the meeting link by email.",
  },
};

/**
 * Jam kerja tim sales untuk jadwal demo (zona host, dipakai `generateSlots()`). Slot ditampilkan di zona waktu pengunjung.
 * Ini bukan ketersediaan kalender sungguhan: tim mengonfirmasi lewat undangan kalender.
 */
export const demoSchedule = {
  hostTimeZone: "Asia/Jakarta",
  /** Offset UTC zona host dalam jam (WIB = +7, tanpa daylight saving) */
  hostUtcOffset: 7,
  /** 0 = Minggu … 6 = Sabtu */
  weekdays: [1, 2, 3, 4, 5],
  /** Rentang jam [mulai, selesai) di zona host; jeda makan siang 12–13 */
  hours: [
    [9, 12],
    [13, 17],
  ] as [number, number][],
  durationMinutes: 30,
  /** Slot paling cepat sekian jam dari sekarang */
  minNoticeHours: 16,
  /** Berapa hari ke depan yang bisa dipilih */
  windowDays: 30,
  /** Pilihan zona waktu (zona pengunjung otomatis ditambahkan di paling atas) */
  timeZones: [
    "Asia/Jakarta",
    "Asia/Makassar",
    "Asia/Jayapura",
    "Asia/Singapore",
    "Asia/Kuala_Lumpur",
    "Asia/Bangkok",
    "Asia/Manila",
    "Asia/Tokyo",
    "Australia/Sydney",
    "Europe/London",
    "America/New_York",
  ],
};
