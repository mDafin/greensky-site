// data/searchIndex.ts
export type SearchItem = {
  label: string;
  href: string;
  section?: string;
  keywords?: string[];
};

export const SEARCH_INDEX: SearchItem[] = [
  // --- Top-level
  { label: "The Firm — Overview", href: "/about", section: "The Firm", keywords: ["about", "overview", "company"] },
  { label: "Our People", href: "/people", section: "The Firm", keywords: ["team", "leadership"] },
  { label: "Careers", href: "/careers", section: "The Firm", keywords: ["jobs", "roles", "hiring"] },

  // Clients
  { label: "Institutional Investors", href: "/clients/institutional", section: "Clients" },
  { label: "Financial Advisors", href: "/clients/advisors", section: "Clients" },
  { label: "Family Offices", href: "/clients/family-offices", section: "Clients" },
  { label: "Insurance", href: "/clients/insurance", section: "Clients" },

  // Businesses / What We Do
  { label: "Private Equity", href: "/businesses/pe", section: "Businesses", keywords: ["buyouts", "equity"] },
  { label: "Real Estate", href: "/businesses/re", section: "Businesses", keywords: ["property", "real estate"] },
  { label: "Private Credit & Insurance", href: "/businesses/credit", section: "Businesses", keywords: ["credit"] },
  { label: "Strategic Partners", href: "/businesses/sp", section: "Businesses" },
  { label: "Tactical Opportunities", href: "/businesses/tac-opp", section: "Businesses" },
  { label: "Infrastructure", href: "/businesses/infra", section: "Businesses" },
  { label: "Life Sciences", href: "/businesses/life-sciences", section: "Businesses" },
  { label: "Growth", href: "/businesses/growth", section: "Businesses" },

  // Transformation
  { label: "Technology & Innovation", href: "/transformation/tech", section: "Transformation" },
  { label: "Operating Team", href: "/transformation/operating-team", section: "Transformation" },

  // Products
  { label: "BREIT", href: "/products/breit", section: "Products" },
  { label: "BCRED", href: "/products/bcred", section: "Products" },
  { label: "BMACX", href: "/products/bmacx", section: "Products" },
  { label: "All Products", href: "/products", section: "Products" },

  // News & Insights
  { label: "News — View All", href: "/news", section: "News & Insights" },
  { label: "Press Releases", href: "/press", section: "News & Insights", keywords: ["press", "releases"] },
  { label: "In the News", href: "/in-the-news", section: "News & Insights" },
  { label: "Insights — View All", href: "/insights", section: "News & Insights" },
  { label: "Market Views", href: "/insights/market-views", section: "News & Insights" },
  { label: "Pattern Recognition", href: "/insights/pattern-recognition", section: "News & Insights" },

  // Essentials of Private Markets
  { label: "Private Markets — Overview", href: "/private-markets", section: "Essentials of Private Markets" },
  { label: "Private Equity (Essentials)", href: "/private-markets/pe", section: "Essentials of Private Markets" },
  { label: "Private Credit (Essentials)", href: "/private-markets/credit", section: "Essentials of Private Markets" },
  { label: "Private Real Estate (Essentials)", href: "/private-markets/re", section: "Essentials of Private Markets" },
  { label: "Private Infrastructure (Essentials)", href: "/private-markets/infra", section: "Essentials of Private Markets" },

  // Financial Advisors
  { label: "Private Wealth at Green Sky", href: "/private-wealth", section: "Financial Advisors" },
  { label: "University — Overview", href: "/university", section: "Financial Advisors" },
  { label: "University — Essentials", href: "/university/essentials", section: "Financial Advisors" },
  { label: "Accessing Private Markets", href: "/university/accessing", section: "Financial Advisors" },
  { label: "Allocating to Private Assets", href: "/university/allocating", section: "Financial Advisors" },
  { label: "University — Insights", href: "/university/insights", section: "Financial Advisors" },
  { label: "University — Events", href: "/university/events", section: "Financial Advisors" },
  { label: "Continuing Education", href: "/university/ce", section: "Financial Advisors" },

  // Utility
  { label: "Shareholders", href: "/shareholders", section: "Utility" },
  { label: "LP Login", href: "/lp-login", section: "Utility" },
];