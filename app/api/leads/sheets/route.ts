import { NextResponse } from "next/server";

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const endpoint = process.env.SHEET_ENDPOINT;
  if (!endpoint) {
    console.error("[leads/sheets] SHEET_ENDPOINT is not configured.");
    return NextResponse.json({ error: "Sheets endpoint is not configured." }, { status: 500 });
  }

  try {
    await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "text/plain" },
      body: JSON.stringify(body),
    });
  } catch (err) {
    console.error("[leads/sheets] Forwarding to Sheets endpoint failed", err);
    return NextResponse.json({ error: "Failed to forward lead to Sheets." }, { status: 502 });
  }

  return NextResponse.json({ success: true });
}
