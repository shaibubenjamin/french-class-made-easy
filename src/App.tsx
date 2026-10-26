import { lazy, Suspense, useEffect, type ReactNode } from "react";
import { Navigate, Route, Routes, useLocation, useSearchParams } from "react-router-dom";
import Layout from "./components/Layout.tsx";
import { Spinner } from "./components/ui.tsx";
import { useSession } from "./lib/session.tsx";
import { track } from "./lib/analytics.ts";
import Landing from "./pages/Landing.tsx";
import AuthCallback from "./pages/AuthCallback.tsx";
const Onboarding = lazy(() => import("./pages/Onboarding.tsx"));
const Start = lazy(() => import("./pages/Start.tsx"));
const PickLevel = lazy(() => import("./pages/PickLevel.tsx"));
const Placement = lazy(() => import("./pages/Placement.tsx"));
const Dashboard = lazy(() => import("./pages/Dashboard.tsx"));
const LessonPage = lazy(() => import("./pages/Lesson.tsx"));
const Archive = lazy(() => import("./pages/Archive.tsx"));
const Review = lazy(() => import("./pages/Review.tsx"));
const Settings = lazy(() => import("./pages/Settings.tsx"));
const Admin = lazy(() => import("./pages/Admin.tsx"));
const Unsubscribe = lazy(() => import("./pages/Unsubscribe.tsx"));
const Privacy = lazy(() => import("./pages/Privacy.tsx"));

/** Signed-in routes. Sends users through onboarding and level choice first. */
function Protected({ children, needsLevel = true, admin = false }: { children: ReactNode; needsLevel?: boolean; admin?: boolean }) {
  const { session, me, loading } = useSession();
  const location = useLocation();
  if (loading) return <Spinner />;
  if (!session) return <Navigate to="/" replace state={{ from: location.pathname }} />;
  if (!me) return <Spinner />;
  if (!me.profile.onboarded && location.pathname !== "/onboarding") return <Navigate to="/onboarding" replace />;
  if (needsLevel && !me.profile.current_level) return <Navigate to="/start" replace />;
  if (admin && !me.profile.is_admin) return <Navigate to="/dashboard" replace />;
  return <>{children}</>;
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
