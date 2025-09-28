// data/firm.ts

// ----- Types -----
export type CTA = {
  label: string;
  href: string;
  variant: "primary" | "secondary";
};

export type FirmIntro = {
  title: string;
  subtitle: string;
  ctas: CTA[];
};

export type Stat = {
  value: string;
  label: string;
  footnote?: string;
};

export type TabLink = { label: string; href: string };

export type BusinessTab = {
  id: string;
  label: string;
  headline: string;
  body: string;
  links?: TabLink[];
  image: { src: string; alt: string };
};

export type FeaturedInsight = {
  kicker: string;
  title: string;
  summary: string;
  href: string;
};

export type Logo = { src: string; alt: string };

export type Footprint = {
  regions: string[];
  map: { src: string; alt: string };
};

// ----- Data -----
export const FIRM_INTRO: FirmIntro = {
  title: "The Firm",
  subtitle:
    "Delivering durable value for investors by building resilient businesses, transforming industries, and generating long-term impact.",
  ctas: [
    { label: "About Us", href: "/about", variant: "primary" },
    { label: "Our People", href: "/people", variant: "secondary" },
  ],
};

export const FIRM_STATS: Stat[] = [
  { value: "$100B+", label: "Assets Managed", footnote: "Illustrative placeholder" },
  { value: "250+", label: "Portfolio Companies" },
  { value: "40+", label: "Countries" },
  { value: "3,000+", label: "Employees" },
];

export const BUSINESS_TABS: BusinessTab[] = [
  {
    id: "pe",
    label: "Private Equity",
    headline: "Scale, modernization, and operational excellence",
    body:
      "We partner with exceptional teams to transform durable business models, leveraging technology and operating expertise to compound value over time.",
    links: [
      { label: "Strategy Overview", href: "/businesses/pe" },
      { label: "Case Studies", href: "/insights" },
    ],
    image: { src: "/firm/pe.jpg", alt: "Private equity operations" },
  },
  {
    id: "re",
    label: "Real Estate",
    headline: "Cycle-aware investing across sectors and geographies",
    body:
      "From logistics to residential, we target high-conviction themes supported by fundamentals, using disciplined risk management to protect and grow capital.",
    links: [
      { label: "Strategy Overview", href: "/businesses/re" },
      { label: "Selected Assets", href: "/portfolio" },
    ],
    image: { src: "/firm/re.jpg", alt: "Modern real estate assets" },
  },
  {
    id: "credit",
    label: "Private Credit",
    headline: "Flexible capital solutions and defensive income",
    body:
      "Across market cycles, we provide capital tailored to the needs of resilient issuers, with an emphasis on downside protection and attractive income.",
    links: [
      { label: "Strategy Overview", href: "/businesses/credit" },
      { label: "BCRED", href: "/products/bcred" },
    ],
    image: { src: "/firm/credit.jpg", alt: "Credit strategy" },
  },
];

export const FEATURED_INSIGHT: FeaturedInsight = {
  kicker: "Featured Insight",
  title: "Pattern Recognition: Infrastructure of the Future",
  summary:
    "How secular trends in digital infrastructure, energy transition, and logistics are reshaping private markets.",
  href: "/themes/infrastructure-of-the-future",
};

export const LOGOS: Logo[] = [
  { src: "/logos/logo-1.svg", alt: "Logo 1" },
  { src: "/logos/logo-2.svg", alt: "Logo 2" },
  { src: "/logos/logo-3.svg", alt: "Logo 3" },
  { src: "/logos/logo-4.svg", alt: "Logo 4" },
  { src: "/logos/logo-5.svg", alt: "Logo 5" },
  { src: "/logos/logo-6.svg", alt: "Logo 6" },
];

export const FOOTPRINT: Footprint = {
  regions: ["North America", "Europe", "Asia-Pacific", "Latin America", "Middle East & Africa"],
  map: { src: "/firm/map.jpg", alt: "Global presence map" },
};
