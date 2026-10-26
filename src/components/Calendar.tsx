import { useMemo, useState } from "react";

const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const pad = (n: number) => String(n).padStart(2, "0");
const iso = (y: number, m: number, d: number) => `${y}-${pad(m + 1)}-${pad(d)}`;

/** Month view of practice days. `today` is the learner's local date (YYYY-MM-DD). */
export function PracticeCalendar({ days, today }: { days: string[]; today: string }) {
  const practised = useMemo(() => new Set(days), [days]);
  const [ty, tm] = today.split("-").map(Number);
  const [view, setView] = useState({ y: ty, m: tm - 1 });

  const first = new Date(Date.UTC(view.y, view.m, 1));
  const daysInMonth = new Date(Date.UTC(view.y, view.m + 1, 0)).getUTCDate();
  const leading = (first.getUTCDay() + 6) % 7; // Monday-first grid
  const monthName = first.toLocaleDateString(undefined, { month: "long", year: "numeric", timeZone: "UTC" });
  const isCurrentMonth = view.y === ty && view.m === tm - 1;
  const count = Array.from({ length: daysInMonth }, (_, i) => iso(view.y, view.m, i + 1)).filter((d) => practised.has(d)).length;

  const shift = (delta: number) =>
    setView(({ y, m }) => {
      const d = new Date(Date.UTC(y, m + delta, 1));
      return { y: d.getUTCFullYear(), m: d.getUTCMonth() };
    });

  return (
    <div className="calendar">
      <div className="row spread" style={{ marginBottom: 10 }}>
        <button type="button" className="btn btn-ghost" onClick={() => shift(-1)} aria-label="Previous month">‹</button>
        <div style={{ textAlign: "center" }}>
          <strong style={{ textTransform: "capitalize" }}>{monthName}</strong>
          <div className="small muted">
            {count} practice day{count === 1 ? "" : "s"}
          </div>
        </div>
        <button type="button" className="btn btn-ghost" onClick={() => shift(1)} disabled={isCurrentMonth} aria-label="Next month">›</button>
      </div>
      <div className="cal-grid" role="grid" aria-label={`Practice days in ${monthName}`}>
        {WEEKDAYS.map((w) => (
          <div key={w} className="cal-head" role="columnheader">{w}</div>
        ))}
        {Array.from({ length: leading }, (_, i) => <div key={`e${i}`} />)}
        {Array.from({ length: daysInMonth }, (_, i) => {
          const date = iso(view.y, view.m, i + 1);
          const done = practised.has(date);
          const future = date > today;
          const cls = ["cal-day", done ? "done" : "", date === today ? "today" : "", future ? "future" : ""].join(" ");
          return (
            <div key={date} className={cls} role="gridcell" aria-label={`${date}${done ? ", practised" : ""}${date === today ? ", today" : ""}`}>
              <span>{i + 1}</span>
              {done && <span className="cal-fire" aria-hidden="true">🔥</span>}
            </div>
          );
        })}
      </div>
      <p className="small muted" style={{ margin: "10px 0 0" }}>
        🔥 = practised · outlined = today
      </p>
    </div>
  );
}
