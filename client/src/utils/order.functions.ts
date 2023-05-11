import { cartType } from "../redux/cart.slice";
import { instance } from "./functions";

export const newOrder = (
  isCart: boolean,
  productID: string,
  addressID: string,
  contact: string,
  payment: string,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
  cartItems: Array<cartType>
) => {
  setIsLoading(true);
  if (isCart) {
    for (let i = 0; i < cartItems.length; i++) {
      instance
        .post("/order/create", {
          productID: cartItems[i].productID,
          addressID,
          contact,
          payment,
          quantity: cartItems[i].quantity,
        })
        .then((res) => {
          console.log(res);
        })
        .catch((error) => {
          console.log("error creating order", error.message);
        });
    }
    setIsLoading(false);
  } else {
    const quantity = 1;
    console.log(productID, addressID, contact, payment, quantity);

    instance
      .post("/order/create", {
        productID,
        addressID,
        contact,
        payment,
        quantity,
      })
      .then((res) => {
        setIsLoading(false);
        console.log(res);
      })
      .catch((error) => {
        setIsLoading(false);
        console.log("error creating order", error.message);
      });
  }
};
