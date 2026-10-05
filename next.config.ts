import type { NextConfig } from "next";

// Diisi otomatis oleh GitHub Actions saat deploy ke GitHub Pages tanpa custom domain
// (mis. "/repskill-web"). Kosong untuk custom domain / hosting lain.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  // Static export: `npm run build` menghasilkan folder `out/` berisi HTML/CSS/JS
  // yang bisa di-host di mana saja (GitHub Pages, Netlify, Cloudflare Pages, cPanel, S3).
  output: "export",
  trailingSlash: true,
  basePath,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
