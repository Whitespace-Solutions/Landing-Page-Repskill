# Handover — Website Repskill (per 14 Oktober 2026)

Lanjutan dari [`2026-10-07-session-handover.md`](2026-10-07-session-handover.md). Aturan kerja, brand, dan struktur
halaman di sana masih berlaku; dokumen ini mencatat apa yang berubah di sesi 13 Oktober dan apa yang masih terbuka.

## 1. Status terakhir

- **Semua sudah live.** `main` = `origin/main` = `c351d21` ("Add icons to The Mentor and The Builder cards on About"),
  di-push 13 Okt atas permintaan user. 25 commit sesi ini: `698ce4c..c351d21`.
- **URL live:** https://whitespace-solutions.github.io/Landing-Page-Repskill/ (belum ada custom domain / `CNAME`).
- Working tree bersih, tidak ada worktree lain. Identitas git repo-lokal: `goocel <kevin.prakasa@gmail.com>`
  (diset di `.git/config` karena mesin ini belum punya identitas global).

## 2. Sumber konten baru: sales deck

`D:\Repskill\Repskill_Sales_Deck_Oct_2026_v4.pdf` (27 slide, di luar repo). Kerangka deck Know → Rehearse → Reflect →
Govern **tidak** dipakai sebagai menu; user memilih tetap **Capture → Learn → Practice & Reflect**, dan isi "Govern"
disebar:

- Content Manager → halaman Capture.
- Rubric dari playbook + Team Dashboard → halaman Practice.
- Admin (guardrails, role, SSO) → section Why Repskill di Home.
- Token management → tetap di Pricing.

## 3. Yang berubah di sesi ini

**Home**

- Urutan: Hero → **The Problem** (baru, 3 kartu dengan ikon `DuoIcon`) → Platform Overview → How It Works → **Why
  Repskill** (baru: "Built for Indonesia. Governed for enterprise.") → Success Stories → **Our Clients** (dipindah ke sini)
  → CTA.
- Hero Home **tetap** "Make Sales Expertise Scalable" (keputusan user).
- Platform Overview: ketiga kartu menampilkan screenshot produk yang berganti otomatis (`ScreenshotCarousel`, tanpa dot
  indikator, mulai digeser 1 dtk per kartu). Lead memakai positioning deck ("A flight simulator for your sales team…").
- CTA Home: judul satu baris mulai `lg` (`singleLineTitle`), foto menyebar kiri-kanan mulai `lg`, heksagon garis besar
  kiri bawah dihapus.

**Halaman fitur (Capture, Learn, Practice)**

- Copy mengikuti deck. Capture + section **Content Manager** (screenshot panel review). Practice: Scenario Studio → You vs
  AI → Session Review (scorecard + rubric digabung) → Reflection Studio → **Team Dashboard** (mockup `team`).
- "Knowledge Chat" diganti **"AI Chat"** di seluruh situs.
- Hero: **tombol dihapus** (Book Demo cukup di CTA bawah). Visual hero ketiganya memakai mockup `persona-scene`: foto
  heksagon besar kiri, kartu kanan atas, 2 pop-up, 2 heksagon kecil. Komposisi ini **diskalakan sebagai satu kesatuan**
  (semua ukuran dalam `cqw`, diukur dari contoh desain user) supaya identik di semua lebar; mobile punya versi bertumpuk.
  User iterasi banyak di sini — detail di `docs/design-system/08-imagery.md` › "Hero halaman fitur".

**Lainnya**

- Header: menu utama **rata kanan** di samping Log in + Book Demo (sebelumnya di tengah).
- Success Stories: hero baru `StoriesHero` + `ClientOrb` (orb seperti hero Home, tanpa logo Repskill, 5 logo klien
  melayang). Orb dipisah jadi komponen bersama `src/components/sections/shared/orb.tsx`.
- About: ikon di kartu The Mentor / The Builder (`DuoIcon tone="dark"`).
- Our Clients (logo) selalu tepat di atas CTA, hanya di Home & Success Stories (keputusan user: tidak ditambah ke halaman
  lain).

Semua pola/komponen baru sudah tercatat di `docs/design-system/06-components.md` dan `08-imagery.md`.

## 4. Hal terbuka

1. **Data uji di situs live.** Screenshot Content Manager (`src/assets/images/mockups/content-manager-review.webp`)
   menampilkan judul "Zz Validate Semi" + tabel uji. Minta user screenshot ulang dengan konten realistis.
