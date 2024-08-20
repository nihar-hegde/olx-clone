"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("../controllers/auth.controller");
const middleware_1 = require("../middleware");
const authRouter = express_1.default.Router();
authRouter.post("/login", auth_controller_1.login);
authRouter.post("/register", auth_controller_1.register);
authRouter.get("/logout", middleware_1.isAuthenticated, auth_controller_1.logout);
authRouter.get("/me", middleware_1.isAuthenticated, auth_controller_1.isLoggedIn);
exports.default = authRouter;
