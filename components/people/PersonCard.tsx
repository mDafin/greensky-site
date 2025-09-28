// components/people/PersonCard.tsx
"use client";

import Image from "next/image";
import SafeLink from "@/components/nav/SafeLink";
import { type Person } from "@/data/people";

type Props = { person: Person };

// Helper: pick best format for a given size
function pickSrc(
  headshot: Person["headshot"],
  size: "src480" | "src800" | "src1200" = "src800"
): string {
  const entry = headshot[size];
  // Prefer WebP; fall back to JPG
  return entry.webp || entry.jpg;
}

export default function PersonCard({ person }: Props): React.JSX.Element {
  const { slug, name, role, headshot, blurb } = person;
  const src = pickSrc(headshot, "src800");

  return (
    <SafeLink
      href={{ pathname: `/people/${slug}` }}
      className="group block rounded-xl overflow-hidden border border-white/10 bg-zinc-900/60 hover:bg-zinc-900/80 transition-colors"
    >
      <div className="relative aspect-[4/5] w-full">
        <Image
          src={src}
          alt={headshot.alt}
          fill
          sizes="(min-width:1024px) 33vw, (min-width:640px) 45vw, 90vw"
          className="object-cover"
          priority
        />
      </div>
      <div className="p-4">
        <h3 className="text-white text-base font-semibold leading-tight group-hover:text-accent">
          {name}
        </h3>
        <p className="text-zinc-300 text-sm mt-1">{role}</p>
        {blurb ? (
          <p className="text-zinc-400 text-sm mt-2 line-clamp-2">{blurb}</p>
        ) : null}
        <span className="mt-3 inline-flex items-center gap-1 text-sm text-accent">
          View profile <span aria-hidden>→</span>
        </span>
      </div>
    </SafeLink>
  );
}