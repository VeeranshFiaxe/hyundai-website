import { NextResponse } from "next/server";
import { otpMatches } from "@/lib/otp";
import { normalizePhone } from "@/lib/phone";
import { withPostgresTransaction } from "@/lib/postgres";

const MAX_ATTEMPTS = 5;

type VerificationOutcome =
  | "success"
  | "not-found"
  | "expired"
  | "too-many-attempts"
  | "invalid";

async function verifyStoredOtp(
  phoneNumber: string,
  providedOtp: string,
): Promise<VerificationOutcome> {
  return withPostgresTransaction(async (client) => {
    const result = await client.query<{
      id: string;
      otp: string;
      attempts: number;
      expires_at: Date;
    }>(
      `
        select id, otp, attempts, expires_at, current_timestamp as checked_at
        from public.phone_otps
        where phone_number = $1
        for update
      `,
      [phoneNumber],
    );

    const row = result.rows[0];
    if (!row) {
      return "not-found";
    }

    if (row.expires_at.getTime() <= Date.now()) {
      return "expired";
    }

    if (row.attempts >= MAX_ATTEMPTS) {
      return "too-many-attempts";
    }

    if (!otpMatches(row.otp, providedOtp)) {
      await client.query(
        `
          update public.phone_otps
          set attempts = attempts + 1
          where id = $1
        `,
        [row.id],
      );
      return "invalid";
    }

    await client.query(
      `
        update public.phone_otps
        set verified = true
        where id = $1
      `,
      [row.id],
    );

    return "success";
  });
}

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

  let outcome: VerificationOutcome;
  try {
    outcome = await verifyStoredOtp(normalizedPhone, otp);
  } catch (error) {
    console.error(
      JSON.stringify({
        message: "Failed to verify OTP in PostgreSQL",
        error: error instanceof Error ? error.message : String(error),
      }),
    );
    return NextResponse.json(
      { error: "Failed to verify OTP." },
      { status: 500 },
    );
  }

  switch (outcome) {
    case "success":
      return NextResponse.json({ success: true });
    case "not-found":
      return NextResponse.json(
        { error: "No OTP found for this number. Please request a new OTP." },
        { status: 404 },
      );
    case "expired":
      return NextResponse.json(
        { error: "OTP expired. Please request a new OTP." },
        { status: 410 },
      );
    case "too-many-attempts":
      return NextResponse.json(
        { error: "Too many attempts. Please request a new OTP." },
        { status: 429 },
      );
    case "invalid":
      return NextResponse.json({ error: "Invalid OTP." }, { status: 401 });
  }
}
