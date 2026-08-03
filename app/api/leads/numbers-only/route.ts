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

  const { phone_number, form_source } = body;

  if (typeof phone_number !== "string" || typeof form_source !== "string") {
    return NextResponse.json(
      { error: "phone_number and form_source are required." },
      { status: 400 },
    );
  }

  const normalizedPhone = normalizePhone(phone_number);
  const utm = extractUtmFields(body);

  try {
    await withPostgres((client) =>
      client.query(
        `insert into public.numbers_only (
          phone_number, form_source,
          utm_source, utm_medium, utm_campaign, utm_id, utm_term, utm_content, gclid, fbclid
        ) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
        [
          normalizedPhone,
          form_source,
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
        message: "Failed to insert numbers-only lead",
        error: error instanceof Error ? error.message : String(error),
      }),
    );
    return NextResponse.json({ error: "Failed to save phone number." }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
