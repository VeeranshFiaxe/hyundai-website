// Sends the pre-approved "registration" WhatsApp template carrying the OTP.
// See MessagingHub docs for the relay endpoint this hits.

type WhatsAppSendResult = {
  ok: boolean;
  status: number;
  body: unknown;
};

export async function sendOtpWhatsApp(
  normalizedPhone: string,
  otp: string,
): Promise<WhatsAppSendResult> {
  const endpointUrl = process.env.WHATSAPP_ENDPOINT_URL;
  const apiKey = process.env.WHATSAPP_API_KEY;

  if (!endpointUrl || !apiKey) {
    throw new Error(
      "WHATSAPP_ENDPOINT_URL and WHATSAPP_API_KEY must be set to send WhatsApp OTPs.",
    );
  }

  const requestPayload = {
    messaging_product: "whatsapp",
    recipient_type: "individual",
    to: normalizedPhone,
    type: "template",
    template: {
      name: "registration",
      language: { code: "en" },
      components: [
        { type: "body", parameters: [{ type: "text", text: otp }] },
        {
          type: "button",
          sub_type: "url",
          index: "0",
          parameters: [{ type: "text", text: otp }],
        },
      ],
    },
    biz_opaque_callback_data: `otp_${normalizedPhone}`,
  };

  console.log("[whatsapp] request", { endpointUrl, to: normalizedPhone });

  let response: Response;
  try {
    response = await fetch(endpointUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-API-KEY": apiKey,
      },
      body: JSON.stringify(requestPayload),
    });
  } catch (err) {
    console.error("[whatsapp] fetch() threw (network/DNS/TLS error)", err);
    throw err;
  }

  const rawText = await response.text();
  let body: unknown = rawText;
  try {
    body = JSON.parse(rawText);
  } catch {
    // Response wasn't JSON — keep rawText so nothing is lost.
  }

  // TEMP: log the raw response shape while we're first integrating this API
  // so we can confirm what success/error payloads actually look like.
  console.log("[whatsapp] send response", response.status, JSON.stringify(body));

  return { ok: response.ok, status: response.status, body };
}
