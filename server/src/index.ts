import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

dotenv.config();

const app = express();

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//listening on port 8080
app.listen(process.env.PORT || 8080, () => {
  console.log("server is running");
  connectDB();
});
