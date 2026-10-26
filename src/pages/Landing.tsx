import { useState, type FormEvent } from "react";
import { Navigate } from "react-router-dom";
import { Alert } from "../components/ui.tsx";
import { supabase, supabaseConfigured } from "../lib/supabase.ts";
import { useSession } from "../lib/session.tsx";
import { LEVELS, LEVEL_INFO } from "../../shared/levels.ts";

export default function Landing() {
  const { session } = useSession();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [error, setError] = useState("");

  if (session) return <Navigate to="/dashboard" replace />;

  async function submit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setStatus("sending");
    const { error } = await supabase.auth.signInWithOtp({
      email: email.trim(),
      options: { emailRedirectTo: `${window.location.origin}/auth/callback` },
    });
    if (error) {
      setError(
        /rate limit/i.test(error.message)
          ? "We've sent too many sign-in emails in the last hour. Please check your inbox (and spam) for an earlier link, or try again in an hour."
          : error.message,
      );
      setStatus("idle");
    } else {
      setStatus("sent");
    }
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
          {status === "sent" ? (
            <div role="status">
              <h2>Check your inbox</h2>
              <p>
                We sent a sign-in link to <strong>{email}</strong>. It arrives within a minute and works once.
              </p>
              <button className="btn btn-secondary" onClick={() => setStatus("idle")}>
                Use a different email
              </button>
            </div>
          ) : (
            <form onSubmit={submit} noValidate={false}>
              <h2>Start learning — free</h2>
              <p className="muted small">No password. We'll email you a magic link.</p>
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
              <button className="btn btn-block" disabled={status === "sending" || !email}>
                {status === "sending" ? "Sending…" : "Email me a sign-in link"}
              </button>
            </form>
          )}
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
