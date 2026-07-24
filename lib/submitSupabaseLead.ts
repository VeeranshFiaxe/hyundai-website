import { getStoredUtmParams } from "@/utils/captureUtm";

// Posts lead data to one of the /api/leads/* routes, which insert into the
// matching Supabase table server-side (service_role key never reaches the
// client). Fire-and-forget from the caller's perspective: failures are
// logged but never block the existing Google Sheets submission.
export async function submitSupabaseLead(
  endpoint: string,
  payload: Record<string, unknown>,
): Promise<void> {
  const body = { ...payload, ...getStoredUtmParams() };

  const res = await fetch(`/api/leads/${endpoint}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.error || `Supabase lead insert failed (${res.status})`);
  }
}
