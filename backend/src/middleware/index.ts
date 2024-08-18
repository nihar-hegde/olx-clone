import dotenv from "dotenv";
import e, { NextFunction, Request, Response } from "express";
import { ObjectId } from "mongodb";
import jwt, { JwtPayload } from "jsonwebtoken";
import { getUserById } from "../db/user";
import { getProductById } from "../db/product";

dotenv.config();
interface IdentidyI {
  _id: string | ObjectId;
  email: string;
}

declare global {
  namespace Express {
    interface Request {
      indentity: IdentidyI;
    }
  }
}

if (!process.env.JWT_SECRET) {
  console.log("JWT_SECRET not found");
}

// NOTE: Middleware to verify the jwt token.
export const isAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.token;
  if (!token) {
    return res
      .status(401)
      .json({ message: "Authentication required. Please log in." });
  }
  try {
    const verify = await jwt.verify(token, process.env.JWT_SECRET!);
    const id = (verify as JwtPayload).id;

    const existingUser = await getUserById(id);
    if (!existingUser) {
      return res.status(403).send({ message: "User Not Found" });
    }
    req.indentity = existingUser;
    next();
  } catch (error) {
    console.log(error);
    return res.status(403).send({ error });
  }
};

export const isProductOwner = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.indentity._id;
    const productId = req.params.id;

    const getProduct = await getProductById(productId);

    if (!getProduct) {
      return res.status(400).json({ message: "Product Not Found" });
    }

    if (userId.toString() !== getProduct.seller.toString()) {
      return res.status(400).json({
        message: "Unauthorized! You are not the owner of this product!",
      });
    }

    next();
  } catch (error) {
    console.log(error);
    return res.status(403).send({ error });
  }
};
