import express from "express";
import captionController from "../controllers/caption.controller";

const captionRouter = express.Router();

captionRouter.post("/generate", captionController.generateCaption);
captionRouter.post("/", captionController.createCaption);
captionRouter.get("/", captionController.getCaptions);
captionRouter.delete("/:id", captionController.deleteCaption);
export default captionRouter;
