// app/api/subscribe/route.ts
import { NextResponse } from "next/server";

/** Incoming JSON payload shape */
type SubscribeReq = {
  email: string;
};

/** Minimal Mailchimp error/success shape we care about */
type MailchimpResponse = {
  title?: string;   // e.g., "Member Exists"
  detail?: string;  // e.g., "foo@bar.com is already a list member."
  status?: number | string;
};

/** Type guard for request body */
function isSubscribeReq(x: unknown): x is SubscribeReq {
  if (typeof x !== "object" || x === null) return false;
  const rec = x as Record<string, unknown>;
  return typeof rec.email === "string";
}

export async function POST(req: Request) {
  try {
    // Parse and validate body
    const parsed: unknown = await req.json().catch(() => null);
    if (!isSubscribeReq(parsed)) {
      return NextResponse.json({ ok: false, error: "Missing email" }, { status: 400 });
    }

    const email = parsed.email.trim().toLowerCase();
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      return NextResponse.json({ ok: false, error: "Invalid email" }, { status: 400 });
    }

    // Required env
    const API_KEY = process.env.MAILCHIMP_API_KEY;
    const LIST_ID = process.env.MAILCHIMP_AUDIENCE_ID;
    const DC = process.env.MAILCHIMP_SERVER_PREFIX; // e.g. "us14"

    if (!API_KEY || !LIST_ID || !DC) {
      return NextResponse.json({ ok: false, error: "Server misconfigured" }, { status: 500 });
    }

    // Mailchimp member upsert endpoint
    const url = `https://${DC}.api.mailchimp.com/3.0/lists/${LIST_ID}/members`;

    const mcBody = {
      email_address: email,
      status_if_new: "subscribed",
      status: "subscribed",
      marketing_permissions: [] as Array<unknown>,
    };

    const resp = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Basic ${Buffer.from(`anystring:${API_KEY}`).toString("base64")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(mcBody),
    });

    let data: MailchimpResponse | null = null;
    try {
      data = (await resp.json()) as MailchimpResponse;
    } catch {
      // If Mailchimp didn't return JSON, keep data as null
    }

    // Success (2xx) OR "already subscribed" (400 with known message)
    const alreadyExists =
      resp.status === 400 &&
      (data?.title === "Member Exists" ||
        (typeof data?.detail === "string" && data.detail.toLowerCase().includes("already")));

    if (resp.ok || alreadyExists) {
      return NextResponse.json({ ok: true });
    }

    return NextResponse.json(
      { ok: false, error: data?.detail || data?.title || "Subscription failed" },
      { status: 500 }
    );
  } catch {
    return NextResponse.json({ ok: false, error: "Unexpected error" }, { status: 500 });
  }
}