// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const WINDOW = 60_000; const LIMIT = 60; // 60 req/min per IP
const map = new Map<string, { count: number; start: number }>();

export function middleware(req: NextRequest) {
  const ip = req.ip ?? req.headers.get("x-forwarded-for") ?? "unknown";
  const now = Date.now();
  const rec = map.get(ip) ?? { count: 0, start: now };
  if (now - rec.start > WINDOW) { rec.count = 0; rec.start = now; }
  rec.count++; map.set(ip, rec);
  if (rec.count > LIMIT) return new NextResponse("Too Many Requests", { status: 429 });
  return NextResponse.next();
}

// Optionally limit only APIs
export const config = { matcher: ["/api/:path*"] };
