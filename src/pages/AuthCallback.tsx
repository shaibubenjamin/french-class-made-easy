import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { Spinner } from "../components/ui.tsx";
import { useSession } from "../lib/session.tsx";

function urlError(): string | null {
  const params = new URLSearchParams(window.location.search);
  const hash = new URLSearchParams(window.location.hash.slice(1));
  const code = params.get("error_code") ?? hash.get("error_code");
  const description = params.get("error_description") ?? hash.get("error_description");
  if (!code && !description) return null;
  if (code === "otp_expired" || /expired|invalid/i.test(description ?? "")) {
    return "This sign-in link has expired or has already been used.";
  }
  return description ?? "We couldn't sign you in with that link.";
}

export default function AuthCallback() {
  const { session, loading } = useSession();
  const [error] = useState(urlError);
  const [timedOut, setTimedOut] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setTimedOut(true), 8000);
    return () => clearTimeout(t);
  }, []);

  if (session && !loading) return <Navigate to="/dashboard" replace />;

  if (error || timedOut) {
    return (
      <div className="container narrow">
        <div className="card">
          <h1>That link didn't work</h1>
          <p>{error ?? "We couldn't complete sign-in. The link may have expired."}</p>
          <p className="muted">Links expire after an hour and can only be used once. Request a fresh one — it takes seconds.</p>
          <Link className="btn" to="/">Send me a new link</Link>
        </div>
      </div>
    );
  }
  return <Spinner label="Signing you in…" />;
}
