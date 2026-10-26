import { LEVELS, type Level } from "./levels.ts";

/** Minimum average score on a level's lessons before moving up (and per-lesson target). */
export const PASS_MARK = 80;

export interface LessonScore {
  seq: number;
  theme: string;
  completed: boolean;
  score: number | null;
}

export function levelStatus(lessons: LessonScore[]) {
  const completed = lessons.filter((l) => l.completed);
  const average = completed.length
    ? Math.round(completed.reduce((sum, l) => sum + (l.score ?? 0), 0) / completed.length)
    : null;
  const allDone = lessons.length > 0 && completed.length === lessons.length;
  return {
    total: lessons.length,
    completed: completed.length,
    average,
    allDone,
    passed: allDone && (average ?? 0) >= PASS_MARK,
    /** Completed lessons whose score is under the pass mark, lowest first. */
    toImprove: completed
      .filter((l) => (l.score ?? 0) < PASS_MARK)
      .sort((a, b) => (a.score ?? 0) - (b.score ?? 0))
      .map(({ seq, theme, score }) => ({ seq, theme, score: score ?? 0 })),
  };
}

export function nextLevel(level: Level): Level | null {
  const i = LEVELS.indexOf(level);
  return i >= 0 && i < LEVELS.length - 1 ? LEVELS[i + 1] : null;
}
