import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const languages = { uk: `${site.url}/`, ru: `${site.url}/ru` };
  return [
    { url: `${site.url}/`, lastModified: new Date(), changeFrequency: "monthly", priority: 1, alternates: { languages } },
    { url: `${site.url}/ru`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9, alternates: { languages } },
  ];
}
