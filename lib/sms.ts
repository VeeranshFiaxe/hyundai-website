// Sends the DLT-approved "OTP" SMS template carrying the code via alotsolutions.

type SmsSendResult = {
  ok: boolean;
  status: number;
  body: unknown;
};

const SMS_TEMPLATE_ID = "1177179067931462371";

export async function sendOtpSms(
  normalizedPhone: string,
  otp: string,
): Promise<SmsSendResult> {
  const apiKey = process.env.SMS_API_KEY?.trim();

  if (!apiKey) {
    throw new Error("SMS_API_KEY must be set to send SMS OTPs.");
  }

  // Must match the approved DLT template word for word.
  const message = `Your Modi Hyundai verification code is ${otp} It expires in 10 minutes. Do not share this code with anyone.`;

  const url =
    "https://alotsolutions.in/api/bulkmt/SendSMS" +
    `?user=HyundaiM&apikey=${encodeURIComponent(apiKey)}` +
    "&senderid=MODIHY&channel=Trans&DCS=0&flashsms=0" +
    `&number=${encodeURIComponent(normalizedPhone)}` +
    `&text=${encodeURIComponent(message)}` +
    `&DLTTemplateId=${SMS_TEMPLATE_ID}`;

  console.log("[sms] request", { to: normalizedPhone });

  let response: Response;
  try {
    response = await fetch(url);
  } catch (err) {
    console.error("[sms] fetch() threw (network/DNS/TLS error)", err);
    throw err;
  }

  const rawText = await response.text();
  let body: unknown = rawText;
  try {
    body = JSON.parse(rawText);
  } catch {
    // Response wasn't JSON — keep rawText so nothing is lost.
  }

  console.log("[sms] send response", response.status, JSON.stringify(body));

  return { ok: response.ok, status: response.status, body };
}
