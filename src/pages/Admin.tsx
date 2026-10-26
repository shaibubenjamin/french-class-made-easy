import { useCallback, useEffect, useState } from "react";
import { Alert, BarChart, Spinner } from "../components/ui.tsx";
import { api, errorMessage } from "../lib/api.ts";
import { LEVELS, type Level } from "../../shared/levels.ts";

interface LessonSummary {
  id: string;
  level: string;
  seq: number;
  theme: string;
  status: "draft" | "approved";
  updated_at: string;
}

interface Metrics {
  users_total: number;
  users_by_level: Record<string, number>;
  email_last_30d: Record<"sent" | "opened" | "clicked" | "bounced" | "complained" | "failed", number>;
  lessons_completed_7d: number;
  active_users_7d: number;
  quiz_overrides: { quiz: number; self: number };
}

export default function Admin() {
  const [tab, setTab] = useState<"course" | "metrics">("course");
  return (
    <div className="container stack">
      <h1>Admin</h1>
      <div className="segmented" role="tablist" style={{ maxWidth: 360 }}>
        <button role="tab" aria-selected={tab === "course"} className={`btn btn-secondary ${tab === "course" ? "selected" : ""}`} onClick={() => setTab("course")}>
          Course editor
        </button>
        <button role="tab" aria-selected={tab === "metrics"} className={`btn btn-secondary ${tab === "metrics" ? "selected" : ""}`} onClick={() => setTab("metrics")}>
          Metrics
        </button>
      </div>
      {tab === "course" ? <CourseEditor /> : <MetricsPanel />}
    </div>
  );
}

