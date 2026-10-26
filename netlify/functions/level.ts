import type { Config } from "@netlify/functions";
import { z } from "zod";
import { requireUser } from "../lib/auth.ts";
import { db, must } from "../lib/db.ts";
import { handle, HttpError, json, readBody } from "../lib/http.ts";
import { getLevelStatus } from "../lib/level-status.ts";
import { LEVELS } from "../../shared/levels.ts";
import { nextLevel, PASS_MARK } from "../../shared/progression.ts";

const Body = z.object({
  level: z.enum(LEVELS),
  source: z.enum(["quiz", "self"]),
});

// POST /api/level — accept the quiz result or choose a level (US-2.3, US-2.4).
// Moving up by passing a level is handled by level-advance.ts.
export default handle(async (req) => {
  const user = await requireUser(req);

  const { level, source } = await readBody(req, Body);
  // Choosing a level yourself can't skip ahead: going up requires passing the current level.
  // (The placement quiz may still place you higher — that's its job.)
  const current = user.current_level;
  if (source === "self" && current && LEVELS.indexOf(level) > LEVELS.indexOf(current)) {
    const status = await getLevelStatus(user.id, current);
    const allowed = status.passed && level === nextLevel(current);
    if (!allowed) {
      throw new HttpError(403, `To move above ${current}, complete its lessons with an average of at least ${PASS_MARK}%.`);
    }
  }
  must(await db().from("profiles").update({ current_level: level, level_source: source }).eq("id", user.id));
  return json({ level, source });
});

export const config: Config = { path: "/api/level", method: "POST" };
