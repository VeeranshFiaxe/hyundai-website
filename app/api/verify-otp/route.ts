import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { checkOtpChallenge, OTP_CHALLENGE_COOKIE } from "@/lib/otp";
import { normalizePhone } from "@/lib/phone";

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
  if (typeof otp !== "string" || !/^\d{4}$/.test(otp)) {
    return NextResponse.json(
      { error: "otp must contain exactly 4 digits." },
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
  const challenge = cookieStore.get(OTP_CHALLENGE_COOKIE)?.value;
  if (!challenge) {
    return NextResponse.json(
      { error: "No OTP found for this number. Please request a new OTP." },
      { status: 404 },
    );
  }

  let outcome: ReturnType<typeof checkOtpChallenge>;
  try {
    outcome = checkOtpChallenge(challenge, normalizedPhone, otp);
  } catch (error) {
    console.error(
      JSON.stringify({
        message: "Failed to check OTP challenge",
        error: error instanceof Error ? error.message : String(error),
      }),
    );
    return NextResponse.json({ error: "Failed to verify OTP." }, { status: 500 });
  }

  if (outcome === "valid") {
    // Single use: burn the challenge so the same code cannot be replayed.
    cookieStore.delete(OTP_CHALLENGE_COOKIE);
    return NextResponse.json({ success: true });
  }

  if (outcome === "expired") {
    cookieStore.delete(OTP_CHALLENGE_COOKIE);
    return NextResponse.json(
      { error: "OTP expired. Please request a new OTP." },
      { status: 410 },
    );
  }

  if (outcome === "malformed") {
    cookieStore.delete(OTP_CHALLENGE_COOKIE);
    return NextResponse.json(
      { error: "No OTP found for this number. Please request a new OTP." },
      { status: 404 },
    );
  }

  return NextResponse.json({ error: "Invalid OTP." }, { status: 401 });
}
