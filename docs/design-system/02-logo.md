# 02 · Logo

Logo menggabungkan **symbol** (huruf R dengan panah oranye) dan **wordmark** "Rep" + "skill".

## File

| Varian               | File (`src/assets/brand/`)  | Kapan dipakai                            |
| -------------------- | --------------------------- | ---------------------------------------- |
| Full color (primary) | `repskill-logo.png`         | Background putih/terang (header)         |
| Reversed             | `repskill-logo-reverse.png` | Background Slate/Graphite/gelap (footer) |
| Symbol / icon        | `repskill-icon.png`         | Favicon, avatar, ruang sangat kecil      |

Pakai lewat `next/image` dengan static import, contoh `import logo from "@/assets/brand/repskill-logo.png"`.
File asli resolusi penuh ada di `docs/brand/logo/`.

## Ukuran

| Konteks             | Lebar |
| ------------------- | ----- |
| Digital, disarankan | 150px |
| Digital, minimum    | 120px |
| Small UI / icon     | 70px  |

Header memakai lebar 126px dan footer 150px. Jangan mengecilkan logo lengkap sampai wordmark "repskill" sulit dibaca.

## Clear space

Area kosong di sekeliling logo minimal **1× unit symbol**. Tidak boleh ada teks, gambar, atau elemen UI yang masuk ke area ini.

## Larangan

Jangan **stretch**, **recolor**, **rotate**, **memberi efek** (shadow, glow, gradient, outline), **crowd** (menempel ke elemen
lain), atau **mengubah proporsi**. Pilih varian yang kontrasnya cukup dengan background. Jangan membuat logo baru dengan CSS/SVG.

## Motif turunan

Garis miring pada symbol boleh dipakai sebagai **aksen dekoratif** (lihat [08-imagery.md](08-imagery.md#motif-garis-miring)),
tapi bukan sebagai pengganti logo.
