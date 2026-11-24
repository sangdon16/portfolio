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

  let response: Response;
  try {
    response = await fetch(`https://flowform.to/${encodeURIComponent(site.email)}`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        name,
        email,
        message,
        _subject: `Note from ${name}`,
        _gotcha: "",
      }),
    });
  } catch {
    return NextResponse.json({ error: "The note could not be sent." }, { status: 502 });
  }

  const result = (await response.json().catch(() => null)) as { success?: boolean } | null;
  if (!response.ok || !result?.success) {
    return NextResponse.json({ error: "The note could not be sent." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
