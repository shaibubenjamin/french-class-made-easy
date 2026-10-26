import { useState, type FormEvent } from "react";
import { api, errorMessage } from "../lib/api.ts";
import { track } from "../lib/analytics.ts";
import type { AttemptView, GradeFeedback, GradeResponse, WritingFeedback } from "../lib/types.ts";
import { Alert } from "./ui.tsx";

interface Result {
  is_correct: boolean | null;
  feedback: GradeFeedback;
}

function fromAttempt(a?: AttemptView): Result | null {
  if (!a || !a.feedback || !("explanation" in a.feedback)) return null;
  return { is_correct: a.is_correct, feedback: a.feedback };
}

function Feedback({ result }: { result: Result }) {
  const ok = result.is_correct === true;
  return (
    <div className={`feedback ${ok ? "ok" : "no"}`} role="status" aria-live="polite">
      <p>
        <strong>{ok ? "Correct !" : "Not quite."}</strong>{" "}
        {!ok && (
          <>
            Answer: <span lang="fr">{result.feedback.correct_answer}</span>
          </>
        )}
      </p>
      {result.feedback.accent_warning && <p>Watch your accents — compare with: <span lang="fr">{result.feedback.correct_answer}</span></p>}
      {result.feedback.explanation && <p>{result.feedback.explanation}</p>}
    </div>
  );
}

function useGrade(lessonId: string, refId: string, type: string, initial?: AttemptView) {
  const [result, setResult] = useState<Result | null>(fromAttempt(initial));
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function grade(answer: string) {
    setBusy(true);
    setError("");
    try {
      const r = await api<GradeResponse>("/exercise/grade", {
        body: { lesson_id: lessonId, exercise_ref: refId, answer },
      });
      setResult({ is_correct: r.is_correct, feedback: r });
      track("exercise_answered", { type, correct: r.is_correct === true, ai: r.ai });
    } catch (err) {
      setError(errorMessage(err));
    } finally {
      setBusy(false);
    }
  }
  return { result, setResult, busy, error, grade };
}

export interface ExerciseProps {
  lessonId: string;
  refId: string;
  type: "mcq" | "fill_blank" | "reorder" | "translation";
  prompt: string;
  options: string[];
  initial?: AttemptView;
}

export function Exercise(props: ExerciseProps) {
  const { result, setResult, busy, error, grade } = useGrade(props.lessonId, props.refId, props.type, props.initial);
  const [value, setValue] = useState(props.initial?.answer ?? "");
  const [picked, setPicked] = useState<number[]>([]);
  const answered = result !== null;
  const inputId = `ex-${props.refId}`;

  const retry = () => {
    setResult(null);
    setValue("");
    setPicked([]);
  };

  function submit(e: FormEvent) {
    e.preventDefault();
    if (props.type === "reorder") grade(picked.map((i) => props.options[i]).join(" "));
    else if (value.trim()) grade(value.trim());
  }

  let body;
  if (props.type === "mcq") {
    body = (
      <div className="options" role="radiogroup" aria-labelledby={`${inputId}-p`}>
        {props.options.map((opt) => {
          const chosen = value === opt;
          const state = answered && chosen ? (result.is_correct ? "correct" : "wrong") : chosen ? "selected" : "";
          return (
            <button
              type="button"
              key={opt}
              role="radio"
              aria-checked={chosen}
              disabled={answered || busy}
              className={`option ${state}`}
              onClick={() => {
                setValue(opt);
                grade(opt);
              }}
              lang="fr"
            >
              {opt}
            </button>
          );
        })}
      </div>
    );
  } else if (props.type === "reorder") {
    const remaining = props.options.map((w, i) => ({ w, i })).filter(({ i }) => !picked.includes(i));
    body = (
      <>
        <div className="tokens" aria-label="Your sentence" lang="fr">
          {picked.length === 0 && <span className="muted small">Tap the words in order…</span>}
          {picked.map((i, pos) => (
            <button
              type="button"
              className="token"
              key={`p${i}`}
              disabled={answered}
              onClick={() => setPicked(picked.filter((_, p) => p !== pos))}
              aria-label={`Remove ${props.options[i]}`}
            >
              {props.options[i]}
            </button>
          ))}
        </div>
        <div className="row" lang="fr" aria-label="Words to use">
          {remaining.map(({ w, i }) => (
            <button type="button" className="token" key={`r${i}`} disabled={answered} onClick={() => setPicked([...picked, i])}>
              {w}
            </button>
          ))}
        </div>
      </>
    );
  } else {
    const multiline = props.type === "translation";
    body = (
      <>
        <label htmlFor={inputId} className="sr-only">Your answer</label>
        {multiline ? (
          <textarea
            id={inputId}
            lang="fr"
            style={{ minHeight: 80 }}
            value={value}
            disabled={answered}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Écrivez en français…"
          />
        ) : (
          <input
            id={inputId}
            type="text"
            lang="fr"
            autoComplete="off"
            autoCapitalize="off"
            spellCheck={false}
            value={value}
            disabled={answered}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Your answer"
          />
        )}
      </>
    );
  }

  return (
    <form className="exercise" onSubmit={submit}>
      <p id={`${inputId}-p`} lang="fr" className="prewrap" style={{ fontWeight: 500 }}>
        {props.prompt}
      </p>
      {body}
      {!answered && props.type !== "mcq" && (
        <div className="row" style={{ marginTop: 10 }}>
          <button className="btn btn-secondary" disabled={busy || (props.type === "reorder" ? picked.length === 0 : !value.trim())}>
            {busy ? "Checking…" : "Check"}
          </button>
          {props.type === "translation" && <span className="small muted">Any correct translation is accepted.</span>}
        </div>
      )}
      <Alert kind="error">{error}</Alert>
      {result && <Feedback result={result} />}
      {result && result.is_correct !== true && (
        <button type="button" className="btn btn-ghost small" onClick={retry}>Try again</button>
      )}
    </form>
  );
}

