import axios from "axios";
import dotenv from "dotenv";
import cloudinary from "../services/cloudinary";
import fs from "fs";
dotenv.config();

export const getGender = async (name: string) => {
  try {
    const response = await axios.get(
      `https://gender-api.com/get?name=${name}&key=${process.env.GENDER_API_KEY}`
    );

    return response.data.gender;
  } catch (error) {
    return "unknown";
  }
};

export const getProfileImages = async (gender: string) => {
  try {
    // fetching image according to the user's gender

    const response = await cloudinary.api.resources({
      type: "upload",
      prefix: `e-com/images/${gender}`,
    });
    //destructing the response body for secure url
    return await response.resources[
      Math.floor(Math.random() * response.resources.length)
    ].secure_url;
  } catch (error) {
    return "https://pbs.twimg.com/media/FGCpQkBXMAIqA6d?format=jpg&name=large";
  }
};
