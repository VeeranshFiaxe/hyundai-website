import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";
import { normalizePhone } from "@/lib/phone";

const MAX_ATTEMPTS = 5;

export async function POST(request: Request) {
  let body: { phone_number?: unknown; otp?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const { phone_number, otp } = body;
  if (typeof phone_number !== "string" || phone_number.trim() === "") {
    return NextResponse.json(
      { error: "phone_number is required." },
      { status: 400 },
    );
  }
  if (typeof otp !== "string" || otp.trim() === "") {
    return NextResponse.json({ error: "otp is required." }, { status: 400 });
  }

  const normalizedPhone = normalizePhone(phone_number);
  if (!/^\d{7,15}$/.test(normalizedPhone)) {
    return NextResponse.json(
      { error: "phone_number must resolve to 7-15 digits." },
      { status: 400 },
    );
  }

  const supabaseAdmin = getSupabaseAdmin();

  // phone_otps has no unique constraint on phone_number, so more than one row
  // could in principle exist for a number — always act on the most recent one.
  const { data: rows, error: fetchError } = await supabaseAdmin
    .from("phone_otps")
    .select("id, otp, attempts, expires_at, verified")
    .eq("phone_number", normalizedPhone)
    .order("created_at", { ascending: false })
    .limit(1);

  if (fetchError) {
    console.error("[verify-otp] failed to look up OTP row", fetchError);
    return NextResponse.json(
      { error: "Failed to look up OTP." },
      { status: 500 },
    );
  }

  const row = rows?.[0];
  if (!row) {
    return NextResponse.json(
      { error: "No OTP found for this number. Please request a new OTP." },
      { status: 404 },
    );
  }

  if (new Date() > new Date(row.expires_at)) {
    return NextResponse.json(
      { error: "OTP expired. Please request a new OTP." },
      { status: 410 },
    );
  }

  if (row.attempts >= MAX_ATTEMPTS) {
    await supabaseAdmin.from("phone_otps").delete().eq("id", row.id);
    return NextResponse.json(
      { error: "Too many attempts. Please request a new OTP." },
      { status: 429 },
    );
  }

  if (row.otp !== otp) {
    await supabaseAdmin
      .from("phone_otps")
      .update({ attempts: row.attempts + 1 })
      .eq("id", row.id);
    return NextResponse.json({ error: "Invalid OTP." }, { status: 401 });
  }

  const { error: updateError } = await supabaseAdmin
    .from("phone_otps")
    .update({ verified: true })
    .eq("id", row.id);

  if (updateError) {
    console.error("[verify-otp] failed to mark OTP verified", updateError);
    return NextResponse.json(
      { error: "Failed to mark OTP as verified." },
      { status: 500 },
    );
  }

  return NextResponse.json({ success: true });
}
