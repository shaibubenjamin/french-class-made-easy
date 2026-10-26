import type { Exercise, ComprehensionQuestion } from "../../shared/lesson-schema.ts";

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
  // Free-text translations can be right in many ways, so let the AI judge.
  if (type === "translation" && given.length > 0) return { correct: null };
  return { correct: false };
}
