// components/people/PeopleGrid.tsx
import Image from "next/image";
import Link from "next/link";
import { PEOPLE } from "@/data/people";

// Helper: extract correct src
function pickSrc(src: string | { jpg?: string; webp?: string }): string {
  if (typeof src === "string") return src;
  return src.webp ?? src.jpg ?? "/people/placeholder.jpg";
}

export default function PeopleGrid() {
  return (
    <section className="bg-white text-zinc-900">
      <div className="mx-auto max-w-[1200px] px-4 lg:px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {PEOPLE.map((p) => (
            <Link
              key={p.slug}
              href={`/people/${p.slug}`}
              className="group rounded-xl overflow-hidden border border-black/10 bg-white hover:bg-black/5 transition-colors"
            >
              {/* Headshot */}
              <div className="relative aspect-[3/4] w-full bg-zinc-100">
                <Image
                  src={pickSrc(p.headshot.src480)}
                  alt={p.headshot.alt}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover"
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
                <div className="mt-2 text-sm font-medium text-emerald-600 group-hover:underline">
                  View profile →
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}