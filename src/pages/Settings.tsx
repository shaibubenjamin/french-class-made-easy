import { useMemo, useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Alert, HOURS, hourLabel } from "../components/ui.tsx";
import { api, download, errorMessage } from "../lib/api.ts";
import { useSession } from "../lib/session.tsx";
import { track } from "../lib/analytics.ts";
import type { EmailPreferences } from "../lib/types.ts";
import { timezones } from "./Onboarding.tsx";

export default function Settings() {
  const { me, refresh, signOut } = useSession();
  const navigate = useNavigate();
  if (!me) return null;
  return (
    <div className="container narrow stack">
      <h1>Settings</h1>
      <ProfileForm key={`p-${me.profile.id}`} onSaved={refresh} />
      <EmailForm key={`e-${me.profile.id}`} initial={me.preferences} optedIn={Boolean(me.profile.email_opt_in_at)} onSaved={refresh} />
      <DataSection
        onDeleted={async () => {
          await signOut();
          navigate("/");
        }}
      />
    </div>
  );
}

function ProfileForm({ onSaved }: { onSaved: () => Promise<unknown> }) {
  const { me } = useSession();
  const p = me!.profile;
  const [name, setName] = useState(p.name ?? "");
  const [timezone, setTimezone] = useState(p.timezone);
  const [goal, setGoal] = useState(p.goal ?? "");
  const [minutes, setMinutes] = useState(p.daily_minutes);
  const [status, setStatus] = useState<{ kind: "success" | "error"; text: string } | null>(null);
  const zones = useMemo(() => timezones(timezone), [timezone]);

  async function save(e: FormEvent) {
    e.preventDefault();
    try {
      await api("/me", { method: "PUT", body: { name: name.trim(), timezone, goal, daily_minutes: minutes } });
      await onSaved();
      setStatus({ kind: "success", text: "Profile saved." });
    } catch (err) {
      setStatus({ kind: "error", text: errorMessage(err) });
    }
  }

  return (
    <form className="card" onSubmit={save} aria-labelledby="profile-h">
      <h2 id="profile-h">Profile</h2>
      {status && <Alert kind={status.kind}>{status.text}</Alert>}
      <div className="field">
        <label htmlFor="s-name">Name</label>
        <input id="s-name" type="text" value={name} maxLength={60} onChange={(e) => setName(e.target.value)} />
      </div>
      <div className="field">
        <label htmlFor="s-tz">Timezone</label>
        <select id="s-tz" value={timezone} onChange={(e) => setTimezone(e.target.value)}>
          {zones.map((z) => <option key={z}>{z}</option>)}
        </select>
      </div>
      <div className="field">
        <label htmlFor="s-goal">Goal</label>
        <input id="s-goal" type="text" value={goal} maxLength={200} onChange={(e) => setGoal(e.target.value)} />
      </div>
      <div className="field">
        <label htmlFor="s-min">Daily target</label>
        <select id="s-min" value={minutes} onChange={(e) => setMinutes(Number(e.target.value) as 5 | 10 | 20)}>
          <option value={5}>5 minutes</option>
          <option value={10}>10 minutes</option>
          <option value={20}>20 minutes</option>
        </select>
      </div>
      <p className="small muted">
        Level: <strong>{me!.profile.current_level ?? "not set"}</strong> ({me!.profile.level_source === "quiz" ? "from the quiz" : "chosen by you"}) ·{" "}
        <Link to="/pick-level">Change level</Link> · <Link to="/placement">Retake the quiz</Link>
      </p>
      <button className="btn">Save profile</button>
    </form>
  );
}

const EMAILS: { key: "morning" | "afternoon" | "evening"; label: string; hint: string }[] = [
  { key: "morning", label: "Morning micro-lesson", hint: "Word of the day, a mini question and a link to today's lesson." },
  { key: "afternoon", label: "Afternoon nudge", hint: "Only sent if you haven't practised yet that day." },
  { key: "evening", label: "Evening review", hint: "Three questions from today's mistakes, or a vocabulary review." },
];

