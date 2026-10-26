import type { Config } from "@netlify/functions";
import { requireUser } from "../lib/auth.ts";
import { db, must } from "../lib/db.ts";
import { handle, HttpError, json } from "../lib/http.ts";
import { getLevelStatus } from "../lib/level-status.ts";
import { nextLevel, PASS_MARK } from "../../shared/progression.ts";

// POST /api/level/advance — move up once every lesson of the current level is
// done with an average of at least 80%.
export default handle(async (req) => {
  const user = await requireUser(req);
  if (!user.current_level) throw new HttpError(409, "Choose your level first");
  const next = nextLevel(user.current_level);
  if (!next) throw new HttpError(409, "You've reached the highest level. Félicitations !");
  const status = await getLevelStatus(user.id, user.current_level);
  if (!status.passed) {
    throw new HttpError(403, `Finish every ${user.current_level} lesson with an average of at least ${PASS_MARK}% to move up.`, { status });
  }
  must(await db().from("profiles").update({ current_level: next, level_source: "progress" }).eq("id", user.id));
  return json({ level: next, source: "progress" });
});

export const config: Config = { path: "/api/level/advance", method: "POST" };
