// components/nav/nav-data.tsx
import * as React from "react";

/* ---------- types ---------- */
export type NavLink = { type: "link"; label: string; href: string };

export type NavSectionItem = {
  label: string;
  href: string;
  desc?: string;
  icon?: React.ComponentType<{ className?: string }>;
};

export type NavSection = { title?: string; items: NavSectionItem[] };

export type FeaturedItem = {
  href: string;
  eyebrow?: string;
  title: string;
  desc?: string;
  image?: string; // /public path
};

export type GuideItem = {
  href: string;
  title: string;
  eyebrow?: string;
  image?: string; // /public path
};

export type NavMenu = {
  type: "menu";
  label: string;
  sections: NavSection[];
  featured?: FeaturedItem[];
  guides?: GuideItem[];
  viewAllHref?: string;
};

export type NavItem = NavLink | NavMenu;

/* ---------- tiny icons ---------- */
export const IconMarket = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" className={className}>
    <path d="M4 7h16M6 12h12M8 17h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);
export const IconReport = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" className={className}>
    <path d="M7 4h10v16H7zM7 9h10" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
  </svg>
);

/* ---------- data ---------- */
export const NAV: NavItem[] = [
  {
    type: "menu",
    label: "Platform",
    sections: [
      {
        title: "Invest",
        items: [
          { href: "/platform/marketplace", label: "Marketplace", desc: "Curated private offerings", icon: IconMarket },
          { href: "/platform/orders", label: "Orders", desc: "Fast, compliant execution" },
        ],
      },
      {
        title: "Operate",
        items: [
          { href: "/platform/portfolio", label: "Portfolio", desc: "Positions, cash, IRR" },
          { href: "/platform/reporting", label: "Reporting", desc: "LP letters, K-1s, audits", icon: IconReport },
        ],
      },
    ],
    featured: [
      {
        href: "/insights/pulse",
        eyebrow: "New",
        title: "Private Markets Pulse",
        desc: "Weekly signals from secondary markets and fund flows.",
        image: "/images/featured/pulse.jpg",
      },
      {
        href: "/solutions/case-studies/northstar",
        eyebrow: "Case study",
        title: "How Northstar FO scaled diligence",
        desc: "A 3-person team, enterprise-grade controls.",
        image: "/images/featured/northstar.jpg",
      },
    ],
    guides: [
      { href: "/guides/alt-sleeve", title: "Building an alternatives sleeve", eyebrow: "Guide", image: "/images/guides/alt-sleeve.jpg" },
      { href: "/guides/k1-checklist", title: "K-1 season ops checklist", eyebrow: "Guide", image: "/images/guides/k1-checklist.jpg" },
      { href: "/guides/secondaries-101", title: "Secondaries 101", eyebrow: "Guide", image: "/images/guides/secondaries.jpg" },
      { href: "/guides/controls", title: "Operational controls checklist", eyebrow: "Guide", image: "/images/guides/controls.jpg" },
      { href: "/guides/ria", title: "Rolling out alts at an RIA", eyebrow: "Guide", image: "/images/guides/ria.jpg" },
    ],
    viewAllHref: "/guides",
  },

  /* Keep these as menus or links—your call. */
  {
    type: "menu",
    label: "Solutions",
    sections: [
      {
        title: "Who we serve",
        items: [
          { href: "/solutions/family-offices", label: "Family offices", desc: "Institutional rails for lean teams" },
          { href: "/solutions/ria", label: "RIAs", desc: "Scale alternatives for clients" },
          { href: "/solutions/institutions", label: "Institutions", desc: "Controls, compliance, custody" },
        ],
      },
      {
        title: "What you get",
        items: [
          { href: "/solutions/workflows", label: "Workflows", desc: "Diligence, execution, reporting" },
          { href: "/solutions/integrations", label: "Integrations", desc: "Custody, CRM, data, SSO" },
        ],
      },
    ],
    featured: [
      {
        href: "/solutions/case-studies/northstar",
        eyebrow: "Case study",
        title: "How Northstar scaled diligence",
        desc: "A 3-person team, enterprise-grade controls.",
        image: "/images/featured/northstar.jpg",
      },
    ],
    guides: [
      { href: "/guides/controls", title: "Operational controls checklist", eyebrow: "Guide", image: "/images/guides/controls.jpg" },
      { href: "/guides/ria", title: "Rolling out alts at an RIA", eyebrow: "Guide", image: "/images/guides/ria.jpg" },
    ],
  },

  {
    type: "menu",
    label: "Insights",
    sections: [
      {
        title: "Browse",
        items: [
          { href: "/insights", label: "All posts", desc: "Latest from the team" },
          { href: "/insights/reports", label: "Reports", desc: "Deep-dives & data" },
          { href: "/insights/guides", label: "Guides", desc: "How-tos & checklists" },
          { href: "/insights/news", label: "News", desc: "Announcements & releases" },
        ],
      },
      {
        title: "Popular",
        items: [
          { href: "/insights/pulse", label: "Private Markets Pulse", desc: "Weekly signals & fund flows" },
          { href: "/guides/secondaries-101", label: "Secondaries 101", desc: "A quick primer" },
        ],
      },
    ],
    featured: [
      {
        href: "/insights/pulse",
        eyebrow: "New",
        title: "Private Markets Pulse",
        desc: "Weekly signals from secondary markets and fund flows.",
        image: "/images/featured/pulse.jpg",
      },
    ],
    guides: [
      { href: "/guides/alt-sleeve", title: "Building an alternatives sleeve", eyebrow: "Guide", image: "/images/guides/alt-sleeve.jpg" },
      { href: "/guides/secondaries-101", title: "Secondaries 101", eyebrow: "Guide", image: "/images/guides/secondaries.jpg" },
    ],
  },
];