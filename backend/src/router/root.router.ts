import express from "express";
import { protect } from "../common/middlewares/protect.middleware";
import authRouter from "./auth.router";
import captionRouter from "./caption.router";
import ideaRouter from "./idea.router";

const rootRouter = express.Router();

rootRouter.use("/auth", authRouter);
rootRouter.use("/caption", protect, captionRouter);
rootRouter.use("/idea", protect, ideaRouter);

rootRouter.get(`/`, (request, response, next) => {
  response.json(`ok`);
});

export default rootRouter;
