// app/security/page.tsx
import * as React from "react";
import Script from "next/script";
import { Glass } from "@/components/ui/Glass";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/Card";

export const metadata = {
  title: "Security — Green Sky",
  description: "How we protect your information and ensure trust.",
};

export default function SecurityPage() {
  // Build absolute URL for JSON-LD (edit NEXT_PUBLIC_SITE_URL in .env.local)
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://greensky.example";
  const pageUrl = `${siteUrl}/security`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        "url": pageUrl,
        "name": "Security — Green Sky",
        "description": "How we protect your information and ensure trust.",
        "isPartOf": {
          "@type": "WebSite",
          "@id": `${siteUrl}#website`,
          "url": siteUrl,
          "name": "Green Sky"
        }
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": siteUrl
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Security",
            "item": pageUrl
          }
        ]
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "How is my data protected in transit?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "All traffic is encrypted with TLS 1.2+ and HSTS is enforced to prevent protocol downgrades and cookie hijacking."
            }
          },
          {
            "@type": "Question",
            "name": "Do you use PCI-compliant payment processors?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. Payments are processed through PCI-compliant providers so card data never touches our servers."
            }
          },
          {
            "@type": "Question",
            "name": "How do you limit internal access?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "We implement role-based access control with least-privilege permissions and conduct regular vendor and dependency reviews."
            }
          }
        ]
      }
    ]
  };

  return (
    <>
      {/* JSON-LD for SEO */}
      <Script
        id="security-jsonld"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* HERO INTRO */}
      <section className="mx-auto w-full max-w-[1120px] px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <Glass className="p-6 md:p-10 bg-white/50 backdrop-blur-2xl">
          <p className="uppercase tracking-[.12em] text-sm text-neutral-600">
            Trust
          </p>
          <h1 className="h1 subtle text-neutral-900 mt-2">Security</h1>
          <p className="mt-4 text-lg text-neutral-700 max-w-3xl">
            We take security seriously. Every transaction, every connection, and
            every partner relationship is protected with modern safeguards. This
            isn’t just about protecting shoppers — it’s about maintaining the
            confidence of our lenders and partners as well.
          </p>
        </Glass>
      </section>

      {/* MAIN GRID */}
      <section className="mx-auto w-full max-w-[1120px] px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid gap-6 md:grid-cols-12">
          {/* LEFT CONTENT */}
          <div className="md:col-span-8 prose prose-neutral max-w-none">
            <h2 className="h2 text-neutral-900">Our approach</h2>
            <p>
              Green Sky is built on secure infrastructure and industry-standard
              practices. Customers get peace of mind when shopping, and lenders
              see evidence of risk management discipline.
            </p>

            <h3 className="mt-8 text-xl font-semibold">Core protections</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>All traffic encrypted with TLS 1.2+ and HSTS</li>
              <li>Payments processed securely through PCI-compliant providers</li>
              <li>
                Strict cookie policies (<code>Secure</code>,{" "}
                <code>HttpOnly</code>, <code>SameSite</code>)
              </li>
              <li>Role-based access control for internal systems</li>
              <li>Regular vendor and dependency reviews</li>
            </ul>

            <h3 className="mt-10 text-xl font-semibold">Why this matters</h3>
            <p>
              For shoppers, it means safe checkout and reliable protection of
              personal details. For lenders and partners, it demonstrates
              operational maturity: encryption, least-privilege access, and
              continuous oversight of vendors and code.
            </p>
          </div>

          {/* RIGHT SIDEBAR */}
          <div className="md:col-span-4 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>At a glance</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-sm leading-6 text-neutral-700 list-disc pl-4">
                  <li>TLS 1.2+ encryption</li>
                  <li>PCI-compliant payments</li>
                  <li>Least-privilege access control</li>
                  <li>Vendor &amp; dependency audits</li>
                </ul>
              </CardContent>
              <CardFooter>
                <p className="text-xs text-neutral-500">Last reviewed: Oct 2025</p>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Contact</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-neutral-700">
                  Questions?{" "}
                  <a className="underline" href="/contact">
                    Get in touch
                  </a>
                  .
                </p>
              </CardContent>
              <CardFooter>
                <p className="text-xs text-neutral-500">Our team responds within 1 business day</p>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
}