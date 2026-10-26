import { z } from "zod";
import { LEVELS } from "./levels.ts";

// The built-in curriculum (data/curriculum) uses this shape. Counts and
// answer consistency are checked separately in validateLessonShape().

export const ExerciseSchema = z.object({
  id: z.string().describe("Stable id such as ex1, ex2 …"),
  type: z.enum(["mcq", "fill_blank", "reorder", "translation"]),
  skill: z.enum(["vocabulary", "grammar", "reading"]),
  prompt: z
    .string()
    .describe(
      "Instruction + item. fill_blank uses ___ for the gap. reorder lists nothing here (words go in options). translation gives the English sentence to translate into French.",
    ),
  options: z
    .array(z.string())
    .describe("mcq: the choices. reorder: the words of the sentence, shuffled. Otherwise empty."),
  answer: z.string().describe("The correct answer. mcq: the exact text of the correct option."),
  accepted: z.array(z.string()).describe("Other acceptable answers (may be empty)."),
  explanation: z.string().describe("Why the answer is correct, in one or two sentences."),
  tag: z.string().describe("Kebab-case grammar/vocab topic tag, e.g. passe-compose, gender-agreement."),
});

export const ComprehensionQuestionSchema = z.object({
  id: z.string().describe("Stable id such as tq1, tq2 …"),
  question: z.string(),
  options: z.array(z.string()),
  answer: z.string().describe("Exact text of the correct option"),
  explanation: z.string(),
});

export const LessonContentSchema = z.object({
  level: z.enum(LEVELS),
  /** Position in the level's course, 1-based. */
  seq: z.number().int(),
  theme: z.string(),
  vocabulary: z.array(z.object({ fr: z.string(), en: z.string(), example: z.string() })),
  grammar: z.object({
    topic: z.string(),
    explanation: z.string(),
    examples: z.array(z.string()),
  }),
  text: z.object({
    title: z.string(),
    body: z.string(),
    questions: z.array(ComprehensionQuestionSchema),
  }),
  exercises: z.array(ExerciseSchema),
  writing_prompt: z.string(),
  /** Shown after the learner submits, instead of AI feedback. */
  writing_model: z.string(),
  writing_checklist: z.array(z.string()),
  /** Speaking task; keywords are target expressions ("a|b" = alternatives). */
  speaking: z.object({ prompt: z.string(), en: z.string().optional(), keywords: z.array(z.string()) }),
  email_snippet: z.object({
    word_of_day: z.object({ fr: z.string(), en: z.string(), example: z.string() }),
    mini_question: z.object({
      prompt: z.string(),
      options: z.array(z.string()),
      answer: z.string().describe("Exact text of the correct option"),
    }),
  }),
});

/** Dictation exercises replay these vocabulary example sentences (by index). */
export const DICTATION_SOURCES: Record<string, number> = { dict1: 1, dict2: 5 };

export type Exercise = z.infer<typeof ExerciseSchema>;
export type ComprehensionQuestion = z.infer<typeof ComprehensionQuestionSchema>;
export type LessonContent = z.infer<typeof LessonContentSchema>;

/** Business rules from FR-12 that the JSON schema alone can't express. */
export function validateLessonShape(lesson: LessonContent): string[] {
  const problems: string[] = [];
  const v = lesson.vocabulary.length;
  if (v < 8 || v > 10) problems.push(`vocabulary must have 8–10 items (got ${v})`);
  const e = lesson.exercises.length;
  if (e < 5 || e > 8) problems.push(`exercises must have 5–8 items (got ${e})`);
  if (lesson.text.questions.length < 2) problems.push("text needs at least 2 comprehension questions");
  if (!lesson.writing_prompt.trim()) problems.push("writing_prompt is empty");
  if (!lesson.writing_model.trim()) problems.push("writing_model is empty");
  if (lesson.writing_checklist.length === 0) problems.push("writing_checklist is empty");
  if (lesson.grammar.examples.length < 2) problems.push("grammar needs at least 2 examples (used for read-aloud)");
  if (!lesson.speaking.prompt.trim() || lesson.speaking.keywords.length < 2) problems.push("speaking needs a prompt and at least 2 keywords");
  if (lesson.vocabulary.length < 6) problems.push("vocabulary too short for dictation");

  const ids = new Set<string>();
  for (const ex of [...lesson.exercises, ...lesson.text.questions]) {
    if (ids.has(ex.id)) problems.push(`duplicate id ${ex.id}`);
    ids.add(ex.id);
  }
  for (const ex of lesson.exercises) {
    if (ex.type === "mcq" && !ex.options.includes(ex.answer)) {
      problems.push(`${ex.id}: mcq answer is not one of the options`);
    }
    if (ex.type === "fill_blank" && !ex.prompt.includes("___")) {
      problems.push(`${ex.id}: fill_blank prompt has no ___ gap`);
    }
    if (ex.type === "reorder") {
      if (ex.options.length < 3) problems.push(`${ex.id}: reorder needs the shuffled words in options`);
      const words = (t: string) => t.replace(/[.!?]$/, "").split(/\s+/).sort().join(" ");
      if (words(ex.options.join(" ")) !== words(ex.answer)) problems.push(`${ex.id}: reorder words don't match the answer`);
    }
    if (!ex.answer.trim()) problems.push(`${ex.id}: empty answer`);
  }
  for (const q of lesson.text.questions) {
    if (!q.options.includes(q.answer)) problems.push(`${q.id}: answer is not one of the options`);
  }
  const mini = lesson.email_snippet.mini_question;
  if (!mini.options.includes(mini.answer)) problems.push("email mini_question answer is not one of the options");
  return problems;
}

/** Client-safe view of a lesson: answers and explanations are stripped. */
export function redactLesson(lesson: LessonContent) {
  return {
    ...lesson,
    text: {
      ...lesson.text,
      questions: lesson.text.questions.map(({ id, question, options }) => ({ id, question, options })),
    },
    exercises: lesson.exercises.map(({ id, type, skill, prompt, options }) => ({
      id,
      type,
      skill,
      prompt,
      options,
    })),
    writing_model: undefined,
    writing_checklist: undefined,
    email_snippet: undefined,
  };
}
export type PublicLesson = ReturnType<typeof redactLesson>;
