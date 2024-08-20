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
exports.isProductOwner = exports.isAuthenticated = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = require("../db/user");
const product_1 = require("../db/product");
dotenv_1.default.config();
if (!process.env.JWT_SECRET) {
    console.log("JWT_SECRET not found");
}
// NOTE: Middleware to verify the jwt token.
const isAuthenticated = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.cookies.token;
    if (!token) {
        return res
            .status(401)
            .json({ message: "Authentication required. Please log in." });
    }
    try {
        const verify = yield jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        const id = verify.id;
        const existingUser = yield (0, user_1.getUserById)(id);
        if (!existingUser) {
            return res.status(403).send({ message: "User Not Found" });
        }
        req.indentity = existingUser;
        next();
    }
    catch (error) {
        console.log(error);
        return res.status(401).json({ message: "Unauthorized, invalid token" });
    }
});
exports.isAuthenticated = isAuthenticated;
const isProductOwner = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.indentity._id;
        const productId = req.params.id;
        const getProduct = yield (0, product_1.getProductById)(productId);
        if (!getProduct) {
            return res.status(400).json({ message: "Product Not Found" });
        }
        if (userId.toString() !== getProduct.seller.toString()) {
            return res.status(400).json({
                message: "Unauthorized! You are not the owner of this product!",
            });
        }
        next();
    }
    catch (error) {
        console.log(error);
        return res.status(403).send({ error });
    }
});
exports.isProductOwner = isProductOwner;
