import { getCloudflareContext } from "@opennextjs/cloudflare";
import { Client } from "pg";

export async function withPostgres<T>(
  operation: (client: Client) => Promise<T>,
): Promise<T> {
  const { env } = getCloudflareContext();
  const client = new Client({
    connectionString: env.HYPERDRIVE.connectionString,
  });

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
