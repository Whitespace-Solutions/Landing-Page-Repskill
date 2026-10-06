# Repskill Website

Website marketing Repskill. **Make Sales Expertise Scalable.**

Stack: **Next.js 16** (App Router, static export) · **React 19** · **TypeScript** · **Tailwind CSS v4** · **Motion** (animasi)

## Menjalankan di komputer

Butuh Node.js 22 (lihat `.nvmrc`).

```bash
npm install        # sekali saja
npm run dev        # http://localhost:3000, auto-reload saat file diubah
```

| Perintah            | Fungsi                                                |
| ------------------- | ----------------------------------------------------- |
| `npm run dev`       | Server development                                    |
| `npm run build`     | Build static site ke folder `out/`                    |
| `npm run preview`   | Menyajikan folder `out/` secara lokal (setelah build) |
| `npm run lint`      | Cek kode dengan ESLint                                |
| `npm run typecheck` | Cek tipe TypeScript                                   |
| `npm run format`    | Rapikan format kode (Prettier)                        |

## Struktur folder

```
.
├── .github/workflows/
│   ├── ci.yml              # Lint + typecheck + build di setiap Pull Request
│   └── deploy.yml          # Push ke main → build → deploy otomatis
├── docs/
│   ├── brand/              # Brand guideline (PDF) + file logo asli
│   └── legacy/             # Website lama (bundle HTML + tiap halaman yang sudah dibongkar) — referensi konten
├── public/                 # File statis yang disajikan apa adanya (robots, og-image, dll.)
└── src/
    ├── app/                # Routing (1 folder = 1 URL)
    │   ├── (site)/         # Grup halaman marketing: otomatis pakai header + footer
    │   │   ├── page.tsx                       # /                       Home
    │   │   ├── features/practice/             # /features/practice/
    │   │   ├── features/capture-knowledge/    # /features/capture-knowledge/
    │   │   ├── features/learn-knowledge/      # /features/learn-knowledge/
    │   │   ├── success-stories/               # /success-stories/
    │   │   ├── success-stories/[slug]/        # /success-stories/bamms/, /recharge/, /asco/, /trilogy/
    │   │   ├── pricing/                       # /pricing/
    │   │   ├── about/                         # /about/
    │   │   └── book-demo/                     # /book-demo/
    │   ├── layout.tsx      # Root: font, metadata SEO, provider animasi
    │   ├── globals.css     # Design token brand (warna, font) untuk Tailwind
    │   ├── not-found.tsx   # Halaman 404
    │   ├── sitemap.ts / robots.ts
    │   └── icon.png        # Favicon
    ├── assets/brand/       # Logo yang di-import oleh komponen
    ├── components/
    │   ├── layout/         # SiteHeader, SiteFooter
    │   ├── mockups/        # Ilustrasi UI produk (chat AI, learning path, feedback, …) dari data
    │   ├── motion/         # Primitive animasi: Reveal, Stagger, AnimatedBar, MotionProvider
    │   ├── sections/       # Blok besar per halaman (home/, features/, pricing/, …) + shared/
    │   └── ui/             # Komponen kecil reusable: Button, Section, SectionHeader, Eyebrow
    ├── config/site.ts      # Nama, tagline, URL situs
    ├── content/            # SEMUA teks & data (navigasi, isi halaman) — terpisah dari layout
    └── lib/                # Helper (cn, dll.)
```

### Mengubah konten

Semua teks ada di `src/content/`. Ubah di sana, tidak perlu menyentuh komponen.

| File                                       | Isi                                                              |
| ------------------------------------------ | ---------------------------------------------------------------- |
| `navigation.ts`                            | Menu header, footer, dan daftar URL untuk sitemap                |
| `home.ts`                                  | Home                                                             |
| `features.ts`                              | Practice, Capture Knowledge, Learn Knowledge                     |
| `success-stories.ts`                       | Data tiap klien (bamms, ReCharge, ASCO, Trilogy)                 |
| `clients.ts`                               | Logo di section Our Clients (termasuk klien tanpa success story) |
| `success-stories-page.ts`                  | Halaman induk Success Stories                                    |
| `pricing.ts` / `about.ts` / `book-demo.ts` | Halaman masing-masing                                            |

**Menambah success story baru:** tambahkan satu objek di `success-stories.ts`. Halaman, kartu, logo klien, menu, dan
sitemap ikut terbuat otomatis. Set `draft: false` setelah kontennya disetujui klien (badge "Draft content" akan hilang).

### Menambah halaman baru

1. Buat `src/app/(site)/<nama-url>/page.tsx` → otomatis tersedia di `/<nama-url>/`.
2. Taruh teksnya di `src/content/<nama-halaman>.ts`, section-nya di `src/components/sections/<nama-halaman>/`.
3. Daftarkan link-nya di `src/content/navigation.ts` (header, footer, dan sitemap ikut berubah).
4. Ikuti pola di [`docs/design-system/`](docs/design-system/).

### Formulir Book Demo

Website ini statis, jadi data formulir dikirim (POST JSON) ke layanan penerima formulir, misalnya Formspree, Web3Forms,
HubSpot, atau API sendiri. Isi URL endpoint-nya di GitHub: **Settings → Secrets and variables → Actions → Variables →
`FORM_ENDPOINT`**. Untuk lokal, buat file `.env.local` berisi `NEXT_PUBLIC_FORM_ENDPOINT=https://…`.
Selama endpoint belum diisi, formulir menampilkan pesan error dan tidak menyimpan data.

### Animasi

- `<Reveal>` — fade + naik saat elemen masuk layar.
- `<Stagger>` + `<StaggerItem>` — anak-anaknya muncul berurutan.
- Semua animasi otomatis nonaktif bila pengguna memilih "reduce motion" di OS-nya.

### Warna brand (class Tailwind)

`brand-orange` · `brand-slate` · `brand-teal` · `brand-cyan` · `brand-cyan-soft` · `ink` · `line` · `surface` · `surface-ice`
→ contoh: `bg-brand-orange`, `text-brand-slate`, `border-line`. Sumber: `docs/brand/repskill-brand-guidelines.pdf`.

## Deployment (GitHub Actions)

Setiap **push ke branch `main`** otomatis: lint → typecheck → build → publish ke **GitHub Pages**.

Setup sekali:

1. Push repo ini ke GitHub.
2. Repo → **Settings → Pages → Build and deployment → Source: GitHub Actions**.
3. (Opsional, custom domain) Settings → Pages → Custom domain → isi domain, lalu arahkan DNS sesuai petunjuk GitHub.
   Tambahkan juga variable repo `SITE_URL` (Settings → Secrets and variables → Actions → Variables), mis. `https://repskill.ai`.

Progress deploy bisa dilihat di tab **Actions**. Deploy manual: Actions → Deploy → **Run workflow**.

> Hasil build adalah HTML/CSS/JS statis di `out/`, jadi bisa dipindah ke hosting lain (Cloudflare Pages, Netlify, Vercel,
> cPanel/FTP, S3) cukup dengan mengganti job `deploy` di `.github/workflows/deploy.yml`.
