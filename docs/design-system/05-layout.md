# 05 · Layout

## Container

Semua konten section dibungkus [`<Container>`](../../src/components/ui/container.tsx): maksimal **1366px**, gutter
`20px` (mobile) → `32px` (sm) → `64px` (lg).

## Spacing section

| Jenis section            | Padding vertikal                            |
| ------------------------ | ------------------------------------------- |
| Section standar          | `py-20 lg:py-28` (80px → 112px)             |
| Section unggulan / gelap | `py-20 lg:py-32` (80px → 128px)             |
| Hero                     | `pt-14 sm:pt-20 lg:pt-26`, `pb-14 lg:pb-24` |

Jarak di dalam section:

- eyebrow → judul → paragraf: `gap-5` / `gap-6`
- blok heading → konten: `mt-10 lg:mt-14`
- antar kartu dalam grid: `gap-4`
- isi kartu: `p-5.5` sampai `p-7` dengan `gap-3`–`gap-4`

## Grid & breakpoint

Breakpoint Tailwind default: `sm 640` · `md 768` · `lg 1024` · `xl 1280`. Menu desktop muncul mulai `lg`.

| Konten             | Kolom                                                            |
| ------------------ | ---------------------------------------------------------------- |
| 2 kartu            | `md:grid-cols-2`                                                 |
| 3 kartu            | `md:grid-cols-2 xl:grid-cols-3`                                  |
| 4 kartu            | `sm:grid-cols-2 xl:grid-cols-4`                                  |
| 5 stage (alur)     | `lg:grid-cols-5` (mobile ditumpuk vertikal)                      |
| Heading + paragraf | flex wrap: judul `flex-[1_1_520px]`, paragraf `flex-[1_1_360px]` |

Mobile first: desain harus benar di lebar **360–390px** tanpa scroll horizontal.

## Radius

| Token            | Nilai | Dipakai untuk                      |
| ---------------- | ----- | ---------------------------------- |
| `rounded-button` | 10px  | Tombol, input, tombol ikon         |
| `rounded-card`   | 16px  | Kartu, dropdown                    |
| `rounded-panel`  | 20px  | Panel besar / wadah mockup di hero |
| `rounded-xl`     | 12px  | Elemen di dalam kartu, item list   |
| `rounded-md`     | 6px   | Chip / tag                         |
| `rounded-full`   | pill  | Badge status, avatar, dot          |

## Shadow

Shadow dipakai **hemat**. Sebagian besar kartu cukup memakai `border border-line` tanpa shadow.

| Token          | Dipakai untuk                             |
| -------------- | ----------------------------------------- |
| `shadow-float` | Panel besar yang "melayang" (mockup hero) |
| `shadow-pop`   | Dropdown, popover                         |
| `shadow-glow`  | Hover kartu fitur (bernuansa teal)        |

## Background hero

Hero memakai background **putih polos**, tanpa pola grid atau tekstur. Kedalaman cukup datang dari panel mockup
(`shadow-float`).
