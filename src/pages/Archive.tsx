import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Alert, Spinner } from "../components/ui.tsx";
import { api, errorMessage } from "../lib/api.ts";

interface Item {
  id: string;
  date: string;
  theme: string;
  level: string;
  completed: boolean;
  started: boolean;
  score: number | null;
}

/** FR-16: lessons from the past 30 days at the learner's level. */
export default function Archive() {
  const [items, setItems] = useState<Item[] | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    api<{ lessons: Item[] }>("/lessons").then((r) => setItems(r.lessons)).catch((e) => setError(errorMessage(e)));
  }, []);

  if (error) return <div className="container"><Alert kind="error">{error}</Alert></div>;
  if (!items) return <Spinner />;

  return (
    <div className="container narrow">
      <h1>Past lessons</h1>
      <p className="muted">The last 30 days at your level. Catch up on any you missed.</p>
      {items.length === 0 ? (
        <Alert>No lessons yet — your first one arrives tomorrow morning.</Alert>
      ) : (
        <div className="card" style={{ padding: 0 }}>
          <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
            {items.map((l, i) => (
              <li key={l.id} style={{ borderTop: i ? "1px solid var(--line)" : 0 }}>
                <Link to={`/lesson/${l.id}`} className="row spread" style={{ padding: "14px 20px", color: "inherit", textDecoration: "none" }}>
                  <span>
                    <span className="small muted" style={{ display: "block" }}>
                      {new Date(`${l.date}T12:00:00`).toLocaleDateString(undefined, { weekday: "short", day: "numeric", month: "short" })}
                    </span>
                    <strong lang="fr">{l.theme}</strong>
                  </span>
                  {l.completed ? (
                    <span className="badge badge-good">Done · {l.score ?? 0}%</span>
                  ) : l.started ? (
                    <span className="badge badge-accent">In progress</span>
                  ) : (
                    <span className="badge">Not started</span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
