// components/people/PeopleGrid.tsx
"use client";

/**
 * ======================================================================
 * File: components/people/PeopleGrid.tsx
 * Purpose: Polished people grid with shimmer + a11y polish (no grayscale)
 * Owner: Web | Status: Production
 * ======================================================================
 */

import React from "react";
import Image from "next/image";
import Link from "next/link";
import SafeLink from "@/components/nav/SafeLink";
import { PEOPLE, type Person } from "@/data/people";

/* --------------------------- Small utilities --------------------------- */

const NEUTRAL_BLUR =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0nMTYnIGhlaWdodD0nMTInIHhtbG5zPSdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Zyc+PHJlY3Qgd2lkdGg9JzE2JyBoZWlnaHQ9JzEyJyBmaWxsPScjZjRmNGY1Jy8+PC9zdmc+";

function pickFromEntry(entry: unknown): string | undefined {
  if (typeof entry === "string") return entry;
  if (entry && typeof entry === "object") {
    const obj = entry as Record<string, unknown>;
    if (typeof obj.webp === "string") return obj.webp;
    if (typeof obj.jpg === "string") return obj.jpg;
  }
  return undefined;
}

function pickSrc(
  headshot: Person["headshot"],
  size: "src480" | "src800" | "src1200" = "src480"
): string {
  const primary = pickFromEntry(headshot[size]);
  const fallbackA = pickFromEntry(headshot.src800);
  const fallbackB = pickFromEntry(headshot.src1200);
  const fallbackC = pickFromEntry(headshot.src480);
  return primary ?? fallbackA ?? fallbackB ?? fallbackC ?? "/people/placeholder.jpg";
}

function getLinkedIn(person: Person): string | undefined {
  const li = person.socials?.linkedin;
  return typeof li === "string" && li.length > 0 ? li : undefined;
}

function initials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((s) => s[0]?.toUpperCase() ?? "")
    .join("");
}

/* ------------------------------- Props -------------------------------- */

type PeopleGridProps = {
  columns?: 2 | 3 | 4;   // responsive lg columns
  shimmer?: boolean;     // enable shimmer loader
  showLinkedIn?: boolean;// toggle LinkedIn CTA
};

/* --------------------------------- View -------------------------------- */

export default function PeopleGrid({
  columns = 3,
  shimmer = true,
  showLinkedIn = true,
}: PeopleGridProps): React.JSX.Element {
  const lgCols =
    columns === 4 ? "lg:grid-cols-4" : columns === 2 ? "lg:grid-cols-2" : "lg:grid-cols-3";

  return (
    <section className="bg-white text-zinc-900">
      <div className="mx-auto max-w-[1200px] px-4 lg:px-6 py-12 md:py-16">
        <div
          className={`grid grid-cols-1 sm:grid-cols-2 ${lgCols} gap-6 md:gap-8`}
          role="list"
          aria-label="Leadership"
        >
          {PEOPLE.map((p) => (
            <PersonCard
              key={p.slug}
              person={p}
              shimmer={shimmer}
              showLinkedIn={showLinkedIn}
            />
          ))}
        </div>
      </div>

      {/* Accessibility guards */}
      <style jsx>{`
        @media (prefers-reduced-motion: reduce) {
          a,
          button,
          .card {
            transition: none !important;
          }
        }
        @media (prefers-contrast: more) {
          .border-black\\/10 {
            border-color: rgba(0, 0, 0, 0.32) !important;
          }
        }
      `}</style>
    </section>
  );
}

/* ------------------------------ Sub-views ------------------------------ */

function PersonCard({
  person,
  shimmer,
  showLinkedIn,
}: {
  person: Person;
  shimmer: boolean;
  showLinkedIn: boolean;
}) {
  const [imgLoaded, setImgLoaded] = React.useState(false);
  const [imgError, setImgError] = React.useState(false);

  const imgSrc = pickSrc(person.headshot, "src480");
  const linkedin = getLinkedIn(person);

  return (
    <article
      role="listitem"
      className="card group rounded-xl overflow-hidden border border-black/10 bg-white transition-[transform,box-shadow] duration-200 will-change-transform hover:-translate-y-[2px] hover:shadow-lg focus-within:shadow-lg"
    >
      {/* Primary link area */}
      <Link
        href={`/people/${person.slug}`}
        prefetch={false}
        className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-white"
        aria-label={`View profile: ${person.name}`}
      >
        <div className="relative aspect-[3/4] w-full overflow-hidden bg-zinc-100">
          {!imgError ? (
            <Image
              src={imgSrc}
              alt={person.headshot.alt}
              fill
              sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
              className={[
                "object-cover transition-opacity duration-300",
                shimmer && !imgLoaded ? "opacity-0" : "opacity-100",
              ].join(" ")}
              placeholder="blur"
              blurDataURL={NEUTRAL_BLUR}
              priority={false}
              draggable={false}
              onLoadingComplete={() => setImgLoaded(true)}
              onError={() => setImgError(true)}
            />
          ) : (
            <FallbackAvatar name={person.name} />
          )}

          {shimmer && !imgLoaded && !imgError && (
            <div className="absolute inset-0 animate-shimmer bg-[linear-gradient(110deg,rgba(0,0,0,0)_0%,rgba(255,255,255,.45)_45%,rgba(0,0,0,0)_60%)] bg-[length:200%_100%]" />
          )}
        </div>

        <div className="p-4">
          <h3 className="font-medium leading-tight">{person.name}</h3>
          <p className="text-sm text-zinc-600">{person.role}</p>
          {person.blurb ? (
            <p className="mt-2 text-sm text-zinc-500 line-clamp-2">{person.blurb}</p>
          ) : null}
          <span className="mt-2 inline-block text-sm font-medium text-[var(--accent)] group-hover:underline">
            View profile →
          </span>
        </div>
      </Link>

      {/* LinkedIn button */}
      {showLinkedIn && linkedin && (
        <div className="px-4 pb-4 pt-1 flex items-center gap-3">
          <SafeLink
            href={linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Open ${person.name}'s LinkedIn profile`}
            className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-[var(--accent)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] rounded-[6px] px-2 py-1"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8h4V24h-4V8zm7.5 0h3.8v2.2h.05c.53-1 1.84-2.2 3.8-2.2 4.06 0 4.8 2.67 4.8 6.14V24h-4v-7.1c0-1.7-.03-3.88-2.36-3.88-2.36 0-2.72 1.84-2.72 3.76V24h-4V8z" />
            </svg>
            LinkedIn
          </SafeLink>
        </div>
      )}
    </article>
  );
}

/* ------------------------------ Fallbacks ------------------------------ */

function FallbackAvatar({ name }: { name: string }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-zinc-200 text-zinc-600">
      <span className="text-2xl font-semibold tracking-wide">{initials(name)}</span>
    </div>
  );
}

/* ------------------------------ Local CSS ------------------------------ */

<style jsx global>{`
  @keyframes shimmer {
    0% {
      background-position: -200% 0;
    }
    100% {
      background-position: 200% 0;
    }
  }
  .animate-shimmer {
    animation: shimmer 1.2s linear infinite;
  }
`}</style>