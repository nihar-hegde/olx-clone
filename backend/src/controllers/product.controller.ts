import { Request, Response } from "express";
import { product_validator } from "../validators/product.validator";
import {
  createProduct,
  deleteProductById,
  getAllProducts,
  getAllProductsToDisplay,
  getProductById,
  updateProductById,
} from "../db/product";
import { getUserById, postedProductUpdate, UserModel } from "../db/user";
import mongoose, { Types } from "mongoose";

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
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const productId = req.params.id;
    const deletedProduct = await deleteProductById(productId);

    if (!deletedProduct) {
      await session.abortTransaction();
      return res.status(404).json({ message: "Product not found" });
    }

    // Update all users to remove the product from postedProducts and purchasedProducts
    await UserModel.updateMany(
      {
        $or: [{ postedProducts: productId }, { purchasedProducts: productId }],
      },
      {
        $pull: {
          postedProducts: productId,
          purchasedProducts: productId,
        },
      }
    ).session(session);

    await session.commitTransaction();

    res
      .status(200)
      .json({ message: "Product deleted successfully!", deletedProduct });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error", error });
  }
};

export const buyProduct = async (req: Request, res: Response) => {
  try {
    const productId = req.params.id;
    const buyerId = req.indentity._id;
    const product = await getProductById(productId);
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
    product.buyer = new Types.ObjectId(buyerId);
    await product.save();

    const buyer = await getUserById(buyerId.toString());
    if (!buyer) {
      return res.status(404).json({ message: "Buyer not found" });
    }
    buyer.purchasedProducts.push(product._id);
    await buyer.save();

    res.status(200).json({ message: "Product Purchase successful", product });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error", error });
  }
};

export const getAllPurchasedProducts = async (req: Request, res: Response) => {
  try {
    const userId = req.indentity._id;
    const products = await UserModel.findById(userId).populate(
      "purchasedProducts"
    );
    res
      .status(200)
      .json({ message: "Products fetched successfully!", products });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error", error });
  }
};

export const getAllPostedProducts = async (req: Request, res: Response) => {
  try {
    const userId = req.indentity._id;
    const products = await UserModel.findById(userId).populate(
      "postedProducts"
    );
    res
      .status(200)
      .json({ message: "Products fetched successfully!", products });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error", error });
  }
};
