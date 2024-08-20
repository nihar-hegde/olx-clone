"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isLoggedIn = exports.logout = exports.login = exports.register = void 0;
const user_validator_1 = require("../validators/user.validator");
const user_1 = require("../db/user");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
    console.log("JWT SECRET NOT FOUND");
}
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        const validatedData = user_validator_1.register_validator.safeParse(data);
        if (!validatedData.success) {
            res.status(400).json({
                message: "Invalid Input Data",
                error: validatedData.error.message,
            });
        }
        else {
            // check if email is already taken:
            const existingUser = yield (0, user_1.getUserByEmail)(validatedData.data.email);
            if (existingUser) {
                return res.status(400).json({
                    message: "Email already taken!",
                });
            }
            const hashedPassword = yield bcryptjs_1.default.hash(validatedData.data.password, 10);
            const userData = Object.assign(Object.assign({}, validatedData.data), { password: hashedPassword });
            const newUser = yield (0, user_1.registerUser)(userData);
            if (newUser) {
                return res.status(201).json({
                    message: "User Registered Successfully!",
                    data: newUser,
                });
            }
            else {
                return res.status(500).json({
                    message: "Error Registering User!",
                });
            }
        }
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Something went wrong!",
            error: error,
        });
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        const validatedData = user_validator_1.login_validator.safeParse(data);
        if (!validatedData.success) {
            return res.status(400).json({
                message: "Invalid Input Data",
                error: validatedData.error.message,
            });
        }
        const user = yield (0, user_1.getUserByEmail)(validatedData.data.email);
        if (!user) {
            return res.status(400).json({
                message: "User not found!",
            });
        }
        const isPsswordValid = yield bcryptjs_1.default.compare(validatedData.data.password, user.password);
        if (!isPsswordValid) {
            return res.status(401).json({
                message: "Invalid Password!",
            });
        }
        const token = jsonwebtoken_1.default.sign({ id: user.id }, JWT_SECRET, {
            expiresIn: "1h",
        });
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 3600000,
        });
        res.status(200).send({
            id: user.id,
            email: user.email,
            name: user.name,
            message: "Login successful!",
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Something went wrong!",
            error: error,
        });
    }
});
exports.login = login;
const logout = (req, res) => {
    res.clearCookie("token");
    res.status(200).send({ message: "Logged out successfully" });
};
exports.logout = logout;
const isLoggedIn = (req, res) => {
    try {
        const user = req.indentity;
        res.json(user);
    }
    catch (error) {
        console.log(error);
    }
};
exports.isLoggedIn = isLoggedIn;
