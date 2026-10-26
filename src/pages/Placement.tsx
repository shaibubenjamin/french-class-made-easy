import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Alert, BarChart, ProgressBar, Spinner } from "../components/ui.tsx";
import { api, ApiError, errorMessage } from "../lib/api.ts";
import { useSession } from "../lib/session.tsx";
import { track } from "../lib/analytics.ts";
import type { PlacementStep } from "../lib/types.ts";
import { LEVEL_INFO } from "../../shared/levels.ts";

const SKILL_LABEL: Record<string, string> = { grammar: "Grammar", vocabulary: "Vocabulary", reading: "Reading" };

export default function Placement() {
  const { refresh } = useSession();
  const navigate = useNavigate();
  const [step, setStep] = useState<PlacementStep | null>(null);
  const [selected, setSelected] = useState<number | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [blockedUntil, setBlockedUntil] = useState<string | null>(null);
  const started = useRef(false);
  const heading = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (started.current) return;
    started.current = true;
    api<PlacementStep>("/placement/start", { body: {} })
      .then((s) => {
        setStep(s);
        track("quiz_started");
      })
      .catch((err) => {
        if (err instanceof ApiError && err.status === 429) setBlockedUntil(String(err.body.next_available ?? ""));
        else setError(errorMessage(err));
      });
  }, []);

  useEffect(() => heading.current?.focus(), [step]);

  async function submit() {
    if (!step || step.done || selected === null) return;
    setBusy(true);
    setError("");
    try {
      const next = await api<PlacementStep>("/placement/answer", {
        body: { attempt_id: step.attempt_id, question_id: step.question.id, answer: selected },
      });
      if (next.done) track("quiz_completed", { level: next.result.level, questions: next.result.answered });
      setStep(next);
      setSelected(null);
    } catch (err) {
      setError(errorMessage(err));
    } finally {
      setBusy(false);
    }
  }

  async function accept(level: string) {
    setBusy(true);
    try {
      await api("/level", { body: { level, source: "quiz" } });
      await refresh();
      navigate("/dashboard");
    } catch (err) {
      setError(errorMessage(err));
      setBusy(false);
    }
  }

  if (blockedUntil) {
    return (
      <div className="container narrow">
        <div className="card">
          <h1>You took the quiz recently</h1>
          <p>
            The placement quiz can be retaken once every 7 days
            {blockedUntil && <> — next available on {new Date(blockedUntil).toLocaleDateString()}</>}.
          </p>
          <Link className="btn" to="/pick-level">Choose a level instead</Link>
        </div>
      </div>
    );
  }

  if (!step) return error ? <div className="container narrow"><Alert kind="error">{error}</Alert></div> : <Spinner />;

  if (step.done) {
    const { level, skills } = step.result;
    return (
      <div className="container narrow">
        <div className="card stack">
          <p className="eyebrow">Your result</p>
          <h1 ref={heading} tabIndex={-1}>
            We recommend <span style={{ color: "var(--accent)" }}>{level}</span> — {LEVEL_INFO[level].name}
          </h1>
          <ul className="muted">
            {LEVEL_INFO[level].canDo.map((c) => <li key={c}>{c}</li>)}
          </ul>
          <h2>By skill</h2>
          <BarChart
            title="Placement score by skill (percent correct)"
            max={100}
            format={(v) => `${v}%`}
            rows={Object.entries(skills).map(([skill, s]) => ({
              label: SKILL_LABEL[skill] ?? skill,
              value: s.percent,
              detail: `${s.correct}/${s.total} correct, around ${s.level}`,
            }))}
          />
          <p className="small muted">
            {Object.entries(skills).map(([skill, s]) => `${SKILL_LABEL[skill] ?? skill}: around ${s.level}`).join(" · ")}
          </p>
          <Alert kind="error">{error}</Alert>
          <div className="row">
            <button className="btn" onClick={() => accept(level)} disabled={busy}>Accept {level}</button>
            <Link className="btn btn-secondary" to={`/pick-level?recommended=${level}`}>Choose another level</Link>
          </div>
        </div>
      </div>
    );
  }

  const { question, progress } = step;
  return (
    <div className="container narrow">
      <div className="row spread small muted" style={{ marginBottom: 8 }}>
        <span>Question {progress.answered + 1}</span>
        <span>15–{progress.max} questions</span>
      </div>
      <ProgressBar value={progress.answered} max={progress.max} label="Quiz progress" />
      <div className="card" style={{ marginTop: 16 }}>
        <p className="eyebrow">{SKILL_LABEL[question.skill] ?? question.skill}</p>
        {question.passage && <blockquote className="passage" lang="fr">{question.passage}</blockquote>}
        <h2 ref={heading} tabIndex={-1} lang="fr" style={{ fontSize: "1.3rem" }}>{question.prompt}</h2>
        <div className="options" role="radiogroup" aria-label="Answers">
          {question.options.map((opt, i) => (
            <button
              key={i}
              role="radio"
              aria-checked={selected === i}
              className={`option ${selected === i ? "selected" : ""}`}
              onClick={() => setSelected(i)}
              lang="fr"
            >
              {opt}
            </button>
          ))}
        </div>
        <Alert kind="error">{error}</Alert>
        <div className="row spread" style={{ marginTop: 20 }}>
          <span className="small muted">You can't go back once you answer.</span>
          <button className="btn" onClick={submit} disabled={selected === null || busy}>
            {busy ? "Checking…" : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
}
