import { Router } from "express";
import { isAuthorized } from "../middlewares/auth.middleware";
import { createOrder } from "../controllers/order.controllers";
const router = Router();

//@route POST api/v1/order/create
//@desc create Order
//@access Authorized user
router.post("/create", isAuthorized, createOrder);

export default router;
