export type FormType = "contact" | "test_drive" | "service" | "phone_capture";

export async function submitLead(
  formType: FormType,
  formData: Record<string, string>,
): Promise<void> {
  const endpoint = process.env.NEXT_PUBLIC_SHEET_ENDPOINT;
  if (!endpoint) {
    throw new Error("NEXT_PUBLIC_SHEET_ENDPOINT is not configured.");
  }

  const body: Record<string, string> = { form_type: formType, ...formData };

  await fetch(endpoint, {
    method: "POST",
    mode: "no-cors",
    headers: { "Content-Type": "text/plain" },
    body: JSON.stringify(body),
  });
}
