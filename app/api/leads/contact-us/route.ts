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

  const supabaseAdmin = getSupabaseAdmin();
  const { error } = await supabaseAdmin.from("contact_us_leads").insert({
    name,
    mobile_number: normalizedPhone,
    email,
    pincode,
    subject,
    message,
    source: typeof source === "string" && source.trim() !== "" ? source : "Website",
    verified: true,
    ...extractUtmFields(body),
  });

  if (error) {
    console.error("[leads/contact-us] Supabase insert error", error);
    return NextResponse.json({ error: "Failed to save lead." }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
