import express from "express";
import {
  authenticate,
  login,
  logout,
  register,
} from "../controllers/userControllers";
import { isAuthorized } from "../middlewares/auth";

const router = express.Router();

//@route (POST /api/v1/user/register)
//@desc Register user
//@access Public
router.post("/register", register);

//@route (POST /api/v1/user/login)
//@desc Login user
//@access Public
router.post("/login", login);

//@route (GET /api/v1/user/logout)
//@desc Logout user
//@access Authorized user
router.get("/logout", isAuthorized, logout);

//@route (GET /api/v1/user/authenticate)
//@desc Authenticating user
//@access Authorized user
router.post("/authenticate", isAuthorized, authenticate);

export default router;
