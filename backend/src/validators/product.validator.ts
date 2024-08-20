import z from "zod";

export const product_validator = z.object({
  productName: z.string(),
  price: z.coerce.number(),
  isSold: z.boolean(),
  imageUrl: z.string(),
});
