import type { Config, Context } from "@netlify/functions";
import { requireLevel, requireUser } from "../lib/auth.ts";
import { handle, json } from "../lib/http.ts";
import { completions, courseFor, loadApprovedLesson } from "../lib/lessons.ts";
import { lessonView } from "../lib/lesson-view.ts";

// GET /api/lessons      — every lesson in the learner's level, in course order
// GET /api/lessons/:id  — one lesson, with the user's saved progress
export default handle(async (req, context: Context) => {
  const user = await requireUser(req);

  if (context.params.id) {
    const row = await loadApprovedLesson(context.params.id);
    const course = row.seq ? await courseFor(row.level) : [];
    return json({ ...(await lessonView(row, user.id)), position: row.seq, total: course.length });
  }

  const level = requireLevel(user);
  const course = await courseFor(level);
  const progress = await completions(user.id, course.map((l) => l.id));
  return json({
    lessons: course.map((l) => ({
      id: l.id,
      seq: l.seq,
      theme: l.theme,
      level: l.level,
      grammar_topic: l.content.grammar.topic,
      completed: Boolean(progress.get(l.id)?.completed_at),
      started: progress.has(l.id),
      score: progress.get(l.id)?.score ?? null,
    })),
  });
});

export const config: Config = { path: ["/api/lessons", "/api/lessons/:id"], method: "GET" };
