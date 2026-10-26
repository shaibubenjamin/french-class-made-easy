import { db, must } from "./db.ts";
import type { ReviewItem } from "./email.ts";
import type { LessonContent } from "../../shared/lesson-schema.ts";

/**
 * Evening review (FR-19): up to three of today's mistakes, or a vocabulary
 * review from the latest lesson when there were none.
 */
export async function buildReview(
  userId: string,
  localDate: string,
  fallbackLesson: LessonContent | null,
): Promise<{ items: ReviewItem[]; fromMistakes: boolean }> {
  const wrong = must(
    await db()
      .from("exercise_attempts")
      .select("exercise_ref, answer, lesson_id, lessons(content)")
      .eq("user_id", userId)
      .eq("local_date", localDate)
      .eq("is_correct", false)
      .neq("exercise_ref", "writing")
      .order("created_at", { ascending: false })
      .limit(10),
  ) as unknown as {
    exercise_ref: string;
    lessons: { content: LessonContent } | { content: LessonContent }[] | null;
  }[];

  const items: ReviewItem[] = [];
  const seen = new Set<string>();
  for (const row of wrong) {
    const lesson = Array.isArray(row.lessons) ? row.lessons[0] : row.lessons;
    if (!lesson || seen.has(row.exercise_ref)) continue;
    seen.add(row.exercise_ref);
    const ex = lesson.content.exercises.find((e) => e.id === row.exercise_ref);
    const q = lesson.content.text.questions.find((t) => t.id === row.exercise_ref);
    if (ex) items.push({ prompt: ex.prompt, answer: ex.answer, explanation: ex.explanation });
    else if (q) items.push({ prompt: q.question, answer: q.answer, explanation: q.explanation });
    if (items.length === 3) break;
  }
  if (items.length) return { items, fromMistakes: true };

  const vocab = fallbackLesson?.vocabulary ?? [];
  const picks = [...vocab].sort(() => Math.random() - 0.5).slice(0, 3);
  return {
    items: picks.map((v) => ({ prompt: `What does « ${v.fr} » mean?`, answer: v.en, explanation: v.example })),
    fromMistakes: false,
  };
}
