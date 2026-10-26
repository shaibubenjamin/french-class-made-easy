export default function Privacy() {
  return (
    <div className="container narrow">
      <h1>Privacy</h1>
      <div className="card stack">
        <p className="muted small">Draft — have this reviewed for GDPR / NDPR compliance before launch.</p>
        <h2>What we collect</h2>
        <p>
          Your email address, the name, timezone, goal and email times you give us, your placement answers, lesson progress,
          exercise answers and writing, and a log of the emails we send you (including opens and clicks).
        </p>
        <h2>Why</h2>
        <p>
          To place you at the right level, generate feedback on your answers, keep your streak, and send the emails you
          opted into. We send your exercise answers and writing to our AI provider (Anthropic) only to produce feedback.
        </p>
        <h2>Analytics</h2>
        <p>
          We record product events (for example “lesson completed”) linked to an anonymous account id. Event data never
          contains your email, name or what you wrote.
        </p>
        <h2>Your rights</h2>
        <p>
          You can export all your data or delete your account at any time from Settings. Deletion is immediate; backups are
          purged within 30 days. Every email has a one-click unsubscribe link.
        </p>
        <h2>Processors</h2>
        <p>Supabase (database and sign-in), Netlify (hosting), Anthropic (AI feedback), Resend (email), PostHog (analytics).</p>
      </div>
    </div>
  );
}
