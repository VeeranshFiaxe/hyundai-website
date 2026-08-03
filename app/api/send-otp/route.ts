import { NextResponse } from "next/server";
import { createOtp } from "@/lib/otp";
import { normalizePhone } from "@/lib/phone";
import { withPostgres } from "@/lib/postgres";
import { sendOtpWhatsApp } from "@/lib/whatsapp";

const RESEND_COOLDOWN_MS = 30 * 1000;
const OTP_TTL_MS = 5 * 60 * 1000;
const MAX_OTPS_PER_DAY = 3;

type StoreOtpResult =
  | { status: "stored"; id: string }
  | { status: "cooldown" }
  | { status: "daily-limit" };

async function storeOtp(phoneNumber: string, otp: string): Promise<StoreOtpResult> {
  return withPostgres(async (client) => {
    const stored = await client.query<{ id: string }>(
      `
        insert into public.phone_otps as existing (
          phone_number,
          otp,
          attempts,
          created_at,
          expires_at,
          verified,
          request_count,
          request_date
        )
        values (
          $1,
          $2,
          0,
          current_timestamp,
          current_timestamp + ($3::bigint * interval '1 millisecond'),
          false,
          1,
          ((current_timestamp at time zone 'UTC')::date)
        )
        on conflict (phone_number) do update
        set
          otp = excluded.otp,
          attempts = 0,
          created_at = excluded.created_at,
          expires_at = excluded.expires_at,
          verified = false,
          request_count = case
            when existing.request_date = excluded.request_date
              then existing.request_count + 1
            else 1
          end,
          request_date = excluded.request_date
        where
          existing.created_at <=
            excluded.created_at - ($4::bigint * interval '1 millisecond')
          and (
            existing.request_date <> excluded.request_date
            or existing.request_count < $5::smallint
          )
        returning id
      `,
      [
        phoneNumber,
        otp,
        OTP_TTL_MS,
        RESEND_COOLDOWN_MS,
        MAX_OTPS_PER_DAY,
      ],
    );

    const storedRow = stored.rows[0];
    if (storedRow) {
      return { status: "stored", id: storedRow.id };
    }

    const limitResult = await client.query<{
      request_count: number;
      is_today: boolean;
    }>(
      `
        select
          request_count,
          request_date = ((current_timestamp at time zone 'UTC')::date) as is_today
        from public.phone_otps
        where phone_number = $1
      `,
      [phoneNumber],
    );

    const limit = limitResult.rows[0];
    if (!limit) {
      throw new Error("OTP rate-limit row was not found after an upsert conflict.");
    }

    return limit.is_today && limit.request_count >= MAX_OTPS_PER_DAY
      ? { status: "daily-limit" }
      : { status: "cooldown" };
  });
}

async function invalidateOtp(id: string, otp: string): Promise<void> {
  try {
    await withPostgres((client) =>
      client.query(
        `
          update public.phone_otps
          set expires_at = current_timestamp, verified = false
          where id = $1 and otp = $2
        `,
        [id, otp],
      ),
    );
  } catch (error) {
    console.error(
      JSON.stringify({
        message: "Failed to invalidate OTP after WhatsApp delivery failure",
        error: error instanceof Error ? error.message : String(error),
      }),
    );
  }
}

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

  const otp = createOtp();

  let storedOtp: StoreOtpResult;
  try {
    storedOtp = await storeOtp(normalizedPhone, otp);
  } catch (error) {
    console.error(
      JSON.stringify({
        message: "Failed to store OTP in PostgreSQL",
        error: error instanceof Error ? error.message : String(error),
      }),
    );
    return NextResponse.json({ error: "Failed to store OTP." }, { status: 500 });
  }

  if (storedOtp.status === "daily-limit") {
    return NextResponse.json(
      {
        error:
          "You have reached the maximum number of OTP requests for today. Please try again tomorrow.",
      },
      { status: 429 },
    );
  }

  if (storedOtp.status === "cooldown") {
    return NextResponse.json(
      { error: "An OTP was already sent recently. Please wait before retrying." },
      { status: 429 },
    );
  }

  try {
    const whatsappResult = await sendOtpWhatsApp(normalizedPhone, otp);
    console.log(
      JSON.stringify({
        message: "WhatsApp OTP delivery completed",
        ok: whatsappResult.ok,
        status: whatsappResult.status,
      }),
    );

    if (!whatsappResult.ok) {
      await invalidateOtp(storedOtp.id, otp);
      return NextResponse.json(
        { error: "Failed to send OTP via WhatsApp." },
        { status: 502 },
      );
    }
  } catch (error) {
    console.error(
      JSON.stringify({
        message: "WhatsApp OTP delivery failed",
        error: error instanceof Error ? error.message : String(error),
      }),
    );
    await invalidateOtp(storedOtp.id, otp);
    return NextResponse.json(
      { error: "Failed to send OTP via WhatsApp." },
      { status: 502 },
    );
  }

  return NextResponse.json({ success: true });
}
