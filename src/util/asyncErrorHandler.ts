export const asyncErrorHandler =
  (cb: (req: any, res: any, next: any) => Promise<any>) =>
  async (req: any, res: any, next: any) => {
    try {
      await cb(req, res, next);
    } catch (error) {
      next(error);
    }
  };
