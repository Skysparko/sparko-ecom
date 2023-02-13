import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import router from "./routes/userRoutes.js";
import logger from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import { getProfileImages } from "./utils/functions.js";

dotenv.config();

const app = express();

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger("dev"));
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    // maxAge: 800000,
    // methods: "GET, POST, PATCH, PUT, DELETE, OPTIONS
  })
);
app.use(cookieParser());

//routes
app.use("/api/v1/user", router);

//listening on port 8080
app.listen(process.env.PORT || 8080, () => {
  console.log("server is running");
  connectDB();
});
