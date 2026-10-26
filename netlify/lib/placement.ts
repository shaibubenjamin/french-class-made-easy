import { LEVELS, type Level } from "../../shared/levels.ts";

// Adaptive staircase (FR-5/FR-6): start at A2, move up a level after a correct
// answer and down after a wrong one. Stop after 20 questions, or once at least
// 15 have been asked and the last six all sit within two adjacent levels.

export const MIN_QUESTIONS = 15;
export const MAX_QUESTIONS = 20;
export const START_LEVEL: Level = "A2";
export const PLACEMENT_SKILLS = ["grammar", "vocabulary", "reading"] as const;
export type PlacementSkill = (typeof PLACEMENT_SKILLS)[number];

export interface PlacementAnswer {
  level: Level;
  skill: string;
  correct: boolean;
}

const idx = (level: Level) => LEVELS.indexOf(level);

export function nextLevel(current: Level, correct: boolean): Level {
  const i = Math.min(LEVELS.length - 1, Math.max(0, idx(current) + (correct ? 1 : -1)));
  return LEVELS[i];
}

/** Skills rotate so every strand is covered evenly. */
export function skillForTurn(turn: number): PlacementSkill {
  return PLACEMENT_SKILLS[turn % PLACEMENT_SKILLS.length];
}

export function isSettled(answers: PlacementAnswer[]): boolean {
  if (answers.length >= MAX_QUESTIONS) return true;
  if (answers.length < MIN_QUESTIONS) return false;
  const recent = answers.slice(-6).map((a) => idx(a.level));
  return Math.max(...recent) - Math.min(...recent) <= 1;
}

/**
 * The highest level answered at least twice with ≥ 60 % accuracy. With the
 * staircase, learners oscillate between their level (mostly right) and the one
 * above (mostly wrong), so this lands on the lower of the two.
 */
export function recommendLevel(answers: PlacementAnswer[]): Level {
  let best: Level = "A1";
  for (const level of LEVELS) {
    const atLevel = answers.filter((a) => a.level === level);
    const correct = atLevel.filter((a) => a.correct).length;
    if (atLevel.length >= 2 && correct / atLevel.length >= 0.6) best = level;
  }
  return best;
}

export interface SkillScore {
  correct: number;
  total: number;
  percent: number;
  level: Level;
}

export function skillBreakdown(answers: PlacementAnswer[]): Record<string, SkillScore> {
  const out: Record<string, SkillScore> = {};
  for (const skill of PLACEMENT_SKILLS) {
    const list = answers.filter((a) => a.skill === skill);
    const correct = list.filter((a) => a.correct).length;
    // Fewer data points per skill, so a level counts with ≥ 50 % correct.
    let level: Level = "A1";
    for (const lv of LEVELS) {
      const at = list.filter((a) => a.level === lv);
      const ok = at.filter((a) => a.correct).length;
      if (at.length > 0 && ok / at.length >= 0.5) level = lv;
    }
    out[skill] = {
      correct,
      total: list.length,
      percent: list.length ? Math.round((correct / list.length) * 100) : 0,
      level,
    };
  }
  return out;
}

export const RETAKE_DAYS = 7; // FR-10

export function nextRetakeDate(lastFinishedAt: string | null, now = new Date()): Date | null {
  if (!lastFinishedAt) return null;
  const next = new Date(Date.parse(lastFinishedAt) + RETAKE_DAYS * 86_400_000);
  return next > now ? next : null;
}
