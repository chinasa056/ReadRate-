import { NextFunction, Request, Response } from "express";
import AuthorizationError from "../../core/errors/AuthorizationError";

export const authorizeAdmin = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (req.user && req.user.isAdmin) {
    return next();
  }
  next(
    new AuthorizationError(
      "Authorization denied. Admin privileges required", null)
  );
};