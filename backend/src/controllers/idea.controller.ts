import { NextFunction, Request, Response } from "express";
import { responseSuccess } from "../common/helpers/response.helper";
import ideaService from "../services/idea.service";
import z from "zod";

const IdeaSchema = z.object({
  idea: z.string(),
});

class IdeaController {
  async createIdea(req: Request, res: Response, next: NextFunction) {
    try {
      const { idea } = IdeaSchema.parse(req.body);
      const newIdea = await ideaService.createIdea(idea);
      const resData = responseSuccess(
        newIdea,
        `Idea created successfully`,
        200
      );
      res.status(resData.code).json(resData);
    } catch (error) {
      next(error);
    }
  }
  async createCaptionByIdea(req: Request, res: Response, next: NextFunction) {
    try {
      const { idea } = IdeaSchema.parse(req.body);
      const newCaption = await ideaService.createCaptionByIdea(idea);
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
}

export default new IdeaController();
