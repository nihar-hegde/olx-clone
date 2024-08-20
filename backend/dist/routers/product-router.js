"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const middleware_1 = require("../middleware");
const product_controller_1 = require("../controllers/product.controller");
const productRouter = express_1.default.Router();
productRouter.post("/create", middleware_1.isAuthenticated, product_controller_1.addProduct);
productRouter.get("/all", product_controller_1.getAllUnsoldProducts);
productRouter.put("/:id", middleware_1.isAuthenticated, middleware_1.isProductOwner, product_controller_1.updateProduct);
productRouter.get("/one/:id", middleware_1.isAuthenticated, middleware_1.isProductOwner, product_controller_1.getSingleProduct);
productRouter.delete("/:id", middleware_1.isAuthenticated, middleware_1.isProductOwner, product_controller_1.deleteProduct);
productRouter.put("/buy/:id", middleware_1.isAuthenticated, product_controller_1.buyProduct);
productRouter.get("/posted", middleware_1.isAuthenticated, product_controller_1.getAllPostedProducts);
productRouter.get("/purchased", middleware_1.isAuthenticated, product_controller_1.getAllPurchasedProducts);
exports.default = productRouter;
