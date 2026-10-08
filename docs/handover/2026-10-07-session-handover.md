# Handover — Website Repskill (per 7 Oktober 2026)

Dokumen ini untuk sesi Claude berikutnya. Baca sampai habis sebelum mengubah apa pun. `CLAUDE.md` dan
`docs/design-system/README.md` otomatis dimuat, tapi tetap pastikan sudah dibaca.

---

## 1. Ringkasan proyek

- **Apa:** website marketing Repskill, platform AI sales coaching / sales capability. Tagline: _Make Sales Expertise
  Scalable._
- **User:** berkomunikasi dalam **Bahasa Indonesia**. Copy website tetap **Bahasa Inggris**.
- **Repo:** `git@github.com:Whitespace-Solutions/Landing-Page-Repskill.git` (public, akun GitHub `goocel`, SSH key
  `~/.ssh/id_ed25519` sudah terdaftar). Branch utama: `main`.
- **Live:** https://whitespace-solutions.github.io/Landing-Page-Repskill/ (GitHub Pages, belum ada custom domain).
- **Folder lokal:** `/Users/panji/Documents/ReCharge 2021/ReCharge 2026/Repskill/Web Repskill ai`
- **Stack:** Next.js 16 (App Router, `output: "export"` = static site) · React 19 · TypeScript · Tailwind CSS v4 ·
  Motion (`motion/react`) · ESLint · Prettier. Node 22 (`.nvmrc`).

## 2. Peran sesi

- **Sesi utama** = sesi yang bekerja di folder utama di branch `main` (bukan worktree). Hanya sesi utama yang
  menggabungkan pekerjaan ke `main` dan men-deploy. Sesi lain wajib bekerja di worktree (`.claude/worktrees/<nama>`).
- Kalau kamu dibuka di folder utama dan diminta melanjutkan, **kamu sesi utama**. Cek dulu `git worktree list` dan
  tool `ListAgents` untuk melihat sesi lain yang mungkin aktif.

## 3. Aturan kerja yang WAJIB diikuti

1. **Deploy hanya bila user bilang "deploy".** Push ke `main` = website langsung live (GitHub Actions
   `.github/workflows/deploy.yml`, ±2–3 menit). Selain itu: kerjakan, commit lokal, laporkan, lalu tanya.
2. **Design system wajib dipatuhi:** `docs/design-system/`. Sumber kebenaran: `docs/brand/repskill-brand-guidelines.pdf`
   (**versi 05.10.26**). Bila bentrok, PDF menang dan dokumen design system diperbarui di perubahan yang sama.
3. **Pakai token, bukan nilai mentah** (`bg-brand-orange`, `text-h2`, `rounded-card`, …). Token warna LAMA
   (`brand-slate`, `brand-teal`, `brand-cyan`, `brand-cyan-soft`, `surface-ice`, `ink`) sudah dihapus dan **membuat
   `npm run lint` error** (aturan di `eslint.config.mjs`).
4. **Konten terpisah dari tampilan:** semua teks/data di `src/content/`, komponen hanya merender. Navigasi satu sumber:
   `src/content/navigation.ts` (header, footer, sitemap).
5. **Sesi paralel pakai git worktree** (aturan lengkap di `CLAUDE.md`). Jangan pakai `git stash` biasa (stash dipakai
   bersama semua worktree).
6. **Sebelum selesai:** `npm run lint && npm run typecheck && npm run build` lolos, lalu **cek visual di browser**
   (desktop 1440px dan mobile 390px). User menghargai bukti verifikasi, bukan klaim.
7. Commit kecil dengan pesan yang jelas; ikuti baris atribusi dari instruksi harness yang berlaku.

## 4. Brand (ringkas, detail di `docs/design-system/03-color.md`)

| Token            | Hex       | Peran                                                                          |
| ---------------- | --------- | ------------------------------------------------------------------------------ |
| `brand-orange`   | `#FF6D00` | Aksi/CTA, highlight satu frasa judul, eyebrow & label kecil                    |
| `brand-grey`     | `#252729` | Shadow Grey — judul, section gelap, panel CTA, footer                          |
| `brand-charcoal` | `#515254` | Teks paragraf / sekunder                                                       |
| `brand-amber`    | `#FFBE0B` | AI/progres — **hanya isian**. Teks di atasnya `text-brand-grey`, jangan putih. |
| `brand-linen`    | `#F3EFE6` | Latar lembut AI/learning, chip, tile metrik                                    |
| `line`           | `#E8EAEB` | Border/divider · `surface` `#F6F7F7` latar section netral                      |

