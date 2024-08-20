"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllPostedProducts = exports.getAllPurchasedProducts = exports.buyProduct = exports.deleteProduct = exports.updateProduct = exports.addProduct = exports.getSingleProduct = exports.getAllUnsoldProducts = void 0;
const product_validator_1 = require("../validators/product.validator");
const product_1 = require("../db/product");
const user_1 = require("../db/user");
const mongoose_1 = __importStar(require("mongoose"));
const getAllUnsoldProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield (0, product_1.getAllProducts)();
        res
            .status(200)
            .json({ message: "Products fetched successfully!", products });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error", error });
    }
});
exports.getAllUnsoldProducts = getAllUnsoldProducts;
const getSingleProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productId = req.params.id;
        const product = yield (0, product_1.getProductById)(productId);
        res.status(200).json({ message: "Product fetched successfully!", product });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error", error });
    }
});
exports.getSingleProduct = getSingleProduct;
const addProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        const validateData = product_validator_1.product_validator.safeParse(data);
        if (!validateData.success) {
            return res.status(400).json({
                message: "Invalid Input Data",
                error: validateData.error.message,
            });
        }
        const productData = Object.assign(Object.assign({}, validateData.data), { seller: req.indentity._id });
        const newProduct = yield (0, product_1.createProduct)(productData);
        yield (0, user_1.postedProductUpdate)(req.indentity._id, newProduct._id);
        return res
            .status(201)
            .json({ message: "Product created", data: newProduct });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: error });
    }
});
exports.addProduct = addProduct;
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        const productId = req.params.id;
        const validatedData = product_validator_1.product_validator.safeParse(data);
        if (!validatedData.success) {
            return res.status(400).json({
                message: "Invalid Input Data",
                error: validatedData.error.message,
            });
        }
        const product = yield (0, product_1.updateProductById)(productId, validatedData.data);
        res.status(200).json({ message: "Product updated successflly!", product });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error", error });
    }
});
exports.updateProduct = updateProduct;
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield mongoose_1.default.startSession();
    session.startTransaction();
    try {
        const productId = req.params.id;
        const deletedProduct = yield (0, product_1.deleteProductById)(productId);
        if (!deletedProduct) {
            yield session.abortTransaction();
            return res.status(404).json({ message: "Product not found" });
        }
        // Update all users to remove the product from postedProducts and purchasedProducts
        yield user_1.UserModel.updateMany({
            $or: [{ postedProducts: productId }, { purchasedProducts: productId }],
        }, {
            $pull: {
                postedProducts: productId,
                purchasedProducts: productId,
            },
        }).session(session);
        yield session.commitTransaction();
        res
            .status(200)
            .json({ message: "Product deleted successfully!", deletedProduct });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error", error });
    }
});
exports.deleteProduct = deleteProduct;
const buyProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productId = req.params.id;
        const buyerId = req.indentity._id;
        const product = yield (0, product_1.getProductById)(productId);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        if (product.isSold === true) {
            return res.status(400).json({ message: "Product is already sold" });
        }
        if (product.seller._id.toString() === buyerId.toString()) {
            return res
                .status(400)
                .json({ message: "You can't buy your own product" });
        }
        product.isSold = true;
        product.buyer = new mongoose_1.Types.ObjectId(buyerId);
        yield product.save();
        const buyer = yield (0, user_1.getUserById)(buyerId.toString());
        if (!buyer) {
            return res.status(404).json({ message: "Buyer not found" });
        }
        buyer.purchasedProducts.push(product._id);
        yield buyer.save();
        res.status(200).json({ message: "Product Purchase successful", product });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error", error });
    }
});
exports.buyProduct = buyProduct;
const getAllPurchasedProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.indentity._id;
        const products = yield user_1.UserModel.findById(userId).populate("purchasedProducts");
        res
            .status(200)
            .json({ message: "Products fetched successfully!", products });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error", error });
    }
});
exports.getAllPurchasedProducts = getAllPurchasedProducts;
const getAllPostedProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.indentity._id;
        const products = yield user_1.UserModel.findById(userId).populate("postedProducts");
        res
            .status(200)
            .json({ message: "Products fetched successfully!", products });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error", error });
    }
});
exports.getAllPostedProducts = getAllPostedProducts;
