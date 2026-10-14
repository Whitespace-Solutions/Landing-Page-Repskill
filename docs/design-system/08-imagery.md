# 08 · Imagery & Icons

## Ilustrasi = mockup UI produk

Repskill tidak memakai ilustrasi kartun, dan foto hanya di tempat yang disebut di bagian [Foto](#foto). Visual dibangun dari **mockup UI produk yang disederhanakan**
dan dibuat dengan HTML/Tailwind (bukan gambar), misalnya:

- kutipan top performer di kartu putih (italic),
- list learning path dengan dot status (done amber · now oranye · todo abu),
- bubble chat AI buyer vs rep (buyer abu muda kiri, rep `brand-linen` kanan),
- bar strengths/gaps (amber = strength, Shadow Grey = gap) + badge oranye "Next action",
- grid avatar inisial tim dengan progress bar mini.

Aturan mockup:

- Wadah: `rounded-panel` / `rounded-card`, background `surface` atau `brand-linen`.
- Garis "teks palsu" (skeleton): `h-2 rounded bg-brand-grey` (utama) dan `bg-line` (sekunder).
- Ukuran teks mikro di dalam mockup (11–13px) diperbolehkan, khusus di dalam ilustrasi.
- Konten mockup harus realistis dan relevan dengan sales (pricing objection, discovery call, decision process).
- Jangan menampilkan angka hasil customer yang belum terverifikasi.

## Ikon

- Gaya **outline / stroke**: `stroke-width 2`, `stroke-linecap round`, `stroke-linejoin round`, `fill none`, warna
  `currentColor`.
- Ukuran 14–20px, viewBox `0 0 24 24`. Selalu `aria-hidden` bila hanya dekoratif.
- Set yang dipakai: panah (`ArrowRight`), chevron, check, lock, refresh/loop, menu, close.
- Ikon alur produk (`FeatureIcon`): Capture = bingkai bidik + lampu, Learn = buku terbuka, Practice = dua balon chat.
  Di dropdown desktop tampil dalam kotak `size-10 rounded-xl bg-brand-orange/10 text-brand-orange`; di menu mobile 18px
  oranye di kiri label. Kalau butuh banyak ikon,
  pakai `lucide-react` (gaya yang sama).
- Ikon dua warna (`DuoIcon`, `src/components/ui/duo-icon.tsx`): garis utama `stroke-brand-grey` + satu aksen
  `stroke-brand-orange`, stroke 1,75, ukuran 40px di pojok kiri atas kartu. Dipakai di kartu The Problem (Home):
  `ramp` (jam pasir), `pitch` (balon chat dengan bar tidak rata), `walkout` (pintu + panah keluar). Tetap garis, bukan isi.
  Varian `tone="dark"` untuk latar gelap: garis utama putih + aksen amber. Dipakai di kartu Our Philosophy (About):
  `mentor` (orang + balon chat) dan `builder` (balok bertumpuk), 44px di atas eyebrow.
- Jangan pakai ikon solid/filled warna-warni atau emoji.

## Motif garis miring

Diambil dari symbol logo (panah/garis miring R):

- Eyebrow/label section **tanpa** aksen strip miring di depannya (dihapus di seluruh situs, keputusan 2026-10-07).
- Strip miring kecil hanya tersisa sebagai bullet daftar "What to Expect" di halaman Book Demo.
- Panel `FinalCta` sengaja polos, tanpa bilah miring dekoratif (keputusan 2026-10-06).

## Wireframe poligon

Grafik garis poligon (komponen `Wireframe`, diambil dari referensi Whitespace Talents Landing). Warna mengikuti
`text-*` (`fill="currentColor"`).

- Dipakai di footer: `text-brand-orange opacity-18`, lebar maks. 280px (mobile) / 340px (sm) / 380px (lg), di pojok kanan bawah, digeser 19% ke kanan dan ke bawah sehingga
  ±65% bentuknya terlihat (sisanya terpotong tepi footer), di belakang teks.
- Dipakai di hero Home sebagai ilustrasi utama (`HeroOrb`): wireframe `text-brand-orange` penuh, dengan glow oranye lembut
  (`bg-orb-glow`), ring orbit oranye tipis, heksagon garis (`HexOutline`; satu oranye kanan atas, satu Shadow Grey di atas foto Learn), dan logo Repskill (`src/assets/brand/repskill-icon.svg`, file resmi, tidak diubah) di tengah.
- Dipakai juga di hero Success Stories (`ClientOrb` + `StoriesHero`): orb yang sama (komponen bersama `Orb`,
  `src/components/sections/shared/orb.tsx`) **tanpa** logo Repskill di tengah, dikelilingi 5 kartu putih berisi logo
  klien (`clients`) yang melayang + parallax di sudut-sudut luar wireframe, plus heksagon garis oranye dan abu.
- Selain tempat-tempat itu, wireframe hanya dipakai sebagai latar dekoratif di section gelap, dengan teks selalu di atasnya.
- Maksimal satu motif dekoratif per section. Jangan sampai menutupi teks.

## Foto

Foto orang di situasi kerja (tim sales, coaching), pencahayaan natural, tanpa filter berwarna. Letakkan di
`src/assets/images/` dan import statis (supaya ukuran & `basePath` benar).

- **Hero Home:** tiga potret berbingkai heksagon (PNG transparan, sumber `Logo Final Repskill/Image *.png`) di
  `src/assets/images/hero/`, masing-masing dipasangkan dengan kartu keterangan putih (ikon `FeatureIcon` dalam kotak
  oranye + judul + satu baris penjelasan). Urutan Capture (kiri atas) → Learn (kiri bawah) → Practice (kanan). Foto, kartu, dan heksagon **tidak boleh menabrak wireframe** yang berputar: kartu ditempatkan di sudut-sudut di luar lingkarannya (jarak ±20px di desktop), dan tiap kartu sedikit menumpuk fotonya (Capture di kanan atas foto, Learn di kanan bawah, Practice di bawah foto). Di mobile wireframe dikecilkan ke 64% supaya kartu tetap renggang. Di bawah layar `xl` kartu hanya menampilkan judul. Seluruh ilustrasi (termasuk kartu Practice) tetap di dalam batas lebar konten `Container` — di `lg` wadahnya 82% lebar kolom dan digeser 6% dari kiri — dan heksagon abu berada di luar ring orbit oranye.
- **Hero halaman fitur (mockup `persona-scene`, contoh desain 2026-10-13; Capture, Learn, Practice):** mulai `sm` komposisi ini **satu
  kesatuan yang diskalakan** dengan lebar wadah (`@container`): semua posisi, ukuran elemen, dan ukuran teks memakai `cqw`
  yang diukur langsung dari contoh desain, jadi proporsinya sama persis di semua lebar (tanpa varian per breakpoint).
  Isinya: foto heksagon besar pria dengan laptop (`cta/learn-portrait.webp`) di kiri sebagai latar, kartu kutipan
  (`SceneQuote`) di kanan atas menumpuk sisi kanan foto, pop-up "Extraction Studio" di bawah kartu, pop-up "Draft article
  ready" menumpuk bagian bawah foto, heksagon isi oranye kecil di kiri dan heksagon garis oranye kecil di kanan bawah.
  `PageHero` memberi komposisi ini kolom visual lebih lebar (`lg:grid-cols-[1fr_1.25fr]`, `gap-10`). Di mobile (< `sm`)
  versi bertumpuk dengan ukuran teks tetap (px). Untuk mengubah posisi, ubah angka `cqw`/`%` di `PersonaSceneMockup`.
  Foto dan isi per halaman: Capture = pria dengan laptop (`cta/learn-portrait`), kartu kutipan top performer; Learn =
  wanita dengan laptop (`cta/capture-portrait`), kartu AI Chat + sumber, pop-up Learning Path & Test passed; Practice =
  wanita berhijab dengan tablet (`cta/practice-portrait`), kartu AI buyer + coach tip, pop-up Live roleplay & Scorecard.
  Kartu (`SceneQuote`) diisi data: `badge` (teks di lingkaran), `kicker`, `role`, `parts`, `quoted`, `footerLabel`, `tags`.
  Ikon pop-up: `mic` · `document` · `path` · `check` · `chart`. Jaga `role` cukup pendek agar satu baris.
- **CTA halaman fitur (`VisualCta`):** potret heksagon besar (sumber sama: `Image Capture.png`, `Image Learn.png`,
  `Image Practice.png`) disimpan sebagai WebP 560–600px (30–40 KB, tidak diperbesar dari aslinya) di `src/assets/images/cta/`.
- **Rekaman layar produk (mockup `video`):** GIF dari user dikonversi ke MP4 H.264 (dipotong ke jendela aplikasi, tanpa
  margin putih, tanpa suara) di `public/media/`, plus poster WebP dari frame pertama di `src/assets/images/mockups/`.
  Jangan memakai GIF mentah: Reflection Studio 7,9 MB GIF → 1,4 MB MP4. Ditampilkan `VideoMockup` di kartu
  `rounded-card border border-line shadow-float`, autoplay tanpa suara + loop hanya saat terlihat; saat "reduce motion"
  tidak diputar dan kontrol muncul. Path di `src` tanpa basePath (ditambahkan otomatis). Isi `label` untuk pembaca layar.
  Di `FeatureSplit`, section dengan video memakai kolom visual lebih lebar (1.35fr : 1fr) dan bingkai panel tipis
  (`p-2 sm:p-3`). Potong juga elemen yang tidak boleh publik (mis. status bar browser berisi URL staging).
  **Walkthrough MP4 yang sudah diedit** (dengan zoom/pan, mis. section di halaman Capture, Learn Knowledge, dan Practice) tidak dipotong:
  cukup kompres ke 1280×720, H.264 CRF 26, `yuv420p`, `+faststart`, tanpa audio (±1,2–1,8 MB per 15 dtk). Nama file
  `<fitur>-<layar>.mp4` + poster `<fitur>-<layar>-poster.webp`.
- **Screenshot produk (mockup `screenshot`):** dipotong ke area fitur (tanpa sidebar navigasi aplikasi supaya teks
  tetap terbaca), lebar 1400px WebP (±40 KB) di `src/assets/images/mockups/`; file asli di `docs/brand/screenshots/`.
  Bingkai, kolom lebar, dan panel tipis sama dengan mockup `video`. Isi `alt` yang menjelaskan isi layar. Saat ini
  tidak dipakai: section fitur yang punya rekaman produk memakai video walkthrough.
- **Screenshot berganti di kartu kecil (`ScreenshotCarousel`):** dipotong ke area fitur dengan rasio ±2,1:1 (rasio kotak
  pratinjau kartu The Solution di Home), lebar 800px WebP (±20–30 KB). Jangan sertakan data uji (mis. judul "Zz Validate…")
  di area potongan, juga sorotan teks (blok seleksi biru): potong di bawahnya atau ambil ulang screenshot. Nama file
  `<fitur>-<layar>.webp`, mis. `capture-extraction-studio`, `learn-ai-chat`, `practice-reflection-studio`.
- **Screenshot satu kartu/panel aplikasi** (mis. panel review Content Manager): potong tepat di dalam border kartunya,
  tanpa latar abu aplikasi dan tanpa border kartu itu sendiri, supaya bingkai `screenshot` situs jadi satu-satunya border.
  Tutup scrollbar aplikasi dengan warna latar kartu.
- **Layar penuh:** semua mockup `screenshot` dan `video` otomatis bisa dibuka layar penuh (`ExpandableMedia`). Di dalam
  lightbox, video diputar dengan kontrol. Karena aset 1400px, tampil tajam di layar biasa; untuk layar retina lebar,
  siapkan versi lebih besar bila perlu.
- Static export tidak mengoptimasi gambar: perkecil dulu ke ±2× ukuran tampil (foto hero: lebar 340px, <150 KB).
- `alt` deskriptif untuk foto yang membawa informasi; `alt=""` bila dekoratif (seperti di ilustrasi hero yang seluruhnya
  `aria-hidden`).

## Logo klien

- File siap pakai ada di `src/assets/clients/`: PNG berlatar **transparan**, sudah di-crop rapat, tinggi maksimal 160px.
  File asli dari klien disimpan di `docs/brand/clients/`.
- Daftar logo wall ada di `src/content/clients.ts`: klien dengan success story ikut otomatis, klien lain ditambahkan di
  `otherClients`.
- Logo wall ("Our Clients"): logo tampil **berwarna penuh, tanpa kotak/outline**, berjalan sebagai marquee
  kiri → kanan (lihat [07-motion.md](07-motion.md)). Logo sedikit membesar saat di-hover.
- Di kartu success story dan halaman klien, logo tampil **berwarna penuh**.
- Jangan recolor, stretch, atau memberi efek pada logo klien. Ukuran diatur lewat `max-h-*`, dengan lebar mengikuti
  proporsi aslinya.
- Logo berlatar gelap (mis. ASCO) dibuat transparan dulu, dengan warna aslinya dipertahankan.
