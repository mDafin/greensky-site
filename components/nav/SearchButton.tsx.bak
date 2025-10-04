"use client";

import React, { useMemo, useState } from "react";
import SearchOverlay, { SearchResult } from "@/components/nav/SearchOverlay";

type SearchButtonProps = {
  className?: string;
};

/**
 * Small button that opens the SearchOverlay.
 * It ships with a sensible default index so it's useful immediately,
 * but you can later feed a real index via props if you prefer.
 */
export default function SearchButton({ className = "" }: SearchButtonProps) {
  const [open, setOpen] = useState(false);

  // Default index — mirrors your current nav/site structure
  const index: SearchResult[] = useMemo(
    () => [
      // The Firm
      { label: "The Firm — Overview", href: "/about", section: "The Firm" },
      { label: "Our People", href: "/people", section: "The Firm" },
      { label: "Careers", href: "/careers", section: "The Firm" },

      // What we do
      { label: "Private Equity", href: "/businesses/pe", section: "What We Do" },
      { label: "Real Estate", href: "/businesses/re", section: "What We Do" },
      { label: "Private Credit", href: "/businesses/credit", section: "What We Do" },
      { label: "Strategic Partners", href: "/businesses/sp", section: "What We Do" },
      { label: "Tactical Opportunities", href: "/businesses/tac-opp", section: "What We Do" },
      { label: "Infrastructure", href: "/businesses/infra", section: "What We Do" },
      { label: "Life Sciences", href: "/businesses/life-sciences", section: "What We Do" },
      { label: "Growth", href: "/businesses/growth", section: "What We Do" },

      // Insights / News
      { label: "News — View All", href: "/news", section: "News & Insights" },
      { label: "Press Releases", href: "/press", section: "News & Insights" },
      { label: "In the News", href: "/in-the-news", section: "News & Insights" },
      { label: "Insights — View All", href: "/insights", section: "News & Insights" },
      { label: "Market Views", href: "/insights/market-views", section: "News & Insights" },
      { label: "Pattern Recognition", href: "/insights/pattern-recognition", section: "News & Insights" },

      // Advisors
      { label: "Private Wealth — Overview", href: "/private-wealth", section: "Financial Advisors" },
      { label: "University — Overview", href: "/university", section: "Financial Advisors" },
      { label: "Essentials", href: "/university/essentials", section: "Financial Advisors" },
      { label: "Accessing Private Markets", href: "/university/accessing", section: "Financial Advisors" },
      { label: "Allocating to Private Assets", href: "/university/allocating", section: "Financial Advisors" },
      { label: "Continuing Education", href: "/university/ce", section: "Financial Advisors" },

      // Utility pages
      { label: "Shareholders", href: "/shareholders", section: "Company" },
      { label: "LP Login", href: "/lp-login", section: "Company" },

      // CTA
      { label: "Contact Us", href: "/contact", section: "Company" },
    ],
    []
  );

  return (
    <>
      <button
        type="button"
        aria-label="Open search"
        onClick={() => setOpen(true)}
        className={
          className ||
          "rounded-lg border border-white/15 px-2.5 py-2 text-sm text-white/90 hover:text-white"
        }
      >
        {/* Simple magnifier icon */}
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
          className="h-5 w-5"
          fill="currentColor"
        >
          <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79L20 21.49 21.49 20zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
        </svg>
      </button>

      <SearchOverlay
        open={open}
        onClose={() => setOpen(false)}
        source={index}
        initialQuery=""
      />
    </>
  );
}