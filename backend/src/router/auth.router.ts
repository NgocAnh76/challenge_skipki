import express from "express";
import authController from "../controllers/auth.controller";

const authRouter = express.Router();

authRouter.post("/access-code", authController.accessCode);
authRouter.post("/validate-code", authController.validateCode);

export default authRouter;
