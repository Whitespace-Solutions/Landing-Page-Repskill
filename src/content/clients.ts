/**
 * Logo di section "Our Clients".
 * Klien yang punya success story otomatis ikut (dengan link ke halamannya);
 * klien lain cukup ditambahkan di `otherClients`. Simpan logonya di src/assets/clients/.
 */
import type { StaticImageData } from "next/image";
import whitespaceLogo from "@/assets/clients/whitespace.png";
import { successStories } from "./success-stories";

export type Client = { name: string; logo: StaticImageData; href?: string };

const otherClients: Client[] = [{ name: "Whitespace Solutions", logo: whitespaceLogo }];

export const clients: Client[] = [
  ...successStories.map((s) => ({ name: s.name, logo: s.logo, href: `/success-stories/${s.slug}/` })),
  ...otherClients,
];
