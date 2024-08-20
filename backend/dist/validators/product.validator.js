"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.product_validator = void 0;
const zod_1 = __importDefault(require("zod"));
exports.product_validator = zod_1.default.object({
    productName: zod_1.default.string(),
    price: zod_1.default.coerce.number(),
    isSold: zod_1.default.boolean(),
    imageUrl: zod_1.default.string(),
});
