import jwt, { JwtPayload } from "jsonwebtoken";
import { User } from "./model/user";
import { Request, Response, NextFunction } from "express";

const jwtSecret = process.env.JWT_SECRET;

export interface AuthenticatedRequest extends Request {
  user?: User | JwtPayload;
}
export function isAuthenticated(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) {
  const token = req.headers.authorization;

  if (!token) {
    return res
      .status(401)
      .json({ message: "Unauthorized - Please provide a token" });
  }

  jwt.verify(token, jwtSecret, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Unauthorized - Invalid token" });
    }

    req.user = decoded as any;
    next();
  });
}
