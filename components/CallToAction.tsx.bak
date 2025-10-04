// components/CallToAction.tsx
"use client";

import SafeLink from "@/components/nav/SafeLink";

export type CallToActionProps = { variant?: "light" | "soft" | "dark" };

export default function CallToAction({ variant = "light" }: CallToActionProps): React.JSX.Element {
  const isDark = variant === "dark";
  const isSoft = variant === "soft";

  const sectionClass = isDark
    ? "bg-zinc-900 text-white"
    : isSoft
    ? "bg-zinc-50 text-zinc-900"
    : "bg-white text-zinc-900";

  const cardClass = isDark
    ? "bg-zinc-900/70 border border-white/10 shadow-[0_20px_40px_rgba(0,0,0,0.35)]"
    : "bg-white border border-black/10 shadow-[0_20px_40px_rgba(0,0,0,0.06)]";

  const subText = isDark ? "text-zinc-300" : "text-zinc-600";

  return (
    <section aria-label="Get in touch" className={sectionClass}>
      <div className="mx-auto max-w-[1200px] px-4 lg:px-6 py-12 lg:py-16">
        <div className={`rounded-2xl p-8 md:p-10 ${cardClass}`}>
          <h2 className="text-2xl sm:text-3xl font-semibold">Ready to talk?</h2>
          <p className={`mt-2 max-w-2xl ${subText}`}>
            We partner with institutions, advisors, and founders to build durable value.
          </p>
          <div className="mt-6">
            <SafeLink
              href="/contact"
              className="inline-flex items-center rounded-md px-4 py-2 text-sm font-medium"
              style={{ backgroundColor: "var(--accent, #57B6B2)", color: "#0b0b0b" }}
            >
              Contact Us
            </SafeLink>
          </div>
        </div>
      </div>
    </section>
  );
}
