export const LEVELS = ["A1", "A2", "B1", "B2", "C1", "C2"] as const;
export type Level = (typeof LEVELS)[number];

export function isLevel(value: unknown): value is Level {
  return typeof value === "string" && (LEVELS as readonly string[]).includes(value);
}

export const LEVEL_INFO: Record<
  Level,
  { name: string; focus: string; canDo: string[] }
> = {
  A1: {
    name: "Breakthrough",
    focus: "Greetings, numbers, present tense, core vocabulary",
    canDo: [
      "I can introduce myself and say where I live.",
      "I can understand very simple questions spoken slowly.",
      "I can fill in a form with my name, age and nationality.",
    ],
  },
  A2: {
    name: "Waystage",
    focus: "Passé composé, daily routines, shopping, travel",
    canDo: [
      "I can describe my day and what I did last weekend.",
      "I can buy things, order food and ask for directions.",
      "I can write a short, simple message to a friend.",
    ],
  },
  B1: {
    name: "Threshold",
    focus: "Imparfait vs passé composé, opinions, future, work",
    canDo: [
      "I can handle most situations while travelling in France.",
      "I can give my opinion and briefly explain why.",
      "I can follow the main points of a clear conversation about work or school.",
    ],
  },
  B2: {
    name: "Vantage",
    focus: "Subjunctive, argumentation, news, formal emails",
    canDo: [
      "I can follow news reports and most TV programmes.",
      "I can argue for and against a point of view.",
      "I can write a clear formal email or a structured essay.",
    ],
  },
  C1: {
    name: "Advanced",
    focus: "Nuance, idioms, register, complex texts",
    canDo: [
      "I can understand long, complex texts and implicit meaning.",
      "I can express myself fluently without searching for words.",
      "I can adapt my register to formal and informal settings.",
    ],
  },
  C2: {
    name: "Mastery",
    focus: "Literary and academic texts, stylistics, rare structures",
    canDo: [
      "I can understand virtually everything I hear or read.",
      "I can summarise arguments from different sources coherently.",
      "I can express fine shades of meaning, even in complex situations.",
    ],
  },
};

export const SKILLS = ["vocabulary", "grammar", "reading", "listening", "speaking", "writing"] as const;
export type Skill = (typeof SKILLS)[number];

/** Explanations are given in French from C1 upwards (FR-25). */
export function feedbackLanguage(level: Level): "English" | "French" {
  return level === "C1" || level === "C2" ? "French" : "English";
}
