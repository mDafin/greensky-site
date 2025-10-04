// app/robots.ts
import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://greensky.example";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/portal"], // keep lender portal private
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}