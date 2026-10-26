import type { Exercise, LessonContent } from "../../shared/lesson-schema.ts";
import type { Level } from "../../shared/levels.ts";

// Compact authoring helpers for the built-in course. Options are shuffled
// deterministically (seeded by the prompt) so the seed migration is stable.

type Skill = Exercise["skill"];
export type ExerciseSpec = Omit<Exercise, "id">;

function seededShuffle<T>(items: T[], seed: string): T[] {
  let h = 2166136261;
  for (const ch of seed) h = Math.imul(h ^ ch.charCodeAt(0), 16777619);
  const out = [...items];
  for (let i = out.length - 1; i > 0; i--) {
    h = Math.imul(h ^ (h >>> 13), 1274126177);
    const j = (h >>> 0) % (i + 1);
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

/** Multiple choice. The correct answer is listed first and shuffled in. */
export function mcq(prompt: string, correct: string, wrong: string[], explanation: string, tag: string, skill: Skill = "grammar"): ExerciseSpec {
  return { type: "mcq", skill, prompt, options: seededShuffle([correct, ...wrong], prompt), answer: correct, accepted: [], explanation, tag };
}

/** Fill in the blank; the prompt must contain ___. */
export function blank(prompt: string, answer: string, explanation: string, tag: string, accepted: string[] = [], skill: Skill = "grammar"): ExerciseSpec {
  return { type: "fill_blank", skill, prompt, options: [], answer, accepted, explanation, tag };
}

/** Word order: give the correct sentence; its words are shuffled for the learner. */
export function reorder(sentence: string, explanation: string, tag: string, skill: Skill = "grammar"): ExerciseSpec {
  const clean = sentence.replace(/[.!?]$/, "");
  const words = clean.split(/\s+/);
  let options = seededShuffle(words, sentence);
  if (options.join(" ") === clean) options = [...options.slice(1), options[0]];
  return { type: "reorder", skill, prompt: "Put the words in the right order.", options, answer: clean, accepted: [], explanation, tag };
}

/** English → French translation, self-checked against the model answer. */
export function translate(english: string, french: string, explanation: string, tag: string, accepted: string[] = [], skill: Skill = "vocabulary"): ExerciseSpec {
  return { type: "translation", skill, prompt: `Translate into French: "${english}"`, options: [], answer: french, accepted, explanation, tag };
}

export interface LessonSpec {
  theme: string;
  /** [French, English, French example sentence] */
  vocab: [string, string, string][];
  grammar: { topic: string; explanation: string; examples: string[] };
  text: { title: string; body: string; questions: [question: string, correct: string, wrong: string[], explanation?: string][] };
  exercises: ExerciseSpec[];
  writing: { prompt: string; model: string; checklist: string[] };
}

export function course(level: Level, specs: LessonSpec[]): LessonContent[] {
  return specs.map((s, i) => {
    const exercises = s.exercises.map((e, n) => ({ ...e, id: `ex${n + 1}` }));
    const firstMcq = exercises.find((e) => e.type === "mcq") ?? exercises[0];
    const [fr, en, example] = s.vocab[0];
    return {
      level,
      seq: i + 1,
      theme: s.theme,
      vocabulary: s.vocab.map(([fr, en, example]) => ({ fr, en, example })),
      grammar: s.grammar,
      text: {
        title: s.text.title,
        body: s.text.body,
        questions: s.text.questions.map(([question, correct, wrong, explanation], n) => ({
          id: `tq${n + 1}`,
          question,
          options: seededShuffle([correct, ...wrong], question + s.theme),
          answer: correct,
          explanation: explanation ?? "",
        })),
      },
      exercises,
      writing_prompt: s.writing.prompt,
      writing_model: s.writing.model,
      writing_checklist: s.writing.checklist,
      email_snippet: {
        word_of_day: { fr, en, example },
        mini_question: { prompt: firstMcq.prompt, options: firstMcq.options, answer: firstMcq.answer },
      },
    };
  });
}
