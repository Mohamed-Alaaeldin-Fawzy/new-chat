import { BaseError } from "../Error/baseError";
import { Request, Response, NextFunction } from "express";

export const errorHandler = (
  err: BaseError,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const statusCode = err.statusCode ? err.statusCode : 500;
  res.status(statusCode);
  res.json({
    success: false,
    message: err.message,
  });
};
