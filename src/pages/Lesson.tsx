import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { Dictation, ListenPlayer, ReadAloud, SpeakButton, SpeakFreely, YouTubeBox } from "../components/audio.tsx";
import { Exercise, WritingTask } from "../components/exercises.tsx";
import { Alert, ProgressBar, Spinner } from "../components/ui.tsx";
import { api, errorMessage, useApi } from "../lib/api.ts";
import { useSession } from "../lib/session.tsx";
import { stopSpeaking } from "../lib/speech.ts";
import { track } from "../lib/analytics.ts";
import type { LessonView } from "../lib/types.ts";
import { PASS_MARK } from "../../shared/progression.ts";

const STEPS = [
  { id: "vocabulary", label: "Words", icon: "📖" },
  { id: "grammar", label: "Grammar", icon: "🧩" },
  { id: "listen", label: "Listen", icon: "🎧" },
  { id: "practice", label: "Practice", icon: "✏️" },
  { id: "speak", label: "Speak", icon: "🎙️" },
  { id: "write", label: "Write", icon: "📝" },
] as const;
type StepId = (typeof STEPS)[number]["id"] | "done";

// Progress saved by earlier versions of the app.
const LEGACY: Record<string, StepId> = { text: "listen", exercises: "practice", writing: "write" };

function initialStep(l: LessonView): StepId {
  if (l.progress?.completed_at) return "done";
  const saved = l.progress?.state?.step;
  const step = (saved && (LEGACY[saved] ?? saved)) as StepId | undefined;
  return step && (step === "done" || STEPS.some((s) => s.id === step)) ? step : "vocabulary";
}

