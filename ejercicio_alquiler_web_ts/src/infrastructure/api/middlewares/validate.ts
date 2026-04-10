import { Request, Response, NextFunction } from "express";
import { ZodTypeAny } from "zod";

function hasIssueForPath(issues: { path: PropertyKey[] }[], path: string) {
  return issues.some((i) => i.path.join(".") === path);
}

export function validateBody(schema: ZodTypeAny) {
  return (req: Request, res: Response, next: NextFunction) => {
    const parsed = schema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({
        error: parsed.error.issues[0].message,
      });
    }
    req.body = parsed.data;
    next();
  };
}

export function validateParams(schema: ZodTypeAny) {
  return (req: Request, res: Response, next: NextFunction) => {
    const parsed = schema.safeParse(req.params);
    if (!parsed.success) {
      return res.status(400).json({
        error: parsed.error.issues[0].message,
      });
    }
    req.params = parsed.data;
    next();
  };
}
