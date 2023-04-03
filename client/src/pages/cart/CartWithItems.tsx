import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { cartType, getAllCartItems } from "../../redux/cart.slice";
import { getAllProducts, productType } from "../../redux/product.slice";
import { useEffect } from "react";
import { AppDispatch } from "../../redux/store";
import {
  addItemToCart,
  fetchAllCartItems,
  removeItemFromCart,
} from "../../utils/cart.functions";
import { useState } from "react";
import { instance } from "../../utils/functions";
import EmptyCart from "./EmptyCart";

export default function CartWithItems() {
  // getting cartItems from redux store
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

  const [change, setChange] = useState(true);
  const [showEmpty, setShowEmpty] = useState(true);

  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    setChange(false);
    dispatch(getAllProducts());

    dispatch(getAllCartItems());
  }, [change]);

  return (
    <article className="bg-gray-100 px-10 ">
      <h1 className="p-5 pb-0 text-4xl font-semibold">Your Cart</h1>
      <section className="grid grid-cols-[3fr,1fr] ">
        <div className="m-5 flex flex-col gap-5 rounded border border-gray-400 bg-white p-5 shadow">
          <h1 className="p-5 pb-0 text-2xl font-medium">Cart Items</h1>
          {cartItems.map((item, index) =>
            products.map(
              (product, index) =>
                product._id === item.productID && (
                  <div key={index} className="flex gap-5 border-b  p-5 ">
                    <input type="checkbox" name="select" id="selectItem" />
                    <img
                      src={product.images[0]}
                      alt=""
                      className="h-28 w-28 rounded border border-gray-200 object-contain shadow"
                    />
                    <section className="flex flex-col gap-2">
                      <h1 className="font-medium">{product.title}</h1>
                      <span className="flex gap-1">
                        <h4>Price: ₹</h4>

                        {product.offer > 0 ? (
                          <>
                            <h4 className="text-red-700 line-through">{`${product.price}`}</h4>
                            <h4 className="">{`${product.price}`}</h4>
                          </>
                        ) : (
                          <h4 className="">{`${product.price}`}</h4>
                        )}
                      </span>
                      <span className="flex gap-1 ">
                        <label htmlFor="quantity">Quantity:</label>
                        <section className="flex gap-2 rounded border border-gray-400">
                          <button
                            onClick={() => {
                              removeItemFromCart(item._id);
                              setChange(!change);
                            }}
                            className="rounded border-r border-gray-400 px-2 shadow"
                          >
                            -
                          </button>
                          <h5>{item.quantity}</h5>
                          <button
                            onClick={() => {
                              addItemToCart(product._id);
                              setChange(!change);
                            }}
                            className="rounded border-l border-gray-400 px-2 shadow"
                          >
                            +
                          </button>
                        </section>
                      </span>
                    </section>
                  </div>
                )
            )
          )}
        </div>
        <div>
          <section className="m-5 rounded border border-gray-400 bg-white shadow">
            <h2 className="p-5 pb-0 text-2xl font-medium">Total:-</h2>

            <h3 className="p-5">₹</h3>
          </section>
        </div>
      </section>
      <section className="grid">
        <div className="m-5 rounded border border-gray-400 bg-white shadow"></div>
      </section>
    </article>
  );
}
