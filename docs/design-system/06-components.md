# 06 · Components

Pakai komponen yang sudah ada sebelum membuat yang baru. Komponen baru yang reusable masuk ke `src/components/ui/`.

## Yang sudah ada

| Komponen                           | File                                                      | Catatan                                                                                                                    |
| ---------------------------------- | --------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| `Container`                        | `src/components/ui/container.tsx`                         | Wadah lebar konten                                                                                                         |
| `ButtonLink`                       | `src/components/ui/button.tsx`                            | Varian `primary` · `outline` · `outline-dark`; size `md` · `lg`; `withArrow`                                               |
| `ArrowRight`                       | `src/components/ui/button.tsx`                            | Ikon panah standar                                                                                                         |
| `Eyebrow`                          | `src/components/ui/eyebrow.tsx`                           | `accent` = aksen garis miring oranye                                                                                       |
| `Reveal`, `Stagger`, `StaggerItem` | `src/components/motion/reveal.tsx`                        | Lihat [07-motion.md](07-motion.md)                                                                                         |
| `SiteHeader` / `SiteFooter`        | `src/components/layout/`                                  | Diambil dari `src/content/navigation.ts`. Dropdown: `layout: "row"` = sub menu berjajar ke samping (dipakai Features)      |
| `FinalCta`                         | `src/components/sections/shared/final-cta.tsx`            | CTA penutup, props `title` `body` `cta` `href`                                                                             |
| `Section`                          | `src/components/ui/section.tsx`                           | Wrapper section: `tone` (`white` · `surface` · `linen` · `dark`), `size` (`md` · `lg`)                                     |
| `SectionHeader`                    | `src/components/ui/section-header.tsx`                    | Eyebrow → judul → lead (+ tombol). `layout="side"`, `size="h1"`, `tone="dark"`                                             |
| `HighlightText`                    | `src/components/ui/highlight-text.tsx`                    | Mewarnai satu frasa judul dengan oranye                                                                                    |
| `PageHero`                         | `src/components/sections/shared/page-hero.tsx`            | Hero halaman turunan (data `PageHeroData`)                                                                                 |
| `FeatureSplit`                     | `src/components/sections/shared/feature-split.tsx`        | Pola Split dengan poin + mockup (data `FeatureBlockData`)                                                                  |
| `StepsTimeline`                    | `src/components/sections/shared/steps-timeline.tsx`       | Timeline bernomor, `tone="dark"` (default) atau `"light"`                                                                  |
| `ClientLogos`                      | `src/components/sections/shared/client-logos.tsx`         | Section "Our Clients": marquee logo dari `src/content/clients.ts`                                                          |
| `StoryCard`                        | `src/components/sections/shared/story-card.tsx`           | Kartu ringkas success story                                                                                                |
| `StoryRow`                         | `src/components/sections/success-stories/story-parts.tsx` | Kartu lebar satu klien di `/success-stories/`: "Nama: headline", ringkasan, metrik, tombol "Read Case Study", logo kanan   |
| `Mockup`                           | `src/components/mockups/mockup.tsx`                       | Ilustrasi UI produk dari data: `chat` · `checklist` · `bars` · `knowledge-universe` · `governance` · `quote` · `structure` |
| `AnimatedBar`                      | `src/components/motion/animated-bar.tsx`                  | Bar progres yang mengisi saat terlihat                                                                                     |

## Button

| Varian         | Tampilan                                          | Kapan                                    |
| -------------- | ------------------------------------------------- | ---------------------------------------- |
| `primary`      | Oranye, teks putih                                | **Satu** aksi utama per area (Book Demo) |
| `outline`      | Putih, border Shadow Grey → hover isi Shadow Grey | Aksi sekunder di background terang       |
| `outline-dark` | Transparan, border putih 20%                      | Aksi sekunder di background gelap        |

Teks tombol berupa kata kerja dan singkat: "Book Demo", "Talk to Sales", "Explore Practice". Panah (`withArrow`) hanya untuk aksi yang
mengarah maju.

## Eyebrow

UPPERCASE, `text-eyebrow`. Warna `text-brand-orange` di background terang, `text-brand-amber` di background gelap.
Pakai `accent` hanya di hero atau halaman pembuka.

