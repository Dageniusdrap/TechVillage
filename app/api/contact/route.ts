import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { name, email, phone, message } = await req.json().catch(() => ({}));

  // Basic validation
  if (!name || !email) {
    return NextResponse.json({ ok: false, error: "Missing name or email" }, { status: 400 });
  }

  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL || "noreply@example.com";
  const resendKey = process.env.RESEND_API_KEY;

  // If Resend is configured, send email; otherwise just log to server
  if (resendKey && to) {
    try {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${resendKey}`,
        },
        body: JSON.stringify({
          from,
          to,
          subject: `New inquiry from ${name}`,
          html: `<p><b>Name:</b> ${name}</p><p><b>Email:</b> ${email}</p><p><b>Phone:</b> ${phone || "-"}</p><p><b>Message:</b><br/>${(message || "").replace(/</g, "&lt;")}`,
        }),
      });
      if (!res.ok) {
        const text = await res.text();
        console.error("Resend error:", text);
        return NextResponse.json({ ok: false }, { status: 500 });
      }
      return NextResponse.json({ ok: true }, { status: 200 });
    } catch (e) {
      console.error(e);
      return NextResponse.json({ ok: false }, { status: 500 });
    }
  }

  console.log("Contact message:", { name, email, phone, message });
  return NextResponse.json({ ok: true }, { status: 200 });
}
