import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import {
  createOtp,
  createOtpChallenge,
  OTP_CHALLENGE_COOKIE,
  OTP_COOLDOWN_COOKIE,
  OTP_RESEND_COOLDOWN_MS,
  OTP_TTL_MS,
} from "@/lib/otp";
import { normalizePhone } from "@/lib/phone";
import { sendOtpSms } from "@/lib/sms";

const secureCookies = process.env.NODE_ENV === "production";

export async function POST(request: Request) {
  let body: { phone_number?: unknown };
  try {
    body = await request.json();
  } catch {
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

  const cookieStore = await cookies();

  // A UX guard against double-taps and accidental resends, not a security
  // control: clearing cookies resets it, exactly as it would in the old flow.
  const cooldownUntil = Number(cookieStore.get(OTP_COOLDOWN_COOKIE)?.value);
  if (Number.isSafeInteger(cooldownUntil) && Date.now() < cooldownUntil) {
    return NextResponse.json(
      { error: "An OTP was already sent recently. Please wait before retrying." },
      { status: 429 },
    );
  }

  const otp = createOtp();

  // Send first, then hand out the challenge, so a delivery failure simply
  // leaves the previous state untouched — there is nothing to roll back.
  try {
    const smsResult = await sendOtpSms(normalizedPhone, otp);
    console.log(
      JSON.stringify({
        message: "SMS OTP delivery completed",
        ok: smsResult.ok,
        status: smsResult.status,
      }),
    );

    if (!smsResult.ok) {
      return NextResponse.json(
        { error: "Failed to send OTP via SMS." },
        { status: 502 },
      );
    }
  } catch (error) {
    console.error(
      JSON.stringify({
        message: "SMS OTP delivery failed",
        error: error instanceof Error ? error.message : String(error),
      }),
    );
    return NextResponse.json(
      { error: "Failed to send OTP via SMS." },
      { status: 502 },
    );
  }

  const expiresAt = Date.now() + OTP_TTL_MS;

  cookieStore.set(
    OTP_CHALLENGE_COOKIE,
    createOtpChallenge(normalizedPhone, otp, expiresAt),
    {
      httpOnly: true,
      secure: secureCookies,
      sameSite: "lax",
      path: "/",
      maxAge: Math.ceil(OTP_TTL_MS / 1000),
    },
  );

  cookieStore.set(
    OTP_COOLDOWN_COOKIE,
    String(Date.now() + OTP_RESEND_COOLDOWN_MS),
    {
      httpOnly: true,
      secure: secureCookies,
      sameSite: "lax",
      path: "/",
      maxAge: Math.ceil(OTP_RESEND_COOLDOWN_MS / 1000),
    },
  );

  return NextResponse.json({ success: true });
}
