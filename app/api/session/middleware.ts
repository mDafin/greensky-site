// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// ---- Config ----
const WINDOW_MS = 60_000; // 1 minute
const LIMIT = 60;         // 60 requests per WINDOW per IP

// Keep the in-memory map stable across hot reloads in dev
const globalAny = globalThis as unknown as {
  __rateMap?: Map<string, { count: number; start: number }>;
};
const hits =
  globalAny.__rateMap ||
  (globalAny.__rateMap = new Map<string, { count: number; start: number }>());

// Robust IP extraction from common proxy headers
function getClientIp(req: NextRequest): string {
  // X-Forwarded-For: "client, proxy1, proxy2"
  const xff = req.headers.get("x-forwarded-for");
  if (xff) {
    const first = xff.split(",")[0].trim();
    if (first) return first;
  }

  // Common vendor headers
  const candidates = [
    "x-real-ip",
    "cf-connecting-ip",
    "fastly-client-ip",
    "x-client-ip",
    "x-cluster-client-ip",
    "forwarded", // RFC 7239, e.g. 'for=1.2.3.4'
  ];

  for (const h of candidates) {
    const v = req.headers.get(h);
    if (!v) continue;
    if (h === "forwarded") {
      // naive parse: look for for=...
      const m = v.match(/for="?([\w\.:]*)"?/i);
      if (m?.[1]) return m[1];
    } else {
      return v;
    }
  }

  // Last resort: use a stable per-connection key
  return "unknown";
}

export function middleware(req: NextRequest) {
  const ip = getClientIp(req);

  const now = Date.now();
  const rec = hits.get(ip) ?? { count: 0, start: now };

  // reset window
  if (now - rec.start > WINDOW_MS) {
    rec.count = 0;
    rec.start = now;
  }

  rec.count++;
  hits.set(ip, rec);

  if (rec.count > LIMIT) {
    const res = new NextResponse("Too Many Requests", { status: 429 });
    res.headers.set("Retry-After", String(Math.ceil(WINDOW_MS / 1000)));
    return res;
  }

  const res = NextResponse.next();
  res.headers.set("X-RateLimit-Limit", String(LIMIT));
  res.headers.set("X-RateLimit-Remaining", String(Math.max(0, LIMIT - rec.count)));
  return res;
}

// Only run on API routes (adjust if you want to include pages)
export const config = { matcher: ["/api/:path*"] };
