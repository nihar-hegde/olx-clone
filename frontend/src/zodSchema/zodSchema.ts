import { z } from "zod";

export const RegisterSchema = z.object({
  name: z.string().min(3, { message: "Name is too short" }),
  email: z.string().email({ message: "Invalid email address" }),
  username: z.string().min(3, { message: "Username is too short" }),
  password: z.string().min(6, { message: "Password is too short" }),
});

export const LoginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(1, { message: "Password is Required" }),
});
