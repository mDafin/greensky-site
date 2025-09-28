// app/people/[slug]/page.tsx
import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { PEOPLE, type Person } from "@/data/people";
import SafeLink from "@/components/nav/SafeLink";

// Optional local extension
type PersonWithQuote = Person & { quote?: string };

// --- helpers to support headshot {jpg, webp} or string ---
type SrcObj = { jpg?: string; webp?: string };
type MaybeSrc = string | SrcObj | undefined;

function isSrcObj(x: unknown): x is SrcObj {
  return !!x && typeof x === "object" && ("jpg" in (x as SrcObj) || "webp" in (x as SrcObj));
}
function pickSrc(src: MaybeSrc): string | undefined {
  if (!src) return undefined;
  if (typeof src === "string") return src;
  if (isSrcObj(src)) return src.webp ?? src.jpg;
  return undefined;
}
function bestHeadshot(h: Person["headshot"]): string {
  const s =
    pickSrc(h.src1200 as MaybeSrc) ??
    pickSrc(h.src800 as MaybeSrc) ??
    pickSrc(h.src480 as MaybeSrc);
  return s ?? "/placeholder.svg"; // safe fallback
}

// --- static params & metadata ---
export function generateStaticParams() {
  return PEOPLE.map((p) => ({ slug: p.slug }));
}

export function generateMetadata(
  { params }: { params: { slug: string } }
): Metadata {
  const person = PEOPLE.find((p) => p.slug === params.slug);
  if (!person) {
    return {
      title: "Not Found | Green Sky",
      description: "The requested profile could not be found.",
    };
  }
  const title = `${person.name} | Green Sky`;
  const description = person.blurb || (person.bio ? person.bio.slice(0, 160) : undefined);
  const ogUrl = `/og/people/${person.slug}`;

  return {
    title,
    description,
    openGraph: { title, description, images: [{ url: ogUrl, width: 1200, height: 630 }] },
    twitter: { card: "summary_large_image", title, description, images: [ogUrl] },
  };
}

// --- page ---
export default function PersonPage({ params }: { params: { slug: string } }) {
  const person = PEOPLE.find((p) => p.slug === params.slug);
  if (!person) return notFound();
  const p: PersonWithQuote = person as PersonWithQuote;

  const imgSrc = bestHeadshot(p.headshot);

  return (
    <section className="bg-white text-zinc-900">
  <div
    className="mx-auto max-w-[1100px] px-4 lg:px-6 
               pt-28 md:pt-32  /* ⬅ add this */
               pb-12 md:pb-16">

        {/* Header block */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 items-start">
          {/* Photo */}
          <div className="md:col-span-2">
            <div className="relative w-full aspect-[4/5] overflow-hidden rounded-xl border border-black/10 bg-zinc-50">
              <Image
                src={imgSrc}
                alt={p.headshot.alt}
                fill
                priority
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>

          {/* Intro */}
          <div className="md:col-span-3">
            <div className="text-[11px] uppercase tracking-[0.14em] text-zinc-500">Leadership</div>
            <h1 className="mt-2 text-3xl sm:text-4xl font-semibold">{p.name}</h1>
            <div className="mt-2 text-zinc-700">{p.role}</div>
            <div className="mt-1 text-zinc-500 text-sm">{p.location}</div>

            {p.quote ? (
              <blockquote className="mt-5 border-l-2 border-black/10 pl-4 text-zinc-700 italic">
                “{p.quote}”
              </blockquote>
            ) : null}

            {Array.isArray(p.focus) && p.focus.length > 0 ? (
              <div className="mt-4 flex flex-wrap gap-2">
                {p.focus.map((f) => (
                  <span
                    key={f}
                    className="inline-flex items-center rounded-md border border-black/10 bg-white px-2.5 py-1 text-xs text-zinc-700"
                  >
                    {f}
                  </span>
                ))}
              </div>
            ) : null}
          </div>
        </div>

        {/* Bio */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-5 gap-8">
          <div className="md:col-span-3">
            <h2 className="text-lg font-semibold">Biography</h2>
            <p className="mt-3 text-zinc-700 leading-relaxed whitespace-normal">
  {person.bio}
</p>
          </div>

          {/* Sidebar */}
          <aside className="md:col-span-2">
            {p.blurb ? (
              <div className="rounded-xl border border-black/10 bg-zinc-50 p-4">
                <div className="text-sm text-zinc-700">{p.blurb}</div>
              </div>
            ) : null}

            <div className="mt-4 grid gap-2">
              <SafeLink
                href="/people"
                className="inline-flex items-center justify-center rounded-md border border-black/10 bg-white px-3 py-2 text-sm hover:bg-black/5"
              >
                All People
              </SafeLink>
              <SafeLink
                href="/contact"
                className="inline-flex items-center justify-center rounded-md px-3 py-2 text-sm font-medium"
                style={{ backgroundColor: "var(--accent,#57B6B2)", color: "#0b0b0b" }}
              >
                Contact
              </SafeLink>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}