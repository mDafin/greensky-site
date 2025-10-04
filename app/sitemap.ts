// app/sitemap.ts
import { MetadataRoute } from "next";
import { discoverStaticAppRoutes, priorityForPath } from "@/lib/sitemap";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "") ??
    "https://greensky.example";

  // Auto-discover static app routes
  const routes = discoverStaticAppRoutes();

  // Optional manual additions or removals
  const manualAdditions: string[] = []; // e.g., ["/careers"]
  const manualExclusions: string[] = [
    "/portal", // belt & suspenders
  ];

  const lastMod = new Date().toISOString();

  const finalPaths = Array.from(
    new Set([...routes, ...manualAdditions])
  ).filter((p) => !manualExclusions.includes(p));

  return finalPaths.map((p) => ({
    url: `${siteUrl}${p}`,
    lastModified: lastMod,
    changeFrequency: p === "/" ? ("weekly" as const) : ("monthly" as const),
    priority: priorityForPath(p),
  }));
}