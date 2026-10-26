import type { ReactNode } from "react";

export function Spinner({ label = "Loading…" }: { label?: string }) {
  return (
    <div role="status" aria-live="polite">
      <div className="spinner" />
      <span className="sr-only">{label}</span>
    </div>
  );
}

export function Alert({ kind = "info", children }: { kind?: "info" | "error" | "success" | "warn"; children: ReactNode }) {
  if (!children) return null;
  return (
    <div className={`alert alert-${kind}`} role={kind === "error" ? "alert" : "status"}>
      {children}
    </div>
  );
}

export function ProgressBar({ value, max, label }: { value: number; max: number; label: string }) {
  const pct = Math.min(100, Math.round((value / max) * 100));
  return (
    <div className="progress" role="progressbar" aria-label={label} aria-valuenow={value} aria-valuemin={0} aria-valuemax={max}>
      <div style={{ width: `${pct}%` }} />
    </div>
  );
}

/**
 * Horizontal single-series bar chart: one hue, value labels in text ink, a
 * native tooltip per bar, and a visually hidden table for screen readers.
 */
export function BarChart({
  title,
  rows,
  max,
  format = (v) => String(v),
}: {
  title: string;
  rows: { label: string; value: number | null; detail?: string }[];
  max?: number;
  format?: (v: number) => string;
}) {
  const top = max ?? Math.max(1, ...rows.map((r) => r.value ?? 0));
  return (
    <figure style={{ margin: 0 }}>
      <figcaption className="sr-only">{title}</figcaption>
      <div className="bars" aria-hidden="true">
        {rows.map((r) => (
          <div className="bar-row" key={r.label} title={`${r.label}: ${r.value === null ? "no data yet" : format(r.value)}${r.detail ? ` (${r.detail})` : ""}`}>
            <span>{r.label}</span>
            <div className="bar-track">
              {r.value !== null && <div className="bar-fill" style={{ width: `${(r.value / top) * 100}%` }} />}
            </div>
            <span className="value">{r.value === null ? "—" : format(r.value)}</span>
          </div>
        ))}
      </div>
      <table className="sr-only">
        <caption>{title}</caption>
        <tbody>
          {rows.map((r) => (
            <tr key={r.label}>
              <th scope="row">{r.label}</th>
              <td>{r.value === null ? "no data" : format(r.value)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </figure>
  );
}

export function hourLabel(h: number) {
  return `${String(h).padStart(2, "0")}:00`;
}

export const HOURS = Array.from({ length: 24 }, (_, h) => h);
