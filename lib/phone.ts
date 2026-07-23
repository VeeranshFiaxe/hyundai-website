/**
 * Forms on this site save phone numbers as, e.g., "`+91 7894561231" — a
 * leading backtick (a Google Sheets workaround, see OtpGate.tsx) followed by
 * "+<dial code> <digits>". Strip the backtick, "+", and any whitespace so
 * only digits remain (e.g. "917894561231") before hitting the WhatsApp API
 * or checking rate limits/storage.
 */
export function normalizePhone(rawPhone: string): string {
  return rawPhone.replace(/[`+\s]/g, "");
}
