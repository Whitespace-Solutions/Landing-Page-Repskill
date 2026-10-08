# 06 · Components

Pakai komponen yang sudah ada sebelum membuat yang baru. Komponen baru yang reusable masuk ke `src/components/ui/`.

## Yang sudah ada

| Komponen                           | File                                                        | Catatan                                                                                                                                                                                                                                                                                                     |
| ---------------------------------- | ----------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Container`                        | `src/components/ui/container.tsx`                           | Wadah lebar konten                                                                                                                                                                                                                                                                                          |
| `ButtonLink`                       | `src/components/ui/button.tsx`                              | Varian `primary` · `outline` · `outline-dark`; size `md` · `lg`; `withArrow`                                                                                                                                                                                                                                |
| `ArrowRight`                       | `src/components/ui/button.tsx`                              | Ikon panah standar                                                                                                                                                                                                                                                                                          |
| `FeatureIcon`                      | `src/components/ui/feature-icon.tsx`                        | Ikon garis khusus alur produk: `capture` (bingkai bidik + lampu) · `learn` (buku terbuka) · `practice` (dua balon chat). Dipakai di sub menu Features lewat `icon` di `navigation.ts`                                                                                                                       |
| `Eyebrow`                          | `src/components/ui/eyebrow.tsx`                             | Label uppercase oranye di atas judul (tanpa aksen)                                                                                                                                                                                                                                                          |
| `Reveal`, `Stagger`, `StaggerItem` | `src/components/motion/reveal.tsx`                          | Lihat [07-motion.md](07-motion.md)                                                                                                                                                                                                                                                                          |
| `SiteHeader` / `SiteFooter`        | `src/components/layout/`                                    | Diambil dari `src/content/navigation.ts`. Desktop (lg+): grid 3 kolom, logo kiri · menu utama tepat di tengah · Log in + Book Demo kanan. Dropdown: `layout: "row"` = sub menu berjajar ke samping (dipakai Features). Menu: hover dan aktif = teks oranye tanpa kotak latar; aktif + garis oranye di bawah |
| `FinalCta`                         | `src/components/sections/shared/final-cta.tsx`              | CTA penutup, data `CtaData`: `eyebrow` `title` `highlight` `body` `primary` (default Book Demo) `secondary`                                                                                                                                                                                                 |
| `HomeCta`                          | `src/components/sections/home/home-cta.tsx`                 | CTA penutup Home, Success Stories & About (default `homeCta`, bisa menerima `CtaData` lain): teks di tengah, foto heksagon Capture/Learn/Practice + heksagon garis/isi melayang di kiri-kanan (xl+), deretan 3 foto kecil di atas eyebrow (< xl)                                                            |
| `VisualCta`                        | `src/components/sections/shared/visual-cta.tsx`             | CTA penutup terang dengan visual: teks rata kiri, kanan 1 foto heksagon besar + heksagon garis oranye + heksagon isi oranye muda, melayang + parallax. Dipakai ketiga halaman fitur lewat `ctaVisual`; komposisi per halaman lewat `layout`                                                                 |
| `Section`                          | `src/components/ui/section.tsx`                             | Wrapper section: `tone` (`white` · `surface` · `linen` · `dark`), `size` (`md` · `lg`)                                                                                                                                                                                                                      |
| `SectionHeader`                    | `src/components/ui/section-header.tsx`                      | Eyebrow → judul → lead (+ tombol). `layout="side"`, `size="h1"`, `tone="dark"`                                                                                                                                                                                                                              |
| `HighlightText`                    | `src/components/ui/highlight-text.tsx`                      | Mewarnai satu frasa judul dengan oranye                                                                                                                                                                                                                                                                     |
| `RotatingWords`                    | `src/components/ui/rotating-words.tsx`                      | Kata yang bergantian tanpa henti (keluar naik, masuk dari bawah). Lebar dikunci ke kata terpanjang; pembaca layar & "reduce motion" hanya kata pertama. Dipakai di hero Home                                                                                                                                |
| `PageHero`                         | `src/components/sections/shared/page-hero.tsx`              | Hero halaman turunan (data `PageHeroData`)                                                                                                                                                                                                                                                                  |
| `FeatureSplit`                     | `src/components/sections/shared/feature-split.tsx`          | Pola Split dengan poin + mockup (data `FeatureBlockData`)                                                                                                                                                                                                                                                   |
| `StepsTimeline`                    | `src/components/sections/shared/steps-timeline.tsx`         | Timeline bernomor, `tone="dark"` (default) atau `"light"`                                                                                                                                                                                                                                                   |
| `PricingPlans`                     | `src/components/sections/pricing/pricing-sections.tsx`      | Kartu harga di `/pricing/` dari `pricingPage.plans`: ikon Repskill, nama paket oranye, harga `text-display`, baris tagihan (harga coret + total oranye), fitur (✓ amber, `**tebal**`), tombol + catatan. Kartu dengan `badge` = border oranye 2px, badge pil di atas, tombol primer                         |
| `RichText`                         | `src/components/ui/rich-text.tsx`                           | Teks konten dengan `**tebal**` → `<strong>` (Guide, kartu harga)                                                                                                                                                                                                                                            |
| `ClientLogos`                      | `src/components/sections/shared/client-logos.tsx`           | Section "Our Clients": marquee logo dari `src/content/clients.ts`                                                                                                                                                                                                                                           |
| `StoryCard`                        | `src/components/sections/shared/story-card.tsx`             | Kartu ringkas success story                                                                                                                                                                                                                                                                                 |
| `StoryRow`                         | `src/components/sections/success-stories/story-parts.tsx`   | Baris satu klien di `/success-stories/` (latar `surface`, dipisah garis tipis): "Nama: headline", ringkasan, tautan uppercase bergaris bawah "Read Case Study"; kolom metrik bertumpuk; logo berwarna di kotak putih                                                                                        |
| `StoryArticle`, `StoryToc`         | `src/components/sections/success-stories/story-article.tsx` | Halaman detail klien format artikel: tautan Back + headline saja, lalu daftar isi menempel (scroll-spy) · artikel · kotak Book Demo menempel (lg+), banner CTA bergradasi oranye. Copy di `successStoriesPage.detail`                                                                                       |
| `Mockup`                           | `src/components/mockups/mockup.tsx`                         | Ilustrasi UI produk dari data: `chat` · `checklist` · `bars` · `knowledge-universe` · `governance` · `quote` · `structure` · `video` (rekaman layar, `VideoMockup`) · `screenshot` (gambar produk, bingkai sama) · `token-usage` (kartu "Where tokens go" seperti platform, bar amber pelan)                |
| `ExpandableMedia`                  | `src/components/mockups/expandable-media.tsx`               | Lightbox layar penuh untuk mockup `screenshot` & `video`: klik aset atau tombol "Full screen" (pojok kanan atas) → `<dialog>` modal, latar `brand-grey/85` buram; tutup lewat ×, Esc, atau klik di luar                                                                                                     |
| `AnimatedBar`                      | `src/components/motion/animated-bar.tsx`                    | Bar progres yang mengisi saat terlihat                                                                                                                                                                                                                                                                      |
| `usePointerParallax`, `Floating`   | `src/components/motion/parallax.tsx`                        | Parallax kursor (hanya mouse, mati saat "reduce motion") + elemen dekoratif yang melayang. Dipakai `HeroOrb`, `HomeCta`, `VisualCta`                                                                                                                                                                        |
| `Wireframe`, `HexOutline`          | `src/components/ui/wireframe.tsx`                           | Grafik garis poligon dan heksagon garis dekoratif (warna via `text-*`), dipakai di footer dan `HeroOrb`                                                                                                                                                                                                     |
| `HeroOrb`                          | `src/components/sections/home/hero-orb.tsx`                 | Ilustrasi hero Home: wireframe berputar + "bernapas", glow, ring orbit, logo Repskill di tengah (tidak berputar), 3 foto heksagon + kartu Capture/Learn/Practice (data `heroPersonas` di `home.ts`), 2 heksagon garis; semua melayang + parallax kursor                                                     |
| `TextField`, `TextAreaField`       | `src/components/ui/form-field.tsx`                          | Field formulir (label, error, "(optional)"), plus `FormError` dan `FormSuccess`. Kirim data lewat `submitForm()` di `src/lib/submit-form.ts`                                                                                                                                                                |
| `GuideShell`                       | `src/components/sections/guide/guide-shell.tsx`             | Kerangka Help Center `/guide/`: hero + pencarian, sidebar artikel (aktif = `bg-brand-orange/10`), hasil pencarian                                                                                                                                                                                           |
| `GuideArticleView` dkk.            | `src/components/sections/guide/guide-parts.tsx`             | Breadcrumb, kartu panduan, halaman ringkasan, artikel (langkah bernomor linen, callout linen, mockup dalam bingkai jendela)                                                                                                                                                                                 |

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
Tanpa aksen strip miring di depannya, termasuk di hero (keputusan 2026-10-07).

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

| Pola                     | Deskripsi                                                                                             | Komponen / contoh                           |
| ------------------------ | ----------------------------------------------------------------------------------------------------- | ------------------------------------------- |
| **Hero Home**            | Eyebrow, `text-display`, 2 tombol; ilustrasi `HeroOrb` kanan + glow oranye 7% pojok kanan             | `home/hero.tsx`                             |
| **Page hero**            | Teks kiri, mockup kanan; `layout: "side"` = judul kiri (2 baris) + lead kanan, tanpa tombol (Pricing) | `PageHero`                                  |
| **Hero pernyataan**      | Eyebrow, judul `text-display`, lead; rata kiri selebar container, tanpa tombol/visual                 | `AboutHero` (About Us)                      |
| **Our Clients**          | Marquee logo klien berwarna (tanpa outline) kiri → kanan                                              | `ClientLogos`                               |
| **Split**                | Teks + poin di satu sisi, mockup di sisi lain; berselang-seling                                       | `FeatureSplit`                              |
| **Heading + grid kartu** | `SectionHeader` (+ tombol outline) lalu grid 3–4 kartu                                                | Platform Overview, What's Included          |
| **Timeline**             | 5 langkah dengan garis atas + dot, langkah terakhir oranye                                            | `StepsTimeline` (How it works)              |
| **Kartu harga**          | 2 kartu (Monthly · Annual) di latar `surface`, paket unggulan ditonjolkan dengan badge                | `PricingPlans`                              |
| **Tabel perbandingan**   | Kolom Repskill disorot oranye muda, ✓ oranye                                                          | Pricing › Feature Comparison                |
| **Daftar success story** | Baris di latar `surface` (`StoryRow`): teks + tautan · metrik · logo, dipisah garis `line`            | `/success-stories/`                         |
| **Metrik hasil**         | 3 tile Linen, angka oranye + label uppercase; "—" bila belum terverifikasi                            | `StoryArticle` › Results at a Glance        |
| **Artikel case study**   | Headline tanpa gambar/tombol; 3 kolom (daftar isi · artikel maks. 760px · kotak CTA)                  | `/success-stories/<slug>/` (`StoryArticle`) |
| **Banner CTA gradasi**   | Panel `rounded-panel` `bg-linear-to-b from-brand-orange/5 to-brand-orange/30`, 1 judul + 1 tombol     | Akhir artikel case study                    |
| **Help Center**          | Hero putih + pencarian, sidebar kiri (lg) / "Browse the guide" (mobile), artikel maks. 780px          | `/guide/` (`GuideShell`)                    |
| **CTA penutup**          | Panel Shadow Grey membulat di latar putih, tepat di atas footer (lihat di bawah)                      | `shared/final-cta.tsx`                      |
| **CTA penutup Home**     | Latar putih + glow oranye 7% kiri-kanan, teks di tengah diapit foto & heksagon melayang               | `home/home-cta.tsx`                         |

### CTA penutup

Dipakai di semua halaman kecuali Book Demo (halaman tujuan CTA itu sendiri), Guide (tanpa CTA penutup sejak 2026-10-08) dan detail case study (banner gradasi, lihat
`StoryArticle`). Copy-nya ada di `src/content/` sebagai
`CtaData`, tidak ditulis langsung di halaman.

**Home memakai varian sendiri (`HomeCta`, sejak 2026-10-07):** section putih terang (bukan panel gelap), teks rata
tengah, tombol `primary` + `outline`. Di kiri dua foto heksagon (Capture, Learn) dan di kanan satu (Practice), dikelilingi
heksagon garis oranye 50% dan heksagon isi oranye 20%, semuanya melayang + parallax seperti hero. Di bawah `xl` foto
berubah jadi deretan kecil di atas eyebrow dan heksagon disembunyikan. Sejak 2026-10-08 halaman `/success-stories/` juga
memakai `HomeCta` (copy dari `successStoriesPage.cta`), begitu juga `/about/` (`aboutPage.cta`). Halaman lain **tetap** memakai `FinalCta` sampai diputuskan lain.

**Halaman fitur (Capture, Learn, Practice) dan Pricing (sejak 2026-10-08) memakai `VisualCta` (sejak 2026-10-07):** isi `ctaVisual: { image, layout }` di data
halaman fitur (`src/content/features.ts`) untuk mengganti `FinalCta` gelap dengan versi terang: teks rata kiri + tombol
`primary` dan `outline`, di sebelahnya foto heksagon (`src/assets/images/cta/`), heksagon garis oranye 90%, dan heksagon
isi oranye 25%. Posisinya mengikuti contoh desain tiap halaman (`layouts` di `visual-cta.tsx`):

- `capture`: foto kiri atas, heksagon garis besar di kanan-bawah foto, heksagon isi kecil di bawah di antaranya.
- `learn`: foto besar, heksagon garis di kanannya, heksagon isi di kiri bawah menempel ke foto.
- `practice`: foto besar di kiri, heksagon garis di kanan atas, heksagon isi di kanan bawah.

Visual rata kiri di kolomnya (dan `learn` digeser 64px) supaya foto dekat dengan judul (ketiganya mulai di titik yang sama). Halaman fitur
tanpa `ctaVisual` kembali ke `FinalCta`.

- Struktur: eyebrow `Get Started` → judul `text-h1` dengan satu `highlight` oranye → lead → tombol.
- Tombol: satu `primary` (default "Book Demo"; Pricing memakai "Talk to Sales") + satu `secondary` `outline-dark` yang
  mengarah ke langkah logis berikutnya. Contoh: halaman fitur → fitur berikutnya (Capture → Learn → Practice), halaman
  terakhir → Pricing, detail klien → Success Stories.
- Bentuk: panel polos `rounded-panel bg-brand-grey` di dalam section putih, jadi tidak menempel ke footer yang juga
  gelap. Tanpa bilah miring dekoratif.
- Footer tidak mengulang tombol Book Demo. Cukup link di kolom GET STARTED.

**Ritme gelap/terang:** jangan menaruh dua section gelap berdempetan. Contohnya, timeline tepat di atas `FinalCta` harus
memakai `tone="light"`.

## Template halaman

| Jenis halaman       | Cara membuat                                                                                                                                                      |
| ------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Halaman fitur       | Tambah objek `FeaturePage` di `src/content/features.ts` lalu render `<FeaturePageView page={…} />`                                                                |
| Success story klien | Tambah objek di `src/content/success-stories.ts`; halaman, kartu, logo, link footer, dan sitemap otomatis. Menu header tidak punya dropdown klien                 |
| Artikel Guide       | Tambah objek artikel di `src/content/guide.ts` (blok `p` · `h2` · `steps` · `callout` · `shot`); halaman, sidebar, pencarian, Previous/Next, dan sitemap otomatis |
| Halaman lain        | `PageHero` + kombinasi pola di atas + `FinalCta`                                                                                                                  |

Contoh pola dari situs lama ada di `docs/legacy/pages/*.html`. Pakai sebagai referensi tata letak, lalu tulis ulang
memakai token dan komponen di repo ini.
