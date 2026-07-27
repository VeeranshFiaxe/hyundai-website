import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";
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

  const supabaseAdmin = getSupabaseAdmin();
  const { error } = await supabaseAdmin.from("numbers_only").insert({
    phone_number: normalizedPhone,
    form_source,
    ...extractUtmFields(body),
  });

  if (error) {
    console.error("[leads/numbers-only] Supabase insert error", error);
    return NextResponse.json({ error: "Failed to save phone number." }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
