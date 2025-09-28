/* eslint-disable @next/next/no-img-element */
// app/og/people/[slug]/route.tsx
import { ImageResponse } from "next/og";
import { PEOPLE, type Person } from "@/data/people";

export const runtime = "edge";
export const contentType = "image/png";
export const alt = "Green Sky — Leadership";
export const size = { width: 1200, height: 630 };

// Shapes we might encounter in headshot.src*
type SrcObj = { jpg?: string; webp?: string };
type MaybeSrc = string | SrcObj | undefined;

type MaybeHeadshot = {
  alt?: unknown;
  src480?: unknown;
  src800?: unknown;
  src1200?: unknown;
};

// --- Type guards & helpers ---
function isSrcObj(x: unknown): x is SrcObj {
  return !!x && typeof x === "object" && ("jpg" in (x as SrcObj) || "webp" in (x as SrcObj));
}

function pickSrc(src: MaybeSrc): string | undefined {
  if (!src) return undefined;
  if (typeof src === "string") return src;
  if (isSrcObj(src)) return src.webp ?? src.jpg;
  return undefined;
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n.trim()[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function getHeadshotFromPerson(p: Person): { best?: string; alt: string } {
  // Access as unknown, then narrow safely
  const hs = (p as unknown as { headshot?: MaybeHeadshot }).headshot;

  const best =
    pickSrc(hs?.src1200 as MaybeSrc) ??
    pickSrc(hs?.src800 as MaybeSrc) ??
    pickSrc(hs?.src480 as MaybeSrc);

  const alt =
    typeof hs?.alt === "string" && hs.alt.trim().length > 0 ? (hs.alt as string) : p.name;

  return { best, alt };
}

function getFocusFromPerson(p: Person): string[] {
  const f = (p as unknown as { focus?: unknown }).focus;
  return Array.isArray(f) ? (f as string[]) : [];
}

// --- Route handler ---
export async function GET(req: Request, { params }: { params: { slug: string } }) {
  const person = PEOPLE.find((p) => p.slug === params.slug) as Person | undefined;

  const accent = "#57B6B2";
  const { width, height } = size;

  // Fallback card if the slug is unknown
  if (!person) {
    return new ImageResponse(
      (
        <div
          style={{
            width,
            height,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#0b0b0b",
            color: "white",
            fontSize: 56,
            fontWeight: 700,
            letterSpacing: "-0.02em",
            fontFamily:
              "Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto",
          }}
        >
          Green Sky
        </div>
      ),
      { width, height }
    );
  }

  // Build absolute URL for public assets so Edge can fetch them
  const origin = new URL(req.url).origin;

  const { best: headshotRel, alt: headshotAlt } = getHeadshotFromPerson(person);
  const headshotAbs = headshotRel ? new URL(headshotRel, origin).toString() : undefined;

  const focus = getFocusFromPerson(person);
  const initials = getInitials(person.name);

  return new ImageResponse(
    (
      <div
        style={{
          width,
          height,
          display: "flex",
          background: "linear-gradient(135deg, #0b0b0b 0%, #121212 60%, #1a1a1a 100%)",
          color: "#fff",
          fontFamily:
            "Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto",
        }}
      >
        {/* Left column */}
        <div
          style={{
            flex: 1.15,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "64px",
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
            Leadership
          </div>

          <div style={{ marginTop: 12, fontSize: 60, fontWeight: 800, lineHeight: 1.1 }}>
            {person.name}
          </div>

          <div
            style={{
              marginTop: 10,
              fontSize: 28,
              color: "rgba(255,255,255,0.9)",
              fontWeight: 500,
            }}
          >
            {person.role}
          </div>

          {focus.length > 0 && (
            <div style={{ marginTop: 24, display: "flex", flexWrap: "wrap", gap: 10 }}>
              {focus.slice(0, 4).map((f) => (
                <div
                  key={f}
                  style={{
                    fontSize: 20,
                    padding: "8px 14px",
                    borderRadius: 999,
                    border: "1px solid rgba(255,255,255,0.15)",
                    background: "rgba(255,255,255,0.06)",
                    color: "rgba(255,255,255,0.9)",
                  }}
                >
                  {f}
                </div>
              ))}
            </div>
          )}

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

        {/* Right column (headshot or initials) */}
        <div
          style={{
            position: "relative",
            width: width * 0.45,
            height,
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(255,255,255,0.04)",
          }}
        >
          {headshotAbs ? (
            <>
              <img
                src={headshotAbs}
                alt={headshotAlt}
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  filter: "saturate(1) contrast(1) brightness(0.95)",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(90deg, rgba(11,11,11,0.00) 0%, rgba(11,11,11,0.35) 60%, rgba(11,11,11,0.55) 100%)",
                }}
              />
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
            </>
          ) : (
            <div
              style={{
                width: 220,
                height: 220,
                borderRadius: "50%",
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.12)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 72,
                fontWeight: 700,
                color: "rgba(255,255,255,0.92)",
              }}
            >
              {initials}
            </div>
          )}
        </div>
      </div>
    ),
    { width, height }
  );
}