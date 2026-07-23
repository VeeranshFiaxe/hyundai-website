import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";
import { normalizePhone } from "@/lib/phone";
import { sendOtpWhatsApp } from "@/lib/whatsapp";

const RESEND_COOLDOWN_MS = 60 * 1000;
const OTP_TTL_MS = 5 * 60 * 1000;

export async function POST(request: Request) {
  // DIAGNOSTIC: confirm the four env vars this route depends on are actually
  // loaded at runtime. Logs presence only, never the secret values themselves.
  console.log("[send-otp] env check", {
    SUPABASE_URL: Boolean(process.env.SUPABASE_URL),
    SUPABASE_SERVICE_ROLE_KEY: Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY),
    WHATSAPP_API_KEY: Boolean(process.env.WHATSAPP_API_KEY),
    WHATSAPP_ENDPOINT_URL: Boolean(process.env.WHATSAPP_ENDPOINT_URL),
  });

  try {
    let body: { phone_number?: unknown };
    try {
      body = await request.json();
    } catch (err) {
      console.error("[send-otp] failed to parse request JSON", err);
      return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
    }

    const { phone_number } = body;
    if (typeof phone_number !== "string" || phone_number.trim() === "") {
      return NextResponse.json(
        { error: "phone_number is required." },
        { status: 400 },
      );
    }

    const normalizedPhone = normalizePhone(phone_number);
    if (!/^\d{7,15}$/.test(normalizedPhone)) {
      return NextResponse.json(
        { error: "phone_number must resolve to 7-15 digits." },
        { status: 400 },
      );
    }

    let supabaseAdmin;
    try {
      supabaseAdmin = getSupabaseAdmin();
    } catch (err) {
      console.error("[send-otp] getSupabaseAdmin() threw (env vars likely missing)", err);
      return NextResponse.json(
        { error: "Supabase is not configured." },
        { status: 500 },
      );
    }

    // phone_otps has no unique constraint on phone_number, so we can't rely on
    // a DB-level upsert (ON CONFLICT). Instead: look up the most recent row for
    // this number ourselves and decide whether to update it or insert fresh.
    let existingRows;
    try {
      const result = await supabaseAdmin
        .from("phone_otps")
        .select("id, created_at")
        .eq("phone_number", normalizedPhone)
        .order("created_at", { ascending: false })
        .limit(1);
      if (result.error) {
        console.error("[send-otp] Supabase select error (rate-limit lookup)", result.error);
        return NextResponse.json(
          { error: "Failed to check OTP rate limit." },
          { status: 500 },
        );
      }
      existingRows = result.data;
    } catch (err) {
      console.error("[send-otp] Supabase select threw (rate-limit lookup)", err);
      return NextResponse.json(
        { error: "Failed to check OTP rate limit." },
        { status: 500 },
      );
    }

    const existingRow = existingRows?.[0];
    if (existingRow) {
      const age = Date.now() - new Date(existingRow.created_at).getTime();
      if (age < RESEND_COOLDOWN_MS) {
        return NextResponse.json(
          { error: "An OTP was already sent recently. Please wait before retrying." },
          { status: 429 },
        );
      }
    }

    const otp = String(Math.floor(1000 + Math.random() * 9000));
    const now = new Date();
    const otpRow = {
      phone_number: normalizedPhone,
      otp,
      attempts: 0,
      created_at: now.toISOString(),
      expires_at: new Date(now.getTime() + OTP_TTL_MS).toISOString(),
      verified: false,
    };

    try {
      const result = existingRow
        ? await supabaseAdmin.from("phone_otps").update(otpRow).eq("id", existingRow.id)
        : await supabaseAdmin.from("phone_otps").insert(otpRow);
      if (result.error) {
        console.error("[send-otp] Supabase write error (insert/update OTP row)", result.error);
        return NextResponse.json(
          { error: "Failed to store OTP." },
          { status: 500 },
        );
      }
    } catch (err) {
      console.error("[send-otp] Supabase write threw (insert/update OTP row)", err);
      return NextResponse.json(
        { error: "Failed to store OTP." },
        { status: 500 },
      );
    }

    try {
      const whatsappResult = await sendOtpWhatsApp(normalizedPhone, otp);
      console.log("[send-otp] WhatsApp result", {
        ok: whatsappResult.ok,
        status: whatsappResult.status,
        body: whatsappResult.body,
      });
      if (!whatsappResult.ok) {
        const { error: deleteError } = await supabaseAdmin
          .from("phone_otps")
          .delete()
          .eq("phone_number", normalizedPhone);
        if (deleteError) {
          console.error("[send-otp] failed to roll back OTP row after WhatsApp failure", deleteError);
        }
        return NextResponse.json(
          { error: "Failed to send OTP via WhatsApp." },
          { status: 502 },
        );
      }
    } catch (err) {
      console.error("[send-otp] WhatsApp call threw", err);
      const { error: deleteError } = await supabaseAdmin
        .from("phone_otps")
        .delete()
        .eq("phone_number", normalizedPhone);
      if (deleteError) {
        console.error("[send-otp] failed to roll back OTP row after WhatsApp exception", deleteError);
      }
      return NextResponse.json(
        { error: "Failed to send OTP via WhatsApp." },
        { status: 502 },
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    // Catch-all: anything unhandled above (should be nothing, given the
    // per-step try/catches) surfaces here with its full stack trace instead
    // of silently becoming a bare framework 500.
    console.error("[send-otp] unhandled error", err);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}
