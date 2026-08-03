import { getStoredUtmParams } from "@/utils/captureUtm";

// Posts lead data to a server-side API route. Database credentials and the
// Hyperdrive connection stay inside the Worker and never reach the browser.
export async function submitDatabaseLead(
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
    throw new Error(data.error || `Database lead insert failed (${res.status})`);
  }
}
