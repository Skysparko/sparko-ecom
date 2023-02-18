import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "user",
    required: true,
    enum: ["user", "admin", "owner", "editor"],
  },
  gender: {
    type: String,
    required: true,
    enum: ["male", "female", "unknown"],
  },
  profileImage: {
    type: String,
    required: true,
  },
});

export default mongoose.model("User", userSchema);
