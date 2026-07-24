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

export type UtmColumns = Record<(typeof UTM_FIELDS)[number], string | null>;

/** Pulls the 8 UTM/click-id fields out of an inbound lead POST body for
 * insertion into a Supabase leads table. Missing/non-string values become
 * null rather than being omitted, so every leads table gets the same
 * column shape regardless of which UTM params (if any) were present. */
export function extractUtmFields(body: Record<string, unknown>): UtmColumns {
  const result = {} as UtmColumns;
  for (const field of UTM_FIELDS) {
    const value = body[field];
    result[field] = typeof value === "string" && value.trim() !== "" ? value : null;
  }
  return result;
}
