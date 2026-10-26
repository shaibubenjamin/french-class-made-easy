import { db, must } from "./db.ts";
import { HttpError } from "./http.ts";
import { MAX_QUESTIONS, skillForTurn, type PlacementAnswer } from "./placement.ts";
import { LEVELS, type Level } from "../../shared/levels.ts";

export interface QuestionRow {
  id: number;
  level: Level;
  skill: string;
  prompt: string;
  passage: string | null;
  options: string[];
  answer: number;
  explanation: string | null;
  audio_url: string | null;
}

export interface AttemptRow {
  id: string;
  user_id: string;
  started_at: string;
  finished_at: string | null;
  recommended_level: Level | null;
  skill_scores: unknown;
  current_question_id: number | null;
  current_level: Level;
}

/** Picks an unasked question near `level`, preferring this turn's skill. */
export async function pickQuestion(level: Level, turn: number, askedIds: number[]): Promise<QuestionRow> {
  const skill = skillForTurn(turn);
  const i = LEVELS.indexOf(level);
  const levelsToTry = [level, LEVELS[i - 1], LEVELS[i + 1]].filter(Boolean) as Level[];
  for (const lv of levelsToTry) {
    for (const sk of [skill, null]) {
      let query = db().from("questions").select("*").eq("level", lv);
      if (sk) query = query.eq("skill", sk);
      if (askedIds.length) query = query.not("id", "in", `(${askedIds.join(",")})`);
      const rows = must(await query.limit(50)) as QuestionRow[];
      if (rows.length) return rows[Math.floor(Math.random() * rows.length)];
    }
  }
  throw new HttpError(500, "The question bank has run out of questions");
}

export async function loadAnswers(attemptId: string): Promise<(PlacementAnswer & { question_id: number })[]> {
  const rows = must(
    await db()
      .from("placement_answers")
      .select('question_id, is_correct, "order", questions(level, skill)')
      .eq("attempt_id", attemptId)
      .order("order"),
  ) as unknown as {
    question_id: number;
    is_correct: boolean;
    questions: { level: Level; skill: string } | { level: Level; skill: string }[];
  }[];
  return rows.map((r) => {
    const q = Array.isArray(r.questions) ? r.questions[0] : r.questions;
    return { question_id: r.question_id, level: q.level, skill: q.skill, correct: r.is_correct };
  });
}

/** What the browser sees: never the answer. */
export function publicQuestion(q: QuestionRow, answered: number) {
  return {
    question: { id: q.id, skill: q.skill, prompt: q.prompt, passage: q.passage, options: q.options, audio_url: q.audio_url },
    progress: { answered, max: MAX_QUESTIONS },
  };
}
