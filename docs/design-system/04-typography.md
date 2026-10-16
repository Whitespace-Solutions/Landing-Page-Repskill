# 04 · Typography

**Typeface: Plus Jakarta Sans** (Regular 400 · Medium 500 · SemiBold 600 · Bold 700 · ExtraBold 800).
Dimuat lewat `next/font` di [`src/app/layout.tsx`](../../src/app/layout.tsx). Jangan menambah font lain.

## Skala

Setiap token sudah membawa ukuran responsif, line-height, letter-spacing, dan weight. Cukup satu class.

| Token                 | Ukuran        | Weight | Dipakai untuk                                                                        | Contoh                          |
| --------------------- | ------------- | ------ | ------------------------------------------------------------------------------------ | ------------------------------- |
| `text-display`        | 42–64px       | 800    | H1 hero (1× per halaman)                                                             | Make Sales Expertise Scalable   |
| `text-display-mobile` | 30px          | 800    | H1 hero di HP (di bawah `sm`) bila judul harus pas dua baris, lalu `sm:text-display` | Make Sales / Expertise Scalable |
| `text-h1`             | 36–48px       | 800    | Judul besar section utama / CTA                                                      | From Expertise to Capability.   |
| `text-h2`             | 28–36px       | 700    | Judul section standar                                                                | Learn. Practice. Reflect.       |
| `text-h3`             | 20–24px       | 700    | Judul kartu / sub-section                                                            | Scenario Studio                 |
| `text-lead`           | 18–20px       | 400    | Paragraf pembuka di bawah judul                                                      |                                 |
| `text-base`           | 16px          | 400    | Body umum                                                                            |                                 |
| `text-caption`        | 13px          | 400    | Catatan, meta, legal                                                                 | Last updated · 01 Oct 2026      |
| `text-eyebrow`        | 13px, +0.14em | 700    | Label UPPERCASE di atas judul (komponen `Eyebrow`)                                   | HOW REPSKILL WORKS              |

Tombol memakai 15–16px semibold (sudah diatur di komponen `ButtonLink`).

## Aturan

- **Satu titik masuk per section.** Hierarki harus terlihat sebelum kata-katanya dibaca.
- Hanya **satu** `text-display` per halaman, yaitu `<h1>` di hero.
- Urutan semantik heading harus benar (`h1` → `h2` → `h3`). Ukuran visual boleh beda dari level tag.
- **Judul tanpa titik di akhir** (semua heading, termasuk hero dan CTA). `highlight` harus sama persis dengan potongan
  judulnya, jadi ikut tanpa titik.
- **Judul section = satu kalimat utuh**, tanpa titik di tengah (keputusan user 15 Okt 2026). Bukan "Experts don't write.
  They talk", tapi "Experts talk instead of writing". Hindari juga koma yang memecah judul jadi dua klausa.
- Highlight **satu frasa** di judul dengan `text-brand-orange` (misalnya "Scalable"). Maksimal satu highlight per judul.
- Tambahkan `text-balance` di judul dan `text-pretty` di paragraf supaya baris tidak menggantung.
- Kalau satu frasa judul harus selalu utuh di baris pertama, tulis `\n` di teks judul. `HighlightText` memindah baris
  mulai layar `sm`; di HP `\n` jadi spasi biasa karena frasa panjang tidak muat satu baris di ukuran `text-h2` minimum.
- Judul yang harus **satu baris penuh** di desktop: `SectionHeader singleLineTitle` (mulai `lg`, lead tetap maks.
  720px) atau `HomeCta singleLineTitle`. Bisa digabung dengan `\n` untuk dua baris yang
  masing-masing utuh (The Solution di Home). Hanya untuk judul yang muat di lebar `lg`; di HP judul tetap turun baris
  alami.
- Lebar baris paragraf maksimal ±620–680px (`max-w-[620px]` / `max-w-2xl`).
- Warna: judul `text-brand-grey` (terang) atau `text-white` (gelap), paragraf `text-brand-charcoal` atau `text-line` (gelap).

## Contoh

```tsx
<Eyebrow>Knowledge Universe</Eyebrow>
<h2 className="text-h2 text-balance">Your Sales Expertise, Built Into a Living Knowledge System</h2>
<p className="max-w-2xl text-lead text-pretty text-brand-charcoal">Bring together company knowledge…</p>
```
