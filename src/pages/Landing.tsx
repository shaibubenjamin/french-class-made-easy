import { useState, type FormEvent } from "react";
import { Navigate } from "react-router-dom";
import { Alert } from "../components/ui.tsx";
import { supabase, supabaseConfigured } from "../lib/supabase.ts";
import { useSession } from "../lib/session.tsx";
import { LEVELS, LEVEL_INFO } from "../../shared/levels.ts";

export default function Landing() {
  const { session } = useSession();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  if (session) return <Navigate to="/dashboard" replace />;

  // Private app: accounts are created by the admin, so there is no sign-up here.
  async function submit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setBusy(true);
    const { error } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
    if (error) {
      setError(/invalid/i.test(error.message) ? "That email and password don't match." : error.message);
      setBusy(false);
    }
    // On success the session listener redirects to the dashboard.
  }

  return (
    <div className="container">
      <section className="hero grid grid-2" style={{ alignItems: "center" }}>
        <div>
          <p className="eyebrow">French · A1 → C2</p>
          <h1>Un peu de français, chaque jour.</h1>
          <p className="lead">
            Find your real level in under ten minutes, then get a fresh lesson made for that level every
            morning — vocabulary, grammar, a short text, exercises and writing with instant feedback.
          </p>
        </div>
        <div className="card">
          <form onSubmit={submit}>
            <h2>Sign in</h2>
            <p className="muted small">This is a private class. Use the account you were given.</p>
            {!supabaseConfigured && (
              <Alert kind="warn">Supabase isn't configured. Copy .env.example to .env and fill it in.</Alert>
            )}
            <Alert kind="error">{error}</Alert>
            <div className="field">
              <label htmlFor="email">Email address</label>
              <input
                id="email"
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="vous@exemple.com"
              />
            </div>
            <div className="field">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button className="btn btn-block" disabled={busy || !email || !password}>
              {busy ? "Signing in…" : "Sign in"}
            </button>
          </form>
        </div>
      </section>

      <section className="features grid grid-3" aria-label="How it works">
        <div className="card feature">
          <h3>1. Find your level</h3>
          <p className="muted">An adaptive 15–20 question quiz, or pick from “I can…” descriptions.</p>
        </div>
        <div className="card feature">
          <h3>2. A lesson a day</h3>
          <p className="muted">Four strands every day: vocabulary, grammar, reading and writing.</p>
        </div>
        <div className="card feature">
          <h3>3. Keep the habit</h3>
          <p className="muted">A morning micro-lesson by email, streaks, and reviews built from your mistakes.</p>
        </div>
      </section>

      <section style={{ marginTop: 40 }}>
        <h2>Every level, from Breakthrough to Mastery</h2>
        <div className="grid grid-3">
          {LEVELS.map((l) => (
            <div className="card" key={l}>
              <span className="level-tag">{l}</span> <strong>{LEVEL_INFO[l].name}</strong>
              <p className="muted small" style={{ marginTop: 6, marginBottom: 0 }}>
                {LEVEL_INFO[l].focus}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
