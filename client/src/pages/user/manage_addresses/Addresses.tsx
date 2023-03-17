import React, { useEffect, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addressType, getAllAddresses } from "../../../redux/address.slice";
import { AppDispatch } from "../../../redux/store";
import Products from "../../dashboard/Products";
import {
  deleteAddress,
  setAddressDefault,
} from "../../../utils/address.function";

export default function Addresses() {
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  // const productsState = useSelector(
  //   (state: { address: addressType }) => state.address
  // );
  // const addresses = productsState ?? {};

  const user = useSelector(
    (state: {
      user: {
        email: string;
        isAuthenticated: boolean;
        name: string;
        gender: string;
        role: string;
        id: string;
        pfp: string;
        address: string;
      };
    }) => state.user
  );

  // const address = useSelector(
  //   (state: {
  //     address: {
  //       value: [];
  //       loading: boolean;
  //     };
  //   }) => state.address
  // );

  const addressesState = useSelector(
    (state: { address: { value: Array<addressType>; loading: boolean } }) =>
      state.address
  );
  const { value: addresses, loading } = addressesState ?? {};
  useEffect(() => {
    dispatch(getAllAddresses());
  }, []);

  return (
    <div className="p-5">
      <h1 className=" text-5xl font-semibold max-md:text-4xl max-vs:text-3xl">
        Manage Addresses
      </h1>

      <section className="flex  flex-wrap justify-center gap-5  py-10 ">
        <div
          className=" w-80 cursor-pointer rounded-md border-[3px] border-dashed border-gray-500 bg-white p-5 shadow-lg"
          onClick={() => navigate("add-address")}
        >
          <span className="flex h-full flex-col items-center justify-center">
            <span className="flex flex-col gap-5">
              <AiOutlinePlus
                color="rgb(107 114 128 /1)"
                className=" m-auto  rounded-full border-2 border-dashed border-gray-500 p-1 text-5xl"
              />
              <h2 className="text-center text-xl font-medium text-gray-700">
                Add <br />
                Addresses
              </h2>
            </span>
          </span>
        </div>

        {addresses.map(
          (item, i) =>
            item._id === user.address && (
              <div
                key={i}
                className=" w-80 rounded-md  border-2 border-gray-500 bg-white p-5 pb-2 shadow-lg max-vxs:p-2"
              >
                <div className=" grid  h-full grid-rows-[1fr,0.1fr] ">
                  <span className="flex flex-col gap-2">
                    <h1 className="border-b border-black pb-2">
                      Default Address
                    </h1>
                    <h1 className="mt-3 font-semibold">{item.fullName}</h1>
                    <h2>{item.address1}</h2>
                    <h2>{item.address2}</h2>
                    <h2>
                      {item.city},{item.state} {item.pinCode}
                    </h2>
                    <h2>{item.country}</h2>
                    <h2>Phone Number:{item.mobileNumber}</h2>
                  </span>
                  <span className="flex gap-2 ">
                    <button className="text-sky-700">Edit</button>
                    <span>|</span>
                    <button
                      className="text-sky-700"
                      onClick={() => deleteAddress(item._id)}
                    >
                      Remove
                    </button>
                  </span>
                </div>
              </div>
            )
        )}

        {addresses.map(
          (item, i) =>
            item._id !== user.address && (
              <div
                key={i}
                className=" w-80 rounded-md border-2  border-gray-500 bg-white p-3 pb-2 shadow-lg max-vxs:p-2"
              >
                <div className="grid h-full grid-rows-[1fr,0.1fr] gap-2">
                  <span className="flex flex-col gap-2 align-top">
                    <h1 className="mt-3 font-semibold">{item.fullName}</h1>
                    <h2>{item.address1}</h2>
                    <h2>{item.address2}</h2>
                    <h2>
                      {item.city},{item.state} {item.pinCode}
                    </h2>
                    <h2>{item.country}</h2>
                    <h2>Phone Number:{item.mobileNumber}</h2>
                  </span>
                  <span className=" flex items-center gap-2 ">
                    <button className="text-sky-700">Edit</button>
                    <span>|</span>
                    <button
                      className="text-sky-700"
                      onClick={() => deleteAddress(item._id)}
                    >
                      Remove
                    </button>
                    <span>|</span>
                    <button
                      className="text-sky-700"
                      onClick={() => setAddressDefault(item._id)}
                    >
                      Set as Default
                    </button>
                  </span>
                </div>
              </div>
            )
        )}
      </section>
    </div>
  );
}
