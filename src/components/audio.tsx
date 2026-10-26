import { useEffect, useRef, useState, type FormEvent } from "react";
import { api, errorMessage } from "../lib/api.ts";
import { recognitionSupported, recordingSupported, speak, stopSpeaking, ttsSupported, useRecorder } from "../lib/speech.ts";
import { track } from "../lib/analytics.ts";
import type { GradeResponse } from "../lib/types.ts";
import { keywordHits, keywordLabel, readAloudScore } from "../../shared/speech.ts";
import { PASS_MARK } from "../../shared/progression.ts";
import type { Level } from "../../shared/levels.ts";
import { Alert } from "./ui.tsx";

/** Small 🔊 button that reads French text aloud. */
export function SpeakButton({ text, label = "Listen", rate = 1 }: { text: string; label?: string; rate?: number }) {
  if (!ttsSupported) return null;
  return (
    <button type="button" className="icon-btn" aria-label={`${label}: ${text}`} title={label} onClick={() => speak(text, { rate })}>
      🔊
    </button>
  );
}

/** Play / stop a longer text, at normal or slow speed. */
export function ListenPlayer({ text, label = "Listen" }: { text: string; label?: string }) {
  const [playing, setPlaying] = useState(false);
  const [slow, setSlow] = useState(false);
  useEffect(() => () => stopSpeaking(), []);
  if (!ttsSupported) return <p className="small muted">Audio isn't available in this browser.</p>;
  return (
    <div className="row">
      <button
        type="button"
        className="btn"
        onClick={() => {
          if (playing) {
            stopSpeaking();
            setPlaying(false);
          } else {
            setPlaying(true);
            speak(text, { rate: slow ? 0.75 : 1, onEnd: () => setPlaying(false) });
          }
        }}
      >
        {playing ? "⏹ Stop" : `▶ ${label}`}
      </button>
      <label className="checkbox small" style={{ alignItems: "center", margin: 0 }}>
        <input type="checkbox" checked={slow} onChange={(e) => setSlow(e.target.checked)} /> Slower
      </label>
    </div>
  );
}

/** Dictation: hear a sentence, type what you heard. */
export function Dictation({ lessonId, refId, sentence, n }: { lessonId: string; refId: string; sentence: string; n: number }) {
  const [value, setValue] = useState("");
  const [result, setResult] = useState<GradeResponse | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function check(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      const r = await api<GradeResponse>("/exercise/grade", { body: { lesson_id: lessonId, exercise_ref: refId, answer: value } });
      setResult(r);
      track("exercise_answered", { type: "dictation", correct: r.is_correct === true });
    } catch (err) {
      setError(errorMessage(err));
    } finally {
      setBusy(false);
    }
  }

  return (
    <form className="exercise" onSubmit={check}>
      <p style={{ fontWeight: 500 }}>Sentence {n} — listen, then type what you hear.</p>
      <div className="row" style={{ marginBottom: 10 }}>
        <button type="button" className="btn btn-secondary" onClick={() => speak(sentence)}>▶ Play</button>
        <button type="button" className="btn btn-ghost" onClick={() => speak(sentence, { rate: 0.7 })}>🐢 Slowly</button>
      </div>
      <label className="sr-only" htmlFor={`dict-${refId}`}>What you heard</label>
      <input
        id={`dict-${refId}`}
        type="text"
        lang="fr"
        autoComplete="off"
        spellCheck={false}
        value={value}
        disabled={Boolean(result?.is_correct)}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Écrivez la phrase…"
      />
      {!result?.is_correct && (
        <button className="btn btn-secondary" style={{ marginTop: 10 }} disabled={busy || !value.trim()}>
          {busy ? "Checking…" : "Check"}
        </button>
      )}
      <Alert kind="error">{error}</Alert>
      {result && (
        <div className={`feedback ${result.is_correct ? "ok" : "no"}`} role="status">
          <p>
            <strong>{result.is_correct ? "Bravo !" : "Not quite."}</strong> The sentence was: <span lang="fr">{result.correct_answer}</span>
          </p>
          {result.accent_warning && <p>Almost perfect — check your accents.</p>}
        </div>
      )}
    </form>
  );
}

