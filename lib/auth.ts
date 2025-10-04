import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import type { Role } from "./rbac";

type SessionPayload = {
  sub: string;
  email: string;
  roles: Role[];
  jti?: string;
  iat?: number;
  exp?: number;
};

export async function getSession(): Promise<SessionPayload | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get("gs_session")?.value;
  if (!token) return null;
  try {
    const secret = process.env.AUTH_JWT_SECRET;
    if (!secret) throw new Error("Missing AUTH_JWT_SECRET");
    const payload = jwt.verify(token, secret) as SessionPayload;
    return payload;
  } catch {
    return null;
  }
}

export async function requireSession(): Promise<SessionPayload> {
  const session = await getSession();
  if (!session) throw Object.assign(new Error("Unauthorized"), { status: 401 });
  return session;
}
