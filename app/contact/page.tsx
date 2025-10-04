import React from "react";
import type { Metadata } from "next";
import ContactSection from "@/components/sections/ContactSection";

export const metadata: Metadata = {
  title: "Contact — Green Sky",
  description:
    "Get in touch with Green Sky. Secure, lender-ready communication for partnerships, commerce, and real estate.",
};

export default function ContactPage(): React.JSX.Element {
  return (
    <>
      <section className="bg-ink text-white py-16">
        <div className="container mx-auto px-6 lg:px-8 max-w-5xl">
          <p className="uppercase tracking-[.12em] text-sm text-zinc-300">Talk to us</p>
          <h1 className="h1 subtle mt-2">Contact</h1>
          <p className="mt-4 max-w-2xl text-zinc-200">
            Share your objectives and timeline. We’ll coordinate the right technical and
            commercial resources and follow up securely.
          </p>
        </div>
      </section>

      <ContactSection />
    </>
  );
}
