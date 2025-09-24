import { cookies } from "next/headers";
export async function POST() {
  cookies().set({
    name: "__Host-gs_session",
    value: "opaque-token",
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    path: "/", // required for __Host-
  });
  return new Response(null, { status: 204 });
}
// app/api/search/route.ts
import { z } from "zod";
const Query = z.object({ q: z.string().max(200) });

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const parse = Query.safeParse({ q: searchParams.get("q") ?? "" });
  if (!parse.success) return new Response("Bad Request", { status: 400 });
  const q = parse.data.q.trim();
  // ... do safe search ...
  return Response.json({ results: [] });
}
