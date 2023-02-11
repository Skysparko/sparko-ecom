import { isResetTokenValid } from "./../middlewares/auth";
import express from "express";
import {
  authenticate,
  login,
  logout,
  register,
  resetPassword,
} from "../controllers/userControllers";
import { isAuthorized } from "../middlewares/auth";
import { forgotPassword } from "../controllers/userControllers";

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

//@route POST api/v1/user/forget-password
//@desc Forgot password
//@access Public
router.post("/forgot-password", forgotPassword);

router.put("/reset-password", isResetTokenValid, resetPassword);
router.put("/verify-reset-token", isResetTokenValid, (req, res) => {
  res.status(200).send("Reset token is valid");
});

export default router;
