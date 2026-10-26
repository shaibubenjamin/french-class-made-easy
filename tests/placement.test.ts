import { describe, expect, it } from "vitest";
import {
  isSettled,
  MAX_QUESTIONS,
  nextLevel,
  nextRetakeDate,
  recommendLevel,
  skillBreakdown,
  skillForTurn,
  START_LEVEL,
  type PlacementAnswer,
} from "../netlify/lib/placement.ts";
import { LEVELS, type Level } from "../shared/levels.ts";

/** Simulates a learner who answers correctly up to (and including) `trueLevel`. */
function simulate(trueLevel: Level, noise: (turn: number) => boolean = () => false): PlacementAnswer[] {
  const answers: PlacementAnswer[] = [];
  let level: Level = START_LEVEL;
  while (!isSettled(answers)) {
    let correct = LEVELS.indexOf(level) <= LEVELS.indexOf(trueLevel);
    if (noise(answers.length)) correct = !correct;
    answers.push({ level, skill: skillForTurn(answers.length), correct });
    level = nextLevel(level, correct);
  }
  return answers;
}

describe("placement staircase", () => {
  it("moves up on correct and down on wrong, clamped to A1–C2", () => {
    expect(nextLevel("A2", true)).toBe("B1");
    expect(nextLevel("A2", false)).toBe("A1");
    expect(nextLevel("A1", false)).toBe("A1");
    expect(nextLevel("C2", true)).toBe("C2");
  });

  it.each(LEVELS)("places a consistent %s learner at their level", (level) => {
    const answers = simulate(level);
    expect(recommendLevel(answers)).toBe(level);
    expect(answers.length).toBeGreaterThanOrEqual(15);
    expect(answers.length).toBeLessThanOrEqual(MAX_QUESTIONS);
  });

  it("stays within one level with an occasional slip", () => {
    const answers = simulate("B2", (turn) => turn === 9);
    const got = LEVELS.indexOf(recommendLevel(answers));
    expect(Math.abs(got - LEVELS.indexOf("B2"))).toBeLessThanOrEqual(1);
  });

  it("never asks more than 20 questions", () => {
    const answers = simulate("B1", (turn) => turn % 2 === 0);
    expect(answers.length).toBeLessThanOrEqual(MAX_QUESTIONS);
  });

  it("rotates skills evenly", () => {
    const answers = simulate("B1");
    const counts = skillBreakdown(answers);
    const totals = Object.values(counts).map((s) => s.total);
    expect(Math.max(...totals) - Math.min(...totals)).toBeLessThanOrEqual(1);
  });

  it("enforces a 7-day retake window", () => {
    const now = new Date("2026-10-26T12:00:00Z");
    expect(nextRetakeDate(null, now)).toBeNull();
    expect(nextRetakeDate("2026-10-24T12:00:00Z", now)?.toISOString()).toBe("2026-10-31T12:00:00.000Z");
    expect(nextRetakeDate("2026-10-18T12:00:00Z", now)).toBeNull();
  });
});
