# 08 · Imagery & Icons

## Ilustrasi = mockup UI produk

Repskill tidak memakai foto stok atau ilustrasi kartun. Visual dibangun dari **mockup UI produk yang disederhanakan**
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
- Set yang dipakai: panah (`ArrowRight`), chevron, check, lock, refresh/loop, menu, close. Kalau butuh banyak ikon,
  pakai `lucide-react` (gaya yang sama).
- Jangan pakai ikon solid/filled warna-warni atau emoji.

## Motif garis miring

Diambil dari symbol logo (panah/garis miring R):

- Aksen eyebrow: `h-1 w-[18px] -skew-x-[38deg] bg-brand-orange`.
- Panel `FinalCta` sengaja polos, tanpa bilah miring dekoratif (keputusan 2026-10-06).

## Wireframe poligon

Grafik garis poligon (komponen `Wireframe`, diambil dari referensi Whitespace Talents Landing). Warna mengikuti
`text-*` (`fill="currentColor"`).

- Dipakai di footer: `text-brand-orange opacity-45`, di sisi kanan, terpotong tepi footer, di belakang teks.
- Hanya sebagai latar dekoratif di section gelap, dengan teks selalu di atasnya. Maksimal satu per halaman.
- Maksimal satu motif dekoratif per section. Jangan sampai menutupi teks.

## Foto (bila nanti dibutuhkan)

Foto orang asli di situasi kerja nyata (tim sales, coaching), pencahayaan natural, tanpa filter berwarna. Letakkan di
`public/images/` atau `src/assets/images/` dan selalu isi `alt` yang deskriptif.

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
