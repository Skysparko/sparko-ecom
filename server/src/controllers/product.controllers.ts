import { Response, Request } from "express";
import cloudinary from "../services/cloudinary";
import Product from "../models/product.model";
import { getCurrentDate } from "../utils/functions";

export const createProduct = async (req: Request, res: Response) => {
  try {
    //getting values form request body
    const {
      tags,
      images,
      title,
      description,
      price,
      category,
      subCategory,
      status,
      stock,
      offer,
    } = req.body;
    if (
      !title ||
      !description ||
      !price ||
      !category ||
      !images ||
      !subCategory ||
      !status ||
      !tags ||
      !offer ||
      !stock
    ) {
      return res.status(400).send("Fill all the required fields");
    }

    if (images.length === 0) {
      return res.status(403).send("No images found");
    }

    if (tags.length === 0) {
      return res.status(403).send("No tags found");
    }

    let imagesUrlList = [];
    for (let i = 0; i < images.length; i++) {
      const image = await cloudinary.uploader.upload(images[i].dataURL);
      imagesUrlList.push(image.secure_url);
    }

    const data = new Product({
      date: getCurrentDate(),
      tags,
      images: imagesUrlList,
      title,
      description,
      price,
      category,
      subCategory,
      status,
      stock,
      offer,
    });
    await data.save();
    console.log(data);
    return res.status(201).send("Product Successfully created ");
  } catch (error) {
    //returning the error message
    console.log(error);
    return res.status(500).send((error as Error).message);
  }
};

export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.find();
    console.log(products);
    return res.status(200).json(products);
  } catch (error) {
    //returning the error message
    console.log(error);
    return res.status(500).send((error as Error).message);
  }
};