## Kartu

- **Kartu standar:** `rounded-card border border-line bg-white p-6`. Saat hover: `border-brand-amber shadow-glow -translate-y-0.5`.
- **Kartu di section abu:** `rounded-card bg-white` (tanpa border).
- **Kartu aksen AI:** `rounded-card bg-brand-amber text-brand-grey`, eyebrow `text-brand-grey/70`. Maksimal satu per grid.
- **Struktur isi:** label stage (`text-[11.5px] font-bold tracking-[0.12em] text-brand-orange`) → judul `text-h3` → deskripsi
  `text-[15px] text-brand-charcoal` → link "Explore … →" di bawah (`mt-auto`).

## Chip, badge, status

| Elemen                  | Class                                                                        |
| ----------------------- | ---------------------------------------------------------------------------- |
| Chip netral (tag skill) | `rounded-md bg-line px-2.5 py-1 text-xs font-semibold text-brand-charcoal`   |
| Chip AI / fitur         | `rounded-md bg-brand-linen px-2 py-1 text-xs font-semibold text-brand-grey`  |
| Badge outline           | `rounded-full border border-line bg-white px-2.5 py-1 text-xs font-semibold` |
| Badge aksi / "now"      | `rounded-full bg-brand-orange px-2.5 py-1 text-xs font-semibold text-white`  |

State dalam list/progress: **done** = amber · **now/sedang berjalan** = oranye (background `bg-brand-orange/10`) ·
**todo** = `line`.

## Pola section

Semua section mengikuti kerangka: **Eyebrow → Judul → Lead → Konten → (link/CTA)**.

| Pola                     | Deskripsi                                                                         | Komponen / contoh                              |
| ------------------------ | --------------------------------------------------------------------------------- | ---------------------------------------------- |
| **Hero Home**            | Putih polos, eyebrow + accent, `text-display`, 2 tombol, panel mockup di bawah    | `home/hero.tsx`                                |
| **Page hero**            | Teks kiri, mockup kanan                                                           | `PageHero`                                     |
| **Our Clients**          | Marquee logo klien berwarna (tanpa outline) kiri → kanan                          | `ClientLogos`                                  |
| **Split**                | Teks + poin di satu sisi, mockup di sisi lain; berselang-seling                   | `FeatureSplit`                                 |
| **Heading + grid kartu** | `SectionHeader` (+ tombol outline) lalu grid 3–4 kartu                            | Platform Overview, What's Included             |
| **Timeline**             | 5 langkah dengan garis atas + dot, langkah terakhir oranye                        | `StepsTimeline` (How it works, Implementation) |
| **Tabel perbandingan**   | Kolom Repskill disorot oranye muda, ✓ oranye                                      | Pricing › Feature Comparison                   |
| **Daftar success story** | Kartu lebar bertumpuk (`StoryRow`): teks + metrik + tombol kiri, panel logo kanan | `/success-stories/`                            |
| **Metrik hasil**         | 3 tile angka oranye + label; "—" bila belum terverifikasi                         | `MetricTiles` (success stories)                |
| **CTA penutup**          | `FinalCta` di atas footer pada hampir setiap halaman                              | `shared/final-cta.tsx`                         |

**Ritme gelap/terang:** jangan menaruh dua section gelap berdempetan. Contohnya, timeline tepat di atas `FinalCta` harus
memakai `tone="light"`.

## Template halaman

| Jenis halaman       | Cara membuat                                                                                                                                      |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| Halaman fitur       | Tambah objek `FeaturePage` di `src/content/features.ts` lalu render `<FeaturePageView page={…} />`                                                |
| Success story klien | Tambah objek di `src/content/success-stories.ts`; halaman, kartu, logo, link footer, dan sitemap otomatis. Menu header tidak punya dropdown klien |
| Halaman lain        | `PageHero` + kombinasi pola di atas + `FinalCta`                                                                                                  |

Contoh pola dari situs lama ada di `docs/legacy/pages/*.html`. Pakai sebagai referensi tata letak, lalu tulis ulang
memakai token dan komponen di repo ini.