/** Wraps each correction's excerpt in a <mark> so errors are highlighted in place. */
function Highlighted({ text, corrections }: { text: string; corrections: WritingFeedback["corrections"] }) {
  const parts: (string | { err: string; fix: string })[] = [];
  let rest = text;
  for (const c of corrections) {
    const at = c.original ? rest.indexOf(c.original) : -1;
    if (at < 0) continue;
    parts.push(rest.slice(0, at), { err: c.original, fix: c.corrected });
    rest = rest.slice(at + c.original.length);
  }
  parts.push(rest);
  return (
    <p className="prewrap" lang="fr">
      {parts.map((p, i) =>
        typeof p === "string" ? (
          p
        ) : (
          <span key={i}>
            <mark className="err" title={`Correction: ${p.fix}`}>{p.err}</mark>{" "}
            <strong style={{ color: "var(--good)" }}>{p.fix}</strong>
          </span>
        ),
      )}
    </p>
  );
}

export function WritingTask({ lessonId, prompt, initial }: { lessonId: string; prompt: string; initial?: AttemptView }) {
  const initialFeedback = initial?.feedback && "corrections" in initial.feedback ? initial.feedback : null;
  const [text, setText] = useState(initial?.answer ?? "");
  const [submitted, setSubmitted] = useState(initial?.answer ?? "");
  const [feedback, setFeedback] = useState<WritingFeedback | null>(initialFeedback);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function submit(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      const fb = await api<WritingFeedback>("/writing/feedback", { body: { lesson_id: lessonId, text } });
      setFeedback(fb);
      setSubmitted(text);
      track("exercise_answered", { type: "writing", corrections: fb.corrections.length });
    } catch (err) {
      setError(errorMessage(err));
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="stack">
      <p lang="fr" className="lesson-text" style={{ fontSize: "1.15rem" }}>{prompt}</p>
      <form onSubmit={submit}>
        <label htmlFor="writing">Your text</label>
        <textarea id="writing" lang="fr" value={text} onChange={(e) => setText(e.target.value)} maxLength={3000} />
        <div className="row spread" style={{ marginTop: 10 }}>
          <span className="small muted">{text.trim().split(/\s+/).filter(Boolean).length} words</span>
          <button className="btn" disabled={busy || text.trim().length < 3}>
            {busy ? "Reading your text…" : feedback ? "Get new feedback" : "Get feedback"}
          </button>
        </div>
      </form>
      <Alert kind="error">{error}</Alert>
      {feedback && (
        <div className="card" aria-live="polite">
          <div className="row spread">
            <h3 style={{ margin: 0 }}>Feedback</h3>
            <span className="badge badge-accent">{feedback.score}/10</span>
          </div>
          <p style={{ marginTop: 12 }}>{feedback.overall_comment}</p>
          {feedback.corrections.length > 0 ? (
            <>
              <Highlighted text={submitted} corrections={feedback.corrections} />
              <h4>Corrections</h4>
              {feedback.corrections.map((c, i) => (
                <div className="correction" key={i}>
                  <p style={{ margin: 0 }} lang="fr">
                    <s>{c.original}</s> → <strong>{c.corrected}</strong> <span className="badge">{c.tag}</span>
                  </p>
                  <p className="small muted" style={{ margin: "4px 0 0" }}>{c.explanation}</p>
                </div>
              ))}
            </>
          ) : (
            <Alert kind="success">No errors found — excellent work !</Alert>
          )}
          <h4>Improved version</h4>
          <p className="prewrap passage" lang="fr">{feedback.rewritten}</p>
        </div>
      )}
    </div>
  );
}
