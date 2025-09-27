// app/api/search/route.ts
import { NextResponse } from "next/server";
import { SEARCH_INDEX, type SearchItem } from "@/data/searchIndex";

type SearchResponse = {
  results: SearchItem[];
};

function normalize(s: string): string {
  return s.trim().toLowerCase();
}

export function GET(request: Request): NextResponse<SearchResponse> {
  const { searchParams } = new URL(request.url);
  const q = normalize(searchParams.get("q") ?? "");

  // Empty query: return a small curated set (first few)
  if (!q) {
    return NextResponse.json({
      results: SEARCH_INDEX.slice(0, 8),
    });
  }

  // Simple inclusive match over label + keywords
  const results: SearchItem[] = SEARCH_INDEX
    .filter((item: SearchItem) => {
      const hay = [
        item.label,
        item.section ?? "",
        ...(item.keywords ?? []),
      ]
        .join(" ")
        .toLowerCase();

      return hay.includes(q);
    })
    .slice(0, 12);

  return NextResponse.json({ results });
}