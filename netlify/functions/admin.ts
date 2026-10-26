import type { Config, Context } from "@netlify/functions";
import { z } from "zod";
import { requireAdmin } from "../lib/auth.ts";
import { db, must } from "../lib/db.ts";
import { handle, HttpError, json, readBody } from "../lib/http.ts";
import type { LessonRow } from "../lib/lessons.ts";
import { LessonContentSchema, validateLessonShape } from "../../shared/lesson-schema.ts";
import { isLevel } from "../../shared/levels.ts";

const LessonUpdate = z.object({
  content: LessonContentSchema.optional(),
  status: z.enum(["draft", "approved"]).optional(),
});

// Admin API (course editor + US-7.2 metrics):
//   GET /api/admin/lessons?level=B1   lessons of a level, in course order
//   GET /api/admin/lessons/:id        full lesson including answers
//   PUT /api/admin/lessons/:id        edit content and/or publish / unpublish
//   GET /api/admin/metrics            dashboard numbers
export default handle(async (req, context: Context) => {
  const admin = await requireAdmin(req);
  const url = new URL(req.url);
  const id = context.params.id;

  if (url.pathname === "/api/admin/metrics" && req.method === "GET") {
    return json(must(await db().rpc("admin_metrics")));
  }

  if (url.pathname === "/api/admin/lessons" && req.method === "GET") {
    let query = db()
      .from("lessons")
      .select("id, level, seq, theme, status, updated_at")
      .not("seq", "is", null)
      .order("level")
      .order("seq");
    const level = url.searchParams.get("level");
    if (isLevel(level)) query = query.eq("level", level);
    return json({ lessons: must(await query) });
  }

  if (!id) throw new HttpError(404, "Not found");
  const lesson = must(await db().from("lessons").select("*").eq("id", id).maybeSingle()) as LessonRow | null;
  if (!lesson) throw new HttpError(404, "Lesson not found");

  if (req.method === "GET") return json(lesson);

  if (req.method === "PUT") {
    const body = await readBody(req, LessonUpdate);
    const update: Record<string, unknown> = { updated_at: new Date().toISOString(), reviewed_by: admin.id };
    if (body.content) {
      const problems = validateLessonShape(body.content);
      if (problems.length) throw new HttpError(400, "Lesson is invalid", { issues: problems });
      update.content = { ...body.content, level: lesson.level, seq: lesson.seq };
      update.theme = body.content.theme;
    }
    if (body.status) update.status = body.status;
    return json(must(await db().from("lessons").update(update).eq("id", id).select("*").single()));
  }

  throw new HttpError(405, "Method not allowed");
});

export const config: Config = {
  path: ["/api/admin/metrics", "/api/admin/lessons", "/api/admin/lessons/:id"],
};
