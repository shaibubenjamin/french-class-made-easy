import { Link } from "react-router-dom";
import { useSession } from "../lib/session.tsx";

export default function Start() {
  const { me } = useSession();
  return (
    <div className="container narrow">
      <h1>{me?.profile.name ? `${me.profile.name}, let's find your level` : "Let's find your level"}</h1>
      <p className="muted">Your daily lessons are written for one CEFR level. Choose how to set it.</p>
      <div className="grid grid-2">
        <div className="card stack">
          <span className="badge badge-accent">Recommended</span>
          <h2>Take the placement quiz</h2>
          <p className="muted">15–20 adaptive questions on grammar, vocabulary and reading. About 8 minutes.</p>
          <Link className="btn" to="/placement">Start the quiz</Link>
        </div>
        <div className="card stack">
          <span className="badge">Quick</span>
          <h2>Pick my level</h2>
          <p className="muted">Read short “I can…” descriptions and choose the one that fits you.</p>
          <Link className="btn btn-secondary" to="/pick-level">Choose a level</Link>
        </div>
      </div>
    </div>
  );
}
