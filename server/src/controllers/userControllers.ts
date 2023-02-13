import { Response, Request } from "express";
import { Error } from "mongoose";
import {
  validateName,
  validateEmail,
  validatePassword,
} from "../utils/validators";
import User from "../models/userModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import Transporter from "../services/email";
import { getGender, getProfileImages } from "../utils/functions";
import path from "path";
import cloudinary from "../services/cloudinary";
dotenv.config();

//logic for registering the user with name, email and password
export const register = async (req: Request, res: Response) => {
  try {
    //getting values from the request

    const { username, email, password } = req.body;

    //checking whether user filled all the fields or not
    if (!username) {
      return res.status(400).send("Please Enter your name");
    }
    if (!email) {
      return res.status(400).send("Please Enter your email");
    }
    if (!password) {
      return res.status(400).send("Please Enter your password");
    }

    //validating username(Name must be at least 3 character long and must not include numbers or special characters)
    if (!validateName(username)) {
      return res.status(400).send("Invalid name");
    }
    //validating email(email should be in the email address format)
    if (!validateEmail(email)) {
      return res.status(400).send("Invalid email");
    }
    //validating password(Password must be at least 8 character long and it must include at least - one uppercase letter, one lowercase letter, one digit, one special character)
    if (!validatePassword(password)) {
      return res.status(400).send("Invalid password");
    }
    //checking whether the user already exists in the database
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(409).send("User already exists");
    }

    //encrypting password
    const hashedPassword = await bcrypt.hash(password, 10);

    // getting setting up the user's gender in the database
    const gender = await getGender(username);

    //assigning a random image according to the user's gender
    const profileImage = await getProfileImages(gender);

    //creating a new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      gender,
      profileImage,
    });

    //saving the user to the database
    await newUser.save();

    //returning the new created user in the response
    return res.status(201).send("Registration Successful");
  } catch (error) {
    //returning the error message
    console.log(error);
    return res.status(500).send((error as Error).message);
  }
};

//logic for logging in user with email and password
export const login = async (req: Request, res: Response) => {
  try {
    //getting values from the request
    const { email, password, rememberMe } = req.body;
    //checking whether user filled all the fields or not
    if (!email || !password) {
      return res.status(400).send("Please fill all fields");
    }
    //validating email
    if (!validateEmail(email)) {
      return res.status(400).send("Invalid email");
    }
    //validating password
    if (!validatePassword(password)) {
      return res.status(400).send("Invalid password");
    }
    //finding user by email in the database
    const user = await User.findOne({ email });
    //checking whether user is found or not
    if (!user) {
      return res.status(400).send("Invalid email or password");
    }
    //checking whether password is correct or not
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send("Invalid email or password");
    }

    //singing a new token using user id and secret message and setting up the expiration time as options
    const bearerToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, {
      expiresIn: rememberMe ? "365d" : "7d",
    });

    //!have to work on the expiration of the cookie
    res.cookie("bearerToken", bearerToken, {
      expires: new Date(Date.now() + 999999),
    });

    //returning the token in the response
    return res.status(200).send("Login successful");
  } catch (error) {
    //returning the error message
    console.log(error);
    return res.status(500).send((error as Error).message);
  }
};

//logic for logging out user
export const logout = (req: Request, res: Response) => {
  try {
    res.clearCookie("bearerToken");
    return res.status(200).send("Logout successfully");
  } catch (error) {
    //returning the error message
    console.log(error);
    return res.status(500).send((error as Error).message);
  }
};

interface User {
  username: string;
  email: string;
  _id: string;
  role: string;
  gender: string;
  profileImage: string;
}

//checking whether user is logged in
export const authenticate = async (req: Request, res: Response) => {
  try {
    const user: User = Object(req)["user"];
    if (!user) {
      return res.status(400).send("You are not Authenticated");
    }

    // //upload file
    // const response = await cloudinary.uploader.upload(
    //   "https://upload.wikimedia.org/wikipedia/commons/a/ae/Olympic_flag.jpg"
    // );

    // // Generate
    // const url = cloudinary.url("olympic_flag", {
    //   width: 100,
    //   height: 150,
    //   Crop: "fill",
    // });

    // // The output url
    // console.log(url);
    // const pfp = path.join(
    //   __dirname,
    //   "..",
    //   "assets",
    //   "random_pfp",
    //   "male",
    //   "0.jpeg"
    // );
    // console.log(pfp);
    return res.status(200).json({
      name: user.username,
      email: user.email,
      id: user._id,
      role: user.role,
      gender: user.gender,
      pfp: user.profileImage,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send((error as Error).message);
  }
};

//logic for forgot password it accepts email and sends a mail with reset link
export const forgotPassword = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    //validating email format
    if (!validateEmail(email)) {
      return res.status(403).send("please enter valid email");
    }
    //finding user by email address in the database
    const userExists = await User.findOne({ email });

    //checking if user exists
    if (!userExists) {
      return res.status(404).send("Please enter a registered email address");
    }

    // signing a jwt token for the user
    const payload = { id: userExists._id };
    const forgotToken = await jwt.sign(payload, process.env.JWT_SECRET!, {
      expiresIn: "1hr",
    });

    const resetLink = `http://localhost:3000/authentication/reset-password?token=${forgotToken}`;

    // email options configuration
    const mailOptions = {
      from: "shubhamrakhecha5@gmail.com",
      to: email,
      cc: [],
      bcc: [],
      subject: "password reset",
      html: `<h1>Want to change your password right??</h1><p>If you send this request then click on reset password to reset your password or just ignore it</p><a href="${resetLink}">reset password</a>`,
    };

    //sending email to the given email address
    Transporter.sendMail(mailOptions, (err: Error, info: String) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Email sended with=", info);
      }
    });

    return res.status(200).send("email sent successfully");
  } catch (error) {
    console.log(error);
    return res.status(500).send((error as Error).message);
  }
};

//reset password procedure
export const resetPassword = async (req: Request, res: Response) => {
  try {
    const { password } = req.body;
    // getting user from middleware
    const user = Object(req)["user"];

    //validating password
    if (!validatePassword(password)) {
      return res.status(400).json({
        err: "Error: Invalid password: password must be at least 8 characters long and must include at least one - one uppercase letter, one lowercase letter, one digit, one special character",
      });
    }

    //checking if the given password is same as previous password
    const isSame = await bcrypt.compare(password, user.password);
    if (isSame) {
      return res
        .status(400)
        .send("Your new password must be different then the previous one");
    }

    // hashing and saving the password to the database
    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    await user.save();

    //sending a password changed email to the user
    const mailOptions = {
      from: "shubhamrakhecha5@gmail.com",
      to: user.email,
      cc: [],
      bcc: [],
      subject: "password changed",
      html: `<h1>password changed successfully</h1>`,
    };
    Transporter.sendMail(mailOptions, (err: Error, info: String) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Email sended with=", info);
      }
    });

    return res.status(200).send("password changed successfully");
  } catch (error) {
    console.log(error);
    return res.status(500).send((error as Error).message);
  }
};
