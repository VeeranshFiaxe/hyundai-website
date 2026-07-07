import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/data";

/* Single-page site for now. As dedicated model, blog and location pages
   are built, add them here (each with its own unique URL). */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
