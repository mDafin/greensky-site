// components/people/PeopleGrid.tsx
"use client";

import React from "react";
import PersonCard from "@/components/people/PersonCard";
import { PEOPLE } from "@/data/people";

export default function PeopleGrid(): React.JSX.Element {
  return (
    <section aria-label="Our People" className="bg-transparent">
      <div className="mx-auto max-w-[1200px] px-4 lg:px-6 py-12 lg:py-16">
        <div className="mb-8">
          <h2 className="text-zinc-900 dark:text-white text-2xl sm:text-3xl font-semibold">
            Our People
          </h2>
          <p className="text-zinc-700 dark:text-zinc-300 mt-2">
            Meet leaders driving value across strategies.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {PEOPLE.map((person) => (
            <PersonCard key={person.slug} person={person} />
          ))}
        </div>
      </div>
    </section>
  );
}
