import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/user.routes.js";
import logger from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import { getProfileImages } from "./utils/functions.js";

dotenv.config();

const app = express();

//middleware
app.use(express.json({ limit: "50mb" }));
app.use(
  express.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 })
);
app.use(express.text({ limit: "200mb" }));
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
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/user", userRoutes);

//listening on port 8080
app.listen(process.env.PORT || 8080, () => {
  console.log("server is running");
  connectDB();
});
