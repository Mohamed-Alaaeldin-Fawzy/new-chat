import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

const jwtSecret = process.env.JWT_SECRET;

export function isAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
): void | Response {
  const authHeaders = req.headers.authorization;

  const token = authHeaders && authHeaders.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ message: "Unauthorized - Please provide a token" });
  }

  // check if password is correct

  jwt.verify(token, jwtSecret, (err, decoded: JwtPayload) => {
    if (err) {
      return res.status(401).json({ message: "Unauthorized - Invalid token" });
    }

    req.app.locals.userId = decoded.id;
    next();
  });
}
