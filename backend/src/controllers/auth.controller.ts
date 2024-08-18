import { Request, Response } from "express";
import { register_validator } from "../validators/user.validator";
import { get_user_by_email, register_user } from "../db/user";
import bcryptjs from "bcryptjs";

export const register = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const validatedData = register_validator.safeParse(data);
    if (!validatedData.success) {
      res.status(400).json({
        message: "Invalid Input Data",
        error: validatedData.error,
      });
    } else {
      // check if email is already taken:
      const existingUser = await get_user_by_email(validatedData.data.email);

      if (existingUser) {
        return res.status(400).json({
          message: "Email already taken!",
        });
      }

      const hashedPassword = await bcryptjs.hash(
        validatedData.data.password,
        10
      );

      const userData = { ...validatedData.data, password: hashedPassword };

      const newUser = await register_user(userData);

      if (newUser) {
        return res.status(201).json({
          message: "User Registered Successfully!",
          data: newUser,
        });
      } else {
        return res.status(500).json({
          message: "Error Registering User!",
        });
      }
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Something went wrong!",
      error: error,
    });
  }
};
