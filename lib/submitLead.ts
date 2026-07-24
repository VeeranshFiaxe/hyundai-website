import { getStoredUtmParams } from "@/utils/captureUtm";

export type FormType = "contact" | "test_drive" | "service" | "phone_capture" | "hyundai_promise_buy" | "hyundai_promise_sell";

export async function submitLead(
  formType: FormType,
  formData: Record<string, string>,
): Promise<void> {
  const endpoint = process.env.NEXT_PUBLIC_SHEET_ENDPOINT;
  if (!endpoint) {
    throw new Error("NEXT_PUBLIC_SHEET_ENDPOINT is not configured.");
  }

  // phone_capture fires before the user has finished the real form; the
  // UTM data belongs on the final lead submission only.
  const utmData = formType === "phone_capture" ? {} : getStoredUtmParams();

  const body: Record<string, string | undefined> = { form_type: formType, ...formData, ...utmData };

  await fetch(endpoint, {
    method: "POST",
    mode: "no-cors",
    headers: { "Content-Type": "text/plain" },
    body: JSON.stringify(body),
  });
}
