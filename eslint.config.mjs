import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

// Token warna dari brand guideline LAMA (dihapus 06-10-2026). Tailwind tidak error untuk class yang tidak ada —
// elemen hanya tampil tanpa warna — jadi lint yang menjaganya. Pengganti: docs/design-system/03-color.md
const OLD_COLOR_TOKENS = String.raw`/brand-(slate|teal|cyan)|surface-ice|-ink\b|--color-ink/`;
const OLD_COLOR_MESSAGE =
  "Token warna lama (brand guideline sebelum 05.10.26). Pakai brand-grey / brand-charcoal / brand-amber / brand-linen — lihat docs/design-system/03-color.md.";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    files: ["src/**/*.{ts,tsx}"],
    rules: {
      "no-restricted-syntax": [
        "error",
        { selector: `Literal[value=${OLD_COLOR_TOKENS}]`, message: OLD_COLOR_MESSAGE },
        { selector: `TemplateElement[value.raw=${OLD_COLOR_TOKENS}]`, message: OLD_COLOR_MESSAGE },
      ],
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Worktree sesi paralel (lihat CLAUDE.md) — jangan ikut di-lint dari folder utama
    ".claude/**",
  ]),
]);

export default eslintConfig;
