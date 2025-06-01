import { Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { ACCESS_TOKEN_SECRET } from "../constant";
import { AuthRequest } from "../types/auth.types";

export const protect = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ message: "No token provided" });
    return;
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(
      token,
      ACCESS_TOKEN_SECRET as string
    ) as JwtPayload;
    req.user = decoded as JwtPayload & { phoneNumber: string };
    next();
  } catch (err) {
    next(err);
  }
};
