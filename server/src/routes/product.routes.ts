import { Router } from "express";
import { isAuthorized } from "../middlewares/auth.middleware";
import { createProduct, getProducts } from "../controllers/product.controllers";

const router = Router();

//@route POST api/v1/product/create
//@desc create a new product
//@access Authorized user
router.post("/create", isAuthorized, createProduct);

//@route GET api/v1/product/all
//@desc get all products
//@access Authorized user
router.get("/all", isAuthorized, getProducts);

export default router;