2. **Section "Solution" di Home** — belum dijawab user. Opsi 1 (rekomendasi): ubah Platform Overview jadi "The Solution"
   / "Meet Repskill". Opsi 2: section Solution terpisah yang menjawab 3 masalah satu per satu.
3. **Foto terbatas (3 orang).** Wanita berhijab muncul dua kali di halaman Practice (hero + CTA); pria dengan laptop
   dipakai di hero Capture dan CTA Learn. Foto keempat akan menyelesaikan ini.
4. Nama fiktif dari deck (Pak Budi, PT Maju Logistik, Michael Tan, PT Kirana Cargo Nusantara, Sari W., dst.) dipakai
   sesuai keputusan user ("ikuti deck dulu").
5. Mockup `approval-queue` tidak dipakai lagi di halaman mana pun (masih terdokumentasi, bisa dihapus bila user mau).
6. Masih berlaku dari handover 7 Okt: custom domain, halaman Privacy/Terms.

## 5. Lingkungan Windows & jebakan teknis (mesin user)

- **Node tidak ada di PATH.** Pakai `C:\Program Files\nodejs\` (Node 22). Di PowerShell:
  `$env:Path = "C:\Program Files\nodejs;" + $env:Path` lalu `npm …`. Di tool Bash, `node`/`npm` tidak dikenali —
  pakai `"/c/Program Files/nodejs/node.exe"` atau jalankan npm lewat PowerShell.
- **Python tidak terpasang** (alias Microsoft Store saja). Baca PDF dengan `pdfjs-dist` di scratchpad.
- **Dev server:** `npm run dev` di port 3000 (jalankan di background). **Class Tailwind baru kadang tidak masuk ke CSS
  dev** (terjadi sekali dengan `top-[4%]`); kalau class ada di HTML tapi tidak berefek, cek CSS-nya lalu restart dev
  server. Build produksi selalu benar.
- **Cek visual:** Edge headless + DevTools Protocol (bukan `--screenshot` biasa: animasi `Reveal` tidak jalan dan hasil
  sering kosong). Jalankan Edge dengan `--headless=new --remote-debugging-port=9333 --user-data-dir=<scratchpad>`, lalu
  skrip Node (WebSocket bawaan Node 22) yang set viewport, navigate, scroll elemen ke tengah, tunggu ±3 dtk, lalu
  `Page.captureScreenshot` dengan `clip` elemen. Kutip ekspresi JS lewat file, bukan argumen PowerShell (tanda kutip
  dilucuti).
- **Gambar:** `sharp` tersedia di `node_modules` (dipakai Next). Crop/konversi WebP dengan skrip Node yang
  `require(<repo>/node_modules/sharp)`. Original disimpan di `docs/brand/screenshots/<nama>-original.png`.
- **`cqw` di elemen `@container` sendiri dihitung dari viewport**, bukan dari elemen itu. Untuk tinggi wadah pakai
  padding `%`; `cqw` hanya untuk anak-anaknya.
- File memakai CRLF; skrip `node -e` yang mencari string dengan `\n` bisa gagal — pakai tool Edit atau `sed`.
- Belum ada `gh` CLI. Status deploy: `https://api.github.com/repos/Whitespace-Solutions/Landing-Page-Repskill/actions/runs?per_page=1`.

## 6. Cara user bekerja (sesi ini)

- Bahasa Indonesia, instruksi singkat, sering dengan screenshot contoh. Iterasi visual cepat; kirim screenshot hasil
  kita sendiri dan cek di beberapa lebar (1440, 1024, HP) sebelum melapor.
- Commit lokal kecil per perubahan; **push hanya bila user minta** (push ke `main` = deploy).
- Bila user bilang "belum sama seperti contoh", ukur posisi elemen di gambar contoh secara proporsional, jangan menebak.

## 7. Cara mulai di sesi baru

1. `git status`, `git log --oneline -3`, `git worktree list` — harus bersih di `c351d21` (atau lebih baru bila user
   sudah lanjut).
2. Siapkan Node (bagian 5), `npm run lint && npm run typecheck && npm run build` sebagai sanity check, nyalakan
   `npm run dev`.
3. Tanyakan prioritas berikutnya; tawarkan hal terbuka di bagian 4 (terutama data uji "Zz Validate Semi" dan section
   Solution).
