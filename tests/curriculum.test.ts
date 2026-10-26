import { describe, expect, it } from "vitest";
import { CURRICULUM } from "../data/curriculum/index.ts";
import { gradeByRules } from "../netlify/lib/grading.ts";
import { LessonContentSchema, validateLessonShape } from "../shared/lesson-schema.ts";
import { LEVELS } from "../shared/levels.ts";

describe("built-in curriculum", () => {
  it.each(LEVELS)("%s has 12 ordered lessons with distinct themes", (level) => {
    const lessons = CURRICULUM[level];
    expect(lessons).toHaveLength(12);
    expect(lessons.map((l) => l.seq)).toEqual(Array.from({ length: 12 }, (_, i) => i + 1));
    expect(new Set(lessons.map((l) => l.theme)).size).toBe(12);
    expect(new Set(lessons.map((l) => l.grammar.topic)).size).toBe(12);
  });

  for (const level of LEVELS) {
    for (const lesson of CURRICULUM[level]) {
      it(`${level} #${lesson.seq} « ${lesson.theme} » is valid`, () => {
        expect(LessonContentSchema.safeParse(lesson).success).toBe(true);
        expect(validateLessonShape(lesson)).toEqual([]);
        expect(lesson.level).toBe(level);
        // Every closed exercise must accept its own answer.
        for (const ex of lesson.exercises) {
          expect(gradeByRules(ex, ex.answer).correct, `${ex.id} own answer`).toBe(true);
          if (ex.type === "mcq") expect(new Set(ex.options).size, `${ex.id} duplicate options`).toBe(ex.options.length);
          if (ex.type === "reorder") expect(gradeByRules(ex, ex.options.join(" ")).correct, `${ex.id} shuffled`).toBe(false);
        }
        for (const q of lesson.text.questions) expect(new Set(q.options).size).toBe(q.options.length);
      });
    }
  }
});
