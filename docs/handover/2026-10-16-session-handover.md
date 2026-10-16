# Handover — Website Repskill (per 16 Oktober 2026)

Lanjutan dari [`2026-10-14-session-handover.md`](2026-10-14-session-handover.md). Aturan kerja, brand, struktur halaman,
dan catatan lingkungan Windows di sana masih berlaku; dokumen ini mencatat apa yang berubah di sesi 14–16 Oktober dan
apa yang masih terbuka.

## 1. Status terakhir

- **Live:** `origin/main` = `73e0c13` ("Shorten the Pricing panel copy"), di-push 15 Okt atas permintaan user, deploy
  GitHub Actions sukses. URL: https://whitespace-solutions.github.io/Landing-Page-Repskill/
- **Belum di-push:** `main` lokal 11 commit di depan `origin/main` (`f38dd51..e0efb13`), semuanya tentang tampilan
  mobile (lihat bagian 3). Lint, typecheck, dan build lolos per commit. **Push hanya bila user minta** (push = deploy).
- **Working tree:** 8 file tercatat `M` (`demo-form.tsx`, file Guide, `client-logos.tsx`, `final-cta.tsx`,
  `story-card.tsx`, `story-toc.tsx`), tetapi **isinya tidak berubah**, hanya akhir baris LF/CRLF. Aman untuk
  `git checkout -- <file>` atau dibiarkan; jangan di-commit sebagai perubahan.
- **Dua sesi Claude bekerja bersamaan di folder utama** pada 16 Okt (melanggar aturan worktree di `CLAUDE.md`). Sesi
  kedua membuat `51fc390` dan `e0efb13`. Tidak ada bentrok, tetapi lain kali sesi kedua harus memakai `EnterWorktree`.

## 2. Yang berubah dan sudah live (sesi 14–15 Okt, 25 commit `c351d21..73e0c13`)

**Home**

- Platform Overview → **The Solution**: judul "Meet **Repskill** the One Platform to Capture,\nLearn, and Practice" (tanpa
  koma, `\n` + `singleLineTitle` = tepat dua baris mulai `lg`). Strip "Shared Foundation" dihapus.
- **How It Works dihapus.** Urutan: Hero → The Problem → The Solution → Why Repskill (latar abu) → Success Stories
  (latar putih) → Our Clients → CTA.
- Judul Why Repskill satu kalimat: "Built for **Indonesia** and governed for enterprise". Penutup The Problem: "Selling is
  a skill. Skills are built by **practice** rather than more content."

**Halaman fitur**

- Semua section Capture (3), Learn (3), Practice (4) memakai **video walkthrough** dari user (`public/media/*.mp4`,
  1280×720, H.264 CRF 26, faststart, tanpa audio, loop otomatis lewat `VideoMockup`; poster WebP frame pertama). Sumber:
  `D:\Repskill\Capture`, `D:\Repskill\Learn`, `D:\Repskill\Practice & Replection` (+ subfolder `ST`); Knowledge Universe
  versi baru dari `C:\Users\Sanusi\Downloads`. Screenshot lama yang tergantikan sudah dihapus.
- Practice: **Scenario Studio + You vs AI** dua blok dalam satu area abu (opsi baru `continued: true` di
  `FeatureBlockData`), **Session Review dihapus**, lalu Reflection Studio dan Team Dashboard.
- 40 dari 46 poin diringkas jadi satu baris. Judul section satu kalimat tanpa titik di tengah (aturan baru di
  `04-typography.md`). "Like ChatGPT" → "Like AI Chat".
- Tombol layar penuh (`ExpandableMedia`) jadi ikon bulat tanpa teks di pojok kanan bawah.

**Lainnya**

- Success Stories: tiap klien kartu putih; angka dalam kotak abu kecil dengan `DuoIcon` baru (`growth`, `practice`,
  `business`, dipilih lewat field `icon` metrik).
- About: timeline Our Approach berhenti di Reflect; `StepsTimeline` semua garis/titik amber (tanpa oranye terakhir).
- Pricing: section Tokens dihapus; harga jadi **satu panel putih 3 kolom bergaris** (Monthly · Annual · Add-on token,
  `plan-parts.tsx`, `token-addon.tsx` client), berjejer mulai `lg`, warna minimal (hanya tombol Annual oranye),
  keterangan ringkas ("Prices before PPN"). Jarak ke Feature Comparison dirapatkan.

## 3. Yang berubah tapi belum di-push (16 Okt, mobile)

Pola umum: **di bawah `lg` (1024px) rata tengah, mulai `lg` tata letak web tidak berubah.**

- Opsi baru `centerOnMobile` di `SectionHeader`, `PageHero`, `FeatureSplit`, `VisualCta` (poin/kartu/daftar tetap rata
  kiri). Dipakai di semua section Home, Success Stories (hero, Case Studies, kartu klien, halaman detail), halaman fitur,
  Pricing, dan About.
