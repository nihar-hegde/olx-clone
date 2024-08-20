"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProductById = exports.updateProductById = exports.getProductByBuyerId = exports.getProductBySellerId = exports.getAllProductsToDisplay = exports.getAllProducts = exports.getProductById = exports.createProduct = exports.ProductModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const ProductSchema = new mongoose_1.default.Schema({
    productName: { type: String, required: true },
    price: { type: Number, required: true },
    isSold: { type: Boolean, default: false },
    imageUrl: { type: String, required: true },
    seller: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "User", required: true },
    buyer: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "User" },
});
exports.ProductModel = mongoose_1.default.model("Product", ProductSchema);
const createProduct = (value) => exports.ProductModel.create(value);
exports.createProduct = createProduct;
const getProductById = (id) => exports.ProductModel.findById(id);
exports.getProductById = getProductById;
const getAllProducts = () => exports.ProductModel.find().where("isSold", false);
exports.getAllProducts = getAllProducts;
const getAllProductsToDisplay = (sellerId) => {
    return exports.ProductModel.find({
        isSold: false,
        $or: [{ sellerId: { $ne: sellerId } }, { sellerId: null }],
    });
};
exports.getAllProductsToDisplay = getAllProductsToDisplay;
const getProductBySellerId = (id) => exports.ProductModel.find({ seller: id });
exports.getProductBySellerId = getProductBySellerId;
const getProductByBuyerId = (id) => exports.ProductModel.find({ buyer: id });
exports.getProductByBuyerId = getProductByBuyerId;
const updateProductById = (id, value) => exports.ProductModel.findByIdAndUpdate(id, value);
exports.updateProductById = updateProductById;
const deleteProductById = (id) => exports.ProductModel.findByIdAndDelete(id);
exports.deleteProductById = deleteProductById;
