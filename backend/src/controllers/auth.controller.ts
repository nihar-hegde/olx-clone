import { Request, Response } from "express";
import {
  login_validator,
  register_validator,
} from "../validators/user.validator";
import { getUserByEmail, registerUser } from "../db/user";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET!;

if (!JWT_SECRET) {
  console.log("JWT SECRET NOT FOUND");
}

export const register = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const validatedData = register_validator.safeParse(data);
    if (!validatedData.success) {
      res.status(400).json({
        message: "Invalid Input Data",
        error: validatedData.error.message,
      });
    } else {
      // check if email is already taken:
      const existingUser = await getUserByEmail(validatedData.data.email);

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

      const newUser = await registerUser(userData);

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

export const login = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const validatedData = login_validator.safeParse(data);
    if (!validatedData.success) {
      return res.status(400).json({
        message: "Invalid Input Data",
        error: validatedData.error.message,
      });
    }
    const user = await getUserByEmail(validatedData.data.email);

    if (!user) {
      return res.status(400).json({
        message: "User not found!",
      });
    }

    const isPsswordValid = await bcryptjs.compare(
      validatedData.data.password,
      user.password
    );

    if (!isPsswordValid) {
      return res.status(401).json({
        message: "Invalid Password!",
      });
    }

    const token = jwt.sign({ id: user.id }, JWT_SECRET, {
      expiresIn: "1h",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 3600000,
    });

    res.status(200).send({
      id: user.id,
      email: user.email,
      message: "Login successful!",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Something went wrong!",
      error: error,
    });
  }
};

export const logout = (req: Request, res: Response) => {
  res.clearCookie("token");
  res.status(200).send({ message: "Logged out successfully" });
};
