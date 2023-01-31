import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";

const dbOptions: Object = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose.set("strictQuery", false);

const connectDB = () => {
  mongoose
    .connect(process.env.MONGO_URI!, dbOptions)
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((err) => console.log(err.message));
};

export default connectDB;
