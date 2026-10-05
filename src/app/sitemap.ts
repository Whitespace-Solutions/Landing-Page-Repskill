import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { allRoutes } from "@/content/navigation";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return allRoutes.map((route) => ({
    url: new URL(route, siteConfig.url).toString(),
    lastModified: new Date(),
  }));
}
