import type { PublicLesson } from "../../shared/lesson-schema.ts";
import type { Level } from "../../shared/levels.ts";

export interface Profile {
  id: string;
  email: string;
  name: string | null;
  timezone: string;
  goal: string | null;
  daily_minutes: 5 | 10 | 20;
  current_level: Level | null;
  level_source: "quiz" | "self" | null;
  onboarded: boolean;
  email_opt_in_at: string | null;
  is_admin: boolean;
}

export interface EmailPreferences {
  morning: boolean;
  morning_hour: number;
  afternoon: boolean;
  afternoon_hour: number;
  evening: boolean;
  evening_hour: number;
  weekly: boolean;
  unsubscribed_all: boolean;
  suppressed_reason: string | null;
}

export interface Me {
  profile: Profile;
  preferences: EmailPreferences;
  streak: { current: number; longest: number; freezes_left: number };
  today: string;
}

export interface PlacementQuestion {
  id: number;
  skill: string;
  prompt: string;
  passage: string | null;
  options: string[];
  audio_url: string | null;
}

export interface SkillScore {
  correct: number;
  total: number;
  percent: number;
  level: Level;
}

export type PlacementStep =
  | { done: false; attempt_id: string; question: PlacementQuestion; progress: { answered: number; max: number } }
  | { done: true; result: { level: Level; skills: Record<string, SkillScore>; answered: number } };

export interface AttemptView {
  answer: string;
  is_correct: boolean | null;
  feedback: GradeFeedback | WritingFeedback | null;
}

export interface LessonView {
  id: string;
  level: Level;
  date: string;
  theme: string;
  content: PublicLesson;
  progress: { completed_at: string | null; score: number | null; state: { step?: string } } | null;
  attempts: Record<string, AttemptView>;
  is_today?: boolean;
}

export interface GradeFeedback {
  explanation: string;
  correct_answer: string;
  accent_warning: boolean;
  ai: boolean;
}

export interface GradeResponse extends GradeFeedback {
  is_correct: boolean | null;
  error_tags: string[];
}

export interface WritingFeedback {
  corrections: { original: string; corrected: string; explanation: string; tag: string }[];
  rewritten: string;
  overall_comment: string;
  score: number;
}

export interface Dashboard {
  level: Level;
  today: {
    id: string;
    theme: string;
    date: string;
    is_today: boolean;
    grammar_topic: string;
    started: boolean;
    completed: boolean;
    score: number | null;
    step: string | null;
  } | null;
  streak: { current: number; longest: number; freezes_left: number; practised_today: boolean };
  lessons_completed: number;
  skills: { skill: string; attempts: number; accuracy: number | null }[];
}
