import { DICTATION_SOURCES, type ComprehensionQuestion, type Exercise, type LessonContent } from "../../shared/lesson-schema.ts";

export function normalize(text: string): string {
  return text
    .normalize("NFC")
    .toLowerCase()
    .replace(/[’‘`´]/g, "'")
    .replace(/[«»"“”]/g, "")
    .replace(/\s+([,.!?;:])/g, "$1")
    .replace(/'\s+/g, "'") // "l' homme" from reordered tokens → "l'homme"
    .replace(/\s+/g, " ")
    .trim()
    .replace(/[.!?;:,]+$/, "")
    .trim();
}

const stripAccents = (s: string) => s.normalize("NFD").replace(/[̀-ͯ]/g, "");
const stripPunct = (s: string) => s.replace(/[.,!?;:]/g, "").replace(/\s+/g, " ").trim();

export interface RuleResult {
  /** null means the rules can't decide and AI grading is needed. */
  correct: boolean | null;
  accentWarning?: boolean;
}

type Gradable = Pick<Exercise, "type" | "answer" | "accepted"> | ComprehensionQuestion;

/** Rule-based grading for closed questions (US-3.5). */
export function gradeByRules(exercise: Gradable, answer: string): RuleResult {
  const type = "type" in exercise ? exercise.type : "mcq";
  if (type === "mcq") return { correct: answer === exercise.answer };

  const accepted = [exercise.answer, ...("accepted" in exercise ? exercise.accepted : [])];
  const given = stripPunct(normalize(answer));
  const targets = accepted.map((t) => stripPunct(normalize(t)));

  if (targets.includes(given)) return { correct: true };
  if (targets.some((t) => stripAccents(t) === stripAccents(given))) {
    return { correct: true, accentWarning: true };
  }
  // Free-text translations can be right in many ways: the learner self-checks.
  if (type === "translation" && given.length > 0) return { correct: null };
  return { correct: false };
}

/** Dictation ("dict1", "dict2"): the learner hears a vocabulary example sentence and types it. */
export function dictationItem(content: LessonContent, ref: string) {
  const index = DICTATION_SOURCES[ref];
  const sentence = index === undefined ? undefined : content.vocabulary[index]?.example;
  if (!sentence) return undefined;
  return { type: "fill_blank" as const, answer: sentence, accepted: [], explanation: "", tag: "dictation" };
}
