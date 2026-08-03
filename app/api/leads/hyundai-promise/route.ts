import { NextResponse } from "next/server";
import { withPostgres } from "@/lib/postgres";
import { normalizePhone } from "@/lib/phone";
import { extractUtmFields } from "@/lib/utmFields";

function nullIfEmpty(value: unknown): string | null {
  return typeof value === "string" && value.trim() !== "" ? value : null;
}

// Strict: only accepts a plain integer/decimal string as-is. Free text like
// "Rs. 8-10 lakh" (a range) has no single correct numeric value, so it
// becomes null rather than a guessed/mangled number.
function parseStrictNumber(value: unknown): number | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  if (!/^\d+(\.\d+)?$/.test(trimmed)) return null;
  return Number(trimmed);
}

// Lenient: strips non-digit characters (handles "35,000 km" -> 35000).
// Safe here because kilometers/year are single figures, not ranges.
function parseLenientInt(value: unknown): number | null {
  if (typeof value !== "string") return null;
  const digitsOnly = value.replace(/\D/g, "");
  if (digitsOnly === "") return null;
  return parseInt(digitsOnly, 10);
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const {
    type,
    full_name,
    mobile_number,
    email,
    location,
    car_brand,
    car_model,
    year_of_purchase,
    kilometers_driven,
    budget_range,
    additional_details,
    source,
  } = body;

  if (
    (type !== "Buy" && type !== "Sell") ||
    typeof full_name !== "string" ||
    typeof mobile_number !== "string" ||
    typeof email !== "string" ||
    typeof location !== "string" ||
    typeof car_model !== "string"
  ) {
    return NextResponse.json(
      { error: "type ('Buy' or 'Sell'), full_name, mobile_number, email, location, and car_model are required." },
      { status: 400 },
    );
  }

  const normalizedPhone = normalizePhone(mobile_number);
  const utm = extractUtmFields(body);

  try {
    await withPostgres((client) =>
      client.query(
        `insert into public.hyundai_promise_leads (
          type, full_name, mobile_number, email, location, car_brand, car_model,
          year_of_purchase, kilometers_driven, budget_range, additional_details, source, verified,
          utm_source, utm_medium, utm_campaign, utm_id, utm_term, utm_content, gclid, fbclid
        ) values (
          $1, $2, $3, $4, $5, $6, $7,
          $8, $9, $10, $11, $12, true,
          $13, $14, $15, $16, $17, $18, $19, $20
        )`,
        [
          type,
          full_name,
          normalizedPhone,
          email,
          location,
          nullIfEmpty(car_brand),
          car_model,
          parseLenientInt(year_of_purchase),
          parseLenientInt(kilometers_driven),
          parseStrictNumber(budget_range),
          nullIfEmpty(additional_details),
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
        message: "Failed to insert Hyundai Promise lead",
        error: error instanceof Error ? error.message : String(error),
      }),
    );
    return NextResponse.json({ error: "Failed to save lead." }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
