import { Request, Response } from "express";
import {
  validateEmail,
  validateName,
  validatePassword,
} from "../utils/validators";
import User from "../models/userModel";
import bcrypt from "bcrypt";
import { getGender, getProfileImages } from "../utils/functions";
import cloudinary from "../services/cloudinary";

//updating user information
export const userUpdate = async (req: Request, res: Response) => {
  try {
    const { username, gender, profileImage, x, y, height, width } = req.body;

    if (!username || !gender || !profileImage) {
      return res.status(400).send(" Please fill all the required fields");
    }

    //validating username(Name must be at least 3 character long and must not include numbers or special characters)
    if (!validateName(username)) {
      return res.status(400).send("Invalid name");
    }
    // getting user from middleware
    const user = Object(req)["user"];
    if (x === 0 && y === 0 && height === 0 && width === 0) {
      user.username = username;
      user.gender = gender;
    } else {
      const result = await cloudinary.uploader.upload(profileImage, {
        crop: "crop",
        height,
        width,
        x,
        y,
      });
      user.profileImage = result.secure_url;
    }
    await user.save();
    return res.status(200).send("User successfully updated");
  } catch (error) {
    console.log(error);
    return res.status(500).send((error as Error).message);
  }
};
