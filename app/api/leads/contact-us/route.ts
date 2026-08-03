import { NextResponse } from "next/server";
import { withPostgres } from "@/lib/postgres";
import { normalizePhone } from "@/lib/phone";
import { extractUtmFields } from "@/lib/utmFields";

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const { name, mobile_number, email, pincode, subject, message, source } = body;

  if (
    typeof name !== "string" ||
    typeof mobile_number !== "string" ||
    typeof email !== "string" ||
    typeof pincode !== "string" ||
    typeof subject !== "string" ||
    typeof message !== "string"
  ) {
    return NextResponse.json(
      { error: "name, mobile_number, email, pincode, subject, and message are required." },
      { status: 400 },
    );
  }

  const normalizedPhone = normalizePhone(mobile_number);
  const utm = extractUtmFields(body);

  try {
    await withPostgres((client) =>
      client.query(
        `insert into public.contact_us_leads (
          name, mobile_number, email, pincode, subject, message, source, verified,
          utm_source, utm_medium, utm_campaign, utm_id, utm_term, utm_content, gclid, fbclid
        ) values (
          $1, $2, $3, $4, $5, $6, $7, true,
          $8, $9, $10, $11, $12, $13, $14, $15
        )`,
        [
          name,
          normalizedPhone,
          email,
          pincode,
          subject,
          message,
          typeof source === "string" && source.trim() !== "" ? source : "Website",
          utm.utm_source,
          utm.utm_medium,
          utm.utm_campaign,
          utm.utm_id,
          utm.utm_term,
          utm.utm_content,
          utm.gclid,
          utm.fbclid,
        ],
      ),
    );
  } catch (error) {
    console.error(
      JSON.stringify({
        message: "Failed to insert contact-us lead",
        error: error instanceof Error ? error.message : String(error),
      }),
    );
    return NextResponse.json({ error: "Failed to save lead." }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
