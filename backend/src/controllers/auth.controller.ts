import { NextFunction, Request, Response } from "express";
import authService from "../services/auth.service";
import { handleError } from "../common/helpers/error.helper";
import { responseSuccess } from "../common/helpers/response.helper";
import { z } from "zod";

const AccessCodeSchema = z.object({
  phoneNumber: z.string().min(1),
});

const ValidateCodeSchema = z.object({
  phoneNumber: z.string().min(1),
  code: z.string().min(6).max(6),
});

class AuthController {
  async accessCode(req: Request, res: Response, next: NextFunction) {
    try {
      const { phoneNumber } = AccessCodeSchema.parse(req.body);
      const newAccessCode = await authService.generateAccessCode(phoneNumber);
      const resData = responseSuccess(
        newAccessCode,
        `Access Code Generated Successfully`,
        200
      );

      res.status(resData.code).json(resData);
    } catch (error: any) {
      next(error);
    }
  }

  async validateCode(req: Request, res: Response, next: NextFunction) {
    try {
      const { phoneNumber, code } = ValidateCodeSchema.parse(req.body);
      const validateCode = await authService.validateCode(phoneNumber, code);
      const resData = responseSuccess(
        validateCode,
        `Code Validated Successfully`,
        200
      );
      res.status(resData.code).json(resData);
    } catch (error) {
      next(error);
    }
  }
}

export default new AuthController();
