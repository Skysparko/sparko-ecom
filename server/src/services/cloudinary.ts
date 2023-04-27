import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
dotenv.config();

// Configuration of cloudinary instance
cloudinary.config({
  cloud_name: "de3i4ylah",
  api_key: "968485996465532",
  api_secret: "1vwAhL3Ie323SXwgV6uYz0PMGN4",
});
export default cloudinary;
