import { NextResponse } from "next/server";

/**
 * Minimal contact endpoint (POST).
 * - Validates fields
 * - Pretends to dispatch (you can wire email, CRM, etc.)
 * - Returns GA4-friendly JSON
 *
 * Security notes:
 * - In production, add real rate limiting and server-side validation.
 * - Consider CAPTCHA or hCaptcha if spam becomes an issue.
 */
export async function POST(request: Request) {
  try {
    const { name, email, company, message, source } = (await request.json()) as {
      name?: string;
      email?: string;
      company?: string;
      message?: string;
      source?: string;
    };

    if (!name || typeof name !== "string" || !name.trim()) {
      return NextResponse.json({ ok: false, message: "Name is required." }, { status: 400 });
    }
    if (!email || typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ ok: false, message: "Valid email is required." }, { status: 400 });
    }
    if (!message || typeof message !== "string" || !message.trim()) {
      return NextResponse.json({ ok: false, message: "Message is required." }, { status: 400 });
    }

    // TODO: integrate email/CRM (e.g., Resend, SendGrid, HubSpot, Salesforce)
    // For now, log server-side (kept minimal to avoid leaking PII).
    console.log("[contact] inbound", {
      name: name.slice(0, 128),
      email: email.slice(0, 128),
      company: company?.slice(0, 128) ?? "",
      source: source ?? "unknown",
      len: message.length,
    });

    return NextResponse.json({ ok: true, message: "Submitted" });
  } catch {
    return NextResponse.json(
      { ok: false, message: "Bad request" },
      { status: 400 }
    );
  }
}
