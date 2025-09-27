// components/CallToAction.tsx
"use client";

import SafeLink from "@/components/nav/SafeLink";

export default function CallToAction(): React.JSX.Element {
  return (
    <section aria-label="Get in touch" className="bg-transparent">
      <div className="mx-auto max-w-[1200px] px-4 lg:px-6 py-12 lg:py-16">
        <div
          className="rounded-2xl p-8 md:p-10"
          style={{
            backgroundColor: "color-mix(in oklab, var(--accent) 12%, var(--bg))",
            border: "1px solid color-mix(in oklab, var(--accent) 30%, transparent)",
          }}
        >
          <h2 className="text-zinc-900 dark:text-white text-2xl sm:text-3xl font-semibold">
            Ready to talk?
          </h2>
          <p className="text-zinc-700 dark:text-zinc-300 mt-2 max-w-2xl">
            We partner with institutions, advisors, and founders to build durable value.
          </p>
          <div className="mt-6">
            <SafeLink
              href="/contact"
              className="inline-flex items-center rounded-md px-4 py-2 text-sm font-medium"
              style={{ backgroundColor: "var(--accent)", color: "#0b0b0b" }}
            >
              Contact Us
            </SafeLink>
          </div>
        </div>
      </div>
    </section>
  );
}
