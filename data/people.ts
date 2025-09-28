// data/people.ts

export type Person = {
  slug: string;
  name: string;
  role: string;
  location: string;
  bio: string;
  blurb?: string;
  quote?: string;
  focus?: string[];
  headshot: {
    src480: { jpg: string; webp: string };
    src800: { jpg: string; webp: string };
    src1200: { jpg: string; webp: string };
    alt: string;
  };
};

export const PEOPLE: Person[] = [
  {
    slug: "alvin-bradley",
    name: "Alvin Bradley",
    role: "Managing Director, Global Commerce Infrastructure",
    location: "Los Angeles, California",
    bio: `Alvin Bradley brings nearly 30 years of leadership from the Port of Long Beach and Los Angeles,
where he oversaw large-scale logistics and trade operations. At Green Sky, he leads global commerce
infrastructure initiatives, ensuring resilience, sustainability, and efficiency across e-commerce supply chains.
He partners with merchants, carriers, and platform teams to close the gap between physical networks and digital demand.`,
    blurb: "Leverages 30 years at the Port of Long Beach/LA to build resilient global commerce networks.",
    quote: "Great commerce is a choreography—ports, platforms, and people moving in sync.",
    focus: ["Global logistics", "Port operations", "Cross-border", "Resilience"],
    headshot: {
      src480: { jpg: "/people/alvin-bradley-480.jpg", webp: "/people/alvin-bradley-480.webp" },
      src800: { jpg: "/people/alvin-bradley-800.jpg", webp: "/people/alvin-bradley-800.webp" },
      src1200: { jpg: "/people/alvin-bradley-1200.jpg", webp: "/people/alvin-bradley-1200.webp" },
      alt: "Portrait of Alvin Bradley",
    },
  },
  {
    slug: "nikki-b",
    name: "Nikki B",
    role: "Partner, AI & Supply Chain Innovation",
    location: "Irvine, California",
    bio: `Nikki specializes in applying artificial intelligence to fulfillment, forecasting, and supply chain routing.
She has built ML programs that reduce stockouts, compress delivery windows, and improve margin quality for merchants
operating across North America and Asia. Nikki leads Green Sky’s work in responsible AI and measurable operational impact.`,
    blurb: "Drives AI-powered logistics and predictive supply chain solutions for global merchants.",
    quote: "AI isn’t magic—it's disciplined ops, cleaner data, and measurable outcomes.",
    focus: ["Forecasting (ML)", "Network optimization", "Responsible AI", "Operational analytics"],
    headshot: {
      src480: { jpg: "/people/nikki-b-480.jpg", webp: "/people/nikki-b-480.webp" },
      src800: { jpg: "/people/nikki-b-800.jpg", webp: "/people/nikki-b-800.webp" },
      src1200: { jpg: "/people/nikki-b-1200.jpg", webp: "/people/nikki-b-1200.webp" },
      alt: "Portrait of Nikki B",
    },
  },
  {
    slug: "kimberly-clark",
    name: "Kimberly Clark",
    role: "Principal, Digital Payments & Merchant Solutions",
    location: "Los Angeles, California",
    bio: `Kimberly leads payment architecture for cross-border checkout, alternative tenders, and fraud mitigation.
She combines fintech experience with enterprise risk programs to help merchants expand globally without compromising
security, compliance, or customer experience.`,
    blurb: "Leads next-gen payments, fraud prevention, and cross-border commerce strategies.",
    quote: "Frictionless doesn’t mean careless—trust is the real growth engine.",
    focus: ["Payments", "Fraud & risk", "Compliance", "Subscriptions"],
    headshot: {
      src480: { jpg: "/people/kimberly-clark-480.jpg", webp: "/people/kimberly-clark-480.webp" },
      src800: { jpg: "/people/kimberly-clark-800.jpg", webp: "/people/kimberly-clark-800.webp" },
      src1200: { jpg: "/people/kimberly-clark-1200.jpg", webp: "/people/kimberly-clark-1200.webp" },
      alt: "Portrait of Kimberly Clark",
    },
  },
  {
    slug: "marcus-lee",
    name: "Marcus Lee",
    role: "Director, Platform Engineering & APIs",
    location: "San Francisco, California",
    bio: `Marcus is responsible for the engineering architecture behind Green Sky’s commerce platform:
multi-region storefronts, high-availability APIs, and developer-first tooling. He has led platform migrations,
latency reduction programs, and zero-downtime deployments at global scale.`,
    blurb: "Architects scalable storefronts and APIs powering global digital commerce.",
    quote: "Reliability is a feature—ship it like the brand depends on it.",
    focus: ["Platform architecture", "APIs", "Edge & CDN", "SRE"],
    headshot: {
      src480: { jpg: "/people/marcus-lee-480.jpg", webp: "/people/marcus-lee-480.webp" },
      src800: { jpg: "/people/marcus-lee-800.jpg", webp: "/people/marcus-lee-800.webp" },
      src1200: { jpg: "/people/marcus-lee-1200.jpg", webp: "/people/marcus-lee-1200.webp" },
      alt: "Portrait of Marcus Lee",
    },
  },
  {
    slug: "amina-yusuf",
    name: "Amina Yusuf",
    role: "Head of Growth & Merchant Success",
    location: "New York, New York",
    bio: `Amina aligns growth marketing, lifecycle, and merchant success to unlock efficient revenue at scale.
She blends experimentation with analytics to drive conversion, retention, and LTV across regions and
customer segments—partnering closely with product and sales.`,
    blurb: "Aligns growth, analytics, and merchant success to unlock revenue at scale.",
    quote: "The cleanest funnel is the one you keep improving.",
    focus: ["Growth strategy", "Lifecycle & retention", "Analytics", "Merchant success"],
    headshot: {
      src480: { jpg: "/people/amina-yusuf-480.jpg", webp: "/people/amina-yusuf-480.webp" },
      src800: { jpg: "/people/amina-yusuf-800.jpg", webp: "/people/amina-yusuf-800.webp" },
      src1200: { jpg: "/people/amina-yusuf-1200.jpg", webp: "/people/amina-yusuf-1200.webp" },
      alt: "Portrait of Amina Yusuf",
    },
  },
];