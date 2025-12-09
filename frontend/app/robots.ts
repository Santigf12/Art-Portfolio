import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "GPTBot", disallow: "/" },
      { userAgent: "ClaudeBot", disallow: "/" },
      { userAgent: "Google-Extended", disallow: "/" },
      { userAgent: "Applebot-Extended", disallow: "/" },
      { userAgent: "CCBot", disallow: "/" },

      // allow normal crawlers
      { userAgent: "*", allow: "/" },
    ],
    sitemap: "https://ana-barbara.com/sitemap.xml",
  };
}