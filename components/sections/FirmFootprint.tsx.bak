"use client";

import React from "react";
import Image from "next/image";
import SafeLink from "@/components/nav/SafeLink";
import { FOOTPRINT } from "../../data/firm";

export default function FirmFootprint(): React.JSX.Element {
  return (
    <section className="bg-white text-zinc-900">
      <div className="mx-auto max-w-[1200px] px-4 lg:px-6 py-14 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 items-center">
          <div className="md:col-span-2">
            <h3 className="text-xl sm:text-2xl font-semibold">Global Footprint</h3>
            <p className="mt-2 text-zinc-700">
              We invest across regions with on-the-ground teams and local expertise.
            </p>
            <ul className="mt-4 text-sm text-zinc-700 grid grid-cols-2 gap-1">
              {FOOTPRINT.regions.map((r: string) => (
                <li key={r}>{r}</li>
              ))}
            </ul>
            <div className="mt-4">
              <SafeLink href="/about#locations" className="text-sm underline hover:text-black">
                View offices
              </SafeLink>
            </div>
          </div>

          <div className="md:col-span-3">
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-black/10 bg-white">
              <Image
                src={FOOTPRINT.map.src}
                alt={FOOTPRINT.map.alt}
                fill
                className="object-cover"
                sizes="(min-width: 768px) 50vw, 100vw"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
