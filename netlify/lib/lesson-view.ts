import { db, must } from "./db.ts";
import type { LessonRow } from "./lessons.ts";
import { redactLesson } from "../../shared/lesson-schema.ts";

export interface AttemptView {
  answer: string;
  is_correct: boolean | null;
  feedback: unknown;
}

/** Lesson as sent to the learner: answers stripped, plus their saved progress. */
export async function lessonView(row: LessonRow, userId: string) {
  const [progress, attempts] = await Promise.all([
    db().from("lesson_progress").select("*").eq("user_id", userId).eq("lesson_id", row.id).maybeSingle(),
    db()
      .from("exercise_attempts")
      .select("exercise_ref, answer, is_correct, ai_feedback, created_at")
      .eq("user_id", userId)
      .eq("lesson_id", row.id)
      .order("created_at", { ascending: true }),
  ]);

  // Latest attempt per exercise wins.
  const byRef: Record<string, AttemptView> = {};
  for (const a of must(attempts) as {
    exercise_ref: string;
    answer: string;
    is_correct: boolean | null;
    ai_feedback: unknown;
  }[]) {
    byRef[a.exercise_ref] = { answer: a.answer, is_correct: a.is_correct, feedback: a.ai_feedback };
  }

  return {
    id: row.id,
    level: row.level,
    date: row.date,
    theme: row.theme,
    content: redactLesson(row.content),
    progress: must(progress),
    attempts: byRef,
  };
}
