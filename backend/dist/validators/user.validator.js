"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login_validator = exports.register_validator = void 0;
const zod_1 = __importDefault(require("zod"));
exports.register_validator = zod_1.default.object({
    name: zod_1.default.string(),
    username: zod_1.default.string(),
    email: zod_1.default.string().email(),
    password: zod_1.default
        .string()
        .min(6, { message: "Password must be atleast 6 charecters long!" }),
});
exports.login_validator = zod_1.default.object({
    email: zod_1.default.string().email(),
    password: zod_1.default.string(),
});
