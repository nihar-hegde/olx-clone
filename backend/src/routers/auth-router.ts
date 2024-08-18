import express from "express";
import { login, logout, register } from "../controllers/auth.controller";
import { isAuthenticated } from "../middleware.ts";

const authRouter = express.Router();

authRouter.post("/login", login);
authRouter.post("/register", register);
authRouter.get("/logout", isAuthenticated, logout);

export default authRouter;
