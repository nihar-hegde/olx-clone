import express from "express";
import { login, logout, register } from "../controllers/auth.controller";
import { verifyToken } from "../middleware.ts";

const authRouter = express.Router();

authRouter.post("/login", login);
authRouter.post("/register", register);
authRouter.get("/logout", verifyToken, logout);

export default authRouter;
