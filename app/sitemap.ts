import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://orly.app",
      lastModified: new Date("2026-02-24"),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: "https://orly.app/faq",
      lastModified: new Date("2026-02-24"),
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];
}
