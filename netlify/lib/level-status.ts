import { completions, courseFor } from "./lessons.ts";
import { levelStatus } from "../../shared/progression.ts";
import type { Level } from "../../shared/levels.ts";

/** Progress through a level's course and whether the 80% pass mark is met. */
export async function getLevelStatus(userId: string, level: Level) {
  const course = await courseFor(level);
  const done = await completions(userId, course.map((l) => l.id));
  return levelStatus(
    course.map((l) => ({
      seq: l.seq,
      theme: l.theme,
      completed: Boolean(done.get(l.id)?.completed_at),
      score: done.get(l.id)?.score === null || done.get(l.id)?.score === undefined ? null : Number(done.get(l.id)?.score),
    })),
  );
}
