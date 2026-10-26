import { useCallback, useEffect, useState } from "react";
import { supabase } from "./supabase.ts";

export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
    public body: Record<string, unknown> = {},
  ) {
    super(message);
  }
}

async function authHeader(): Promise<Record<string, string>> {
  const { data } = await supabase.auth.getSession();
  return data.session ? { authorization: `Bearer ${data.session.access_token}` } : {};
}

export async function api<T>(path: string, init: { method?: string; body?: unknown } = {}): Promise<T> {
  const method = init.method ?? (init.body === undefined ? "GET" : "POST");
  const res = await fetch(`/api${path}`, {
    method,
    headers: {
      ...(await authHeader()),
      ...(init.body === undefined ? {} : { "content-type": "application/json" }),
    },
    body: init.body === undefined ? undefined : JSON.stringify(init.body),
  });
  const text = await res.text();
  let data: Record<string, unknown>;
  try {
    data = text ? JSON.parse(text) : {};
  } catch {
    // An HTML page here means /api isn't wired up (e.g. plain `vite` without Netlify Functions).
    throw new ApiError(res.status, "The app's API isn't reachable from this address.", {});
  }
  if (!res.ok) {
    throw new ApiError(res.status, (data.error as string) || `Request failed (${res.status})`, data);
  }
  // Any change (answer, progress, settings…) may affect cached pages: start fresh.
  if (method !== "GET") clearCache();
  return data as T;
}

// ---------------------------------------------------------------------------
// Read cache (stale-while-revalidate). Pages render the last known data
// instantly and refresh it in the background. Kept in sessionStorage so a
// reload is instant too; cleared on any write and on sign-out.
// ---------------------------------------------------------------------------

const STORAGE_KEY = "parlons-api-cache";
const cache = new Map<string, unknown>(loadCache());
const inflight = new Map<string, Promise<unknown>>();

function loadCache(): [string, unknown][] {
  try {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY) ?? "[]");
  } catch {
    return [];
  }
}

function persist() {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify([...cache]));
  } catch {
    // storage full or unavailable — the in-memory cache still works
  }
}

export function clearCache() {
  cache.clear();
  try {
    sessionStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
}

/** GET with de-duplication of identical in-flight requests; result is cached. */
export function fetchCached<T>(path: string): Promise<T> {
  const pending = inflight.get(path);
  if (pending) return pending as Promise<T>;
  const request = api<T>(path)
    .then((data) => {
      cache.set(path, data);
      persist();
      return data;
    })
    .finally(() => inflight.delete(path));
  inflight.set(path, request);
  return request;
}

export function peekCache<T>(path: string): T | undefined {
  return cache.get(path) as T | undefined;
}

/** Warm the cache for pages the learner is likely to open next. */
export function prefetch(paths: string[]) {
  for (const path of paths) if (!cache.has(path)) fetchCached(path).catch(() => {});
}

/**
 * Cached data for a GET endpoint: returns what we already have immediately,
 * then refreshes. `reload()` forces a refetch.
 */
export function useApi<T>(path: string | null) {
  const [data, setData] = useState<T | undefined>(() => (path ? (cache.get(path) as T | undefined) : undefined));
  const [error, setError] = useState("");
  const [nonce, setNonce] = useState(0);

  useEffect(() => {
    if (!path) return;
    let alive = true;
    const cached = cache.get(path) as T | undefined;
    setData(cached);
    setError("");
    fetchCached<T>(path)
      .then((fresh) => alive && setData(fresh))
      .catch((err) => alive && !cached && setError(errorMessage(err)));
    return () => {
      alive = false;
    };
  }, [path, nonce]);

  const reload = useCallback(() => setNonce((n) => n + 1), []);
  return { data, error, loading: data === undefined && !error, reload };
}

/** Downloads a JSON response as a file (used for the data export). */
export async function download(path: string, filename: string) {
  const res = await fetch(`/api${path}`, { headers: await authHeader() });
  if (!res.ok) throw new ApiError(res.status, "Export failed");
  const blob = await res.blob();
  const url = URL.createObjectURL(blob);
  const a = Object.assign(document.createElement("a"), { href: url, download: filename });
  a.click();
  URL.revokeObjectURL(url);
}

export function errorMessage(err: unknown): string {
  return err instanceof Error ? err.message : "Something went wrong.";
}
