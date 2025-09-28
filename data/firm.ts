// data/firm.ts

/* ========= Types ========= */

export type Stat = {
  value: string;
  label: string;
  footnote?: string;
};

export type TabLink = { label: string; href: string };

export type BusinessTab = {
  id: "platform" | "fulfillment" | "payments" | "growth";
  label: string;
  headline: string;
  body: string;
  image: { src: string; alt: string };
  links?: TabLink[];
};

export type FeaturedInsight = {
  kicker: string;
  title: string;
  summary: string;
  href: string;
};

/* ========= Stats ========= */

export const FIRM_STATS: Stat[] = [
  { value: "$25B+", label: "Gross Merchandise Volume" },
  { value: "50+", label: "Countries Served" },
  { value: "200M+", label: "Transactions Processed" },
  { value: "99.99%", label: "Uptime Across Systems" },
];

/* ========= Business Tabs (e-commerce pivot) ========= */

export const BUSINESS_TABS: BusinessTab[] = [
  {
    id: "platform",
    label: "Commerce Platform",
    headline: "A Modern E-Commerce Infrastructure",
    body:
      "Our digital platform empowers global brands and ambitious entrepreneurs to launch, scale, and refine their online storefronts with enterprise-grade reliability and integrated APIs.",
    image: {
      src: "/firm/platform.jpg",
      alt: "Modern e-commerce platform interface on a laptop screen representing digital storefronts and APIs.",
    },
    links: [
      { label: "Learn more", href: "/products/platform" },
      { label: "Platform docs", href: "/docs/platform" },
    ],
  },
  {
    id: "fulfillment",
    label: "Logistics & Fulfillment",
    headline: "Seamless Global Fulfillment",
    body:
      "From same-day delivery in metropolitan hubs to cross-border distribution, our logistics network ensures goods move with precision, efficiency, and trust.",
    image: {
      src: "/firm/fulfillment.jpg",
      alt: "Automated warehouse with stacked boxes and shelving, symbolizing global e-commerce logistics and fulfillment.",
    },
    links: [
      { label: "Learn more", href: "/products/fulfillment" },
      { label: "Track shipments", href: "/support/shipping" },
    ],
  },
  {
    id: "payments",
    label: "Payments",
    headline: "Trusted Digital Transactions",
    body:
      "We process millions of transactions daily with best-in-class fraud protection, multi-currency support, and instant settlement options tailored for global commerce.",
    image: {
      src: "/firm/payments.jpg",
      alt: "Secure online payment with credit card and mobile device illustrating digital transactions and fraud protection.",
    },
    links: [
      { label: "Learn more", href: "/products/payments" },
      { label: "View payment APIs", href: "/docs/payments" },
    ],
  },
  {
    id: "growth",
    label: "Growth Solutions",
    headline: "Intelligence That Drives Growth",
    body:
      "Our AI-driven insights surface real-time consumer behavior and campaign performance, enabling merchants to maximize margins and expand market share.",
    image: {
      src: "/firm/growth.jpg",
      alt: "Business analytics dashboard showing charts and graphs for e-commerce growth and marketing performance.",
    },
    links: [
      { label: "Learn more", href: "/products/growth" },
      { label: "Case studies", href: "/insights/case-studies" },
    ],
  },
];

/* ========= Featured Insight (for FeaturedDark) ========= */

export const FEATURED_INSIGHT: FeaturedInsight = {
  kicker: "Insight",
  title: "Building Global Commerce Resilience in 2026",
  summary:
    "How leading merchants are hardening supply chains, optimizing working capital, and using real-time risk signals to protect conversion—and expand internationally with confidence.",
  href: "/insights/global-commerce-resilience-2026",
};

/* ========= Footprint ========= */

export const FOOTPRINT = {
  regions: ["North America", "Europe", "Asia Pacific", "Latin America", "Middle East & Africa"],
  map: {
    src: "/firm/map.jpg",
    alt: "Global world map visualization symbolizing international e-commerce footprint and cross-border operations.",
  },
};

/* ========= Logos (placeholders; replace with /public/logos/*.svg when ready) ========= */

const makeWordmark = (text: string) =>
  `data:image/svg+xml;utf8,` +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='320' height='80'>
      <rect width='100%' height='100%' fill='white'/>
      <text x='50%' y='54%' font-family='system-ui,Segoe UI,Roboto,Helvetica,Arial,sans-serif'
            font-size='28' fill='#0a0a0a' text-anchor='middle' dominant-baseline='middle'
            opacity='0.85'>${text}</text>
    </svg>`
  );

export const LOGOS: { src: string; alt: string }[] = [
  { src: makeWordmark("Apex Global"), alt: "Apex Global wordmark" },
  { src: makeWordmark("Nimbus Brands"), alt: "Nimbus Brands wordmark" },
  { src: makeWordmark("Vector Commerce"), alt: "Vector Commerce wordmark" },
  { src: makeWordmark("Northline Distribution"), alt: "Northline Distribution wordmark" },
  { src: makeWordmark("Orbit Labs"), alt: "Orbit Labs wordmark" },
  { src: makeWordmark("Beacon Retail"), alt: "Beacon Retail wordmark" },
  { src: makeWordmark("Monarch Supply"), alt: "Monarch Supply wordmark" },
  { src: makeWordmark("Helix Payments"), alt: "Helix Payments wordmark" },
  { src: makeWordmark("Atlas Growth"), alt: "Atlas Growth wordmark" },
  { src: makeWordmark("Summit Apparel"), alt: "Summit Apparel wordmark" },
  { src: makeWordmark("Quanta Home"), alt: "Quanta Home wordmark" },
  { src: makeWordmark("Linea Beauty"), alt: "Linea Beauty wordmark" },
];