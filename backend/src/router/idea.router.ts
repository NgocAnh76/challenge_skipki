import express from "express";
import ideaController from "../controllers/idea.controller";

const ideaRouter = express.Router();

ideaRouter.post("/", ideaController.createIdea);
ideaRouter.post("/generate-caption", ideaController.createCaptionByIdea);

export default ideaRouter;