function useAutoSave(lessonId: string, ref: string, ready: boolean, payload: () => { transcript: string; score: number | null; seconds: number }) {
  const saved = useRef(false);
  const latest = useRef(payload);
  latest.current = payload;
  useEffect(() => {
    if (!ready) {
      saved.current = false;
      return;
    }
    if (saved.current) return;
    // Give speech recognition a moment to deliver its final words.
    const t = window.setTimeout(() => {
      saved.current = true;
      api("/speaking/submit", { body: { lesson_id: lessonId, ref, ...latest.current() } }).catch(() => {});
      track("exercise_answered", { type: `speaking-${ref}` });
    }, 1500);
    return () => window.clearTimeout(t);
  }, [ready, lessonId, ref]);
}

function MicButton({ rec }: { rec: ReturnType<typeof useRecorder> }) {
  if (!recordingSupported) return <Alert kind="warn">Recording isn't supported in this browser. Try Chrome, Edge or Safari.</Alert>;
  return rec.status === "recording" ? (
    <button type="button" className="btn btn-danger mic-on" onClick={rec.stop}>
      ⏹ Stop ({rec.seconds}s)
    </button>
  ) : (
    <button type="button" className="btn" onClick={rec.start}>
      🎙️ {rec.status === "done" ? "Record again" : "Start recording"}
    </button>
  );
}

/** Read a sentence aloud; scored by matching the transcript against the sentence. */
export function ReadAloud({ lessonId, refId, sentence, n }: { lessonId: string; refId: "read1" | "read2"; sentence: string; n: number }) {
  const rec = useRecorder(30);
  const result = recognitionSupported && rec.status === "done" ? readAloudScore(sentence, rec.transcript) : null;
  useAutoSave(lessonId, refId, rec.status === "done", () => ({
    transcript: rec.transcript,
    score: recognitionSupported ? readAloudScore(sentence, rec.transcript).score : null,
    seconds: rec.seconds,
  }));

  return (
    <div className="exercise">
      <p className="small muted" style={{ marginBottom: 4 }}>Sentence {n}</p>
      <p lang="fr" className="say-this">
        {result
          ? result.words.map((w, i) => (
              <span key={i} className={w.ok ? "word-ok" : "word-miss"}>{w.word} </span>
            ))
          : sentence}
      </p>
      <div className="row">
        {ttsSupported && <button type="button" className="btn btn-secondary" onClick={() => speak(sentence, { rate: 0.85 })}>🔊 Hear it</button>}
        <MicButton rec={rec} />
      </div>
      {rec.status === "recording" && <p className="small muted" style={{ marginTop: 8 }}>🔴 Recording… read the sentence, then press Stop. {rec.interim && <em lang="fr">« {rec.interim} »</em>}</p>}
      <Alert kind="warn">{rec.error}</Alert>
      {rec.status === "done" && (
        <div className={`feedback ${result && result.score >= PASS_MARK ? "ok" : result ? "no" : ""}`} role="status" style={result ? undefined : { background: "var(--surface-2)" }}>
          {result ? (
            <>
              <p>
                <strong>{result.score}% recognised</strong> — {result.score >= PASS_MARK ? "très bien !" : "words in red weren't recognised. Listen again and retry."}
              </p>
              <p className="small">We heard: <span lang="fr">« {rec.transcript || "…"} »</span></p>
            </>
          ) : (
            <p>Listen to your recording and compare it with the model 🔊.</p>
          )}
          {rec.audioUrl && <audio controls src={rec.audioUrl} style={{ width: "100%", marginTop: 6 }} />}
        </div>
      )}
    </div>
  );
}

const SELF_CHECK = [
  "I spoke for at least 30 seconds",
  "I answered every part of the question",
  "Listening back, I can understand myself",
];

