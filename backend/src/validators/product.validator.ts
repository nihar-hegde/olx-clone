import z from "zod";

export const product_validator = z.object({
  productName: z.string(),
  price: z.number(),
  isSold: z.boolean(),
  imageUrl: z.string(),
});
