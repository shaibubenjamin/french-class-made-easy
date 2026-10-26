import type { Config } from "@netlify/functions";
import { z } from "zod";
import { requireUser } from "../lib/auth.ts";
import { db, must } from "../lib/db.ts";
import { handle, json, readBody } from "../lib/http.ts";
import { LEVELS } from "../../shared/levels.ts";

const Body = z.object({
  level: z.enum(LEVELS),
  source: z.enum(["quiz", "self"]),
});

// POST /api/level — accept the quiz recommendation or pick a level (US-2.3, US-2.4).
export default handle(async (req) => {
  const user = await requireUser(req);
  const { level, source } = await readBody(req, Body);
  must(
    await db().from("profiles").update({ current_level: level, level_source: source }).eq("id", user.id),
  );
  return json({ level, source });
});

export const config: Config = { path: "/api/level", method: "POST" };
