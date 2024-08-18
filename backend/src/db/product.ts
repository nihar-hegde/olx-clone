import mongoose from "mongoose";

import { ObjectId } from "mongodb";

const ProductSchema = new mongoose.Schema({
  productName: { type: String, required: true },
  price: { type: Number, required: true },
  isSold: { type: Boolean, default: false },
  imageUrl: { type: String, required: true },
  seller: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  buyer: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

export const ProductModel = mongoose.model("Product", ProductSchema);

export const createProduct = (value: Record<string, any>) =>
  ProductModel.create(value);

export const getProductById = (id: string) => ProductModel.findById(id);

export const getAllProducts = () => ProductModel.find().where("isSold", false);

export const getAllProductsToDisplay = (sellerId: string | ObjectId) => {
  return ProductModel.find({
    isSold: false,
    $or: [{ sellerId: { $ne: sellerId } }, { sellerId: null }],
  });
};

export const getProductBySellerId = (id: string) =>
  ProductModel.find({ seller: id });

export const getProductByBuyerId = (id: string) =>
  ProductModel.find({ buyer: id });

export const updateProductById = (id: string, value: Record<string, any>) =>
  ProductModel.findByIdAndUpdate(id, value);

export const deleteProductById = (id: string) =>
  ProductModel.findByIdAndDelete(id);
