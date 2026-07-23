export type FormErrors = Record<string, string>;

export function isEmpty(value: unknown): boolean {
  return typeof value !== "string" || value.trim().length === 0;
}

export function isValidName(name: string): boolean {
  return name.trim().length >= 2;
}

export function isValidEmail(email: string): boolean {
  const trimmed = email.trim();
  if (!trimmed) return false;
  const atIndex = trimmed.indexOf("@");
  if (atIndex <= 0) return false;
  const afterAt = trimmed.slice(atIndex + 1);
  return afterAt.includes(".");
}

export function isValidMobile(mobile: string): boolean {
  const digits = mobile.replace(/\D/g, "");
  return digits.length >= 7 && digits.length <= 15;
}

export function isValidPincode(pincode: string): boolean {
  return /^[0-9]{6}$/.test(pincode.trim());
}

export function isValidYear(year: string): boolean {
  const n = parseInt(year.trim(), 10);
  return !isNaN(n) && n >= 2000 && n <= 2099;
}
