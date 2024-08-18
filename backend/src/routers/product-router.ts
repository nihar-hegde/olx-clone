import express from "express";
import { isAuthenticated, isProductOwner } from "../middleware/index.js";
import {
  addProduct,
  deleteProduct,
  getAllUnsoldProducts,
  updateProduct,
} from "../controllers/product.controller";

const productRouter = express.Router();

productRouter.post("/create", isAuthenticated, addProduct);
productRouter.get("/all", getAllUnsoldProducts);
productRouter.put("/:id", isAuthenticated, isProductOwner, updateProduct);
productRouter.delete("/:id", isAuthenticated, isProductOwner, deleteProduct);

export default productRouter;
