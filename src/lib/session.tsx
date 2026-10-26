import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "./supabase.ts";
import { clearCache, errorMessage, fetchCached, peekCache } from "./api.ts";
import { identify, resetAnalytics } from "./analytics.ts";
import type { Me } from "./types.ts";

interface SessionState {
  session: Session | null;
  me: Me | null;
  loading: boolean;
  /** Why loading the profile failed (e.g. the API isn't configured yet). */
  error: string | null;
  refresh: () => Promise<Me | null>;
  signOut: () => Promise<void>;
}

const Ctx = createContext<SessionState | null>(null);

export function SessionProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [me, setMe] = useState<Me | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    try {
      const data = await fetchCached<Me>("/me");
      setMe(data);
      setError(null);
      identify(data.profile.id, { level: data.profile.current_level });
      return data;
    } catch (err) {
      setMe(null);
      setError(errorMessage(err));
      return null;
    }
  }, []);

  useEffect(() => {
    let active = true;
    supabase.auth.getSession().then(async ({ data }) => {
      if (!active) return;
      setSession(data.session);
      const cached = data.session ? peekCache<Me>("/me") : undefined;
      if (cached) {
        // Show the app immediately with the last known profile, refresh quietly.
        setMe(cached);
        setLoading(false);
        refresh();
        return;
      }
      if (data.session) await refresh();
      setLoading(false);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((event, next) => {
      setSession(next);
      if (event === "SIGNED_IN") {
        setLoading(true);
        refresh().finally(() => setLoading(false));
      }
      if (event === "SIGNED_OUT") setMe(null);
    });
    return () => {
      active = false;
      sub.subscription.unsubscribe();
    };
  }, [refresh]);

  const signOut = useCallback(async () => {
    await supabase.auth.signOut();
    resetAnalytics();
    clearCache();
    setMe(null);
  }, []);

  return <Ctx.Provider value={{ session, me, loading, error, refresh, signOut }}>{children}</Ctx.Provider>;
}

export function useSession() {
  const value = useContext(Ctx);
  if (!value) throw new Error("useSession must be used inside SessionProvider");
  return value;
}
