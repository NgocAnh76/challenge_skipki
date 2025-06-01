import multer from "multer";
import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { responseError } from "./response.helper";
import { z } from "zod";

export const handleError = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("🚀 ~ handleError ~ err:", err);

  if (err instanceof jwt.JsonWebTokenError) {
    Object.assign(err, { code: 401 });
  }
  if (err instanceof jwt.TokenExpiredError) {
    Object.assign(err, { code: 403 });
  }
  if (err instanceof multer.MulterError) {
    Object.assign(err, { code: 400 });
  }

  if (err instanceof z.ZodError) {
    const message = err.issues[0]
      ? `${err.issues[0]?.path[0]}: ${err.issues[0]?.message}`
      : "BadRequestException";
    const resData = responseError(message, 400);
    res.status(resData.code).json(resData);
  } else {
    const resData = responseError(err.message, err.code);
    res.status(resData.code).json(resData);
  }
};

export class BadRequestException extends Error {
  constructor(message = `BadRequestException`) {
    super(message);
    Object.assign(this, { code: 400 });
  }
}

export class ForbiddenException extends Error {
  constructor(message = `ForbiddenException`) {
    super(message);
    Object.assign(this, { code: 403 });
  }
}

export class UnAuthorizationException extends Error {
  constructor(message = `UnAuthorizationException`) {
    super(message);
    Object.assign(this, { code: 401 });
  }
}
