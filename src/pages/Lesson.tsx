import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { Exercise, WritingTask } from "../components/exercises.tsx";
import { Alert, Spinner } from "../components/ui.tsx";
import { api, errorMessage } from "../lib/api.ts";
import { useSession } from "../lib/session.tsx";
import { track } from "../lib/analytics.ts";
import type { LessonView } from "../lib/types.ts";

const STEPS = [
  { id: "vocabulary", label: "Vocabulary" },
  { id: "grammar", label: "Grammar" },
  { id: "text", label: "Reading" },
  { id: "exercises", label: "Exercises" },
  { id: "writing", label: "Writing" },
  { id: "done", label: "Done" },
] as const;
type StepId = (typeof STEPS)[number]["id"];

export default function LessonPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  // Re-navigating to /lesson/today (after finishing) gets a new key and loads the next lesson.
  const { key: navKey } = useLocation();
  const { refresh } = useSession();
  const [lesson, setLesson] = useState<LessonView | null>(null);
  const [step, setStep] = useState<StepId>("vocabulary");
  const [score, setScore] = useState<number | null>(null);
  const [error, setError] = useState("");
  const [finishing, setFinishing] = useState(false);
  const heading = useRef<HTMLHeadingElement>(null);
  const firstRender = useRef(true);

  useEffect(() => {
    setLesson(null);
    setError("");
    api<LessonView>(id ? `/lessons/${id}` : "/lesson/today")
      .then((l) => {
        setLesson(l);
        const saved = l.progress?.state?.step as StepId | undefined;
        setStep(l.progress?.completed_at ? "done" : saved && STEPS.some((s) => s.id === saved) ? saved : "vocabulary");
        setScore(l.progress?.score ?? null);
        if (!l.progress) track("lesson_started", { level: l.level, position: l.position ?? null });
      })
      .catch((e) => setError(errorMessage(e)));
  }, [id, navKey]);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    heading.current?.focus();
    window.scrollTo({ top: 0 });
  }, [step]);

  if (error) {
    return (
      <div className="container narrow">
        <Alert kind="info">{error}</Alert>
        <Link to="/lessons">See past lessons</Link>
      </div>
    );
  }
  if (!lesson) return <Spinner label="Loading lesson…" />;

  const c = lesson.content;
  const index = STEPS.findIndex((s) => s.id === step);

  function go(next: StepId) {
    setStep(next);
    // Save the position so learners can resume later (US-3.3).
    if (next !== "done") api(`/lessons/${lesson!.id}/progress`, { method: "PUT", body: { step: next } }).catch(() => {});
  }

  async function finish() {
    setFinishing(true);
    try {
      const r = await api<{ score: number; first_completion: boolean }>(`/lessons/${lesson!.id}/progress`, {
        method: "PUT",
        body: { step: "done", complete: true },
      });
      setScore(r.score);
      if (r.first_completion) track("lesson_completed", { level: lesson!.level, score: r.score });
      setStep("done");
      refresh();
    } catch (e) {
      setError(errorMessage(e));
    } finally {
      setFinishing(false);
    }
  }

  const nextButton = (label = "Continue") => (
    <div className="row spread" style={{ marginTop: 24 }}>
      {index > 0 ? (
        <button className="btn btn-ghost" onClick={() => go(STEPS[index - 1].id)}>← Back</button>
      ) : <span />}
      <button className="btn" onClick={() => go(STEPS[index + 1].id)}>{label} →</button>
    </div>
  );

  return (
    <div className="container narrow">
      <p className="eyebrow">
        {lesson.level}{lesson.position ? ` · Lesson ${lesson.position}${lesson.total ? ` of ${lesson.total}` : ""}` : ""}
        {lesson.all_done && " · Review — you've completed this level!"}
      </p>
      <h1 lang="fr">{c.theme}</h1>
      <nav aria-label="Lesson steps">
        <ol className="steps" style={{ listStyle: "none", padding: 0 }}>
          {STEPS.map((s, i) => (
            <li key={s.id}>
              <button
                aria-current={s.id === step ? "step" : undefined}
                onClick={() => (s.id === "done" ? finish() : go(s.id))}
                disabled={s.id === "done" && !lesson.progress?.completed_at && i !== index}
              >
                {i + 1}. {s.label}
              </button>
            </li>
          ))}
        </ol>
      </nav>

      <div className="card">
        {step === "vocabulary" && (
          <>
            <h2 ref={heading} tabIndex={-1}>Vocabulary</h2>
            <div className="vocab">
              {c.vocabulary.map((v) => (
                <div className="card" key={v.fr}>
                  <div className="fr" lang="fr">{v.fr}</div>
                  <div className="muted">{v.en}</div>
                  <p className="small" lang="fr" style={{ margin: "8px 0 0", fontStyle: "italic" }}>{v.example}</p>
                </div>
              ))}
            </div>
            {nextButton()}
          </>
        )}

        {step === "grammar" && (
          <>
            <p className="eyebrow">Grammar</p>
            <h2 ref={heading} tabIndex={-1} lang="fr">{c.grammar.topic}</h2>
            <p className="prewrap">{c.grammar.explanation}</p>
            <ul lang="fr">
              {c.grammar.examples.map((ex) => <li key={ex}>{ex}</li>)}
            </ul>
            {nextButton()}
          </>
        )}

        {step === "text" && (
          <>
            <p className="eyebrow">Reading</p>
            <h2 ref={heading} tabIndex={-1} lang="fr">{c.text.title}</h2>
            <div className="lesson-text" lang="fr">{c.text.body}</div>
            <h3 style={{ marginTop: 24 }}>Comprehension</h3>
            {c.text.questions.map((q) => (
              <Exercise
                key={q.id}
                lessonId={lesson.id}
                refId={q.id}
                type="mcq"
                prompt={q.question}
                options={q.options}
                initial={lesson.attempts[q.id]}
              />
            ))}
            {nextButton()}
          </>
        )}

        {step === "exercises" && (
          <>
            <h2 ref={heading} tabIndex={-1}>Exercises</h2>
            {c.exercises.map((ex) => (
              <Exercise
                key={ex.id}
                lessonId={lesson.id}
                refId={ex.id}
                type={ex.type}
                prompt={ex.prompt}
                options={ex.options}
                initial={lesson.attempts[ex.id]}
              />
            ))}
            {nextButton()}
          </>
        )}

        {step === "writing" && (
          <>
            <h2 ref={heading} tabIndex={-1}>Writing</h2>
            <WritingTask lessonId={lesson.id} prompt={c.writing_prompt} initial={lesson.attempts.writing} />
            <div className="row spread" style={{ marginTop: 24 }}>
              <button className="btn btn-ghost" onClick={() => go("exercises")}>← Back</button>
              <button className="btn" onClick={finish} disabled={finishing}>
                {finishing ? "Saving…" : "Finish lesson"}
              </button>
            </div>
          </>
        )}

        {step === "done" && (
          <div className="stack" style={{ textAlign: "center" }}>
            <h2 ref={heading} tabIndex={-1}>Leçon terminée ! 🎉</h2>
            <p className="stat">{score ?? 0}%</p>
            <p className="muted">of exercises and reading questions answered correctly.</p>
            <div className="row" style={{ justifyContent: "center" }}>
              <button className="btn" onClick={() => navigate("/lesson/today")}>Next lesson →</button>
              <Link className="btn btn-secondary" to="/dashboard">Dashboard</Link>
              <button className="btn btn-secondary" onClick={() => go("exercises")}>Review exercises</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
