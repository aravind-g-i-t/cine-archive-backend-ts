import crypto from "crypto";
import type { Request, Response, NextFunction } from "express";

export const handleSessionId = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let sessionId = req.cookies?.sessionId;

  if (!sessionId) {
    sessionId = crypto.randomUUID();

    res.cookie("sessionId", sessionId, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });
  }

  req.sessionId = sessionId;
  next();
};