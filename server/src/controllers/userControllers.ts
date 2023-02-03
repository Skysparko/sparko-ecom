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

    //creating a new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });
    //saving the user to the database
    await newUser.save();
    //returning the new created user in the response
    return res.status(201).send(newUser);
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
    const { email, password } = req.body;
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
    const bearerToken = jwt.sign({ id: user._id }, process.env.SECRET!, {
      expiresIn: "1h",
    });
    res.cookie("bearerToken", bearerToken, {
      expires: new Date(Date.now() + 999999),
    });
    //returning the token in the response
    return res.status(200).send("Login successfully");
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
