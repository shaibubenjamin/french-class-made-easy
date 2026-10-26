import type { LessonContent } from "../../shared/lesson-schema.ts";
import type { Level } from "../../shared/levels.ts";
import { A1 } from "./a1.ts";
import { A2 } from "./a2.ts";
import { B1 } from "./b1.ts";
import { B2 } from "./b2.ts";
import { C1 } from "./c1.ts";
import { C2 } from "./c2.ts";

/** The built-in course: 12 ordered lessons per CEFR level. */
export const CURRICULUM: Record<Level, LessonContent[]> = { A1, A2, B1, B2, C1, C2 };
