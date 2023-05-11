import { Request, Response } from "express";
import {
  validateEmail,
  validateName,
  validatePassword,
} from "../utils/validators";

import dotenv from "dotenv";
import Order from "../models/order.model";
import Product from "../models/product.model";
import Address from "../models/address.model";
dotenv.config();

// function for saving the user's questions
export const createOrder = async (req: Request, res: Response) => {
  try {
    const { productID, payment, addressID, quantity, contact } = req.body;
    if (!productID || !payment || !addressID || !quantity || !contact) {
      return res.status(400).send("Data is missing.");
    }

    const productExist = await Product.findById(productID);

    if (!productExist) {
      return res.status(404).send("Product not found.");
    }

    const addressExist = await Address.findById(addressID);

    if (!addressExist) {
      return res.status(404).send("Address not found.");
    }

    // getting user from middleware
    const user = Object(req)["user"];
    const data = new Order({
      userID: user._id,
      productID,
      addressID,
      quantity,
      payment,
      contact,
    });

    //saving the user to the database
    await data.save();

    return res.status(201).send("Order successfully created.");
  } catch (error) {
    console.log(error);
    return res.status(500).send((error as Error).message);
  }
};
