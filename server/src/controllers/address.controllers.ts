import { Request, Response } from "express";
import {
  validateEmail,
  validateName,
  validatePassword,
} from "../utils/validators";
import dotenv from "dotenv";
import axios from "axios";
import Address from "../models/address.model";
dotenv.config();

export const getCountries = async (req: Request, res: Response) => {
  try {
    const response = await axios.get(
      `${process.env.COUNTRIES_API_URL}/countries/`,
      {
        headers: {
          Authorization: `Bearer ${process.env.AUTH_TOKEN}`,
          Accept: "application/json",
        },
      }
    );

    return res.status(200).json(response.data);
  } catch (error) {
    console.log(error);
    return res.status(500).send((error as Error).message);
  }
};

export const getStates = async (req: Request, res: Response) => {
  try {
    const country = req.params.country;
    if (!country) {
      return res.status(400).send("Please provide country");
    }
    console.log(country);
    const response = await axios.get(
      `${process.env.COUNTRIES_API_URL}/states/${country}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.AUTH_TOKEN}`,
          Accept: "application/json",
        },
      }
    );

    return res.status(200).json(response.data);
  } catch (error) {
    console.log(error);
    return res.status(500).send((error as Error).message);
  }
};
export const getCities = async (req: Request, res: Response) => {
  try {
    const state = req.params.state;
    if (!state) {
      return res.status(400).send("Please provide state");
    }
    const response = await axios.get(
      `${process.env.COUNTRIES_API_URL}/cities/${state}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.AUTH_TOKEN}`,
          Accept: "application/json",
        },
      }
    );

    return res.status(200).json(response.data);
  } catch (error) {
    console.log(error);
    return res.status(500).send((error as Error).message);
  }
};

export const createAddress = async (req: Request, res: Response) => {
  try {
    const {
      country,
      state,
      mobileNumber,
      fullName,
      defaultAddress,
      pinCode,
      address1,
      address2,
      landmark,
      city,
    } = req.body;

    if (
      !country ||
      !state ||
      !mobileNumber ||
      !fullName ||
      !defaultAddress ||
      !pinCode ||
      !address1 ||
      !address2 ||
      !landmark ||
      !city
    ) {
      return res.status(400).send("Please fill all the required fields");
    }

    const user = Object(req)["user"];
    const data = new Address({
      userID: user._id,
      country,
      state,
      mobileNumber,
      fullName,
      pinCode,
      address1,
      address2,
      landmark,
      city,
    });
    await data.save();

    if (defaultAddress === "true") {
      console.log(data._id);
      user.address = data._id;
      await user.save();
    }

    return res.status(200).json({ user, data });
  } catch (error) {
    console.log(error);
    return res.status(500).send((error as Error).message);
  }
};

export const getUserAddresses = async (req: Request, res: Response) => {
  try {
    const user = Object(req)["user"];
    const addresses = await Address.find({ userID: user._id });
    if (!addresses) {
      return res.status(404).send("No address found");
    }
    return res.status(200).send(addresses);
  } catch (error) {
    console.log(error);
    return res.status(500).send((error as Error).message);
  }
};
