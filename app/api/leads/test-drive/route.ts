import { NextResponse } from "next/server";
import { withPostgres } from "@/lib/postgres";
import { normalizePhone } from "@/lib/phone";
import { extractUtmFields } from "@/lib/utmFields";

function nullIfEmpty(value: unknown): string | null {
  return typeof value === "string" && value.trim() !== "" ? value : null;
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const {
    car_model,
    location,
    name,
    mobile_number,
    email,
    pincode,
    address,
    preferred_date,
    preferred_time,
    source,
  } = body;

  if (
    typeof car_model !== "string" ||
    typeof location !== "string" ||
    typeof name !== "string" ||
    typeof mobile_number !== "string" ||
    typeof email !== "string" ||
    typeof pincode !== "string" ||
    typeof preferred_date !== "string" ||
    typeof preferred_time !== "string"
  ) {
    return NextResponse.json(
      {
        error:
          "car_model, location, name, mobile_number, email, pincode, preferred_date, and preferred_time are required.",
      },
      { status: 400 },
    );
  }

  const normalizedPhone = normalizePhone(mobile_number);
  const utm = extractUtmFields(body);

  try {
    await withPostgres((client) =>
      client.query(
        `insert into public.test_drive_leads (
          car_model, location, name, mobile_number, email, pincode, address,
          preferred_date, preferred_time, source, verified,
          utm_source, utm_medium, utm_campaign, utm_id, utm_term, utm_content, gclid, fbclid
        ) values (
          $1, $2, $3, $4, $5, $6, $7,
          $8, $9, $10, true,
          $11, $12, $13, $14, $15, $16, $17, $18
        )`,
        [
          car_model,
          location,
          name,
          normalizedPhone,
          email,
          pincode,
          nullIfEmpty(address),
          preferred_date,
          preferred_time,
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
        message: "Failed to insert test-drive lead",
        error: error instanceof Error ? error.message : String(error),
      }),
    );
    return NextResponse.json({ error: "Failed to save lead." }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
