import { createHmac, timingSafeEqual } from "node:crypto";

const OTP_RANGE = 10_000;
const UINT16_RANGE = 65_536;
const UNBIASED_LIMIT = UINT16_RANGE - (UINT16_RANGE % OTP_RANGE);

/** How long a code stays valid after it is sent. */
export const OTP_TTL_MS = 5 * 60 * 1000;

/** Minimum gap between two sends, to stop double-taps burning WhatsApp credit. */
export const OTP_RESEND_COOLDOWN_MS = 30 * 1000;

export const OTP_CHALLENGE_COOKIE = "otp_challenge";
export const OTP_COOLDOWN_COOKIE = "otp_cooldown";

export function createOtp(): string {
  const randomValue = new Uint16Array(1);

  do {
    crypto.getRandomValues(randomValue);
  } while (randomValue[0] >= UNBIASED_LIMIT);

  return String(randomValue[0] % OTP_RANGE).padStart(4, "0");
}

function constantTimeEquals(expected: string, provided: string): boolean {
  const expectedBytes = Buffer.from(expected, "utf8");
  const providedBytes = Buffer.from(provided, "utf8");

  return (
    expectedBytes.length === providedBytes.length &&
    timingSafeEqual(expectedBytes, providedBytes)
  );
}

/**
 * The OTP itself is never persisted. Instead we hand the browser an HMAC of
 * (phone + code + expiry) in an httpOnly cookie, and re-derive that HMAC from
 * whatever the user types on the way back. A correct code reproduces the same
 * signature; a wrong one cannot, and neither can a forged cookie without the
 * secret. So the code lives only in the WhatsApp message and the user's head.
 */
function getChallengeSecret(): string {
  const secret =
    process.env.OTP_SECRET?.trim() || process.env.WHATSAPP_API_KEY?.trim();

  if (!secret) {
    throw new Error(
      "Set OTP_SECRET (any long random string) to sign OTP challenges.",
    );
  }

  return secret;
}

function sign(payload: string): string {
  return createHmac("sha256", getChallengeSecret()).update(payload).digest("hex");
}

export function createOtpChallenge(
  phoneNumber: string,
  otp: string,
  expiresAt: number,
): string {
  return `${expiresAt}.${sign(`${phoneNumber}.${otp}.${expiresAt}`)}`;
}

export type ChallengeOutcome = "valid" | "expired" | "invalid" | "malformed";

export function checkOtpChallenge(
  challenge: string,
  phoneNumber: string,
  otp: string,
): ChallengeOutcome {
  const separator = challenge.indexOf(".");
  if (separator === -1) {
    return "malformed";
  }

  const expiresAt = Number(challenge.slice(0, separator));
  const signature = challenge.slice(separator + 1);
  if (!Number.isSafeInteger(expiresAt) || expiresAt <= 0 || !signature) {
    return "malformed";
  }

  // Check authenticity before expiry, so an expired-but-genuine challenge is
  // reported as "expired" while a tampered one is always just "invalid".
  if (!constantTimeEquals(sign(`${phoneNumber}.${otp}.${expiresAt}`), signature)) {
    return "invalid";
  }

  return Date.now() > expiresAt ? "expired" : "valid";
}
