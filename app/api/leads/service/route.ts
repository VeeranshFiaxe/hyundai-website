import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";
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
    service_centre,
    service_type,
    name,
    mobile_number,
    email,
    registration_number,
    preferred_date,
    preferred_time,
    pickup_drop,
    source,
  } = body;

  if (
    typeof car_model !== "string" ||
    typeof service_centre !== "string" ||
    typeof service_type !== "string" ||
    typeof name !== "string" ||
    typeof mobile_number !== "string" ||
    typeof email !== "string" ||
    typeof preferred_date !== "string" ||
    typeof preferred_time !== "string" ||
    typeof pickup_drop !== "string"
  ) {
    return NextResponse.json(
      {
        error:
          "car_model, service_centre, service_type, name, mobile_number, email, preferred_date, preferred_time, and pickup_drop are required.",
      },
      { status: 400 },
    );
  }

  const normalizedPhone = normalizePhone(mobile_number);

  const supabaseAdmin = getSupabaseAdmin();
  const { error } = await supabaseAdmin.from("service_leads").insert({
    car_model,
    service_centre,
    service_type,
    name,
    mobile_number: normalizedPhone,
    email,
    registration_number: nullIfEmpty(registration_number),
    preferred_date,
    preferred_time,
    pickup_drop,
    source: typeof source === "string" && source.trim() !== "" ? source : "Website",
    verified: true,
    ...extractUtmFields(body),
  });

  if (error) {
    console.error("[leads/service] Supabase insert error", error);
    return NextResponse.json({ error: "Failed to save lead." }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
