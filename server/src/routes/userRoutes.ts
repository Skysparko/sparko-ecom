import express from "express";
import { login, register } from "../controllers/userControllers";
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

router.get("/get", isAuthorized, (req, res) => {
  const user: Object = Object(req)["user"];
  return res.status(200).json({ user });
});

export default router;
