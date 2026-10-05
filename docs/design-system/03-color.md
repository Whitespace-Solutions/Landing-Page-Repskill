# 03 · Color

Palet yang fokus untuk **action, trust, intelligence, dan progress**. Selalu pakai token Tailwind, jangan hex mentah.

## Palet & token

| Peran     | Nama brand | Hex       | Token Tailwind    | Makna                  |
| --------- | ---------- | --------- | ----------------- | ---------------------- |
| Primary   | Orange     | `#FF6D00` | `brand-orange`    | Action / performance   |
| Primary   | Slate      | `#3B494C` | `brand-slate`     | Trust / expertise      |
| Secondary | Deep Teal  | `#087C8C` | `brand-teal`      | AI / intelligence      |
| Secondary | Cyan       | `#49B8D1` | `brand-cyan`      | Progress / development |
| Secondary | Soft Cyan  | `#DDF3F7` | `brand-cyan-soft` | Information / support  |
| Neutral   | Graphite   | `#212121` | `ink`             | Teks utama, footer     |
| Neutral   | Cool Gray  | `#E8EAEB` | `line`            | Border, divider, chip  |
| Neutral   | White      | `#FFFFFF` | `white`           | Kanvas                 |

Token turunan (khusus web, bukan dari PDF):

| Token                | Hex       | Dipakai untuk                                     |
| -------------------- | --------- | ------------------------------------------------- |
| `brand-orange-hover` | `#E86300` | Hover tombol oranye                               |
| `brand-orange-deep`  | `#C25200` | Teks oranye di atas background oranye muda        |
| `surface`            | `#F6F7F7` | Background section/kartu abu sangat muda          |
| `surface-ice`        | `#EEF9FB` | Background section/kartu bernuansa AI (teal muda) |

## Proporsi (per halaman)

Halaman harus terasa **mostly neutral**. Warna dipakai untuk mengarahkan perhatian dan menunjukkan state.

| White | Slate | Orange | Cool Gray | Teal | Cyan | Soft Cyan |
| ----- | ----- | ------ | --------- | ---- | ---- | --------- |
| 35%   | 25%   | 15%    | 10%       | 7%   | 5%   | 3%        |

- **Do:** kanvas netral + aksi oranye yang fokus.
- **Balance:** teal/cyan mendukung pengalaman.
- **Avoid:** oranye sebagai wallpaper satu halaman.

## Kombinasi yang disarankan

Satu base dominan + satu aksen fungsional + (opsional) satu warna pendukung.

| #   | Kombinasi             | Konteks                 | Contoh di web                        |
| --- | --------------------- | ----------------------- | ------------------------------------ |
| 01  | Slate + Orange        | Komunikasi utama / CTA  | Section CTA penutup, stage "Improve" |
| 02  | Deep Teal + Soft Cyan | Konteks AI / learning   | Kartu Knowledge Universe             |
| 03  | White + Slate + Cyan  | Editorial / dashboard   | Section konten biasa, mockup UI      |
| 04  | Graphite + Orange     | Penekanan high-contrast | Footer                               |

## Pola background section

Ganti-ganti background antar section supaya ritmenya terasa, tapi tetap netral:
`white` → `surface` / `surface-ice` → `brand-slate` (maksimal 1–2 section gelap per halaman) → `white` … → CTA `brand-slate` → footer `ink`.

## Transparansi

Transparansi hanya alat pendukung, bukan pengganti palet. Level yang dipakai: **100 / 80 / 60 / 40–20 / 10**.

| Opacity | Peran                         | Contoh class                      |
| ------- | ----------------------------- | --------------------------------- |
| 100%    | Aksi utama / brand mark       | `bg-brand-orange`                 |
| 80%     | Penekanan sekunder            | `text-line/80`                    |
| 60%     | Layer visual pendukung        | `border-brand-cyan/55`            |
| 40–20%  | Background / ambient          | `bg-brand-cyan/25`                |
| 10%     | Permukaan halus di area gelap | `bg-white/10`, `bg-brand-cyan/10` |

## Teks & kontras

- Teks utama: `text-ink` di atas putih. Teks sekunder: `text-brand-slate`.
- Di atas `brand-slate`/`ink`: judul `text-white`, paragraf `text-line`, eyebrow `text-brand-cyan`.
- Eyebrow di background terang: `text-brand-teal`.
- Jangan pakai pasangan teks/background yang kontrasnya rendah (misalnya cyan di atas putih untuk paragraf).

## Do & don't

✓ Oranye untuk aksi dan penekanan · ✓ Slate untuk konten utama yang dipercaya · ✓ Teal/Cyan untuk AI dan progres ·
✓ Background mostly neutral
✗ Warna di luar palet · ✗ Semua elemen dijadikan aksen · ✗ Kontras rendah · ✗ Gradient/efek pada logo
