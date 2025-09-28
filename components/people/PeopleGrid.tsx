// components/people/PeopleGrid.tsx
"use client";

import React from "react";
import PersonCard from "@/components/people/PersonCard";
import { PEOPLE } from "@/data/people";

export default function PeopleGrid({
  variant = "light",
}: {
  variant?: "light" | "soft" | "dark";
}): React.JSX.Element {
  const isDark = variant === "dark";
  const isSoft = variant === "soft";

  const sectionClass = isDark
    ? "bg-zinc-900 text-white"
    : isSoft
    ? "bg-zinc-50 text-zinc-900"
    : "bg-white text-zinc-900";

  const subText = isDark ? "text-zinc-300" : isSoft ? "text-zinc-700" : "text-zinc-600";

  return (
    <section aria-label="Our People" className={sectionClass}>
      <div className="mx-auto max-w-[1200px] px-4 lg:px-6 py-12 lg:py-16">
        <div className="mb-8">
          <h2 className="text-2xl sm:text-3xl font-semibold">Our People</h2>
          <p className={`mt-2 ${subText}`}>Meet leaders driving value across strategies.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {PEOPLE.map((person) => (
            <PersonCard key={person.slug} person={person} variant={variant} />
          ))}
        </div>
      </div>
    </section>
  );
}
