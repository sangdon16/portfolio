import { NextResponse } from "next/server";
import { site } from "@/content/site";

const limits = { name: 120, email: 200, message: 5000 };

export async function POST(request: Request) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Could not read that note." }, { status: 400 });
  }

  const body = payload as { name?: unknown; email?: unknown; message?: unknown; company?: unknown };
  if (String(body.company || "").trim()) {
    return NextResponse.json({ ok: true });
  }

  const name = String(body.name || "").trim();
  const email = String(body.email || "").trim();
  const message = String(body.message || "").trim();

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Name, email, and a message are required." }, { status: 400 });
  }
  if (name.length > limits.name || email.length > limits.email || message.length > limits.message) {
    return NextResponse.json({ error: "That note is too long." }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
  }

  const origin = request.headers.get("origin") || new URL(request.url).origin;
  let response: Response;
  try {
    response = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(site.email)}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Origin: origin,
        Referer: `${origin}/`,
      },
      body: JSON.stringify({
        name,
        email,
        message,
        _subject: `Note from ${name}`,
        _replyto: email,
        _template: "box",
        _captcha: "false",
      }),
    });
  } catch {
    return NextResponse.json({ error: "The note could not be sent." }, { status: 502 });
  }

  const result = (await response.json().catch(() => null)) as { success?: string | boolean; message?: string } | null;
  if (result?.message && /activation/i.test(result.message)) {
    return NextResponse.json(
      { error: "Check your inbox for the form activation email, then send the note again." },
      { status: 409 },
    );
  }
  if (!response.ok || !result || result.success === false || result.success === "false") {
    return NextResponse.json({ error: "The note could not be sent." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
