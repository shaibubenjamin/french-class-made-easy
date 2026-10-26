import { useMemo, useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Alert, HOURS, hourLabel } from "../components/ui.tsx";
import { api, errorMessage } from "../lib/api.ts";
import { useSession } from "../lib/session.tsx";
import { track } from "../lib/analytics.ts";

const GOALS = [
  "Travel and everyday conversations",
  "Work or relocation (e.g. Canada, France)",
  "Exams or studies",
  "Break through my plateau",
  "Polish advanced French",
];

export function timezones(current: string): string[] {
  const all = (Intl as unknown as { supportedValuesOf?: (k: string) => string[] }).supportedValuesOf?.("timeZone") ?? [];
  return all.includes(current) ? all : [current, ...all];
}

export default function Onboarding() {
  const { me, refresh } = useSession();
  const navigate = useNavigate();
  const detected = Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC";
  const [name, setName] = useState(me?.profile.name ?? "");
  const [timezone, setTimezone] = useState(me && me.profile.timezone !== "UTC" ? me.profile.timezone : detected);
  const [goal, setGoal] = useState(me?.profile.goal ?? GOALS[0]);
  const [minutes, setMinutes] = useState<5 | 10 | 20>(me?.profile.daily_minutes ?? 10);
  const [morningHour, setMorningHour] = useState(me?.preferences.morning_hour ?? 8);
  const [consent, setConsent] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const zones = useMemo(() => timezones(timezone), [timezone]);

  async function submit(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      await api("/me", {
        method: "PUT",
        body: {
          name: name.trim(),
          timezone,
          goal,
          daily_minutes: minutes,
          onboarded: true,
          email_consent: consent,
          email_hours: { morning: morningHour },
        },
      });
      track("signup", { daily_minutes: minutes, email_consent: consent });
      await refresh();
      navigate("/start");
    } catch (err) {
      setError(errorMessage(err));
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="container narrow">
      <h1>Bienvenue !</h1>
      <p className="muted">A few details so Parlons fits your day. You can change all of this later.</p>
      <form className="card" onSubmit={submit}>
        <Alert kind="error">{error}</Alert>
        <div className="field">
          <label htmlFor="name">What should we call you?</label>
          <input id="name" type="text" required maxLength={60} value={name} onChange={(e) => setName(e.target.value)} autoComplete="given-name" />
        </div>
        <div className="field">
          <label htmlFor="tz">Your timezone</label>
          <select id="tz" value={timezone} onChange={(e) => setTimezone(e.target.value)}>
            {zones.map((z) => (
              <option key={z} value={z}>{z}</option>
            ))}
          </select>
          <p className="hint">Detected automatically: {detected}</p>
        </div>
        <div className="field">
          <label htmlFor="goal">Your main goal</label>
          <select id="goal" value={goal} onChange={(e) => setGoal(e.target.value)}>
            {GOALS.map((g) => (
              <option key={g}>{g}</option>
            ))}
          </select>
        </div>
        <fieldset className="field" style={{ border: 0, padding: 0, margin: "0 0 18px" }}>
          <legend style={{ fontWeight: 600, fontSize: "0.9rem", marginBottom: 6 }}>Daily target</legend>
          <div className="segmented">
            {([5, 10, 20] as const).map((m) => (
              <button
                type="button"
                key={m}
                className={`btn btn-secondary ${minutes === m ? "selected" : ""}`}
                aria-pressed={minutes === m}
                onClick={() => setMinutes(m)}
              >
                {m} min
              </button>
            ))}
          </div>
        </fieldset>
        <div className="field">
          <label className="checkbox">
            <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} />
            <span>
              Send me a short morning micro-lesson and a weekly progress summary by email. Unsubscribe in one click at any time.
            </span>
          </label>
        </div>
        {consent && (
          <div className="field">
            <label htmlFor="morning">Morning email time</label>
            <select id="morning" value={morningHour} onChange={(e) => setMorningHour(Number(e.target.value))}>
              {HOURS.map((h) => (
                <option key={h} value={h}>{hourLabel(h)}</option>
              ))}
            </select>
            <p className="hint">Afternoon and evening reminders can be switched on in Settings.</p>
          </div>
        )}
        <button className="btn btn-block" disabled={saving || !name.trim()}>
          {saving ? "Saving…" : "Continue"}
        </button>
      </form>
    </div>
  );
}
