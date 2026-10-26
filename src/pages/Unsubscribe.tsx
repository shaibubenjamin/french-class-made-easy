import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Alert } from "../components/ui.tsx";
import { api, errorMessage } from "../lib/api.ts";
import { track } from "../lib/analytics.ts";

/** Landing page for the unsubscribe link in every email footer (FR-22). */
export default function Unsubscribe() {
  const [params] = useSearchParams();
  const [state, setState] = useState<"idle" | "busy" | "done">("idle");
  const [error, setError] = useState("");
  const u = params.get("u");
  const t = params.get("t");

  async function confirm() {
    setState("busy");
    try {
      await api("/email/unsubscribe", { body: { u, t } });
      track("unsubscribed", { source: "email_link" });
      setState("done");
    } catch (err) {
      setError(errorMessage(err));
      setState("idle");
    }
  }

  return (
    <div className="container narrow">
      <div className="card">
        {state === "done" ? (
          <>
            <h1>You're unsubscribed</h1>
            <p>You won't receive any more Parlons emails. You can turn them back on at any time in Settings.</p>
            <Link to="/settings" className="btn btn-secondary">Email preferences</Link>
          </>
        ) : (
          <>
            <h1>Unsubscribe from Parlons emails?</h1>
            <p className="muted">This stops all reminder and summary emails. Your account and progress stay as they are.</p>
            <Alert kind="error">{error}</Alert>
            {!u || !t ? (
              <Alert kind="error">This link is incomplete. Use the link from your email, or change preferences in Settings.</Alert>
            ) : (
              <div className="row">
                <button className="btn" onClick={confirm} disabled={state === "busy"}>
                  {state === "busy" ? "Unsubscribing…" : "Unsubscribe"}
                </button>
                <Link to="/settings" className="btn btn-secondary">Choose which emails instead</Link>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