function CourseEditor() {
  const [level, setLevel] = useState<Level>("A1");
  const [lessons, setLessons] = useState<LessonSummary[] | null>(null);
  const [openId, setOpenId] = useState<string | null>(null);
  const [error, setError] = useState("");

  const load = useCallback(() => {
    setLessons(null);
    api<{ lessons: LessonSummary[] }>(`/admin/lessons?level=${level}`)
      .then((r) => setLessons(r.lessons))
      .catch((e) => setError(errorMessage(e)));
  }, [level]);

  useEffect(load, [load]);

  if (openId) {
    return (
      <LessonEditor
        id={openId}
        onClose={() => {
          setOpenId(null);
          load();
        }}
      />
    );
  }

  return (
    <section className="card">
      <div className="row">
        <label htmlFor="lvl" className="sr-only">Level</label>
        <select id="lvl" value={level} onChange={(e) => setLevel(e.target.value as Level)} style={{ width: 120 }}>
          {LEVELS.map((l) => <option key={l}>{l}</option>)}
        </select>
        <span className="small muted">The built-in course. Edits apply immediately for every learner at this level.</span>
      </div>
      <Alert kind="error">{error}</Alert>
      {!lessons ? (
        <Spinner />
      ) : (
        <div className="table-wrap" style={{ marginTop: 12 }}>
          <table className="data">
            <thead>
              <tr><th>#</th><th>Theme</th><th>Status</th><th><span className="sr-only">Actions</span></th></tr>
            </thead>
            <tbody>
              {lessons.map((l) => (
                <tr key={l.id}>
                  <td>{l.seq}</td>
                  <td lang="fr">{l.theme}</td>
                  <td><span className={`badge ${l.status === "approved" ? "badge-good" : "badge-accent"}`}>{l.status === "approved" ? "published" : "hidden"}</span></td>
                  <td><button className="btn btn-secondary" onClick={() => setOpenId(l.id)}>Edit</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

function LessonEditor({ id, onClose }: { id: string; onClose: () => void }) {
  const [lesson, setLesson] = useState<(LessonSummary & { content: unknown }) | null>(null);
  const [json, setJson] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    api<LessonSummary & { content: unknown }>(`/admin/lessons/${id}`)
      .then((l) => {
        setLesson(l);
        setJson(JSON.stringify(l.content, null, 2));
      })
      .catch((e) => setError(errorMessage(e)));
  }, [id]);

  async function save(status?: "approved" | "draft") {
    setBusy(true);
    setError("");
    setMessage("");
    try {
      let content: unknown;
      try {
        content = JSON.parse(json);
      } catch {
        throw new Error("The lesson JSON isn't valid JSON.");
      }
      const saved = await api<LessonSummary & { content: unknown }>(`/admin/lessons/${id}`, {
        method: "PUT",
        body: { content, ...(status ? { status } : {}) },
      });
      setLesson(saved);
      setMessage(status === "approved" ? "Saved and published." : status === "draft" ? "Hidden from learners." : "Saved.");
    } catch (e) {
      const issues = (e as { body?: { issues?: string[] } }).body?.issues;
      setError(issues?.length ? `${errorMessage(e)}: ${issues.join("; ")}` : errorMessage(e));
    } finally {
      setBusy(false);
    }
  }

  if (!lesson) return error ? <Alert kind="error">{error}</Alert> : <Spinner />;

  return (
    <section className="card stack">
      <div className="row spread">
        <div>
          <p className="eyebrow">{lesson.level} · Lesson {lesson.seq} · {lesson.status === "approved" ? "published" : "hidden"}</p>
          <h2 lang="fr" style={{ margin: 0 }}>{lesson.theme}</h2>
        </div>
        <button className="btn btn-ghost" onClick={onClose}>← Back to the course</button>
      </div>
      <Alert kind="success">{message}</Alert>
      <Alert kind="error">{error}</Alert>
      <label htmlFor="lesson-json">Lesson content (JSON — checked before saving)</label>
      <textarea id="lesson-json" className="code" value={json} onChange={(e) => setJson(e.target.value)} spellCheck={false} />
      <div className="row">
        <button className="btn" disabled={busy} onClick={() => save(lesson.status === "approved" ? undefined : "approved")}>
          {lesson.status === "approved" ? "Save changes" : "Save & publish"}
        </button>
        {lesson.status === "approved" && (
          <button className="btn btn-secondary" disabled={busy} onClick={() => save("draft")}>Hide from learners</button>
        )}
      </div>
    </section>
  );
}

function MetricsPanel() {
  const [m, setM] = useState<Metrics | null>(null);
  const [error, setError] = useState("");
  useEffect(() => {
    api<Metrics>("/admin/metrics").then(setM).catch((e) => setError(errorMessage(e)));
  }, []);
  if (error) return <Alert kind="error">{error}</Alert>;
  if (!m) return <Spinner />;

  const e = m.email_last_30d;
  const rate = (n: number) => (e.sent ? `${((n / e.sent) * 100).toFixed(1)}%` : "—");
  const overrides = m.quiz_overrides.quiz + m.quiz_overrides.self;

  return (
    <div className="stack">
      <div className="grid grid-3">
        <Tile label="Users" value={m.users_total} />
        <Tile label="Active users (7 days)" value={m.active_users_7d} />
        <Tile label="Lessons completed (7 days)" value={m.lessons_completed_7d} />
        <Tile label="Kept quiz level" value={overrides ? `${Math.round((m.quiz_overrides.quiz / overrides) * 100)}%` : "—"} />
      </div>

      <section className="card">
        <h2>Users by level</h2>
        <BarChart
          title="Users by level"
          rows={[...LEVELS, "unset"].map((l) => ({ label: l === "unset" ? "Not set" : l, value: m.users_by_level[l] ?? 0 }))}
        />
      </section>

      <section className="card">
        <h2>Emails (last 30 days)</h2>
        <div className="table-wrap">
          <table className="data">
            <thead><tr><th>Sent</th><th>Opened</th><th>Clicked</th><th>Bounced</th><th>Complaints</th><th>Failed</th></tr></thead>
            <tbody>
              <tr>
                <td>{e.sent}</td>
                <td>{e.opened} <span className="muted">({rate(e.opened)})</span></td>
                <td>{e.clicked} <span className="muted">({rate(e.clicked)})</span></td>
                <td>{e.bounced} <span className="muted">({rate(e.bounced)})</span></td>
                <td>{e.complained} <span className="muted">({rate(e.complained)})</span></td>
                <td>{e.failed}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

function Tile({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="card">
      <p className="eyebrow">{label}</p>
      <div className="stat">{value}</div>
    </div>
  );
}
