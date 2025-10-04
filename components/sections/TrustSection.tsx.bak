// components/sections/TrustSection.tsx
"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Glass } from "@/components/ui/Glass";
import { LinkButton } from "@/components/ui/Button"; // ✅ only import what’s used

export default function TrustSection() {
  return (
    <section className="relative bg-mist py-20 sm:py-28">
      <div className="container mx-auto px-6 lg:px-8 max-w-6xl text-center">
        <motion.h2
          className="h1 text-ink mb-4"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.17, 0.67, 0.25, 1] }}
        >
          Built on Trust
        </motion.h2>

        <motion.p
          className="text-lg text-neutral-600 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.6 }}
        >
          Green Sky is more than commerce. Every transaction, every partner,
          every investor interaction is backed by enterprise-grade security and
          compliance — so growth never means risk.
        </motion.p>

        <div className="mt-8 flex justify-center gap-4">
          <LinkButton href="/security" size="lg" variant="solid">
            Security details
          </LinkButton>
          <LinkButton href="/contact" size="lg" variant="glass">
            Contact us
          </LinkButton>
        </div>

        <div className="mt-12 flex justify-center">
          <Glass className="max-w-xl text-left p-6">
            <ul className="list-disc pl-5 space-y-2 text-neutral-700 text-sm">
              <li>TLS 1.2+ with HSTS by default</li>
              <li>PCI-compliant payment gateways</li>
              <li>Vendor risk management &amp; audits</li>
              <li>Role-based access control</li>
            </ul>
          </Glass>
        </div>
      </div>
    </section>
  );
}