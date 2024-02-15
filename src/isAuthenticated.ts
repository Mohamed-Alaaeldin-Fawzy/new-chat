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
  const authHeaders = req.headers.authorization;

  const token = authHeaders && authHeaders.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ message: "Unauthorized - Please provide a token" });
  }

  // check if password is correct

  jwt.verify(token, jwtSecret, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Unauthorized - Invalid token" });
    }

    req.user = decoded as Object;
    req.app.locals.user = decoded as Object;
    next();
  });
}
