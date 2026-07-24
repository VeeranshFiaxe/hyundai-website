const UTM_FIELDS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_id",
  "utm_term",
  "utm_content",
  "gclid",
  "fbclid",
] as const;

export type UtmData = Partial<Record<(typeof UTM_FIELDS)[number], string>>;

const STORAGE_KEY = "utm_data";

/** Reads UTM/click-id params from the current URL and stores them in
 * sessionStorage. Only writes when at least one param is present, so
 * navigating to a later page with no UTM params in its URL doesn't wipe
 * out what was captured on landing. */
export function captureUtmParams(): void {
  const params = new URLSearchParams(window.location.search);

  const captured: UtmData = {};
  UTM_FIELDS.forEach((field) => {
    const value = params.get(field);
    if (value) captured[field] = value;
  });

  if (Object.keys(captured).length > 0) {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(captured));
  }
}

export function getStoredUtmParams(): UtmData {
  try {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY) || "{}");
  } catch {
    return {};
  }
}