export default function LessonPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  // Re-navigating to /lesson/today (after finishing) gets a new key and loads the next lesson.
  const { key: navKey } = useLocation();
  const { refresh } = useSession();
  const { data: lesson, error, reload } = useApi<LessonView>(id ? `/lessons/${id}` : "/lesson/today");
  const [step, setStep] = useState<StepId>("vocabulary");
  const [score, setScore] = useState<number | null>(null);
  const [finishing, setFinishing] = useState(false);
  const [finishError, setFinishError] = useState("");
  const [hideEnglish, setHideEnglish] = useState(false);
  const [showText, setShowText] = useState(false);
  const heading = useRef<HTMLHeadingElement>(null);
  const loadedFor = useRef<string | null>(null);

  useEffect(() => reload(), [navKey, reload]);

  // Set the starting step once per lesson (not on background refreshes).
  useEffect(() => {
    if (!lesson || loadedFor.current === lesson.id) return;
    loadedFor.current = lesson.id;
    setStep(initialStep(lesson));
    setScore(lesson.progress?.score ?? null);
    setShowText(false);
    if (!lesson.progress) track("lesson_started", { level: lesson.level, position: lesson.position ?? null });
  }, [lesson]);

  useEffect(() => {
    stopSpeaking();
    heading.current?.focus({ preventScroll: true });
    window.scrollTo({ top: 0 });
  }, [step]);

  if (error) {
    return (
      <div className="container narrow">
        <Alert kind="info">{error}</Alert>
        <Link to="/lessons">See all lessons</Link>
      </div>
    );
  }
  if (!lesson) return <Spinner label="Loading lesson…" />;

  const c = lesson.content;
  const index = STEPS.findIndex((s) => s.id === step);
  const current = STEPS[index];

  function go(next: StepId) {
    setStep(next);
    // Save the position so learners can resume later (US-3.3).
    if (next !== "done") api(`/lessons/${lesson!.id}/progress`, { method: "PUT", body: { step: next } }).catch(() => {});
  }

  async function finish() {
    setFinishing(true);
    setFinishError("");
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
      setFinishError(errorMessage(e));
    } finally {
      setFinishing(false);
    }
  }

  const passed = (score ?? 0) >= PASS_MARK;

  return (
    <div className="container narrow lesson-page">
      <p className="eyebrow">
        {lesson.level}
        {lesson.position ? ` · Lesson ${lesson.position}${lesson.total ? ` of ${lesson.total}` : ""}` : ""}
        {lesson.all_done && " · review"}
      </p>
      <h1 lang="fr" style={{ marginBottom: 12 }}>{c.theme}</h1>

      {step !== "done" && (
        <div className="lesson-progress">
          <div className="row spread small" style={{ marginBottom: 6 }}>
            <strong>
              {current.icon} Step {index + 1} of {STEPS.length} · {current.label}
            </strong>
          </div>
          <ProgressBar value={index + 1} max={STEPS.length} label="Lesson progress" />
          <nav aria-label="Lesson steps" className="step-dots">
            {STEPS.map((s, i) => (
              <button
                key={s.id}
                type="button"
                className={i < index ? "done" : i === index ? "current" : ""}
                aria-current={s.id === step ? "step" : undefined}
                aria-label={`Step ${i + 1}: ${s.label}`}
                title={s.label}
                onClick={() => go(s.id)}
              >
                <span aria-hidden="true">{s.icon}</span>
                <span className="step-name">{s.label}</span>
              </button>
            ))}
          </nav>
        </div>
      )}

      <div className="card lesson-card">
        {step === "vocabulary" && (
          <>
            <div className="row spread">
              <h2 ref={heading} tabIndex={-1} style={{ margin: 0 }}>New words</h2>
              <label className="checkbox small" style={{ margin: 0, alignItems: "center" }}>
                <input type="checkbox" checked={hideEnglish} onChange={(e) => setHideEnglish(e.target.checked)} /> Test me (hide English)
              </label>
            </div>
            <p className="small muted">Tap 🔊 to hear each word. Say it out loud after the voice.</p>
            <div className="vocab">
              {c.vocabulary.map((v) => (
                <div className="card vocab-card" key={v.fr}>
                  <div className="row spread" style={{ flexWrap: "nowrap" }}>
                    <div className="fr" lang="fr">{v.fr}</div>
                    <SpeakButton text={v.fr} label="Hear the word" />
                  </div>
                  <details open={!hideEnglish} key={String(hideEnglish)}>
                    <summary className="small muted">{hideEnglish ? "Show meaning" : "Meaning"}</summary>
                    <div className="muted">{v.en}</div>
                  </details>
                  <p className="small" lang="fr" style={{ margin: "8px 0 0", fontStyle: "italic" }}>
                    {v.example} <SpeakButton text={v.example} label="Hear the example" />
                  </p>
                </div>
              ))}
            </div>
          </>
        )}

        {step === "grammar" && (
          <>
            <p className="eyebrow">Grammar</p>
            <h2 ref={heading} tabIndex={-1} lang="fr">{c.grammar.topic}</h2>
            <div className="grammar-box prewrap">{c.grammar.explanation}</div>
            <h3 style={{ marginTop: 20 }}>Examples</h3>
            <ul className="example-list" lang="fr">
              {c.grammar.examples.map((ex) => (
                <li key={ex}>
                  <SpeakButton text={ex} label="Hear the example" /> {ex}
                </li>
              ))}
            </ul>
          </>
        )}

        {step === "listen" && (
          <div className="stack">
            <div>
              <h2 ref={heading} tabIndex={-1}>Listen first</h2>
              <p className="muted">Listen to the text <strong>before</strong> reading it. How much do you understand?</p>
              <p className="small muted" style={{ marginBottom: 8 }}>Text: <span lang="fr">« {c.text.title} »</span></p>
              <ListenPlayer text={`${c.text.title}. ${c.text.body}`} label="Play the text" />
              <button type="button" className="btn btn-ghost" style={{ marginTop: 10 }} onClick={() => setShowText(!showText)}>
                {showText ? "Hide the text" : "📄 Show the text"}
              </button>
              {showText && <div className="lesson-text passage" lang="fr">{c.text.body}</div>}
            </div>
            <div>
              <h3>Did you understand?</h3>
              {c.text.questions.map((q) => (
                <Exercise key={q.id} lessonId={lesson.id} refId={q.id} type="mcq" prompt={q.question} options={q.options} initial={lesson.attempts[q.id]} />
              ))}
            </div>
            <div>
              <h3>Dictation</h3>
              <Dictation lessonId={lesson.id} refId="dict1" n={1} sentence={c.vocabulary[1].example} />
              <Dictation lessonId={lesson.id} refId="dict2" n={2} sentence={c.vocabulary[5].example} />
            </div>
            <YouTubeBox level={lesson.level} topic={c.grammar.topic} theme={c.theme} />
          </div>
        )}

        {step === "practice" && (
          <>
            <h2 ref={heading} tabIndex={-1}>Practice</h2>
            <p className="small muted">Your score counts these exercises and the listening questions. Aim for {PASS_MARK}%.</p>
            {c.exercises.map((ex) => (
              <Exercise key={ex.id} lessonId={lesson.id} refId={ex.id} type={ex.type} prompt={ex.prompt} options={ex.options} initial={lesson.attempts[ex.id]} />
            ))}
          </>
        )}

        {step === "speak" && (
          <div className="stack">
            <div>
              <h2 ref={heading} tabIndex={-1}>Speak</h2>
              <p className="muted">1. Read these sentences aloud. 2. Answer a question in your own words.</p>
            </div>
            <ReadAloud lessonId={lesson.id} refId="read1" n={1} sentence={c.grammar.examples[0]} />
            <ReadAloud lessonId={lesson.id} refId="read2" n={2} sentence={c.grammar.examples[1]} />
            <SpeakFreely lessonId={lesson.id} task={c.speaking} />
          </div>
        )}

        {step === "write" && (
          <>
            <h2 ref={heading} tabIndex={-1}>Write</h2>
            <WritingTask lessonId={lesson.id} prompt={c.writing_prompt} initial={lesson.attempts.writing} />
          </>
        )}

        {step === "done" && (
          <div className="stack" style={{ textAlign: "center" }}>
            <h2 ref={heading} tabIndex={-1}>{passed ? "Leçon réussie ! 🎉" : "Leçon terminée 👍"}</h2>
            <p className="stat" style={{ color: passed ? "var(--good)" : "var(--accent)" }}>{score ?? 0}%</p>
            <p className="muted" style={{ maxWidth: 420, margin: "0 auto" }}>
              {passed
                ? `Above the ${PASS_MARK}% goal. This lesson counts towards moving up a level.`
                : `To move up a level you need an average of ${PASS_MARK}%. Retry the exercises you missed to raise your score.`}
            </p>
            <div className="row" style={{ justifyContent: "center" }}>
              <button className="btn" onClick={() => navigate("/lesson/today")}>Next lesson →</button>
              {!passed && <button className="btn btn-secondary" onClick={() => go("practice")}>Improve my score</button>}
              <Link className="btn btn-ghost" to="/dashboard">Dashboard</Link>
            </div>
          </div>
        )}
      </div>

      {step !== "done" && (
        <div className="lesson-nav" role="navigation" aria-label="Lesson navigation">
          <div className="container narrow row spread">
            {index > 0 ? (
              <button className="btn btn-secondary" onClick={() => go(STEPS[index - 1].id)}>← Back</button>
            ) : (
              <Link className="btn btn-ghost" to="/dashboard">Exit</Link>
            )}
            {finishError && <span className="small" style={{ color: "var(--bad)" }}>{finishError}</span>}
            {index < STEPS.length - 1 ? (
              <button className="btn" onClick={() => go(STEPS[index + 1].id)}>
                Continue: {STEPS[index + 1].label} →
              </button>
            ) : (
              <button className="btn" onClick={finish} disabled={finishing}>
                {finishing ? "Saving…" : "Finish lesson ✓"}
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
