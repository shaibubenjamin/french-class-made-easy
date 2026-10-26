import { useState, type FormEvent } from "react";
import { Navigate } from "react-router-dom";
import { Alert } from "../components/ui.tsx";
import { supabase, supabaseConfigured } from "../lib/supabase.ts";
import { useSession } from "../lib/session.tsx";
import { LEVELS, LEVEL_INFO } from "../../shared/levels.ts";

const LESSON_PARTS = [
  { icon: "📖", title: "Words", text: "8 new words with audio and example sentences." },
  { icon: "🧩", title: "Grammar", text: "One clear rule at a time, with spoken examples." },
  { icon: "🎧", title: "Listen", text: "Hear the text first, then dictation and videos." },
  { icon: "✏️", title: "Practice", text: "Quick exercises with instant corrections." },
  { icon: "🎙️", title: "Speak", text: "Record yourself and see what was understood." },
  { icon: "📝", title: "Write", text: "Short writing tasks with a model answer." },
];

const STEPS = [
  { n: 1, title: "Find your level", text: "A 15-question adaptive quiz — or choose from simple “I can…” descriptions." },
  { n: 2, title: "Follow your course", text: "12 lessons per level. Each one takes 10–20 minutes, start to finish." },
  { n: 3, title: "Build the habit", text: "Keep your 🔥 streak, track your days on the calendar, reach 80% to level up." },
];

export default function Landing() {
  const { session } = useSession();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
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
      setError(/invalid/i.test(error.message) ? "That email and password don't match. Please try again." : error.message);
      setBusy(false);
    }
    // On success the session listener redirects to the dashboard.
  }

  return (
    <div className="landing">
      <section className="landing-hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <span className="pill">🇫🇷 Private French class · A1 → C2</span>
            <h1 className="hero-title">
              Parlez français,
              <br />
              <em>un jour à la fois.</em>
            </h1>
            <p className="hero-lead">
              A calm, structured course that takes you from your first “bonjour” to fluent, nuanced French — reading,
              listening, speaking and writing, a few minutes every day.
            </p>
            <ul className="skill-pills" aria-label="Skills you'll practise">
              <li>📖 Read</li>
              <li>🎧 Listen</li>
              <li>🎙️ Speak</li>
              <li>📝 Write</li>
            </ul>
            <dl className="trust">
              <div><dt>72</dt><dd>lessons</dd></div>
              <div><dt>6</dt><dd>levels</dd></div>
              <div><dt>10′</dt><dd>a day</dd></div>
            </dl>
          </div>

          <div className="signin-card">
            <form onSubmit={submit}>
              <p className="signin-hello">Bon retour 👋</p>
              <h2 className="signin-title">Sign in to your class</h2>
              {!supabaseConfigured && <Alert kind="warn">Supabase isn't configured. Copy .env.example to .env and fill it in.</Alert>}
              <Alert kind="error">{error}</Alert>
              <div className="field">
                <label htmlFor="email">Email</label>
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
                <div className="password-field">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    required
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    className="btn btn-ghost"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>
              <button className="btn btn-block btn-big" disabled={busy || !email || !password}>
                {busy ? "Signing in…" : "Sign in →"}
              </button>
              <p className="small muted signin-note">This is a private class. Accounts are created by your teacher.</p>
            </form>
          </div>
        </div>
      </section>

      <section className="container landing-section" aria-labelledby="how-h">
        <p className="section-eyebrow">How it works</p>
        <h2 id="how-h" className="section-title">Three steps. No guesswork.</h2>
        <ol className="steps-3">
          {STEPS.map((s) => (
            <li key={s.n}>
              <span className="step-num">{s.n}</span>
              <h3>{s.title}</h3>
              <p className="muted">{s.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="landing-band">
        <div className="container landing-section" aria-labelledby="lesson-h">
          <p className="section-eyebrow">Inside every lesson</p>
          <h2 id="lesson-h" className="section-title">All four skills, every single day.</h2>
          <div className="lesson-tiles">
            {LESSON_PARTS.map((p) => (
              <div key={p.title} className="lesson-tile">
                <span className="tile-icon" aria-hidden="true">{p.icon}</span>
                <h3>{p.title}</h3>
                <p className="muted small">{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container landing-section" aria-labelledby="path-h">
        <p className="section-eyebrow">Your path</p>
        <h2 id="path-h" className="section-title">From Breakthrough to Mastery.</h2>
        <ol className="level-path">
          {LEVELS.map((l) => (
            <li key={l}>
              <span className="level-dot">{l}</span>
              <strong>{LEVEL_INFO[l].name}</strong>
              <span className="small muted">{LEVEL_INFO[l].focus}</span>
            </li>
          ))}
        </ol>
        <p className="muted small path-note">Move up a level when you complete its 12 lessons with an average of 80% or more.</p>
      </section>
    </div>
  );
}
