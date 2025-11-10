import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const name = searchParams.get("name") || "there";
  const listing = searchParams.get("listing") || "a property";

  const twiml = `<?xml version="1.0" encoding="UTF-8"?><Response><Say voice="Polly.Amy">Hello ${name}. This is TechVillage. We received your request to schedule a viewing for ${listing}. Our agent will contact you shortly to confirm a time. Thank you.</Say></Response>`;
  return new Response(twiml, { headers: { "Content-Type": "text/xml" } });
}
