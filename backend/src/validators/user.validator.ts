import z, { ParseStatus } from "zod";

export const register_validator = z.object({
  name: z.string(),
  username: z.string(),
  email: z.string().email(),
  password: z
    .string()
    .min(6, { message: "Password must be atleast 6 charecters long!" }),
});

export const login_validator = z.object({
  email: z.string().email(),
  password: z.string(),
});
