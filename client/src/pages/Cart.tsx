import React from "react";
import emptyShoppingCart from "../assets/video/emptyShoppingCart.gif";
import { useNavigate } from "react-router-dom";

interface PropTypes {
  isAuthenticated: boolean;
  user: {
    name: string;
    email: string;
    role: string;
    id: string;
  };
}

export default function Cart({ isAuthenticated, user }: PropTypes) {
  const navigate = useNavigate();
  return (
    <section className=" border border-black bg-slate-100 p-10 max-lg:p-5 max-vxs:p-0">
      <div className="flex items-center justify-evenly bg-white p-10 shadow-lg max-md:flex-col max-md:gap-10 max-vxs:p-5 ">
        <img src={emptyShoppingCart} className="w-[30rem] max-lg:w-[25rem]" />
        <section className="flex flex-col gap-10 ">
          <h1 className="text-5xl font-semibold max-lg:text-4xl max-vs:text-3xl">
            Your cart is empty.
          </h1>
          <span className="flex justify-between max-lg:flex-col max-lg:gap-5">
            {!isAuthenticated && (
              <button
                onClick={() => navigate("/authentication")}
                className="m-auto w-48 rounded border-2 border-black bg-sky-600 py-2 text-white max-lg:text-sm"
              >
                Register & Login
              </button>
            )}
            <button
              onClick={() => navigate("/")}
              className="m-auto w-48 rounded border-2 border-black py-2 max-lg:text-sm"
            >
              Continue Shopping
            </button>
          </span>
        </section>
      </div>
    </section>
  );
}
