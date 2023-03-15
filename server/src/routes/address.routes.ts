import { Router } from "express";
import { isAuthorized } from "../middlewares/auth.middleware";
import { createQuery } from "../controllers/help.controllers";
import {
  createAddress,
  getCities,
  getCountries,
  getStates,
  getUserAddresses,
} from "../controllers/address.controllers";
const router = Router();

//@route GET api/v1/address/countries
//@desc get all countries
//@access Authorized user
router.get("/countries", isAuthorized, getCountries);

//@route GET api/v1/address/countries
//@desc get all countries
//@access Authorized user
router.get("/states/:country", isAuthorized, getStates);

//@route GET api/v1/address/countries
//@desc get all countries
//@access Authorized user
router.get("/cities/:state", isAuthorized, getCities);

//@route POST api/v1/address/create-new-address
//@desc creating new address
//@access Authorized user
router.post("/create-address", isAuthorized, createAddress);

//@route GET api/v1/address/user-addresses
//@desc to get all the addresses of the user
//@access Authorized user
router.get("/user-addresses", isAuthorized, getUserAddresses);

export default router;
