import { useState } from "react";
import { Link } from "react-router-dom";
import { youtubeLinks } from "../components/audio.tsx";
import { Alert, BarChart, ProgressBar, Spinner } from "../components/ui.tsx";
import { PracticeCalendar } from "../components/Calendar.tsx";
import { api, errorMessage, useApi } from "../lib/api.ts";
import { useSession } from "../lib/session.tsx";
import { track } from "../lib/analytics.ts";
import type { Dashboard as DashboardData } from "../lib/types.ts";
import { LEVEL_INFO } from "../../shared/levels.ts";
import { PASS_MARK } from "../../shared/progression.ts";

const SKILL_LABEL: Record<string, string> = {
  vocabulary: "Vocabulary",
  grammar: "Grammar",
  reading: "Reading",
  listening: "Listening",
  speaking: "Speaking",
  writing: "Writing",
};

function StreakBanner({ streak }: { streak: DashboardData["streak"] }) {
  const { current, risk, practised_today } = streak;
  if (practised_today) {
    return <div className="streak-banner safe">✅ You've practised today — your streak is safe. À demain !</div>;
  }
  if (risk === "last-chance") {
    return (
      <div className="streak-banner danger" role="alert">
        ⚠️ You've missed {streak.missed_days} days in a row. <strong>Practise today to keep your {current}-day streak</strong> — tomorrow it resets to 0.
      </div>
    );
  }
  if (risk === "practise-today" && current > 0) {
    return (
      <div className="streak-banner warn">
        ⏰ <strong>Practise today to keep your {current}-day streak.</strong>{" "}
        {streak.missed_days > 0 ? `You missed ${streak.missed_days} day — miss 3 in a row and it starts again from 0.` : "One lesson is enough."}
      </div>
    );
  }
  if (risk === "lost") {
    return <div className="streak-banner warn">Your streak ended after 3 days without practice. Start a new one today — 🔥 day 1 is one lesson away!</div>;
  }
  return null;
}

