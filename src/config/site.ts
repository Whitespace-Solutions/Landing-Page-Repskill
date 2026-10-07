/** Konfigurasi global situs. Ubah `url` saat domain final sudah ditentukan. */
export const siteConfig = {
  name: "Repskill",
  tagline: "Make Sales Expertise Scalable",
  description:
    "Repskill turns the knowledge of your best people into skills your whole sales team can build.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://repskill.ai",
  locale: "en_US",
} as const;
