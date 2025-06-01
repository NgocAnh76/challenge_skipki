import { NextFunction, Request, Response } from "express";
import { responseSuccess } from "../common/helpers/response.helper";
import captionService from "../services/caption.service";
import { z } from "zod";
import { AuthRequest } from "../common/types/auth.types";

const GenerateCaptionSchema = z.object({
  socialMedia: z.string(),
  subject: z.string(),
  tone: z.string(),
});

const CreateCaptionSchema = z.object({
  topic: z.string(),
  content: z.string(),
});

class CaptionController {
  async generateCaption(req: Request, res: Response, next: NextFunction) {
    try {
      const { socialMedia, subject, tone } = GenerateCaptionSchema.parse(
        req.body
      );
      const newCaption = await captionService.generateCaption(
        socialMedia,
        subject,
        tone
      );
      const resData = responseSuccess(
        newCaption,
        `Caption created successfully`,
        200
      );
      res.status(resData.code).json(resData);
    } catch (error) {
      next(error);
    }
  }
  async createCaption(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { phoneNumber } = req.user || {};
      if (!phoneNumber) {
        throw new Error("User not found");
      }
      const { topic, content } = CreateCaptionSchema.parse(req.body);
      const newContent = await captionService.createCaption({
        topic,
        content,
        phoneNumber,
      });
      const resData = responseSuccess(
        newContent,
        `Content created successfully`,
        200
      );
      res.status(resData.code).json(resData);
    } catch (error) {
      next(error);
    }
  }

  async getCaptions(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { phoneNumber } = req.user || {};
      if (!phoneNumber) {
        throw new Error("User not found");
      }
      const contents = await captionService.getCaptions(phoneNumber);
      const resData = responseSuccess(
        contents,
        `Contents fetched successfully`,
        200
      );
      res.status(resData.code).json(resData);
    } catch (error) {
      next(error);
    }
  }

  async deleteCaption(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { phoneNumber } = req.user || {};
      const { id } = req.params;
      if (!phoneNumber) {
        throw new Error("User not found");
      }
      const deletedContent = await captionService.deleteCaption(
        id,
        phoneNumber
      );
      const resData = responseSuccess(
        deletedContent,
        `Content deleted successfully`,
        200
      );
      res.status(resData.code).json(resData);
    } catch (error) {
      next(error);
    }
  }
}

export default new CaptionController();
