"use client";

import * as React from "react";
import { Glass } from "@/components/ui/Glass";
import { Button } from "@/components/ui/Button";

type FormState =
  | { status: "idle" }
  | { status: "submitting" }
  | { status: "success"; message: string }
  | { status: "error"; message: string };

// Declare window typing once
declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
  }
}

function validateEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default function ContactSection(): React.JSX.Element {
  const [formState, setFormState] = React.useState<FormState>({ status: "idle" });
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [company, setCompany] = React.useState("");
  const [message, setMessage] = React.useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!name.trim()) {
      return setFormState({ status: "error", message: "Please provide your name." });
    }
    if (!validateEmail(email)) {
      return setFormState({ status: "error", message: "Please provide a valid email." });
    }
    if (!message.trim()) {
      return setFormState({ status: "error", message: "Please include a short message." });
    }

    setFormState({ status: "submitting" });

    try {
      // Initialize GTM dataLayer if not present
      if (!window.dataLayer) {
        window.dataLayer = [];
      }

      window.dataLayer.push({
        event: "contact_submit_attempt",
        form_location: "homepage_section",
      });

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, company, message, source: "homepage" }),
      });

      const json = (await res.json()) as { ok: boolean; message: string };

      if (!res.ok || !json.ok) {
        window.dataLayer.push({
          event: "contact_submit_error",
          form_location: "homepage_section",
        });
        return setFormState({
          status: "error",
          message: json.message || "Something went wrong. Please try again.",
        });
      }

      window.dataLayer.push({
        event: "contact_submit_success",
        form_location: "homepage_section",
      });

      setFormState({
        status: "success",
        message: "Thanks — we’ve received your message and will follow up shortly.",
      });
      setName("");
      setEmail("");
      setCompany("");
      setMessage("");
    } catch {
      window.dataLayer?.push({
        event: "contact_submit_error",
        form_location: "homepage_section",
      });
      setFormState({
        status: "error",
        message: "Network issue. Please try again in a moment.",
      });
    }
  }

  return (
    <section id="contact" className="relative bg-mist py-20 sm:py-28">
      <div className="container mx-auto px-6 lg:px-8 max-w-6xl">
        <div className="grid gap-8 md:grid-cols-12">
          {/* Left copy */}
          <div className="md:col-span-5">
            <h2 className="h1 text-ink">Let’s build with confidence</h2>
            <p className="mt-3 text-neutral-600">
              Introduce your team and objectives. We’ll coordinate next steps with the right people —
              securely and on your timeline.
            </p>
            <Glass variant="light" className="mt-8 p-6">
              <ul className="text-sm text-neutral-700 space-y-2 list-disc pl-5">
                <li>Encrypted transport (TLS 1.2+) &amp; strict cookies</li>
                <li>Least-privilege access for internal systems</li>
                <li>Vendor risk management and dependency reviews</li>
                <li>Audit-ready tracking (GTM + GA4)</li>
              </ul>
            </Glass>
          </div>

          {/* Right form */}
          <div className="md:col-span-7">
            <Glass variant="light" className="p-6 md:p-8">
              <form onSubmit={onSubmit} noValidate>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-neutral-800">
                      Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      className="mt-1 block w-full rounded-[var(--radius)] border border-slate-300 bg-white px-3 py-2 text-sm text-neutral-900 outline-none focus:ring-2 focus:ring-brand-400"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-neutral-800">
                      Work Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      className="mt-1 block w-full rounded-[var(--radius)] border border-slate-300 bg-white px-3 py-2 text-sm text-neutral-900 outline-none focus:ring-2 focus:ring-brand-400"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label htmlFor="company" className="block text-sm font-medium text-neutral-800">
                      Company (optional)
                    </label>
                    <input
                      id="company"
                      name="company"
                      type="text"
                      autoComplete="organization"
                      className="mt-1 block w-full rounded-[var(--radius)] border border-slate-300 bg-white px-3 py-2 text-sm text-neutral-900 outline-none focus:ring-2 focus:ring-brand-400"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label htmlFor="message" className="block text-sm font-medium text-neutral-800">
                      How can we help?
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      className="mt-1 block w-full rounded-[var(--radius)] border border-slate-300 bg-white px-3 py-2 text-sm text-neutral-900 outline-none focus:ring-2 focus:ring-brand-400"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="mt-6 flex items-center gap-3">
                  <Button type="submit" size="lg" variant="solid" disabled={formState.status === "submitting"}>
                    {formState.status === "submitting" ? "Sending…" : "Send message"}
                  </Button>
                  <p className="text-xs text-neutral-500">
                    By submitting, you agree to our{" "}
                    <a href="/privacy" className="underline">
                      Privacy Policy
                    </a>.
                  </p>
                </div>

                {formState.status === "error" && (
                  <p className="mt-3 text-sm text-red-600">{formState.message}</p>
                )}
                {formState.status === "success" && (
                  <p className="mt-3 text-sm text-green-700">{formState.message}</p>
                )}
              </form>
            </Glass>
          </div>
        </div>
      </div>
    </section>
  );
}
