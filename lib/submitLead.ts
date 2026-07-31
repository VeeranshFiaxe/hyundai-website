import { getStoredUtmParams } from "@/utils/captureUtm";

export type FormType = "contact" | "test_drive" | "service" | "phone_capture" | "hyundai_promise_buy" | "hyundai_promise_sell";

export async function submitLead(
  formType: FormType,
  formData: Record<string, string>,
): Promise<void> {
  // phone_capture fires before the user has finished the real form; the
  // UTM data belongs on the final lead submission only.
  const utmData = getStoredUtmParams();

  const body: Record<string, string | undefined> = { form_type: formType, ...formData, ...utmData };

  const res = await fetch("/api/leads/sheets", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    throw new Error("Failed to submit lead to Sheets.");
  }
}
