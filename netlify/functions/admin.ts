import type { Config, Context } from "@netlify/functions";
import { z } from "zod";
import { requireAdmin } from "../lib/auth.ts";
import { db, must } from "../lib/db.ts";
import { handle, HttpError, json, readBody } from "../lib/http.ts";
import type { LessonRow } from "../lib/lessons.ts";
import { addDays, utcToday } from "../lib/time.ts";
import { triggerBackground } from "../lib/trigger.ts";
import { LessonContentSchema, validateLessonShape } from "../../shared/lesson-schema.ts";
import { LEVELS } from "../../shared/levels.ts";

const LessonUpdate = z.object({
  content: LessonContentSchema.optional(),
  status: z.enum(["draft", "approved"]).optional(),
});

// Admin API (US-3.2 review queue, US-7.2 metrics):
//   GET  /api/admin/lessons?status=draft         list (last 14 days + upcoming)
//   GET  /api/admin/lessons/:id                  full lesson incl. answers
//   PUT  /api/admin/lessons/:id                  edit content and/or approve
//   POST /api/admin/lessons/:id/regenerate       regenerate in the background
//   POST /api/admin/generate                     fill in missing lessons now
//   GET  /api/admin/metrics                      dashboard numbers
export default handle(async (req, context: Context) => {
  const admin = await requireAdmin(req);
  const path = new URL(req.url).pathname;
  const id = context.params.id;

  if (path === "/api/admin/metrics" && req.method === "GET") {
    return json(must(await db().rpc("admin_metrics")));
  }

  if (path === "/api/admin/generate" && req.method === "POST") {
    const body = await readBody(req, z.object({ dates: z.array(z.string()).optional(), levels: z.array(z.enum(LEVELS)).optional() }));
    await triggerBackground("generate-lessons-background", body);
    return json({ triggered: true }, 202);
  }

  if (path === "/api/admin/lessons" && req.method === "GET") {
    const status = new URL(req.url).searchParams.get("status");
    let query = db()
      .from("lessons")
      .select("id, level, date, theme, status, model, reviewed_by, updated_at")
      .gte("date", addDays(utcToday(), -14))
      .order("date", { ascending: false })
      .order("level");
    if (status === "draft" || status === "approved") query = query.eq("status", status);
    return json({ lessons: must(await query) });
  }

  if (!id) throw new HttpError(404, "Not found");
  const lesson = must(await db().from("lessons").select("*").eq("id", id).maybeSingle()) as LessonRow | null;
  if (!lesson) throw new HttpError(404, "Lesson not found");

  if (path.endsWith("/regenerate") && req.method === "POST") {
    await triggerBackground("generate-lessons-background", { levels: [lesson.level], dates: [lesson.date], force: true });
    return json({ triggered: true }, 202);
  }

  if (req.method === "GET") return json(lesson);

  if (req.method === "PUT") {
    const body = await readBody(req, LessonUpdate);
    const update: Record<string, unknown> = { updated_at: new Date().toISOString(), reviewed_by: admin.id };
    if (body.content) {
      const problems = validateLessonShape(body.content);
      if (problems.length) throw new HttpError(400, "Lesson is invalid", { issues: problems });
      update.content = { ...body.content, level: lesson.level, date: lesson.date };
      update.theme = body.content.theme;
    }
    if (body.status) update.status = body.status;
    const saved = must(await db().from("lessons").update(update).eq("id", id).select("*").single());
    return json(saved);
  }

  throw new HttpError(405, "Method not allowed");
});

export const config: Config = {
  path: [
    "/api/admin/metrics",
    "/api/admin/generate",
    "/api/admin/lessons",
    "/api/admin/lessons/:id",
    "/api/admin/lessons/:id/regenerate",
  ],
};
