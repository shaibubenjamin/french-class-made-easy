import type { PostHog } from "posthog-js";

// US-7.1: PRD §12 events. Properties never contain PII (no emails, names or
// free-text answers); users are identified only by their opaque Supabase id.
export type EventName =
  | "signup"
  | "quiz_started"
  | "quiz_completed"
  | "level_overridden"
  | "lesson_started"
  | "lesson_completed"
  | "exercise_answered"
  | "email_clicked"
  | "pref_changed"
  | "unsubscribed";

let client: PostHog | null = null;
const queue: [EventName, Record<string, unknown>][] = [];

export async function initAnalytics() {
  const key = import.meta.env.VITE_POSTHOG_KEY as string | undefined;
  if (!key || client) return;
  const { default: posthog } = await import("posthog-js");
  posthog.init(key, {
    api_host: (import.meta.env.VITE_POSTHOG_HOST as string) || "https://eu.i.posthog.com",
    autocapture: false,
    capture_pageview: true,
    disable_session_recording: true,
    persistence: "localStorage",
  });
  client = posthog;
  for (const [event, props] of queue.splice(0)) client.capture(event, props);
}

export function track(event: EventName, props: Record<string, string | number | boolean | null> = {}) {
  if (client) client.capture(event, props);
  else if (import.meta.env.VITE_POSTHOG_KEY) queue.push([event, props]);
}

export function identify(userId: string, props: { level?: string | null } = {}) {
  client?.identify(userId, props);
}

export function resetAnalytics() {
  client?.reset();
}
