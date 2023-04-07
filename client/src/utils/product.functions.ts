import { dialogBoxPropsType } from "../components/utils/DialogBox";
import { instance } from "./functions";

export const submitNewProduct = (
  tags: Array<string>,
  images: Array<[]>,
  title: string,
  description: string,
  price: number,
  category: string,
  subCategory: string,
  status: string,
  setResponse: React.Dispatch<React.SetStateAction<dialogBoxPropsType>>,
  setShowResponse: React.Dispatch<React.SetStateAction<boolean>>,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
  stock: number,
  offer: number
) => {
  // console.log(
  //   tags,
  //   images,
  //   title,
  //   description,
  //   price,
  //   category,
  //   subCategory,
  //   status,
  //   stock,
  //   offer
  // );
  setIsLoading(true);
  instance
    .post("product/create", {
      tags,
      images,
      title,
      description,
      price,
      category,
      subCategory,
      status,
      stock,
      offer,
    })
    .then((response) => {
      location.href = "/dashboard/products";
      setIsLoading(false);
    })
    .catch((error) => {
      setIsLoading(false);
      setShowResponse(true);
      setResponse({
        type: "error",
        message: error.response.data,
      });
      console.log(error);
    });
};

export const updateProduct = (
  tags: Array<string>,
  images: Array<[]>,
  title: string,
  description: string,
  price: number,
  category: string,
  subCategory: string,
  status: string,
  setResponse: React.Dispatch<React.SetStateAction<dialogBoxPropsType>>,
  setShowResponse: React.Dispatch<React.SetStateAction<boolean>>,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
  stock: number,
  offer: number,
  id: string
) => {
  // console.log(
  //   tags,
  //   images,
  //   title,
  //   description,
  //   price,
  //   category,
  //   subCategory,
  //   status,
  //   stock,
  //   offer
  // );
  setIsLoading(true);
  instance
    .put(`product/update/${id}`, {
      tags,
      images,
      title,
      description,
      price,
      category,
      subCategory,
      status,
      stock,
      offer,
    })
    .then((response) => {
      console.log(response);
      location.href = "/dashboard/products";
      setIsLoading(false);
    })
    .catch((error) => {
      setIsLoading(false);
      setShowResponse(true);
      setResponse({
        type: "error",
        message: error.response.data,
      });
      console.log(error);
    });
};

// function to fetch all the address using UserId
export const fetchAllProducts = async () => {
  try {
    const res = await instance.get("/product/");

    return res.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

// function to fetch all the address using UserId
export const fetchAllCategories = async () => {
  try {
    const res = await instance.get("/product/categories");
    return res.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};
