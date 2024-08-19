import express from "express";
import {
  isLoggedIn,
  login,
  logout,
  register,
} from "../controllers/auth.controller";
import { isAuthenticated } from "../middleware";

const authRouter = express.Router();

authRouter.post("/login", login);
authRouter.post("/register", register);
authRouter.get("/logout", isAuthenticated, logout);
authRouter.get("/me", isAuthenticated, isLoggedIn);

export default authRouter;
