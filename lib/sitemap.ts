// lib/sitemap.ts
import fs from "node:fs";
import path from "node:path";

/**
 * Walk the /app directory and discover static routes that have a page.(tsx|jsx|mdx).
 * Excludes: api routes, dynamic segments ([...]), portal/*, route groups (folders in ()), and _private-like folders.
 */
export function discoverStaticAppRoutes(appDir = path.join(process.cwd(), "app")): string[] {
  const results: string[] = [];

  function walk(currentDir: string, segs: string[]) {
    // Skip entire subtrees we don't want in the sitemap
    const rel = path.relative(appDir, currentDir).replace(/\\/g, "/");
    if (
      rel.startsWith("api") ||
      rel.startsWith("portal") ||                // keep portal out of SEO
      rel.startsWith("_")                        // any private convention
    ) {
      return;
    }

    // If this directory contains a page file, record the route
    const entries = fs.readdirSync(currentDir, { withFileTypes: true });
    const hasPage = entries.some((e) =>
      e.isFile() && /^(page)\.(tsx|jsx|mdx)$/.test(e.name)
    );

    if (hasPage) {
      const route = "/" + segs.filter(Boolean).join("/");
      results.push(route || "/");
    }

    // Recurse into subfolders
    for (const entry of entries) {
      if (!entry.isDirectory()) continue;

      const name = entry.name;

      // Ignore route groups: (marketing) → does not appear in the URL
      const isRouteGroup = name.startsWith("(") && name.endsWith(")");
      // Ignore dynamic segments: [slug], [...catchAll]
      const isDynamic = name.includes("[") || name.includes("]");

      if (isRouteGroup) {
        walk(path.join(currentDir, name), segs); // don’t add to URL path
      } else if (isDynamic) {
        // skip dynamic routes by default (you can add a data-driven sitemap later)
        continue;
      } else {
        walk(path.join(currentDir, name), [...segs, name]);
      }
    }
  }

  walk(appDir, []);
  // De-dupe and sort for stability
  return Array.from(new Set(results)).sort((a, b) => a.localeCompare(b));
}

/**
 * Simple priority rules you can tweak per path.
 */
export function priorityForPath(p: string): number {
  if (p === "/") return 1.0;
  if (p === "/security") return 0.8;
  if (p === "/contact") return 0.6;
  if (p.startsWith("/portal")) return 0.1; // should be excluded already
  return 0.5;
}