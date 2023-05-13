import { cartType } from "../redux/cart.slice";
import { deleteAllItemsInCart, removeItemFromCart } from "./cart.functions";
import { instance } from "./functions";

export const newOrder = (
  isCart: boolean,
  products: Array<{ productID: string; quantity: number }>,
  addressID: string,
  contact: string,
  payment: string,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
  cartItems: Array<string>,
  price: number
) => {
  setIsLoading(true);
  console.log(products, addressID, contact, payment, cartItems);
  instance
    .post("/order/create", {
      products,
      addressID,
      contact,
      payment,
      cartItems,
      price,
    })
    .then((res) => {
      setIsLoading(false);
      location.href = "/order-placed";
    })
    .catch((error) => {
      setIsLoading(false);
      console.log("error creating order", error);
    });
  // if (isCart) {
  //   for (let i = 0; i < cartItems.length; i++) {
  //     instance
  //       .post("/order/create", {
  //         productID: cartItems[i].productID,
  //         addressID,
  //         contact,
  //         payment,
  //         quantity: cartItems[i].quantity,
  //       })
  //       .then((response) => {
  //         console.log(response);
  //       })
  //       .catch((error) => {
  //         console.log("error creating order", error.message);
  //       });
  //   }
  //   deleteAllItemsInCart();
  //   setIsLoading(false);
  //   location.href = "/order-placed";
  // } else {
  //   const quantity = 1;
  //   console.log(productID, addressID, contact, payment, quantity);

  //   instance
  //     .post("/order/create", {
  //       productID,
  //       addressID,
  //       contact,
  //       payment,
  //       quantity,
  //     })
  //     .then((res) => {
  //       setIsLoading(false);
  //       location.href = "/order-placed";
  //     })
  //     .catch((error) => {
  //       setIsLoading(false);
  //       console.log("error creating order", error.message);
  //     });
  // }
};

export async function fetchAllOrders() {
  try {
    const res = await instance.get("/order");
    return res.data;
  } catch (error) {
    console.log(error);
    return error;
  }
}