/** Free speaking task ("Parlez-nous de…"), checked for target expressions. */
export function SpeakFreely({ lessonId, task }: { lessonId: string; task: { prompt: string; en?: string; keywords: string[] } }) {
  const rec = useRecorder(120);
  const [ticked, setTicked] = useState<Set<number>>(new Set());
  const hits = rec.status !== "idle" && recognitionSupported ? keywordHits(rec.transcript + " " + rec.interim, task.keywords) : null;
  useAutoSave(lessonId, "free", rec.status === "done", () => ({
    transcript: rec.transcript,
    score: recognitionSupported ? keywordHits(rec.transcript, task.keywords).score : null,
    seconds: rec.seconds,
  }));

  return (
    <div className="stack">
      <div className="prompt-card">
        <p className="eyebrow">Your turn to speak</p>
        <p lang="fr" className="prompt-fr">{task.prompt}</p>
        {task.en && <p className="small muted" style={{ margin: 0 }}>{task.en}</p>}
      </div>
      <div>
        <p className="small" style={{ marginBottom: 6 }}><strong>Try to use:</strong></p>
        <div className="row">
          {task.keywords.map((k) => (
            <span key={k} lang="fr" className={`chip ${hits ? (hits.hit.includes(k) ? "chip-ok" : "") : ""}`}>
              {hits?.hit.includes(k) ? "✓ " : ""}
              {keywordLabel(k)}
            </span>
          ))}
        </div>
      </div>
      <div className="row">
        <MicButton rec={rec} />
        <span className="small muted">Up to 2 minutes. Speak naturally — mistakes are fine!</span>
      </div>
      {rec.status === "recording" && (
        <p className="small muted">🔴 Recording… {rec.interim && <em lang="fr">« {rec.interim} »</em>}</p>
      )}
      <Alert kind="warn">{rec.error}</Alert>
      {rec.status === "done" && (
        <div className="card">
          {recognitionSupported ? (
            <>
              <p>
                <strong>
                  You used {hits?.hit.length ?? 0} of {task.keywords.length} target expressions
                </strong>{" "}
                · {rec.seconds}s
              </p>
              <p className="small" lang="fr">We heard: « {rec.transcript || "(nothing recognised — speak a little closer to the microphone)"} »</p>
            </>
          ) : (
            <p className="small muted">Automatic feedback needs Chrome or Edge. Listen back and use the checklist below.</p>
          )}
          {rec.audioUrl && <audio controls src={rec.audioUrl} style={{ width: "100%", margin: "6px 0 12px" }} />}
          <p className="small" style={{ marginBottom: 6 }}><strong>Check yourself:</strong></p>
          {SELF_CHECK.map((item, i) => (
            <label className="checkbox" key={item} style={{ marginBottom: 6 }}>
              <input
                type="checkbox"
                checked={ticked.has(i)}
                onChange={() => {
                  const next = new Set(ticked);
                  if (next.has(i)) next.delete(i);
                  else next.add(i);
                  setTicked(next);
                }}
              />
              <span>{item}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
}

/** YouTube suggestions: search links, so they never go stale. */
export function youtubeLinks(level: Level, topic: string, theme: string) {
  const yt = (q: string) => `https://www.youtube.com/results?search_query=${encodeURIComponent(q)}`;
  const beginner = level === "A1" || level === "A2";
  const advanced = level === "C1" || level === "C2";
  return [
    { label: `Grammar video: « ${topic} »`, href: yt(`${topic} cours de français ${level}`) },
    {
      label: `Real French about « ${theme.replace(/[!?.]/g, "").trim()} »`,
      href: yt(`${theme.replace(/[!?.]/g, "")} ${beginner ? "français facile" : advanced ? "reportage" : "en français"}`),
    },
    beginner
      ? { label: "Easy French — street interviews (subtitled)", href: yt("Easy French street interview") }
      : advanced
        ? { label: "France Culture — podcasts & debates", href: yt("France Culture") }
        : { label: "innerFrench — natural French at B1–B2", href: yt("innerFrench") },
  ];
}

export function YouTubeBox({ level, topic, theme }: { level: Level; topic: string; theme: string }) {
  return (
    <div className="card">
      <h3 style={{ marginBottom: 6 }}>📺 Watch & listen on YouTube</h3>
      <p className="small muted">Turn on French subtitles (CC) and slow the speed to 0.75× if you need to.</p>
      <ul className="link-list">
        {youtubeLinks(level, topic, theme).map((l) => (
          <li key={l.href}>
            <a href={l.href} target="_blank" rel="noopener noreferrer" lang="fr">
              {l.label} ↗
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