export default function Dashboard() {
  const { me, refresh } = useSession();
  const { data, error, reload } = useApi<DashboardData>("/dashboard");
  const [advancing, setAdvancing] = useState(false);
  const [advanceError, setAdvanceError] = useState("");

  if (error) return <div className="container"><Alert kind="error">{error}</Alert></div>;
  if (!data) return <Spinner />;

  const t = data.today;
  const ls = data.level_status;

  async function advance() {
    setAdvancing(true);
    setAdvanceError("");
    try {
      const r = await api<{ level: string }>("/level/advance", { body: {} });
      track("level_overridden", { from: data!.level, to: r.level, source: "progress" });
      await refresh();
      reload();
    } catch (e) {
      setAdvanceError(errorMessage(e));
    } finally {
      setAdvancing(false);
    }
  }

  return (
    <div className="container stack">
      <div>
        <h1 style={{ marginBottom: 4 }}>
          Welcome{me?.profile.name ? `, ${me.profile.name}` : ""} !
        </h1>
        <p className="welcome-streak" style={{ margin: "0 0 12px" }}>
          {data.streak.current > 0 ? (
            <>
              You have a <strong className="fire">🔥 {data.streak.current}-day streak</strong>
              {data.streak.longest > data.streak.current ? ` · best ${data.streak.longest}` : ""}
            </>
          ) : (
            <>Start your streak today 🔥 — {me?.profile.daily_minutes ?? 10} minutes is all it takes.</>
          )}
        </p>
        <StreakBanner streak={data.streak} />
      </div>

      {/* The one thing to do next */}
      <section className="card hero-card" aria-labelledby="next-h">
        {t ? (
          <>
            <p className="eyebrow">
              {data.level} · Lesson {t.position} of {t.total}
              {t.all_done ? " · review" : ""}
            </p>
            <h2 id="next-h" lang="fr" style={{ marginBottom: 4 }}>{t.theme}</h2>
            <p className="muted" style={{ marginTop: 0 }}>
              Grammar: <span lang="fr">{t.grammar_topic}</span>
            </p>
            <Link className="btn btn-big" to="/lesson/today">
              {t.started ? "▶ Continue lesson" : "▶ Start lesson"}
            </Link>
            <p className="small muted" style={{ marginTop: 10, marginBottom: 0 }}>
              About {me?.profile.daily_minutes ?? 10}–20 minutes · 📖 words · 🧩 grammar · 🎧 listening · ✏️ practice · 🎙️ speaking · 📝 writing
            </p>
          </>
        ) : (
          <p id="next-h" className="muted" style={{ margin: 0 }}>No lessons are available for {data.level} yet.</p>
        )}
      </section>

      {/* Level progress and the 80% gate */}
      <section className="card" aria-labelledby="level-h">
        <div className="row spread">
          <h2 id="level-h" style={{ margin: 0 }}>
            Level {data.level} <span className="muted" style={{ fontWeight: 400, fontSize: "1rem" }}>· {LEVEL_INFO[data.level].name}</span>
          </h2>
          <span className={`badge ${ls.average !== null && ls.average >= PASS_MARK ? "badge-good" : "badge-accent"}`}>
            Average {ls.average === null ? "—" : `${ls.average}%`} · goal {PASS_MARK}%
          </span>
        </div>
        <div style={{ margin: "12px 0 6px" }}>
          <ProgressBar value={ls.completed} max={Math.max(ls.total, 1)} label={`${ls.completed} of ${ls.total} lessons completed`} />
        </div>
        <p className="small muted" style={{ marginTop: 0 }}>
          {ls.completed} of {ls.total} lessons completed.{" "}
          {ls.next_level && `Finish them all with an average of ${PASS_MARK}% or more to unlock ${ls.next_level}.`}
        </p>

        {ls.passed && ls.next_level && (
          <div className="level-up">
            <p style={{ margin: 0 }}>
              <strong>🎉 Félicitations ! You passed {data.level}.</strong> You're ready for {ls.next_level} — {LEVEL_INFO[ls.next_level].name}.
            </p>
            <button className="btn" onClick={advance} disabled={advancing}>
              {advancing ? "Moving up…" : `Move up to ${ls.next_level} →`}
            </button>
          </div>
        )}
        {ls.passed && !ls.next_level && <Alert kind="success">🏆 You've completed the highest level. Magnifique !</Alert>}
        {ls.allDone && !ls.passed && (
          <Alert kind="warn">
            You've finished every lesson, but your average is {ls.average}%. Improve these lessons to reach {PASS_MARK}%:{" "}
            {ls.toImprove.slice(0, 4).map((l, i) => (
              <span key={l.seq}>
                {i > 0 && ", "}
                Lesson {l.seq} ({l.score}%)
              </span>
            ))}
            . <Link to="/lessons">Open your lessons</Link>
          </Alert>
        )}
        {!ls.allDone && ls.toImprove.length > 0 && (
          <p className="small" style={{ margin: 0 }}>
            Below {PASS_MARK}% so far: {ls.toImprove.slice(0, 3).map((l) => `Lesson ${l.seq} (${l.score}%)`).join(", ")} —{" "}
            <Link to="/lessons">retry them</Link> any time.
          </p>
        )}
        <Alert kind="error">{advanceError}</Alert>
      </section>

      <section className="grid grid-3" aria-label="Your stats">
        <div className="card stat-card">
          <span className="stat-icon" aria-hidden="true">🔥</span>
          <div>
            <div className="stat">{data.streak.current}</div>
            <p className="small muted" style={{ margin: 0 }}>day streak · best {data.streak.longest}</p>
          </div>
        </div>
        <div className="card stat-card">
          <span className="stat-icon" aria-hidden="true">✅</span>
          <div>
            <div className="stat">{data.lessons_completed}</div>
            <p className="small muted" style={{ margin: 0 }}>lessons completed</p>
          </div>
        </div>
        <div className="card stat-card">
          <span className="stat-icon" aria-hidden="true">📅</span>
          <div>
            <div className="stat">{data.practice_days.length}</div>
            <p className="small muted" style={{ margin: 0 }}>days practised (last 6 months)</p>
          </div>
        </div>
      </section>

      <section className="card" aria-labelledby="cal-h">
        <h2 id="cal-h">Practice calendar</h2>
        <PracticeCalendar days={data.practice_days} today={data.today_date} />
        <p className="small muted" style={{ marginBottom: 0 }}>
          Streak rule: practise every day. Missing 1–2 days keeps your streak; missing 3 days in a row resets it to 0.
        </p>
      </section>

      <section aria-label="Quick actions" className="grid grid-2">
        <Link to="/review" className="card action-card">
          <span aria-hidden="true">🔁</span>
          <div><strong>Review my mistakes</strong><p className="small muted">A quick look at what to fix.</p></div>
        </Link>
        <Link to="/lessons" className="card action-card">
          <span aria-hidden="true">📚</span>
          <div><strong>All {data.level} lessons</strong><p className="small muted">Open or redo any lesson.</p></div>
        </Link>
        <a href={youtubeLinks(data.level, t?.grammar_topic ?? "", t?.theme ?? "français")[2].href} target="_blank" rel="noopener noreferrer" className="card action-card">
          <span aria-hidden="true">🎧</span>
          <div><strong>Extra listening ↗</strong><p className="small muted">French videos for your level on YouTube.</p></div>
        </a>
        <Link to="/settings" className="card action-card">
          <span aria-hidden="true">⚙️</span>
          <div><strong>Settings</strong><p className="small muted">Name, timezone, reminders, your data.</p></div>
        </Link>
      </section>

      <section className="card" aria-labelledby="skills-h">
        <h2 id="skills-h">Your skills</h2>
        {data.skills.every((s) => s.attempts === 0) ? (
          <p className="muted">Finish a lesson and your skill breakdown will appear here.</p>
        ) : (
          <BarChart
            title="Accuracy by skill (percent correct)"
            max={100}
            format={(v) => `${v}%`}
            rows={data.skills.map((s) => ({ label: SKILL_LABEL[s.skill] ?? s.skill, value: s.accuracy, detail: `${s.attempts} answers` }))}
          />
        )}
      </section>
    </div>
  );
}
