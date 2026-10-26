import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Alert, Spinner } from "../components/ui.tsx";
import { api, errorMessage } from "../lib/api.ts";

interface ReviewItem {
  prompt: string;
  answer: string;
  explanation?: string;
}

/** In-app evening review: today's mistakes, or vocabulary when there are none. */
export default function Review() {
  const [data, setData] = useState<{ items: ReviewItem[]; fromMistakes: boolean } | null>(null);
  const [revealed, setRevealed] = useState<Set<number>>(new Set());
  const [error, setError] = useState("");

  useEffect(() => {
    api<{ items: ReviewItem[]; fromMistakes: boolean }>("/review").then(setData).catch((e) => setError(errorMessage(e)));
  }, []);

  if (error) return <div className="container"><Alert kind="error">{error}</Alert></div>;
  if (!data) return <Spinner />;

  return (
    <div className="container narrow">
      <h1>Révision</h1>
      <p className="muted">
        {data.fromMistakes
          ? "A second look at today's mistakes. Try to answer before revealing."
          : "No mistakes to review today — here's some vocabulary instead."}
      </p>
      {data.items.length === 0 ? (
        <Alert>Nothing to review yet. <Link to="/lesson/today">Start today's lesson</Link>.</Alert>
      ) : (
        <div className="card">
          {data.items.map((item, i) => (
            <div className="exercise" key={i}>
              <p lang="fr" className="prewrap" style={{ fontWeight: 500 }}>{i + 1}. {item.prompt}</p>
              {revealed.has(i) ? (
                <div className="feedback ok" role="status">
                  <p lang="fr"><strong>{item.answer}</strong></p>
                  {item.explanation && <p>{item.explanation}</p>}
                </div>
              ) : (
                <button className="btn btn-secondary" onClick={() => setRevealed(new Set(revealed).add(i))}>
                  Reveal answer
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
