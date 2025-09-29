// components/people/PeopleGrid.tsx
import Image from "next/image";
import Link from "next/link";
import SafeLink from "@/components/nav/SafeLink";
import { PEOPLE, type Person } from "@/data/people";

// Helper: pick a string src from a union entry (string | { webp?; jpg? })
function pickFromEntry(entry: unknown): string | undefined {
  if (typeof entry === "string") return entry;
  if (typeof entry === "object" && entry !== null) {
    const obj = entry as Record<string, unknown>;
    const webp = obj.webp;
    const jpg = obj.jpg;
    if (typeof webp === "string") return webp;
    if (typeof jpg === "string") return jpg;
  }
  return undefined;
}

function pickSrc(
  headshot: Person["headshot"],
  size: "src480" | "src800" | "src1200" = "src480"
): string {
  // try requested size, then sensible fallbacks
  const primary = pickFromEntry(headshot[size]);
  const fallback1 = pickFromEntry(headshot.src480);
  const fallback2 = pickFromEntry(headshot.src800);
  const fallback3 = pickFromEntry(headshot.src1200);
  return primary ?? fallback1 ?? fallback2 ?? fallback3 ?? "/people/placeholder.jpg";
}

// Helper: safely read optional LinkedIn URL without `any`
function getLinkedIn(person: unknown): string | undefined {
  if (typeof person !== "object" || person === null) return undefined;
  const rec = person as Record<string, unknown>;
  const socials = rec["socials"];
  if (typeof socials !== "object" || socials === null) return undefined;
  const srec = socials as Record<string, unknown>;
  const li = srec["linkedin"];
  return typeof li === "string" ? li : undefined;
}

export default function PeopleGrid(): React.JSX.Element {
  return (
    <section className="bg-white text-zinc-900">
      <div className="mx-auto max-w-[1200px] px-4 lg:px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {PEOPLE.map((p) => {
            const imgSrc = pickSrc(p.headshot, "src480");
            const linkedin = getLinkedIn(p);

            return (
              <div
                key={p.slug}
                className="group rounded-xl overflow-hidden border border-black/10 bg-white hover:bg-black/5 transition-colors"
              >
                {/* Primary click area */}
                <Link href={`/people/${p.slug}`} className="block">
                  {/* Headshot */}
                  <div className="relative aspect-[3/4] w-full overflow-hidden">
                    <Image
                      src={imgSrc}
                      alt={p.headshot.alt}
                      fill
                      sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
                      className="object-cover"
                      priority={false}
                    />
                  </div>

                  {/* Copy */}
                  <div className="p-4">
                    <div className="font-medium">{p.name}</div>
                    <div className="text-sm text-zinc-600">{p.role}</div>
                    {p.blurb && (
                      <div className="mt-1 text-sm text-zinc-500 line-clamp-2">
                        {p.blurb}
                      </div>
                    )}
                    <div className="mt-2 text-sm font-medium text-[#57B6B2] group-hover:underline">
                      View profile →
                    </div>
                  </div>
                </Link>

                {/* Sibling action row (no nested anchors) */}
                <div className="px-4 pb-4">
                  {linkedin && (
                    <SafeLink
                      href={linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`View ${p.name} on LinkedIn`}
                      className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-[#57B6B2]"
                    >
                      {/* Inline LinkedIn icon (no external deps) */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8h4V24h-4V8zm7.5 0h3.8v2.2h.05c.53-1 1.84-2.2 3.8-2.2 4.06 0 4.8 2.67 4.8 6.14V24h-4v-7.1c0-1.7-.03-3.88-2.36-3.88-2.36 0-2.72 1.84-2.72 3.76V24h-4V8z"/>
                      </svg>
                      LinkedIn
                    </SafeLink>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}