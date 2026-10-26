import { useCallback, useEffect, useState } from "react";
import { Alert, BarChart, Spinner } from "../components/ui.tsx";
import { api, errorMessage } from "../lib/api.ts";
import { LEVELS } from "../../shared/levels.ts";

interface LessonSummary {
  id: string;
  level: string;
  date: string;
  theme: string;
  status: "draft" | "approved";
  updated_at: string;
}

interface Metrics {
  users_total: number;
  users_by_level: Record<string, number>;
  email_last_30d: Record<"sent" | "opened" | "clicked" | "bounced" | "complained" | "failed", number>;
  ai_cost_by_day: { day: string; cost_usd: number; calls: number }[];
  review_queue: number;
  lessons_completed_7d: number;
  active_users_7d: number;
  quiz_overrides: { quiz: number; self: number };
}

export default function Admin() {
  const [tab, setTab] = useState<"queue" | "metrics">("queue");
  return (
    <div className="container stack">
      <h1>Admin</h1>
      <div className="segmented" role="tablist" style={{ maxWidth: 360 }}>
        <button role="tab" aria-selected={tab === "queue"} className={`btn btn-secondary ${tab === "queue" ? "selected" : ""}`} onClick={() => setTab("queue")}>
          Review queue
        </button>
        <button role="tab" aria-selected={tab === "metrics"} className={`btn btn-secondary ${tab === "metrics" ? "selected" : ""}`} onClick={() => setTab("metrics")}>
          Metrics
        </button>
      </div>
      {tab === "queue" ? <ReviewQueue /> : <MetricsPanel />}
    </div>
  );
}

function ReviewQueue() {
  const [filter, setFilter] = useState<"draft" | "all">("draft");
  const [lessons, setLessons] = useState<LessonSummary[] | null>(null);
  const [openId, setOpenId] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const load = useCallback(() => {
    setLessons(null);
    api<{ lessons: LessonSummary[] }>(`/admin/lessons${filter === "draft" ? "?status=draft" : ""}`)
      .then((r) => setLessons(r.lessons))
      .catch((e) => setError(errorMessage(e)));
  }, [filter]);

  useEffect(load, [load]);

  async function generateNow() {
    setError("");
    try {
      await api("/admin/generate", { body: {} });
      setMessage("Generation started for today and tomorrow. Missing lessons appear here in a minute or two.");
    } catch (e) {
      setError(errorMessage(e));
    }
  }

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
      <div className="row spread">
        <div className="row">
          <label htmlFor="q-filter" className="sr-only">Show</label>
          <select id="q-filter" value={filter} onChange={(e) => setFilter(e.target.value as "draft" | "all")} style={{ width: 200 }}>
            <option value="draft">Drafts awaiting review</option>
            <option value="all">All recent lessons</option>
          </select>
          <button className="btn btn-ghost" onClick={load}>Refresh</button>
        </div>
        <button className="btn btn-secondary" onClick={generateNow}>Generate missing lessons</button>
      </div>
      <p className="small muted" style={{ marginTop: 12 }}>
        A1–B2 drafts are auto-approved at 06:00 UTC. C1–C2 lessons are only published after you approve them.
      </p>
      <Alert kind="success">{message}</Alert>
      <Alert kind="error">{error}</Alert>
      {!lessons ? (
        <Spinner />
      ) : lessons.length === 0 ? (
        <Alert>The queue is empty.</Alert>
      ) : (
        <div className="table-wrap">
          <table className="data">
            <thead>
              <tr><th>Date</th><th>Level</th><th>Theme</th><th>Status</th><th><span className="sr-only">Actions</span></th></tr>
            </thead>
            <tbody>
              {lessons.map((l) => (
                <tr key={l.id}>
                  <td>{l.date}</td>
                  <td>
                    {l.level}
                    {(l.level === "C1" || l.level === "C2") && l.status === "draft" && <span className="badge" style={{ marginLeft: 6 }}>needs you</span>}
                  </td>
                  <td lang="fr">{l.theme}</td>
                  <td><span className={`badge ${l.status === "approved" ? "badge-good" : "badge-accent"}`}>{l.status}</span></td>
                  <td><button className="btn btn-secondary" onClick={() => setOpenId(l.id)}>Review</button></td>
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
      setMessage(status === "approved" ? "Approved and published." : status === "draft" ? "Moved back to draft." : "Saved.");
    } catch (e) {
      const issues = (e as { body?: { issues?: string[] } }).body?.issues;
      setError(issues?.length ? `${errorMessage(e)}: ${issues.join("; ")}` : errorMessage(e));
    } finally {
      setBusy(false);
    }
  }

  async function regenerate() {
    if (!confirm("Replace this lesson with a newly generated one? Your edits will be lost.")) return;
    try {
      await api(`/admin/lessons/${id}/regenerate`, { body: {} });
      setMessage("Regenerating in the background. Come back to the queue in a minute.");
    } catch (e) {
      setError(errorMessage(e));
    }
  }

  if (!lesson) return error ? <Alert kind="error">{error}</Alert> : <Spinner />;

  return (
    <section className="card stack">
      <div className="row spread">
        <div>
          <p className="eyebrow">{lesson.level} · {lesson.date} · {lesson.status}</p>
          <h2 lang="fr" style={{ margin: 0 }}>{lesson.theme}</h2>
        </div>
        <button className="btn btn-ghost" onClick={onClose}>← Back to queue</button>
      </div>
      <Alert kind="success">{message}</Alert>
      <Alert kind="error">{error}</Alert>
      <label htmlFor="lesson-json">Lesson content (JSON — validated before saving)</label>
      <textarea id="lesson-json" className="code" value={json} onChange={(e) => setJson(e.target.value)} spellCheck={false} />
      <div className="row">
        <button className="btn" disabled={busy} onClick={() => save("approved")}>Save & approve</button>
        <button className="btn btn-secondary" disabled={busy} onClick={() => save()}>Save edits</button>
        {lesson.status === "approved" && (
          <button className="btn btn-secondary" disabled={busy} onClick={() => save("draft")}>Unpublish</button>
        )}
        <button className="btn btn-ghost" disabled={busy} onClick={regenerate}>Regenerate</button>
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
  const todayCost = m.ai_cost_by_day.at(-1)?.cost_usd ?? 0;

  return (
    <div className="stack">
      <div className="grid grid-3">
        <Tile label="Users" value={m.users_total} />
        <Tile label="Active users (7 days)" value={m.active_users_7d} />
        <Tile label="Lessons completed (7 days)" value={m.lessons_completed_7d} />
        <Tile label="Review queue" value={m.review_queue} />
        <Tile label="AI cost (latest day)" value={`$${Number(todayCost).toFixed(2)}`} />
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
        <h2>Email funnel (last 30 days)</h2>
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
        <p className="small muted">Targets: opens ≥ 35%, complaints &lt; 0.1%.</p>
      </section>

      <section className="card">
        <h2>AI cost per day (USD, last 14 days)</h2>
        {m.ai_cost_by_day.length === 0 ? (
          <p className="muted">No AI usage recorded yet.</p>
        ) : (
          <BarChart
            title="AI cost per day in US dollars"
            format={(v) => `$${v.toFixed(2)}`}
            rows={m.ai_cost_by_day.map((d) => ({ label: d.day.slice(5), value: Number(d.cost_usd), detail: `${d.calls} calls` }))}
          />
        )}
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
