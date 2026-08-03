import { withPostgres } from "@/lib/postgres";

export const dynamic = "force-dynamic";

const responseHeaders = {
  "Cache-Control": "no-store",
};

export async function GET() {
  const startedAt = Date.now();

  try {
    const result = await withPostgres((client) =>
      client.query<{ ok: number }>("SELECT 1 AS ok"),
    );

    if (result.rows[0]?.ok !== 1) {
      throw new Error("Unexpected database health-check response.");
    }

    return Response.json(
      {
        status: "ok",
        database: "connected",
        latencyMs: Date.now() - startedAt,
      },
      { headers: responseHeaders },
    );
  } catch (error) {
    console.error(
      JSON.stringify({
        message: "database health check failed",
        error: error instanceof Error ? error.message : String(error),
      }),
    );

    return Response.json(
      { status: "error", database: "unavailable" },
      { status: 503, headers: responseHeaders },
    );
  }
}
