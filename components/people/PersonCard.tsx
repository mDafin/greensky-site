// components/people/PersonCard.tsx
"use client";

import Image from "next/image";
import SafeLink from "@/components/nav/SafeLink";
import { Person } from "@/data/people";

type Props = { person: Person; variant?: "light" | "soft" | "dark" };

export default function PersonCard({ person, variant = "light" }: Props): React.JSX.Element {
  const { slug, name, role, headshot, blurb } = person;

  const isDark = variant === "dark";
  const isSoft = variant === "soft";

  const containerClass = isDark
    ? "bg-zinc-900/60 border-white/10 hover:bg-zinc-900/80"
    : "bg-white border-black/10 hover:bg-black/[0.02]";

  const titleClass = isDark ? "text-white" : "text-zinc-900";
  const roleClass = isDark ? "text-zinc-300" : isSoft ? "text-zinc-700" : "text-zinc-600";
  const blurbClass = isDark ? "text-zinc-400" : isSoft ? "text-zinc-700" : "text-zinc-600";

  return (
    <SafeLink
      href={{ pathname: `/people/${slug}` }}
      className={`group block rounded-xl overflow-hidden border transition-colors ${containerClass}`}
    >
      <div className="relative aspect-[4/5] w-full">
        <Image
          src={headshot.src800}
          alt={headshot.alt}
          fill
          sizes="(min-width:1024px) 33vw, (min-width:640px) 45vw, 90vw"
          className="object-cover"
          priority
        />
      </div>
      <div className="p-4">
        <h3
          className={`text-base font-semibold leading-tight ${titleClass} group-hover:text-[var(--accent,#57B6B2)]`}
        >
          {name}
        </h3>
        <p className={`text-sm mt-1 ${roleClass}`}>{role}</p>
        {blurb ? <p className={`text-sm mt-2 line-clamp-2 ${blurbClass}`}>{blurb}</p> : null}
        <span className="mt-3 inline-flex items-center gap-1 text-sm" style={{ color: "var(--accent, #57B6B2)" }}>
          View profile <span aria-hidden>→</span>
        </span>
      </div>
    </SafeLink>
  );
}
