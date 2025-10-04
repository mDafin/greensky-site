// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const pathname = url.pathname;

  // Always add SEO/security headers for anything under /portal/*
  const res = NextResponse.next();
  if (pathname.startsWith("/portal")) {
    res.headers.set("X-Robots-Tag", "noindex, nofollow");
    res.headers.set("Cache-Control", "private, no-store");
    res.headers.set("Referrer-Policy", "no-referrer");
    res.headers.set("X-Frame-Options", "DENY");
    res.headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=()");
  }

  // Public portal routes (no auth needed)
  const publicPortalPaths = new Set<string>([
    "/portal",
    "/portal/",
    "/portal/request-access",
    "/portal/callback",
  ]);
  if (publicPortalPaths.has(pathname)) {
    return res; // keep headers, allow through
  }

  // Light client-side gate only for protected subtree (/portal/dashboard...)
  if (pathname.startsWith("/portal/dashboard")) {
    const hasSession = Boolean(req.cookies.get("gs_session")?.value);
    if (!hasSession) {
      const redirectUrl = new URL("/portal", req.url);
      redirectUrl.searchParams.set("next", pathname + (url.search || ""));
      return NextResponse.redirect(redirectUrl, { status: 302 });
    }
  }

  return res;
}

// Only run on /portal/* (not on /api/* etc.)
export const config = {
  matcher: ["/portal/:path*"],
};