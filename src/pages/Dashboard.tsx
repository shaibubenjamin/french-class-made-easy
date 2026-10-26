import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Alert, BarChart, ProgressBar, Spinner } from "../components/ui.tsx";
import { api, errorMessage } from "../lib/api.ts";
import { useSession } from "../lib/session.tsx";
import type { Dashboard as DashboardData } from "../lib/types.ts";
import { LEVEL_INFO } from "../../shared/levels.ts";

const SKILL_LABEL: Record<string, string> = {
  vocabulary: "Vocabulary",
  grammar: "Grammar",
  reading: "Reading",
  writing: "Writing",
};

export default function Dashboard() {
  const { me } = useSession();
  const [data, setData] = useState<DashboardData | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    api<DashboardData>("/dashboard").then(setData).catch((e) => setError(errorMessage(e)));
  }, []);

  if (error) return <div className="container"><Alert kind="error">{error}</Alert></div>;
  if (!data) return <Spinner />;

  const t = data.today;
  return (
    <div className="container stack">
      <div className="row spread">
        <div>
          <p className="eyebrow">Level {data.level} · {LEVEL_INFO[data.level].name}</p>
          <h1 style={{ marginBottom: 0 }}>Bonjour{me?.profile.name ? `, ${me.profile.name}` : ""} !</h1>
        </div>
        <Link to="/pick-level" className="btn btn-ghost small">Change level</Link>
      </div>

      <section className="card" aria-labelledby="today-h">
        <p className="eyebrow">{t ? `Lesson ${t.position} of ${t.total}${t.all_done ? " · review" : ""}` : "Your course"}</p>
        {t ? (
          <div className="row spread">
            <div>
              <h2 id="today-h" lang="fr" style={{ marginBottom: 4 }}>{t.theme}</h2>
              <p className="muted" style={{ margin: 0 }}>Grammar: <span lang="fr">{t.grammar_topic}</span></p>
              <div style={{ marginTop: 10, maxWidth: 320 }}>
                <ProgressBar value={t.completed_in_level} max={t.total} label={`${t.completed_in_level} of ${t.total} lessons completed in ${data.level}`} />
                <p className="small muted" style={{ margin: "6px 0 0" }}>
                  {t.all_done ? `You've completed all of ${data.level} — reviewing earlier lessons.` : `${t.completed_in_level} of ${t.total} lessons done in ${data.level}`}
                </p>
              </div>
            </div>
            {t.completed ? (
              <div className="row">
                <span className="badge badge-good">Completed · {t.score ?? 0}%</span>
                <Link className="btn btn-secondary" to={`/lesson/${t.id}`}>Open again</Link>
              </div>
            ) : (
              <Link className="btn" to="/lesson/today">{t.started ? "Continue" : "Start lesson"}</Link>
            )}
          </div>
        ) : (
          <p id="today-h" className="muted" style={{ margin: 0 }}>
            No lessons are available for {data.level} yet.
          </p>
        )}
      </section>

      <section className="grid grid-3" aria-label="Your stats">
        <div className="card">
          <p className="eyebrow">Day streak</p>
          <div className="stat">{data.streak.current}</div>
          <p className="small muted" style={{ margin: "8px 0 0" }}>
            {data.streak.practised_today ? "You've practised today. Bravo !" : "Practise today to keep it going."}
          </p>
        </div>
        <div className="card">
          <p className="eyebrow">Lessons completed</p>
          <div className="stat">{data.lessons_completed}</div>
          <p className="small muted" style={{ margin: "8px 0 0" }}>Longest streak: {data.streak.longest} days</p>
        </div>
        <div className="card">
          <p className="eyebrow">Streak freeze</p>
          <div className="stat">{data.streak.freezes_left}</div>
          <p className="small muted" style={{ margin: "8px 0 0" }}>Covers one missed day per week, automatically.</p>
        </div>
      </section>

      <section className="card" aria-labelledby="skills-h">
        <h2 id="skills-h">Accuracy by skill</h2>
        {data.skills.every((s) => s.attempts === 0) ? (
          <p className="muted">Finish a few exercises and your skill breakdown will appear here.</p>
        ) : (
          <BarChart
            title="Accuracy by skill (percent correct)"
            max={100}
            format={(v) => `${v}%`}
            rows={data.skills.map((s) => ({
              label: SKILL_LABEL[s.skill] ?? s.skill,
              value: s.accuracy,
              detail: `${s.attempts} answers`,
            }))}
          />
        )}
      </section>
    </div>
  );
}
