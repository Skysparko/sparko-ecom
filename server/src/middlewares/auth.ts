import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../models/userModel";
import dotenv from "dotenv";
dotenv.config();

interface JwtPayload {
  id: string;
}

//logic to check if user is logged in
export const isAuthorized = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;
    console.log(authHeader);

    //checking if there is token available or not
    if (!authHeader) {
      return res.status(401).json({
        message: "No token provided",
        error: true,
      });
    }
    // checking if token is valid
    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({
        message: "No token provided",
        error: true,
      });
    }

    // decrypting token
    const { id } = jwt.verify(token, process.env.SECRET!) as JwtPayload;
    if (!id) {
      return res.status(401).json({
        message: "Invalid token",
        error: true,
      });
    }

    //getting user information from database
    const user = await User.findById(id);

    if (!user) {
      return res.status(401).json({
        message: "Invalid token",
        error: true,
      });
    }

    //assigning user to request
    Object.assign(req, { user: user });
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).send((error as Error).message);
  }
};
