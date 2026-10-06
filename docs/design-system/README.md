# Repskill Design System

Aturan visual & penulisan untuk website Repskill. **Setiap halaman/komponen baru wajib mengikuti dokumen ini.**
Sumber utama: [`docs/brand/repskill-brand-guidelines.pdf`](../brand/repskill-brand-guidelines.pdf). Kalau dokumen ini dan brand
guideline bertentangan, brand guideline yang menang. Perbarui dokumen ini.

| File                                             | Isi                                                  |
| ------------------------------------------------ | ---------------------------------------------------- |
| [01-brand-foundation.md](01-brand-foundation.md) | Esensi brand, personality, alur produk, voice & tone |
| [02-logo.md](02-logo.md)                         | Varian logo, ukuran minimum, clear space, larangan   |
| [03-color.md](03-color.md)                       | Palet, token, proporsi, kombinasi, transparansi      |
| [04-typography.md](04-typography.md)             | Font, skala heading/body, aturan penulisan           |
| [05-layout.md](05-layout.md)                     | Container, spacing section, grid, radius, shadow     |
| [06-components.md](06-components.md)             | Button, eyebrow, kartu, chip, pola section, CTA      |
| [07-motion.md](07-motion.md)                     | Prinsip animasi, durasi, easing, komponen animasi    |
| [08-imagery.md](08-imagery.md)                   | Ikon, ilustrasi mockup UI, motif garis miring        |

## Golden rules (ringkas)

1. **Kanvas netral, oranye untuk aksi.** Background dominan putih/abu muda/Shadow Grey. Oranye hanya untuk CTA, highlight satu kata,
   dan state "sekarang/next". Jangan pernah jadikan oranye background satu halaman penuh.
2. **Amber Gold + Soft Linen = AI & progres.** Amber untuk isian (progress bar, ikon centang, kartu AI), Linen untuk
   latar lembut. Amber tidak dipakai sebagai warna teks di latar terang.
3. **Satu font: Plus Jakarta Sans.** Hierarki dibangun dari ukuran dan ketebalan, bukan dari font lain.
4. **Satu ide per section.** Struktur standar: eyebrow, judul, paragraf pembuka, lalu konten/visual.
5. **Pakai token, bukan nilai mentah.** `bg-brand-orange`, `text-h2`, `rounded-card`, `shadow-float`. Jangan pakai `#FF6D00`,
   `text-[36px]`, dan sejenisnya di komponen. Token ada di [`src/app/globals.css`](../../src/app/globals.css).
6. **Animasi halus dan bermakna.** Fade + naik saat masuk layar, berurutan untuk list. Tanpa efek berlebihan. Harus tetap
   rapi saat "reduce motion" aktif.
7. **Teks: jelas, percaya diri, membimbing.** Kalimat aktif dan pendek. Bahasa Inggris untuk copy website.
8. **Logo tidak boleh dimodifikasi.** Pakai file dari `src/assets/brand/`.

## Menambah token baru

1. Tambahkan di blok `@theme` pada [`src/app/globals.css`](../../src/app/globals.css).
2. Untuk token ukuran teks, radius, shadow, atau easing: daftarkan juga namanya di [`src/lib/cn.ts`](../../src/lib/cn.ts).
   Kalau tidak, `cn()` bisa diam-diam membuang class tersebut.
3. Dokumentasikan di file yang relevan di folder ini.

## Cara memakai saat membuat prompt

Cukup tulis "ikuti design system". Claude membaca `CLAUDE.md`, yang menunjuk ke folder ini. Untuk hasil terbaik, sebutkan:

- halaman/section apa yang dibuat,
- isi teksnya (atau minta Claude mengambil dari `docs/legacy/`),
- referensi pola section yang mirip (lihat [06-components.md](06-components.md#pola-section)).
