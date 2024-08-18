import express from "express";
import authRouter from "./auth-router";
import productRouter from "./product-router";

const router = express.Router();

router.use("/auth", authRouter);
router.use("/product", productRouter);

export default router;
