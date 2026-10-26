import { lazy, Suspense, useEffect, useState, type ReactNode } from "react";
import { Navigate, Route, Routes, useLocation, useSearchParams } from "react-router-dom";
import Layout from "./components/Layout.tsx";
import { Spinner } from "./components/ui.tsx";
import { useSession } from "./lib/session.tsx";
import { track } from "./lib/analytics.ts";
import { prefetch } from "./lib/api.ts";
import Landing from "./pages/Landing.tsx";
import AuthCallback from "./pages/AuthCallback.tsx";
const pages = {
  Onboarding: () => import("./pages/Onboarding.tsx"),
  Start: () => import("./pages/Start.tsx"),
  PickLevel: () => import("./pages/PickLevel.tsx"),
  Placement: () => import("./pages/Placement.tsx"),
  Dashboard: () => import("./pages/Dashboard.tsx"),
  Lesson: () => import("./pages/Lesson.tsx"),
  Archive: () => import("./pages/Archive.tsx"),
  Review: () => import("./pages/Review.tsx"),
  Settings: () => import("./pages/Settings.tsx"),
  Admin: () => import("./pages/Admin.tsx"),
  Unsubscribe: () => import("./pages/Unsubscribe.tsx"),
  Privacy: () => import("./pages/Privacy.tsx"),
};
const Onboarding = lazy(pages.Onboarding);
const Start = lazy(pages.Start);
const PickLevel = lazy(pages.PickLevel);
const Placement = lazy(pages.Placement);
const Dashboard = lazy(pages.Dashboard);
const LessonPage = lazy(pages.Lesson);
const Archive = lazy(pages.Archive);
const Review = lazy(pages.Review);
const Settings = lazy(pages.Settings);
const Admin = lazy(pages.Admin);
const Unsubscribe = lazy(pages.Unsubscribe);
const Privacy = lazy(pages.Privacy);

/** Once signed in, quietly load page code and likely-next data so clicks feel instant. */
function Preloader() {
  const { me } = useSession();
  const ready = Boolean(me?.profile.onboarded && me.profile.current_level);
  useEffect(() => {
    if (!me) return;
    const idle = (cb: () => void) =>
      typeof window.requestIdleCallback === "function" ? window.requestIdleCallback(cb) : setTimeout(cb, 300);
    idle(() => {
      Object.values(pages).forEach((load) => load().catch(() => {}));
      if (ready) prefetch(["/dashboard", "/lesson/today", "/lessons"]);
    });
  }, [me, ready]);
  return null;
}

/** Signed-in routes. Sends users through onboarding and level choice first. */
function Protected({ children, needsLevel = true, admin = false }: { children: ReactNode; needsLevel?: boolean; admin?: boolean }) {
  const { session, me, loading, error } = useSession();
  const location = useLocation();
  if (loading) return <Spinner />;
  if (!session) return <Navigate to="/" replace state={{ from: location.pathname }} />;
  if (!me) return error ? <ServerUnavailable message={error} /> : <Spinner />;
  if (!me.profile.onboarded && location.pathname !== "/onboarding") return <Navigate to="/onboarding" replace />;
  if (needsLevel && !me.profile.current_level) return <Navigate to="/start" replace />;
  if (admin && !me.profile.is_admin) return <Navigate to="/dashboard" replace />;
  return <>{children}</>;
}

/** Shown when signed in but the API can't load the profile, instead of spinning forever. */
function ServerUnavailable({ message }: { message: string }) {
  const { refresh, signOut } = useSession();
  const [missing, setMissing] = useState<string[]>([]);
  useEffect(() => {
    fetch("/api/health")
      .then((r) => (r.ok ? r.json() : null))
      .then((h: { missing?: Record<string, string[]> } | null) => setMissing(Object.values(h?.missing ?? {}).flat()))
      .catch(() => setMissing([]));
  }, []);
  return (
    <div className="container narrow">
      <div className="card stack">
        <h1>You're signed in, but the app server isn't ready</h1>
        <p className="muted">{message}</p>
        {missing.length > 0 ? (
          <p>The server is missing these settings: <code>{missing.join(", ")}</code>.</p>
        ) : (
          <p className="muted">
            Use the live site at <a href="https://french-class-made-easy.netlify.app">french-class-made-easy.netlify.app</a>,
            or run the full app locally with <code>npx netlify-cli dev</code> (port 8888).
          </p>
        )}
        <div className="row">
          <button className="btn" onClick={() => refresh()}>Try again</button>
          <button className="btn btn-secondary" onClick={() => signOut()}>Sign out</button>
        </div>
      </div>
    </div>
  );
}

function EmailClickTracker() {
  const [params] = useSearchParams();
  useEffect(() => {
    if (params.get("utm_source") === "email") track("email_clicked", { campaign: params.get("utm_campaign") });
  }, [params]);
  return null;
}

export default function App() {
  return (
    <Layout>
      <EmailClickTracker />
      <Preloader />
      <Suspense fallback={<Spinner />}>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/auth/callback" element={<AuthCallback />} />
        <Route path="/unsubscribe" element={<Unsubscribe />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/onboarding" element={<Protected needsLevel={false}><Onboarding /></Protected>} />
        <Route path="/start" element={<Protected needsLevel={false}><Start /></Protected>} />
        <Route path="/pick-level" element={<Protected needsLevel={false}><PickLevel /></Protected>} />
        <Route path="/placement" element={<Protected needsLevel={false}><Placement /></Protected>} />
        <Route path="/dashboard" element={<Protected><Dashboard /></Protected>} />
        <Route path="/lesson/today" element={<Protected><LessonPage /></Protected>} />
        <Route path="/lesson/:id" element={<Protected><LessonPage /></Protected>} />
        <Route path="/lessons" element={<Protected><Archive /></Protected>} />
        <Route path="/review" element={<Protected><Review /></Protected>} />
        <Route path="/settings" element={<Protected needsLevel={false}><Settings /></Protected>} />
        <Route path="/admin" element={<Protected admin><Admin /></Protected>} />
        <Route path="*" element={<div className="container narrow"><h1>Page not found</h1><a href="/">Go home</a></div>} />
      </Routes>
      </Suspense>
    </Layout>
  );
}
