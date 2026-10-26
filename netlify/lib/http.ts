import type { Context } from "@netlify/functions";
import type { ZodType } from "zod";

export class HttpError extends Error {
  constructor(
    public status: number,
    message: string,
    public extra?: Record<string, unknown>,
  ) {
    super(message);
  }
}

export function json(body: unknown, status = 200, headers: Record<string, string> = {}): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json", "cache-control": "no-store", ...headers },
  });
}

export async function readBody<T>(req: Request, schema: ZodType<T>): Promise<T> {
  let raw: unknown;
  try {
    raw = await req.json();
  } catch {
    throw new HttpError(400, "Request body must be JSON");
  }
  const parsed = schema.safeParse(raw);
  if (!parsed.success) {
    throw new HttpError(400, "Invalid request", { issues: parsed.error.issues.map((i) => i.message) });
  }
  return parsed.data;
}

type Handler = (req: Request, context: Context) => Promise<Response>;

/** Wraps a function so thrown HttpErrors become JSON responses. */
export function handle(fn: Handler): Handler {
  return async (req, context) => {
    try {
      return await fn(req, context);
    } catch (err) {
      if (err instanceof HttpError) return json({ error: err.message, ...err.extra }, err.status);
      console.error(err);
      return json({ error: "Something went wrong. Please try again." }, 500);
    }
  };
}

export function requireMethod(req: Request, ...methods: string[]) {
  if (!methods.includes(req.method)) throw new HttpError(405, "Method not allowed");
}
