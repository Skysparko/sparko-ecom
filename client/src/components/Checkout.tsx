import React, { useEffect, useLayoutEffect, useState } from "react";
import { MultiStepForm, Step } from "react-multi-form";
import Payment from "../pages/checkout/Payment";
import Address from "../pages/checkout/Address";
import Review from "../pages/checkout/Review";
import { getTotalPriceWithOffer } from "../utils/functions";
import { useSelector } from "react-redux";
import { cartType } from "../redux/cart.slice";
import { productType } from "../redux/product.slice";
export default function Checkout() {
  const [activeStep, setActiveStep] = useState(1);
  const [selectedAddress, setSelectedAddress] = React.useState("");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = React.useState("");
  const [selectedProducts, setSelectedProducts] =
    React.useState<Array<string>>();

  const [itemCount, setItemCount] = React.useState(0);
  const [price, setPrice] = React.useState(0);

  const cartState = useSelector(
    (state: { cart: { value: Array<cartType>; loading: boolean } }) =>
      state.cart
  );
  const { value: cartItems } = cartState ?? {};

  // getting products from redux store
  const productsState = useSelector(
    (state: { product: { value: Array<productType>; loading: boolean } }) =>
      state.product
  );
  const { value: products, loading } = productsState ?? {};
  //logic for responsive design
  const [width, setWidth] = useState(
    window.innerWidth > 0 ? window.innerWidth : screen.width
  );
  useEffect(() => {
    const id = new URLSearchParams(window.location.search).get("p")!;
    const items = id.split("X").filter((product) => product !== "");
    setSelectedProducts(items);
    setItemCount(items.length);
    if (items.length > 1) {
      const price = getTotalPriceWithOffer(cartItems, products);
      setPrice(price);
    }

    if (items.length === 1) {
      products.map((product) => {
        product._id === items[0] && setPrice(product.price);
      });
    }
    setWidth(window.innerWidth > 0 ? window.innerWidth : screen.width);
  }, [products, cartItems]);

  return (
    <div className="max-md: bg-gray-100 py-10 px-20 max-sm:px-12 max-vxs:px-6 ">
      <MultiStepForm
        activeStep={activeStep}
        accentColor="rgb(2 132 199 / 1)"
        style={{ padding: 200 }}
      >
        <Step label={`${width > 350 ? "Delivery Address" : "Delivery"}`}>
          <Address
            setActiveStep={setActiveStep}
            setSelectedAddress={setSelectedAddress}
            itemCount={itemCount}
            price={price}
          />
        </Step>
        <Step label={`${width > 350 ? "Payment Method" : "Payment"}`}>
          <Payment
            setActiveStep={setActiveStep}
            setSelectedPaymentMethod={setSelectedPaymentMethod}
            itemCount={itemCount}
            price={price}
          />
        </Step>
        <Step label={`${width > 350 ? "Order Review" : "Order"}`}>
          <Review
            setActiveStep={setActiveStep}
            selectedAddress={selectedAddress}
            selectedPaymentMethod={selectedPaymentMethod}
            selectedProducts={selectedProducts}
            activeStep={activeStep}
            itemCount={itemCount}
            price={price}
          />
        </Step>
      </MultiStepForm>
    </div>
  );
}
