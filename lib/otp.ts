import { timingSafeEqual } from "node:crypto";

const OTP_RANGE = 10_000;
const UINT16_RANGE = 65_536;
const UNBIASED_LIMIT = UINT16_RANGE - (UINT16_RANGE % OTP_RANGE);

export function createOtp(): string {
  const randomValue = new Uint16Array(1);

  do {
    crypto.getRandomValues(randomValue);
  } while (randomValue[0] >= UNBIASED_LIMIT);

  return String(randomValue[0] % OTP_RANGE).padStart(4, "0");
}

export function otpMatches(expected: string, provided: string): boolean {
  const expectedBytes = Buffer.from(expected, "utf8");
  const providedBytes = Buffer.from(provided, "utf8");

  return (
    expectedBytes.length === providedBytes.length &&
    timingSafeEqual(expectedBytes, providedBytes)
  );
}
