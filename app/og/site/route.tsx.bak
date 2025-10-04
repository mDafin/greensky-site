// app/og/site/route.ts
import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Green Sky — E-Commerce Platform";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export async function GET() {
  const accent = "#57B6B2"; // your brand accent (tweak if you changed it)

  return new ImageResponse(
    (
      <div
        style={{
          width: size.width,
          height: size.height,
          display: "flex",
          background:
            "linear-gradient(135deg, #0b0b0b 0%, #121212 60%, #1a1a1a 100%)",
          fontFamily:
            "Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto",
          color: "#fff",
        }}
      >
        {/* Left copy */}
        <div
          style={{
            flex: 1.25,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "72px",
          }}
        >
          <div
            style={{
              fontSize: 20,
              textTransform: "uppercase",
              letterSpacing: "0.18em",
              color: "rgba(255,255,255,0.65)",
            }}
          >
            E-Commerce Platform
          </div>

          <div style={{ marginTop: 14, fontSize: 64, fontWeight: 800, lineHeight: 1.05 }}>
            Powering Global Commerce
          </div>

          <div
            style={{
              marginTop: 16,
              fontSize: 28,
              color: "rgba(255,255,255,0.88)",
              fontWeight: 500,
              maxWidth: 720,
            }}
          >
            Storefronts, AI logistics, secure payments, and growth solutions —
            built for enterprise scale.
          </div>

          <div style={{ marginTop: 40, display: "flex", alignItems: "center", gap: 14 }}>
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: "50%",
                background: accent,
              }}
            />
            <div style={{ fontSize: 24, color: "rgba(255,255,255,0.9)", fontWeight: 600 }}>
              Green Sky
            </div>
          </div>
        </div>

        {/* Right panel (soft abstract grid) */}
        <div
          style={{
            width: size.width * 0.45,
            height: "100%",
            position: "relative",
            overflow: "hidden",
            background:
              "radial-gradient(1200px 600px at 100% 0%, rgba(87,182,178,0.18), rgba(87,182,178,0) 60%), radial-gradient(900px 500px at 100% 100%, rgba(87,182,178,0.14), rgba(87,182,178,0) 55%)",
          }}
        >
          {/* Accent bar */}
          <div
            style={{
              position: "absolute",
              top: 42,
              right: 42,
              width: 110,
              height: 6,
              background: accent,
              borderRadius: 6,
            }}
          />
          {/* Grid lines */}
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 600 630"
            xmlns="http://www.w3.org/2000/svg"
            style={{ position: "absolute", inset: 0, opacity: 0.18 }}
          >
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
      </div>
    ),
    { ...size }
  );
}