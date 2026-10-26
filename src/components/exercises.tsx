import { useState, type FormEvent } from "react";
import { api, errorMessage } from "../lib/api.ts";
import { track } from "../lib/analytics.ts";
import type { AttemptView, GradeFeedback, GradeResponse, WritingResult } from "../lib/types.ts";
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
        {(!ok || result.feedback.self_check) && (
          <>
            {result.feedback.self_check ? "Model answer" : "Answer"}: <span lang="fr">{result.feedback.correct_answer}</span>
          </>
        )}
      </p>
      {result.feedback.accent_warning && (
        <p>
          Watch your accents — compare with: <span lang="fr">{result.feedback.correct_answer}</span>
        </p>
      )}
      {result.feedback.explanation && <p>{result.feedback.explanation}</p>}
    </div>
  );
}

function useGrade(lessonId: string, refId: string, type: string, initial?: AttemptView) {
  const [result, setResult] = useState<Result | null>(fromAttempt(initial));
  const [pending, setPending] = useState<GradeFeedback | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function grade(answer: string, selfAssessed?: boolean) {
    setBusy(true);
    setError("");
    try {
      const r = await api<GradeResponse>("/exercise/grade", {
        body: { lesson_id: lessonId, exercise_ref: refId, answer, self_assessed: selfAssessed },
      });
      if (r.needs_self_check) {
        setPending(r);
      } else {
        setPending(null);
        setResult({ is_correct: r.is_correct, feedback: r });
        track("exercise_answered", { type, correct: r.is_correct === true, self_check: r.self_check });
      }
    } catch (err) {
      setError(errorMessage(err));
    } finally {
      setBusy(false);
    }
  }
  return { result, setResult, pending, setPending, busy, error, grade };
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
  const { result, setResult, pending, setPending, busy, error, grade } = useGrade(
    props.lessonId,
    props.refId,
    props.type,
    props.initial,
  );
  const [value, setValue] = useState(props.initial?.answer ?? "");
  const [picked, setPicked] = useState<number[]>([]);
  const answered = result !== null;
  const locked = answered || pending !== null;
  const inputId = `ex-${props.refId}`;

  const retry = () => {
    setResult(null);
    setPending(null);
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
              disabled={locked}
              onClick={() => setPicked(picked.filter((_, p) => p !== pos))}
              aria-label={`Remove ${props.options[i]}`}
            >
              {props.options[i]}
            </button>
          ))}
        </div>
        <div className="row" lang="fr" aria-label="Words to use">
          {remaining.map(({ w, i }) => (
            <button type="button" className="token" key={`r${i}`} disabled={locked} onClick={() => setPicked([...picked, i])}>
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
            disabled={locked}
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
            disabled={locked}
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
      {!locked && props.type !== "mcq" && (
        <div className="row" style={{ marginTop: 10 }}>
          <button className="btn btn-secondary" disabled={busy || (props.type === "reorder" ? picked.length === 0 : !value.trim())}>
            {busy ? "Checking…" : "Check"}
          </button>
        </div>
      )}
      <Alert kind="error">{error}</Alert>
      {pending && (
        <div className="feedback" style={{ background: "var(--surface-2)", border: "1px solid var(--line)" }} role="status" aria-live="polite">
          <p>
            Compare with the model answer: <strong lang="fr">{pending.correct_answer}</strong>
          </p>
          {pending.explanation && <p className="muted">{pending.explanation}</p>}
          <p style={{ marginBottom: 8 }}>Other wordings can be correct too. Does yours mean the same thing, with no grammar mistakes?</p>
          <div className="row">
            <button type="button" className="btn" disabled={busy} onClick={() => grade(value.trim(), true)}>
              Yes, mine is right
            </button>
            <button type="button" className="btn btn-secondary" disabled={busy} onClick={() => grade(value.trim(), false)}>
              No, I made a mistake
            </button>
          </div>
        </div>
      )}
      {result && <Feedback result={result} />}
      {result && result.is_correct !== true && (
        <button type="button" className="btn btn-ghost small" onClick={retry}>Try again</button>
      )}
    </form>
  );
}

export function WritingTask({ lessonId, prompt, initial }: { lessonId: string; prompt: string; initial?: AttemptView }) {
  const initialResult = initial?.feedback && "model" in initial.feedback ? initial.feedback : null;
  const [text, setText] = useState(initial?.answer ?? "");
  const [result, setResult] = useState<WritingResult | null>(initialResult);
  const [checked, setChecked] = useState<Set<number>>(new Set());
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function submit(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      setResult(await api<WritingResult>("/writing/submit", { body: { lesson_id: lessonId, text } }));
      track("exercise_answered", { type: "writing" });
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
            {busy ? "Saving…" : result ? "Save new version" : "Compare with a model answer"}
          </button>
        </div>
      </form>
      <Alert kind="error">{error}</Alert>
      {result && (
        <div className="card" aria-live="polite">
          <h3>Model answer</h3>
          <p className="prewrap passage" lang="fr">{result.model}</p>
          <h4>Check your text</h4>
          <p className="small muted">Tick each point your text gets right. Fix anything missing, then save a new version.</p>
          {result.checklist.map((item, i) => (
            <label className="checkbox" key={item} style={{ marginBottom: 8 }}>
              <input
                type="checkbox"
                checked={checked.has(i)}
                onChange={() => {
                  const next = new Set(checked);
                  if (next.has(i)) next.delete(i);
                  else next.add(i);
                  setChecked(next);
                }}
              />
              <span lang="fr">{item}</span>
            </label>
          ))}
          {checked.size === result.checklist.length && <Alert kind="success">Excellent — every point covered !</Alert>}
        </div>
      )}
    </div>
  );
}
