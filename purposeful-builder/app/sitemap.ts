import type { MetadataRoute } from "next";
import { getAllEssays } from "@/lib/essays";

export const dynamic = "force-static";

const BASE_URL = "https://austinokechukwu.com";

const categories = [
  "identity",
  "purpose",
  "faith-process",
  "marriage-life",
  "building",
  "wealth",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const essays = getAllEssays();

  const essayUrls: MetadataRoute.Sitemap = essays.map((essay) => ({
    url: `${BASE_URL}/writing/${essay.slug}`,
    lastModified: essay.date ? new Date(essay.date) : new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const categoryUrls: MetadataRoute.Sitemap = categories.map((slug) => ({
    url: `${BASE_URL}/category/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/writing`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/search`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.5,
    },
    ...categoryUrls,
    ...essayUrls,
  ];
}
