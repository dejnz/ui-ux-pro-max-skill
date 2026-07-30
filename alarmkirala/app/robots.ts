import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/hesap", "/admin", "/styleguide"],
    },
    sitemap: "https://alarmkirala.com/sitemap.xml",
  };
}
