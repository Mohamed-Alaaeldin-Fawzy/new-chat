import { NextFunction, Response, Request } from "express";

export const asyncErrorHandler =
  (cb: (req: Request, res: Response, next: NextFunction) => Promise<any>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await cb(req, res, next);
    } catch (error) {
      console.log(error);
      next(error);
    }
  };
