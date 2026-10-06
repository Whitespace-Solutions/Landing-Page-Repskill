# 03 · Color

Palet yang fokus untuk **action, trust, intelligence, dan progress** (brand guideline versi 05.10.26, hal. 17–21).
Selalu pakai token Tailwind, jangan hex mentah.

## Palet & token

| Peran     | Nama brand     | Hex       | Token Tailwind   | Makna                                        |
| --------- | -------------- | --------- | ---------------- | -------------------------------------------- |
| Primary   | Primary Orange | `#FF6D00` | `brand-orange`   | Action / performance                         |
| Primary   | Shadow Grey    | `#252729` | `brand-grey`     | Trust / expertise · teks utama · latar gelap |
| Secondary | Amber Gold     | `#FFBE0B` | `brand-amber`    | AI / intelligence · progres                  |
| Secondary | Soft Linen     | `#F3EFE6` | `brand-linen`    | Information / support                        |
| Neutral   | Charcoal       | `#515254` | `brand-charcoal` | Neutral dark · teks sekunder · CTA           |
| Neutral   | Cool Gray      | `#E8EAEB` | `line`           | Neutral light · border, divider              |
| Neutral   | White          | `#FFFFFF` | `white`          | Kanvas                                       |

Token turunan (khusus web, bukan dari PDF):

| Token                | Hex       | Dipakai untuk                                 |
| -------------------- | --------- | --------------------------------------------- |
| `brand-orange-hover` | `#E86300` | Hover tombol oranye                           |
| `brand-orange-deep`  | `#C25200` | Teks oranye di atas latar oranye muda (`/10`) |
| `surface`            | `#F6F7F7` | Latar section netral (Cool Gray ±40%)         |

## Proporsi (per halaman)

Halaman harus terasa **mostly neutral**. Oranye tetap menjadi sinyal yang disengaja.

| White | Shadow Grey | Orange | Cool Gray | Amber Gold | Charcoal | Soft Linen |
| ----- | ----------- | ------ | --------- | ---------- | -------- | ---------- |
| 35%   | 25%         | 15%    | 10%       | 7%         | 5%       | 3%         |

- **Do:** kanvas netral + aksi oranye yang fokus. Gunakan warna aksi secukupnya.
- **Balance:** Amber/Linen mendukung pengalaman.
- **Avoid:** oranye sebagai wallpaper satu halaman.

## Kombinasi yang disarankan

Satu base dominan + satu aksen fungsional + (opsional) satu warna pendukung.

| #   | Kombinasi                        | Konteks                 | Contoh di web                                    |
| --- | -------------------------------- | ----------------------- | ------------------------------------------------ |
| 01  | Shadow Grey + Orange             | Komunikasi utama / CTA  | Section gelap (timeline, philosophy), footer     |
| 02  | Amber Gold + Soft Linen          | Konteks AI / learning   | Kartu Knowledge Universe, panel mockup, strip AI |
| 03  | White + Shadow Grey + Amber Gold | Editorial / dashboard   | Section konten biasa, mockup UI                  |
| 04  | Charcoal + Orange                | Penekanan high-contrast | Section CTA penutup (`FinalCta`)                 |

**Rule:** utamakan kontras dan hierarki, bukan campuran warna dekoratif.

## Pola background section

Ganti-ganti latar antar section agar ada ritme, tapi tetap netral:
`white` → `surface` / `linen` → `dark` (Shadow Grey; maksimal 1–2 per halaman) → `white` … → CTA `brand-charcoal` → footer
`brand-grey`. Jangan menaruh dua section gelap berdempetan.

## Aturan amber (penting)

Amber Gold adalah warna **isian**, bukan warna teks di latar terang (kontrasnya terlalu rendah).

- ✓ Isian: progress bar, dot status "done", ikon centang (`bg-brand-amber text-brand-grey`), kartu/strip AI.
- ✓ Teks amber **hanya di latar gelap**: eyebrow, nomor langkah, judul kolom footer (`text-brand-amber`).
- ✓ Teks di atas amber selalu `text-brand-grey`, **bukan putih**.
- ✗ Teks amber di atas putih/linen.

## Teks & kontras

- Judul: `text-brand-grey`. Paragraf / teks sekunder: `text-brand-charcoal`.
- Eyebrow & label kecil di latar terang: `text-brand-orange` (seperti label di guideline).
- Di latar gelap (`brand-grey` / `brand-charcoal`): judul `text-white`, paragraf `text-line`, eyebrow `text-brand-amber`.
- Chip / tag: `bg-brand-linen text-brand-grey`. Chip status AI: `bg-brand-amber/25 text-brand-grey`.

## Transparansi

Transparansi hanya alat pendukung. Level: **100 / 70 / 40 / 10** (palet) dan peran **100 / 80 / 60 / 40–20**.

| Opacity | Peran                   | Contoh class                         |
| ------- | ----------------------- | ------------------------------------ |
| 100%    | Aksi utama / brand mark | `bg-brand-orange`                    |
| 80%     | Penekanan sekunder      | `text-line/80`                       |
| 60%     | Layer visual pendukung  | `bg-brand-grey/70` (bilah dekoratif) |
| 40–20%  | Background / ambient    | `bg-brand-amber/25`                  |
| 10%     | Permukaan halus         | `bg-white/10`, `bg-brand-orange/10`  |

## Do & don't

✓ Oranye untuk aksi dan penekanan · ✓ Shadow Grey untuk konten utama yang dipercaya · ✓ Amber/Linen untuk AI dan
progres · ✓ Background mostly neutral
✗ Warna di luar palet · ✗ Semua elemen dijadikan aksen · ✗ Kontras rendah · ✗ Gradient/efek pada logo
