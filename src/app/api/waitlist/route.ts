import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    return NextResponse.json(
      {
        error:
          "Waitlist is not configured yet. Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY on Vercel (see README).",
      },
      { status: 503 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const email =
    typeof body === "object" &&
    body !== null &&
    "email" in body &&
    typeof (body as { email: unknown }).email === "string"
      ? (body as { email: string }).email.trim()
      : "";

  if (!email || !EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }

  const normalized = email.toLowerCase();
  const supabase = createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const { error } = await supabase.from("waitlist_signups").insert({ email: normalized });

  if (error) {
    if (error.code === "23505") {
      return NextResponse.json({ ok: true, duplicate: true });
    }
    console.error("[waitlist]", error.message);
    return NextResponse.json({ error: "Could not save your email. Try again in a moment." }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
