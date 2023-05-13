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
import Cart from "../models/cart.model";
import { string } from "joi";
dotenv.config();

// function for creating a new order
export const createOrder = async (req: Request, res: Response) => {
  try {
    const { products, payment, addressID, contact, cartItems, price } =
      req.body;
    if (
      !products ||
      !payment ||
      !addressID ||
      !contact ||
      !cartItems ||
      !price
    ) {
      return res.status(400).send("Data is missing.");
    }

    if (!validateEmail(contact)) {
      return res.status(400).send("Email is invalid.");
    }
    console.log(products);
    for (let i = 0; i < products.length; i++) {
      console.log(products[i].productID);
      const productExist = await Product.findById(products[i].productID);
      if (!productExist) {
        return res.status(404).send("Product not found.");
      }
    }
    console.log(cartItems);
    let items = cartItems.filter((item: String) => item !== "");
    console.log(items);

    const addressExist = await Address.findById(addressID);

    if (!addressExist) {
      return res.status(404).send("Address not found.");
    }

    for (let i = 0; i < items.length; i++)
      await Cart.findByIdAndDelete(items[i]);

    // getting user from middleware
    const user = Object(req)["user"];

    //saving the order to the database
    const data = new Order({
      userID: user._id,
      products,
      addressID,
      payment,
      contact,
      date: new Date(),
      price,
    });

    await data.save();

    return res.status(201).send("Order successfully created.");
  } catch (error) {
    console.log(error);
    return res.status(500).send((error as Error).message);
  }
};

//getting all the orders

export const getOrders = async (req: Request, res: Response) => {
  try {
    const user = Object(req)["user"];
    const orders = await Order.find({ userID: user._id });

    return res.status(200).send(orders);
  } catch (error) {
    console.log(error);

    return res.status(500).send((error as Error).message);
  }
};
