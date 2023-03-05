import { Router } from "express";
import { isAuthorized } from "../middlewares/auth.middleware";
import { userUpdate } from "../controllers/user.controllers";
const router = Router();

//@route PUT api/v1/user/update-user
//@desc update-user
//@access Authorized user
router.put("/update-user", isAuthorized, userUpdate);
