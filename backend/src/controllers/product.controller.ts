import { Request, Response } from "express";
import { product_validator } from "../validators/product.validator";
import {
  createProduct,
  deleteProductById,
  getAllProducts,
  updateProductById,
} from "../db/product";
import { postedProductUpdate } from "../db/user";

export const getAllUnsoldProducts = async (req: Request, res: Response) => {
  try {
    const products = await getAllProducts();
    res
      .status(200)
      .json({ message: "Products fetched successfully!", products });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error", error });
  }
};

export const addProduct = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const validateData = product_validator.safeParse(data);

    if (!validateData.success) {
      return res.status(400).json({
        message: "Invalid Input Data",
        error: validateData.error.message,
      });
    }
    const productData = {
      ...validateData.data,
      seller: req.indentity._id,
    };
    const newProduct = await createProduct(productData);

    await postedProductUpdate(req.indentity._id, newProduct._id);

    return res
      .status(201)
      .json({ message: "Product created", data: newProduct });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const productId = req.params.id;
    const validatedData = product_validator.safeParse(data);

    if (!validatedData.success) {
      return res.status(400).json({
        message: "Invalid Input Data",
        error: validatedData.error.message,
      });
    }
    const product = await updateProductById(productId, validatedData.data);
    res.status(200).json({ message: "Product updated successflly!", product });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error", error });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const productId = req.params.id;
    const deletedProduct = await deleteProductById(productId);
    res
      .status(200)
      .json({ message: "Product deleted successfully!", deletedProduct });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error", error });
  }
};
