# 07 · Motion

Animasi memperkuat cerita **Expertise → Capability → Performance**: sesuatu bertumbuh, mengisi, bergerak maju. Animasi
bukan dekorasi.

Library: **Motion** (`import { motion } from "motion/react"`).

## Prinsip

1. **Halus dan cepat.** Masuk 0.6–0.8 detik, interaksi (hover, dropdown) 0.15–0.25 detik.
2. **Satu arah.** Elemen masuk dengan fade + naik 24px. Hindari zoom besar, rotasi, bounce berlebihan, dan parallax yang
   membuat pusing.
3. **Berurutan.** List/grid muncul satu per satu (stagger 0.08–0.12 detik).
4. **Sekali saja.** Animasi scroll hanya diputar saat pertama kali terlihat (`viewport.once`).
5. **Bermakna.** Progress bar mengisi, avatar tim "pop" satu per satu, garis alur tersambung. Gerakan harus menjelaskan
   konsep.
6. **Aksesibel.** `MotionProvider` (`reducedMotion="user"`) otomatis mematikan animasi transform bila pengguna memilih
   reduce motion. Konten harus tetap terbaca tanpa animasi.

## Token

| Hal          | Nilai                                                                                                                                                              |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Easing utama | `[0.22, 1, 0.36, 1]` (`EASE_OUT` di JS, `ease-brand` di CSS)                                                                                                       |
| Masuk        | `duration: 0.7`                                                                                                                                                    |
| Stagger      | `0.08` (kartu) · `0.12` (stage alur)                                                                                                                               |
| Hover        | `transition-colors duration-200`, kartu naik `-translate-y-0.5`                                                                                                    |
| Spring (pop) | `{ type: "spring", stiffness: 320, damping: 20 }`                                                                                                                  |
| Orb hero     | `animate-orb-spin` (64 dtk/putaran) · `animate-orb-breathe` (9 dtk, skala 1.045) · `animate-orb-glow` (8 dtk) · `animate-hex-float` (9 dtk, naik 15px + putar 13°) |

## Komponen siap pakai (`src/components/motion/reveal.tsx`)

```tsx
<Reveal>…</Reveal>                    // fade + naik saat masuk layar
<Reveal delay={0.2} as="section">…</Reveal>

<Stagger className="grid gap-4 md:grid-cols-3">   // anak-anaknya muncul berurutan
  {items.map((i) => <StaggerItem key={i.id}>…</StaggerItem>)}
</Stagger>
```

Komponen ini bisa dipakai langsung dari Server Component. Buat client component sendiri (`"use client"`) hanya untuk
animasi khusus, misalnya visual hero.

## Pola yang sudah dipakai

- **Hero Home:** eyebrow, judul, paragraf, dan tombol masuk berurutan (fade + naik). Ilustrasi `HeroOrb` masuk dengan fade +
  skala 0.9 → 1 (0.9 dtk, jeda 0.25 dtk), lalu terus bergerak pelan: wireframe berputar dan "bernapas", glow berdenyut,
  dua heksagon garis melayang sambil berputar sedikit (`animate-hex-float`, 9 / 7.5 dtk). Logo Repskill di tengah
  **tidak ikut berputar**, hanya naik-turun pelan (`animate-float-soft`, 7 dtk, 10px). Tiga foto + kartu Capture / Learn /
  Practice juga `animate-float-soft` dengan durasi berbeda (8 / 9.5 / 8.5 dtk). Dengan mouse, semua elemen bergeser
  mengikuti kursor dengan kedalaman berbeda (parallax, spring `stiffness 60, damping 20`). Parallax mati di layar sentuh dan saat "reduce motion"; animasi CSS memakai
  `motion-safe:` sehingga ikut berhenti.
- **Kata bergantian di judul hero Home (`RotatingWords`):** kata oranye berganti setiap 2 detik dengan urutan
  Scalable. → Accessible. → Actionable. → Measurable. → kembali ke Scalable. Kata lama naik keluar (y 0 → -100%),
  kata baru naik masuk dari bawah (y 100% → 0), 0.5 detik, `EASE_OUT`, tanpa fade. Dipotong tepat di tinggi huruf
  (`overflow-hidden` + `clip-path: inset(0.1em 0 0.1em 0)`), jadi kata tidak terlihat di atas atau di bawah baris.
  "Scalable." selalu tampil pertama (tagline brand). Saat "reduce motion" kata tetap "Scalable.".
- **Header:** garis aktif oranye bergeser antar menu (`layoutId`), dropdown fade + scale 0.98 → 1, menu mobile slide.
- **Timeline gelap:** stage muncul berurutan dari kiri.
- **CTA penutup:** teks masuk dengan `Reveal`, tanpa dekorasi bergerak.
- **Footer:** `Wireframe` oranye (opacity 18%) di kanan berputar sangat pelan, 1 putaran per 150 detik
  (`motion-safe:animate-spin-slow`). Ini satu-satunya animasi berulang di luar marquee, dan berhenti bila "reduce
  motion" aktif.
- **Skew + Motion:** elemen `motion.*` yang dianimasikan transform-nya (x, y, scale) tidak bisa memakai class
  `-skew-x-*`, karena transform inline dari Motion menimpanya. Pakai `style={{ skewX: -20 }}`.
- **Our Clients (marquee):** logo berjalan dari kiri ke kanan tanpa putus (`animate-marquee-right`, kecepatan diatur
  lewat `--marquee-duration`, sekitar 4 detik per logo), dengan tepi kiri-kanan memudar. Berhenti saat di-hover, dan
  berganti menjadi grid statis bila "reduce motion" aktif. Komponen: `ClientLogos`.
