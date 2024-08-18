import mongoose from "mongoose";

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

export const getProductBySellerId = (id: string) =>
  ProductModel.find({ seller: id });

export const getProductByBuyerId = (id: string) =>
  ProductModel.find({ buyer: id });

export const updateProductById = (id: string, value: Record<string, any>) =>
  ProductModel.findByIdAndUpdate(id, value);

export const deleteProductById = (id: string) =>
  ProductModel.findByIdAndDelete(id);
