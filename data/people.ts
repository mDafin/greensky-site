// data/people.ts
export type Person = {
  slug: string;
  name: string;
  role: string;
  location: string;
  bio: string;
  blurb?: string;
  headshot: {
    src480: string;
    src800: string;
    src1200: string;
    alt: string;
  };
};

export const PEOPLE: Person[] = [
  {
    slug: "alvin-bradley",
    name: "Alvin Bradley",
    role: "Managing Director, Real Estate",
    location: "Irvine, California",
    bio: `Alvin Bradley leads core and core-plus strategies across West Coast markets with a focus on logistics and residential developments.`,
    blurb: "Leads core and core-plus strategies across West Coast markets.",
    headshot: {
      src480: "/people/alvin-bradley-480.jpg",
      src800: "/people/alvin-bradley-800.jpg",
      src1200: "/people/alvin-bradley-1200.jpg",
      alt: "Portrait of Alvin Bradley",
    },
  },
  {
    slug: "NikkiB",
    name: "Nikki B",
    role: "Partner, Private Equity",
    location: "Irvine, California",
    bio: `Nikki B drives scaled investments and operational value creation in technology and services.`,
    blurb: "Drives scaled investments and operational value creation.",
    headshot: {
      src480: "/people/NikkiB-480.jpg",
      src800: "/people/NikkiB-800.jpg",
      src1200: "/people/NikkiB-1200.jpg",
      alt: "Portrait of Nikki B",
    },
  },
  {
    slug: "kimberly-clark",
    name: "Kimberly Clark",
    role: "Principal, Private Credit",
    location: "Irvine, California",
    bio: `Kimberly Clark focuses on defensive income and flexible capital solutions across market cycles.`,
    blurb: "Focuses on defensive income and flexible capital solutions.",
    headshot: {
      src480: "/people/kimberly-clark-480.jpg",
      src800: "/people/kimberly-clark-800.jpg",
      src1200: "/people/kimberly-clark-1200.jpg",
      alt: "Portrait of Kimberly Clark",
    },
  },
];