- Hero Home: dua baris di HP ("Make Sales" / "Expertise Scalable") dengan token baru **`text-display-mobile`**
  (`clamp(30px, 8.8vw, 35px)`, ±32px di 360, 35px mulai ±400; ukuran terbesar yang masih memuat "Expertise
  Measurable"). `<br className="sm:hidden" />` memaksa dua baris di HP lebar. Kata yang bergantian `text-left` di kotak
  lebarnya supaya tidak ada celah.
- Hero Success Stories: dua baris di HP dengan `text-h1 sm:text-display`.
- Tombol hero Home & Success Stories sejajar di HP (grid 2 kolom, `text-sm`, `px-3`, nowrap; normal mulai `sm`).
- Sesi kedua: hero `persona-scene` halaman fitur di HP mengikuti **sketsa user** (pop-up kiri atas, foto tengah, pop-up
  kanan foto, kartu kutipan di bawah) dan tabel Feature Comparison muat di HP (tanpa min-width 560px).

## 4. Hal terbuka

1. **Push 11 commit mobile** setelah user selesai review (preview HP di bawah).
2. **Video You vs AI / Scenario Studio** menampilkan nama "**sanusi (You)**" di layar panggilan; mungkin perlu rekam ulang
   dengan akun demo.
3. **Video Manage My Team** (Team Dashboard) menampilkan daftar tim kosong, padahal copy menjanjikan practice count,
   band, dan tren per rep.
4. **Video Manage Content** menampilkan Content Library, sedangkan judul section "Nothing goes live without review" lebih
   cocok dengan layar Content Approval.
5. **"14-day free trial · no card required"** hilang dari Pricing (diganti "Prices before PPN"). Tanyakan apakah free trial
   masih berlaku.
6. Judul About **"Capture expertise. Build skills. Scale capability"** masih ada titik di tengah (aturan baru: satu
   kalimat). Belum dijawab user.
7. Halaman detail success story belum memakai ikon di kotak angka (daftar sudah).
8. Mockup yang tidak dipakai lagi: `team`, `token-usage`, `approval-queue`, `bars` di halaman fitur (masih dipakai di
   Guide/Success Stories), dan tipe `screenshot` tidak dipakai di halaman fitur mana pun.
9. Masih dari handover sebelumnya: foto terbatas (3 orang), nama fiktif dari deck, custom domain, halaman Privacy/Terms.

## 5. Catatan teknis baru (tambahan bagian 5 handover 14 Okt)

- **ffmpeg** tidak terpasang. Dipakai `ffmpeg-static@5.2.0` di scratchpad (`npm install --prefix <scratchpad>/ff`).
  Kontak sheet: `-vf "fps=1/3.6,scale=960:-2,tile=2x2"`. Gabung dua video: filter `concat`.
- **Preview HP:** `next dev` memblokir aset dev dari IP LAN (`allowedDevOrigins`). Jangan ubah config; jalankan server
  statis kecil untuk `out/` di port 3001 (`0.0.0.0`), lalu buka `http://<IP-laptop>:3001/` (16 Okt: `192.168.1.12`).
  Setiap `npm run build` langsung memperbarui preview.
- **CRLF:** banyak file CRLF. Skrip Node yang mencari string multi-baris gagal (tanpa menulis). Pakai tool Edit, atau
  normalisasi `\r\n` dulu. `sed` dengan `\n` di pengganti menyisipkan baris baru sungguhan; jangan dipakai untuk menulis
  `\n` literal di Markdown/TS.
- **JSX:** bagian teks yang dipisah hanya dengan margin (mis. `<strong className="mr-1">…</strong>{text}`) tidak punya
  titik patah baris dan bisa keluar kartu; pakai `{" "}`.
- **Edge headless** bisa mati bila skrip screenshot error; jalankan ulang dengan argumen yang sama (port 9333).
- Emulasi lebar (`Emulation.setDeviceMetricsOverride`) hanya berlaku di koneksi DevTools yang sama; ukur komputasi CSS
  di skrip yang sama dengan navigasinya.

## 6. Cara user bekerja (sesi ini)

- Bahasa Indonesia, instruksi singkat dengan screenshot; sering mengirim pesan lanjutan di tengah pekerjaan (mis.
  "buat videonya looping", "untuk mobile version yaa"). Catatan "mobile" = di bawah `lg`, web tidak boleh berubah.
- "Satu kalimat" pada judul = tanpa titik di tengah dan tanpa koma yang memecah klausa. "Satu baris" kadang juga disebut
  "satu kalimat"; bila ragu, cek apakah yang dimaksud jumlah baris.
- Suka tampilan tenang: sedikit warna, teks ringkas, kartu putih di latar abu. Selalu cek di 360/390 (HP), 1024, 1280,
  1440 sebelum melapor; user sering memakai laptop dengan zoom 100% di lebar ±1230–1280px.
- Commit lokal kecil per perubahan; push hanya bila diminta ("commit and push").

## 7. Cara mulai di sesi baru

1. `git status`, `git log --oneline -12`, `git worktree list`. Pastikan tidak ada sesi lain di folder utama; bila perlu
   sesi kedua, pakai worktree.
2. Siapkan Node (handover 14 Okt bagian 5), `npm run lint && npm run typecheck && npm run build`, `npm run dev`.
3. Tanyakan apakah 11 commit mobile siap di-push, lalu tawarkan hal terbuka di bagian 4 (nama "sanusi" di video, free
   trial, judul About).
