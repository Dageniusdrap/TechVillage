import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { name, phone, preferredTime, listingId } = await req.json().catch(() => ({}));
  if (!name || !phone) {
    return NextResponse.json({ ok: false, error: "Missing name or phone" }, { status: 400 });
  }

  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const fromNumber = process.env.TWILIO_FROM_NUMBER;
  const toNumber = phone;

  // If Twilio credentials present, place an outbound call with a simple TwiML
  if (accountSid && authToken && fromNumber) {
    try {
      const body = new URLSearchParams({
        To: toNumber,
        From: fromNumber,
        Url: `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/api/twiml?name=${encodeURIComponent(name)}&listing=${encodeURIComponent(listingId || "")}`,
      });
      const res = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Calls.json`, {
        method: "POST",
        headers: {
          "Authorization": `Basic ${Buffer.from(`${accountSid}:${authToken}`).toString("base64")}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(JSON.stringify(data));
      return NextResponse.json({ ok: true, callSid: data.sid });
    } catch (e) {
      console.error("Twilio call error", e);
      return NextResponse.json({ ok: false, error: "Failed to place call" }, { status: 500 });
    }
  }

  // Fallback: log the request for manual follow-up
  console.log("Schedule call (no Twilio configured):", { name, phone, preferredTime, listingId });
  return NextResponse.json({ ok: true, scheduled: true });
}