- Font: Plus Jakarta Sans saja. Logo final di `src/assets/brand/`; master `.ai` di `docs/brand/logo/source/`.
- Hero memakai background putih polos. Komponen `Eyebrow` **tidak lagi punya aksen garis miring** (opsi `accent`
  dihapus 7 Okt).

## 5. Struktur & halaman

```
src/app/(site)/                   Halaman (1 folder = 1 URL), layout dengan header+footer
  page.tsx                        /  Home
  features/{capture-knowledge,learn-knowledge,practice}/
  success-stories/                /success-stories/ (+ [slug]: bamms, recharge, asco, trilogy)
  pricing/, about/, book-demo/
  guide/                          /guide/ help center (+ [guide]: admin, user → [slug] artikel; feature-request/)
src/content/                      Teks & data: home, features, success-stories(-page), clients, pricing, about,
                                  book-demo, guide, navigation, types
src/components/ui/                Button, Section (tone: white|surface|linen|dark), SectionHeader, Eyebrow, Container,
                                  form-field (field formulir bersama), wireframe (Wireframe, HexOutline)
src/components/sections/          Per halaman + shared/ (PageHero, FeatureSplit, StepsTimeline, ClientLogos, FinalCta,
                                  StoryCard) + home/hero-orb + guide/ (guide-shell, guide-parts, feature-request-form)
src/components/mockups/           Ilustrasi UI produk dari data (chat, checklist, bars, knowledge-universe, …)
src/components/motion/            Reveal, Stagger, AnimatedBar, MotionProvider (reduce-motion aman)
src/lib/                          cn.ts (tailwind-merge diperluas), submit-form.ts (kirim formulir)
docs/design-system/               Aturan desain · docs/brand/ guideline & logo · docs/legacy/ situs lama (referensi)
```

- **Home:** hero teks kiri + ilustrasi `HeroOrb` kanan (wireframe oranye berputar, parallax mengikuti kursor) + glow
  oranye 7% di pojok kanan atas → Our Clients (marquee logo berwarna, kiri→kanan) → Platform Overview → How it works
  → Success Stories → FinalCta.
- **FinalCta:** panel Shadow Grey membulat di atas latar putih (eyebrow, satu highlight oranye, tombol primer +
  sekunder). Semua copy CTA ada di `src/content`.
- **Footer:** Shadow Grey dengan `Wireframe` oranye opacity 18% di kanan, berputar 1×/150 detik. Tidak ada tombol Book
  Demo di footer.
- **Header:** Features (dropdown 3 kolom: Capture → Learn → Practice), Success Stories (tanpa dropdown), Pricing, About
  Us, Guide, lalu "Log in" (teks) + "Book Demo" (tombol oranye).
- **Guide:** konten diambil dari Guide landing Whitespace Talent (EN), ditulis ulang dengan token Repskill. 12 artikel di
  `src/content/guide.ts`. Ada search, sidebar, langkah bernomor, callout, mockup, Prev/Next, dan formulir Feature
  Request.
- **Formulir** (Book Demo & Feature Request) memakai `form-field.tsx` dan `submit-form.ts`, POST JSON ke
  `NEXT_PUBLIC_FORM_ENDPOINT`.
- Menambah success story: satu objek di `src/content/success-stories.ts` (+ logo di `src/assets/clients/`). Logo klien
  tanpa success story: `otherClients` di `src/content/clients.ts`.

## 6. Status terakhir (7 Okt 2026, sore)

- **Live = `f547e28`** (deploy sukses 7 Okt sore), `main` lokal = `origin/main`. Isi deploy terakhir (17 commit):
  hero Home baru (orb + ikon Repskill + 3 persona Capture/Learn/Practice, kata oranye bergantian Scalable / Accessible /
  Actionable / Measurable), ikon di sub menu Features, CTA Home terang (`home/home-cta.tsx`), CTA terang `VisualCta` di
  ketiga halaman fitur, wireframe footer kecil di pojok kanan bawah, rekaman layar Reflection Studio (MP4, mockup
  `video`) di halaman Practice, dan semua judul section tanpa titik akhir.
- Helper bersama: `src/components/motion/parallax.tsx` (`usePointerParallax`, `Floating`).
- Per 8 Okt: hanya satu sesi aktif (sesi utama di folder utama), tidak ada worktree.
- Rekaman Reflection Studio masih memperlihatkan file picker macOS (nama folder/tag Finder user) dan nama "sanusi";
  status bar berisi URL staging sudah dipotong. **Keputusan user 8 Okt: ini template sementara, biarkan.**

## 7. Hal terbuka (keputusan user per 8 Okt 2026)

1. **URL login aplikasi: tunda.** URL belum disiapkan. "Log in" tetap jatuh ke `/book-demo/`. Setelah URL siap: set
   GitHub variable `LOGIN_URL` (dibaca sebagai `NEXT_PUBLIC_LOGIN_URL` di `navigation.ts`), atau ganti fallback-nya.
