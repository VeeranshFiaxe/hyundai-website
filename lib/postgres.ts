import { getCloudflareContext } from "@opennextjs/cloudflare";
import { Client } from "pg";

/**
 * Resolve the Postgres connection string for whatever host this build happens
 * to be running on, so the same code works on Netlify, a plain Node/nginx box,
 * Vercel, or Cloudflare Workers with no per-host branching.
 *
 * Precedence:
 *   1. DATABASE_URL — an explicit setting always wins. Put it in `.env.local`
 *      for local dev, or in the host's environment-variable settings in
 *      production. This is the only thing you need to set on most hosts.
 *   2. The Cloudflare Hyperdrive binding, when running as a Worker. Hyperdrive
 *      pools connections at the edge, so it stays the default there and needs
 *      no env var of its own.
 *
 * Postgres over the public internet needs TLS. Append `?sslmode=require` to
 * DATABASE_URL — `pg` reads `sslmode` straight out of the connection string,
 * so no extra client config is needed here.
 */
function getConnectionString(): string {
  const fromEnv = process.env.DATABASE_URL?.trim();
  if (fromEnv) {
    return fromEnv;
  }

  // `getCloudflareContext()` reads a global that only a Cloudflare Worker
  // populates, so it throws everywhere else — which is exactly the case we
  // want to fall through rather than crash on.
  try {
    const fromHyperdrive = getCloudflareContext().env.HYPERDRIVE?.connectionString;
    if (fromHyperdrive) {
      return fromHyperdrive;
    }
  } catch {
    // Not running on Cloudflare; fall through to the error below.
  }

  throw new Error(
    "No Postgres connection string available. Set DATABASE_URL in this host's " +
      "environment (e.g. postgresql://user:password@host:5432/dbname?sslmode=require), " +
      "or run on Cloudflare Workers with the HYPERDRIVE binding configured.",
  );
}

export async function withPostgres<T>(
  operation: (client: Client) => Promise<T>,
): Promise<T> {
  const client = new Client({ connectionString: getConnectionString() });

  try {
    await client.connect();
    return await operation(client);
  } finally {
    await client.end();
  }
}

export async function withPostgresTransaction<T>(
  operation: (client: Client) => Promise<T>,
): Promise<T> {
  return withPostgres(async (client) => {
    await client.query("BEGIN");

    try {
      const result = await operation(client);
      await client.query("COMMIT");
      return result;
    } catch (error) {
      try {
        await client.query("ROLLBACK");
      } catch (rollbackError) {
        console.error(
          JSON.stringify({
            message: "PostgreSQL transaction rollback failed",
            error:
              rollbackError instanceof Error
                ? rollbackError.message
                : String(rollbackError),
          }),
        );
      }
      throw error;
    }
  });
}
