import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";
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

  const supabaseAdmin = getSupabaseAdmin();
  const { error } = await supabaseAdmin.from("hyundai_promise_leads").insert({
    type,
    full_name,
    mobile_number: normalizedPhone,
    email,
    location,
    car_brand: nullIfEmpty(car_brand),
    car_model,
    year_of_purchase: parseLenientInt(year_of_purchase),
    kilometers_driven: parseLenientInt(kilometers_driven),
    budget_range: parseStrictNumber(budget_range),
    additional_details: nullIfEmpty(additional_details),
    source: typeof source === "string" && source.trim() !== "" ? source : "Website",
    verified: true,
    ...extractUtmFields(body),
  });

  if (error) {
    console.error("[leads/hyundai-promise] Supabase insert error", error);
    return NextResponse.json({ error: "Failed to save lead." }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
