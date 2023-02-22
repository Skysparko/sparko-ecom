import { Response, Request } from "express";

const createProduct = (req: Request, res: Response) => {
  try {
    //getting values form request body
    const { title, description, price, category, images } = req.body;
    if (!title || !description || !price || !category || !images) {
      return res.status(400).send("Fill all the required fields");
    }
    
  } catch (error) {
    //returning the error message
    console.log(error);
    return res.status(500).send((error as Error).message);
  }
};
