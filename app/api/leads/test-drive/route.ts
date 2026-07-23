import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";
import { normalizePhone } from "@/lib/phone";

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

  const supabaseAdmin = getSupabaseAdmin();
  const { error } = await supabaseAdmin.from("test_drive_leads").insert({
    car_model,
    location,
    name,
    mobile_number: normalizedPhone,
    email,
    pincode,
    address: nullIfEmpty(address),
    preferred_date,
    preferred_time,
    source: typeof source === "string" && source.trim() !== "" ? source : "Website",
    verified: true,
  });

  if (error) {
    console.error("[leads/test-drive] Supabase insert error", error);
    return NextResponse.json({ error: "Failed to save lead." }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
