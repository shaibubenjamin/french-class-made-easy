import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { env } from "./env.ts";

let client: SupabaseClient | undefined;

/** Service-role client. Bypasses RLS — only ever used inside functions. */
export function db(): SupabaseClient {
  client ??= createClient(env("SUPABASE_URL"), env("SUPABASE_SERVICE_ROLE_KEY"), {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  return client;
}

/** Throws on a Supabase error, otherwise returns data. */
export function must<T>(result: { data: T; error: { message: string } | null }): T {
  if (result.error) throw new Error(result.error.message);
  return result.data;
}

/** PostgREST returns one-to-one embeds as an object or a one-element array. */
export function one<T>(value: T | T[] | null | undefined): T | undefined {
  return Array.isArray(value) ? value[0] : (value ?? undefined);
}