function EmailForm({ initial, optedIn, onSaved }: { initial: EmailPreferences; optedIn: boolean; onSaved: () => Promise<unknown> }) {
  const [prefs, setPrefs] = useState(initial);
  const [consent, setConsent] = useState(optedIn);
  const [status, setStatus] = useState<{ kind: "success" | "error"; text: string } | null>(null);

  async function save(e: FormEvent) {
    e.preventDefault();
    try {
      const { morning, morning_hour, afternoon, afternoon_hour, evening, evening_hour, weekly } = prefs;
      await api("/preferences/email", {
        method: "PUT",
        body: { morning, morning_hour, afternoon, afternoon_hour, evening, evening_hour, weekly, unsubscribed_all: !consent },
      });
      if (consent !== optedIn) await api("/me", { method: "PUT", body: { email_consent: consent } });
      track(consent ? "pref_changed" : "unsubscribed", { morning, afternoon, evening, weekly });
      await onSaved();
      setStatus({ kind: "success", text: "Email preferences saved." });
    } catch (err) {
      setStatus({ kind: "error", text: errorMessage(err) });
    }
  }

  return (
    <form className="card" onSubmit={save} aria-labelledby="email-h">
      <h2 id="email-h">Emails</h2>
      <p className="small muted">Times are in your timezone. You'll never get more than three emails a day.</p>
      {status && <Alert kind={status.kind}>{status.text}</Alert>}
      {initial.suppressed_reason && (
        <Alert kind="warn">
          Emails are paused because a message to your address {initial.suppressed_reason === "bounced" ? "bounced" : "was marked as spam"}. Contact support to re-enable them.
        </Alert>
      )}
      <div className="field">
        <label className="checkbox">
          <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} />
          <span>Send me Parlons emails</span>
        </label>
      </div>
      <fieldset disabled={!consent} style={{ border: 0, padding: 0, margin: 0 }}>
        {EMAILS.map(({ key, label, hint }) => {
          const hourKey = `${key}_hour` as const;
          return (
            <div className="field row spread" key={key} style={{ alignItems: "flex-start" }}>
              <label className="checkbox" style={{ flex: 1, minWidth: 220 }}>
                <input type="checkbox" checked={prefs[key]} onChange={(e) => setPrefs({ ...prefs, [key]: e.target.checked })} />
                <span>
                  {label}
                  <span className="hint" style={{ display: "block", fontWeight: 400 }}>{hint}</span>
                </span>
              </label>
              <select
                aria-label={`${label} time`}
                style={{ width: 110 }}
                value={prefs[hourKey]}
                disabled={!prefs[key]}
                onChange={(e) => setPrefs({ ...prefs, [hourKey]: Number(e.target.value) })}
              >
                {HOURS.map((h) => <option key={h} value={h}>{hourLabel(h)}</option>)}
              </select>
            </div>
          );
        })}
        <div className="field">
          <label className="checkbox">
            <input type="checkbox" checked={prefs.weekly} onChange={(e) => setPrefs({ ...prefs, weekly: e.target.checked })} />
            <span>
              Weekly summary
              <span className="hint" style={{ display: "block", fontWeight: 400 }}>Sundays at 17:00 — streak, lessons completed and words learned.</span>
            </span>
          </label>
        </div>
      </fieldset>
      <button className="btn">Save email preferences</button>
    </form>
  );
}

function DataSection({ onDeleted }: { onDeleted: () => Promise<void> }) {
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function remove(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    try {
      await api("/account/delete", { body: { confirm } });
      await onDeleted();
    } catch (err) {
      setError(errorMessage(err));
      setBusy(false);
    }
  }

  return (
    <section className="card" aria-labelledby="data-h">
      <h2 id="data-h">Your data</h2>
      <p className="muted">Download everything we store about you, or delete your account permanently.</p>
      <button className="btn btn-secondary" onClick={() => download("/account/export", "parlons-export.json").catch((e) => setError(errorMessage(e)))}>
        Export my data (JSON)
      </button>
      <form onSubmit={remove} style={{ marginTop: 24 }}>
        <Alert kind="error">{error}</Alert>
        <label htmlFor="confirm-del">Type DELETE to permanently delete your account</label>
        <div className="row">
          <input id="confirm-del" type="text" value={confirm} onChange={(e) => setConfirm(e.target.value)} style={{ maxWidth: 200 }} autoComplete="off" />
          <button className="btn btn-danger" disabled={confirm !== "DELETE" || busy}>{busy ? "Deleting…" : "Delete account"}</button>
        </div>
        <p className="hint">This removes your profile, progress and history immediately. You'll get a confirmation email.</p>
      </form>
    </section>
  );
}
