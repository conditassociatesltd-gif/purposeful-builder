import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Keep the private admin area and the order/payment APIs out of search engines
      disallow: ["/admin", "/api/"],
    },
    sitemap: "https://austinokechukwu.com/sitemap.xml",
  };
}
