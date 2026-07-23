import { createClient, type SupabaseClient } from "@supabase/supabase-js";

// Server-only Supabase client authenticated with the service_role key. RLS has
// no public policies on any table, so this key is the only way in. Never
// import this file from a "use client" component or expose the key via
// NEXT_PUBLIC_*.
//
// Built lazily (not at module load) so `next build` can still collect page
// data for routes that import this file before env vars are configured in an
// environment.

let client: SupabaseClient | undefined;

export function getSupabaseAdmin(): SupabaseClient {
  if (client) return client;

  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseServiceRoleKey) {
    throw new Error(
      "SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set to use supabaseAdmin.",
    );
  }

  client = createClient(supabaseUrl, supabaseServiceRoleKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
  return client;
}
