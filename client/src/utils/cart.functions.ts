import { instance } from "./functions";
export const addItemToCart = (productID: string) => {
  instance
    .post("/cart/add", { productID })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const fetchAllCartItems = async () => {
  try {
    const res = await instance.get("/cart");
    return res.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const removeItemFromCart = (cartID: string) => {
  instance
    .delete(`/cart/${cartID}`)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
};