2. **Endpoint formulir: tunda.** Belum ada tujuan. Nanti set `FORM_ENDPOINT` (Formspree/HubSpot/dll.) sebagai GitHub
   variable. Tanpa itu, Book Demo dan Feature Request menampilkan pesan error (sengaja, agar lead tidak hilang diam-diam).
3. **Konten 4 success story: tunggu, user sedang menyiapkan.** bamms, ReCharge, ASCO, Trilogy masih template + badge
   "Draft content"; angka hasil "—". Jangan mengarang hasil.
4. **Halaman Success Stories (termasuk 4 tombol oranye "Read Case Study"): tunggu**, konten masih disiapkan user.
5. **Klaim produk di Guide: SELESAI.** User mengonfirmasi klaim dari guide Whitespace Talent (sign-in Google/Microsoft,
   LinkedIn persona, penghapusan audio, Tenant Profile) juga berlaku untuk Repskill.
6. **Copy asumsi: dirapikan 8 Okt.** Fitur "Knowledge Chat", tabel Pricing "Training vs Repskill", kotak "What shapes
   your plan".
7. **Custom domain: sudah ada, pasang nanti** setelah seluruh website selesai dibangun (Settings → Pages → Custom
   domain + variable `SITE_URL`).
8. Halaman Privacy Policy / Terms belum ada (link sengaja tidak ditampilkan di footer). Belum dibahas.

## 8. Lingkungan & jebakan teknis

- **Node tidak terpasang di Mac user.** Node 22 portable mungkin masih ada di
  `/private/tmp/claude-501/-Users-panji-Documents-ReCharge-2021-ReCharge-2026-Repskill-Web-Repskill-ai/bd620f13-f154-47a5-829b-22edcd588962/scratchpad/node/bin`
  (folder `/tmp`, bisa terhapus). Kalau hilang, unduh ulang ke scratchpad sesi:
  `curl -fsSL https://nodejs.org/dist/v22.20.0/node-v22.20.0-darwin-x64.tar.gz | tar xz` lalu tambahkan `bin/` ke
  `PATH` (mesin x86_64). Atau sarankan user memasang Node 22 sendiri.
- **Build lokal:** `npm run build` (Turbopack) bisa gagal di laptop ini karena `next/font` Google ("queries have exactly
  one entry"), padahal CI lolos. Untuk verifikasi lokal pakai `npx next build --webpack`.
- **Cek visual:** pakai `puppeteer-core` (install di scratchpad) dengan Chrome lokal
  `/Applications/Google Chrome.app/Contents/MacOS/Google Chrome`. Screenshot hasil build (`out/`) yang disajikan dengan
  `python3 -m http.server`, **bukan** `next dev`: konten `Reveal` bisa tampil kosong di screenshot `next dev`. Scroll
  halaman dulu agar animasi masuk-layar berjalan. Jangan pakai `chrome --screenshot` biasa (animasi terhenti, lebar
  minimum 500px).
- **Pantau deploy:** repo public, jadi status bisa dibaca tanpa login:
  `https://api.github.com/repos/Whitespace-Solutions/Landing-Page-Repskill/actions/runs?per_page=1`.
- `cn()` (`src/lib/cn.ts`): **token kustom baru (text/radius/shadow/ease) harus didaftarkan di sana**, kalau tidak
  class-nya terbuang diam-diam.
- Transform dari Motion menimpa class Tailwind `-skew-x-*`. Untuk elemen beranimasi, pakai `style={{ skewX }}`.
- Menu mobile dirender di luar `<header>` karena `backdrop-filter` memerangkap elemen `fixed`.
- ESLint/TypeScript/Prettier mengabaikan `.claude/` (worktree). Turbopack menolak `node_modules` berupa symlink di luar
  root (pakai `cp -cR` bila perlu salinan build).
- Static export: tidak ada fitur server (Server Actions, route handler dengan Request, redirect/rewrite, image
  optimization bawaan). Gambar/logo di-import statis (`import logo from "@/assets/..."`) agar `basePath` GitHub Pages
  benar.

## 9. Cara mulai di sesi baru

1. `git status`, `git log --oneline -5`, `git worktree list`: pastikan masih sesuai bagian 6.
2. Siapkan Node (bagian 8), `npm install` bila `node_modules` hilang, lalu `npm run lint && npm run typecheck` dan build
   sebagai sanity check.
3. Bandingkan `main` lokal dengan deploy terakhir (API di bagian 8), laporkan commit yang belum live, lalu tanyakan
   prioritas berikutnya (lihat bagian 7).
