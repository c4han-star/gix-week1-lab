import { createClient, SupabaseClient } from "@supabase/supabase-js";

/**
 * Server-only Supabase client (API routes, server components).
 * Uses anon key — RLS should be off for these tables in the lab, per course troubleshooting guide.
 */
export function createServerSupabase(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
