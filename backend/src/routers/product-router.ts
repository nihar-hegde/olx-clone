import express from "express";
import { isAuthenticated, isProductOwner } from "../middleware";
import {
  addProduct,
  buyProduct,
  deleteProduct,
  getAllPostedProducts,
  getAllPurchasedProducts,
  getAllUnsoldProducts,
  updateProduct,
} from "../controllers/product.controller";

const productRouter = express.Router();

productRouter.post("/create", isAuthenticated, addProduct);
productRouter.get("/all", getAllUnsoldProducts);
productRouter.put("/:id", isAuthenticated, isProductOwner, updateProduct);
productRouter.delete("/:id", isAuthenticated, isProductOwner, deleteProduct);
productRouter.put("/buy/:id", isAuthenticated, buyProduct);
productRouter.get("/posted", isAuthenticated, getAllPostedProducts);
productRouter.get("/purchased", isAuthenticated, getAllPurchasedProducts);

export default productRouter;
