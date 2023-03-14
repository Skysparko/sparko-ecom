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
import sendEmail from "../services/email";
import { emailUpdateOtpMail } from "../utils/emailTemplates";
import speakeasy from "speakeasy";
import dotenv from "dotenv";
dotenv.config();

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

export const verifyUpdatedEmail = (req: Request, res: Response) => {
  try {
    const email = req.body.email;
    if (!email) {
      return res.status(400).send(" Please fill all the required fields");
    }
    if (!validateEmail(email)) {
      return res.status(400).send("Invalid email");
    }
    // getting user from middleware
    const user = Object(req)["user"];

    const otp = speakeasy.totp({
      secret: process.env.OTP_SECRET!,
      step: 300,
      digits: 6,
    });

    user.otp = otp;
    user.save();

    const mailOptions = {
      from: "security@gmail.com",
      to: email,
      cc: [],
      bcc: [],
      subject: "Your Email Verification One-Time Password",
      html: emailUpdateOtpMail(otp),
    };
    sendEmail(mailOptions);
    return res.status(200).send("success");
  } catch (error) {
    console.log(error);
    return res.status(500).send((error as Error).message);
  }
};

export const emailUpdate = (req: Request, res: Response) => {
  try {
    const { email, otp } = req.body;

    if (!email) {
      return res.status(400).send("Please provide email address");
    }

    if (!validateEmail(email)) {
      return res.status(400).send("Invalid email");
    }
    // getting user from middleware
    if (!otp) {
      return res.status(400).send("Please Provide Otp");
    }

    const user = Object(req)["user"];

    var isOtpValid = speakeasy.totp.verify({
      secret: process.env.OTP_SECRET!,
      token: otp,
      step: 300,
      digits: 6,
    });

    if (!isOtpValid || otp !== user.otp) {
      return res.status(400).send("Invalid or expired otp");
    }

    user.email = email;
    user.otp = "000000";

    user.save();
    return res.status(200).send("success");
  } catch (error) {
    console.log(error);
    return res.status(500).send((error as Error).message);
  }
};
