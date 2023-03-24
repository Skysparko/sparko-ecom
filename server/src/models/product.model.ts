import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  subCategory: {
    type: String,
    required: true,
  },
  images: {
    type: [String],
    required: true,
  },
  tags: {
    type: [String],
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  offer: {
    type: Number,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
});

export default mongoose.model("Product", productSchema);
