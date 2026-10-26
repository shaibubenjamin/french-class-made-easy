import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Alert } from "../components/ui.tsx";
import { api, errorMessage, useApi } from "../lib/api.ts";
import type { Dashboard } from "../lib/types.ts";
import { nextLevel, PASS_MARK } from "../../shared/progression.ts";
import { useSession } from "../lib/session.tsx";
import { track } from "../lib/analytics.ts";
import { LEVELS, LEVEL_INFO, type Level } from "../../shared/levels.ts";

/** US-2.4 (skip the quiz) and the "Choose another level" path of US-2.3. */
export default function PickLevel() {
  const { me, refresh } = useSession();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const recommended = params.get("recommended") as Level | null;
  const [saving, setSaving] = useState<Level | null>(null);
  const [error, setError] = useState("");
  const current = me?.profile.current_level ?? null;
  // Once you have a level, higher levels unlock only by passing it (80% average).
  const { data: dash } = useApi<Dashboard>(current ? "/dashboard" : null);
  const unlockedNext = current && dash?.level_status.passed ? nextLevel(current) : null;
  const locked = (level: Level) =>
    Boolean(current) && LEVELS.indexOf(level) > LEVELS.indexOf(current!) && level !== unlockedNext;

  async function choose(level: Level) {
    setSaving(level);
    setError("");
    try {
      await api("/level", { body: { level, source: "self" } });
      if (recommended && recommended !== level) track("level_overridden", { from: recommended, to: level });
      await refresh();
      navigate("/dashboard");
    } catch (err) {
      setError(errorMessage(err));
      setSaving(null);
    }
  }

  return (
    <div className="container">
      <h1>Which of these sounds like you?</h1>
      <p className="muted">
        {current
          ? `You can go back to an easier level at any time. Higher levels unlock when you pass ${current} with ${PASS_MARK}%.`
          : "Pick the highest level where most statements are true."}
        {recommended && <> The quiz recommended <strong>{recommended}</strong>.</>}
      </p>
      <Alert kind="error">{error}</Alert>
      <div className="grid grid-2">
        {LEVELS.map((level) => (
          <button
            key={level}
            className="card level-card"
            onClick={() => choose(level)}
            disabled={saving !== null || locked(level)}
            aria-label={`Choose ${level}, ${LEVEL_INFO[level].name}`}
          >
            <div className="row spread">
              <span>
                <span className="level-tag">{level}</span> <strong>{LEVEL_INFO[level].name}</strong>
              </span>
              {me?.profile.current_level === level && <span className="badge">Current</span>}
              {recommended === level && <span className="badge badge-accent">Recommended</span>}
              {locked(level) && <span className="badge">🔒 Locked</span>}
            </div>
            <ul>
              {LEVEL_INFO[level].canDo.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
            {saving === level && <p className="small muted" style={{ marginTop: 8 }}>Saving…</p>}
            {locked(level) && (
              <p className="small muted" style={{ marginTop: 8 }}>
                Complete {current} with an average of {PASS_MARK}% to unlock the next level.
              </p>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
