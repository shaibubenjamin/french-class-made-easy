import { Link } from "react-router-dom";
import { Alert, ProgressBar, Spinner } from "../components/ui.tsx";
import { useApi } from "../lib/api.ts";
import { PASS_MARK } from "../../shared/progression.ts";
import { useSession } from "../lib/session.tsx";

interface Item {
  id: string;
  seq: number;
  theme: string;
  level: string;
  grammar_topic: string;
  completed: boolean;
  started: boolean;
  score: number | null;
}

/** The whole course for the learner's level, in order (FR-16). */
export default function Archive() {
  const { me } = useSession();
  const { data, error } = useApi<{ lessons: Item[] }>("/lessons");
  const items = data?.lessons;

  if (error) return <div className="container"><Alert kind="error">{error}</Alert></div>;
  if (!items) return <Spinner />;

  const done = items.filter((l) => l.completed).length;
  return (
    <div className="container narrow">
      <h1>Your {me?.profile.current_level} course</h1>
      <p className="muted">
        {done} of {items.length} lessons completed. Open any lesson at any time — lessons under {PASS_MARK}% can be redone to raise
        your score.
      </p>
      <div style={{ marginBottom: 16 }}>
        <ProgressBar value={done} max={Math.max(items.length, 1)} label="Course progress" />
      </div>
      {items.length === 0 ? (
        <Alert>No lessons are available for this level yet.</Alert>
      ) : (
        <div className="card" style={{ padding: 0 }}>
          <ol style={{ listStyle: "none", margin: 0, padding: 0 }}>
            {items.map((l, i) => (
              <li key={l.id} style={{ borderTop: i ? "1px solid var(--line)" : 0 }}>
                <Link to={`/lesson/${l.id}`} className="row spread" style={{ padding: "14px 20px", color: "inherit", textDecoration: "none" }}>
                  <span>
                    <span className="small muted" style={{ display: "block" }}>Lesson {l.seq} · <span lang="fr">{l.grammar_topic}</span></span>
                    <strong lang="fr">{l.theme}</strong>
                  </span>
                  {l.completed ? (
                    (l.score ?? 0) >= PASS_MARK ? (
                      <span className="badge badge-good">✓ {l.score ?? 0}%</span>
                    ) : (
                      <span className="badge badge-accent">{l.score ?? 0}% · redo to reach {PASS_MARK}%</span>
                    )
                  ) : l.started ? (
                    <span className="badge badge-accent">In progress</span>
                  ) : (
                    <span className="badge">Not started</span>
                  )}
                </Link>
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
}
